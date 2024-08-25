import { Redirect, Stack } from 'expo-router';


export default function ProductsLayout () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Config',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="avaluationPage" options={{
        title: 'avaluationPage',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="cadastroScreen" options={{
        title: 'cadastroScreen',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="availableOrders" options={{
        title: 'availableOrders',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="orderAcceptanceScreen" options={{
        title: 'orderAcceptanceScreen',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="deliveryHistory" options={{
        title: 'deliveryHistory',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="supportScreen" options={{
        title: 'supportScreen',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="userEvaluationReporting" options={{
        title: 'userEvaluationReporting',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="languageSelectionScreen" options={{
        title: 'languageSelectionScreen',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />

      <Stack.Screen name="accountSettingsScreen" options={{
        title: 'accountSettingsScreen',
        headerStyle: {
          backgroundColor: '#ff0000', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
      }} />
    </Stack>
  )
}
