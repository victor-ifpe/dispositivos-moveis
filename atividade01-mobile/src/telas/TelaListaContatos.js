import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaListaContatos({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.cabecalho}>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('TelaLogin')}
                >
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.tituloPrincipal}>
                    Lista de Contatos
                </Text>

                <TouchableOpacity
                    style={styles.botaoMais}
                    onPress={() => navigation.navigate('TelaCadastroContato')}
                >
                    <Ionicons name="add-circle-outline" size={35} color="#fff" />
                </TouchableOpacity>
            </View>



            {/* Contato 1 */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaEdicaoContatos', {
                        nome: 'Marcos Andrade',
                        telefone: '81 988553424'
                    })
                }
            >
                <View style={styles.contato}>
                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />
                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>
                            Marcos Andrade
                        </Text>
                        <Text style={styles.telefone}>
                            81 988553424
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.linha} />



            {/* Contato 2 */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaEdicaoContatos', {
                        nome: 'Patrícia Tavares',
                        telefone: '81 998765332'
                    })
                }
            >
                <View style={styles.contato}>
                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />
                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>
                            Patrícia Tavares
                        </Text>
                        <Text style={styles.telefone}>
                            81 998765332
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.linha} />



            {/* Contato 3 */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaEdicaoContatos', {
                        nome: 'Rodrigo Antunes',
                        telefone: '81 983520684'
                    })
                }
            >
                <View style={styles.contato}>
                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />
                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>
                            Rodrigo Antunes
                        </Text>
                        <Text style={styles.telefone}>
                            81 983520684
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.linha} />



            {/* Contato 4 */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaEdicaoContatos', {
                        nome: 'Fernando Souza',
                        telefone: '81 936775219'
                    })
                }
            >
                <View style={styles.contato}>
                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />
                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>
                            Fernando Souza
                        </Text>
                        <Text style={styles.telefone}>
                            81 936775219
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.linha} />



            {/* Contato 5 */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('TelaEdicaoContatos', {
                        nome: 'Felipe Costa',
                        telefone: '81 975941123'
                    })
                }
            >
                <View style={styles.contato}>
                    <Ionicons name="person-circle-outline" size={50} color="#007AFF" />
                    <View style={styles.informacoes}>
                        <Text style={styles.nome}>
                            Felipe Costa
                        </Text>

                        <Text style={styles.telefone}>
                            81 975941123
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.linha} />

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

    botaoMais: {
        position: 'absolute',
        right: 15,
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

    linha: {
        height: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 20,
    },
});