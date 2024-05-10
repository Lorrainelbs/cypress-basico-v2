/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SCOENDS_IN_MS = 3000

    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'

        cy.clock()

        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //definir o delay faz o teste rodar mais rápido, o que é muito importate.
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SCOENDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()

        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail,com')
        cy.get('#open-text-area').type('teste') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
        cy.tick(THREE_SCOENDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })
    Cypress._.times(3, function(){
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
          .type('abcdefjhij')
          .should('have.value', '')
     })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function(){
        cy.clock()

        cy.get('#firstName').type('Lorraine')
        cy.get('#lastName').type('Lacerda')
        cy.get('#email').type('lorrainelacerda@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
        cy.tick(THREE_SCOENDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Lorraine')
          .should('have.value','Lorraine')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Lacerda')
          .should('have.value','Lacerda')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('lorrainelacerda@gmail.com')
          .should('have.value','lorrainelacerda@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('1234567890')
          .should('have.value','1234567890')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

                cy.tick(THREE_SCOENDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SCOENDS_IN_MS)

        cy.get('.success').should('not.be.visible')
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

    //radio button usa o comando .check ou .click

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){ //o $ indica uma JQuery
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked') //para cada iteração ele pega um elemento
        })

    })
    // .uncheck() 
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value') //para garantir que nao tem nenhum arquivo selecionado
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value') 
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    }) //simulo que estou arrastando um arquivo que está na pasta do meu pc até a plataforma

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile') //criação do alias
        cy.get('input[type="file"]')
          .selectFile('@sampleFile') //para usar o alias, passo o @
      
    }) 

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
          .should('have.attr', 'target', '_blank') 
      
    }) 

    it('acessa a página de política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
      
          cy.contains('Talking About Testing').should('be.visible')
    }) 

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a área de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20) //cria um texto longo de 200 caracteres
        
        cy.get('#open-text-area')
          .invoke('val', longText)
          .should('have.value', longText)

      })

      it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response) {
            const{status, statusText, body} = response 
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
          })
      })

      it.only('encontra o gato escondido', function() {
        cy.get('#cat')
          .invoke('show')
          .should('be.visible')
        cy.get('#title')
          .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
          .invoke('text', 'Eu 💛 gatos!')
      })
})


  


  