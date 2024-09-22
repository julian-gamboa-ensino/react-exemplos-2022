package domain

import (
	Dinheiro "bank/domain/Dinheiro"
	"errors"
)

type Conta struct {
	ID      string
	Titular string
	Saldo   Dinheiro.Dinheiro
}

func (c *Conta) RealizarDeposito(valor Dinheiro.Dinheiro, acessoConta chan bool) error {
	acessoConta <- true                     // Solicita acesso à conta
	defer func() { acessoConta <- false }() // Libera o acesso ao final da função

	if valor.Valor <= 0 {
		return errors.New("valor do depósito deve ser maior que zero")
	}
	c.Saldo = c.Saldo.Somar(valor)
	return nil
}

// ... (Adapte os métodos RealizarSaque e RealizarTransferencia de forma similar)

type GerenciadorConcorrencia struct {
	acessoContas map[string]chan bool
}

func NovoGerenciadorConcorrencia() *GerenciadorConcorrencia {
	return &GerenciadorConcorrencia{
		acessoContas: make(map[string]chan bool),
	}
}

func (g *GerenciadorConcorrencia) ObterAcessoConta(contaID string) chan bool {
	g.acessoContas[contaID] = make(chan bool, 1) // Cria um channel bufferizado para evitar bloqueios
	return g.acessoContas[contaID]
}

func (g *GerenciadorConcorrencia) LiberarAcessoConta(contaID string) {
	delete(g.acessoContas, contaID)
}
