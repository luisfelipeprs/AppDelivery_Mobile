import { FontAwesome } from '@expo/vector-icons';
import { Redirect, router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';


export default function ProductsLayout () {
  return (
    <Stack>

      <Stack.Screen name="index" options={{
        title: 'Config',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
        headerRight: () => (
          <TouchableOpacity
            // onPress={() => router.push('account')}
            onPress={() => {
              // router.push('config/accountSettingsScreen')
              router.push('config/cadastroScreen')
            }}
            // style={{ paddingRight: 15, display: 'flex', flexDirection: 'row', alignContent: 'center', gap: 10 }}
            className='pr-5 flex flex-row gap-3'
          >
            <Text className='text-lg'>User</Text>
            <FontAwesome name="user" size={24} color="white" />
          </TouchableOpacity>
        ),
      }} />

      <Stack.Screen name="avaluationPage" options={{
        title: 'avaluationPage',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="cadastroScreen" options={{
        title: 'cadastroScreen',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="orderAcceptanceScreen" options={{
        title: 'orderAcceptanceScreen',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="deliveryHistory" options={{
        title: 'deliveryHistory',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="supportScreen" options={{
        title: 'supportScreen',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="userEvaluationReporting" options={{
        title: 'userEvaluationReporting',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="languageSelectionScreen" options={{
        title: 'languageSelectionScreen',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="accountSettingsScreen" options={{
        title: 'accountSettingsScreen',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="driverSchedule" options={{
        title: 'driverSchedule',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

      <Stack.Screen name="mapsLocation" options={{
        title: 'mapsLocation',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
      }} />

    </Stack>
  )
}
