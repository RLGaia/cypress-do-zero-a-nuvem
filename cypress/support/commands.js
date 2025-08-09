// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Comando que não recebe nenhum argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João')
  cy.get('#lastName').type('Silva')
  cy.get('#email').type('joao.silva@email.com')
  cy.get('#open-text-area').type('Olá, gostaria de mais informações sobre o produto.')
  cy.get('button[type="submit"]').click()
})

// Comando que recebe argumentos
Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithArguments', (firstName, lastName, email, message) => {
  cy.get('#firstName').type(firstName)
  cy.get('#lastName').type(lastName)
  cy.get('#email').type(email)
  cy.get('#open-text-area').type(message)
  cy.get('button[type="submit"]').click()
})

// Comando que recebe objeto como argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithObjectAsArgument', (userData) => {
  cy.get('#firstName').type(userData.firstName)
  cy.get('#lastName').type(userData.lastName)
  cy.get('#email').type(userData.email)
  cy.get('#open-text-area').type(userData.message)
  cy.get('button[type="submit"]').click()
})
