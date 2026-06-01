# 🐕 Dog Image - Color and Grey

Uma aplicação web moderna que busca imagens aleatórias de cães e as exibe em duas versões: **original em cores** e **convertida para tons de cinza** em tempo real. Um projeto educacional que demonstra o uso avançado de APIs modernas do JavaScript.

## 📋 Descrição

Este projeto é um **showcase de tecnologias JavaScript modernas**, demonstrando:
- ✅ Requisições HTTP assíncronas com **Fetch API**
- ✅ Manipulação de operações assíncronas com **Promises** e **Async/Await**
- ✅ Processamento de imagens em tempo real com **Canvas API**
- ✅ Conversão de espaço de cores (RGB → Grayscale)
- ✅ Testes automatizados end-to-end com **Selenium WebDriver**
- ✅ Boas práticas de tratamento de erros

---

## 🚀 Tecnologias Principais

### 📡 **Fetch API e Requisições HTTP**
A aplicação utiliza a moderna Fetch API para buscar dados de forma assíncrona:

```javascript
const response = await fetch('https://dog.ceo/api/breeds/image/random');
const data = await response.json();
const imageUrl = data.message;
```

**Características:**
- Substitui XMLHttpRequest (XHR) legado
- API baseada em Promises
- Suporte nativo a JSON
- Melhor tratamento de erros

---

### ⏳ **Promises e Async/Await**

#### **Promises - Fundação do Assincronismo**
Uma Promise representa um valor que pode estar disponível agora, no futuro ou nunca:

```javascript
new Promise((resolve, reject) => {
  // operação assíncrona
  if (sucesso) resolve(resultado);
  else reject(erro);
});
```

#### **Async/Await - Sintaxe Moderna**
Fornece uma forma mais legível e síncrona de trabalhar com promises:

```javascript
async function fetchAndProcessDogImage() {
    try {
        // await pausa a execução até a promise ser resolvida
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        
        // código é executado sequencialmente
        const imageUrl = data.message;
        console.log('Imagem obtida:', imageUrl);
        
    } catch (error) {
        // Tratamento de erros como em código síncrono
        console.error('Erro ao buscar imagem:', error);
    }
}
```

**Vantagens:**
- Código mais legível (parece síncrono)
- Tratamento de erros com try/catch
- Melhor experiência do desenvolvedor (DX)
- Fácil debug no navegador

---

### 🎨 **Canvas API - Processamento de Imagens**

O Canvas API é a tecnologia core do projeto para manipulação de imagens em pixels:

#### **1. Criação e Contexto do Canvas**
```javascript
const canvas = document.createElement('canvas');
canvas.width = tempImg.width;
canvas.height = tempImg.height;
const ctx = canvas.getContext('2d');
```

#### **2. Desenho da Imagem**
```javascript
ctx.drawImage(tempImg, 0, 0);
```

#### **3. Extração de Dados de Pixels**
```javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // Array RGBA: [R, G, B, A, R, G, B, A, ...]
```

#### **4. Processamento Pixel por Pixel**
A conversão para tons de cinza utiliza a fórmula de luminância percebida (ITU-R BT.601):

```javascript
for (let i = 0; i < data.length; i += 4) {
    // Fórmula: Gray = R × 0.299 + G × 0.587 + B × 0.114
    // Pesa mais o verde (percepção visual humana)
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    
    data[i]     = gray;  // R
    data[i + 1] = gray;  // G
    data[i + 2] = gray;  // B
    // data[i + 3] já é o Alpha, mantém opacidade original
}
```

#### **5. Atualização e Conversão para Data URL**
```javascript
ctx.putImageData(imageData, 0, 0);
const base64Image = canvas.toDataURL('image/png');
```

**O que o Canvas oferece:**
- Acesso direto a pixels individuais
- Manipulação de cores em tempo real
- Geração de imagens base64 (data URLs)
- Suporte a operações gráficas 2D/3D
- Performance otimizada (acelerada por GPU em navegadores modernos)

---

### 🧪 **Testes Automatizados**

#### **Jest - Framework de Testes**
```json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^30.3.0"
  }
}
```

#### **Selenium WebDriver - Testes End-to-End**
Automação de navegador para validação do comportamento real:

```javascript
const { Builder, By, until } = require('selenium-webdriver');

describe('Dog Image Test', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Sem interface gráfica
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  test('should load and display dog images', async () => {
    await driver.get('http://localhost:8080');
    
    // Aguarda elemento estar pronto
    const button = await driver.wait(until.elementLocated(By.css('button')), 10000);
    await button.click();
    
    // Valida atributos da imagem
    const originalImg = await driver.wait(until.elementLocated(By.css('#dog-container img')), 10000);
    const originalSrc = await originalImg.getAttribute('src');
    expect(originalSrc).toContain('https://images.dog.ceo');
  }, 30000);
});
```

**Funcionalidades:**
- Teste de navegação e cliques
- Espera por elementos carregarem
- Validação de atributos DOM
- Execução em modo headless (CI/CD)

---

## 🛠️ Stack Completo

### Frontend
| Tecnologia | Uso |
|-----------|-----|
| **HTML5** | Estrutura semântica com elementos modernos |
| **CSS3** | Flexbox, transições, responsividade |
| **JavaScript ES6+** | Classes, arrow functions, template literals |
| **Fetch API** | Requisições HTTP assíncronas |
| **Promises** | Gerenciamento de operações assíncronas |
| **Async/Await** | Sintaxe limpa para código assíncrono |
| **Canvas API** | Processamento e manipulação de imagens |
| **Image API** | Carregamento assíncrono de imagens |

### Backend & DevTools
| Tecnologia | Uso |
|-----------|-----|
| **Node.js** | Runtime JavaScript server-side |
| **HTTP Server** | Servidor local para desenvolvimento (`npm run serve`) |
| **Jest** | Framework de testes |
| **Selenium WebDriver** | Automação e testes E2E |
| **Chromedriver** | Driver para executar Chrome headless |
| **Sharp** | Processamento de imagens (dependência) |

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14+)
- npm ou yarn
- Chrome/Chromium instalado (para testes)

### Instalação e Setup
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor local
npm run serve

# 3. Abrir navegador
# http://localhost:8080
```

### Executar Testes
```bash
# Testes End-to-End com Selenium
npm test

# Ou manualmente:
npm run serve &  # Em background
npx jest dog-test.js
```

---

## 📁 Estrutura do Projeto

```
novaPastaDogPretoEbranco/
├── index.html          # Interface HTML com CSS embutido
├── test-fetch.js       # Lógica principal (Fetch, Canvas, Async/Await)
├── dog-test.js         # Testes automatizados (Jest + Selenium)
├── package.json        # Dependências e scripts
└── README.md           # Este arquivo
```

---

## 🔄 Fluxo de Execução

```
┌─────────────────────────────────────────┐
│ Usuário clica "Carregar Nova Imagem"   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ createDogImage() [async function]       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ fetchAndProcessDogImage() [await fetch...]   │ ◄─── Fetch API
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ dog.ceo API retorna URL de cachorro     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Image carregada → Canvas processado      │ ◄─── Canvas API
│ RGB convertido → Grayscale              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Exibir ambas imagens no DOM             │
└──────────────────────────────────────────┘
```

---

## 💡 Conceitos-Chave Implementados

### 1. **Requisições Assíncronas com Promises**
```javascript
// Promise implícita em Fetch
fetch(url).then(res => res.json()).then(data => {...})
```

### 2. **Sintaxe Moderna com Async/Await**
```javascript
async function getData() {
  const res = await fetch(url);        // Pausa até resposta
  const data = await res.json();       // Pausa até parsing
  return data;
}
```

### 3. **Tratamento de Erros Robusto**
```javascript
try {
  const data = await fetchData();
} catch (error) {
  console.error('Falha:', error.message);
  // Fallback UI
}
```

### 4. **Manipulação de Dados Binários com Canvas**
```javascript
// Acesso direto a pixels: [R, G, B, A, R, G, B, A, ...]
const imageData = ctx.getImageData(x, y, w, h);
const pixels = imageData.data;

// Modificação de cor individual
pixels[0] = newRed;
pixels[1] = newGreen;
pixels[2] = newBlue;
```

### 5. **Conversão para Data URL (Base64)**
```javascript
// Canvas → PNG base64
const dataUrl = canvas.toDataURL('image/png');
// Pode ser usado diretamente em <img src="...">
```

### 6. **Testes Automatizados**
```javascript
// Selenium waits para elementos
await driver.wait(until.elementLocated(By.css('img')), 10000);

// Validação de estado
const src = await img.getAttribute('src');
expect(src).toContain('dog.ceo');
```

---

## 📊 Algoritmo de Conversão para Cinza

A aplicação utiliza a **fórmula de luminância ITU-R BT.601**, que considera a sensibilidade diferente do olho humano a cada canal de cor:

```
Grayscale = Red × 0.299 + Green × 0.587 + Blue × 0.114
```

**Por quê essas proporções?**
- Verde: 58.7% (olho é mais sensível)
- Vermelho: 29.9%
- Azul: 11.4% (menos perceptível)

Este algoritmo gera imagens em escala de cinza mais naturais e realistas do que simplesmente calcular a média dos três canais (que seria 33.3% cada).

---

## ⚙️ Dependências

```json
{
  "dependencies": {
    "sharp": "^0.34.5"
  },
  "devDependencies": {
    "chromedriver": "^148.0.0",
    "http-server": "^14.1.1",
    "jest": "^30.3.0",
    "selenium-webdriver": "^4.43.0"
  }
}
```

---

## 🎓 O Que Você Aprenderá

✅ **Requisições HTTP**
- Fetch API moderna
- Tratamento de respostas JSON
- Gerenciamento de erros de rede

✅ **Programação Assíncrona**
- Promises e seu ciclo de vida
- Async/Await para código legível
- Try/Catch para erros assíncronos

✅ **Canvas API**
- Desenho e manipulação de imagens
- Processamento pixel-by-pixel
- Conversão de espaço de cores
- Data URLs e base64

✅ **Testes Automatizados**
- Jest para estruturação de testes
- Selenium para E2E testing
- Mocking e espias
- CI/CD ready

---

## 🔗 Recursos Úteis

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Dog CEO API Docs](https://dog.ceo/dog-api/)
- [Jest Documentation](https://jestjs.io/)
- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/webdriver/)

---

## 📝 Licença

ISC - Veja package.json para detalhes

## 👨‍💻 Autor

**Paulo Zanovello**

## 🙏 Agradecimentos

- [Dog CEO](https://dog.ceo/) - API gratuita de imagens de cães
- Comunidade JavaScript/Node.js
- Comunidade Open Source

---

**⭐ Se encontrou este projeto útil, considere dar uma estrela no GitHub!**