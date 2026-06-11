# Configuração do formulário de contato

O formulário envia mensagens por uma Vercel Function usando a API do Resend.

## Configurar

1. Crie uma conta no [Resend](https://resend.com/).
2. Adicione e verifique um domínio que você controla.
3. Crie uma API key no Resend.
4. No projeto da Vercel, adicione estas variáveis de ambiente:
   - `RESEND_API_KEY`: chave criada no Resend.
   - `CONTACT_FROM_EMAIL`: remetente pertencente ao domínio verificado, por exemplo `Projeto Arte Kayode <contato@ileashe.org.br>`.
   - `CONTACT_TO_EMAIL`: endereço que receberá as mensagens.
5. Faça um novo deploy do projeto.

As variáveis também estão documentadas em `.env.example`. Nunca publique uma API key real no repositório.
