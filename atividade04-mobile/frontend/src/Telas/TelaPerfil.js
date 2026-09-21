import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function TelaPerfil({ navigation }) {

    const usuario = auth.currentUser;

    const fazerLogout = () => {
        Alert.alert(
            'Sair',
            'Deseja realmente sair da conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(auth);

                            navigation.navigate('TelaLogin');

                        } catch (error) {
                            console.log(error);

                            Alert.alert(
                                'Erro',
                                'Não foi possível sair da conta.'
                            );
                        }
                    },
                },
            ]
        );
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
                    Meu Perfil
                </Text>

            </View>

            <View style={styles.conteudo}>

                <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color="#007AFF"
                />

                <Text style={styles.nome}>
                    Usuário
                </Text>

                <Text style={styles.email}>
                    {usuario?.email}
                </Text>

                <TouchableOpacity
                    style={styles.botaoSair}
                    onPress={fazerLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={24}
                        color="#fff"
                    />

                    <Text style={styles.textoBotao}>
                        Sair da conta
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
        height: 60,
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 40,
    },

    botaoVoltar: {
        position: 'absolute',
        left: 15,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },

    conteudo: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },

    nome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },

    email: {
        fontSize: 17,
        color: '#666',
        marginTop: 8,
    },

    botaoSair: {
        width: '100%',
        height: 50,
        backgroundColor: '#d9534f',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
    },

    textoBotao: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 8,
    },

});