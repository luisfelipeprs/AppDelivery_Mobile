import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import { useSession } from "@/app/ctx";

export default function FirstScreen () {
  const { signOut, session } = useSession();

  const handleDetails = () => {
    //Adicione sua lógica de login aqui
    // signIn();
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    // router.replace("/details");
    router.push('/details');
  };

  const handleProducts = () => {
    router.push('/products');
  };

  return (
    <View className="bg-gray-700 flex-1 text-center justify-center">
      <Text>First screen</Text>
      <Button title="Products" onPress={handleProducts} />
      {/* <Link href="/Products">ProductsZADA</Link> */}
      <Text>Config AQUI</Text>
      <Button title="details" onPress={handleDetails} />
      {/* <Link href="/details">detailsZADA</Link> */}
      <Text style={styles.title}>SAIR E DESLOGAR</Text>
      <Text>nome do usuário: {session}</Text>

      <Button
        title="SAIR E DESLOGAR"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
