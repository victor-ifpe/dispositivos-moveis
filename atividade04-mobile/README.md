# Tecnologias Utilizadas

## Backend

* **Java** — linguagem utilizada no desenvolvimento do backend.
* **Spring Boot** — framework utilizado para criação da API REST.
* **Spring Data JPA** — utilizado para comunicação e persistência dos dados no banco.
* **Hibernate** — utilizado como implementação JPA para mapeamento objeto-relacional.
* **Maven** — gerenciamento de dependências e execução do projeto.
* **MySQL** — banco de dados utilizado pela aplicação.
* **Docker** — utilizado para executar e gerenciar os serviços do projeto em containers.

## Frontend / Aplicativo Mobile

* **JavaScript** — linguagem utilizada no desenvolvimento do aplicativo.
* **React Native** — framework utilizado para desenvolvimento do aplicativo mobile.
* **Expo** — plataforma utilizada para executar e desenvolver o aplicativo React Native.
* **Axios** — utilizado para realizar as requisições HTTP entre o aplicativo e o backend.
* **Expo Go** — utilizado para executar o aplicativo em dispositivos Android durante o desenvolvimento.

## Comunicação e Acesso

* **REST API** — arquitetura utilizada para a comunicação entre o aplicativo mobile e o backend.
* **Ngrok** — utilizado para criar um túnel público para o backend, permitindo que o aplicativo mobile acesse a API local.
* **JSON** — formato utilizado na troca de dados entre o aplicativo e a API.

---

# Inicialização do Projeto

## 1. Iniciar o Docker

Execute o Docker Compose para iniciar os serviços necessários:

```bash
docker compose up -d
```

O parâmetro `-d` executa os containers em segundo plano.

---

## 2. Iniciar o Backend

Entre na pasta do backend:

```bash
cd backend
```

Execute o Spring Boot:

```bash
.\mvnw.cmd spring-boot:run
```

O backend estará disponível na porta:

```text
http://localhost:8081
```

---

## 3. Iniciar o Ngrok

Com o backend Spring Boot rodando na porta `8081`, abra **outro terminal** e execute:

```bash
ngrok http 8081
```

O Ngrok irá gerar uma URL pública semelhante a:

```text
Forwarding https://sua-url.ngrok-free.dev -> http://localhost:8081
```

Copie a URL gerada e configure-a no arquivo `api.js` do aplicativo mobile:

```javascript
const api = axios.create({
  baseURL: 'https://sua-url.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

> **Importante:** mantenha o terminal do Ngrok aberto enquanto estiver utilizando o aplicativo. O túnel precisa permanecer ativo para que o celular consiga acessar o backend.

---

## 4. Iniciar o Aplicativo Mobile

Abra **outro terminal** e entre na pasta do aplicativo:

```bash
cd frontend
```

Instale as dependências, caso ainda não tenham sido instaladas:

```bash
npm install
```

Depois, inicie o Expo:

```bash
npx expo start -c
```

O Expo será iniciado na porta `8082`.

Após iniciar, você poderá:

* Pressionar `a` para executar no Android;
* Pressionar `w` para executar no navegador;
* Utilizar o **QR Code** para abrir o aplicativo no celular através do Expo Go.

---

# Ordem de Inicialização

Para executar o projeto completo, siga esta ordem:

```text
1. Docker
   ↓
2. Backend Spring Boot
   ↓
3. Ngrok
   ↓
4. Configurar a URL no api.js
   ↓
5. Aplicativo Mobile / Expo
```

### Comandos principais

```bash
# Docker
docker compose up -d

# Backend
cd backend
.\mvnw.cmd spring-boot:run

# Ngrok
ngrok http 8081

# Frontend / Mobile
cd frontend
npm install
npx expo start -c
```