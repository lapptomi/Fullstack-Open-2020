describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const testUser = {
      username: "testusername", 
      name: "testname", 
      password: "testpassword"
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.contains('login').click()

      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.contains('login').click()

      cy.contains('Wrong username or password')
    })
  })

    describe('When logged in', function() {
      beforeEach(function() {
        // log in user here
        cy.get('#username').type('testusername')
        cy.get('#password').type('testpassword')
        cy.contains('login').click()
        
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('testTitle')
        cy.get('#author').type('testAuthor')
        cy.get('#url').type('testUrl')
        cy.contains('create').click()
        cy.contains('a new blog')
        cy.contains('testTitle')
        cy.contains('testAuthor')
      })

      it('A blog can be liked', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('testTitle')
        cy.get('#author').type('testAuthor')
        cy.get('#url').type('testUrl')
        cy.contains('create').click()
        cy.contains('added')

        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })
    })
})