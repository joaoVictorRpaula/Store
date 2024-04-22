# Store

## Descrição

Projeto contém uma API em .NET e uma interface de usuário em Angular.

---

## Instruções de Configuração

### Banco de Dados

Crie as tabelas no banco através dos scripts "Cliente table.sql", "Produto table.sql", "Venda table.sql"

### Clone do Repositório

Clone o repositório com o seguinte comando:

\`\`\`bash
git clone https://github.com/joaoVictorRpaula/Store
\`\`\`

---

## Configuração da UI

1. Navegue até a pasta `store/Store.UI` dentro do repositório clonado.
    \`\`\`bash
    cd Store/Store.UI
    \`\`\`

2. Instale as dependências do projeto Angular:
    \`\`\`bash
    npm install
    \`\`\`

3. Após a instalação, você pode iniciar a aplicação Angular com:
    \`\`\`bash
    ng serve
    \`\`\`
   Acesse a aplicação em `http://localhost:4200/`.

---

## Configuração da API

1. Configure a `Store.API` como projeto de startup no Visual Studio ou usando o comando:
    \`\`\`bash
    dotnet run --project Store.API
    \`\`\`

2. A API estará rodando em `https://localhost:7017/swagger/index.html`.

---
