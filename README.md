
# Instruções de Teste - Conexão Iframe (EcoFeira & Formsheets)

Para testar se a comunicação via `postMessage` está funcionando entre o site pai (EcoFeira) e o site filho (Formsheets), siga os passos abaixo:

### 1. No Projeto EcoFeira (Pai)
Você deve ter uma função que envia os dados assim que o iframe termina de carregar ou via clique de botão.

```javascript
// Exemplo de código no console do navegador ou no seu componente React
const iframe = document.querySelector('iframe'); // Seleciona o iframe do Formsheets

const testData = {
  type: 'ECOFEIRA_REPORT_DATA',
  userName: 'João Silva',
  userId: 'user_123',
  itemId: 'prod_999',
  itemUrl: 'https://ecofeira.com/produto/tomate',
  productName: 'Tomate Cereja Orgânico',
  supermarket: 'Hortifruti Centro'
};

// Envia a mensagem para o iframe
iframe.contentWindow.postMessage(testData, '*');
```

### 2. No Console do Formsheets (Filho)
O script que geramos imprimirá no console:
`Formsheets: Dados do EcoFeira recebidos com sucesso!`

Os campos ocultos do formulário serão preenchidos automaticamente e o título do formulário mudará para mostrar o nome do produto ("Tomate Cereja Orgânico").

### 3. Como validar a segurança?
Em produção, substitua o `*` no `postMessage(data, '*')` pela URL real do site Formsheets para garantir que apenas ele receba os dados.

### 4. Fluxo de Sucesso
Após preencher a descrição e clicar em "Enviar Reporte", o sistema simulará um carregamento e exibirá a tela de sucesso com o ícone de check verde, conforme solicitado.
