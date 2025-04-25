"use strict"

class Caixa {
    nome="";
    atendendo=false;
    valorNoCaixa = 0;

    Caixa(nome) {
        this.nome = nome;
    }

    atender(valor) {
        this.valorNoCaixa = valor;
        this.atendendo = true;
    }

    passarItens() {
        if (this.atendendo) {
            this.valorNoCaixa -= 50;
            if (this.valorNoCaixa <= 0) {
                this.atendendo = false;
                this.valorNoCaixa = 0;
            }
        }
    }

    estaVazio() {
        return !this.atendendo;
    }
}

const caixas = [new Caixa("Caixa 1"),new Caixa("Caixa 2"),new Caixa("Caixa 3"),new Caixa("Caixa 4")]

function valorAleatorio100a300() {
    return 100+(200*(Math.random()%200));
}

function gerarFila() {
    const fila = [];
    for (let i = 0; i<10; i++) {
        fila.push(valorAleatorio100a300);
    }
    return fila;
}

function atender(valor) {
    for (let i = 0; i<caixas.length; i++) {
        if (caixas[i].estaVazio()) {
            caixas[i].atender(valor)
            continue
        }
        caixas[i].passarItens()
    }
}

