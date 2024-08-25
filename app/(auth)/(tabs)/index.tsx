import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, TextInput, Dimensions, SafeAreaView } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSession } from "@/app/ctx";
import { router } from 'expo-router';

export default function HomeScreen () {
  const { session, isLoading } = useSession();
  const screenWidth = Dimensions.get('window').width;

  if (isLoading) {
    return <Text className="text-center text-lg mt-4">Carregando...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 mt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-6 bg-gradient-to-r from-red-600 rounded-md  shadow-lg rounded-b-3xl">
          <View className="flex-1 flex-row bg-[#ff0000] m-auto px-4 rounded-md">
            <TouchableOpacity className=" m-auto">
              <FontAwesome name="user-circle" size={38} color="#ffffff" />
            </TouchableOpacity>
            <View className="px-4 py-3 rounded-lg flex-1">
              <Text className="text-lg font-semibold text-white">Local de Entrega:</Text>
              <TouchableOpacity className="flex-row items-center mt-1">
                <Text className="text-xl font-bold text-white">São Paulo, SP</Text>
                <AntDesign name="down" size={16} color="white" style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 py-2 bg-white mx-4 mt-2 rounded-lg shadow-md border border-gray-400 relative">
          <TextInput
            placeholder="Buscar restaurantes, comidas..."
            className="pl-10 pr-4 py-1"
            placeholderTextColor="gray"
          />
          <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <AntDesign name="search1" size={20} color="gray" />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1 mt-3 px-4">
          {/* Featured Restaurants */}
          <Text className="text-xl font-semibold mb-4 text-gray-900">Restaurantes em destaque</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TouchableOpacity className="mr-4 w-60">
              <View className="h-40 rounded-lg overflow-hidden shadow-lg">
                <Image
                  source={{ uri: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/98ac/live/a4e076f0-4c2c-11ee-a928-53057d3785fc.png.webp" }}
                  className="h-full w-full"
                  resizeMode="cover"
                  width={600}
                  height={400}
                />
              </View>
              <Text className="mt-2 font-medium text-gray-900">Restaurante A</Text>
              <Text className="text-sm text-gray-700">Comida Italiana</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-4 w-60">
              <View className="h-40 rounded-lg overflow-hidden shadow-lg">
                <Image
                  source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlToowLXeCp0sXfBQDJmqdHESw_PSnncVVuw&s" }}
                  // source={{ uri: "https://via.placeholder.com/600x400" }}
                  className="h-full w-full"
                  resizeMode="cover"
                  width={600}
                  height={400}
                />
              </View>
              <Text className="mt-2 font-medium text-gray-900">Restaurante B</Text>
              <Text className="text-sm text-gray-700">Comida Japonesa</Text>
            </TouchableOpacity>
            {/* Adicione mais restaurantes aqui */}
          </ScrollView>

          {/* Categories */}
          <Text className="text-xl font-semibold mb-4 text-gray-900">Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 gap-1">
            <TouchableOpacity className="items-center w-24" onPress={() => router.push('Categories')}>
              <View className="bg-[#ff0000] p-4 rounded-full shadow-md">
                <FontAwesome name="coffee" size={28} color="white" />
              </View>
              <Text className="mt-2 text-sm text-center text-gray-900">Cafés</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center w-24" onPress={() => router.push('Categories')}>
              <View className="bg-[#ee0000] p-4 rounded-full shadow-md">
                <FontAwesome name="cutlery" size={28} color="white" />
              </View>
              <Text className="mt-2 text-sm text-center text-gray-900">Almoços</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center w-24" onPress={() => router.push('Categories')}>
              <View className="bg-[#dd0000] p-4 rounded-full shadow-md">
                <AntDesign name="isv" size={28} color="white" />
              </View>
              <Text className="mt-2 text-sm text-center text-gray-900">Lanches</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center w-24" onPress={() => router.push('Categories')}>
              <View className="bg-[#cc0000] p-4 rounded-full shadow-md">
                <FontAwesome name="beer" size={28} color="white" />
              </View>
              <Text className="mt-2 text-sm text-center text-gray-900">Bebidas</Text>
            </TouchableOpacity>
            {/* Adicione mais categorias aqui */}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
