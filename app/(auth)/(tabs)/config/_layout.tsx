import { Redirect, Stack } from 'expo-router';


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
      }} />

    </Stack>
  )
}
