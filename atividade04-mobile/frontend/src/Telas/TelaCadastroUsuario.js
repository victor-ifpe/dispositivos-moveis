import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

export default function TelaCadastroUsuario({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const cadastrarUsuario = async () => {

        if (!nome.trim() || !email.trim() || !telefone.trim() || !senha.trim()) {
            Alert.alert('Atenção', 'Preencha todos os campos.'
            );
            return;
        }
        if (senha.length < 6) {
            Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                senha
            );
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!',
                [{
                    text: 'OK', onPress: () => navigation.navigate('TelaLogin'),
                },]
            );

        } catch (error) {
            console.log(error);

            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Erro', 'Este e-mail já está cadastrado.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Erro', 'Digite um e-mail válido.');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.'
                );
            } else {
                Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
            }
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.cabecalho}>

                <TouchableOpacity style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('TelaLogin')} >
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.tituloPrincipal}> Cadastro de Usuário </Text>

            </View>

            <View style={styles.caixaLogin}>

                {/* Nome */}
                <Text style={styles.titulo}> Nome </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome..."
                    value={nome}
                    onChangeText={setNome}
                />

                {/* Email */}
                <Text style={styles.titulo}> Email </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email..."
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Email */}
                <Text style={styles.titulo}> Telefone </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu telefone..."
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
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

                {/* Botão Salvar */}
                <TouchableOpacity style={styles.botao} onPress={cadastrarUsuario} >
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
        justifyContent: 'center',
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