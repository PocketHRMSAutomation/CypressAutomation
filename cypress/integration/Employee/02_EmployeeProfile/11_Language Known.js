describe('11_Language Known', function() {
	const { softAssert, softExpect } = chai;

	var EmpID ;
	var Name ;
	var Address;
	var Relation;
	var ContactNumber;

	var Name_1;
	var Address_1;
	var Relation_1;
	var ContactNumber_1;
	

	before(() => {
		//Convert Employee json from Employee excel -> EmployeeDetail sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 

		//Convert FamilyDetails json from Employee excel -> FamilyDetails sheet
		// cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "Language" }).then((rows) => {
		//    var rowsLength = rows.length;
		//    cy.writeFile("cypress/fixtures/Employee/Language.json", {rows})
		// }) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		//  cy.fixture('/Employee/Language').then((data) => { 

		// 	Name = data.rows[0].Name;
		// 	Address = data.rows[0].Address;
		// 	Relation = data.rows[0].Relation;
		// 	ContactNumber = data.rows[0].ContactNumber;
		
		// 	Name_1 = data.rows[1].Name;
		// 	Address_1 = data.rows[1].Address;
		// 	Relation_1 = data.rows[1].Relation;
		// 	ContactNumber_1 = data.rows[1].ContactNumber;

		//  }) 
		
	  })

	beforeEach(function(){
		cy.getCookies()
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Language Details', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#Profile_LanguageKnown').click({force: true})
		  cy.get('#Profile_LanguageKnown').click()
		  cy.get('#Profile_LanguageKnown').click({force: true})
		  cy.wait(1000)
	})
	
	it('Verify Validation message -  This field is required.', function() {
		
		cy.get('[title="Add Language Known"]').eq(0).click({force: true})
		//Click Save button
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		// Verify Validation
		cy.get("#Language-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
		})
	})

	it('Verify Success message - Records Added Successfully', function() {
		cy.get('#Language').click({force: true})
		cy.get('#Language').clear()
		cy.get('#Language').type('odia')
		//Click Save button
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Added Successfully').equal(text.trim())
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		//Delete Record
		cy.get('.fa-trash-alt').eq(0).click({force: true})
	})


	it('Add Language Details', function() {

		//cy.get(".toast-message").click({force:true})
		//cy.get('.fa-trash-alt').eq(0).click({force: true})
		//cy.get(".toast-message").click({force:true})
		
		cy.wait(8000)
		
		cy.get('[title="Add Language Known"]').eq(0).click({force: true})

		cy.get('#Language').click({force: true})
			cy.get('#Language').clear()
			cy.get('#Language').type('odia')
		
		cy.get('#IsRead').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#IsWrite').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#IsSpeak').not('[disabled]').check({force: true}).should('be.checked')

		cy.get('[onclick="return validate()"]').click({force: true})
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Added Successfully').equal(text.trim())

			//expect(text.trim()).equal()
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
	})


	it('Verify added Language Details', function() {
		//Verify 
		cy.xpath("//h5[contains(@id, 'Language')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('odia')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'IsRead')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Can')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'IsWrite')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Can')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'IsSpeak')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Can')
		})

	})

	
	it('Edit Language Details', function() {

		//Click on Edit button
		//cy.get('.fa-edit').eq(0).click({force: true})
		cy.get('.mr-2 > .fas').click({force: true})
		cy.wait(1000)
	
		cy.get('#Language').click({force: true})
			cy.get('#Language').clear()
			cy.get('#Language').type('English')	

		cy.get('#IsRead').not('[disabled]').uncheck()
		cy.get('#IsWrite').not('[disabled]').uncheck()
		cy.get('#IsSpeak').not('[disabled]').uncheck()

		//Click Save button
		cy.get('#langUpdateBtn').click({force: true})

		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Updated Successfully')
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		
		
	})

	it('Verify updated Language Details', function() {
				//Verify 
				cy.xpath("//h5[contains(@id, 'Language')]").invoke('text').then((text) => {
					expect(text.trim()).to.contain('English')
				})
				//Verify 
				cy.xpath("//span[contains(@id, 'IsRead')]").invoke('text').then((text) => {
					expect(text.trim()).to.contain('Cannot')
				})
				//Verify 
				cy.xpath("//span[contains(@id, 'IsWrite')]").invoke('text').then((text) => {
					expect(text.trim()).to.contain('Cannot')
				})
				//Verify 
				cy.xpath("//span[contains(@id, 'IsSpeak')]").invoke('text').then((text) => {
					expect(text.trim()).to.contain('Cannot')
				})


	})
	
	it('Delete Language Details', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')				
		})

	})
	

})
