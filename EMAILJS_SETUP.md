# 📧 Configuração EmailJS para Formulário de Contato

## Passo 1: Criar conta no EmailJS
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up Free"
3. Faça login com Google, GitHub ou email

## Passo 2: Conectar Gmail
1. No dashboard, vá para **Email Services**
2. Clique em **Add New Service**
3. Selecione **Gmail**
4. Siga as instruções para autorizar
5. Copie o **Service ID** (algo como `service_abc123`)

## Passo 3: Criar Template
1. Vá para **Email Templates**
2. Clique em **Create New Template**
3. Configure assim:
   - **Template Name**: `template_leonardo`
   - **Subject**: `Nova mensagem de contato de {{from_name}}`
   - **Body**:
   ```
   Olá Leonardo,

   Você recebeu uma nova mensagem de contato:

   Nome: {{from_name}}
   Email: {{from_email}}

   Mensagem:
   {{message}}

   ---
   Responda diretamente para o email do visitante.
   ```
4. Clique em **Save**

## Passo 4: Copiar Public Key
1. Vá para **Account** → **API Keys**
2. Copie sua **Public Key** (algo como `pk_abc123xyz`)

## Passo 5: Atualizar script.js
1. Abra `script.js`
2. Encontre esta linha:
   ```javascript
   emailjs.init('SUA_PUBLIC_KEY_AQUI');
   ```
3. Substitua `SUA_PUBLIC_KEY_AQUI` pela sua Public Key
4. Certifique-se que os IDs estão corretos:
   - `service_leonardo` = seu Service ID do Gmail
   - `template_leonardo` = seu Template ID

## Exemplo Final em script.js:
```javascript
emailjs.init('pk_abc123xyz123'); // Sua Public Key real
...
emailjs.send('service_abc123', 'template_abc123', {
    to_email: 'leonardocadenasza@gmail.com',
    from_name: nome,
    from_email: email,
    message: mensagem
})
```

## Teste
1. Preencha o formulário de contato
2. Clique em "Enviar Mensagem"
3. Você receberá um email em `leonardocadenasza@gmail.com`

## Plano Gratuito
- ✅ 200 emails por mês
- ✅ Sem limitação de serviços
- ✅ Suporte para Gmail, Outlook, Yahoo, etc

Se ultrapassar 200 emails, atualize para o plano pago (muito barato!) ou configure com outro serviço.
