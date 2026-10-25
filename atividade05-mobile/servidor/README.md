# API do Cloudinary

1. Copie `.env.example` para `.env` e preencha a API Key e API Secret do Cloudinary.
2. No terminal, entre nesta pasta e execute `npm install`.
3. Execute `npm start`.
4. Teste `http://localhost:3000/api/images` no navegador do computador.
5. Em `src/Telas/TelaImagens.js`, a URL está definida como `http://localhost:3000/api`.
   - Android Emulator: normalmente use `http://10.0.2.2:3000/api`.
   - Celular físico: use o IP local do computador, por exemplo `http://122.668.3.400:5000/api`, com ambos na mesma rede Wi-Fi.
