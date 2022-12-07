describe('Asset info page', () =>{
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

beforeEach(function(){
    cy.getCookies()
})
it('Login to Cloud & select Company', function() {
    cy.login()
    cy.changeCompany();
})

function DeleteRecord () {

    cy.get('.text-danger').eq(0).click({force:true});
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Deleted Successfully !')
    })	
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
}


it ('can select settings',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on setting tab
    cy.get('[src="/assets/images/icons/4.png"]').eq(0).click()
    //cy.contains('Settings').click({force:true})
    //cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()

    cy.get('[class="col-md-5"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Settings')
    })
    cy.wait(1000)
    //cick on HR tab
    cy.get('[class="top-nav hr"]').click()

    cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
        expect(text.trim()).equal('HR')
    }) 
})
context ('Verify asset info tab',() => {
it ('verify asset info tab is working or not',() => { 
            //click on asset info tab
    cy.get('#HR_AssetInfo').click()
                
    cy.contains('Asset Info').invoke('text').then((text) => {
    expect(text.trim()).equal('Asset Info')
    })  
})
it ('verify Add asset info button is working or not',() => { 
    
    cy.get('[class="fas fa-plus"]').eq(0).click()
    //verify asset info pop-up will open or not
    cy.contains('Asset Info').invoke('text').then((text) => {
    expect(text.trim()).equal('Asset Info')
    })  
})    
})


context ('Verify validation message',() => {
it('can verify validation  message for title text field', () => {
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Enter Title')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })
})
it('can verify validation  message for title text field using invalid data', () => {
    //type numbers inside title text field
    cy.get('#hrTitle').type(12345)
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Only numbers are not allowed !!')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })
})
it('can verify validation  message for notification email text field', () => {
    cy.get('#hrTitle').clear()
    cy.get('#hrTitle').type('keyboard')
    //put invalid data inside notificatio email text field
    cy.get('#NotificationEmailId').type('12@#')
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Invalid Email Address :- 12@#')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })
     //
     cy.get('#hrTitle').clear()
     cy.get('#hrTitle').type('laptop')
     cy.get('#NotificationEmailId').clear()
     cy.get('#NotificationEmailId').type('akashavhad898@gmail.com')
     //click on save button
     cy.get('#btnSubmit').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Record Saved Successfully !')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
})
it('can verify validation  message for duplicate record', () => {
    //click on add button
    cy.get('[class="fas fa-plus"]').eq(0).click()
    //
    cy.get('#hrTitle').clear()
    cy.get('#hrTitle').type('laptop')
    cy.get('#NotificationEmailId').clear()
    cy.get('#NotificationEmailId').type('akashavhad898@gmail.com')
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('HR Component already exists.!')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })

})
})


context ('Verify add funcationality',() => {
it('can verify validation  message for title text field', () => {
    cy.get('#hrTitle').clear()
    cy.get('#hrTitle').type('keyboard')
    cy.get('#NotificationEmailId').clear()
    cy.get('#NotificationEmailId').type('akashavhad234@gmail.com')
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Record Saved Successfully !')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })
    
})
it('can verify added fields', () => {
    cy.contains('keyboard').invoke('text').then((text) => {
        expect(text.trim()).include("keyboard")
    }) 
    //
    cy.contains(' akashavhad234@gmail.com').invoke('text').then((text) => {
        expect(text.trim()).include("akashavhad234@gmail.com")
    })   
})
})


context ('Verify edit funcationality',() => {
it('can replace previous data with new data', () => {
    //click on edit button
    cy.get('.fa-edit').eq(0).click()
    //update all data
    cy.get('#hrTitle').clear()
    cy.get('#hrTitle').type('dongle')
    cy.get('#NotificationEmailId').clear()
    cy.get('#NotificationEmailId').type('akash0101@gmail.com')
    //click on save button
    cy.get('#btnSubmit').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Record Saved Successfully !')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
     })
})
it('can verify edited data', () => {
    cy.contains('dongle').invoke('text').then((text) => {
        expect(text.trim()).include("dongle")
    }) 
    //
    cy.contains('akash0101@gmail.com').invoke('text').then((text) => {
        expect(text.trim()).include("akash0101@gmail.com")
    })   
})
})


context ('Verify delete funcationality',() => {
it('can delete record', () => {
    DeleteRecord('dongle')
    cy.wait(1000)
    DeleteRecord('keyboard')
})
})

context ('Asset info - flow',() => {

    it('can verify validation  message for title text field', () => {
        //click on add button
        cy.get('[class="fas fa-plus"]').eq(0).click()
        //
        cy.get('#hrTitle').clear()
        cy.get('#hrTitle').type('keyboard')
        cy.get('#NotificationEmailId').clear()
        cy.get('#NotificationEmailId').type('akashavhad234@gmail.com')
        //click on save button
        cy.get('#btnSubmit').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Saved Successfully !')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
        })
    })
    it('can verify validation  message for title text field', () => {
        //click on add button
        cy.get('[class="fas fa-plus"]').eq(0).click()
        //
        cy.get('#hrTitle').clear()
        cy.get('#hrTitle').type('mouse')
        cy.get('#NotificationEmailId').clear()
        cy.get('#NotificationEmailId').type('akavhad1000@gmail.com')
        //click on save button
        cy.get('#btnSubmit').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Saved Successfully !')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
        })
    })
    it('can verify validation  message for title text field', () => {
        //click on add button
        cy.get('[class="fas fa-plus"]').eq(0).click()
        //
        cy.get('#hrTitle').clear()
        cy.get('#hrTitle').type('Mobile')
        cy.get('#NotificationEmailId').clear()
        cy.get('#NotificationEmailId').type('akashavhad898@gmail.com')
        //click on save button
        cy.get('#btnSubmit').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Saved Successfully !')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
        })
    })
})
})