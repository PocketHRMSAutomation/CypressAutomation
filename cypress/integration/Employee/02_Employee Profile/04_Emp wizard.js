
describe('04_Emp Wizard', function() {
	
   
   var  empid;
   var Staff = 'Staff'
   var ESILocation = 'Pune'
   var ESIDispensary = 'Mumbai' 

   var EmpName = 'Ratan'
   var LastName = 'Rao'
   var PtLocation = 'Maharashtra'
   var DateOfBirth	= '01/12/1995' 
   var DateOfJoining = '02/04/2018'
   var Metro = 'Metro'
   

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

context('Create employee through EmpWizard', function() {
	it('Add Employee', function() {
		cy.fixture('/Employee/Employee').then((data) => {
	
		cy.server()
		// cy.wait(2000)
		  cy.visit(Cypress.env('url')+'Employee/Employee/EmptyEmployeeList')
		  //cy.wait(2000)
			  cy.get('.mb-1').find('i').then(listing => {
				  var len = Cypress.$(listing).length;	
				  if (len == 2 ) {
				  cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})
			  } else {
				  cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
			  }
			  })
			 // cy.wait(4000)
			  cy.get("#empWizardTitle").then(($span) => {
				   var basicdetailsheadertext = $span.text();
					 expect(basicdetailsheadertext).equal('Basic Details')
			 })
			 cy.route('POST', Cypress.env('url')+'Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')
		 
		cy.get('input[name=code]').type(data.rows[0].EmpID.trim())
		
	   cy.get('input[name=fname]').type(data.rows[0].FirstName.trim())
	
	   cy.get('input[name=lname]').type(data.rows[0].LastName.trim())
	
	   
	   cy.get('#Male').check(data.rows[0].Gender,{force: true})
	   
	   cy.get('select[name=category]').select(data.rows[0].Category,{force: true})
	
	   cy.get('select[name=ptlocation]').select(data.rows[0].ProfTaxLocation)
	
	
	  cy.get('#txt_dateofbirth').click().then(input => {
		 input[0].dispatchEvent(new Event('input', { bubbles: true }))
		  input.val(data.rows[0].DateOfBirth)
	 })
	
	
	  cy.get('#txt_dateofjoining').then(input => {
			  input.val(data.rows[0].DateOfJoining)
	  }) 
	
	  //cy.wait(1000)
	  cy.get('[for="Date of Joining"]').click()
	  cy.wait
	  cy.get('select[name=esilocation]').select(data.rows[0].ESILocation,{force: true})
	  cy.get('select[name=metro]').select(data.rows[0].Metro_TDS,{force: true})
	  cy.get('select[name=esidispensary]').select(data.rows[0].ESIDispensary,{force: true})
	 // cy.wait(1000)
	  cy.get('#btnSaveBasicDetail').click({force: true})
	   cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
	  cy.get(".toast-message").invoke('text').then((text) => {
		//pass 
		  expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
		  cy.log(text.trim())
	  })  
	  cy.get(".toast-message").click({force: true})
		
	
	
		//Employee Details
		cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Employee Details')
	   })
	   
	   cy.route('POST', Cypress.env('url')+'Employee/Employee/EmployeeDetailsWizard').as('EmployeeDetailsWizard')
		   
		cy.get('input[name=FATHERNAME]').type(data.rows[0].FatherName)		
		cy.get('select[name=DEPARTMENT]').select(data.rows[0].Department,{force: true})
		cy.get('select[name=DESIGNATION]').select(data.rows[0].Designation,{force: true})
		cy.get('select[name=MARITALSTATUS]').select(data.rows[0].MaritalStatus,{force: true})
		cy.get('input[name=CONFIRMATIONPERIOD]').type(data.rows[0].ConfirmationPeriod_Month)
		cy.get('input[name=RETIREMENTAGE]').type(data.rows[0].RetirementAge)
		cy.get('input[name=PFACCNO]').type(data.rows[0].PFAccountNo)
		cy.get('input[name=ESINO]').type(data.rows[0].ESINo)	
		cy.get('select[name=GRADE]').select(data.rows[0].Grade,{force: true})
		cy.get('input[name=CHILDREN]').type(data.rows[0].NoOfChildren)	
		cy.get('select[name=COSTCENTRE]').select(data.rows[0].CostCentre,{force: true})
		cy.get('select[name=BRANCH]').select(data.rows[0].Branch,{force: true})
		cy.get('input[name=PANNO]').type(data.rows[0].PAN_GIRNo_TDS)
		cy.get('input[name=UANNUMBER]').type(data.rows[0].UANNumber)
         /*
		   cy.get('input[name=EMPPF]').then($input => {
				expect($input.val()).to.contain(data.rows[0].EmpPF_percentage)
	   })
	   
	   cy.get('input[name=PENSIONFUND]').then($input => {
				expect($input.val()).to.contain(data.rows[0].Pension_percentage)
	   })*/
		cy.get('select[name=STOPPAYMENT]').select(data.rows[0].StopPayment,{force: true})
		cy.get('select[name=BANKNAME]').select(data.rows[0].BankName,{force: true})
		cy.get('select[name=LOCATION]').select(data.rows[0].Location,{force: true})
		cy.get('select[name=PAYMODE]').select(data.rows[0].PayMode,{force: true})
		cy.get('select[name=SENIORCITIZEN]').select(data.rows[0].SeniorCitizen,{force: true})

		cy.wait(1000)
		cy.get('#btnEmployeeDetailSaveNext').click({force: true})
		/*
		cy.wait('@EmployeeDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
	   cy.get(".toast-message").click({force: true})
		cy.wait(2000)
	    */
		})
	
		cy.fixture('/Employee/PersonalDetail').then((data) => {

		//Personal Details
		cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Personal Details')
		})
			cy.wait(3000)
		   cy.route('POST', Cypress.env('url')+'Employee/Employee/PersonalDetailsWizard').as('PersonalDetailsWizard')
		  // cy.get('input[name=PERSONALEMAIL]').click({force: true})		
		   cy.get('input[name=PERSONALEMAIL]').type(data.rows[1].PersonalEmailId)
			
			//cy.get('input[name=REMARKS]').click({force: true})		
			cy.get('input[name=REMARKS]').type(data.rows[1].Remarks)
			
			//cy.get('input[name=PHONENO]').click({force: true})		
			cy.get('input[name=PHONENO]').type(data.rows[1].Phone)
			 
			 cy.get('select[name=BLOODGRP]').select(data.rows[1].BloodGroup,{force: true})
			 
			 //cy.get('input[name=ADDRESS1]').click({force: true})		
			 cy.get('input[name=ADDRESS1]').type(data.rows[1].Address1)
			 
			 //cy.get('input[name=ADDRESS2]').click({force: true})		
			 cy.get('input[name=ADDRESS2]').type(data.rows[1].Address2)
			 
			 //cy.get('input[name=PLACE]').click({force: true})		
			 cy.get('input[name=PLACE]').type(data.rows[1].Place)
			 
			 //cy.get('input[name=CITY]').click({force: true})		
			 cy.get('input[name=CITY]').type(data.rows[1].City)
			 
			 //cy.get('input[name=PINCODE]').click({force: true})		
			 cy.get('input[name=PINCODE]').type(data.rows[1].PINCode)
			 
			 //cy.get('input[name=EMAIL]').click({force: true})		
			 cy.get('input[name=EMAIL]').type(data.rows[1].EmailId)
			 
			 cy.get('select[name=PRINTCHEQUE]').select(data.rows[1].PrintCheque,{force: true})
			 
			 //cy.get('input[name=BANKACCNO]').click({force: true})		
			 cy.get('input[name=BANKACCNO]').type(data.rows[1].BankAccountNumber)
			 
			// cy.get('input[name=BANKBRANCHCODE]').click({force: true})		
			cy.get('input[name=BANKBRANCHCODE]').type(data.rows[1].BankBranchCode)
			 
			 //cy.get('input[name=CORR_ADDRESS1]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS1]').type(data.rows[1].CorrespondenceAddress1)
			 
			 //cy.get('input[name=CORR_ADDRESS2]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS2]').type(data.rows[1].CorrespondenceAddress2)
			 
			 
			 //cy.get('input[name=CORR_PLACE]').click({force: true})		
			 cy.get('input[name=CORR_PLACE]').type(data.rows[1].CorrespondencePlace)
			 
			 //cy.get('input[name=CORR_CITY]').click({force: true})		
			 cy.get('input[name=CORR_CITY]').type(data.rows[1].CorrespondenceCity)
			 
			 
			 //cy.get('input[name=CORR_PHONE]').click({force: true})		
			 cy.get('input[name=CORR_PHONE]').type(data.rows[1].CorrespondencePhone)
			 
			 //cy.get('input[name=CORR_PINCODE]').click({force: true})		
			 cy.get('input[name=CORR_PINCODE]').type(data.rows[1].CorrespondencePinCode)
			 
			 //cy.get('input[name=PERSONALMOBILENO]').click({force: true})		
			 cy.get('input[name=PERSONALMOBILENO]').type(data.rows[1].PersonalMobileNo)
			 
			 //cy.get('input[name=OFFICEMOBILENO]').click({force: true})		
			 cy.get('input[name=OFFICEMOBILENO]').type(data.rows[1].OfficeMobileNo)
			 
			 //cy.get('input[name=OFFICEEXTNO]').click({force: true})		
			 cy.get('input[name=OFFICEEXTNO]').type(data.rows[1].OfficeExtensionNo)
			 
			 cy.get('select[name=HANDICAP]').select(data.rows[1].Handicap,{force: true})
			cy.wait(2000)
			
			cy.get('#btnPersonalDetailSaveNext').click({force: true})
			cy.wait('@PersonalDetailsWizard').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Personal Details Records Saved Successfully.!')
				cy.log(text.trim())
			})  
		 cy.get(".toast-message").click({force: true})
		cy.wait(3000)

		})
		//Salary Details
		 cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Salary Details')
		 })
		
		cy.route('POST', Cypress.env('url')+'Employee/Employee/EarningDetailsWizard').as('EarningDetailsWizard')
		cy.route('POST', Cypress.env('url')+'Employee/Employee/DeductionDetailsWizard').as('DeductionDetailsWizard')
		cy.wait(6000)
		
		cy.get('input[name=FB]').click({force: true})		
		cy.get('input[name=FB]').type('40000') 
		
		//cy.get('input[name=FPROJ]').click({force: true})		
		//cy.get('input[name=FPROJ]').type('10000')
		
		//cy.get('input[name=AB]').click({force: true})		
		//cy.get('input[name=AB]').type('50000')
		
		//cy.get('input[name=FFIELD]').click({force: true})		
	   // cy.get('input[name=FFIELD]').type('5000')
		
		////cy.get('input[name=FHRA]').click({force: true})		
		////cy.get('input[name=FHRA]').type('5000')
		
		
		//cy.get('input[name=TDS]').click({force: true})		
		//cy.get('input[name=TDS]').type('200')
		cy.wait(2000)
		
		cy.get('#btnEarningDeductionSaveNext').click({force: true})
		cy.wait('@EarningDetailsWizard').its('status').should('eq', 200)
		//cy.wait('@DeductionDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").eq(0).invoke('text').then((earningtext) => {
				expect(earningtext.trim()).equal('Earning Details Records Saved Successfully.!')
				cy.log(earningtext.trim())
			})  
	//      //cy.get(".toast-message").eq(0).click({force: true})
	//    cy.get(".toast-message").eq(1).invoke('text').then((dedutext) => {
	// 			expect(dedutext.trim()).equal('Deduction Details Records Saved Successfully.!')
	// 			cy.log(dedutext.trim())
	// 		})  
		 //cy.get(".toast-message").eq(1).click({force: true})
	
		
		cy.wait(3000)
		//click on Approval Matrix next button
		cy.get('#btnApprovalMatrixSaveNext').click({force: true})
		
		//Shift Details
		cy.wait(2000)
		
		
	/*		cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Shift Details')
		})
		cy.wait(2000)
		//cy.route('POST', Cypress.env('url')+'Employee/Employee/ShiftScheduleWizard').as('ShiftSchedule')
		cy.get('#shiftNameDrop').select('General',{force: true})
		cy.wait(2000)
		
		cy.get('#dateRange').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2022 to 30/04/2023')
	   })
		
		
		cy.wait(2000)
	
		cy.get('#btnattendanceSaveNext').click({force: true})
		cy.wait(2000)
		//cy.wait('@ShiftSchedule').its('status').should('eq', 200)
		 cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Saved Successfully !')
		})  
		 cy.get(".toast-message").click({force: true})
		 
		//Leave Details
		cy.wait(2000)
		cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Leave Details')
		 })
		
		cy.route('POST', Cypress.env('url')+'Employee/Employee/LeaveOpeningWizard').as('LeaveOpeningWizard')
		cy.wait(4000)	
		cy.get('input[name=LeaveOpening_CL]').click({force: true})	
		cy.get('input[name=LeaveOpening_CL]').clear()	
		cy.get('input[name=LeaveOpening_CL]').type('5')
		
		cy.get('input[name=LeaveOpening_COFF]').click({force: true})
		cy.get('input[name=LeaveOpening_COFF]').clear()
		cy.get('input[name=LeaveOpening_COFF]').type('10')
		
		cy.get('input[name=LeaveOpening_PL]').click({force: true})
		cy.get('input[name=LeaveOpening_PL]').clear()		
		cy.get('input[name=LeaveOpening_PL]').type('20')
		
		cy.wait(1000)
		cy.get('#chkCredit_CL').check({force: true})
		cy.get('#chkCredit_COFF').check({force: true})
		cy.get('#chkCredit_PL').check({force: true})
		   
		cy.get('#btnLeaveopeningSaveNext').click({force: true})
		cy.wait(2000)
		cy.wait('@LeaveOpeningWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully.!')
		})
		cy.get(".toast-message").click({force: true})
		
		cy.wait(2000)
		//SelfService Details
		cy.get("#empWizardTitle").then(($span) => {
			 var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('SelfService Details')
		 })
		
		 cy.route('POST', Cypress.env('url')+'Employee/Employee/SelfServiceRoleWizard').as('selfservicerole')
		 cy.get('#ddlSelfServiceRole').select('User',{force: true})
		 cy.wait(2000)
		 cy.wait('@selfservicerole').its('status').should('eq', 200) 
		 cy.get("#credentials").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		 
		cy.get('#decActWiz').select('Yes',{force: true})
		
		cy.get('#decActWiz').select('Yes',{force: true})
		cy.get('#activeType').select('Yes',{force: true})
		
		cy.wait(2000)
		
		cy.get('#btnSelfServiceSaveNext').click({force: true})
		*/
		cy.get('.col-md-1 > .close').click({force: true})
	
	
	})
/*
it('Verify added Basic details', function() {
	cy.get('#basicTab').click()

	cy.fixture('/Employee/Employee').then((data) => {
	cy.navigate_EmployeeProfile(data.rows[0].EmpID)
	cy.get('#FNAME').invoke('val').should('contain', data.rows[0].FirstName.trim())
	//cy.get('#MNAME').invoke('val').should('contain', data.rows[0].FirstName.trim())
	cy.get('#LNAME').invoke('val').should('contain', data.rows[0].LastName.trim())
	cy.get('#'+data.rows[0].Gender.trim())
		.parent()
		   .find('input')
		.should('be.checked')
	cy.get('#PTLOCATION').find(':selected').contains(data.rows[0].ProfTaxLocation.trim())
	cy.get('#DATEOFBIRTH').invoke('val').should('contain', data.rows[0].DateOfBirth.trim())
	cy.get('#DATEOFJOINING').invoke('val').should('contain', data.rows[0].DateOfJoining.trim())
	cy.get('#ESILOCATION').find(':selected').contains(data.rows[0].ESILocation.trim())
	cy.get('#ESIDISPENSARY').find(':selected').contains(data.rows[0].ESIDispensary.trim())
	cy.get('#METRO').find(':selected').contains(data.rows[0].Metro_TDS.trim())
	
})
})*/

/*	it('Add Personal Details', function() {
		cy.server()
		cy.fixture('/Employee/Employee').then((data) => {

		//Personal Details
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Perso	nal Details')
		})

			cy.wait(3000)
		   cy.route('POST', Cypress.env('url')+'Employee/Employee/PersonalDetailsWizard').as('PersonalDetailsWizard')
		  // cy.get('input[name=PERSONALEMAIL]').click({force: true})		
		   cy.get('input[name=PERSONALEMAIL]').type('greytreetest@gmail.com')
			
			//cy.get('input[name=REMARKS]').click({force: true})		
			cy.get('input[name=REMARKS]').type('testremark')
			
			//cy.get('input[name=PHONENO]').click({force: true})		
			cy.get('input[name=PHONENO]').type('9861238307')
			 
			 cy.get('select[name=BLOODGRP]').select('A+',{force: true})
			 
			 //cy.get('input[name=ADDRESS1]').click({force: true})		
			 cy.get('input[name=ADDRESS1]').type('testaddress1')
			 
			 //cy.get('input[name=ADDRESS2]').click({force: true})		
			 cy.get('input[name=ADDRESS2]').type('testaddress2')
			 
			 //cy.get('input[name=PLACE]').click({force: true})		
			 cy.get('input[name=PLACE]').type('testplace')
			 
			 //cy.get('input[name=CITY]').click({force: true})		
			 cy.get('input[name=CITY]').type('testcity')
			 
			 //cy.get('input[name=PINCODE]').click({force: true})		
			 cy.get('input[name=PINCODE]').type('700405')
			 
			 //cy.get('input[name=EMAIL]').click({force: true})		
			 cy.get('input[name=EMAIL]').type('greytreetest@gmail.com')
			 
			 cy.get('select[name=PRINTCHEQUE]').select('Yes',{force: true})
			 
			 //cy.get('input[name=BANKACCNO]').click({force: true})		
			 cy.get('input[name=BANKACCNO]').type('4345346575')
			 
			// cy.get('input[name=BANKBRANCHCODE]').click({force: true})		
			 cy.get('input[name=BANKBRANCHCODE]').type('HDFC001')
			 
			 //cy.get('input[name=CORR_ADDRESS1]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS1]').type('testcorraddress1')
			 
			 //cy.get('input[name=CORR_ADDRESS2]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS2]').type('testcorraddress2')
			 
			 
			 //cy.get('input[name=CORR_PLACE]').click({force: true})		
			 cy.get('input[name=CORR_PLACE]').type('correndplace')
			 
			 //cy.get('input[name=CORR_CITY]').click({force: true})		
			 cy.get('input[name=CORR_CITY]').type('correndcity')
			 
			 
			 //cy.get('input[name=CORR_PHONE]').click({force: true})		
			 cy.get('input[name=CORR_PHONE]').type('1234567890')
			 
			 //cy.get('input[name=CORR_PINCODE]').click({force: true})		
			 cy.get('input[name=CORR_PINCODE]').type('400705')
			 
			 //cy.get('input[name=PERSONALMOBILENO]').click({force: true})		
			 cy.get('input[name=PERSONALMOBILENO]').type('4007051234')
			 
			 //cy.get('input[name=OFFICEMOBILENO]').click({force: true})		
			 cy.get('input[name=OFFICEMOBILENO]').type('4007051234')
			 
			 //cy.get('input[name=OFFICEEXTNO]').click({force: true})		
			 cy.get('input[name=OFFICEEXTNO]').type('022')
			 
			 cy.get('select[name=HANDICAP]').select('No',{force: true})
		    cy.wait(2000)
			
			cy.get('#btnPersonalDetailSaveNext').click({force: true})
			cy.wait('@PersonalDetailsWizard').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Personal Details Records Saved Successfully.!')
				cy.log(text.trim())
			})  
	     cy.get(".toast-message").click({force: true})
		cy.wait(3000)
		//Salary Details
		 cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Salary Details')
         })
		
		cy.route('POST', Cypress.env('url')+'Employee/Employee/EarningDetailsWizard').as('EarningDetailsWizard')
		cy.route('POST', Cypress.env('url')+'Employee/Employee/DeductionDetailsWizard').as('DeductionDetailsWizard')
		cy.wait(6000)
		
		cy.get('input[name=FB]').click({force: true})		
		cy.get('input[name=FB]').type('40000') 
		
		
		cy.wait(2000)
		
		cy.get('#btnEarningDeductionSaveNext').click({force: true})
		cy.wait('@EarningDetailsWizard').its('status').should('eq', 200)
		//cy.wait('@DeductionDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").eq(0).invoke('text').then((earningtext) => {
				expect(earningtext.trim()).equal('Earning Details Records Saved Successfully.!')
				cy.log(earningtext.trim())
			})  

		
		cy.wait(3000)
		//click on Approval Matrix next button
		cy.get('#btnApprovalMatrixSaveNext').click({force: true})
		
		//Shift Details
		cy.wait(2000)
		
	
	})
	})
	*/
	

/*	
it('Verify added Employee Details', function() {
	cy.get('#employeeTab').click()
	cy.fixture('/Employee/Employee').then((data) => {
		
		//Verify Updated data
		cy.get('#FATHERNAME').invoke('val').should('contain', data.rows[0].FatherName)
		cy.get('#DEPARTMENT').find(':selected').contains(data.rows[0].Department)
		cy.get('#DESIGNATION').find(':selected').should('contain', data.rows[0].Designation)
		cy.get('#MARITALSTATUS').find(':selected').contains(data.rows[0].MaritalStatus)
		cy.get('#CONFIRMATIONPERIOD').invoke('val').should('contain', data.rows[0].ConfirmationPeriod_Month)
		//cy.get('#DATEOFANNIVERSARY').invoke('val').should('contain', data.rows[0].DateofAnniversary)
		cy.get('#RETIREMENTAGE').invoke('val').should('contain', data.rows[0].RetirementAge)
		cy.get('#PFACCNO').invoke('val').should('contain', data.rows[0].PFAccountNo)
		cy.get('#ESINO').invoke('val').should('contain', data.rows[0].ESINo)
		cy.get('#GRADE').find(':selected').contains(data.rows[0].Grade)
		cy.get('#COSTCENTRE').find(':selected').contains(data.rows[0].CostCentre)
		cy.get('#BRANCH').find(':selected').contains(data.rows[0].Branch)
		cy.get('#UANNUMBER').invoke('val').should('contain', data.rows[0].UANNumber) 
		cy.get('#PANNO').invoke('val').should('contain', data.rows[0].PAN_GIRNo_TDS) 
		cy.get('#STOPPAYMENT').find(':selected').contains(data.rows[0].StopPayment)
		cy.get('#BANKNAME').find(':selected').contains(data.rows[0].BankName)
		cy.get('#LOCATION').find(':selected').contains(data.rows[0].Location)
		cy.get('#PAYMODE').find(':selected').contains(data.rows[0].PayMode)
		cy.get('#SENIORCITIZEN').find(':selected').contains(data.rows[0].SeniorCitizen)
		cy.get('#REGIMETYPE').find(':selected').contains(data.rows[0].ItaxRegimeType)

	})
})


it('Verify added Personal Details', function() {
	cy.get('#personalTab').click()
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
})*/



})
})