# 🚀 DevOps + IA: Apresentação Interativa

Aplicação de slides moderna e interativa criada com Next.js, apresentando o tema **"Aplicando Modelos de Inteligência Artificial no Aprendizado de DevOps"**.

## 📋 Índice

- [Sobre a Apresentação](#-sobre-a-apresentação)
- [Características](#-características)
- [Como Executar](#-como-executar)
- [Controles](#-controles)
- [Assistente AI](#-assistente-ai)
- [Modo Automático](#-modo-automático)
- [Sistema de Certificados](#-sistema-de-certificados)
- [Otimizações Mobile](#-otimizações-mobile)
- [Tecnologias](#-tecnologias)
- [Autor](#-autor)

---

## 📋 Sobre a Apresentação

Esta apresentação contém **11 slides** que exploram como a Inteligência Artificial está transformando o aprendizado de DevOps:

1. **Capa** - Introdução ao tema
2. **O que é DevOps** - Conceitos fundamentais
3. **O desafio do aprendizado** - Dificuldades comuns
4. **A entrada da IA** - Como a IA pode ajudar
5. **Aplicações práticas** - Casos de uso reais
6. **Exemplo prático** - DevOps Coach com IA
7. **Benefícios educacionais** - Vantagens do uso de IA
8. **O futuro do aprendizado** - Tendências e perspectivas
9. **Demonstração rápida** - Exemplo com ChatGPT
10. **Conclusão** - DevOps + IA = Aprendizado exponencial
11. **Encerramento** - Contatos e agradecimentos

---

## 🎨 Características

- ✨ Design moderno com tema **Tech Futurista** (Azul/Preto/Branco)
- 🎯 Layout responsivo 16:9 (formato de apresentação)
- ⌨️ Navegação por teclado (setas ← →)
- 🖱️ Navegação por botões e indicadores
- 🎭 Animações suaves entre slides
- 🌐 Ícones modernos com Lucide React
- 💅 Estilização com TailwindCSS
- 🤖 **Assistente AI integrado** com OpenAI GPT-4o-mini
- 🎙️ **Controle por voz** - navegue pelos slides usando comandos
- 💬 **Chat interativo** - responda perguntas da audiência em tempo real
- 🎓 **Sistema de Certificados** - cadastre alunos e envie certificados via WhatsApp
- 📱 **Integração com Evolution API** - envio automático randômico
- 📱 **Interface Mobile Otimizada** - totalmente responsiva

---

## 🚀 Como Executar

### Instalação

```bash
# Instalar dependências
npm install
```

### Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# OpenAI API
OPENAI_API_KEY=sk-proj-sua_chave_aqui

# Evolution API (para certificados)
EVOLUTION_API_URL=https://evolution.cloudservo.com.br
EVOLUTION_API_KEY=sua_api_key_aqui
EVOLUTION_INSTANCE=CloudServo
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3001](http://localhost:3001) no navegador.

### Build de Produção

```bash
# Criar build otimizado
npm run build

# Executar build de produção
npm start
```

---

## 🎮 Controles

- **Seta Direita (→)** ou **Botão Próximo**: Avançar slide
- **Seta Esquerda (←)** ou **Botão Anterior**: Voltar slide
- **Indicadores**: Clicar para ir direto a um slide específico

---

## 🤖 Assistente AI

### Funcionalidades
- 💬 **Chat Interativo**: Faça perguntas sobre DevOps, IA, Docker, Kubernetes, etc.
- 🎙️ **Comandos de Voz**: Navegue pelos slides usando sua voz
- 🧠 **Respostas Inteligentes**: Powered by OpenAI GPT-4o-mini
- ⚡ **Tempo Real**: Respostas em streaming instantâneas
- 🎤 **MODO AUTOMÁTICO**: Escuta contínua durante apresentações

### Como Usar
1. Clique no botão 🤖 no canto inferior direito
2. **PARA APRESENTAÇÕES**: Ative o modo automático 🎤 (verde)
3. **PARA PERGUNTAS**: Digite ou use o microfone manual
4. Faça perguntas ou dê comandos de navegação

### Comandos de Voz
- "Próximo slide" - Avança para o próximo
- "Slide anterior" - Volta um slide
- "Ir para slide 5" - Vai direto para o slide 5
- "Primeiro slide" - Volta ao início
- "Último slide" - Vai para o final

### Exemplos de Perguntas

#### Sobre DevOps
- "O que é DevOps?"
- "Explique integração contínua"
- "Como funciona CI/CD?"
- "Diferença entre Docker e Kubernetes"

#### Sobre IA no DevOps
- "Como a IA pode ajudar em DevOps?"
- "Exemplos de IA em automação"
- "Ferramentas de IA para DevOps"

#### Exemplos Práticos
- "Me dê um exemplo de Dockerfile"
- "Como criar um pipeline GitLab CI?"
- "Exemplo de Terraform para AWS"

---

## 🎤 Modo Automático

### O que é?

O **Modo Automático** mantém o assistente AI sempre ouvindo e pronto para responder seus comandos durante a apresentação. Você não precisa clicar em nada - apenas fale!

### Como Ativar

1. **Abra o assistente** (clique no botão 🤖)
2. **Clique no ícone do microfone** no header (canto superior direito)
3. **Aguarde** - o botão ficará verde ✅
4. **Está ativo!** - Pode falar a qualquer momento

### Indicadores Visuais

**Quando ATIVO:**
- 🟢 Botão flutuante verde pulsante
- 🔴 Badge vermelho animado
- 💚 "Escuta automática ativa" no header
- 🎤 Ícone de microfone verde

**Quando DESATIVADO:**
- 🔵 Botão flutuante azul/roxo
- 🟢 Badge verde normal
- 🎤 Ícone de microfone cinza

### Fluxo de Uso Ideal

**Antes da Apresentação:**
1. ✅ Abra a apresentação (http://localhost:3001)
2. ✅ Clique no assistente 🤖
3. ✅ Ative o modo automático 🎤
4. ✅ Minimize o chat (opcional)
5. ✅ Inicie a apresentação (F11 para fullscreen)

**Durante a Apresentação:**
```
Você: "Próximo slide"
→ Slide avança automaticamente ✅

Audiência: "O que é Kubernetes?"
Você: "O que é Kubernetes?"
→ Assistente responde no chat ✅
→ Você compartilha a resposta 📢

Você: "Ir para slide sete"
→ Pula direto para o slide 7 ✅
```

### Dicas de Uso

**✅ Melhores Práticas:**
1. **Ambiente Silencioso** - Minimize ruídos de fundo
2. **Comandos Claros** - Fale devagar e com clareza
3. **Teste Antes** - Pratique os comandos
4. **Minimize quando Apresentar** - Menos distração visual

**⚠️ O que Evitar:**
- ❌ Falar muito rápido
- ❌ Ambiente barulhento
- ❌ Comandos muito longos
- ❌ Múltiplos comandos seguidos

---

## 🎓 Sistema de Certificados

### Funcionalidades
- 📝 **Cadastro de Alunos** - Formulário completo (nome, email, WhatsApp)
- 🎨 **Geração Automática** - Certificados personalizados em PDF real (jsPDF)
- 📱 **Envio via WhatsApp** - Integração com Evolution API
- ⏱️ **Envio Randômico** - Intervalo de 2-7 segundos (anti-spam)
- 📊 **Painel Administrativo** - Acompanhe status em tempo real
- 💾 **Banco de Dados JSON** - Arquivo `data/students.json` como banco
- 🔌 **API REST Completa** - GET, POST, PUT, DELETE para alunos
- 🔒 **Dados Persistentes** - Salvamento automático em arquivo
- ✏️ **Editar Alunos** - Corrigir dados cadastrados
- 🔄 **Reenviar Certificados** - Envio individual sob demanda

### Como Usar
1. **Clique no botão 🏆** (abaixo do assistente AI)
2. **Adicione alunos** - Preencha nome, email e WhatsApp
3. **Envie certificados** - Clique em "Enviar Certificados"
4. **Acompanhe** - Veja o status em tempo real
5. **Edite dados** - Click "Editar" em qualquer aluno
6. **Reenvie** - Click "Reenviar" para enviar novamente

### Configuração da Evolution API

#### 1. Variáveis de Ambiente

Adicione ao arquivo `.env.local`:

```bash
EVOLUTION_API_URL=https://evolution.cloudservo.com.br
EVOLUTION_API_KEY=sua_api_key_aqui
EVOLUTION_INSTANCE=CloudServo
```

#### 2. Criar Instância do WhatsApp

```bash
# POST para criar instância
curl -X POST http://localhost:8080/instance/create \
  -H "apikey: sua_api_key_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "CloudServo"
  }'
```

#### 3. Conectar WhatsApp

```bash
# GET QR Code
curl -X GET http://localhost:8080/instance/connect/CloudServo \
  -H "apikey: sua_api_key_aqui"

# Escaneie o QR Code com seu WhatsApp
```

### Design do Certificado

O certificado possui um design moderno e profissional:

#### Características
- **Fundo Escuro** (Dark Theme) - `#141414`
- **Cor destaque**: Ciano/Turquesa `#00D9FF`
- **Card central** com borda ciano
- **Nome do aluno** em destaque e maiúsculas
- **Linhas diagonais** decorativas
- **Logos** da FACIMP e CloudServo

#### Paleta de Cores

| Elemento | Cor | Hex |
|----------|-----|-----|
| Fundo principal | Preto/Cinza | `#141414` |
| Título "CERTIFICADO" | **Ciano** | **`#00D9FF`** |
| Nome do aluno | **Ciano** | **`#00D9FF`** |
| Card borda | Ciano | `#00D9FF` |
| Texto corpo | Cinza médio | `#B4B4B4` |
| Título apresentação | Branco | `#FFFFFF` |

### Banco de Dados JSON

#### Estrutura do Arquivo
```json
[
  {
    "id": "1730826000000",
    "name": "João da Silva",
    "email": "joao@exemplo.com",
    "phone": "11999999999",
    "registeredAt": "2025-11-05T17:00:00.000Z",
    "certificateSent": false
  }
]
```

#### API REST

**GET /api/students** - Listar todos os alunos
```bash
curl http://localhost:3001/api/students
```

**POST /api/students** - Adicionar novo aluno
```bash
curl -X POST http://localhost:3001/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1730826000000",
    "name": "João da Silva",
    "email": "joao@exemplo.com",
    "phone": "11999999999",
    "registeredAt": "2025-11-05T17:00:00.000Z",
    "certificateSent": false
  }'
```

**PUT /api/students** - Atualizar aluno
```bash
curl -X PUT http://localhost:3001/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1730826000000",
    "name": "João Silva",
    "email": "joao@gmail.com",
    "phone": "11999999999"
  }'
```

**DELETE /api/students?id=123** - Remover aluno
```bash
curl -X DELETE "http://localhost:3001/api/students?id=1730826000000"
```

### Edição e Reenvio

#### Editar Dados do Aluno
1. Localize o aluno na lista
2. Clique em "Editar" (botão azul)
3. Corrija os campos necessários
4. Clique em "Salvar Alterações"

#### Reenviar Certificado
1. Localize o aluno na lista
2. Clique em "Reenviar" (botão roxo)
3. Aguarde (botão mostra "Enviando...")
4. Certificado reenviado!

**Quando usar:**
- Aluno não recebeu
- WhatsApp estava errado (corrija antes)
- Quer enviar novamente com dados corretos

### Troubleshooting

#### Certificado não envia

**Verificar:**
1. Evolution API está rodando?
2. Número de telefone está correto?
3. Logs do servidor
4. Variáveis de ambiente no `.env.local`

**Teste manual:**
```bash
curl https://evolution.cloudservo.com.br/instance/fetchInstances \
  -H "apikey: sua_key"
```

#### Número de telefone

**Formatos aceitos:**
```
✅ 11999999999
✅ 5511999999999
✅ (11) 99999-9999 (será limpo automaticamente)
```

**Formato na API:**
```
5511999999999@s.whatsapp.net
```

---

## 📱 Otimizações Mobile

### Componentes Otimizados

#### Módulo de Certificados
- **Botão Flutuante**: Posição e tamanho adaptativo
- **Modal**: Bottom sheet style no mobile
- **Formulário**: Inputs e botões responsivos
- **Textos**: Adaptativos ("Adicionar" vs "Adicionar Aluno")

#### Assistente IA
- **Botão**: Tamanho e posição otimizados
- **Badge**: Compacto no mobile
- **Tooltip**: Oculto em touch devices

### Classes Responsivas

```jsx
// Espaçamento
className="p-3 sm:p-6"

// Tipografia
className="text-xs sm:text-sm"
className="text-lg sm:text-2xl"

// Posicionamento
className="bottom-4 sm:bottom-8"
className="right-4 sm:right-28"

// Visibilidade
className="hidden sm:block"    // Ocultar no mobile
className="sm:hidden"           // Ocultar no desktop
```

### Interações Touch
- **Feedback visual**: `active:scale-95`
- **Áreas de toque**: Mínimo 44x44px
- **Botões mobile**: `p-3` = 48px mínimo

### Testes Recomendados

**Dispositivos:**
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13/14 (390px)
- ✅ Samsung Galaxy S21 (360px)
- ✅ iPad Mini (768px)

**Como testar:**
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Selecione dispositivo ou dimensão customizada
```

---

## 🛠️ Tecnologias Utilizadas

- [Next.js 16](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [TailwindCSS](https://tailwindcss.com/) - Estilização
- [Lucide React](https://lucide.dev/) - Ícones modernos
- [OpenAI API](https://openai.com/) - Assistente AI com GPT-4o-mini
- [Vercel AI SDK](https://sdk.vercel.ai/) - Streaming e chat interativo
- [jsPDF](https://github.com/parallax/jsPDF) - Geração de PDFs
- [Evolution API](https://evolution-api.com/) - Envio via WhatsApp

---

## 📁 Estrutura do Projeto

```
devops-ai-slides/
├── app/
│   ├── page.tsx                    # Página principal
│   ├── layout.tsx                  # Layout global
│   ├── globals.css                 # Estilos globais
│   └── api/
│       ├── chat/route.ts          # API do assistente AI
│       ├── students/route.ts      # API de alunos (CRUD)
│       └── certificates/
│           ├── send/route.ts      # Envio de certificados
│           └── test/route.ts      # Teste de certificados
├── components/
│   ├── SlidePresentation.tsx      # Componente principal
│   ├── AIAssistant.tsx            # Assistente AI
│   ├── CertificateModule.tsx      # Módulo de certificados
│   └── slides/
│       ├── SlideLayout.tsx        # Layout base dos slides
│       ├── Slide1.tsx             # Slide 1 - Capa
│       ├── Slide2.tsx             # Slide 2 - O que é DevOps
│       └── ...                    # Demais slides
├── data/
│   └── students.json              # Banco de dados de alunos
├── public/
│   ├── logofacimp.png            # Logo FACIMP
│   └── logoscs.png               # Logo CloudServo
└── .env.local                     # Variáveis de ambiente
```

---

## 💡 Dicas de Uso

### Para Apresentações
1. ✅ Teste o microfone antes
2. ✅ Ative modo automático para navegação hands-free
3. ✅ Pratique comandos de voz
4. ✅ Use F11 para fullscreen
5. ✅ Minimize o chat se preferir

### Para Certificados
1. ✅ Cadastre alunos aos poucos
2. ✅ Teste com seu próprio WhatsApp primeiro
3. ✅ Verifique dados antes de enviar
4. ✅ Use intervalo maior para muitos alunos
5. ✅ Faça backup do arquivo `data/students.json`

### Para Mobile
1. ✅ Teste em dispositivos reais
2. ✅ Verifique áreas de toque
3. ✅ Confirme legibilidade dos textos
4. ✅ Teste orientação portrait e landscape

---

## 🐛 Troubleshooting Geral

### Assistente AI não funciona
1. Verifique `OPENAI_API_KEY` no `.env.local`
2. Reinicie o servidor (`npm run dev`)
3. Verifique console do navegador (F12)

### Microfone não funciona
1. Permita acesso ao microfone no navegador
2. Use Chrome ou Edge (Chromium)
3. Teste em chrome://settings/content/microphone

### Certificados não enviam
1. Verifique variáveis da Evolution API
2. Teste conexão com a API
3. Verifique formato do número de telefone
4. Confira logs do servidor

---

## 📊 Monitoramento de Custos

### OpenAI API
- **GPT-4o-mini**: ~$0.15 por 1M tokens de entrada
- **Estimativa**: Apresentação de 30 min ≈ $0.05-0.10
- Monitore em: https://platform.openai.com/usage

### Evolution API
- Verifique plano contratado
- Monitore uso de mensagens
- Configure limites se necessário

---

## 🔒 Segurança

**IMPORTANTE:**
- ✅ NUNCA commite `.env.local` no Git
- ✅ Use API Keys fortes
- ✅ Evolution API em servidor seguro
- ✅ HTTPS em produção
- ✅ Dados de alunos protegidos (LGPD)

---

## 📄 Licença

Este projeto foi criado para fins educacionais e de apresentação.

---

## 👤 Autor

**Sandro Souza**  
Especialista em DevOps e Segurança em Rede de Computadores  
CloudServo Remote System

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sandro-servo)

---

## 🎉 Conclusão

Sistema completo para apresentações profissionais com:
- ✅ Assistente AI integrado
- ✅ Navegação por voz
- ✅ Sistema de certificados
- ✅ Interface mobile
- ✅ Documentação completa

**Sua apresentação do futuro está pronta! 🚀✨**
