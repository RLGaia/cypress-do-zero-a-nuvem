// cypress/e2e/CAC-TAT.cy.js
describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
  cy.visit('./src/index.html')
})

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
    const longText = Cypress._.repeat('lorem test ', 20)
    
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
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
    cy.get('#phone-checkbox').check()
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

  // Lição 02 - Exercício Extra 07.1 - Comandos customizados sem argumentos
  it('enviar o formulário com sucesso usando um comando customizado', () => { 
    cy.fillMandatoryFieldsAndSubmit()
  
    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 07.2 - Comandos customizados com argumentos
  it('enviar o formulário com sucesso usando um comando customizado com argumentos', () => {
    cy.fillMandatoryFieldsAndSubmitWithArguments('João', 'Silva', 'joao.silva@email.com', 'Olá, gostaria de mais informações sobre o produto.')
  
    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 07.3 - Comandos customizados com objeto como argumento
  it('enviar o formulário com sucesso usando um comando customizado com objeto como argumento', () => {
    const userData = {
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@email.com',
      message: 'Olá, gostaria de mais informações sobre o produto.'
    }
    cy.fillMandatoryFieldsAndSubmitWithObjectAsArgument(userData)

    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 07.4 - Comandos customizados com objeto como argumento e dados padrão
  it('enviar o formulário com sucesso usando um comando customizado com objeto como argumento e dados padrão', () => {
    cy.fillMandatoryFieldsAndSubmitWithObjectAsArgumentAndDataDefault()

    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 07.5 - Comandos customizados com objeto como argumento e dados padrão, passando novos dados ao chamar o comando
  it('enviar o formulário com sucesso usando um comando customizado com objeto como argumento e dados padrão, passando novos dados ao chamar o comando', () => {
    const userData = {
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@email.com',
      message: 'Olá, gostaria de mais informações sobre o produto.'
    }
    cy.fillMandatoryFieldsAndSubmitWithObjectAsArgumentAndDataDefault(userData)

    cy.get('.success').should('be.visible')
  })

  // Lição 02 - Exercício Extra 08 - Utilizando cy.contains()
  it('preencher o formulário com sucesso usando cy.contains()', () => {
    cy.fillMandatoryFields()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  // Lição 03 - Exercício - Selecionar um produto (YouTube) por seu texto
  it('selecionar um produto (YouTube) por seu texto', () => { 
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })

  // Lição 03 - Exercício Extra 01 - Selecionar um produto (Mentoria) por seu valor (value)
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  })

  // Lição 03 - Exercício Extra 02 - Selecionar um produto (Blog) por seu índice
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  })

  // Lição 04 - Exercício - Marcar o tipo de atendimento "Feedback"
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })

  // Lição 04 - Exercício Extra 01 - Marcar cada tipo de atendimento
  it('marca cada tipo de atendimento', () => {
    const tiposDeAtendimento = ['ajuda', 'elogio', 'feedback']
    // cy.get('[type="radio"]').check(tiposDeAtendimento).should('be.checked') //provável falso positivo
    
    cy.get('[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('[type="radio"][value="feedback"]').check().should('be.checked')
  })

  // Lição 04 - Exercício Extra 01.1 - Marcar cada tipo de atendimento usando .wrap() e .each()
  it('marca cada tipo de atendimento usando .wrap() e .each()', () => {
    cy.get('[type="radio"]').each(radio => {
      cy.wrap(radio).check().should('be.checked')
    })
  })

  // Lição 05 - Exercício - Marcar ambos checkboxes e depois desmarcar o último
  it('marcar ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Lição 06 - Exercício - Selecionar um arquivo da pasta fixtures
  it.only('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then($upload => {
        const files = $upload[0].files;
        expect(files).to.have.length(1);
        expect(files[0].name).to.equal('example.json')
      })
  })

})
