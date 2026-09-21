import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TelaLogin({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');


  return (
    <View style={styles.container}>

      <View style={styles.caixaLogin}>

        <Ionicons
          name="person-circle-outline"
          size={150}
          color="##333333"
          style={styles.icone}
        />

        <Text style={styles.titulo} Login>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu login..."
          value={login}
          onChangeText={setLogin}
        />

        <Text style={styles.titulo} Login>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('TelaListaContatos')}
        >
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate('TelaCadastroUsuario')}
        >
          <Text style={styles.textoBotao}>Cadastre-se</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('TelaEsqueceuSenha')}
        >
          <Text style={styles.textoSenha}>esqueceu a senha?</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  caixaLogin: {
    width: '85%',
    alignItems: 'center',
  },

  icone: {
    marginBottom: 30,
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
    marginTop: 40,
    marginBottom: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoSenha: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },

  botaoCadastro: {
    width: '100%',
    height: 45,
    backgroundColor: '#ff000df6',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});