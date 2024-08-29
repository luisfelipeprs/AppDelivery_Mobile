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
          <Text className="text-xl font-semibold mb-4 text-gray-900">Anúncios</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TouchableOpacity className="mr-4 w-60">
              <View className="h-40 rounded-lg overflow-hidden shadow-lg">
                <Image
                  source={{ uri: "data:image/png;base64,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" }}
                  className="h-full w-full"
                  resizeMode="cover"
                  width={600}
                  height={400}
                />
              </View>
              <Text className="mt-2 font-medium text-gray-900">Desconto de 50% em ...</Text>
              <Text className="text-sm text-gray-700">Valido apenas para x, y e z</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-4 w-60">
              <View className="h-40 rounded-lg overflow-hidden shadow-lg">
                <Image
                  source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAA81BMVEX///+1ACf/4AC0ACOvAACyABe0ACGyACizAByzAB6yABn//P3/4gCxABCyABT/3gD/6AD99vj46Ov///qxAArw09jiqLH14OT/7AD77vH02t/VgY3ls7r/9rb/6mP/5Cz/+MX//u3//NrTeYftxs3bl5///OL/5kf/8Y7/+tH/+L//61nDTVneoKjaj5v/7nq7MT//9JrDQVbNY3S7Hzm/Okv50QbYfRfinBL/9avJUmbFXGS3JTDQcH2/KUPxx0bpvrTopADJXR29LR7RdnLvugbUgDz/7D/BPB3di03z0sXkqHbNVArISxrTcRnnrQ/fixAoSubbAAAMlUlEQVR4nO1baXeiyhYNqWKexIATZDBihg4aEtSkVXJf6/N13pDh//+aV1VMDihexE4+uNfKWq4Isutwzj5DwdHRAQcccMABBxxwwAEHHHDAAQd8DZqXP36eXtw2T76ayHa4+nktqeqxKp2fPVw0v5pNNk6vjxNIZw+XX00oAz+Pl3B+f/XVnDaB8D0/uzk9PX24vzsPzHz/fa18iymeXYTR1rz9eSeRFTx8UyufnCF29/OB1rw4I1a+Pv0yUptwoSL7LovZ7R2hfLalYIha2e76w6FnWmWtcIZLQAIhrd78k1NsZfX3j+wfKBtWe8hCqCu0DCHl2/U9sExwiXjdpH3RvJGIJ288WzMq5sjldZqhQjAyNbLEvVANcIMMvEYQbok6r7hLBLFh+f0xR3Mx2QCA5h1rb3xPkLPeraN0Qox8vboerWxU/BfkBQyg0iDAF6u8H8JXyIr36+uHn1jyrm8X/le2Oy2H12U+lWsITnY6e6F8iQjfbCh4LjDj89jGmt31nLGgCOmWXbCy4LT3EH6Xmy2MYg8L3PktUS7zkdJlgc8mG4DXqW656PhrIsK/N6pt804qqX/9gygXvS3XEAzsdY2CGWO5vdh4RPP+12TKyzSTTTDFyrJbMOUHHFUbj2iMeDYP14gyPfYbBRJuYuXalB1sWtmBLgaQoW8Ul7Gxic/Xlzl2T9iRL4aOMnZRlJtnmxhXHXo7K2Z9r4x9u0jGa8RY7OrB9XjAALA+7MCY5zI4A0F/KcjKzXtS/V6kUK72CEm+98/n2ce/+uuszfftisNnip4AnWIydvOeFGYpXVEHEuOwlnhXKv221zFWuihjWw7MdB9aGFWKSH8np+fHqZQ9GV8GtlFsqsfSid1L9Qr+hZDQ7H4mZcBx/XYR2a95HzSfd6dX857RwxUOA9CnU9SYXGmtVEIwriZtj5KzEgwP2U61AMo/zqSwxT+9jDhrPL46/Yg+Yj8/OWqnaZwyTGJJs3xWz2CMKPfbBeSS5sWdpJIW//rsJhj/aDJgKRYRPsFqfXd01OZS7rKwoFea4UM9K/w4uW8Wkf6ubs7j+Q8eVFyOpwivE+Iv0o+jVJdQ/GWxMvxxZuXByEqrWoAzN0/vr6WItCodq4OBKtXICh5OjtKCDoxTEoJhutmVHeRNu4j4u7q4Qe6sBnYOUar9Pj05qg5TygrdDE7TrPlIEo3uOIswxeisWUj6Ozm5ung4O5eQqaUaQmnw69//qZcr/ZSQY7iQpw1dc15i7fEWxTNDj4dFZWzE++r2x3//N3l75VgW6AqEaX6JNRpD7AkMuseN6B7XvS2LEBo+FjnJsF8oliXlcLq96MfwYiQnMpCNynU7sx6KodAjqzDKor/RUIAOc0bDDQSPkd2WQc6Tt+WLKTOjSlHNn52ivAkELzSN9TgWgnqNoWXPODLg32v/OLlXSJGBkKYMyXXa8XHVzogJg1KHfnIWo+gKz8t6lszx0C0kY6Po33QVZ+4adasfZmWgRPeFg6zfrlhWpevwqUE7v3qUsQugrPU3mVjuzvte2V9cHQ9fKmWNHCHWDZPbtHZCWViUxnywN4Ud0BdltKIkZgS0W1n4su6DjRFBYZ2RE2nMifJoE2PFsY35LqKd1GrKSnsvWm5mS0ukcTfKnY1m4ceu41fi+keL9Qy2Uu6uQWXZmEjjbg1r2VkXLQBHPmB4Wul1YkpuMNbU/dQfM7aZIBFp3KFhbacHCy+7bKRVPPQje5rEg2h/7rbWy4mxK9sN6GTo5c/Y9bRrIF8zjVayFL0bmsTCJuTm9M7ujkZ+LFj1jSExT5n3rbxWbq2YGEDFRPV3I+ngmF5YRRi4TJPjNk9E1Twt0Eo/cksLxMsHAtTXj5oBDR5z7j2Ue0vjdjDukMWL3aRkgKGGVRFhGDtw4zFM0gIfMq470Y9xY69remNlvY9wSMjzOIZoLpUywA0Vq5yMsvTQGsjCQIiUrjqMz5RH4Q02Q+UTglLYHm2SOg46eZo/e7wU20KU4YxemAiZcegSFqD0VnSin8gyUKIDAgcT+uGqqhsZU7KTI19ry1Um70Zj6saLjMs0RjbDJXQFhoq+tOadP6r1y8E/IbZvGxejGc2JbubII/bKr8S9stZ2gCwzURFQHnH0KPxcd7mFU8ITiOjQQ/TRhLCnHWnO5tTk5nAKcaXKlONUgTfCOvFgErUaSlR0Vhbui+6F/yZjUL0buDtEjhG1U2sMLeTJeytVJsOk/ozoyYAKw68+WrBcnPsIYSwqFY4SWLRSjzgxA2k9dQSj50rUj8t6z4M0kUS9HdOPGml24fIwvCca2TjD4wF7rOMeq9rHQUC7Xa3RclMmH1QuwtaKXHLjzko0GDyDqvrQPTqLYhgZKgg6HjmvWCFlU4dHZWqviz1V7K5W3/Qo11C57KyIDy+3lhTHwKMLwQvWobUWCAv9MBRD7yKigZfW6HOy7pOS0vbdVZ/gOke5kFZl0uP5DkGs9PAxQhhc9eFizEVz4WgbQuiSc+0XKA+JDpY9PqWWY5ycU/uyk7IdzkDBtKt1TRPrVXsIyRF0RHjhnjCRcmtRngDwpWt1PMiNiK80TCF1UAvb6xhloZ06amB0oT9qmabfV0L34zwtJDxvYSWSfyO565yuQ+iQKUq17aY3qQyXuzAur9tG4mlaoenY/rwTuMmCDzNspP6dObszMBhHiO0+veZxBtjNyxc5X1bXGwBEN7+SRDyItxWqSVrjaZfoTN2i4LqnL7jeDp1Hldpug5yPCs2YG6PEdopXAfRgDFG3HAhlfU0BJO+yhSOamdsXBEoraj7CgQond+PK4yVchC4Hmwa2p0OvYrX7qcOtXHVEAiN922sZcfNxZPVkmqblXpITzWDnj+aDGYDh8XqfzOG1Np/y44q5C1+Uh7brx5KOuV5p+eZca2YRhwCuT0acqCdU+B5mjo/opO1H7Lh1U00bwqcArunFjD52CECZmKBh9lCtQ2S24qPoq69WmUknkBfG2nBeAJfuetWwggKuZ9S7LlYyhkOyVkF6jEy+3Iihhe++NW33tvIKwU15cKZBRYyAAhWdeAA9DEyL70lnmTDczYNDxo/yNpMQxV32Cs3C7R9LMHccqpQaLmBkpHDLlRqzqwcHqLbSy+wlcMziXqfh47Eay7w/Pz+9JpS5F2xhCFHi1rylANHNYp6vEA2PU7L1DShjL2qcNNsf406OfRuUENRnJmaMe9EGKYuXe9HULcucaPjuFkM9oMPe0Gy3TY8Kt58nakmdfcyk2ixmHO9DNZYL7oXx3M4wur2sLQAMXkH1GIwGWtNZbfDOsPznoPRMYX8mvEY4cYi2s9LmFmdgDLFqMn9zq4idSLUnFhN9Lg1eWeptSigL45FpeuNl9VEeC+WLgaRUyJ5PzxH+rA3IQ3vs27H6zk6PpV9TgDgDTpZXZ4Kw6IcgMaptR96eMvtcGxBe7JuECH/WSjX1eUKlP3coe/t5zrtqvcBtKbNPNXVKLPxZUidALc0+ajX14w2kUAbpY48igLfntqPMvg5qv3DeeB2UZgD5x4SdzEq12XS6auV43LUPiNaI2jDkncMTErT3ydOgJE2miPQrJv/x9CZ9THh2kTOzv8foMeqWD7d5phR8HtdKx7Wa9MR+SiVp9ol0AjDPUk2avYN5ypyz7/dBNNTkb1NkTD4GkvoxYaez0mBQKw0QZZT9ZseEcnLYuvq0UBhe9rNJOFkwyJbsU6n0SiHfKE2QdqjM9Fkt1T4SA/f+AF8Em5TkmZzRHzOozRBt/vOTmaq1D/Rx+jx4TwqMP2FgDM0whW3SH0sPpHeS83A2kdRnXL+9xrdHcPb7etA8xGqLz3yaEWH6FhzEcqqklkrHH3MlJyVXsi9UIMpmn84W5pAeKSveZmqtJCQ1ct7xX240Ov0t0x/OIb8oFkw+nhMDK7nHf/lR7fS2a1ffS7U35Mgsz8WEGfbPefActEqf2+INIOr1aTkt55+v7kx5tMUrFewyX57d+0uPa1G3hltl7O9hYAKcsbdxjDkD7zb+KwD2xv36FdBfamAC0Ta5bSYZBCBtZPTHoRnbDV+oIsZ/BaHqj9ftYiwYWP/TSW49Gt1+di6B38XABI32SwZlAL5aIpZQbrMbKed6lmO/0NoOv3bCnGyOfCeUK468hrLw/QxMULYeYepeyf6GJzvDfkx5/U7xsk/8MoiWzy6PBfYy/isOmu0vPm+gDL+aUhY0w4NJwwrg9/XgBEbLDbdLgFzQFsy+gfceaJ7T5QIe1/8zEBvtx95LcS9q/wmI2vdMGAcccMABBxxwwAEHHHBAXvwfLkUjThC34LYAAAAASUVORK5CYII=" }}
                  // source={{ uri: "https://via.placeholder.com/600x400" }}
                  className="h-full w-full"
                  resizeMode="cover"
                  width={600}
                  height={400}
                />
              </View>
              <Text className="mt-2 font-medium text-gray-900">R$ 7,00 de taxa para estudante</Text>
              <Text className="text-sm text-gray-700">Crie conta e faça upload da sua carterinha</Text>
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
