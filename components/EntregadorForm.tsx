import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type EntregadorFormValues = {
  nome: string;
  cnh: string;
  veiculo: string;
  modelo: string;
  placa: string;
  fotoCNH?: string;
  fotoVeiculo?: string;
};

export default function EntregadorForm () {
  const { control, handleSubmit } = useForm<EntregadorFormValues>();
  const [fotoCNH, setFotoCNH] = React.useState<string | null>(null);
  const [fotoVeiculo, setFotoVeiculo] = React.useState<string | null>(null);

  const onSubmit = (data: EntregadorFormValues) => {
    console.log(data);
  };

  const pickImage = async (type: 'cnh' | 'veiculo') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (type === 'cnh') {
        setFotoCNH(result.assets[0].uri);
      } else {
        setFotoVeiculo(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: '#4A4A4A', marginBottom: 16 }}>
        Cadastro de Entregador
      </Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Nome do Entregador</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="person-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Nome do Entregador"
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
        name="cnh"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>CNH</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="card-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="CNH"
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
        name="veiculo"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Veículo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="car-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Veículo"
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
        name="modelo"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Modelo do Veículo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="construct-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Modelo do Veículo"
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
        name="placa"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Placa do Veículo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="key-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Placa do Veículo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          </View>
        )}
      />

      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity style={{ backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 8 }} onPress={() => pickImage('cnh')}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>Upload Foto CNH</Text>
        </TouchableOpacity>
        {fotoCNH && (
          <Image
            style={{ height: 160, width: '100%', borderRadius: 8, borderColor: '#DDDDDD', borderWidth: 1 }}
            source={{ uri: fotoCNH }}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity style={{ backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 8 }} onPress={() => pickImage('veiculo')}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>Upload Foto Veículo</Text>
        </TouchableOpacity>
        {fotoVeiculo && (
          <Image
            style={{ height: 160, width: '100%', borderRadius: 8, borderColor: '#DDDDDD', borderWidth: 1 }}
            source={{ uri: fotoVeiculo }}
            resizeMode="cover"
          />
        )}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: '#f0b429', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center' }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cadastrar Entregador</Text>
      </TouchableOpacity>
    </View>
  );
}
