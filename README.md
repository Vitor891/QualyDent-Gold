# QualyDent Gold — nova página

Landing page única (uma página, com âncoras) que substitui o link-in-bio atual
(`linktr.ee/QualyDentGoldGoogle`). HTML + CSS + JS puros, sem build step —
pode ser hospedada em qualquer lugar (Hostinger, Vercel, Netlify, cPanel, etc.),
inclusive junto do WordPress atual em um subdomínio ou como página nova.

## Estrutura

```
qualydent-gold/
├── index.html          → a página inteira
├── css/style.css        → design system (cores, tipografia, componentes)
├── js/main.js            → menu mobile, FAQ, modal do WhatsApp, animações
└── assets/img/
    ├── brand/            → logo e ícone (fundo transparente)
    ├── clinics/           → fotos das unidades e do espaço
    ├── team/               → cards da equipe (já vêm com foto + bio prontos)
    ├── treatments/          → fotos dos 4 tratamentos em destaque
    ├── testimonials/         → posts reais do Instagram (tira "acompanhe redes")
    └── _originals/            → arquivos originais em alta resolução (não usados
                                  no site — guardados só de referência/backup)
```

## Como visualizar

Abrir `index.html` direto no navegador **não** carrega o CSS/JS corretamente
por causa dos caminhos relativos — sirva como servidor local:

```bash
npx --yes serve qualydent-gold
```

(ou qualquer outro servidor estático — Live Server do VS Code, `php -S`, etc.)

## O que foi extraído do material real do cliente (nada foi inventado)

- **Site oficial** `qualydentgold.com.br` (textos das 4 páginas de tratamento,
  FAQ, bios completas da equipe, fotos do espaço, logo).
- **WhatsApp real das duas unidades**, obtido a partir dos links de clique
  já usados pelo cliente (Rio do Sul `(47) 3521-1777` e Otacílio Costa
  `(49) 99938-9545`).
- **Avaliações reais do Google** (nota e comentários) das duas unidades.
- **Endereços** confirmados via Google Maps.

## Onde editar o que for mudar com frequência

- **Números de WhatsApp / mensagens pré-escritas** → topo de `js/main.js`
  (objeto `UNITS`) e nos atributos `data-wa-message` espalhados pelo HTML.
- **Valores dos planos (sessão avulsa / 90 dias / 180 dias)** → hoje aparecem
  como "sob consulta" de propósito, porque o preço não está publicado em
  nenhum canal oficial do cliente. Assim que a QualyDent definir os valores,
  é só trocar o texto em `.offer-price` na seção `#ofertas`.
- **Depoimentos em texto** → seção `#depoimentos`, `.review-card`. Hoje usa
  3 avaliações de Rio do Sul e 2 de Otacílio Costa (as que tinham texto no
  Google). Dá pra trocar por novas conforme chegarem.
- **Fotos** → trocar o arquivo em `assets/img/...` mantendo o mesmo nome, ou
  atualizar o `src` no HTML.

## Pendências / decisões que ficaram em aberto

1. **Preços dos planos**: não há valor publicado em nenhum lugar do material
   do cliente, então as três ofertas (sessão avulsa, 90 e 180 dias) foram
   estruturadas como a Regra 4 pediu, mas com "valor sob consulta" — para não
   inventar número. Se o cliente informar os valores, é rápido de preencher.
2. **Horário de funcionamento**: o Google Maps mostrou "Aberto · Fecha 18:00"
   no momento da consulta, mas não achei uma tabela oficial de horário
   semanal — por isso não apareceu no site. Se o cliente passar os horários,
   dá pra adicionar um `.clinic-row` com o ícone de relógio (já tem no sprite
   de ícones, `#i-clock`).
3. **Domínio**: as tags Open Graph (`og:image`) usam caminho relativo — ao
   publicar em um domínio definitivo, vale trocar para URL absoluta.
