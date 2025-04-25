"use strict"


//Classe caixa com todas as funcionalidades necessárias
class Caixa {
    nome="";
    atendendo=false;
    valorNoCaixa = 0;
    total = 0;

    constructor(nome) {
        this.nome = nome;
        this.valorNoCaixa = 0;
        this.atendendo = false;
        this.total = 0;
    }

    atender(valor) {
        this.valorNoCaixa = valor;
        this.atendendo = true;
    }


    passarItens() {
        if (this.atendendo) {
            this.valorNoCaixa -= 50;
            this.total+=50;
            if (this.valorNoCaixa <= 0) {
                this.atendendo = false;
                this.total-=Math.abs(this.valorNoCaixa)
                this.valorNoCaixa = 0;
            }
        }
    }

    estaVazio() {
        return !this.atendendo;
    }
}

//Criamos nossas 4 Caixas
const caixas = [new Caixa("Caixa 1"),new Caixa("Caixa 2"),new Caixa("Caixa 3"),new Caixa("Caixa 4")]
console.log(caixas);


function valorAleatorio100a300() {
    return Math.floor(100+(200*(Math.random()%200)));
}

function gerarFila() {
    const fila = [];
    for (let i = 0; i<10; i++) {
        fila.push(valorAleatorio100a300());
    }
    return fila;
}

//Criamos nossa fila aleatória
let fila = gerarFila();
console.log(fila);


//Tenta atender o cliente representado pelo valor de suas compras
function atender(valor) {
    let atendido = false;
    for (let i = 0; i<caixas.length; i++) {
        if (caixas[i].estaVazio() && !atendido) {
            caixas[i].atender(valor)
            atendido = true;
            continue
        }
        caixas[i].passarItens()
    }
    console.log(caixas);
    return atendido;
}

//Função do botão atender, tentando atender o próximo da fila se possível
function proximoFila() {
    if (fila.length > 0) {
        let atendido = atender(fila[0]);
        if (atendido)
            fila = fila.slice(1);
    } else {
        for (let i = 0; i<caixas.length; i++) {
            caixas[i].passarItens();
        }
    }

    console.log(fila);
    renderizarCaixas();
    renderizarFila();
}

const caixasEl = document.querySelector(".caixas")


//Função que renderiza os caixas
function renderizarCaixas() {
    caixasEl.innerHTML = "";
    for (const caixa of caixas) {
        let el = document.createElement("div");
        let nome = document.createElement("p");
        nome.innerText = caixa.nome;
        el.appendChild(nome);
        let atendendo = document.createElement("p");
        atendendo.innerText = "Atendendo? ";
        atendendo.innerText += caixa.atendendo ? "Sim" : "Não";
        el.appendChild(atendendo);
        let atual = document.createElement("p")
        atual.innerText = "Valor atual: R$" + caixa.valorNoCaixa;
        el.appendChild(atual);
        let total = document.createElement("p")
        total.className="total"
        total.innerText = "Total: R$" + caixa.total;
        el.appendChild(total);
        caixasEl.appendChild(el);
    }
}

//Renderização inicial
renderizarCaixas();

const filaEl = document.querySelector(".fila");

//Renderiza também a fila, representado o cliente pelo valor de suas compras
function renderizarFila() {
    filaEl.innerHTML = "";
    for (let i = 0; i < fila.length; i++) {
        let el = document.createElement("p");
        el.innerText = "R$" + String(fila[i]);
        if (i != fila.length-1) {
            el.innerText += ", "
        }
        filaEl.appendChild(el);
    }
    if (fila.length == 0) {
        filaEl.innerHTML = "<p>Fila vazia</p>"
    }
}

renderizarFila();


