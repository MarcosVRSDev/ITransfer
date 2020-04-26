const moveFile = require("move-file");
const path = require('path');

let inputEnvio = document.querySelector('#input-envio');
let inputRetorno = document.querySelector('#input-retorno');
let inputArquivo = document.querySelector('#input-arquivo');
let searchEnvio = document.querySelector('#search-envio');
let searchRetorno = document.querySelector('#search-retorno');


//Trás os diretórios salvos em LocalStorage ao abrir o sistema
populateUI();

searchEnvio.addEventListener('change', (event) => {
  let newPath = path.dirname(searchEnvio.files[0].path);
  inputEnvio.value = newPath;
});

searchRetorno.addEventListener('change', (event) => {
  let newPath = path.dirname(searchRetorno.files[0].path);
  inputRetorno.value = newPath;
});

//Enviar arquivo
function sendFile() {
  (async () => {
    await moveFile(
      `${inputEnvio.value}/${inputArquivo.value}`,
      `${inputRetorno.value}/${inputArquivo.value}`
    );
    alert("O arquivo foi enviado com sucesso!");
    localStorage.setItem('inputEnvio', inputEnvio.value);
    localStorage.setItem('inputRetorno', inputRetorno.value);
  })();
}

//Receber arquivo
function getFile() {
  (async () => {
    await moveFile(
      `${inputRetorno.value}/${inputArquivo.value}`,
      `${inputEnvio.value}/${inputArquivo.value}`
    );
    alert("O arquivo foi recebido com sucesso!");
    localStorage.setItem('inputEnvio', inputEnvio.value);
    localStorage.setItem('inputRetorno', inputRetorno.value);
  })();
}

//Função que trás os diretórios salvos em LocalStorage
function populateUI() {
  inputEnvio.value = localStorage.getItem('inputEnvio');
  inputRetorno.value = localStorage.getItem('inputRetorno');
}

