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

export default function TelaEsqueceuSenha({ navigation }) {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    return (
        <View style={styles.container}>

            <View style={styles.cabecalho}>
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('TelaLogin')}
                >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Text style={styles.tituloPrincipal}>
                    Esqueceu a Senha
                </Text>
            </View>


            <View style={styles.caixaLogin}>

                {/* Email */}
                <Text style={styles.titulo}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email..."
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Nova Senha */}
                <Text style={styles.titulo}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua nova senha..."
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                />

                {/* Confirmar Nova Senha */}
                <Text style={styles.titulo}>Confirmar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua nova senha..."
                    value={confirmarNovaSenha}
                    onChangeText={setConfirmarNovaSenha}
                />

                <TouchableOpacity
                    style={styles.botao}
                >
                    <Text style={styles.textoBotao}>Salvar</Text>
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
        marginTop: '20%',
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