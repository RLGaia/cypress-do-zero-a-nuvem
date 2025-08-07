beforeEach(() => {
  cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', () => {
  
  // Lição 01 - Exercício
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Lição 02 - Exercício
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#open-text-area').type('Olá, gostaria de mais informações sobre o produto.')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 01 - Testando o comando .type() com delay
  it('testando o .type() com delay 0', () => {
    cy.get('#open-text-area').type('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', { delay: 0 })
  })

  // Lição 02 - Exercício Extra 02 - Email com formatação inválida
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@invalid-email')
    cy.get('#open-text-area').type('Olá, gostaria de mais informações sobre o produto.')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // Lição 02 - Exercício Extra 03 - Campo telefone com valor não numérico
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcdefg').should('have.value', '')
  })

  // Lição 02 - Exercício Extra 04 - Campo telefone obrigatório mas não preenchido
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@email.com')
    cy.get('#phone-checkbox').check() // .click() também funciona
    cy.get('#open-text-area').type('Olá, gostaria de mais informações sobre o produto.')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // Lição 02 - Exercício Extra 05 - Testar o comando .clear()
  it('testando o comando .clear()', () => {
    cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '')
    cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
    cy.get('#email').type('joao.silva@email.com').should('have.value', 'joao.silva@email.com').clear().should('have.value', '')
    cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
  })

  // Lição 02 - Exercício Extra 06 - Validando mensagem de erro ao enviar formulário sem preencher os campos obrigatórios
  it('exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // Lição 02 - Exercício Extra 07 - Comandos customizados
  it('enviar o formulário com sucesso usando um comando customizado', () => { 
  
  })

})
