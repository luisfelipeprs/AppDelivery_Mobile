import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EmpresaFormValues = {
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  contato: string;
  descricao: string;
};

export default function EmpresaForm () {
  const { control, handleSubmit } = useForm<EmpresaFormValues>();

  const onSubmit = (data: EmpresaFormValues) => {
    console.log(data);
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: '#4A4A4A', marginBottom: 16 }}>
        Cadastro de Empresa
      </Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Nome da Empresa</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="business-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Nome da Empresa"
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
        name="cnpj"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>CNPJ</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="barcode-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="CNPJ"
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
        name="endereco"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Endereço</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="location-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Endereço"
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
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="contato"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Nome do Contato</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="person-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Nome do Contato"
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
        name="descricao"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 8 }}>Descrição da Empresa</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, padding: 8 }}>
              <Ionicons name="document-text-outline" size={20} color="gray" />
              <TextInput
                style={{ marginLeft: 8, flex: 1, fontSize: 16 }}
                placeholder="Descrição da Empresa"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#ff0000', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center' }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cadastrar Empresa</Text>
      </TouchableOpacity>
    </View>
  );
}
