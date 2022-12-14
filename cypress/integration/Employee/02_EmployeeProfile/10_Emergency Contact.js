describe('10_Emergency Contact', function() {
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
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmergencyContact" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/EmergencyContact.json", {rows})
		}) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		 cy.fixture('/Employee/EmergencyContact').then((data) => { 

			Name = data.rows[0].Name;
			Address = data.rows[0].Address;
			Relation = data.rows[0].Relation;
			ContactNumber = data.rows[0].ContactNumber;
		
			Name_1 = data.rows[1].Name;
			Address_1 = data.rows[1].Address;
			Relation_1 = data.rows[1].Relation;
			ContactNumber_1 = data.rows[1].ContactNumber;

		 }) 
		
	  })

	beforeEach(function(){
		cy.getCookies()
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Emergency Contact', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#Profile_EmergencyContact').click({force: true})
		  cy.get('#Profile_EmergencyContact').click()
		  cy.wait(1000)
	})
	
	it('Verify Validation message -  This field is required.', function() {
		
		// Click on Add Emergency Contacts button
		cy.get('[title="Add Emergency Contacts"]').eq(0).click({force: true})
		//Click Save button
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(1000)
		// Verify Validation
		cy.get("#Name-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
		})
	})

	it('Verify Validation message - Contact Number', function() {

		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type(Name)
		//Click Save button
		//cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.get('#submitbutton').click()

		cy.wait(2000)
		// Verify Validation
		cy.get("#ContactNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('Contact Number')
		})
	})

	it('Verify Validation message for invalid - Contact Number', function() {
		//
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type('%$&*765')
		//Click Save button
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(2000)
		// Verify Validation
		cy.get("#ContactNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('Entered phone format is not valid.')
		})

	})

	it('Verify Validation message for invalid Contact Number - less than 10 digit', function() {
		//
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type('123456789')
		//Click Save button
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(2000)
		// Verify Validation
		cy.get("#ContactNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('Entered phone format is not valid.')
		})


	})

	it('Verify Success message - Records Added Successfully', function() {
		//
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type('7788548413')
		//Click Save button
		cy.get('#submitbutton').click({force: true})
		cy.wait(2000)
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Added Successfully').equal(text.trim())
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		//Delete Record
		//cy.get('.fa-trash-alt').eq(0).click({force: true})
	})


	it('Add Emergency Contact', function() {

		cy.get(".toast-message").click({force:true})
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.get(".toast-message").click({force:true})
		
		cy.wait(5000)
		//Click on Add button
		cy.get('[title="Add Emergency Contacts"]').eq(0).click({force: true})
		cy.wait(3000)

		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type(Name)

		cy.get('#ContactNumber').click({force: true})
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type(ContactNumber)

		cy.get('#Address').click({force: true})
		cy.get('#Address').type(Address)
			
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type(Relation)

		cy.get('#submitbutton').click({force: true})
		cy.wait(2000)
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Added Successfully').equal(text.trim())

			//expect(text.trim()).equal()
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
	})


	it('Verify added Emergency Contact', function() {
		//Verify Name
		cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Name)
		})
		//Verify Address
		cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Address)
		})
		//Verify Relation
		cy.xpath("//span[contains(@id, 'Relation')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Relation)
		})
		//Verify ContactNumber
		cy.xpath("//span[contains(@id, 'ContactNumber')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(ContactNumber)
		})

	})

	
	it('Edit Emergency Contact', function() {

		//Click on Edit button
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
	
		//Enter Name
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type(Name_1)		
		//Enter Address
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type(Address_1)	

			//Select Relation
			cy.get('#Relation').click({force: true})
			cy.get('#Relation').type(Relation_1)

		cy.get('#Relation').click({force: true})
		cy.get('#ContactNumber').click({force: true})
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type(ContactNumber_1)

		//Click Save button
		cy.get('#Updatebutton').click({force: true})
		cy.wait(2000)

		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Updated Successfully')
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		
		
	})

	it('Verify updated Emergency Contact', function() {
		//Verify Name
		cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Name_1)
		})
		//Verify Address
		cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Address_1)
		})
		//Verify Relation
		cy.xpath("//span[contains(@id, 'Relation')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Relation_1)
		})

			//Verify ContactNumber
			cy.xpath("//span[contains(@id, 'ContactNumber')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(ContactNumber_1)
		})


	})
	
	it('Delete Emergency Contact', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')				
		})

	})
	

})
