import { FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import { useSession } from '@/app/ctx';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ProductsLayout () {
  const { userAccount, signOut } = useSession()
  const accountType = userAccount?.typeAccount
  const handlePress = () => {
    if (accountType === 'Guest') {
      signOut();
      router.replace('/');
    } else {
      router.push('config/accountSettingsScreen');
    }
  };
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Configurações',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={handlePress}
            className="pr-5 flex flex-row gap-3">
            {accountType !== 'Guest' ? (
              <Text className="text-lg font-bold text-white">Perfil</Text>
            ) : (
              <Text className="text-lg font-bold text-white">Entrar</Text>
            )}
            <FontAwesome name="user" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
      />

      <Stack.Screen name="avaluationPage" options={{
        title: 'Avaliar Entregador',
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
        title: 'Pedido Disponíveis',
        headerTitleAlign: 'center',
        headerBackButtonMenuEnabled: true,
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff', // Cor do texto do cabeçalho
        },
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
        headerLeft: () => (
          <TouchableOpacity className='bg-transparent' onPress={() => router.navigate('/')}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        )
      }} />

      <Stack.Screen name="deliveryHistory" options={{
        title: 'Histórico de Pedidos',
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
        title: 'Idioma',
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
        title: 'Configuração da Conta',
        headerStyle: {
          backgroundColor: '#130a8f', // Cor do cabeçalho
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTitleAlign: "center",
        headerShown: true,
        headerTintColor: '#fff', // Cor do botão de voltar
        headerLeft: () => (
          <TouchableOpacity className='bg-transparent' onPress={() => router.navigate('config/')}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        )
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
