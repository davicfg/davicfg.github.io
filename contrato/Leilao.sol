// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Owned.sol";

contract Leilao is Mortal{
    event novoBem(uint id);
    event novoLonce(uint id, uint valor);

    struct Bem {
        uint id;
        uint ultimoBlocoLance;
        uint lancheAtual;
        address ultimoApostador;
        bool vendido;
    }
    uint ultimoID = 0;
    Bem[] bens;

    //OK
    function criarBem() public onlyOwner {
        bens.push(Bem(ultimoID, block.number, 0, 0x0000000000000000000000000000000000000000, false));
        emit novoBem(ultimoID);
        ultimoID +=1;
    }

    //OK
    function listarBens() public view returns(Bem[] memory){
        return bens;
    }

    function listarBen(uint id) public view returns(Bem memory){
        return bens[id];
    }

    function fazerLance(uint id) public payable{
        require(id>=0 && id<ultimoID, "id invalidado");
        require(msg.value > bens[id].lancheAtual, "valor do lance menor que o valor da ultima aposta");
        require(bens[id].vendido == false, "esse bem jah foi leiloado");

        bens[id].ultimoBlocoLance = block.number;
        bens[id].lancheAtual = msg.value;
        bens[id].ultimoApostador = msg.sender;

        emit novoLonce(id, msg.value);

    }   

    function jobArrematarBens() public {
        for(uint i; i < ultimoID; i++){
            if(block.number -3 >= bens[i].ultimoBlocoLance){
                bens[i].vendido = true;
            }
        }
    }

}