import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";

export default function TabOneScreen () {

  const handleProducts = () => {
    router.push('/products');
  };

  const handleBarcodeScanner = () => {
    router.push('orderOfService/barcode');
  };

  return (
    <View className="bg-white-100 flex-1 text-center justify-center">
      <Text>INDEX orderOfService</Text>
      <Button title="Products" onPress={handleProducts} />
      <Button title="Scan Barcode" onPress={handleBarcodeScanner} />
      {/* <Link href="/Products">ProductsZADA</Link> */}
    </View>
  );
}
