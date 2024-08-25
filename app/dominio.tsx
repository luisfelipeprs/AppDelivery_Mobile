import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "./ctx";
import { router } from "expo-router";

export default function Dominio () {
  // const { signIn } = useSession();
  const handleLogin = () => {
    //Adicione sua lógica de dominio aqui
    // signIn();
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    router.replace("/login");
  };
  const handleBarra = () => {
    //Adicione sua lógica de dominio aqui
    // signIn();
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    router.replace("/");
  };
  // const handleDominio = () => {
  //   //Adicione sua lógica de dominio aqui
  //   // signIn();
  //   //Antes de navegar, tenha certeza de que o usuário está autenticado
  //   router.replace("/dominio");
  // };

  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Text className="font-bold text-3xl text-blue-300">Welcome ao Dominio! 🌈 </Text>
      <Text style={styles.paragraph}>
        This is a simple repo that emulates a dominio authentication workflow
        using Expo Router, focused on the navigation aspect.
        DOMINIO-DOMINIO-DOMINIO
      </Text>
      <View
        style={styles.separator}
        lightColor="#04ff00"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput placeholder="Username(not required)" style={styles.input} />
      <TextInput
        placeholder="Password(not required)"
        secureTextEntry
        style={styles.input}
      />
      <Button title="login" onPress={handleLogin} />
      <Button title="barra" onPress={handleBarra} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#00ff44",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
});
