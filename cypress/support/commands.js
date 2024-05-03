Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Lorraine')
    cy.get('#lastName').type('Lacerda')
    cy.get('#email').type('lorrainelacerda@gmail.com')
    cy.get('#open-text-area').type('teste') //definir o delay faz o teste rodar mais rápido, o que é muito importate.
    cy.contains('button', 'Enviar').click() //quando houver um texto único na página, podemos usar o segundo argumento para identificá-lo
})

//posso criar quantos arquivos de cammands eu quiser dentro da pasta suporte. 
//caso o arquivo comece a ficar muito grande e eu queira separar melhor. 