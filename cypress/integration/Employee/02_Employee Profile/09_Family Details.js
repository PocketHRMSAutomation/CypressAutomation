describe('09_Family Details', function() {
	const { softAssert, softExpect } = chai;

	var EmpID ;
	var Name ;
	var Address;
	var Relation;
	var DateOfBirth;
	var Age;
	var AadhaarOrIdentificationNo;

	var Name_1;
	var Address_1;
	var Relation_1;
	var DateOfBirth_1;
	var Age_1;
	var AadhaarOrIdentificationNo_1;

	before(() => {
		//Convert Employee json from Employee excel -> EmployeeDetail sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 

		//Convert FamilyDetails json from Employee excel -> FamilyDetails sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "FamilyDetails" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/FamilyDetails.json", {rows})
		}) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		 cy.fixture('/Employee/FamilyDetails').then((data) => { 

			Name = data.rows[0].Name;
			Address = data.rows[0].Address;
			Relation = data.rows[0].Relation;
			DateOfBirth = data.rows[0].DateOfBirth;
			Age = data.rows[0].Age;
			AadhaarOrIdentificationNo = data.rows[0].AadhaarOrIdentificationNo;
		
			Name_1 = data.rows[1].Name;
			Address_1 = data.rows[1].Address;
			Relation_1 = data.rows[1].Relation;
			DateOfBirth_1 = data.rows[1].DateOfBirth;
			Age_1 = data.rows[1].Age;
			AadhaarOrIdentificationNo_1 = data.rows[1].AadhaarOrIdentificationNo;

		 }) 

	  })

	beforeEach(function(){
		cy.getCookies()
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Family Details', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#Profile_FamilyDetails').click({force:true})
		  cy.get('#Profile_FamilyDetails').click()
		  cy.get('#Profile_FamilyDetails').click({force:true})
		  cy.wait(1000)
	})
	
	it('Verify Validation message -  Select Relation', function() {
	
		cy.get('[title="Add Family Details"]').eq(0).click({force: true})	
		cy.get('[onclick="CheckValid();"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Select Relation')				
		})
		cy.get(".toast-message").click({force:true})
		cy.wait(1000)
	})
	
	it('Verify Validation message -  This field is required.', function() {
		
		//Select Relation
		cy.get('#Relation').select(Relation)
		cy.wait(2000)
		//Click Save button
		cy.get('[onclick="CheckValid();"]').click({force: true})
		cy.wait(1000)
		// Verify Validation
		cy.get("#Name-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
		})
	})

	it('Verify Success message - Records Added Successfully', function() {
		//Enter Name
		cy.get('#Name').click({force: true})
		cy.get('#Name').type(Name)
		//Click Save button
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Added Successfully')
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		//Delete Record
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(8000)
	})

	it('Add Family Details', function() {

		//Click on Add button
		cy.get('[title="Add Family Details"]').eq(0).click({force: true})	
		cy.wait(1000)
		//Select Relation
		cy.get('#Relation').select(Relation)
		//Enter Name
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type(Name)		
		//Enter Address
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type(Address)	
		//Select Date of Birth
		cy.get('#dateOfBirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(DateOfBirth)
	   })

		// cy.get('#age').then(input => {
		// 	input.val('19');
	   	// })

		//Enter Address
		cy.get('#aadhaarcard').click({force: true})
		cy.get('#aadhaarcard').type(AadhaarOrIdentificationNo)	
		//Click Save button
		cy.get('#btnSave').click({force: true})
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Added Successfully')
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
	})

	it('Verify added Family Details', function() {
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
		//Verify DateOfBirth
		cy.xpath("//p[contains(@title, 'Date of Birth')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(DateOfBirth)
		})
		//Verify AadhaarOrIdentificationNo
		cy.xpath("//span[contains(@id, 'Aadhaar')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(AadhaarOrIdentificationNo)
		})

	})
	
	it('Edit Family Details', function() {

		//Click on Edit button
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		//Select Relation
		cy.get('#Relation').select(Relation_1)
		//Enter Name
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type(Name_1)		
		//Enter Address
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type(Address_1)	
		//Select Date of Birth
		cy.get('#dateOfBirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(DateOfBirth_1)
	   })

		// cy.get('#age').then(input => {
		// 	input.val('19');
	   	// })

		//Enter Address
		cy.get('#aadhaarcard').click({force: true})
		cy.get('#aadhaarcard').type(AadhaarOrIdentificationNo_1)	
		//Click Save button
		cy.get('#btnUpdate').click({force: true})
		// Verify Success message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Updated Successfully')
		})
		//Click on message to close message box
		cy.get(".toast-message").click({force:true})
		
		
	})

	it('Verify updated Family Details', function() {
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
		//Verify DateOfBirth
		cy.xpath("//p[contains(@title, 'Date of Birth')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(DateOfBirth_1)
		})
		//Verify AadhaarOrIdentificationNo
		cy.xpath("//span[contains(@id, 'Aadhaar')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(AadhaarOrIdentificationNo_1)
		})

	})
	
	it('Delete Family Details', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')
				
		})

	})
	

})
