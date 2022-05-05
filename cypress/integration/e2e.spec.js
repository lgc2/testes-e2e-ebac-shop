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

    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        
        let quantidadeDoProduto1 = 4
        let nomeDoProduto1 = 'Argus All-Weather Tank'
        let tamanhoDoProduto1 = 'L'
        let corDoProduto1 = 'Gray'
        let precoUnitarioDoProduto1 = 22

        let quantidadeDoProduto2 = 1
        let nomeDoProduto2 = 'Aether Gym Pant'
        let tamanhoDoProduto2 = '34'
        let corDoProduto2 = 'Brown'
        let precoUnitarioDoProduto2 = 74

        let montanteTotal = (precoUnitarioDoProduto1 * quantidadeDoProduto1) + (precoUnitarioDoProduto2 * quantidadeDoProduto2)

        let metodoPagamento = 'Transferência bancária'

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

        cy.adicionaProdutosAoCarrinho(nomeDoProduto1, tamanhoDoProduto1, corDoProduto1, quantidadeDoProduto1)

        cy.get('.woocommerce-message').should('contain', quantidadeDoProduto1 + ' × “' + nomeDoProduto1 + '” foram adicionados no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.adicionaProdutosAoCarrinho(nomeDoProduto2, tamanhoDoProduto2, corDoProduto2, quantidadeDoProduto2)

        cy.get('.woocommerce-message').should('contain', '“' + nomeDoProduto2 + '” foi adicionado no seu carrinho.')

        e2ePage.fluxoCompletoDePedido(
            nomeDoProduto1,
            quantidadeDoProduto1,
            precoUnitarioDoProduto1,
            nomeDoProduto2,
            quantidadeDoProduto2,
            precoUnitarioDoProduto2,
            montanteTotal,
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
        cy.get(':nth-child(1) > .woocommerce-table__product-name > a').should('contain', nomeDoProduto1)
        cy.get(':nth-child(2) > .woocommerce-table__product-name > a').should('contain', nomeDoProduto2)
        cy.get(':nth-child(1) > .woocommerce-table__product-total > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto1 * quantidadeDoProduto1 + ',00')
        cy.get(':nth-child(2) > .woocommerce-table__product-total > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto2 * quantidadeDoProduto2 + ',00')
        cy.get(':nth-child(3) > td > .woocommerce-Price-amount').should('contain', 'R$' + montanteTotal + ',00')
        cy.get('tfoot > :nth-child(2) > td').should('contain', metodoPagamento)
    });
});

