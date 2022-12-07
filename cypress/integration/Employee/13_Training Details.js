describe('09_Training Details', function() {
	const { softAssert, softExpect } = chai;

	var EmpID ;
	var TrainingName ;
	var DateOfCompletion;
	var CertificationNumber;
	var AmountPaidToNomineeInPercentage;
	var DOB;
	var NameAndAddressOfGuardian;
	var Age;

	var EmpID ;
	var TrainingName_1 ;
	var DateOfCompletion_1;
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
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "TrainingDetails" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/TrainingDetails.json", {rows})
		}) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		//  cy.fixture('/Employee/TrainingDetails').then((data) => { 

		// 	TrainingName = data.rows[0].TrainingName;
		// 	DateOfCompletion = data.rows[0].DateOfCompletion;
		// 	CertificationNumber = data.rows[0].CertificationNumber;
		// 	AmountPaidToNomineeInPercentage = data.rows[0].AmountPaidToNomineeInPercentage;
		// 	DOB = data.rows[0].DOB;
		// 	NameAndAddressOfGuardian = data.rows[0].NameAndAddressOfGuardian;
		// 	Age = data.rows[0].Age;
		
		// 	TrainingName_1 = data.rows[1].TrainingName;
		// 	DateOfCompletion_1 = data.rows[1].DateOfCompletion;
		// 	CertificationNumber_1 = data.rows[1].NomineeRelationWithMember;
		// 	AmountPaidToNomineeInPercentage_1 = data.rows[1].AmountPaidToNomineeInPercentage;
		// 	DOB_1 = data.rows[0].DOB;
		// 	NameAndAddressOfGuardian_1 = data.rows[0].NameAndAddressOfGuardian;
		// 	Age_1 = data.rows[0].Age;

		//  }) 

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
		  cy.get('#Profile_TrainingDetails').click({force: true})
		  cy.get('#Profile_TrainingDetails').click()
		  cy.get('#Profile_TrainingDetails').click({force: true})
		  cy.wait(2000)
	})

	it('Add Training Details', function() {	
	
		cy.get('[title="Add Training Details"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		
		cy.get("#TrainingName-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#TrainingName').click({force: true})
			cy.get('#TrainingName').clear()
			cy.get('#TrainingName').type('MVC')
		})
		
		cy.get("#DateOfCompletion-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			 cy.wait(2000)
			cy.get('#DateOfCompletion').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('11/12/2013')
		   })
		})	
		
		
		cy.get("#CertificationNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#CertificationNumber').click({force: true})
			cy.get('#CertificationNumber').clear()
		    cy.get('#CertificationNumber').type('mvcfg78u')
		})
		
		
		cy.get("#Institute-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#Institute').click({force: true})
			cy.get('#Institute').clear()
		    cy.get('#Institute').type('SeedInfotech')
		})
		cy.wait(1000)
		
		cy.get('#Stream').click({force: true})
		cy.get('#Stream').type('computer science')
		
		cy.get('#Grade').click({force: true})
		cy.get('#Grade').type('A')
		
		cy.get('#University').click({force: true})
		cy.get('#University').type('Kabisamrat Upendra Bhanja')
		
		
		cy.get('#Others').click({force: true})
		cy.get('#Others').type('No other speicfication.')
		
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Records Added Successfully')
		})
	})
		
	it('Verify added Training Details', function() {
		//Verify 
		cy.xpath("//h5[contains(@id, 'TrainingName')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('MVC')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'University')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Kabisamrat Upendra Bhanja')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Stream')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('computer science')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'DateOfCompletion')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('11/12/2013')
		})

			//Verify 
		cy.xpath("//span[contains(@id, 'Institute')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('SeedInfotech')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Grade')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('A')
		})

		cy.xpath("//span[contains(@id, 'CertificationNumber')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('mvcfg78u')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Others')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('No other speicfication.')
		})

	})

	it('Edit Training Details', function() {	
	
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)

			cy.get('#TrainingName').click({force: true})
			cy.get('#TrainingName').clear()
			cy.get('#TrainingName').type('MVC_1')
		
			cy.get('#DateOfCompletion').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('11/12/2014')
		})	
			
			cy.get('#CertificationNumber').click({force: true})
			cy.get('#CertificationNumber').clear()
		    cy.get('#CertificationNumber').type('mvcfg78u_1')
		
			cy.get('#Institute').click({force: true})
			cy.get('#Institute').clear()
		    cy.get('#Institute').type('SeedInfotech_1')
	
		cy.wait(1000)
		
		cy.get('#Stream').click({force: true})
		cy.get('#Stream').clear().type('computer science_1')
		
		cy.get('#Grade').click({force: true})
		cy.get('#Grade').clear().type('A_1')
		
		cy.get('#University').click({force: true})
		cy.get('#University').clear().type('Kabisamrat Upendra Bhanja_1')
		
		
		cy.get('#Others').click({force: true})
		cy.get('#Others').clear().type('No other speicfication_1')
		
		cy.wait(2000)
		cy.get('#btnTrainingSubmitUpdate').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Records Updated Successfully')
		})
	})
	
	
	it('Verify updated Training Details', function() {
		//Verify 
		cy.xpath("//h5[contains(@id, 'TrainingName')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('MVC_1')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'University')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Kabisamrat Upendra Bhanja_1')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Stream')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('computer science_1')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'DateOfCompletion')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('11/12/2014')
		})

			//Verify 
		cy.xpath("//span[contains(@id, 'Institute')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('SeedInfotech_1')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Grade')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('A_1')
		})

		cy.xpath("//span[contains(@id, 'CertificationNumber')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('mvcfg78u_1')
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Others')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('No other speicfication_1')
		})

	})

	it('Delete Training Details', function() {	
	cy.wait(3000)	
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})
	


	
	



	
	


})
