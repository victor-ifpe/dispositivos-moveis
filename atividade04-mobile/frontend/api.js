import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: 'https://womanly-patriarch-causation.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {

    const usuario = auth.currentUser;

    if (usuario) {
      const token = await usuario.getIdToken();

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;