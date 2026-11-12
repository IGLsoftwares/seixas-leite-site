# Roadmap de SEO, AEO e GEO: Seixas & Leite

Site: https://seixasleite.com.br

## Feito no site

- Título, descrição, endereço canônico e dados de compartilhamento (Open Graph)
- Dados estruturados: escritório (LegalService), sócias (Person), serviços, FAQ e site
- `robots.txt` com buscadores e IAs liberados, `sitemap.xml`, `llms.txt` e `llms-full.txt`
- Favicons, manifesto, página 404 e redirecionamento do `www` e do `vercel.app` para o domínio principal
- Texto alternativo nas fotos e carregamento mais leve das imagens

## 1. Contas (quem faz: Gustavo)

- [ ] **Google Search Console:** adicionar a propriedade de domínio `seixasleite.com.br`, verificar com o registro TXT na Hostinger e enviar `sitemap.xml`
- [ ] **Bing Webmaster Tools:** importar do Search Console. O ChatGPT e o Copilot também usam dados do Bing
- [ ] Pedir a indexação da página inicial na "Inspeção de URL" do Search Console

## 2. Presença local (quem faz: escritório, é o que mais pesa em buscas "advogada em Manaus")

- [ ] **Perfil da Empresa no Google:** criar e verificar. Se não quiser mostrar o endereço, cadastrar como empresa de atendimento em área
- [ ] Pedir avaliações reais de clientes no perfil, respeitando as regras da OAB
- [ ] Colocar `https://seixasleite.com.br` na bio do Instagram

## 3. Dados que faltam no site (quem faz: escritório envia, Claude aplica)

- [x] Números de OAB das sócias e CNPJ no site (12/11/2026)
- [ ] Número de registro da sociedade na OAB, se ela quiser exibir
- [ ] Depoimentos reais com autorização, hoje com texto provisório
- [x] Nome oficial "Seixas & Leite Sociedade de Advogados" no site e nos dados estruturados
- [x] Fotos do escritório e do banner (12/11/2026)
- [ ] Foto vertical do banner para celular
- [ ] Confirmar o encarregado de dados (LGPD) e um e-mail para a Política de Privacidade
- [ ] Decidir se o endereço completo aparece no site e nos dados estruturados

## 4. Conteúdo (contínuo, é o que faz as IAs citarem)

- [ ] Criar uma página própria para cada área: Direito do Trabalho, BPC/LOAS e Tributário
- [ ] Publicar artigos respondendo dúvidas reais, com autora identificada e data
- [ ] Acrescentar perguntas ao FAQ conforme as dúvidas recebidas no WhatsApp

## 5. Acompanhamento (mensal)

- [ ] Search Console: buscas, cliques, páginas indexadas e erros
- [ ] Perguntar ao ChatGPT, Gemini, Perplexity e Claude por "advogada trabalhista em Manaus" e "advogada BPC em Manaus" e anotar se o escritório aparece

## Ao alterar o site

Manter `llms-full.txt`, o FAQ dentro do `<script type="application/ld+json">` do `index.html` e a data do `sitemap.xml` iguais ao conteúdo publicado.
