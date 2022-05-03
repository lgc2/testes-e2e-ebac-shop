/// <reference types="cypress" />
import e2ePage from '../support/page_objects/e2e.page';
import EnderecoPage from '../support/page_objects/endereco.page';

const perfil = require('../fixtures/perfil.json')
const dadosFaturamento = require('../fixtures/dadosFaturamento.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
        cy.login(perfil.usuario, perfil.senha)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        EnderecoPage.editarEnderecoFaturamento(
            dadosFaturamento.nome,
            dadosFaturamento.sobrenome,
            dadosFaturamento.empresa,
            dadosFaturamento.pais,
            dadosFaturamento.endereco,
            dadosFaturamento.numero,
            dadosFaturamento.cidade,
            dadosFaturamento.estado,
            dadosFaturamento.cep,
            dadosFaturamento.telefone,
            dadosFaturamento.email)

        let quantidadeDoProduto = 4
        let nomeDoProduto = 'Argus All-Weather Tank'
        let tamanho = 'L'
        let cor = 'Gray'
        let precoUnitarioDoProduto = 22

        e2ePage.fluxoCompletoDePedido(
            nomeDoProduto,
            tamanho,
            cor,
            quantidadeDoProduto,
            precoUnitarioDoProduto,
            dadosFaturamento.nome,
            dadosFaturamento.sobrenome,
            dadosFaturamento.empresa,
            dadosFaturamento.pais,
            dadosFaturamento.endereco,
            dadosFaturamento.numero,
            dadosFaturamento.cidade,
            dadosFaturamento.estado,
            dadosFaturamento.cep,
            dadosFaturamento.telefone,
            dadosFaturamento.email)

            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});