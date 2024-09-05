import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD6s-ANYihojvPFSAhOuIpCKpknzNg6Bts';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const DeliveryRouteScreen: React.FC = () => {
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [stops, setStops] = useState<(Coordinates | null)[]>([]);
  const [routeVisible, setRouteVisible] = useState<boolean>(false);
  const [deliveryStarted, setDeliveryStarted] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stopDistances, setStopDistances] = useState<number[]>([]);
  const [stopDurations, setStopDurations] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [estimatedArrivalTimes, setEstimatedArrivalTimes] = useState<string[]>([]);
  const [deliveryPosition, setDeliveryPosition] = useState<Coordinates | null>(null); // Adicionado
  const mapRef = useRef<MapView>(null);
  const deliveryIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua localização.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (origin && destination && routeVisible && mapRef.current) {
      const points = [origin, ...stops.filter(Boolean), destination];
      mapRef.current.fitToCoordinates(points as Coordinates[], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [origin, destination, stops, routeVisible]);

  useEffect(() => {
    if (deliveryStarted && deliveryPosition) {
      deliveryIntervalRef.current = setInterval(async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setDeliveryPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      }, 5000); // Atualizar a cada 5 segundos
    } else {
      if (deliveryIntervalRef.current) {
        clearInterval(deliveryIntervalRef.current);
        deliveryIntervalRef.current = null;
      }
    }
  }, [deliveryStarted, deliveryPosition]);

  useEffect(() => {
    if (deliveryPosition) {
      mapRef.current?.animateCamera({
        center: deliveryPosition,
        pitch: 0,
        heading: 0,
        zoom: 15,
      });
    }
  }, [deliveryPosition]);

  const handleGenerateRoute = async () => {
    if (!origin || !destination) {
      Alert.alert('Erro', 'Defina o ponto de origem e o destino.');
      return;
    }

    try {
      const distances: number[] = [];
      const durations: number[] = [];
      const arrivalTimes: string[] = [];

      const points = [origin, ...stops.filter(Boolean), destination];

      // Calcular a distância e duração de cada trecho
      let cumulativeDuration = 0; // para calcular a estimativa de chegada
      for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];

        const { distance, duration } = await calculateDistanceAndDuration(start!, end!);
        distances.push(distance);
        durations.push(duration);

        cumulativeDuration += duration;

        // Calcular o tempo de chegada para cada parada
        const estimatedArrivalTime = new Date();
        estimatedArrivalTime.setMinutes(estimatedArrivalTime.getMinutes() + cumulativeDuration);

        arrivalTimes.push(estimatedArrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      setStopDistances(distances);
      setStopDurations(durations);
      setDistance(distances.reduce((a, b) => a + b, 0));
      setDuration(durations.reduce((a, b) => a + b, 0));
      setEstimatedArrivalTimes(arrivalTimes);
      setRouteVisible(true);
    } catch (error) {
      console.error(error);
      setError('Não foi possível calcular a rota.');
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleStartDelivery = () => {
    if (!currentLocation) {
      Alert.alert('Erro', 'Não foi possível obter sua localização atual.');
      return;
    }
    setDeliveryStarted(true);
    setDeliveryPosition(currentLocation);
    toggleVisibility();
  };

  const handlePlaceSelect = async (data: any, details: any, setLocation: React.Dispatch<React.SetStateAction<Coordinates | null>>) => {
    const address = details?.formatted_address || data.description;
    const coords = await getCoordinatesFromAddress(address);
    if (coords) {
      setLocation(coords);
    } else {
      setError('Não foi possível obter as coordenadas para o endereço fornecido.');
    }
  };

  const getCoordinatesFromAddress = async (address: string): Promise<Coordinates | null> => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address,
          key: GOOGLE_MAPS_APIKEY,
        },
      });
      const location = response.data.results[0]?.geometry?.location;
      if (location) {
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const calculateDistanceAndDuration = async (origin: Coordinates, destination: Coordinates): Promise<{ distance: number; duration: number }> => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          key: GOOGLE_MAPS_APIKEY,
        },
      });
      const route = response.data.routes[0];
      const distance = route.legs[0].distance.value / 1000; // em km
      const duration = route.legs[0].duration.value / 60; // em minutos
      return { distance, duration };
    } catch (error) {
      console.error(error);
      return { distance: 0, duration: 0 };
    }
  };

  const addStop = () => {
    if (stops.length < 3) {
      setStops([...stops, null]);
    }
  };

  const removeStop = (index: number) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
  };

  const handleStopChange = async (data: any, details: any, index: number) => {
    const address = details?.formatted_address || data.description;
    const coords = await getCoordinatesFromAddress(address);
    if (coords) {
      const updatedStops = [...stops];
      updatedStops[index] = coords;
      setStops(updatedStops);
    } else {
      setError('Não foi possível obter as coordenadas para o endereço fornecido.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: origin?.latitude || 37.78825,
          longitude: origin?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && <Marker coordinate={origin} title="Início" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
        {stops.map((stop, index) => stop && <Marker key={index} coordinate={stop} title={`Parada ${index + 1}`} />)}
        {routeVisible && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={stops.filter(Boolean) as Coordinates[]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={result => {
              setDistance(result.distance);
              setDuration(result.duration);
            }}
            onError={(errorMessage) => {
              setError(errorMessage);
            }}
          />
        )}
        {deliveryPosition && (
          <Marker coordinate={deliveryPosition} title="Posição do Veículo" pinColor="blue" />
        )}
      </MapView>

      <View style={styles.menuContainer}>
        <GooglePlacesAutocomplete
          placeholder="Endereço inicial"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setOrigin)}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt',
          }}
          styles={autocompleteStyles}
        />

        {stops.map((stop, index) => (
          <View key={index} style={styles.stopContainer}>
            <GooglePlacesAutocomplete
              placeholder={`Parada ${index + 1}`}
              fetchDetails={true}
              onPress={(data, details = null) => handleStopChange(data, details, index)}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'pt',
              }}
              styles={autocompleteStyles}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeStop(index)}>
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={[styles.addButton, stops.length >= 3 && styles.addButtonDisabled]} onPress={addStop} disabled={stops.length >= 3}>
          <Text style={styles.addButtonText}>+ Adicionar Parada</Text>
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Endereço de entrega"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setDestination)}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt',
          }}
          styles={autocompleteStyles}
        />

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateRoute}>
          <Text style={styles.generateButtonText}>Gerar Rota</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={handleStartDelivery}>
          <Text style={styles.startButtonText}>Iniciar Entrega</Text>
        </TouchableOpacity>
      </View>

      {routeVisible && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Distância Total: {distance ? `${distance.toFixed(2)} km` : 'N/A'}</Text>
          <Text style={styles.infoText}>Duração Estimada: {duration ? `${duration.toFixed(2)} min` : 'N/A'}</Text>
          {stops.map((_, index) => (
            <Text key={index} style={styles.infoText}>
              Tempo Estimado para Parada {index + 1}: {estimatedArrivalTimes[index] || 'N/A'}
            </Text>
          ))}
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  generateButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#34C759',
    borderRadius: 5,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#FF9500',
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  error: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
});

const autocompleteStyles = {
  textInputContainer: {
    backgroundColor: 'transparent',
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
};

export default DeliveryRouteScreen;
