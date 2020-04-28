const moveFile = require("move-file");
const path = require("path");
const cmd = require("node-command-line");
Promise = require("bluebird");

//Dirétorios
let externalFolder = __dirname + '\\externos\\';
let inputEnvio = document.querySelector("#input-envio");
let inputRetorno = document.querySelector("#input-retorno");

let inputArquivo = document.querySelector("#input-arquivo");
let searchEnvio = document.querySelector("#search-envio");
let searchRetorno = document.querySelector("#search-retorno");
let modalProgress = document.querySelector('#modal-progress');
let processType = document.querySelector('#process-type');

//Trás os diretórios salvos em LocalStorage ao abrir o sistema
populateUI();
console.log(__dirname + "\\utils\\logo.svg");


searchEnvio.addEventListener("change", (event) => {
  let newPath = path.dirname(searchEnvio.files[0].path);
  inputEnvio.value = newPath;
});

searchRetorno.addEventListener("change", (event) => {
  let newPath = path.dirname(searchRetorno.files[0].path);
  inputRetorno.value = newPath;
});


//Enviar arquivo
function sendFile() {
  
 modalProgress.classList.add('show');

  if(processType.value == 1) {

    Promise.coroutine(function* () {
      var response = yield cmd.run(
        `${externalFolder}ConsoleApp1.exe -E ${inputEnvio.value}\\${inputArquivo.value} "Program Files/${inputArquivo.value}"`
      );
      if (response.success) {
        alert("Arquivo enviado com sucesso!\n" + response.message);
        modalProgress.classList.remove('show');
        // do something
        // if success get stdout info in message. like response.message
      } else {
        alert("Não foi possível enviar o arquivo. Motivo: " + response.error);
        modalProgress.classList.remove('show');
        // do something
        // if not success get error message and stdErr info as error and stdErr.
        //like response.error and response.stdErr
    }
  })();

  /* Mover arquivos entre pastas - Estara disponivel em outra rotina
    (async () => {
      await moveFile(
        `${inputEnvio.value}/${inputArquivo.value}`,
        `${inputRetorno.value}/${inputArquivo.value}`
      );
      alert("O arquivo foi enviado com sucesso!");
      localStorage.setItem("inputEnvio", inputEnvio.value);
      localStorage.setItem("inputRetorno", inputRetorno.value);
    })();*/
  } else {
    alert("Processo de envio ainda não disponível.");
    modalProgress.classList.remove('show');
  }

  localStorage.setItem("inputEnvio", inputEnvio.value);
  localStorage.setItem("inputRetorno", inputRetorno.value);
  localStorage.setItem("progressType", processType.value);
}

//Receber arquivo
function getFile() {
  (async () => {
    await moveFile(
      `${inputRetorno.value}/${inputArquivo.value}`,
      `${inputEnvio.value}/${inputArquivo.value}`
    );
    alert("O arquivo foi recebido com sucesso!");
    localStorage.setItem("inputEnvio", inputEnvio.value);
    localStorage.setItem("inputRetorno", inputRetorno.value);
  })();
}

//Função para mudar a informação de diretório de acordo com tipo de processo de envio escolhido (Versão 1.0 o diretório é encapsulado no código)
function changeDefaultFolder() {
  if(processType.value == 1) {
    inputRetorno.value = "Program Files/";
    localStorage.setItem("inputRetorno", inputRetorno.value);
    localStorage.setItem("progressType", processType.value);

  } else if (processType.value == 2) {
    inputRetorno.value = '';
    localStorage.setItem("inputRetorno", inputRetorno.value);
    localStorage.setItem("progressType", processType.value);

  } else {
    inputRetorno.value = '';
  }
}

//Função que trás os diretórios salvos em LocalStorage
function populateUI() {
  inputEnvio.value = localStorage.getItem("inputEnvio");
  inputRetorno.value = localStorage.getItem("inputRetorno");
  processType.value = localStorage.getItem("progressType");
}
