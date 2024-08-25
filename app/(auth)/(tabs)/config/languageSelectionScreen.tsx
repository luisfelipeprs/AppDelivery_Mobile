import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function LanguageSelectionScreen () {
  const [selectedLanguage, setSelectedLanguage] = useState('Português');

  const languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  return (
    <View className={"flex-1 my-2"}>

      {/* Lista de Idiomas */}
      <ScrollView className={"flex-1 p-4 my-3"}>
        <Text className={"text-lg font-semibold mb-4"}>Escolha seu idioma preferido:</Text>

        {languages.map(language => (
          <TouchableOpacity
            key={language.code}
            className={`p-4 mb-4 rounded-lg ${selectedLanguage === language.label ? 'bg-red-500' : 'bg-white'}`}
            onPress={() => setSelectedLanguage(language.label)}
          >
            <Text className={`text-lg font-semibold ${selectedLanguage === language.label ? 'text-white' : 'text-black'}`}>
              {language.label}
            </Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Botão para Confirmar a Seleção */}
      <View className={"p-4"}>
        <TouchableOpacity className={"bg-red-500 p-4 rounded-lg"}>
          <Text className={"text-center text-white text-lg font-semibold"}>Confirmar Idioma</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
