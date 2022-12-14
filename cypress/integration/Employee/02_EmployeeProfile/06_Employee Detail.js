describe('06_Employee Detail', function() {
	const { softAssert, softExpect } = chai;
	
	
	before(() => {
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		 })    
	  })

	beforeEach(function(){
       cy.getCookies()
	})

	it('Login to Cloud & select Company', function() {
	
		cy.login()
		cy.changeCompany();		
	})
	
    it('Verify validation message', function() {
		cy.fixture('/Employee/Employee').then((data) => {
		cy.navigate_EmployeeProfile(data.rows[1].EmpID)	

		cy.get('#employeeTab').click()
		cy.get('#REGIMETYPE').select('-Select-')
		//click on save button
		cy.get('#empProfileSave').click();
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).equal('Please fill all required fields')
			cy.log(text.trim())
		})
		})	
	})

	it('Edit Employee Details', function() {
		cy.fixture('/Employee/Employee').then((data) => {
		cy.navigate_EmployeeProfile(data.rows[1].EmpID)	

		cy.get('#employeeTab').click()
		cy.get('#FATHERNAME').clear()
		cy.get('#FATHERNAME').type(data.rows[1].FatherName);
		cy.get('#DEPARTMENT').select(data.rows[1].Department);
		cy.get('#DESIGNATION').select(data.rows[1].Designation);
		cy.get('#MARITALSTATUS').select(data.rows[1].MaritalStatus);
		cy.get('#CONFIRMATIONPERIOD').clear()
		cy.get('#CONFIRMATIONPERIOD').type(data.rows[1].ConfirmationPeriod_Month);

		cy.get('#DATEOFANNIVERSARY').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val(data.rows[1].DateofAnniversary)
		})
		cy.get('#RETIREMENTAGE').clear()
		cy.get('#RETIREMENTAGE').type(data.rows[1].RetirementAge);
		cy.get('#PFACCNO').clear()
		cy.get('#PFACCNO').type(data.rows[1].PFAccountNo);
		cy.get('#ESINO').clear()
		cy.get('#ESINO').type(data.rows[1].ESINo);
		cy.get('#GRADE').select(data.rows[1].Grade);
		cy.get('#COSTCENTRE').select(data.rows[1].CostCentre);
		cy.get('#BRANCH').select(data.rows[1].Branch);
		cy.get('#UANNUMBER').clear()
		cy.get('#UANNUMBER').type(data.rows[1].UANNumber);
		cy.get('#PANNO').clear()
		cy.get('#PANNO').type(data.rows[1].PAN_GIRNo_TDS);
		cy.get('#STOPPAYMENT').select(data.rows[1].StopPayment);
		//cy.get('#PFDATEOFJOINING').click();
		//cy.get('#TERMINATIONDATE').click();
		cy.get('#BANKNAME').select(data.rows[1].BankName);
		cy.get('#LOCATION').select(data.rows[1].Location);
		cy.get('#PAYMODE').select(data.rows[1].PayMode);
		cy.get('#SENIORCITIZEN').select(data.rows[1].SeniorCitizen);
		//cy.get('#'+PayrollProcess).click({force: true});
		cy.get('#REGIMETYPE').select(data.rows[1].ItaxRegimeType);
		cy.get('#empProfileSave').click();
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).equal('Record Saved Successfully.')
			cy.log(text.trim())
		})

	})
	})

	it('Verify edited Employee Details', function() {

	cy.fixture('/Employee/Employee').then((data) => {
		
		//Verify Updated data
		cy.get('#FATHERNAME').invoke('val').should('contain', data.rows[1].FatherName)
		cy.get('#DEPARTMENT').find(':selected').contains(data.rows[1].Department)
		cy.get('#DESIGNATION').find(':selected').should('contain', data.rows[1].Designation)
		cy.get('#MARITALSTATUS').find(':selected').contains(data.rows[1].MaritalStatus)
		cy.get('#CONFIRMATIONPERIOD').invoke('val').should('contain', data.rows[1].ConfirmationPeriod_Month)
	//	cy.get('#DATEOFANNIVERSARY').invoke('val').should('contain', data.rows[1].DateofAnniversary)
		cy.get('#RETIREMENTAGE').invoke('val').should('contain', data.rows[1].RetirementAge)
		cy.get('#PFACCNO').invoke('val').should('contain', data.rows[1].PFAccountNo)
		cy.get('#ESINO').invoke('val').should('contain', data.rows[1].ESINo)
		cy.get('#GRADE').find(':selected').contains(data.rows[1].Grade)
		cy.get('#COSTCENTRE').find(':selected').contains(data.rows[1].CostCentre)
		cy.get('#BRANCH').find(':selected').contains(data.rows[1].Branch)
		cy.get('#UANNUMBER').invoke('val').should('contain', data.rows[1].UANNumber) 
		cy.get('#PANNO').invoke('val').should('contain', data.rows[1].PAN_GIRNo_TDS) 
		cy.get('#STOPPAYMENT').find(':selected').contains(data.rows[1].StopPayment)
		cy.get('#BANKNAME').find(':selected').contains(data.rows[1].BankName)
		cy.get('#LOCATION').find(':selected').contains(data.rows[1].Location)
		cy.get('#PAYMODE').find(':selected').contains(data.rows[1].PayMode)
		cy.get('#SENIORCITIZEN').find(':selected').contains(data.rows[1].SeniorCitizen)
		cy.get('#REGIMETYPE').find(':selected').contains(data.rows[1].ItaxRegimeType)

	})
	})

})
