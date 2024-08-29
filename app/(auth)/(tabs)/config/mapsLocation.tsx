import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD6s-ANYihojvPFSAhOuIpCKpknzNg6Bts';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const DeliveryRouteScreen: React.FC = () => {
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [routeVisible, setRouteVisible] = useState<boolean>(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (origin && destination && routeVisible && mapRef.current) {
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [origin, destination, routeVisible]);

  const handleGenerateRoute = () => {
    if (!origin || !destination) {
      Alert.alert('Erro', 'Defina o ponto de origem e o destino.');
      return;
    }
    setRouteVisible(true);
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder="Endereço inicial"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setOrigin)}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt',
          }}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Endereço de entrega"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setDestination)}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt',
          }}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
          }}
        />
        <Button
          title="Fazer Rota"
          onPress={handleGenerateRoute}
          color="#FF6347"
          disabled={!origin || !destination}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: origin?.latitude ?? -23.5505,
            longitude: origin?.longitude ?? -46.6333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {origin && (
            <Marker coordinate={origin} title="Origem" pinColor="green" />
          )}
          {destination && (
            <Marker coordinate={destination} title="Entrega" pinColor="red" />
          )}
          {origin && destination && routeVisible && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={(result) => {
                if (mapRef.current) {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                  });
                }
                setDistance(result.distance);
                setDuration(result.duration);
              }}
            />
          )}
        </MapView>
        {distance && duration && (
          <View style={styles.routeInfoContainer}>
            <Text style={styles.routeInfoText}>Distância: {distance.toFixed(2)} km</Text>
            <Text style={styles.routeInfoText}>Tempo estimado: {Math.ceil(duration)} min</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  autocompleteContainer: {
    flex: 0,
  },
  listView: {
    backgroundColor: 'white',
  },
  mapContainer: {
    flex: 1,
    marginTop: 100,
  },
  map: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  routeInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  routeInfoText: {
    fontSize: 16,
    color: 'black',
  },
});

export default DeliveryRouteScreen;
