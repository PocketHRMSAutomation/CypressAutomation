describe('02_Configuration Fields', function() {



	var esiLocation=	['Pune', 'Mumbai']
	var esiDispensary=	['Pune', 'Mumbai']
	var department=	['IT', 'HR']
	var designation=	['Manager', 'HR']
	var grade=	['A', 'B']
	var costCentre=	['Pune', 'Mumbai']
	var bankName=	['Axis', 'BOI']
	var location=	['Pune', 'Mumbai']
	var branch=	['Thane', 'Panvel']

	var designation_with_specialCharacter = ['Admin & HR']
	var digit = ['10']

	function NavigateConfigurationField(Component, Data) {
		cy.server()
		//cy.route('GET', '/Payroll/Settings/getPopUpData?tableName=').as('loadPopupComponant')
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=customfields')
		//cy.get('#HR_PopUpData').click()
		//cy.wait('@loadPopupComponant').its('status').should('eq', 200) 
	}

	var FieldName = 
	function AddConfigurationField(FieldName, Data) {
	
		
	}
	
	beforeEach(function(){
        cy.getCookies()
	})
			
	it('Login to Cloud & select company', function() {
		cy.login()
		cy.changeCompany();	
	})
	
	it('Add Configuration Field', function() {

		NavigateConfigurationField()
		cy.wait(2000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').type('Referance Name')
		
		cy.get('#labelName').click({force: true})
		cy.get('#labelName').type('Referance Name')
		
		cy.get("select[name='CellType']").select('Direct',{force: true})
		
		cy.xpath("//input[@name='FieldSize']").click({force: true})
		cy.xpath("//input[@name='FieldSize']").clear().type('30')
		
		cy.xpath("//select[@name='Panel']").select('Custom',{force: true})
		
		cy.get('#Filter').click({force: true})
		
		cy.get('#sbtBtn').click({force: true})
		
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		}) 	 

	})

	it('Verify added configuration field', function() {

		cy.get('[title="Field Name"]').invoke('text').then((text) => {
		expect(text.trim()).to.contain('REFERANCENAME')
		})
	})

})