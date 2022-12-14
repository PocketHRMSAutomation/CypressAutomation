describe('08_User Defined Fields', function() {
	const { softAssert, softExpect } = chai;
	
	var referanceName = 'Aaditya Kari';

	before(() => {
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "PersonalDetail" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/PersonalDetail.json", {rows})
		 })    
	  })

	beforeEach(function(){
       cy.getCookies()
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to User Defined Fields', function() {

		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 
		  cy.fixture('/Employee/Employee').then((data) => {
		  cy.navigate_EmployeeProfile(data.rows[1].EmpID)
		  cy.get('#customTab').click()
		  })	
	})
	
	it('Edit User Defined Fields', function() {
	
			cy.get('[name="REFERANCENAME"]').clear();
			cy.get('[name="REFERANCENAME"]').type(referanceName);
		
			cy.get('#customSave').click();	
			cy.get(".toast-message").invoke('text').then((text) => {
				softExpect(text.trim()).equal('Record Saved Successfully.')
				cy.log(text.trim())
			})		
	})
	

	it('Verify User Defined Fields', function() {
		
		cy.get('[name="REFERANCENAME"]').invoke('val').should('contain', referanceName) 

	})

})
