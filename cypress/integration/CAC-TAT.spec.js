/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
        
        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //definir o delay faz o teste rodar mais rápido, o que é muito importate.
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail,com')
        cy.get('#open-text-area').type('teste') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
          .type('abcdefjhij')
          .should('have.value', '')

    })

    it('telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //espaço para o código que fiz em casa -> enviar commit para o github

    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu nome', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) pelo seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) pelo seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })

    



  })


  