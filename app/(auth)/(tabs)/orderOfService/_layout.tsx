import { Redirect, Stack } from 'expo-router';


export default function ProductsLayout () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="first" options={{ headerShown: false }} />
      <Stack.Screen name="barcode" options={{ headerShown: false }} />
    </Stack>
  )
}
