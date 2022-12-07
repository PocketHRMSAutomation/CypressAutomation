describe('05_Basic Details', function() {
	
   var empid = 'CY1'
   var Staff = 'Staff'
   var firstName = 'Mohan'
   var middleName = 'Mithun'
   var lastName  = 'Mane'
   var gender = 'Female'
   var profTaxLocation  = 'Maharashtra'
   var dateOfBirth	= '01/12/1995' 
   var dateOfJoining = '02/04/2022'
   var esiLocation = 'Pune'
   var esiDispensary = 'Mumbai' 
   var metro = 'Metro'
   
   before(() => {
	cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "PersonalDetail" }).then((rows) => {
	   var rowsLength = rows.length;
	   cy.writeFile("cypress/fixtures/Employee/PersonalDetail.json", {rows})
	 })    
  })

   beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
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

it('Verify validation message', function() {
	//cy.navigate_EmployeeProfile(empid)	
	
	cy.get('#profile_detail_tab').click({force:true})
	cy.get('#FNAME').clear()
	//cy.get('#FNAME').type(firstName);
	cy.get('#MNAME').clear()
	//cy.get('#MNAME').type(middleName);
	cy.get('#LNAME').clear()
	//cy.get('#LNAME').type(lastName);
	cy.get('#'+gender).click({force: true});
	cy.get('#PTLOCATION').select(profTaxLocation);
	cy.get('#DATEOFBIRTH').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		 input.val(dateOfBirth)
	})
	 cy.get('#DATEOFJOINING').then(input => {
			 input.val(dateOfJoining)
	 }) 
	cy.get('#ESILOCATION').select(esiLocation, {force:true});
	cy.get('#ESIDISPENSARY').select(esiDispensary);
	cy.get('#METRO').select(metro);

	cy.get('#basicProfileSave').click();
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please fill all required fields')
		cy.log(text.trim())
	})
	//click on message to close message box
	cy.get(".toast-message").click()
	cy.wait(2000) 
	
})

it('Update Basic details', function() {
	//cy.navigate_EmployeeProfile(empid)	
	
	//cy.get('#profile_detail_tab').click({force:true})
	cy.get('#FNAME').clear()
	cy.get('#FNAME').type(firstName);
	cy.get('#MNAME').clear()
	cy.get('#MNAME').type(middleName);
	cy.get('#LNAME').clear()
	cy.get('#LNAME').type(lastName);
	cy.get('#'+gender).click({force: true});
	cy.get('#PTLOCATION').select(profTaxLocation);
	cy.get('#DATEOFBIRTH').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		 input.val(dateOfBirth)
	})
	 cy.get('#DATEOFJOINING').then(input => {
			 input.val(dateOfJoining)
	 }) 
	cy.get('#ESILOCATION').select(esiLocation, {force:true});
	cy.get('#ESIDISPENSARY').select(esiDispensary);
	cy.get('#METRO').select(metro);
	cy.get('#basicProfileSave').click();
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Record Saved Successfully.')
		cy.log(text.trim())
	})
	//click on message to close message box
	cy.get(".toast-message").click()
	cy.wait(2000) 
	
})

it('Verify updated Basic details', function() {


	cy.get('#FNAME').invoke('val').should('contain', firstName)
	cy.get('#MNAME').invoke('val').should('contain', middleName)
	cy.get('#LNAME').invoke('val').should('contain', lastName)
	cy.get('#'+gender)
		.parent()
		   .find('input')
		.should('be.checked')
	cy.get('#PTLOCATION').find(':selected').contains(profTaxLocation)
	cy.get('#DATEOFBIRTH').invoke('val').should('contain', dateOfBirth)
	cy.get('#DATEOFJOINING').invoke('val').should('contain', dateOfJoining)
	cy.get('#ESILOCATION').find(':selected').contains(esiLocation)
	cy.get('#ESIDISPENSARY').find(':selected').contains(esiDispensary)
	cy.get('#METRO').find(':selected').contains(metro)
	
})

}) 