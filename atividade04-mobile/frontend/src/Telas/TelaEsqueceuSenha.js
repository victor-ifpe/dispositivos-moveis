import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

export default function TelaEsqueceuSenha({ navigation }) {

  const [email, setEmail] = useState('');

  const enviarEmail = async () => {
    if (!email) {
      Alert.alert('Atenção', 'Digite seu e-mail.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Um e-mail para redefinir sua senha foi enviado.');
      navigation.navigate('TelaLogin');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Erro',
          'Digite um e-mail válido.'
        );
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Erro',
          'Não existe usuário cadastrado com este e-mail.'
        );
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível enviar o e-mail de recuperação.'
        );
      }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('TelaLogin')} >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.tituloPrincipal}>  Recuperar senha </Text>

      </View>

      <View style={styles.caixa}>

        <Ionicons name="lock-open-outline" size={100} color="#333333" style={styles.icone} />

        {/* Email */}
        <Text style={styles.titulo}> Digite seu e-mail </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Botão Enviar */}
        <TouchableOpacity style={styles.botao} onPress={enviarEmail} >
          <Text style={styles.textoBotao}> Enviar </Text>
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

  botaoVoltar: {
    position: 'absolute',
    left: 15,
  },

  tituloPrincipal: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  caixa: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
    marginTop: 25,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});