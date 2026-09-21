import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function App() {
  const [clima, setClima] = useState(null);
  const [cidadeBusca, setCidadeBusca] = useState('');

  async function buscarClima(cidade) {
    try {
      const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=7d921e88&city_name=${cidade}`
      );

      console.log(response.data);
      setClima(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    }
  }

  useEffect(() => {
    buscarClima('Recife,PE');
  }, []);

  const buscarCidade = () => {
    if (cidadeBusca.trim() === '') return;

    buscarClima(cidadeBusca.trim());
  };

  if (!clima) {
    return (
      <View style={styles.containerNoite}>
        <Text style={{ color: '#fff' }}>
          Carregando previsão...
        </Text>
      </View>
    );
  }

  const agora = new Date();
  const horaAtual = agora.getHours();

  const inicioDia = 6;
  const fimDia = 18;

  const deDia = horaAtual >= inicioDia && horaAtual < fimDia;

  return (
    <View style={deDia ? styles.containerDia : styles.containerNoite}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Cidade atual e busca */}
        <View style={styles.topo}>

          <View style={styles.cidadeContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#fff"
            />

            <Text style={styles.nomeCidade}>
              {clima.city}
            </Text>
          </View>

          {/* Campo de busca */}
          <View style={styles.buscaContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#666"
            />

            <TextInput
              style={styles.inputBusca}
              placeholder="Buscar cidade"
              placeholderTextColor="#888"
              value={cidadeBusca}
              onChangeText={setCidadeBusca}
              onSubmitEditing={buscarCidade}
            />
          </View>

        </View>

        {/* Ícone do clima */}
        <SvgUri
          style={styles.imagemIco}
          uri={`https://assets.hgbrasil.com/weather/icons/conditions/${clima.condition_slug}.svg`}
        />

        {/* Temperatura */}
        <Text style={styles.temperatura}>
          {clima.temp}°
        </Text>

        {/* Condição */}
        <Text style={styles.condicao}>
          {clima.condition}
        </Text>

        {/* Bloco 1 */}
        <View style={styles.bloco01}>

          <Text style={styles.textoBloco01}>
            Precipitações
          </Text>

          <View style={styles.bloco01Precipitacoes}>

            <Text style={styles.textoBloco01}>
              Max.: {clima.forecast[0].max}°
            </Text>

            <Text style={styles.textoBloco01}>
              Min.: {clima.forecast[0].min}°
            </Text>

          </View>

        </View>

        {/* Bloco 2 */}
        <View style={styles.bloco02}>

          <View style={styles.bloco02Umidade}>

            <View style={styles.itemBloco02}>
              <Ionicons
                name="rainy-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.textoBloco02}>
                {clima.rain}%
              </Text>
            </View>

            <View style={styles.itemBloco02}>
              <Ionicons
                name="water-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.textoBloco02}>
                {clima.humidity}%
              </Text>
            </View>

            <View style={styles.itemBloco02}>
              <Ionicons
                name="navigate-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.textoBloco02}>
                {clima.wind_speedy}
              </Text>
            </View>

          </View>

        </View>

        {/* Bloco 3 */}
        <View style={styles.bloco03}>

          <Text style={styles.tituloBloco03}>
            Hoje
          </Text>

          <View style={styles.bloco03Hoje}>

            <View style={styles.itemBloco03}>
              <Ionicons
                name="sunny-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.textoBloco03}>
                {clima.sunrise}
              </Text>
            </View>

            <View style={styles.itemBloco03}>
              <Ionicons
                name="partly-sunny-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.textoBloco03}>
                {clima.sunset}
              </Text>
            </View>

          </View>

        </View>

        {/* Bloco 4 */}
        <View style={styles.bloco04}>

          <View style={styles.cabecalhoBloco04}>

            <Text style={styles.tituloBloco04}>
              Próxima Previsão
            </Text>

            <Ionicons
              name="calendar-outline"
              size={24}
              color="#fff"
            />

          </View>

          {/* Dia 1 */}
          <View style={styles.previsaoDia}>

            <Text style={styles.diaPrevisao}>
              {clima.forecast[0].weekday}
            </Text>

            <View style={styles.tempoPrevisao}>

              <SvgUri
                style={styles.iconePrevisao}
                uri={`https://assets.hgbrasil.com/weather/icons/conditions/${clima.forecast[0].condition}.svg`}
              />

              <Text style={styles.temperaturaPrevisao}>
                {clima.forecast[0].max}°C
              </Text>

            </View>

          </View>

          {/* Dia 2 */}
          <View style={styles.previsaoDia}>

            <Text style={styles.diaPrevisao}>
              {clima.forecast[1].weekday}
            </Text>

            <View style={styles.tempoPrevisao}>

              <SvgUri
                style={styles.iconePrevisao}
                uri={`https://assets.hgbrasil.com/weather/icons/conditions/${clima.forecast[1].condition}.svg`}
              />

              <Text style={styles.temperaturaPrevisao}>
                {clima.forecast[1].max}°C
              </Text>

            </View>

          </View>

        </View>

      </ScrollView>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({

  // ScrollView
  scroll: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },

  // Topo
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: "7%",
    width: '100%',
  },

  cidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  nomeCidade: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 6,
  },

  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    width: 140,
  },

  inputBusca: {
    flex: 1,
    height: 40,
    marginLeft: 6,
    color: '#333',
  },

  // Container Dia
  containerDia: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
  },

  // Container Noite
  containerNoite: {
    flex: 1,
    backgroundColor: '#101936',
    alignItems: 'center',
  },

  imagemIco: {
    width: 100,
    height: 100,
  },

  temperatura: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },

  condicao: {
    fontSize: 18,
    color: '#fff',
  },

  // Bloco 01
  bloco01: {
    alignItems: 'center',
  },

  bloco01Precipitacoes: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },

  textoBloco01: {
    color: '#fff',
  },

  // Bloco 02
  bloco02: {
    alignItems: 'center',
    width: '90%',
    marginTop: 25,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  itemBloco02: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  bloco02Umidade: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },

  textoBloco02: {
    color: '#fff',
  },

  // Bloco 03
  bloco03: {
    width: '90%',
    marginTop: 25,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  tituloBloco03: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  bloco03Hoje: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  itemBloco03: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  textoBloco03: {
    color: '#fff',
  },

  // Bloco 04
  bloco04: {
    width: '90%',
    marginTop: 25,
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  cabecalhoBloco04: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  tituloBloco04: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  previsaoDia: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },

  diaPrevisao: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },

  tempoPrevisao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconePrevisao: {
    width: 25,
    height: 25,
  },

  temperaturaPrevisao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

});