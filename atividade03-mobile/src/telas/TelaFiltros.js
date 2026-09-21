import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TelaFiltros({ navigation, route }) {
    const { categorias, categoriaAtual, ordenacaoAtual, aplicarFiltros, } = route.params;
    const [categoria, setCategoria] = useState(categoriaAtual || 'Todos');
    const [ordenacao, setOrdenacao] = useState(ordenacaoAtual || 'recentes');

    const aplicar = () => {
        aplicarFiltros(categoria, ordenacao);
        navigation.goBack();
    };

    const limpar = () => {
        setCategoria('Todos');
        setOrdenacao('recentes');
    };

    return (
        <View style={styles.container}>

            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>
                    FILTRAR
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="close"
                        size={28}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* Categorias */}
                <Text style={styles.tituloSecao}>
                    Categorias
                </Text>

                <View style={styles.categorias}>
                    {categorias.map((item) => (

                        <TouchableOpacity
                            key={item}
                            style={[styles.categoria, categoria === item && styles.categoriaSelecionada,]}
                            onPress={() => setCategoria(item)}
                        >
                            <Text style={[styles.textoCategoria, categoria === item && styles.textoSelecionado,]}        >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Ordenação */}
                <Text style={styles.tituloSecao}>
                    Ordenação
                </Text>

                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => setOrdenacao('recentes')}
                >
                    <Ionicons
                        name={ordenacao === 'recentes' ? 'radio-button-on' : 'radio-button-off'}
                        size={22}
                    />
                    <Text style={styles.textoOpcao}>
                        Mais recentes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => setOrdenacao('menorPreco')}
                >
                    <Ionicons
                        name={ordenacao === 'menorPreco' ? 'radio-button-on' : 'radio-button-off'}
                        size={22}
                    />
                    <Text style={styles.textoOpcao}>
                        Menor preço
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => setOrdenacao('maiorPreco')}
                >
                    <Ionicons
                        name={ordenacao === 'maiorPreco' ? 'radio-button-on' : 'radio-button-off'}
                        size={22}
                    />
                    <Text style={styles.textoOpcao}>
                        Maior preço
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => setOrdenacao('avaliacao')}
                >
                    <Ionicons
                        name={ordenacao === 'avaliacao' ? 'radio-button-on' : 'radio-button-off'}
                        size={22}
                    />
                    <Text style={styles.textoOpcao}>
                        Mais populares
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Botoes */}
            <View style={styles.botoes}>
                <TouchableOpacity
                    style={styles.botaoLimpar}
                    onPress={limpar}
                >

                    <Text style={styles.textoLimpar}>
                        Limpar
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoAplicar}
                    onPress={aplicar}
                >
                    <Text style={styles.textoAplicar}>
                        Aplicar filtros
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
        padding: 20,
        paddingTop: 50,
    },

    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    tituloSecao: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },

    categorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    categoria: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    categoriaSelecionada: {
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
    },

    textoCategoria: {
        color: '#555',
    },

    textoSelecionado: {
        color: '#fff',
        fontWeight: 'bold',
    },

    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },

    textoOpcao: {
        fontSize: 16,
        marginLeft: 10,
    },

    botoes: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },

    botaoLimpar: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4f46e5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoLimpar: {
        color: '#4f46e5',
        fontWeight: 'bold',
    },

    botaoAplicar: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#4f46e5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoAplicar: {
        color: '#fff',
        fontWeight: 'bold',
    },
});