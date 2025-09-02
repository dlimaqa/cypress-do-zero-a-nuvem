// Bloco de comandos (similar a funções): Realiza o preenchimento do formulario e envia
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'

    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('fsouza@cy.com')
    cy.get('#open-text-area').type(shortLoremText, {delay: 5}) // por padrao o '.type' já leva 10ms para executar

    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})

// Bloco de comandos (similar a funções): Realiza o preenchimento do formulario passando dados de usuarios constomizados e envia
Cypress.Commands.add('fillCustomMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName').type(user.firstName)
    cy.get('#lastName').type(user.lastName)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.feedback, {delay: 5})

    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})

// Realiza o preenchimento do formulario passando dados de usuarios constomizados e caso não passe, envia valores default, e envia o formulario
Cypress.Commands.add('fillDefaultMandatoryFieldsAndSubmit', (user = {
    firstName: 'Padrão',
    lastName: 'Default',
    email: 'default@cy.com',
    feedback: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
}) => {
    cy.get('#firstName').type(user.firstName)
    cy.get('#lastName').type(user.lastName)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.feedback)

    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})