// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0xd25018Ee977f7E7024D8411F216a50aF62422Be8";
const umEtherEmWei = 1000000000000000000
// Inicializa o objeto DApp
document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

// Nosso objeto DApp que irá armazenar a instância web3
const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  // Inicializa o provedor web3
  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ // Requisita primeiro acesso ao Metamask
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on('accountsChanged', DApp.updateAccount); // Atualiza se o usuário trcar de conta no Metamaslk
      } catch (error) {
        console.error("Usuário negou acesso ao web3!");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.error("Instalar MetaMask!");
      return;
    }
    return DApp.initContract();
  },

  // Atualiza 'DApp.account' para a conta ativa no Metamask
  updateAccount: async function() {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
    atualizaInterface();
  },

  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.Leilao = new DApp.web3.eth.Contract(abi, contractAddress);
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    inicializaInterface();
  },
};

// *** MÉTODOS (de consulta - view) DO CONTRATO *** //

function listarBens(){
  return DApp.contracts.Leilao.methods.listarBens().call();
}

function listarBen(id){
  return DApp.contracts.Leilao.methods.listarBen(id).call();
}

// *** MÉTODOS (de escrita) DO CONTRATO *** //

function fazerLance(id){
  const valor = umEtherEmWei * parseFloat(document.querySelector(`#bem-${id}`).querySelector("#valor").value);
  listarBen(id).then((result) => {
    console.log("🚀 ~ file: script.js ~ line 74 ~ listarBen ~ result", result)
    if(validarLance(parseInt(result.lancheAtual), valor)){
      return DApp.contracts.Leilao.methods.fazerLance(id).send({from: DApp.account, value: valor}).then(atualizaInterface)
    }
  });
}

function criarBem(){
  return DApp.contracts.Leilao.methods.criarBem()
    .send({from: DApp.account}).then(atualizaInterface);
}

// *** ATUALIZAÇÃO DO HTML *** //

function inicializaInterface(){
  atualizaInterface();
  DApp.contracts.Leilao.events.novoBem((error, event) => eventoNovoBem([event]));  
  DApp.contracts.Leilao.events.novoLonce((error, event) => eventoNovoLonce([event]));  

}
function atualizaInterface(){
  listarBens().then((bens) => {
    console.log("🚀 ~ file: script.js ~ line 96 ~ listarBens ~ result", bens)
    let card = document.querySelector("#card-modelo");
    bens.forEach((ben) => {
      let clone = card.cloneNode(true);
      clone.querySelector("#btn-fazer-lance").setAttribute("onClick", `fazerLance(${parseInt(ben.id)})`);
      clone.querySelector(".card-title").innerText = ben.id;
      clone.querySelector("#ultimo-apostador").innerText = `${ben.ultimoApostador.slice(15)}`;
      clone.querySelector("#ultimo-lance").innerText = `Valor atual: ${parseInt(ben.lancheAtual)/umEtherEmWei} ETH`;
      clone.id = `ben-${ben.id}`;
      clone.hidden = '';
      clone.classList.add('lista-bens');
      card.after(clone);
    })
    
  });
}

function eventoNovoBem(evento){
  console.log("eventoNovoBem",evento);
}

function eventoNovoLonce(evento){
  console.log("eventoNovoLonce",evento);
}

function validarLance(valorAtual, valorAposta){
  console.log("🚀 ~ file: script.js ~ line 109 ~ validarLance ~ valorAtual, valorAposta", valorAtual, valorAposta)
  if(valorAtual > valorAposta){
    alert("Valor da aposta é inferior ao valor atual do bem");
    return false;
  }
  return true;
}