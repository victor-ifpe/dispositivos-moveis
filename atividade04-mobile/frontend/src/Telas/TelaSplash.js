import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaSplash({ navigation }) {

    useEffect(() => {

        const tempo = setTimeout(() => {
            navigation.replace('TelaLogin');
        }, 2000);

        return () => clearTimeout(tempo);

    }, []);

    return (
        <View style={styles.container}>

            <Ionicons name="people-circle-outline" size={120} color="#007AFF" />

            <Text style={styles.titulo}> Meus Contatos </Text>

            <Text style={styles.subtitulo}> Cadastro e gerenciamento de contatos </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 20,
    },

    subtitulo: {
        fontSize: 15,
        color: '#777',
        marginTop: 10,
        textAlign: 'center',
    },

});