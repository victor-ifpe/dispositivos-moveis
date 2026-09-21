import { initializeApp } from 'firebase/app';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBYke5UjqxgZUYx6PPDRKMvX79heUuNhok',
    authDomain: 'atividade04-mobile.firebaseapp.com',
    projectId: 'atividade04-mobile',
    storageBucket: 'atividade04-mobile.firebasestorage.app',
    messagingSenderId: '1034691219838',
    appId: '1:1034691219838:web:c30abe065ae0822233632f'
};
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});