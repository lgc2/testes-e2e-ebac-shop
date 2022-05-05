
class e2e {


    fluxoCompletoDePedido(
        nomeDoProduto1,
        quantidadeDoProduto1,
        precoUnitarioDoProduto1,
        nomeDoProduto2,
        quantidadeDoProduto2,
        precoUnitarioDoProduto2,
        montanteTotal,
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

        cy.get('.woocommerce-message > .button').click()

        cy.get(':nth-child(1) > .product-name > a').should('contain', nomeDoProduto1)
        cy.get(':nth-child(1) > .product-price > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto1 + ',00')
        cy.get(':nth-child(1) > .product-quantity > .quantity > .input-text').should('have.value', quantidadeDoProduto1)
        cy.get(':nth-child(1) > .product-subtotal > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto1 * quantidadeDoProduto1 + ',00')

        cy.get(':nth-child(2) > .product-name > a').should('contain', nomeDoProduto2)
        cy.get(':nth-child(2) > .product-price > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto2 + ',00')
        cy.get(':nth-child(2) > .product-quantity > .quantity > .input-text').should('have.value', quantidadeDoProduto2)
        cy.get(':nth-child(2) > .product-subtotal > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto2 * quantidadeDoProduto2 + ',00')

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidadeDoProduto1 + quantidadeDoProduto2)

        cy.get('strong > .woocommerce-Price-amount > bdi').should('contain', 'R$' + montanteTotal + ',00')
        
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

        cy.get('tbody > :nth-child(1) > .product-name').should('contain', nomeDoProduto1)
        cy.get('tbody > :nth-child(2) > .product-name').should('contain', nomeDoProduto2)
        cy.get(':nth-child(1) > .product-total > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto1 * quantidadeDoProduto1 + ',00')
        cy.get(':nth-child(2) > .product-total > .woocommerce-Price-amount > bdi').should('contain', 'R$' + precoUnitarioDoProduto2 * quantidadeDoProduto2 + ',00')
        cy.get('strong > .woocommerce-Price-amount > bdi').should('contain', 'R$' + montanteTotal + ',00')

        cy.get('#terms').click({force:true})
        cy.get('#place_order').click({force:true})
    }

}

export default new e2e()