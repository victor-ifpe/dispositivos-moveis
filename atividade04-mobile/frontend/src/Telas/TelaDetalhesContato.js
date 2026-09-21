import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import api from '../../api';

export default function TelaDetalhesContato({ navigation, route }) {

    const {
        id,
        nome,
        telefone,
        cidade,
        anotacao,
    } = route.params;

    const editarContato = () => {
        navigation.navigate('TelaEdicaoContatos', {
            id,
            nome,
            telefone,
            cidade,
            anotacao,
        });
    };

    const excluirContato = () => {

        Alert.alert(
            'Excluir contato',
            'Deseja realmente excluir este contato?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {

                        try {

                            await api.delete(`/contatos/${id}`);

                            Alert.alert(
                                'Sucesso',
                                'Contato excluído com sucesso!',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () =>
                                            navigation.navigate(
                                                'TelaListaContatos'
                                            ),
                                    },
                                ]
                            );

                        } catch (error) {

                            console.log(error);

                            Alert.alert(
                                'Erro',
                                'Não foi possível excluir o contato.'
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
                    Detalhes do Contato
                </Text>

            </View>

            <View style={styles.conteudo}>

                <Ionicons
                    name="person-circle-outline"
                    size={100}
                    color="#007AFF"
                    style={styles.icone}
                />

                <Text style={styles.nome}>
                    {nome}
                </Text>

                <View style={styles.informacao}>

                    <Text style={styles.label}>
                        Telefone
                    </Text>

                    <Text style={styles.valor}>
                        {telefone}
                    </Text>

                </View>

                <View style={styles.informacao}>

                    <Text style={styles.label}>
                        Cidade
                    </Text>

                    <Text style={styles.valor}>
                        {cidade}
                    </Text>

                </View>

                <View style={styles.informacao}>

                    <Text style={styles.label}>
                        Anotação
                    </Text>

                    <Text style={styles.valor}>
                        {anotacao || 'Nenhuma anotação'}
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={editarContato}
                >
                    <Ionicons
                        name="create-outline"
                        size={22}
                        color="#fff"
                    />

                    <Text style={styles.textoBotao}>
                        Editar
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={excluirContato}
                >
                    <Ionicons
                        name="trash-outline"
                        size={22}
                        color="#fff"
                    />

                    <Text style={styles.textoBotao}>
                        Excluir
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
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff',
    },

    conteudo: {
        padding: 25,
    },

    icone: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    nome: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
    },

    informacao: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15,
    },

    label: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },

    valor: {
        fontSize: 18,
        color: '#222',
    },

    botaoEditar: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },

    botaoExcluir: {
        backgroundColor: '#d9534f',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 12,
    },

    textoBotao: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 8,
    },

});