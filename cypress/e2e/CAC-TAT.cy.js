// O bloco 'describe' define a suite de testes e o bloco 'it' define o caso de teste.
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longLoremText = Cypress._.repeat('Lorem Ipsum has been the industry standard dummy text ever since the 1500s. ', 3)

    // ações realizadas
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('fsouza@cy.com')
    cy.get('#open-text-area').type(longLoremText, {delay: 5}) // por padrao o '.type' já leva 10ms para executar
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    // resultados esperados
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'

    // ações realizadas
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('fsouza_cy.com')
    cy.get('#open-text-area').type(shortLoremText, {delay: 5}) // por padrao o '.type' já leva 10ms para executar
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    // resultados esperados
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valores diferentes de números', () => {
    // ação
    cy.get('#phone')
      .type('qwert')
      // resultado
      .should('have.value', '') // podemos quebrar a instrução para melhor organização
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('fsouza@cy.com')
    cy.get('#open-text-area').type(shortLoremText, {delay: 5}) // por padrao o '.type' já leva 10ms para executar
    cy.get('#phone-checkbox').click()
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email, telefone e como podemos ajudar', () => {
    const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    
    cy.get('#firstName').type('Fulano').should('have.value', 'Fulano').clear().should('have.value', '')
    cy.get('#lastName').type('Souza').should('have.value', 'Souza').clear().should('have.value', '')
    cy.get('#email').type('fsouza@cy.com').should('have.value', 'fsouza@cy.com').clear().should('have.value', '')
    cy.get('#phone').type('11998887222').should('have.value', '11998887222').clear().should('have.value', '')
    cy.get('#open-text-area').type(shortLoremText, {delay: 5}).should('have.value', shortLoremText).clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando comando customizado: fillMandatoryFieldsAndSubmit', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando dados de usuario customizado utilizando comando tambem customizado: fillCustomMandatoryFieldsAndSubmit', () => {
    const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    const user = {
      firstName: 'Ciclano',
      lastName: 'Bento',
      email: 'cbento@cy.com',
      feedback: shortLoremText
    }

    cy.fillCustomMandatoryFieldsAndSubmit(user)

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando dados de usuario customizado, caso não tenha, passa valores padrao, utilizando comando tambem customizado: fillDefaultMandatoryFieldsAndSubmit', () => {
    // const shortLoremText = 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    // const user = {
    //   firstName: 'Ciclano',
    //   lastName: 'Bento',
    //   email: 'cbento@cy.com',
    //   feedback: shortLoremText
    // }

    // cy.fillDefaultMandatoryFieldsAndSubmit(user)
    cy.fillDefaultMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})
