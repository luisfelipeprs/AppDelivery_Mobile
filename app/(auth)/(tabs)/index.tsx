import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import * as Location from 'expo-location';
import { useSession } from '@/app/ctx';
import { router } from 'expo-router';

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
  const { userAccount, signOut } = useSession();
  const accountType = userAccount?.typeAccount
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

  const handleSignOut = async () => {
    signOut();
    router.replace('/');
  };

  const handleStartDelivery = () => {
    if (accountType === 'Guest') {
      Alert.alert(
        'Ação restrita',
        'Você precisa estar logado para iniciar uma entrega.',
        [
          { text: 'Loggar', onPress: handleSignOut },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
      return;
    }

    if (!currentLocation) {
      Alert.alert('Erro', 'Não foi possível obter sua localização atual.');
      return;
    }

    setDeliveryStarted(true);
    setDeliveryPosition(currentLocation);
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
    <View className='flex-1'>
      <MapView
        className='flex-1'
        provider={PROVIDER_GOOGLE}
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

      <View className='absolute top-5 left-2 right-2 bg-white p-2 rounded-lg shadow-lg'>
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
          <View key={index} className='flex flex-row items-center'>
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
            <TouchableOpacity className='bg-red-500 rounded-full w-7 h-7 flex justify-center items-center ml-2' onPress={() => removeStop(index)}>
              <Text className='text-white text-lg leading-none'>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          className={`${stops.length >= 1 ? 'bg-gray-300' : 'bg-blue-500'} mt-2 py-2 rounded-md flex justify-center items-center`}
          onPress={addStop}
          disabled={stops.length >= 1}
        >
          <Text className='text-white text-base'>+ Adicionar Parada</Text>
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

        <TouchableOpacity className='mt-2 py-2 bg-green-500 rounded-md flex justify-center items-center' onPress={handleGenerateRoute}>
          <Text className='text-white text-base'>Gerar Rota</Text>
        </TouchableOpacity>

        <TouchableOpacity className='mt-2 py-2 bg-orange-500 rounded-md flex justify-center items-center' onPress={handleStartDelivery}>
          <Text className='text-white text-base'>Iniciar Entrega</Text>
        </TouchableOpacity>
      </View>

      {routeVisible && (
        <View className='mt-2 py-2 bg-orange-500 rounded-md flex justify-center items-center'>
          <Text className='text-base'>Distância Total: {distance ? `${distance.toFixed(2)} km` : 'N/A'}</Text>
          <Text className='text-base'>Duração Estimada: {duration ? `${duration.toFixed(2)} min` : 'N/A'}</Text>
          {stops.map((_, index) => (
            <Text key={index} className='text-base'>
              Tempo Estimado para Parada {index + 1}: {estimatedArrivalTimes[index] || 'N/A'}
            </Text>
          ))}
        </View>
      )}

      {error && <Text className='absolute bottom-5 left-2 right-2 text-red-500 text-sm text-center'>{error}</Text>}
    </View>
  );
};

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
