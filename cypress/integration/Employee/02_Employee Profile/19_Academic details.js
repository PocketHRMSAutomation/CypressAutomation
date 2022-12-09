describe('Academic Details page', () =>{
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
        cy.get("#Profile_AcademicDetails").click()
        /*             
        cy.contains('Medical Academic Details').invoke('text').then((text) => {
        expect(text.trim()).equal('Medical Academic Details')
        })  */
    })
    it ('verify Add Academic details button is working or not',() => { 
            
        cy.get('[title="Add Academic Details"]').eq(0).click({force:true})
        //verify asset list pop-up will open or not
        cy.contains('Add Academic Details').invoke('text').then((text) => {
        expect(text.trim()).equal('Add Academic Details')
        })  
    })    
    })

    context ('Verify all validation messages',() => {
        //mandatory fields
    it('verify valdation massage for Enter Degree name', () => {
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Degree Name')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
           
    })

    it('verify valdation massage for institute name', () => {
        //type degree diploma name in that text field
        //cy.get('#DegreeName').clear()
        cy.get('#DegreeName').type('BE')
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Enter Institution Name')
        })
        //click on message to close message box
        cy.get(".toast-message").click()  
    })
    it('verify valdation massage for Enter board/university name', () => {
        cy.get('#InstitutionName').type('D Y Patil')
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Board/Universit Name')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    it('verify valdation massage for Enter stream name', () => {
        cy.get('#BoardUniversityName').type('Pune university')
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Stream Name')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    it('verify valdation massage for invalid year of passing', () => {
        cy.get('#Stream').type('mechanical')
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get("#YearOfPassing-error").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Valid Year')
        })
        
    })
    it('verify success message', () => {
        //
        cy.get('#YearOfPassing').clear()
        cy.get('#YearOfPassing').type('2021')
        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Records Added Successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    
})
context ('Verify add funcationality',() => {
    it('Can add records', () => {
        //click on add academic details button
        cy.get('.fa-user-plus').eq(0).click({force:true})
        
        //
        cy.get('#DegreeName').type('BEe')
        //
        cy.get('#YearOfPassing').type('2010')
        //
        cy.get('#InstitutionName').type('D Y Patilkk')
        //
        cy.get('#BoardUniversityName').type('Pune universitykk')
        //
        cy.get('#Stream').type('mechanicalkk')

        //click on save button
        cy.get('#btnCreate').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Records Added Successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    it('verify aded records', () => {
        //
        cy.xpath("//h5[contains(text(),'BEe')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('BEe')
        })
        //
        cy.xpath("//span[contains(text(),'mechanicalkk')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('mechanicalkk')
        })
        //
        cy.xpath("//span[contains(text(),'D Y Patilkk')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('D Y Patilkk')
        })
        //
        cy.xpath("//span[contains(text(),'Pune universitykk')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Pune universitykk')
        })
        //
        cy.xpath("//span[contains(text(),'2010')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('2010')
        })
    })
    
})

context ('Verify edit funcationality',() => {
    it('Can edit records', () => {
        //click on edit academic details button
        cy.get('.fa-edit').eq(1).click()
        
        //
        cy.get('#DegreeName').clear()
        cy.get('#DegreeName').type('Engineering')
        //
        cy.get('#YearOfPassing').clear()
        cy.get('#YearOfPassing').type('2022')
        //
        cy.get('#InstitutionName').clear()
        cy.get('#InstitutionName').type('D Y Patil university')
        //
        cy.get('#BoardUniversityName').clear()
        cy.get('#BoardUniversityName').type('Mumbai university')
        //
        cy.get('#Stream').clear()
        cy.get('#Stream').type('Civil')

        //click on save button
        cy.get('#btnCreateup').click()
        //submit blank form and verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Records Updated Successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })
    it('verify edited records', () => {
        //
        cy.xpath("//h5[contains(text(),'Engineering')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Engineering')
        })
        //
        cy.xpath("//span[contains(text(),'D Y Patil university')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('D Y Patil university')
        })
        //
        cy.xpath("//span[contains(text(),'Mumbai university')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Mumbai university')
        })
        //
        cy.xpath("//span[contains(text(),'Civil')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Civil')
        })
        //
        cy.xpath("//span[contains(text(),'2022')]").invoke('text').then((text) => {
        expect(text.trim()).to.contain('2022')
        })
    })

})

context ('Verify delete funcationality',() => {
it('can delete records', () => {
    //click on delete button
    cy.get('.text-danger').eq(0).click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Deleted Successfully.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
})
})
})