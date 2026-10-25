import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function TelaLogin({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = async () => {
    if (!login || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, login, senha);

      Alert.alert('Sucesso', 'Login realizado com sucesso!');

      navigation.navigate('TelaListaContatos');

    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Erro',
          'E-mail ou senha incorretos.'
        );
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Erro',
          'Digite um e-mail válido.'
        );
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível realizar o login.'
        );
      }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.caixaLogin}>

        <Ionicons name="person-circle-outline" size={150} color="#333333" style={styles.icone} />

        {/* Login */}
        <Text style={styles.titulo}> Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail..."
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Senha */}
        <Text style={styles.titulo}> Senha </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {/* Botão Login */}
        <TouchableOpacity
          style={styles.botao}
          onPress={fazerLogin}
        >
          <Text style={styles.textoBotao}> Login </Text>
        </TouchableOpacity>

        {/* Botão Cadastro */}
        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate('TelaCadastroUsuario')}
        >
          <Text style={styles.textoBotao}> Cadastre-se </Text>
        </TouchableOpacity>

        {/* Esqueceu a senha? */}
        <TouchableOpacity onPress={() => navigation.navigate('TelaEsqueceuSenha')} >
          <Text style={styles.textoSenha}> esqueceu a senha? </Text>
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

  botaoCadastro: {
    width: '100%',
    height: 45,
    backgroundColor: '#ff000d',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoSenha: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },

});