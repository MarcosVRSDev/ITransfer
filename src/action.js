const moveFile = require("move-file");
const path = require("path");
const cmd = require("node-command-line");
Promise = require("bluebird");

let inputEnvio = document.querySelector("#input-envio");
let inputRetorno = document.querySelector("#input-retorno");
let inputArquivo = document.querySelector("#input-arquivo");
let searchEnvio = document.querySelector("#search-envio");
let searchRetorno = document.querySelector("#search-retorno");

//Trás os diretórios salvos em LocalStorage ao abrir o sistema
populateUI();

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
  alert(
    `E:/ITransfer/envia/ConsoleApp1.exe -E ${inputEnvio.value}\\${inputArquivo.value} Program Files/${inputArquivo.value}`
  );

  Promise.coroutine(function* () {
    var response = yield cmd.run(
      `E:/ITransfer/envia/ConsoleApp1.exe -E ${inputEnvio.value}\\${inputArquivo.value} "Program Files/${inputArquivo.value}"`
    );
    if (response.success) {
      alert("Arquivo enviado com sucesso");
      alert(response.message);
      // do something
      // if success get stdout info in message. like response.message
    } else {
      alert("Não foi possível enviar o arquivo. Motivo: " + response.error);
      // do something
      // if not success get error message and stdErr info as error and stdErr.
      //like response.error and response.stdErr
    }
    console.log("Enviado");
    localStorage.setItem("inputEnvio", inputEnvio.value);
    localStorage.setItem("inputRetorno", inputRetorno.value);
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

//Função que trás os diretórios salvos em LocalStorage
function populateUI() {
  inputEnvio.value = localStorage.getItem("inputEnvio");
  inputRetorno.value = localStorage.getItem("inputRetorno");
}
