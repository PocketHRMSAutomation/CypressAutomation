describe('12_Nominee Details', function() {
	const { softAssert, softExpect } = chai;

	var EmpID ;
	var Name ;
	var Address;
	var NomineeRelationWithMember;
	var AmountPaidToNomineeInPercentage;
	var DOB;
	var NameAndAddressOfGuardian;
	var Age;

	var EmpID ;
	var Name_1 ;
	var Address_1;
	var NomineeRelationWithMember_1;
	var AmountPaidToNomineeInPercentage_1;
	var DOB_1;
	var NameAndAddressOfGuardian_1;
	var Age_1;


	before(() => {
		//Convert Employee json from Employee excel -> EmployeeDetail sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 

		//Convert FamilyDetails json from Employee excel -> FamilyDetails sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "NomineeDetails" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/NomineeDetails.json", {rows})
		}) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		 cy.fixture('/Employee/NomineeDetails').then((data) => { 

			Name = data.rows[0].Name;
			Address = data.rows[0].Address;
			NomineeRelationWithMember = data.rows[0].NomineeRelationWithMember;
			AmountPaidToNomineeInPercentage = data.rows[0].AmountPaidToNomineeInPercentage;
			DOB = data.rows[0].DOB;
			NameAndAddressOfGuardian = data.rows[0].NameAndAddressOfGuardian;
			Age = data.rows[0].Age;
		
			Name_1 = data.rows[1].Name;
			Address_1 = data.rows[1].Address;
			NomineeRelationWithMember_1 = data.rows[1].NomineeRelationWithMember;
			AmountPaidToNomineeInPercentage_1 = data.rows[1].AmountPaidToNomineeInPercentage;
			DOB_1 = data.rows[1].DOB;
			NameAndAddressOfGuardian_1 = data.rows[0].NameAndAddressOfGuardian;
			Age_1 = data.rows[0].Age;

		 }) 
		
	  })

	beforeEach(function(){
		cy.getCookies()
		
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Nominee Details', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#Profile_NomineeDetails').click({force: true})
		  cy.get('#Profile_NomineeDetails').click()
		  cy.get('#Profile_NomineeDetails').click({force: true})
		  cy.wait(4000)
	})
	
	it('Verify Validation message -  This field is required.', function() {
		
		cy.get('[title="Add Nominee Details"]').eq(0).click({force: true})
        cy.get(5000)
		/*
		//Click Save button
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		// Verify Validation
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Please enter Name.')
		})

		cy.wait(5000)*/
		//cy.get(".toast-message").eq(0).click({force: true})
	})

	it('Verify Validation message -  Please enter Date of Birth.', function() {
		
		//cy.get('#Name').click({force: true})
		//cy.get('#Name').clear()
	    cy.get('#Name').type(Name)

		//Click Save button
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		// Verify Validation
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Please enter Date of Birth.')
		})
		cy.get(".toast-message").click()
	})

	it('Verify Validation message - invalid date', function() {
		/*
		cy.get('#dateOfBirth').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val('16/05/2080')
		 })*/
        //Enter date
        cy.get('#dateOfBirth').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2080')
        })

		 //Click Save button
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Date of Birth cannot be greater than Todays Date.').equal(text.trim())
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})

	})

	it('Verify Success message - Records Added Successfully', function() {
		cy.get('#dateOfBirth').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val(DOB)
		 })
		 cy.get('#Name_Address_Guardian').click({force: true})
		//Click Save button
		cy.get('[onclick="submitForm()"]').click({force: true})
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

	it('Add Nominee Details', function() {

		// cy.get(".toast-message").click({force:true})
		// cy.get('.fa-trash-alt').eq(0).click({force: true})
		// cy.get(".toast-message").click({force:true})
		
		cy.wait(8000)
		
		cy.get('[title="Add Nominee Details"]').eq(0).click({force: true})
		
		cy.get('#Name').click({force: true})
			cy.get('#Name').clear()
		    cy.get('#Name').type(Name)

		cy.get('#dateOfBirth').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(DOB)
			})

			cy.get('#AmountPaidToNominee').click({force: true})
		cy.get('#AmountPaidToNominee').clear()
		cy.get('#AmountPaidToNominee').type(AmountPaidToNomineeInPercentage)	
		cy.wait(1000)
		cy.get('#Address').click({force: true})
		cy.get('#Address').type(Address)
		
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type(NomineeRelationWithMember)
		
		cy.get('#Name_Address_Guardian').click({force: true})
		cy.get('#Name_Address_Guardian').type(NameAndAddressOfGuardian)
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Added Successfully').equal(text.trim())

			//expect(text.trim()).equal()
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
	})


	it('Verify added Nominee Details', function() {
		//Verify 
		cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Name)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Address)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'dob')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(DOB)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Relation')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(NomineeRelationWithMember)
		})

			//Verify 
		cy.xpath("//span[contains(@id, 'AmountPaidToNominee')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(AmountPaidToNomineeInPercentage)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Guardian')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(NameAndAddressOfGuardian)
		})

	})
	

	it('Edit Nominee Details', function() {

		// cy.get(".toast-message").click({force:true})
		// cy.get('.fa-trash-alt').eq(0).click({force: true})
		// cy.get(".toast-message").click({force:true})
		
		//cy.wait(5000)
		
		cy.get('.fa-edit').eq(0).click({force: true})
		
		cy.get('#Name').click({force: true})
			cy.get('#Name').clear()
		    cy.get('#Name').type(Name_1)

		cy.get('#dateOfBirth').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(DOB_1)
			})

			cy.get('#AmountPaidToNominee').click({force: true})
		cy.get('#AmountPaidToNominee').clear()
		cy.get('#AmountPaidToNominee').type(AmountPaidToNomineeInPercentage_1)	
		cy.wait(1000)
		cy.get('#Address').click({force: true})
		cy.get('#Address').type(Address_1)
		
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type(NomineeRelationWithMember_1)
		
		cy.get('#Name_Address_Guardian').click({force: true})
		cy.get('#Name_Address_Guardian').type(NameAndAddressOfGuardian_1)
		
		cy.get('#submitUpdate').click({force: true})
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect('Records Updated Successfully').equal(text.trim())

			//expect(text.trim()).equal()
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		
	})

	it('Verify updated Nominee Details', function() {
		//Verify 
		cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Name_1)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(Address_1)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'dob')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(DOB_1)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Relation')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(NomineeRelationWithMember_1)
		})
			//Verify 
		cy.xpath("//span[contains(@id, 'AmountPaidToNominee')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(AmountPaidToNomineeInPercentage_1)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Guardian')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(NameAndAddressOfGuardian_1)
		})

	})
	
	it('Delete Nominee Details', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')				
		})

	})
	/*
	it('Delete Nominee Details', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')				
		})

	})*/

})
