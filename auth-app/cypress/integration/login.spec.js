describe('The register process', () => {
    it('should register a user and redirect to the login page', () => {
        cy.server();
        
        cy.fixture('user').as('user')

        cy.route('POST', '/api/v1/auth/register', '@user');
        
        cy.visit('/auth/register');

        cy.get('input[type="text"]')
        .type('doctor')
        .should('have.value', 'doctor');

        cy.get('input[type="email"]')
        .type('doctor@strange.com')
        .should('have.value', 'doctor@strange.com');
        
        cy.get('input[type="password"]')
        .type('password')
        .should('have.value', 'password');
        
        cy.get('button').click();
        
        cy.visit('/auth/login');
    });
});

describe('The login process', () => {
    it('should login a user, flash  message, and redirect to the home page', () => {
        cy.server();

        cy.fixture('user').as('user');

        cy.route('POST', '/api/v1/auth/login', '@user');

        cy.visit('/auth/login');

        cy.get('input[type="email"]')
        .type('doctor@strange.com')
        .should('have.value', 'doctor@strange.com');

        cy.get('input[type="password"]')
        .type('password')
        .should('have.value', 'password');

        // cy.get('input[type="email"]').type('doctor@strange.com');
        // cy.get('input[type="password"]').type('password');

        
        cy.get('button').click();
        
        cy.getCookie('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzE4NGIyNWQ3ZTk4MWJhNGYxYjJlMiIsImlhdCI6MTU5ODgzMTczMCwiZXhwIjoxNTk5MjYzNzMwfQ.xNytpRzZEfpsGeTvUpGQo8MSLRrro2VCjMe7M1sD1pc')
        
        cy.get('#confirm-email').should('contain', 'Please confirm your email address.');
        cy.get('#auth-username').should('contain', 'Hey, doctor');
        cy.get('#auth-logout').should('contain', 'Logout');
    });
});

describe('The logout process', () => {
    it('should log the logged in user out', () => {
        cy.get('#auth-logout').click();
        cy.url().should('contain', '/');
    });
});