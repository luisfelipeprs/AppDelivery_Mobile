import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type UsuarioFormValues = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

export default function UsuarioForm () {
  const { control, handleSubmit } = useForm<UsuarioFormValues>();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const onSubmit = (data: UsuarioFormValues) => {
    console.log(data);
    console.log("Selected Document: ", selectedDocument);
  };

  const pickDocument = async () => {
    // Solicita permissões para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões para acessar a galeria.');
      return;
    }

    // Abre a galeria para selecionar uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedDocument(result.assets[0].uri);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: '#4A4A4A', marginBottom: 16 }}>
        Cadastro de Usuário
      </Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Nome</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="person-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Email</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="mail-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Senha</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="lock-closed-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Telefone</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="call-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Telefone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#4CAF50', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center', marginBottom: 16 }}
        onPress={pickDocument}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Selecionar Documento</Text>
      </TouchableOpacity>

      {selectedDocument && (
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Documento Selecionado:</Text>
          <Image source={{ uri: selectedDocument }} style={{ width: 100, height: 100, borderRadius: 8 }} />
        </View>
      )}

      <TouchableOpacity
        style={{ backgroundColor: '#f0b429', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center' }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
