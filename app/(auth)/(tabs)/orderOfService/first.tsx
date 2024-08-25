import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";

export default function FirstScreen () {

  const handleProducts = () => {
    router.push('/products');
  };

  return (
    <View className="bg-gray-700 flex-1 text-center justify-center">
      <Text>First screen</Text>
      <Button title="Products" onPress={handleProducts} />
      {/* <Link href="/Products">ProductsZADA</Link> */}
    </View>
  );
}
