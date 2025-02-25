const fs = require("fs");
const readline = require("readline");

// Caminho do arquivo
const filePath = "dados.txt";

// Interface para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Verifica se o arquivo existe, se não, cria um novo
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "", "utf8");
  console.log("Arquivo 'dados.txt' criado.");
}

// Função para exibir o menu
function showMenu() {
  console.log("\nGerenciador de Arquivo - Escolha uma opção:");
  console.log("1 - Adicionar conteúdo");
  console.log("2 - Ler conteúdo");
  console.log("3 - Atualizar conteúdo");
  console.log("4 - Deletar arquivo");
  console.log("5 - Sair");

  rl.question("Digite sua escolha: ", (choice) => {
    switch (choice) {
      case "1":
        addContent();
        break;
      case "2":
        readContent();
        break;
      case "3":
        updateContent();
        break;
      case "4":
        deleteFile();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida! Tente novamente.");
        showMenu();
    }
  });
}

// Adicionar conteúdo ao arquivo
function addContent() {
  rl.question("Digite o texto a ser adicionado: ", (text) => {
    fs.appendFileSync(filePath, text + "\n", "utf8");
    console.log("Texto adicionado com sucesso.");
    showMenu();
  });
}

// Ler o conteúdo do arquivo
function readContent() {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    console.log("\nConteúdo do arquivo:");
    console.log(content || "Arquivo vazio.");
  } else {
    console.log("O arquivo não existe.");
  }
  showMenu();
}

// Atualizar (sobrescrever) o conteúdo do arquivo
function updateContent() {
  rl.question("Digite o novo conteúdo para o arquivo: ", (text) => {
    fs.writeFileSync(filePath, text, "utf8");
    console.log("Conteúdo atualizado com sucesso.");
    showMenu();
  });
}

// Excluir o arquivo
function deleteFile() {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("Arquivo 'dados.txt' deletado com sucesso.");
  } else {
    console.log("O arquivo não existe.");
  }
  showMenu();
}

// Iniciar o programa
showMenu();