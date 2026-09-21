# Backend

## 1. Configurar o Firebase

Antes de executar o backend, é necessário configurar as credenciais do Firebase.

### 1.1 Baixar o Firebase Service Account

Acesse o **Firebase Console** do projeto e faça o download do arquivo de credenciais da Service Account.

No Firebase Console, acesse:

**Configurações do projeto → Contas de serviço → Gerar nova chave privada**

Baixe o arquivo JSON e coloque-o no seguinte caminho:

```text
src/main/resources/firebase-service-account.json
```

O arquivo deve ser chamado:

```text
firebase-service-account.json
```

> **Importante:** o arquivo `firebase-service-account.json` contém credenciais privadas e **não deve ser enviado para o GitHub**.

O `.gitignore` do projeto já está configurado para ignorar esse arquivo:

```gitignore
firebase-service-account.json
```

---

## 2. Rodar o projeto

Entre na pasta do backend:

```bash
cd backend
```

Execute o projeto:

```bash
.\mvnw.cmd spring-boot:run
```

O backend estará rodando em:

```text
http://localhost:8081
```

---

## 3. Rodar o Ngrok

Abra **outro terminal** e execute:

```bash
ngrok http 8081
```

Copie a URL gerada pelo **Ngrok** e coloque no arquivo `api.js`.

Exemplo:

```javascript
const API_URL = "https://sua-url-do-ngrok.ngrok-free.app";
```