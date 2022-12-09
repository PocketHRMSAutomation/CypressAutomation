describe('07_Personal Details', function() {
	const { softAssert, softExpect } = chai;
	
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

	it('Navigate to Employee profile', function() {
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 
		  cy.fixture('/Employee/Employee').then((data) => {
		  cy.navigate_EmployeeProfile(data.rows[1].EmpID)
		  })	
	})
	
    it('Verify validation Message', function() {
		cy.fixture('/Employee/PersonalDetail').then((data) => {
		cy.get('#personalTab').click()
			cy.get('#PERSONALEMAIL').clear();
			//cy.get('#PERSONALEMAIL').type(data.rows[1].PersonalEmailId);
			cy.get('#REMARKS').clear();
			//cy.get('#REMARKS').type(data.rows[1].Remarks);
			cy.get('#PHONENO').clear();
			//cy.get('#PHONENO').type(data.rows[1].Phone);
			cy.get('#BLOODGRP').select(data.rows[1].BloodGroup);
			cy.get('#ADDRESS1').clear();
			//cy.get('#ADDRESS1').type(data.rows[1].Address1);
			cy.get('#ADDRESS2').clear();
			//cy.get('#ADDRESS2').type(data.rows[1].Address2);
			cy.get('#PLACE').clear();
			//cy.get('#PLACE').type(data.rows[1].Place);	
			cy.get('#CITY').clear();
			//cy.get('#CITY').type(data.rows[1].City);
			cy.get('#PINCODE').clear();
			//cy.get('#PINCODE').type(data.rows[1].PINCode);	
			cy.get('#EMAIL').clear();
			//cy.get('#EMAIL').type(data.rows[1].EmailId);	
			cy.get('#PRINTCHEQUE').select(data.rows[1].PrintCheque);		
			cy.get('#BANKACCNO').clear();
			//cy.get('#BANKACCNO').type(data.rows[1].BankAccountNumber);	
			cy.get('#BANKBRANCHCODE').clear();
			//cy.get('#BANKBRANCHCODE').type(data.rows[1].BankBranchCode);	
			cy.get('#CORR_ADDRESS1').clear();
			//cy.get('#CORR_ADDRESS1').type(data.rows[1].CorrespondenceAddress1);	
			cy.get('#CORR_ADDRESS2').clear();
			//cy.get('#CORR_ADDRESS2').type(data.rows[1].CorrespondenceAddress2);	
			cy.get('#CORR_PLACE').clear();
			//cy.get('#CORR_PLACE').type(data.rows[1].CorrespondencePlace);
			cy.get('#CORR_CITY').clear();
			//cy.get('#CORR_CITY').type(data.rows[1].CorrespondenceCity);
			cy.get('#CORR_PHONE').clear();
			//cy.get('#CORR_PHONE').type(data.rows[1].CorrespondencePhone);	
			cy.get('#CORR_PINCODE').clear();
			//cy.get('#CORR_PINCODE').type(data.rows[1].CorrespondencePinCode);
			cy.get('#PERSONALMOBILENO').clear();
			//cy.get('#PERSONALMOBILENO').type(data.rows[1].PersonalMobileNo);
			cy.get('#OFFICEMOBILENO').clear();
			//cy.get('#OFFICEMOBILENO').type(data.rows[1].OfficeMobileNo);
			cy.get('#OFFICEEXTNO').clear();
			//
			cy.get('#PERSONALEMAIL').type('fkdlfk')

			//click on save button
			cy.get('#personalSaveBtn').click();	
			cy.get(".toast-message").invoke('text').then((text) => {
				softExpect(text.trim()).equal('Invalid Personal Email Id.')
				cy.log(text.trim())
			})
		})

	})

	it('Edit Personal Details', function() {
		cy.fixture('/Employee/PersonalDetail').then((data) => {

			cy.get('#personalTab').click()
			cy.get('#PERSONALEMAIL').clear();
			cy.get('#PERSONALEMAIL').type(data.rows[1].PersonalEmailId);
			cy.get('#REMARKS').clear();
			cy.get('#REMARKS').type(data.rows[1].Remarks);
			cy.get('#PHONENO').clear();
			cy.get('#PHONENO').type(data.rows[1].Phone);
			cy.get('#BLOODGRP').select(data.rows[1].BloodGroup);
			cy.get('#ADDRESS1').clear();
			cy.get('#ADDRESS1').type(data.rows[1].Address1);
			cy.get('#ADDRESS2').clear();
			cy.get('#ADDRESS2').type(data.rows[1].Address2);
			cy.get('#PLACE').clear();
			cy.get('#PLACE').type(data.rows[1].Place);	
			cy.get('#CITY').clear();
			cy.get('#CITY').type(data.rows[1].City);
			cy.get('#PINCODE').clear();
			cy.get('#PINCODE').type(data.rows[1].PINCode);	
			cy.get('#EMAIL').clear();
			cy.get('#EMAIL').type(data.rows[1].EmailId);	
			cy.get('#PRINTCHEQUE').select(data.rows[1].PrintCheque);		
			cy.get('#BANKACCNO').clear();
			cy.get('#BANKACCNO').type(data.rows[1].BankAccountNumber);	
			cy.get('#BANKBRANCHCODE').clear();
			cy.get('#BANKBRANCHCODE').type(data.rows[1].BankBranchCode);	
			cy.get('#CORR_ADDRESS1').clear();
			cy.get('#CORR_ADDRESS1').type(data.rows[1].CorrespondenceAddress1);	
			cy.get('#CORR_ADDRESS2').clear();
			cy.get('#CORR_ADDRESS2').type(data.rows[1].CorrespondenceAddress2);	
			cy.get('#CORR_PLACE').clear();
			cy.get('#CORR_PLACE').type(data.rows[1].CorrespondencePlace);
			cy.get('#CORR_CITY').clear();
			cy.get('#CORR_CITY').type(data.rows[1].CorrespondenceCity);
			cy.get('#CORR_PHONE').clear();
			cy.get('#CORR_PHONE').type(data.rows[1].CorrespondencePhone);	
			cy.get('#CORR_PINCODE').clear();
			cy.get('#CORR_PINCODE').type(data.rows[1].CorrespondencePinCode);
			cy.get('#PERSONALMOBILENO').clear();
			cy.get('#PERSONALMOBILENO').type(data.rows[1].PersonalMobileNo);
			cy.get('#OFFICEMOBILENO').clear();
			cy.get('#OFFICEMOBILENO').type(data.rows[1].OfficeMobileNo);
			cy.get('#OFFICEEXTNO').clear();
			cy.get('#OFFICEEXTNO').type(data.rows[1].OfficeExtensionNo);	
			cy.get('#HANDICAP').select(data.rows[1].Handicap);	

			cy.get('#personalSaveBtn').click();	
			cy.get(".toast-message").invoke('text').then((text) => {
				softExpect(text.trim()).equal('Record Saved Successfully.')
				cy.log(text.trim())
			})
			
			

	})
	})	

	it('Verify edited Personal Details', function() {
		cy.fixture('/Employee/PersonalDetail').then((data) => {

			cy.get('#PERSONALEMAIL').invoke('val').should('contain', data.rows[1].PersonalEmailId)
			cy.get('#REMARKS').invoke('val').should('contain', data.rows[1].Remarks)
			cy.get('#PHONENO').invoke('val').should('contain', data.rows[1].Phone)
			cy.get('#BLOODGRP').find(':selected').contains(data.rows[1].BloodGroup)
			cy.get('#ADDRESS1').invoke('val').should('contain', data.rows[1].Address1)
			cy.get('#ADDRESS2').invoke('val').should('contain', data.rows[1].Address2)
			cy.get('#PLACE').invoke('val').should('contain', data.rows[1].Place) 
			cy.get('#CITY').invoke('val').should('contain', data.rows[1].City)
			cy.get('#PINCODE').invoke('val').should('contain', data.rows[1].PINCode)
			cy.get('#EMAIL').invoke('val').should('contain', data.rows[1].EmailId)
			cy.get('#BANKACCNO').invoke('val').should('contain', data.rows[1].BankAccountNumber)
			cy.get('#BANKBRANCHCODE').invoke('val').should('contain', data.rows[1].BankBranchCode)
			cy.get('#PRINTCHEQUE').find(':selected').contains(data.rows[1].PrintCheque)
			cy.get('#CORR_ADDRESS1').invoke('val').should('contain', data.rows[1].CorrespondenceAddress1)
			cy.get('#CORR_ADDRESS2').invoke('val').should('contain', data.rows[1].CorrespondenceAddress2) 
			cy.get('#CORR_PLACE').invoke('val').should('contain', data.rows[1].CorrespondencePlace)
			cy.get('#CORR_CITY').invoke('val').should('contain', data.rows[1].CorrespondenceCity)
			cy.get('#CORR_PHONE').invoke('val').should('contain', data.rows[1].CorrespondencePhone)
			cy.get('#CORR_PINCODE').invoke('val').should('contain', data.rows[1].CorrespondencePinCode)
			cy.get('#PERSONALMOBILENO').invoke('val').should('contain', data.rows[1].PersonalMobileNo)
			cy.get('#OFFICEMOBILENO').invoke('val').should('contain', data.rows[1].OfficeMobileNo)
			cy.get('#OFFICEEXTNO').invoke('val').should('contain', data.rows[1].OfficeExtensionNo) 
			cy.get('#HANDICAP').find(':selected').should('contain', data.rows[1].Handicap)
	})
	})

})
