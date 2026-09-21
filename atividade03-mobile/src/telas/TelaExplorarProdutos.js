import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';

export default function TelaExplorarProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState('recentes');
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
      setProdutosFiltrados(dados);
    } catch (error) {
      console.log('Erro ao carregar produtos:', error);
    }
  };

  const iconesCategorias = {
    Todos: '✨',
    beauty: '💄',
    fragrances: '🌸',
    furniture: '🛋️',
    groceries: '🛒',
    'home-decoration': '🏠',
    'kitchen-accessories': '🍳',
    laptops: '💻',
    'mens-shirts': '👕',
    'mens-shoes': '👟',
    'mens-watches': '⌚',
    'mobile-accessories': '📱',
    motorcycle: '🏍️',
    'skin-care': '🧴',
    smartphones: '📱',
    'sports-accessories': '⚽',
    sunglasses: '🕶️',
    tablets: '📱',
    tops: '👚',
    vehicle: '🚗',
    'womens-bags': '👜',
    'womens-dresses': '👗',
    'womens-jewellery': '💎',
    'womens-shoes': '👠',
    'womens-watches': '⌚',
  };

  const categorias = [
    'Todos',
    ...new Set(produtos.map((produto) => produto.category)),
  ];

  // Centraliza todos os filtros em uma única função
  const filtrarProdutos = (
    categoria = categoriaSelecionada,
    texto = busca,
    favoritosAtivos = mostrarFavoritos,
    ordenacao = ordenacaoSelecionada,
    listaFavoritos = favoritos
  ) => {
    let resultado = [...produtos];

    if (categoria !== 'Todos') {
      resultado = resultado.filter(
        (produto) => produto.category === categoria
      );
    }

    if (texto.trim()) {
      resultado = resultado.filter((produto) =>
        produto.title.toLowerCase().includes(texto.toLowerCase())
      );
    }

    if (favoritosAtivos) {
      resultado = resultado.filter((produto) =>
        listaFavoritos.includes(produto.id)
      );
    }

    if (ordenacao === 'menorPreco') {
      resultado.sort((a, b) => a.price - b.price);
    }

    if (ordenacao === 'maiorPreco') {
      resultado.sort((a, b) => b.price - a.price);
    }

    if (ordenacao === 'avaliacao') {
      resultado.sort((a, b) => b.rating - a.rating);
    }

    setProdutosFiltrados(resultado);
  };

  const selecionarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    filtrarProdutos(categoria);
  };

  const pesquisar = (texto) => {
    setBusca(texto);
    filtrarProdutos(categoriaSelecionada, texto);
  };

  const alternarFavorito = (id) => {
    const novosFavoritos = favoritos.includes(id) ? favoritos.filter((item) => item !== id) : [...favoritos, id];

    setFavoritos(novosFavoritos);

    if (mostrarFavoritos) {
      filtrarProdutos(
        categoriaSelecionada,
        busca,
        true,
        ordenacaoSelecionada,
        novosFavoritos
      );
    }
  };

  const abrirFavoritos = () => {
    const novoEstado = !mostrarFavoritos;

    setMostrarFavoritos(novoEstado);

    filtrarProdutos(
      categoriaSelecionada,
      busca,
      novoEstado
    );
  };

  const abrirFiltros = () => {
    navigation.navigate('TelaFiltros', {
      categorias,
      categoriaAtual: categoriaSelecionada,
      ordenacaoAtual: ordenacaoSelecionada,

      aplicarFiltros: (categoria, ordenacao) => {
        setCategoriaSelecionada(categoria);
        setOrdenacaoSelecionada(ordenacao);

        filtrarProdutos(
          categoria,
          busca,
          mostrarFavoritos,
          ordenacao
        );
      },
    });
  };

  const abrirDetalhes = (produto) => {
    navigation.navigate('TelaDetalhesProduto', {
      produto,
      favoritos,
      alternarFavorito,
    });
  };

  const renderProduto = ({ item }) => {
    const favorito = favoritos.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirDetalhes(item)}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.imagem}
        />

        <View style={styles.informacoes}>
          <View style={styles.linhaNome}>
            <Text style={styles.nome} numberOfLines={2}>
              {item.title}
            </Text>

            <TouchableOpacity
              onPress={() => alternarFavorito(item.id)}
            >
              <Ionicons
                name={favorito ? 'heart' : 'heart-outline'}
                size={24}
                color={favorito ? '#e53935' : '#777'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.categoriaProduto}>
            {item.category}
          </Text>

          <Text style={styles.preco}>
            R$ {item.price.toFixed(2)}
          </Text>

          <Text style={styles.avaliacao}>
            ⭐ {item.rating.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const voltarInicio = () => {
    setMostrarFavoritos(false);
    setCategoriaSelecionada('Todos');
    setBusca('');
    setProdutosFiltrados(produtos);
  };

  return (
    <View style={styles.container}>

      {/* Cabecalho */}
      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <Ionicons name="menu" size={30} color="#222" />
        </TouchableOpacity>

        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>PRODUCT EXPLORER</Text>
          <Text style={styles.subtitulo}>
            Explore nossos produtos
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            setNotificacoesAbertas(!notificacoesAbertas)
          }
        >
          <Ionicons
            name="notifications-outline"
            size={27}
            color="#222"
          />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {menuAberto && (
        <View style={styles.menuAberto}>
          <TouchableOpacity
            style={styles.itemMenuAberto}
            onPress={() => {
              setMenuAberto(false);
              voltarInicio();
            }}
          >
            <Ionicons
              name="home-outline"
              size={22}
              color="#4f46e5"
            />
            <Text>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemMenuAberto}
            onPress={() => {
              setMenuAberto(false);
              abrirFavoritos();
            }}
          >
            <Ionicons
              name="heart-outline"
              size={22}
              color="#e53935"
            />
            <Text>Meus favoritos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notificações */}
      {notificacoesAbertas && (
        <View style={styles.notificacao}>
          <Text style={styles.tituloNotificacao}>
            🔔 Notificações
          </Text>

          <Text style={styles.textoNotificacao}>
            Você está vendo os produtos mais recentes.
          </Text>
        </View>
      )}

      {/* BUSCA */}
      <View style={styles.linhaBusca}>
        <View style={styles.containerBusca}>
          <Ionicons name="search" size={20} color="#777" />

          <TextInput
            style={styles.input}
            placeholder="Buscar produto..."
            value={busca}
            onChangeText={pesquisar}
          />
        </View>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={abrirFiltros}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color="#4f46e5"
          />
          <Text style={styles.textoFiltro}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <Text style={styles.tituloCategorias}>
        Categorias
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categorias}
      >
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[
              styles.botaoCategoria,
              categoriaSelecionada === categoria &&
              styles.categoriaSelecionada,
            ]}
            onPress={() => selecionarCategoria(categoria)}
          >
            <Text style={styles.iconeCategoria}>
              {iconesCategorias[categoria] || '📦'}
            </Text>

            <Text
              style={[
                styles.textoCategoria,
                categoriaSelecionada === categoria &&
                styles.textoCategoriaSelecionada,
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Título */}
      <View style={styles.linhaProdutos}>
        <View>
          <Text style={styles.tituloProdutos}>
            {mostrarFavoritos ? 'Meus favoritos' : 'Produtos em destaque'}
          </Text>

          <Text style={styles.quantidade}>
            {produtosFiltrados.length} produtos
          </Text>
        </View>

        {mostrarFavoritos && (
          <TouchableOpacity onPress={voltarInicio}>
            <Text style={styles.verTodos}>
              Ver todos
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Produtos */}
      <FlatList
        data={produtosFiltrados}
        renderItem={renderProduto}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />

      {/* Menu Inferior */}
      <View style={styles.menuInferior}>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={voltarInicio}
        >
          <Ionicons
            name={!mostrarFavoritos ? 'home' : 'home-outline'}
            size={24}
            color={!mostrarFavoritos ? '#4f46e5' : '#777'}
          />

          <Text style={!mostrarFavoritos ? styles.menuSelecionado : styles.textoMenu} >
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={abrirFavoritos}
        >
          <Ionicons
            name={mostrarFavoritos ? 'heart' : 'heart-outline'}
            size={24}
            color={mostrarFavoritos ? '#e53935' : '#777'}
          />

          <Text style={mostrarFavoritos ? styles.menuFavoritos : styles.textoMenu} >
            Favoritos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#777"
          />
          <Text style={styles.textoMenu}>Perfil</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  tituloContainer: {
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },

  menuAberto: {
    position: 'absolute',
    top: 95,
    left: 20,
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    zIndex: 20,
    elevation: 8,
  },

  itemMenuAberto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },

  notificacao: {
    position: 'absolute',
    top: 95,
    right: 20,
    width: 230,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    zIndex: 20,
    elevation: 8,
  },

  tituloNotificacao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textoNotificacao: {
    color: '#666',
    lineHeight: 20,
  },

  linhaBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  containerBusca: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  botaoFiltro: {
    height: 45,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textoFiltro: {
    color: '#4f46e5',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  tituloCategorias: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 10,
  },

  categorias: {
    marginBottom: 15,
    maxHeight: 65,
  },

  botaoCategoria: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 75,
  },

  categoriaSelecionada: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },

  iconeCategoria: {
    fontSize: 22,
    marginBottom: 3,
  },

  textoCategoria: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },

  textoCategoriaSelecionada: {
    color: '#fff',
    fontWeight: 'bold',
  },

  linhaProdutos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  tituloProdutos: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  quantidade: {
    color: '#777',
    fontSize: 12,
    marginTop: 3,
  },

  verTodos: {
    color: '#4f46e5',
    fontWeight: 'bold',
  },

  lista: {
    paddingBottom: 80,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 3,
  },

  imagem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  informacoes: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  linhaNome: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },

  categoriaProduto: {
    color: '#777',
    marginTop: 5,
    fontSize: 13,
  },

  preco: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
  },

  avaliacao: {
    marginTop: 5,
  },

  menuInferior: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  itemMenu: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuSelecionado: {
    fontSize: 12,
    color: '#4f46e5',
    marginTop: 3,
    fontWeight: 'bold',
  },

  menuFavoritos: {
    fontSize: 12,
    color: '#e53935',
    marginTop: 3,
    fontWeight: 'bold',
  },

  textoMenu: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
});