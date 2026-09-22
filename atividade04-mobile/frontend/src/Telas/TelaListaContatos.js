import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../api';

export default function TelaListaContatos({ navigation }) {

    const [contatos, setContatos] = useState([]);

    const carregarContatos = async () => {
        try {
            const response = await api.get('/contatos');

            setContatos(response.data);

        } catch (error) {
            console.log(error);

            Alert.alert('Erro', 'Não foi possível carregar os contatos.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarContatos();
        }, [])
    );

    const renderContato = ({ item }) => (
        <View>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaDetalhesContato', {
                        id: item.id,
                        nome: item.nome,
                        telefone: item.telefone,
                        cidade: item.cidade,
                        anotacao: item.anotacao,
                    })
                }
            >
                <View style={styles.contato}>

                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />

                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>  {item.nome}  </Text>
                        <Text style={styles.telefone}>  {item.telefone} </Text>
                        <Text style={styles.cidade}> {item.cidade} </Text>
                    </View>

                </View>
            </TouchableOpacity>

            <View style={styles.linha} />

        </View>
    );

    return (
        <View style={styles.container}>

            <View style={styles.cabecalho}>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('TelaLogin')}
                >
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.tituloPrincipal}> Lista de Contatos </Text>

                {/* Botões da direita */}
                <View style={styles.botoesDireita}>

                    <TouchableOpacity onPress={() => navigation.navigate('TelaCadastroContato')} >
                        <Ionicons name="add-circle-outline" size={35} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')} >
                        <Ionicons name="person-circle-outline" size={35} color="#fff" />
                    </TouchableOpacity>

                </View>

            </View>

            <FlatList
                data={contatos}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderContato}
                ListEmptyComponent={
                    <Text style={styles.semContatos}> Nenhum contato cadastrado. </Text>
                }
            />

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
        borderBottomWidth: 1,
        borderBottomColor: '#addd',
        position: 'relative',
        marginTop: 40,
        marginBottom: 20,
    },

    tituloPrincipal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },

    botaoVoltar: {
        position: 'absolute',
        left: 15,
    },

    botoesDireita: {
        position: 'absolute',
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    contato: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 18,
    },

    informacoes: {
        marginLeft: 15,
    },

    nome: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    telefone: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },

    cidade: {
        fontSize: 14,
        color: '#777',
        marginTop: 3,
    },

    linha: {
        height: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 20,
    },

    semContatos: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 18,
        color: '#777',
    },

});