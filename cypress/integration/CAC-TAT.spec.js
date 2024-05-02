/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
        
        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //definir o delay faz o teste rodar mais rápido, o que é muito importate.
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail,com')
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        
    })

  })
  