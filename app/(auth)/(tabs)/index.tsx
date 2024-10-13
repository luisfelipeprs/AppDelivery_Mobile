import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import * as Location from 'expo-location';
import { useSession } from '@/app/ctx';
import { router, useLocalSearchParams } from 'expo-router';
import ModalOrder from '../modal-order';
import { useWebSocketTracking } from '@/services/WebSocketTracking';
import ModalWaitingAcceptDelivery from '../modal-waiting-accept-delivery';
import CreateDelivery, { CreateDeliveryProps, StatusDelivery } from '@/services/CreateDelivery';

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
  const [modalOrderVisible, setModalOrderVisible] = useState<boolean>(false);
  const [modalWaitingAcceptDelivery, setModalWaitingAcceptDelivery] = useState<boolean>(false);
  const [deliveryStarted, setDeliveryStarted] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stopDistances, setStopDistances] = useState<number[]>([]);
  const [stopDurations, setStopDurations] = useState<number[]>([]);
  const [companyId, setCompanyId] = useState<string | null>();
  const [consumerId, setConsumerId] = useState<string | null>();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [modalData, setModalData] = useState({
    senderLatitude: 0,
    senderLongitude: 0,
    stopLatitude: 0,
    stopLongitude: 0,
    recipientLatitude: 0,
    recipientLongitude: 0,
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [estimatedArrivalTimes, setEstimatedArrivalTimes] = useState<string[]>([]);
  const [deliveryPosition, setDeliveryPosition] = useState<Coordinates | null>(null); // Adicionado
  const [driverPosition, setDriverPosition] = useState<Coordinates | null>(null);
  const mapRef = useRef<MapView>(null);
  const deliveryIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { userAccount, signOut } = useSession();
  const accountType = userAccount?.typeAccount
  const { isAcceptedOrder, orderIdAccepted } = useLocalSearchParams();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência para armazenar o intervalo

  useEffect(() => {
    const fetchLocationAndConnect = async () => {
      if (accountType === 'Driver') {
        if (isAcceptedOrder === 'true') {
          const orderId = Array.isArray(orderIdAccepted) ? orderIdAccepted[0] : orderIdAccepted;
          const dataDelivery: CreateDeliveryProps = {
            orderId: orderId!,
            status: 'NotStarted' as StatusDelivery,
            deliveryPersonId: userAccount?.id!,
          };

          // const response = await CreateDelivery(dataDelivery);
          // console.log("criado o delivery > ", response);

          connect(orderId!); // Conectar a ordem

          // Solicitar permissões de geolocalização
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status === 'granted') {
            // Função para obter a localização e enviar via WebSocket
            console.log('granted');

            const sendLocation = async () => {
              const location = await Location.getCurrentPositionAsync({});
              const { latitude, longitude } = location.coords;

              // Enviar a localização para os clientes via WebSocket
              sendMessage(JSON.stringify({ orderId, latitude, longitude }));
            };

            // Chama sendLocation imediatamente
            await sendLocation();

            // Configura o intervalo para enviar a localização a cada 4 segundos
            intervalRef.current = setInterval(sendLocation, 4000);
          } else {
            console.log("Permissão de geolocalização não concedida.");
          }
        } else {
          console.log('A ordem não foi aceita.');
        }
      }
    };

    fetchLocationAndConnect();

    // Limpa o intervalo ao desmontar o componente
  }, [isAcceptedOrder, orderIdAccepted]);

  useEffect(() => {
    console.log("Driver Position: ", driverPosition);
    console.log("Origin: ", origin);
  }, [driverPosition, origin]);


  useEffect(() => {
    if (deliveryPosition) { // movimenta a camera
      // mapRef.current?.animateCamera({
      //   center: deliveryPosition,
      //   pitch: 0,
      //   heading: 0,
      //   zoom: 15,
      // });
    }
  }, [deliveryPosition]);
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
      }, 5000);
    } else if (deliveryIntervalRef.current) {
      clearInterval(deliveryIntervalRef.current);
      deliveryIntervalRef.current = null;
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

  useEffect(() => {
    if (accountType === "Company") {
      setCompanyId(userAccount?.id || null);
      setConsumerId(null);
    } else if (accountType === "Consumer") {
      setConsumerId(userAccount?.id || null);
      setCompanyId(null);
    } else {
      // Se houver um caso em que accountType não é nem Company nem Consumer, você pode tratar aqui.
      setCompanyId(null);
      setConsumerId(null);
    }
  }, [accountType, userAccount?.id]);


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
          { text: 'Loggar', onPress: () => handleSignOut },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
      return;
    }
    if (!origin || !destination) {
      Alert.alert('Erro ao iniciar entrega', 'Defina um ponto de origem e destino')
    }
    else {
      if (!currentLocation) {
        Alert.alert('Erro', 'Não foi possível obter sua localização atual.');
        return;
      }
      if (accountType == "Company") {
        setCompanyId(userAccount?.id)
        setConsumerId(null)
      }
      else if (accountType == "Consumer") {
        setConsumerId(userAccount?.id)
        setCompanyId(null)
      }
      setDeliveryStarted(true); // isso aqui da o erro: Error: Request has not been opened, js engine: hermes
      // setDeliveryPosition(currentLocation);
      setModalOrderVisible(true);
    }
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

      setModalData((prevModalData) => ({
        ...prevModalData,
        stopLatitude: coords.latitude,
        stopLongitude: coords.longitude,
      }));
    } else {
      setError('Não foi possível obter as coordenadas para o endereço fornecido.');
    }
  };



  const handleSubmitModal = (idOrder: string) => {
    console.log('Recebido ID da ordem:', idOrder);
    setOrderId(idOrder);
    setModalOrderVisible(false);
    console.log('Sucesso', `Pedido criado com o ID: ${idOrder}`);
    connect(idOrder);
    setModalWaitingAcceptDelivery(true);
  };

  const handleCancelModalWaitingAcceptDelivery = () => {
    closeConnection(orderId!);
    setModalWaitingAcceptDelivery(false)
  };

  const handleMessage = (data: any) => {
    const { latitude, longitude } = data;
    setModalWaitingAcceptDelivery(false)
    console.log('Mensagem recebida:', data);
    setDriverPosition({
      latitude,
      longitude,
    });
  };

  const handleError = (error: string) => {
    // Lógica para lidar com erros
    console.error('Erro no WebSocket:', error);
  };

  const handleClose = (event: CloseEvent) => {
    // Lógica para lidar com o fechamento da conexão
    console.log('Conexão WebSocket fechada:', event);
  };
  const { connect, closeConnection, sendMessage, sendLocationUpdate, connectionStatus } = useWebSocketTracking(
    handleMessage,
    handleError,
    handleClose
  );

  const searchDelivery = () => {
    router.push('/config/orderAcceptanceScreen')

  }
  const handleConfirmPickedUpOrder = () => {
    
  }
  return (
    <View className='flex-1'>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: origin?.latitude || 37.4220936, // Posição inicial, pode ser a origem
          longitude: origin?.longitude || -122.083922,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {origin && <Marker coordinate={origin} title="Início" />}
        {destination && !driverPosition && <Marker coordinate={destination} title="Destino" />}
        {stops.map((stop, index) => stop && <Marker key={index} coordinate={stop} title={`Parada ${index + 1}`} />)}
        {routeVisible && origin && destination && !driverPosition &&(
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
        {driverPosition && <Marker coordinate={driverPosition} pinColor='blue' title="Posição do entregador" />}
        {driverPosition && origin && (
          <MapViewDirections
            origin={driverPosition}
            destination={origin}
            waypoints={stops.filter(Boolean) as Coordinates[]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
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
      </MapView>
      {
        accountType === "Company" || accountType === "Consumer" ? (
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
        ) : null
      }

      {
        (accountType === "Driver" && isAcceptedOrder != 'true') ? (
          <TouchableOpacity
            onPress={searchDelivery}
            className="absolute top-10 left-0 right-0 mx-4 bg-blue-600 p-4 rounded-full shadow-lg"
          >
            <Text className="text-white text-center text-lg font-bold">Procurar Pedido</Text>
          </TouchableOpacity>

        ) : null
      }
      {(accountType === "Driver" && isAcceptedOrder == 'true') && (
        <TouchableOpacity
          onPress={handleConfirmPickedUpOrder}
          className="absolute top-10 left-0 right-0 mx-4 bg-red-600 p-4 rounded-full shadow-lg"
        >
          <Text className="text-white text-center text-lg font-bold">Confirmar Recebimento do pedido</Text>
        </TouchableOpacity>
      )}

      {
        modalOrderVisible && (
          <ModalOrder
            visible={modalOrderVisible}
            onClose={() => setModalOrderVisible(false)}
            handleSubmitModal={handleSubmitModal}
            senderLatitude={origin?.latitude!}
            senderLongitude={origin?.longitude!}
            stopLatitude={modalData.stopLatitude}
            stopLongitude={modalData.stopLongitude}
            recipientLatitude={destination?.latitude}
            recipientLongitude={destination?.longitude}
            companyId={companyId!}
            consumerId={consumerId!}
            deliveryId={null}
            status='Available'
          />
        )
      }
      {
        modalWaitingAcceptDelivery && (
          <ModalWaitingAcceptDelivery
            visible={modalWaitingAcceptDelivery}
            onCancel={handleCancelModalWaitingAcceptDelivery}
          />
        )
      }
      {
        routeVisible && (
          <View className='mt-2 py-2 bg-orange-500 rounded-md flex justify-center items-center pb-8'>
            <Text className='text-base text-bold text-white'>Distância Total: {distance ? `${distance.toFixed(2)} km` : 'N/A'}</Text>
            <Text className='text-base text-bold text-white'>Duração Estimada: {duration ? `${duration.toFixed(2)} min` : 'N/A'}</Text>
            {stops.map((_, index) => (
              <Text key={index} className='text-base'>
                Tempo Estimado para Parada {index + 1}: {estimatedArrivalTimes[index] || 'N/A'}
              </Text>
            ))}
          </View>
        )
      }

      {error && <Text className='absolute bottom-5 left-2 right-2 text-red-500 text-sm text-center'>{error}</Text>}
    </View >
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
