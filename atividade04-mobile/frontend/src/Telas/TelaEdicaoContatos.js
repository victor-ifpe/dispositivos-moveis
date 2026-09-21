import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import api from '../../api';

export default function TelaEdicaoContatos({ navigation, route }) {

  const {
    id,
    nome: nomeInicial,
    telefone: telefoneInicial,
    cidade: cidadeInicial,
    anotacao: anotacaoInicial,
  } = route.params;

  const [nome, setNome] = useState(nomeInicial || '');
  const [telefone, setTelefone] = useState(telefoneInicial || '');
  const [cidade, setCidade] = useState(cidadeInicial || '');
  const [anotacao, setAnotacao] = useState(anotacaoInicial || '');

  const salvarAlteracoes = async () => {

    if (!nome.trim() || !telefone.trim() || !cidade.trim()) {
      Alert.alert(
        'Atenção',
        'Preencha nome, telefone e cidade.'
      );
      return;
    }

    try {

      await api.put(`/contatos/${id}`, {
        nome,
        telefone,
        cidade,
        anotacao,
      });

      Alert.alert(
        'Sucesso',
        'Contato alterado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('TelaListaContatos'),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível alterar o contato.'
      );
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.navigate('TelaListaContatos')
          }
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Editar Contato
        </Text>

        <View style={styles.espaco} />

      </View>

      <View style={styles.formulario}>

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
        />

        <Text style={styles.label}>
          Telefone
        </Text>

        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>
          Cidade
        </Text>

        <TextInput style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          placeholder="Digite a cidade"
        />

        <Text style={styles.label}>
          Anotação
        </Text>

        <TextInput style={[styles.input, styles.anotacao]} value={anotacao} onChangeText={setAnotacao} placeholder="Digite uma anotação" multiline />

        <TouchableOpacity
          style={styles.botao}
          onPress={salvarAlteracoes}
        >
          <Text style={styles.textoBotao}>
            Salvar alterações
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cabecalho: {
    height: 70,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  botaoVoltar: {
    width: 40,
  },

  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  espaco: {
    width: 40,
  },

  formulario: {
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },

  anotacao: {
    height: 100,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

});