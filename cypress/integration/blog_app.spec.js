describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Anne',
            username: 'anskubansku',
            password: 'joku'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('login').click()
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('anskubansku')
            cy.get('#password').type('joku')
            cy.get('#login-button').click()

            cy.contains('Anne logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('anskubansku')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Anne logged in')

            cy.get('#username').clear()
            cy.get('#password').clear()

            cy.contains('login').click()
            cy.get('#username').type('wrong')
            cy.get('#password').type('joku')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Anne logged in')

        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            // log in user here
            cy.contains('login').click()
            cy.get('#username').type('anskubansku')
            cy.get('#password').type('joku')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.get('#open-blog-menu-button').click()
        
            cy.contains('create new')

            cy.get('#title').type('Porkkanat')
            cy.get('#author').type('Anne')
            cy.get('#url').type('www.porkkanat.com')

            cy.get('#create-blog-button').click()

            cy.contains('Porkkanat by Anne added')
        })

        it('A blog can be liked', function () {
            cy.get('#open-blog-menu-button').click()
        
            cy.contains('create new')

            cy.get('#title').type('Porkkanat')
            cy.get('#author').type('Anne')
            cy.get('#url').type('www.porkkanat.com')

            cy.get('#create-blog-button').click()

            cy.contains('Porkkanat by Anne added')
            cy.get('#view-blog-button').click()
        
            cy.contains('like').click()
            cy.contains('updating likes for blog called Porkkanat succeeded')          
        })
    })
})