describe('14_Employment History', function() {
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

	it('Navigate to Employment History', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#Profile_EmploymentHistory').click({force: true})
		  cy.get('#Profile_EmploymentHistory').click()
		  cy.get('#Profile_EmploymentHistory').click({force: true})
		  cy.wait(5000)

	})
	
	context ('Verify all validation messages',() => {

	it('Verify validation message for company name', function() {

		cy.get('[title="Add Employment History"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#btnSaveEmployeementHistory').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter Company Name !!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for Position', function() {
		//
		cy.get('#CompanyName').type('Akash')
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter Position !!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for from date', function() {
		//
		cy.get('#Position').type('test')
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Select From Date !!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for to date', function() {
		//
		cy.get('#txtFromdt').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val('10/08/2021')
		})
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Select To Date !!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	
	it('Verify validation message for last CTC', function() {
		//
		cy.get('#txtTodt').then(input => {
			input.val('03/03/2022')
		})
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter Last CTC !!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for last home drawn ', function() {
		//
		cy.get('#LastCTCDrawn').type('6')
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter Last Home Drwan')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for Enter reason ', function() {
		//
		cy.get('#LastTakeHomeDrawn').type('10')
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter Reason')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify validation message for other information ', function() {
		//
		cy.get('#LeavingReason').type('travelling issue')
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Please Enter other Information')
		})
		//click on message to close message box
		cy.get(".toast-message").click()

	})

	it('Verify success message ', function() {
		//
		cy.get('#Others').type('abcd',{force:true})
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Data Added Successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)

	})

	})

	context ('Verify Add funcationality',() => {
	it('Add Employment History', function() {	
		cy.wait(3000)
		cy.get('[title="Add Employment History"]').eq(0).click({force: true})
		cy.wait(2000)

		cy.get('#CompanyName').click({force: true})
		cy.get('#CompanyName').type('sage software solutions (p) ltd')

		//Enter date
		cy.get('#txtFromdt').click({force: true}).then(input =>
			{ input[0].dispatchEvent(new Event('input', {
			bubbles: true }))
			input.val('08/01/2020')
			})
		/*
		cy.get('#txtFromdt').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val('08/01/2021')
		})
		
        
		cy.get('#txtTodt').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val('18/01/2022')
		})*/
		cy.get('#CompanyName').click({force: true})

		//Enter date
		cy.get('#txtTodt').click({force: true}).then(input =>
			{ input[0].dispatchEvent(new Event('input', {
			bubbles: true }))
			input.val('18/02/2021')
			})

		

		cy.get('#Position').click({force: true})
		cy.get('#Position').type('salesman')	

		cy.get('#LastCTCDrawn').click({force: true})
		cy.get('#LastCTCDrawn').type('20000')
	
		cy.get('#LastTakeHomeDrawn').click({force: true})
		cy.get('#LastTakeHomeDrawn').type('18000')

		cy.get('#LeavingReason').click({force: true})
		cy.get('#LeavingReason').type('testreason')
	
		cy.get('#Others').click({force: true})
		cy.get('#Others').type('No other data!!')
	
		cy.wait(1000)
		cy.get('#btnSaveEmployeementHistory').click()
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).to.contain('Data Added Successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
	})

	it('verify added data', function() {	

		//
		cy.xpath("//h5[contains(text(),'sage software solutions (p) ltd')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('sage software solutions (p) ltd')
        })
		//
		cy.xpath("//span[contains(text(),'salesman')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('salesman')
        })
		//
		cy.xpath("//span[contains(text(),'20000.00')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('20000.00')
        })
		//
		cy.xpath("//span[contains(text(),'18000.00')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('18000.00')
        })
		//
		cy.xpath("//span[contains(text(),'testreason')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('testreason')
        })
		//
		cy.xpath("//span[contains(text(),'No other data!!')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('No other data!!')
        })
		/*
		cy.get('[class="fas fa-calendar-alt mr-2 text-info font-14"]').invoke('text').then((text) => {
        expect(text.trim()).to.contains('1 Year 1 Month 11 Day Exp.')
        })
		
		cy.get(".mdi-calendar-multiple").invoke('text').then((text) => {
        expect(text.trim()).to.contains('08/01/2020 - 18/02/2021')
        })*/

	})
	
    })

    context ('Verify delete funcationality',() => {
	it('Delete Employment History', function() {	
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Data Deleted successfully')
		})
	
	
	})

	it('Delete Employment History', function() {	
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Data Deleted successfully')
		})
	
	
	})
    })
})
