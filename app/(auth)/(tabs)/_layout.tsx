import { Redirect, Stack, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { Text } from '@/components/Themed';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProductsLayout () {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="orderOfService"
        options={{
          title: 'OrderOfService',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="home" color={focused ? '#130a8f' : '#2b22b1'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#130a8f' : '#2b22b1', fontSize: 12 }}>
              Home
            </Text>
          ),
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="gear" color={focused ? '#130a8f' : '#2b22b1'} />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('config')} style={{ paddingLeft: 15 }}>
              <FontAwesome name="bars" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#130a8f', // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: '#fff', // Cor do texto do cabeçalho
          },
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
          tabBarButton: (props) => (
            <View
              style={{
                bottom: 20,
                height: 60,
                width: 60,
                borderRadius: 35,
                backgroundColor: props.accessibilityState?.selected ? '#130a8f' : '#2b22b1',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                {...props}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  borderRadius: 35,
                }}
              >
                <FontAwesome size={28} name="motorcycle" color="#FFF" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />


      <Tabs.Screen
        name="config"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="gear" color={focused ? '#130a8f' : '#2b22b1'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#130a8f' : '#2b22b1', fontSize: 12 }}>
              Config
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#130a8f', // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: '#fff', // Cor do texto do cabeçalho
          },
          headerShown: false,
        }}
      />

    </Tabs>
  )
}
