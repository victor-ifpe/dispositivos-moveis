import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../../api';

export default function TelaCadastroContato({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [anotacao, setAnotacao] = useState('');

  const salvarContato = async () => {
    try {
      await api.post('/contatos', {
        nome,
        telefone,
        cidade,
        anotacao,
      });
      Alert.alert(
        'Sucesso',
        'Contato cadastrado com sucesso!'
      );
      navigation.navigate('TelaListaContatos');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar o contato.'
      );
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('TelaListaContatos')} >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.tituloPrincipal}> Cadastro de Contato </Text>

      </View>

      <View style={styles.caixaLogin}>

        {/* Nome */}
        <Text style={styles.titulo}> Nome </Text>
        <TextInput style={styles.input}
          placeholder="Digite o nome..."
          value={nome}
          onChangeText={setNome}
        />

        {/* Telefone */}
        <Text style={styles.titulo}> Telefone </Text>
        <TextInput style={styles.input}
          placeholder="Digite o telefone..."
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        {/* Cidade */}
        <Text style={styles.titulo}> Cidade </Text>
        <TextInput style={styles.input}
          placeholder="Digite a cidade..."
          value={cidade}
          onChangeText={setCidade}
        />

        {/* Anotação */}
        <Text style={styles.titulo}> Anotação </Text>
        <TextInput style={styles.input}
          placeholder="Digite uma anotação..."
          value={anotacao}
          onChangeText={setAnotacao}
        />

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.botao} onPress={salvarContato}>
          <Text style={styles.textoBotao}> Salvar </Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cabecalho: {
    height: 60,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 40,
    marginBottom: 20,
  },

  tituloPrincipal: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    position: 'absolute',
    left: 15,
  },

  caixaLogin: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  botao: {
    width: '100%',
    height: 45,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});