# Frontend

## 1. Entrar na pasta do Frontend

Abra um terminal e entre na pasta do projeto:

```bash
cd frontend
```

> Caso a pasta do seu projeto tenha outro nome, substitua `frontend` pelo nome correto.

---

## 2. Instalar as dependências

Antes de executar o projeto pela primeira vez, instale as dependências:

```bash
npm install
```

Esse comando instala todos os pacotes necessários definidos no arquivo `package.json`.

---

## 3. Inicializar o projeto

Para iniciar o projeto Expo:

```bash
npx expo start
```

Para iniciar o projeto **limpando o cache**:

```bash
npx expo start -c
```

> Recomenda-se usar `npx expo start -c` quando houver problemas de atualização, cache ou alterações que não aparecem no aplicativo.

---

## 4. Executar no celular

Depois de executar:

```bash
npx expo start -c
```

O Expo exibirá um **QR Code** no terminal ou na página do Expo.

### Android

1. Instale o **Expo Go** no celular.
2. Certifique-se de que o computador e o celular estejam na mesma rede Wi-Fi.
3. Abra o Expo Go.
4. Leia o QR Code exibido pelo Expo.

---

## 5. Executar no navegador

Para abrir o projeto no navegador:

```bash
npx expo start --web
```

Ou, depois de iniciar o Expo:

```bash
npx expo start -c
```

e pressione:

```text
w
```

no terminal.

---

## 6. Executar no Android

Se estiver utilizando um emulador Android configurado:

```bash
npx expo start --android
```

Ou:

```bash
npx expo start -c
```

e pressione:

```text
a
```

no terminal.

---

## 7. Limpar o cache

Caso o aplicativo apresente erros inesperados ou continue mostrando uma versão antiga do código:

```bash
npx expo start -c
```

O parâmetro `-c` limpa o cache do Metro/Expo.

---

## 8. Instalar uma nova dependência

Para instalar um pacote utilizando o gerenciador do Expo:

```bash
npx expo install nome-do-pacote
```

Exemplo:

```bash
npx expo install @expo/vector-icons
```

Para instalar uma dependência comum com npm:

```bash
npm install nome-do-pacote
```

---

## 9. Parar o projeto

Para parar o servidor do Expo, pressione:

```text
Ctrl + C
```

no terminal.

---

# Fluxo recomendado

Sempre que for iniciar o projeto:

### 1. Entrar na pasta

```bash
cd frontend
```

### 2. Instalar dependências, se necessário

```bash
npm install
```

### 3. Iniciar o Expo limpando o cache

```bash
npx expo start -c
```

### 4. Escolher onde executar

No terminal do Expo:

```text
a → Android
w → Web
```

Ou utilize o **QR Code** para abrir no celular através do Expo Go.

---

# Resumo dos principais comandos

| Comando                    | Função                                |
| -------------------------- | ------------------------------------- |
| `cd frontend`              | Entra na pasta do frontend            |
| `npm install`              | Instala as dependências               |
| `npx expo start`           | Inicia o Expo                         |
| `npx expo start -c`        | Inicia o Expo limpando o cache        |
| `npx expo start --web`     | Inicia diretamente no navegador       |
| `npx expo start --android` | Inicia no Android                     |
| `npx expo install pacote`  | Instala um pacote compatível com Expo |
| `npm install pacote`       | Instala uma dependência pelo npm      |
| `Ctrl + C`                 | Para o servidor                       |