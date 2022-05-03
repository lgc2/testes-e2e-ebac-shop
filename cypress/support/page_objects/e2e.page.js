
class e2e {


    fluxoCompletoDePedido(
        nomeDoProduto,
        tamanho,
        cor,
        quantidadeDoProduto,
        precoUnitarioDoProduto,
        nome,
        sobrenome,
        empresa,
        pais,
        endereco,
        numero,
        cidade,
        estado,
        cep,
        telefone,
        email) {

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.adicionaProdutosAoCarrinho(nomeDoProduto, tamanho, cor, quantidadeDoProduto)

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadeDoProduto)
        cy.get('.woocommerce-message').should('contain', quantidadeDoProduto + ' × “' + nomeDoProduto + '” foram adicionados no seu carrinho.')

        cy.get('.woocommerce-message > .button').click()

        cy.get('.product-name > a').should('contain', nomeDoProduto)
        cy.get('.product-price > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto + ',00')
        cy.get('.quantity > .input-text').should('have.value', quantidadeDoProduto)
        cy.get('.product-subtotal > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto * quantidadeDoProduto + ',00')
        cy.get('strong > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto * quantidadeDoProduto + ',00')
        cy.get('.checkout-button').click()

        cy.get('#billing_first_name').should('have.value', nome)
        cy.get('#billing_last_name').should('have.value', sobrenome)
        cy.get('#billing_company').should('have.value', empresa)
        cy.get('#select2-billing_country-container').should('contain.text', pais)
        cy.get('#billing_address_1').should('have.value', endereco)
        cy.get('#billing_address_2').should('have.value', numero)
        cy.get('#billing_city').should('have.value', cidade)
        cy.get('#select2-billing_state-container').should('contain.text', estado)
        cy.get('#billing_postcode').should('have.value', cep)
        cy.get('#billing_phone').should('have.value', telefone)
        cy.get('#billing_email').should('have.value', email)
        cy.get('.cart_item > .product-name').should('contain', nomeDoProduto)
        cy.get('strong > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto * quantidadeDoProduto + ',00')

        cy.get('#terms').click({force:true})
        cy.get('#place_order').click({force:true})
    }

}

export default new e2e()