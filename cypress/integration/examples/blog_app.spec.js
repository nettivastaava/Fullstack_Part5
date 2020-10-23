describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
          name: 'Tarkastaja Mutteri',
          username: 'Tarkastaja',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 

        cy.visit('http://localhost:3000')
      })
    

    it('Login form is shown', function() {
      cy.contains('username')
      cy.contains('password')

    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('mikki')
      cy.get('#password').type('hiiri')
      cy.get('#login-button').click()

      cy.get('.failNot').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('wrong credentials')
    })

    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('Tarkastaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Tarkastaja Mutteri logged in')
    })
})