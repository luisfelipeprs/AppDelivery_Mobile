import { Redirect, Stack, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { Text } from '@/components/Themed';
import { TouchableOpacity, View } from 'react-native';

export default function ProductsLayout () {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="home" color={focused ? '#ff0000' : '#ff7272'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#ff0000' : '#ff7272', fontSize: 12 }}>
              Home
            </Text>
          ),
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="orderOfService"
        options={{
          title: 'OrderOfService',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="gear" color={focused ? '#ff0000' : '#ff7272'} />
          ),
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
          tabBarButton: (props) => (
            <View
              style={{
                bottom: 20,
                height: 60,
                width: 60,
                borderRadius: 35,
                backgroundColor: props.accessibilityState?.selected ? '#ff0000' : '#ff7272',
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
                <FontAwesome size={28} name="cart-plus" color="#FFF" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#ff0000', // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: '#fff', // Cor do texto do cabeçalho
          },
          headerShown: true,
        }}
      />


      <Tabs.Screen
        name="config"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={28} name="gear" color={focused ? '#ff0000' : '#ff7272'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#ff0000' : '#ff7272', fontSize: 12 }}>
              Config
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#ff0000', // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: '#fff', // Cor do texto do cabeçalho
          },
          headerShown: true,
        }}
      />

    </Tabs>
  )
}
