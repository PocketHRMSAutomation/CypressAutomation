import 'cypress-iframe'
describe('Warning page', () =>{

    var filePath = 'Employee/IMG_20220812_171834.jpg'
    var updatedFilePath = 'Employee/light bill.pdf'

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

context ('Verify Warning tab',() => {

it('To check Warning tab is working propely or not',() => {
   
    //click on appreciation tab 
    cy.get('#Profile_Warning').click({force:true})
    cy.get('#Profile_Warning').click()
    cy.get('#Profile_Warning').click({force:true})
    cy.wait(1000)

    cy.get('[class="col-6 text-left xheader-title"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Warning')
    })
})

})

context ('Verify all validation messages',() => {
   
it('Verify appreciation pop-up will open or not',() => {
        //click on add appreciation button(+)
        cy.get('[title="Add Warning"]').eq(0).click()
        cy.wait(1000)
    
        cy.xpath("//h4[@id='myLargeModalLabel']").invoke('text').then((text) => {
            expect(text.trim()).equal('Add Warning')
        })
    
    })


 it('verify valdation massage for Warning Subject', () => {

    //1)blank form
    cy.get('#btnProcess').click()
    cy.wait(2000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Warning Subject!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })

 it('verify valdation massage for Warning Date!', () => {
    //2)only fill Appreciation Subject
    //Enter Appreciation subject
    cy.get('#subject').type('sonali')
    //click on save
    cy.get('#btnProcess').click()
    //verify validation for date 
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Warning  Date!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })

 it('verify valdation massage for Warning Brief!', () => {   
    //3)fill Appreciation Date
     //Enter date
    cy.get('#WDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2022')
        })
        cy.get('#btnProcess').click()
    //verify validation for brief    
     cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Warning Brief!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    })

 it('verify valdation massage for Letter Number!', () => { 
    //4)ill brief descriptionf
    cy.get('#brief_ifr').then(function($iframe){
        const iframecontent = $iframe.contents().find('body')

        cy.wrap(iframecontent)
        .click()
        .type('hello')
        cy.wait(1000)
    })
    
    cy.get('#btnProcess').click()
    //verify validation for letter number   
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Letter Number!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })

 it('verify valdation massage for Letter Number Only!', () => { 
     //5) fill incorrect letter number
     cy.get('#ltrNo').type('6545lk')
     //click on save
     cy.get('#btnProcess').click()
     //verify validation for issued by  
     cy.get(".toast-message").invoke('text').then((text) => {
         expect(text.trim()).equal('Please Enter  Letter Number Only!')
     })
      //click on message to close message box
      cy.get(".toast-message").click()
    })

it('verify valdation massage for Issued By!', () => { 
    //6)fill correct letter number
    cy.get('#ltrNo').type(3946)
    //click on save
    cy.get('#btnProcess').click()
    //verify validation for issued by  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Issued By!')
    })
     //click on message to close message box
     cy.get(".toast-message").click()
 })


it('verify verify success massage for Data saved successfully',() => {
     //7)fill issued by
     cy.get('#issuedBy').type('ramesh')

    
     //click on save
    cy.get('#btnProcess').click()
    //verify success message  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data saved successfully.')
    })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)
     })

     
it('verify validation message for duplicate record ', () => {
        cy.get('[title="Add Warning"]').eq(0).click()
  
        //edit appreciation subject text field
    cy.get('#subject').clear()
    cy. get('#subject').type('sonali')

    //edit letter number text field
    cy.get("#ltrNo").clear()
    cy. get("#ltrNo").type('3946')
     
    //edit issued by text field
    cy.get('#issuedBy').clear()
    cy. get('#issuedBy').type('ramesh')

    //edit brief
    cy.get('#brief_ifr').then(function($iframe){
        const iframecontent = $iframe.contents().find('body')

        cy.wrap(iframecontent)
        .click()
        .type('hello')
        cy.wait(1000)
        })
    //edit date
    cy.get('#WDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2022')
        })  

       // cy.get(".btndel").eq(0).click()
        //cy.get('#File').attachFile('sample file.pdf', { subjectType: 'drag-n-drop' });
        cy.get('#btnProcess').click()
         //verify success message  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Already Exists')
    })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)

    })

 })

context ('Verify for add fucationality With Attach file',() => {


    it('can add all fields (attach file)', () => {
        cy.get('[title="Add Warning"]').eq(0).click()
  
        //edit appreciation subject text field
    cy.get('#subject').clear()
    cy. get('#subject').type('rupali')

    //edit letter number text field
    cy.get("#ltrNo").clear()
    cy. get("#ltrNo").type('1234')
     
    //edit issued by text field
    cy.get('#issuedBy').clear()
    cy. get('#issuedBy').type('pranali')

    //edit brief
    cy.get('#brief_ifr').then(function($iframe){
        const iframecontent = $iframe.contents().find('body')

        cy.wrap(iframecontent)
        .click()
        .type('where are you')
        cy.wait(1000)
        })
    //edit date
    cy.get('#WDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2021')
        })  

       // cy.get(".btndel").eq(0).click()
        //cy.get('#File').attachFile('sample file.pdf');
    //
    //cy.get('#File').click()
    
    cy.fixture(filePath, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    //cy.xpath("//input[@id='File']").upload({
    cy.get("#File").upload({
    fileContent,
    fileName: filePath,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    encoding: 'utf8'
    })
    })
    cy.wait(2000)

       
       
        cy.get('#btnProcess').click()
         //verify success message  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data saved successfully.')
    })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)
    })
    
    it('can download the attched file',() => {
        //click on download button
        cy.get('[class="fas fa-download"]').eq(0).click()
    })

    it('vrify added data', () => {
        //
        cy.contains("rupali").invoke('text').then((text) => {
            expect(text.trim()).to.contain('rupali')
            })
        //
        cy.xpath("//span[contains(text(),'1234')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('1234')
           })
        //
        cy.xpath("//span[contains(text(),'pranali')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('pranali')
            })
         //
         cy.xpath("//span[contains(text(),'where are you')]").invoke('text').then((text) => {
                expect(text.trim()).to.contain('where are you')
            })
         //
         cy.xpath("//span[contains(text(),'04/04/2021')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('04/04/2021')
            })
    
    })

})

context ('Verify for Edit funcationality',() => {
   
    it('update previous data with the new data', () => {
    
        cy.get('.fa-edit').eq(0).click() 
    
        //edit appreciation subject text field
        cy.get('#subject').clear()
        cy. get('#subject').type('akash')
    
        //edit letter number text field
        cy.get("#ltrNo").clear()
        cy. get("#ltrNo").type('8809')
         
        //edit issued by text field
        cy.get('#issuedBy').clear()
        cy. get('#issuedBy').type('vishal')
    
        //edit brief
        cy.get('#brief_ifr').then(function($iframe){
            const iframecontent = $iframe.contents().find('body')
    
            cy.wrap(iframecontent).dblclick().clear()
            .type('hii, hello, how are you')
            cy.wait(1000)
            })
        //edit date
        cy.get('#WDate').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('04/05/2022')
            }) 
        //attachment
       // cy.get('#File').attachFile('light bill.pdf', { subjectType: 'drag-n-drop' });
       cy.wait(1000)

       cy.fixture(updatedFilePath, 'binary')
       .then(Cypress.Blob.binaryStringToBlob)
       .then(fileContent => {
       //cy.xpath("//input[@id='File']").upload({
       cy.get("#File").upload({
       fileContent,
       fileName: updatedFilePath,
       mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
       encoding: 'utf8'
       })
       })
      
        
        //click on save button
        cy.get('#btnEdit').click({force:true})
        cy.wait(1000)
        
    
        //verify success message  
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data saved successfully.')
        })
         //click on message to close message box
         cy.get(".toast-message").click()
         cy.wait(2000)
    
    })
    
    it('can download the attched file',() => {
        //click on download button
        cy.get('[class="fas fa-download"]').eq(1).click()
    })
       
    it('vrify updated data', () => {
        //
        cy.contains("akash").invoke('text').then((text) => {
            expect(text.trim()).to.contain('akash')
            })
        //
        cy.xpath("//span[contains(text(),'8809')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('8809')
           })
        //
        cy.xpath("//span[contains(text(),'vishal')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('vishal')
            })
         //
         cy.xpath("//span[contains(text(),'hii, hello, how are you')]").invoke('text').then((text) => {
                expect(text.trim()).to.contain('hii, hello, how are you')
            })
         //
         cy.xpath("//span[contains(text(),'04/05/2022')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('04/05/2022')
            })
    
    })
    
    })

context ('Verify for delete funcationality',() => { 

it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(0).click({force:true})
    cy.wait(1000)

    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).to.contain('Record deleted successfully.!')
    })
  

})
it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(0).click({force:true})
    cy.wait(1000)

    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).to.contain('Record deleted successfully.!')
    })
  

})

})


})