import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import EmpresaForm from '@/components/EmpresaForm';
import EntregadorForm from '@/components/EntregadorForm';

export default function cadastroScreen () {
  const [tipoCadastro, setTipoCadastro] = useState<'empresa' | 'entregador'>('empresa');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-6">Cadastro</Text>
          <Text className="text-lg text-gray-600 mb-8">Escolha o tipo de cadastro</Text>
          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={() => setTipoCadastro('empresa')}
              className={`p-4 rounded-lg ${tipoCadastro === 'empresa' ? 'bg-red-600' : 'bg-gray-200'}`}
            >
              <Text className={`text-lg ${tipoCadastro === 'empresa' ? 'text-white' : 'text-gray-700'}`}>
                Empresa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipoCadastro('entregador')}
              className={`p-4 rounded-lg ${tipoCadastro === 'entregador' ? 'bg-red-600' : 'bg-gray-200'}`}
            >
              <Text className={`text-lg ${tipoCadastro === 'entregador' ? 'text-white' : 'text-gray-700'}`}>
                Entregador
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {tipoCadastro === 'empresa' ? <EmpresaForm /> : <EntregadorForm />}
      </ScrollView>
    </SafeAreaView>
  );
}
