const moveFile = require("move-file");
const path = require("path");
const cmd = require("node-command-line");
Promise = require("bluebird");

//Dirétorios
let externalFolder = __dirname + "\\externos\\";
let inputEnvio = document.querySelector("#input-envio");
let inputRetorno = document.querySelector("#input-retorno");
let defaultWM = "Program Files/";
let defaultAndroid = "/sdcard/";

//Elementos na DOM
let inputArquivo = document.querySelector("#input-arquivo");
let searchEnvio = document.querySelector("#search-envio");
let searchRetorno = document.querySelector("#search-retorno");
let modalProgress = document.querySelector("#modal-progress");
let modalSetting = document.querySelector("#modal-settings");
let processType = document.querySelector("#process-type");

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
  modalProgress.classList.add("show");
  //PROCESSO DE ENVIO WINDOWS MOBILE
  if (processType.value == 1) {
    Promise.coroutine(function* () {
      let response = yield cmd.run(
        `${externalFolder}ConsoleApp1.exe -WM -E "${inputEnvio.value}\\${inputArquivo.value}" "${defaultWM}${inputArquivo.value}"`
      );
      if (response.success) {
        // do something
        // if success get stdout info in message. like response.message
        alert("Arquivo enviado com sucesso!\n" + response.message);
        modalProgress.classList.remove("show");
      } else {
        // if not success get error message and stdErr info as error and stdErr.
        //like response.error and response.stdErr
        alert("Não foi possível enviar o arquivo. Motivo: " + response.error);
        modalProgress.classList.remove("show");
      }
    })();
  } //PROCESSO DE ENVIO DO ANDROID
  else if (processType.value == 2) {
    Promise.coroutine(function* () {
      let response = yield cmd.run(
        `${externalFolder}ConsoleApp1.exe -A -E "${inputEnvio.value}\\${inputArquivo.value}" "${defaultAndroid}${inputArquivo.value}"`
      );
      if (response.success) {
        // do something
        // if success get stdout info in message. like response.message
        alert("Arquivo enviado com sucesso!\n" + response.message);
        modalProgress.classList.remove("show");
      } else {
        // if not success get error message and stdErr info as error and stdErr.
        //like response.error and response.stdErr
        alert("Não foi possível enviar o arquivo. Motivo: " + response.error);
        modalProgress.classList.remove("show");
      }
    })();
  } else {
    alert("Processo de envio ainda não disponível.");
    modalProgress.classList.remove("show");
  }

  localStorage.setItem("inputEnvio", inputEnvio.value);
  localStorage.setItem("inputRetorno", inputRetorno.value);
  localStorage.setItem("progressType", processType.value);
}

//Receber arquivo
function getFile() {
  modalProgress.classList.add("show");
  //PROCESSO DE ENVIO WINDOWS MOBILE
  if (processType.value == 1) {
    Promise.coroutine(function* () {
      let response = yield cmd.run(
        `${externalFolder}ConsoleApp1.exe -WM -R "${defaultWM}${inputArquivo.value}" "${inputEnvio.value}\\${inputArquivo.value}"`
      );
      if (response.success) {
        // do something
        // if success get stdout info in message. like response.message
        alert("Arquivo recebido com sucesso!\n" + response.message);
        modalProgress.classList.remove("show");
      } else {
        // if not success get error message and stdErr info as error and stdErr.
        //like response.error and response.stdErr
        alert("Não foi possível receber o arquivo. Motivo: " + response.error);
        modalProgress.classList.remove("show");
      }
    })();
  } //PROCESSO DE ENVIO DO ANDROID
  else if (processType.value == 2) {
    Promise.coroutine(function* () {
      let response = yield cmd.run(
        `${externalFolder}ConsoleApp1.exe -A -R "${defaultAndroid}${inputArquivo.value}" "${inputEnvio.value}\\${inputArquivo.value}"`
      );
      if (response.success) {
        // do something
        // if success get stdout info in message. like response.message
        alert("Arquivo recebido com sucesso!\n" + response.message);
        modalProgress.classList.remove("show");
      } else {
        // if not success get error message and stdErr info as error and stdErr.
        //like response.error and response.stdErr
        alert("Não foi possível receber o arquivo. Motivo: " + response.error);
        modalProgress.classList.remove("show");
      }
    })();
  } else {
    alert("Processo de recebimento ainda não disponível.");
    modalProgress.classList.remove("show");
  }

  localStorage.setItem("inputEnvio", inputEnvio.value);
  localStorage.setItem("inputRetorno", inputRetorno.value);
  localStorage.setItem("progressType", processType.value);
}

//Função para mudar a informação de diretório de acordo com tipo de processo de envio escolhido (Versão 1.0 o diretório é encapsulado no código)
function changeDefaultFolder() {
  if (processType.value == 1) {
    inputRetorno.value = defaultWM;
    localStorage.setItem("inputRetorno", inputRetorno.value);
    localStorage.setItem("progressType", processType.value);
  } else if (processType.value == 2) {
    inputRetorno.value = defaultAndroid;
    localStorage.setItem("inputRetorno", inputRetorno.value);
    localStorage.setItem("progressType", processType.value);
  } else {
    inputRetorno.value = "";
  }
}

//Função para abrir o modal de settings
function openSetting() {
  modalSetting.classList.add("show");
}

function closeSetting() {
  modalSetting.classList.remove("show");
}

//Função que trás os diretórios salvos em LocalStorage
function populateUI() {
  inputEnvio.value = localStorage.getItem("inputEnvio");
  inputRetorno.value = localStorage.getItem("inputRetorno");
  processType.value = localStorage.getItem("progressType");
}
