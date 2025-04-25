"use strict"

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