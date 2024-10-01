
// Código do CadastroScreen
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import EmpresaForm from '@/components/EmpresaForm';
import EntregadorForm from '@/components/EntregadorForm';
import UsuarioForm from '@/components/UsuarioForm';

export default function CadastroScreen () {
  const [tipoCadastro, setTipoCadastro] = useState<'empresa' | 'entregador' | 'usuario'>('empresa');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>
            Cadastro
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
            Escolha o tipo de cadastro
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => setTipoCadastro('empresa')}
              style={{
                padding: 16,
                borderRadius: 8,
                backgroundColor: tipoCadastro === 'empresa' ? '#f0b429' : '#f1f1f1',
              }}
            >
              <Text style={{ fontSize: 16, color: tipoCadastro === 'empresa' ? '#fff' : '#333' }}>
                Empresa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipoCadastro('entregador')}
              style={{
                padding: 16,
                borderRadius: 8,
                backgroundColor: tipoCadastro === 'entregador' ? '#f0b429' : '#f1f1f1',
              }}
            >
              <Text style={{ fontSize: 16, color: tipoCadastro === 'entregador' ? '#fff' : '#333' }}>
                Entregador
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipoCadastro('usuario')}
              style={{
                padding: 16,
                borderRadius: 8,
                backgroundColor: tipoCadastro === 'usuario' ? '#f0b429' : '#f1f1f1',
              }}
            >
              <Text style={{ fontSize: 16, color: tipoCadastro === 'usuario' ? '#fff' : '#333' }}>
                Usuário
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {tipoCadastro === 'empresa' && <EmpresaForm />}
        {tipoCadastro === 'entregador' && <EntregadorForm />}
        {tipoCadastro === 'usuario' && <UsuarioForm />}
      </ScrollView>
    </SafeAreaView>
  );
}
