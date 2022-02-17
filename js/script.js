// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0x51A27e0e1c1E4bB7100A67976DF9D58A30D40C0e";
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

function listarBem(id){
  return DApp.contracts.Leilao.methods.listarBem(id).call();
}

function ehDono(){
  return DApp.contracts.Leilao.methods.isOwner().call();
}

// *** MÉTODOS (de escrita) DO CONTRATO *** //

function fazerLance(id){
  const valor = umEtherEmWei * parseFloat(document.querySelector(`#bem-${id}`).querySelector("#valor").value);
  listarBem(id).then((result) => {
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
    let card = document.querySelector("#card-modelo");
    bens.forEach((bem) => {
      let clone = card.cloneNode(true);
      let elm = document.getElementById(`bem-${bem.id}`);
      if(elm != null){
        elm.remove();
      }
      clone.querySelector("#btn-fazer-lance").setAttribute("onClick", `fazerLance(${parseInt(bem.id)})`);
      clone.querySelector(".card-title").innerText = bem.id;
      clone.querySelector("#ultimo-apostador").innerText = `${bem.ultimoApostador.slice(15)}`;
      clone.querySelector("#ultimo-lance").innerText = `Valor atual: ${parseInt(bem.lancheAtual)/umEtherEmWei} ETH`;
      clone.id = `bem-${bem.id}`;
      clone.hidden = '';
      clone.classList.add('lista-bens');
      card.after(clone);
    })  
  });
  document.getElementById("btnNovoBem").style.display = "none";
  ehDono().then((result) => {
    if (parseInt(DApp.account) == parseInt(result)) {
      document.getElementById("btnNovoBem").onclick = criarBem;
      document.getElementById("btnNovoBem").style.display = "block";
    }
  });
}

function eventoNovoBem(evento){
  console.log("eventoNovoBem",evento);
  atualizaInterface()
}

function eventoNovoLonce(evento){
  console.log("eventoNovoLonce",evento);
  atualizaInterface()
}

function validarLance(valorAtual, valorAposta){
  if(!(valorAposta > valorAtual && valorAposta !== valorAtual)){
    alert("Valor da aposta é inferior ao valor atual do bem");
    return false;
  }
  return true;
}