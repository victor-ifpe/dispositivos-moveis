import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

// Colocar ip do computador na rede local, para que o app consiga acessar a API do servidor
// o ip do computador pode ser obtido no terminal com o comando "ipconfig" (Windows) ou "ifconfig" (Linux/Mac)
// Deve colocar no ip onde esta o nome ip na url da API, por exemplo: http://132.167.0.222:3000/api
const API_URL = 'http://TROCAR-POR-SEU-IP/api';
const CLOUD_NAME = 'vahwd3pk';
const UPLOAD_PRESET = 'armazenamento';

export default function TelaImagens({ navigation }) {
  const [imagens, setImagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [excluindo, setExcluindo] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const carregarImagens = useCallback(async (mostrarLoading = true) => {
    try {
      if (mostrarLoading) setCarregando(true);

      const resposta = await axios.get(`${API_URL}/images`);
      const lista = Array.isArray(resposta.data)
        ? resposta.data
        : resposta.data.images;

      if (!Array.isArray(lista)) {
        throw new Error('A API retornou uma lista inválida.');
      }

      setImagens(lista);
    } catch (error) {
      console.error(
        'Erro ao carregar imagens:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar as imagens. Confira se o servidor está funcionando.'
      );
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarImagens();
    }, [carregarImagens])
  );

  const selecionarImagem = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à galeria para selecionar uma imagem.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length) {
        setImagemSelecionada(resultado.assets[0]);
      }
    } catch (error) {
      console.error('Erro ao abrir a galeria:', error);
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  };

  const enviarImagem = async () => {
    if (!imagemSelecionada) {
      Alert.alert('Selecione uma imagem', 'Escolha uma imagem primeiro.');
      return;
    }

    try {
      setEnviando(true);

      const arquivo = {
        uri: imagemSelecionada.uri,
        name: imagemSelecionada.fileName || `imagem-${Date.now()}.jpg`,
        type: imagemSelecionada.mimeType || 'image/jpeg',
      };

      const dados = new FormData();
      dados.append('file', arquivo);
      dados.append('upload_preset', UPLOAD_PRESET);

      await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        dados,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setImagemSelecionada(null);
      await carregarImagens(false);
      Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
    } catch (error) {
      console.error(
        'Erro ao enviar imagem:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Erro ao enviar',
        error.response?.data?.error?.message ||
        'Não foi possível enviar a imagem. Confira o Upload Preset.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const nomeImagem = (imagem) => {
    if (imagem.display_name) return imagem.display_name;
    if (imagem.filename) return imagem.filename;

    const id = imagem.public_id || imagem.id || 'Imagem';
    return id.split('/').pop().replace(/\.[^/.]+$/, '');
  };

  const confirmarExclusao = (imagem) => {
    const id = imagem.public_id || imagem.id;

    if (!id) {
      Alert.alert('Erro', 'Esta imagem não possui um identificador válido.');
      return;
    }

    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir "${nomeImagem(imagem)}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirImagem(id),
        },
      ]
    );
  };

  const excluirImagem = async (id) => {
    try {
      setExcluindo(id);

      await axios.delete(`${API_URL}/images`, {
        data: { public_id: id },
      });

      setImagens((lista) =>
        lista.filter((item) => (item.public_id || item.id) !== id)
      );

      Alert.alert('Sucesso', 'Imagem excluída com sucesso!');
    } catch (error) {
      console.error(
        'Erro ao excluir imagem:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Erro',
        error.response?.data?.message ||
        'Não foi possível excluir a imagem.'
      );
    } finally {
      setExcluindo(null);
    }
  };

  const sair = async () => {
    try {
      await signOut(auth);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TelaLogin' }],
        })
      );
    } catch (error) {
      console.error('Erro ao sair:', error);
      Alert.alert('Erro', 'Não foi possível encerrar a sessão.');
    }
  };

  const atualizar = () => {
    setAtualizando(true);
    carregarImagens(false);
  };

  const renderizarImagem = ({ item }) => {
    const id = item.public_id || item.id;
    const url = item.secure_url || item.url;
    const estaExcluindo = excluindo === id;

    return (
      <View style={styles.card}>
        {url ? (
          <Image source={{ uri: url }} style={styles.imagem} resizeMode="cover" />
        ) : (
          <View style={styles.semImagem}>
            <Text>Imagem indisponível</Text>
          </View>
        )}

        <Text style={styles.nome} numberOfLines={2}>
          {nomeImagem(item)}
        </Text>

        <TouchableOpacity
          style={[styles.botaoExcluir, estaExcluindo && styles.botaoDesativado]}
          onPress={() => confirmarExclusao(item)}
          disabled={estaExcluindo}
        >
          {estaExcluindo ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Excluir imagem</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Minhas imagens</Text>
          <Text style={styles.subtitulo}>
            {imagens.length}{' '}
            {imagens.length === 1 ? 'imagem armazenada' : 'imagens armazenadas'}
          </Text>
        </View>

        <TouchableOpacity style={styles.botaoSair} onPress={sair}>
          <Text style={styles.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaEnvio}>
        <TouchableOpacity
          style={styles.botaoSelecionar}
          onPress={selecionarImagem}
          disabled={enviando}
        >
          <Text style={styles.textoBotao}>Selecionar imagem</Text>
        </TouchableOpacity>

        {imagemSelecionada && (
          <View style={styles.previa}>
            <Image
              source={{ uri: imagemSelecionada.uri }}
              style={styles.imagemPrevia}
              resizeMode="cover"
            />
            <View style={styles.dadosPrevia}>
              <Text numberOfLines={2}>
                {imagemSelecionada.fileName || 'Imagem selecionada'}
              </Text>
              <TouchableOpacity
                style={styles.botaoEnviar}
                onPress={enviarImagem}
                disabled={enviando}
              >
                {enviando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.textoBotao}>Enviar imagem</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {carregando ? (
        <View style={styles.centralizado}>
          <ActivityIndicator size="large" color="#111" />
          <Text style={styles.carregandoTexto}>Carregando imagens...</Text>
        </View>
      ) : (
        <FlatList
          data={imagens}
          keyExtractor={(item, index) =>
            String(item.public_id || item.id || index)
          }
          renderItem={renderizarImagem}
          numColumns={2}
          columnWrapperStyle={styles.linha}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={atualizar} />
          }
          ListEmptyComponent={
            <View style={styles.centralizado}>
              <Text style={styles.vazio}>Nenhuma imagem encontrada.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 55 },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#111' },
  subtitulo: { color: '#666', marginTop: 5 },
  botaoSair: {
    backgroundColor: '#111',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  textoBotao: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  areaEnvio: { paddingHorizontal: 16, paddingBottom: 14 },
  botaoSelecionar: {
    backgroundColor: '#2457c5',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  previa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    gap: 12,
  },
  imagemPrevia: { width: 75, height: 75, borderRadius: 8 },
  dadosPrevia: { flex: 1, gap: 10 },
  botaoEnviar: {
    backgroundColor: '#218838',
    padding: 10,
    borderRadius: 8,
  },
  lista: { paddingHorizontal: 12, paddingBottom: 35, flexGrow: 1 },
  linha: { justifyContent: 'space-between' },
  card: {
    width: '48.5%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 9,
    marginBottom: 14,
    elevation: 2,
  },
  imagem: {
    width: '100%',
    height: 145,
    borderRadius: 9,
    backgroundColor: '#eee',
  },
  semImagem: {
    height: 145,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 9,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginTop: 10,
    marginBottom: 12,
    minHeight: 36,
  },
  botaoExcluir: {
    backgroundColor: '#c62828',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  botaoDesativado: { opacity: 0.6 },
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  carregandoTexto: { marginTop: 12, color: '#555' },
  vazio: { color: '#666', fontSize: 16, textAlign: 'center' },
});