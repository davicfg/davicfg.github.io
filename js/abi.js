var abi = 
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "novoBem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "valor",
				"type": "uint256"
			}
		],
		"name": "novoLonce",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "criarBem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "fazerLance",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "jobArrematarBens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "listarBen",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ultimoBlocoLance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lancheAtual",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ultimoApostador",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "vendido",
						"type": "bool"
					}
				],
				"internalType": "struct Leilao.Bem",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listarBens",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ultimoBlocoLance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lancheAtual",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ultimoApostador",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "vendido",
						"type": "bool"
					}
				],
				"internalType": "struct Leilao.Bem[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]