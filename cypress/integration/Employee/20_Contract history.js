describe('20_Contract history', () =>{
    /*
    beforeEach(() => {
          
            window.console.log('Enter the beforeEach function')
            Cypress.on('uncaught:exception', (err,runnable) => {
                    return false;   
            });
    
            //Cloud
            Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','1P_JAR','ARRAffinity','XName','XUserId','ai_session')
    
            //ESS
            Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category',
            'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken',
            '__tawkuuid', '_gcl_au')
    
            //Asure
            Cypress.Cookies.preserveOnce( 'ARRAffinity', '.AspNetCore.Session','.AspNetCore.Antiforgery.w5W7x28NAIs')
    
            //New ESS
            Cypress.Cookies.preserveOnce('EnterPriseCompanies', '.AspNetCore.Antiforgery.9fXoN5jHCXs', 'IsEnterPrise','cloudUsername','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXpEmail','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XSchemaName','XUserName','_ga','_gid','ai_user','new_username','GetLicenseData')
    
    })
    it('can visit login page', () => {    
        cy.visit('https://pockethrmsnext.azurewebsites.net/')
        //cy.visit('https://cloud.pockethrms.com/')   
    })
    it('can add username and password', () => {
        //enter email id
        cy.get('#Email').type('nileshgajare@live.com')
        //enter password
        cy.get('#Password').type('123456')
        //click on submit button
        cy.get('[type="submit"]').click()
    })
    it ('can select company',() =>{
        //click on right side to select company 
        cy.get('.breadcrumb-item').click()
        //click on company name radio button
        cy.xpath ("//label[contains(text(),'Akash Testing Company')]") .click()
        //click on select button
        cy.get('#defaultCompanySave').click()
        cy.wait(2000)
    })*/
    
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
    
    context ('Verify Academic details tab',() => {
    it ('verify Medical Academic details tab is working or not',() => { 
        //click on Medical Academic details tab
        cy.get("#contracthistoryTab").click()
        /*             
        cy.contains('Medical Academic Details').invoke('text').then((text) => {
        expect(text.trim()).equal('Medical Academic Details')
        })  */
    })
    it ('verify Add Academic details button is working or not',() => { 
            
        cy.get('[title="Add Contract"]').eq(0).click({force:true})
        cy.get('[title="Add Contract"]').eq(0).click({force:true})
        //verify asset list pop-up will open or not
        cy.contains('Add Contract').invoke('text').then((text) => {
        expect(text.trim()).equal('Add Contract')
        })  
    })    
    })

    context ('Verify all validation messages',() => {
        //mandatory fields
    it('verify valdation massage for select start date', () => {
        //click on save button
        cy.get('#btnProcess').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Start Date!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
           
    })
    it('verify valdation massage for select end date', () => {
        //Enter start date
        cy.get('#startDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2022')
        })
        //click on save button
        cy.get('#btnProcess').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select End Date!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
           
    })
    it('verify valdation massage for remark', () => {
        //Enter start date
        cy.get('#endDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/03/2022')
        })
        //click on save button
        cy.get('#btnProcess').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Remarks!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
           
    })
    it('verify valdation massage for invalid date', () => {
        //
        cy.get('#Remarks').type('jfhg')
        //click on save button
        cy.get('#btnProcess').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Start Date cannot be  greater than End Date')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
           
    })
    it('verify valdation massage for remark', () => {
        //Enter End date
        cy.get('#endDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/06/2022')
        })
        //click on save button
        cy.get('#btnProcess').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Start Date Should be same as DOJ')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    
})

context ('Verify Add funcationality',() => {
it('Can add records', () => {
    
     //Enter start date
     cy.get('#startDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('23/05/2022')
        })
        cy.wait(2000)

     //Enter End date
     cy.get('[class="modal-header"]').eq(0).click()
     cy.get('[class="modal-header"]').eq(0).click()

     cy.get('#endDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/06/2025')
        })
        cy.wait(2000)

     //Add remark
     cy.get('[class="modal-header"]').eq(0).click()
     cy.get('[class="modal-header"]').eq(0).click()

     cy.get('#Remarks').clear()
     cy.get('#Remarks').type('Bond period')

      //click on save button
      cy.get('#btnProcess').click()
      //submit blank form and verify validation message
      cy.get(".toast-message").invoke('text').then((text) => {
      expect(text.trim()).equal('Contract Saved successfully.!')
      })
      //click on message to close message box
      cy.get(".toast-message").click()
})
it('Can verify added records', () => {
     //
     cy.xpath("//span[contains(text(),'04/06/2025')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('04/06/2025')
        })
     //
     cy.xpath("//td[contains(text(),'Bond period')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Bond period')
        })
      //
      cy.contains("23/05/2022").invoke('text').then((text) => {
        expect(text.trim()).to.contain('23/05/2022')
        })
})
})

context ('Verify edit funcationality',() => {
it('Can edit records', () => {
    cy.contains('Edit').click()
    //
    cy.get('#endDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/06/2026')
        })
        cy.wait(2000)

     //Add remark
     cy.get('[class="modal-header"]').eq(0).click()
     cy.get('[class="modal-header"]').eq(0).click()

     cy.get('#Remarks').clear()
     cy.get('#Remarks').type('4 years Bond period')

      //click on save button
      cy.get('#btnEdit').click()
      //submit blank form and verify validation message
      cy.get(".toast-message").invoke('text').then((text) => {
      expect(text.trim()).equal('Record edited successfully.!')
      })
      //click on message to close message box
      cy.get(".toast-message").click()
})
it('Can verify edited records', () => {
    //
    cy.xpath("//span[contains(text(),'04/06/2026')]").invoke('text').then((text) => {
       expect(text.trim()).to.contain('04/06/2026')
       })
    //
    cy.xpath("//td[contains(text(),'Bond period')]").invoke('text').then((text) => {
       expect(text.trim()).to.contain('4 years Bond period')
       })
    
})
})

context ('Verify delete funcationality',() => {
    it('can delete records', () => {
        //click on delete button
        cy.get('.btn-danger').eq(0).click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Record deleted successfully.!')
            })
            //click on message to close message box
            cy.get(".toast-message").click()
    })
    })
})