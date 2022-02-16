// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0xA651A2919b4D9deE39CDeC91770D5C169cBB1BED";

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

// *** MÉTODOS (de consulta - view) DO CONTRATO ** //

function listarBens(){
  return DApp.contracts.Leilao.methods.listarBens().call();
}


function inicializaInterface(){
  listarBens().then((result) => {
    console.log("🚀 ~ file: script.js ~ line 65 ~ listarBens ~ result", result)
  });
  DApp.contracts.Leilao.events.novoBem((error, event) => eventoNovoBem([event]));  

}

// *** MÉTODOS (de escrita) DO CONTRATO ** //

function eventoNovoBem(evento){
  console.log(evento);
}