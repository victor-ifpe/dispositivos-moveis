import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TelaDetalhesProdutos({
  navigation,
  route,
}) {

  const { produto, favoritos, alternarFavorito } = route.params;

  const [favorito, setFavorito] = useState(
    favoritos.includes(produto.id)
  );

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>
          DETALHES
        </Text>

        <TouchableOpacity
          onPress={() => {
            alternarFavorito(produto.id);
            setFavorito(!favorito);
          }}
        >
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={27}
            color={favorito ? '#e53935' : '#000'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Imagem */}
        <Image
          source={{
            uri: produto.thumbnail,
          }}
          style={styles.imagem}
        />

        {/* Nome */}
        <Text style={styles.nome}>
          {produto.title}
        </Text>

        {/* Categoria */}
        <Text style={styles.categoria}>
          {produto.category}
        </Text>

        {/* Preco */}
        <Text style={styles.preco}>
          R$ {produto.price.toFixed(2)}
        </Text>

        {/* Avaliação */}
        <View style={styles.avaliacaoContainer}>
          <Text style={styles.estrelas}>
            ⭐
          </Text>

          <Text style={styles.avaliacao}>
            {produto.rating.toFixed(1)}
          </Text>

          <Text style={styles.avaliacaoTexto}>
            avaliação
          </Text>
        </View>

        {/* Descrição */}
        <Text style={styles.tituloSecao}>
          Descrição
        </Text>

        <Text style={styles.descricao}>
          {produto.description}
        </Text>

        {/* Informações */}
        <Text style={styles.tituloSecao}>
          Especificações
        </Text>

        <View style={styles.informacao}>
          <Text style={styles.label}>
            Marca
          </Text>

          <Text style={styles.valor}>
            {produto.brand || 'Não informado'}
          </Text>
        </View>

        <View style={styles.informacao}>
          <Text style={styles.label}>
            Estoque
          </Text>

          <Text style={styles.valor}>
            {produto.stock} unidades
          </Text>
        </View>

        <View style={styles.informacao}>
          <Text style={styles.label}>
            Desconto
          </Text>

          <Text style={styles.valor}>
            {produto.discountPercentage.toFixed(1)}%
          </Text>
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.botao}
          onPress={() => console.log('Produto adicionado')}
        >
          <Ionicons
            name="cart-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.textoBotao}>
            Adicionar ao carrinho
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  imagem: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  nome: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },

  categoria: {
    fontSize: 15,
    color: '#777',
    marginTop: 8,
  },

  preco: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
  },

  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  estrelas: {
    fontSize: 18,
  },

  avaliacao: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  avaliacaoTexto: {
    color: '#777',
    marginLeft: 5,
  },

  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },

  informacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  label: {
    color: '#777',
    fontSize: 15,
  },

  valor: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#4f46e5',
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 60,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});