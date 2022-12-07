describe('Field creation page', () =>{
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

function DeleteRecord () {

    cy.get('.text-danger').eq(0).click({force:true});
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Records Deleted Successfully!!!')
    })	
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
}

it('Login to Cloud & select Company', function() {
    cy.login()
    cy.changeCompany();
})


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
context ('Verify field creation tab',() => {
it ('verify field creation tab is working or not',() => { 
        //click on category tab
        cy.get('#HR_FieldCreation').click()
            
        cy.contains('Field Creation').invoke('text').then((text) => {
            expect(text.trim()).equal('Field Creation')
            })  
})
it ('verify Add report builder form button is working or not',() => { 

        cy.get('[class="fa fa-plus"]').eq(0).click()
})    
})


context ('Verify validation message',() => {
it('can verify validation  message for field name', () => {
    //click on create button
       cy.get('#sbtBtn').click()
     //verify validation message
      cy.get(".toast-message").invoke('text').then((text) => {
      expect(text.trim()).equal('Enter Field Name')
      //click on message to close message box
       cy.get(".toast-message").click()
        cy.wait(2000)   
      })

      //Add Records
      cy.get('[id="ModuleId"]').eq(0).select('Travel')
      cy.get('#FieldName').type('VENUE')
      cy.get('[name="FieldType"]').select('DropDown')
      cy.get('#LabelName').type('venue')
      cy.get('[id="FieldValue"]').type('goa, mumbai , pune')
      cy.get('#PanelName').type('traveling')
      cy.get('#Order').type('3')
      //click on reate button
      cy.get('#sbtBtn').click()
      //verify succes message
      cy.get(".toast-message").invoke('text').then((text) => {
          expect(text.trim()).equal('Data Save Successfully..')
          //click on message to close message box
           cy.get(".toast-message").click()
            cy.wait(2000)   
          })
})
it('can verify validatio message for duplicate data', () => {
    //click on add button
    cy.get('[class="fa fa-plus"]').eq(0).click()
    //
    cy.get('[id="ModuleId"]').eq(0).select('Travel')
    cy.get('#FieldName').type('VENUE')
    cy.get('[name="FieldType"]').select('DropDown')
    cy.get('#LabelName').type('venue')
    cy.get('[id="FieldValue"]').type('goa, mumbai , pune')
    cy.get('#PanelName').type('traveling')
    cy.get('#Order').type('3')
    //click on reate button
    cy.get('#sbtBtn').click()
    //verify succes message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Duplicate Field Name.Please Enter Another Field Name')
        //click on message to close message box
         cy.get(".toast-message").click()
          cy.wait(2000)   
        })
     //click on cose button
	 cy.get('[class="close"]').eq(0).click()
})
})


context ('Verify add funcationality',() => {
it('can add all fields', () => {
    //click on add button
    cy.get('[class="fa fa-plus"]').eq(0).click()
    //
    cy.get('[id="ModuleId"]').eq(0).select('Health')
    cy.get('#FieldName').clear()
    cy.get('#FieldName').type('jhfj')
    cy.get('[name="FieldType"]').select('Text')
    cy.get('#LabelName').clear()
    cy.get('#LabelName').type('kdfjlks')
    cy.get('#PanelName').clear()
    cy.get('#PanelName').type('portrer')
    cy.get('#Order').clear()
    cy.get('#Order').type('23')
    //click on reate button
    cy.get('#sbtBtn').click()
    //verify succes message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Save Successfully..')
        //click on message to close message box
         cy.get(".toast-message").click()
          cy.wait(2000)   
        })
})
it('can verify added fields', () => {
    cy.contains('Field Name - JHFJ ').invoke('text').then((text) => {
        expect(text.trim()).include("Field Name - JHF")
    })  
    //
    cy.contains('Field Type -Text').invoke('text').then((text) => {
        expect(text.trim()).include("Field Type -Text")
    })  
    //
    //cy.contains('Field Size   -goa, mumbai , pune').invoke('text').then((text) => {
        //expect(text.trim()).include("Field Size   -goa, mumbai , pune")
    //})  
    //
    cy.contains('Label Name -kdfjlks').invoke('text').then((text) => {
        expect(text.trim()).include("Label Name -kdfjlks")
    })  
    //
    cy.contains('Panel Name- portrer').invoke('text').then((text) => {
        expect(text.trim()).include("Panel Name- portrer")
    })  
    //
    cy.contains('IsMandatory- False').invoke('text').then((text) => {
        expect(text.trim()).include("IsMandatory- False")
    })  
    //
    cy.contains('Order- 23').invoke('text').then((text) => {
        expect(text.trim()).include("Order- 23")
    })  

})
})


context ('Verify edit funcationality',() => {
it('can replace old data with new data', () => {
    //click on edit button
    cy.get('.fa-edit').eq(1).click()
    //edit all fields
    cy.get('[id="ModuleId"]').eq(0).select('Health')
    cy.get('#FieldName').clear()
    cy.get('#FieldName').type('life insurance')
    cy.get('[name="FieldType"]').select('Text')
    cy.get('#LabelName').clear()
    cy.get('#LabelName').type('life insurance')
    cy.get('#PanelName').clear()
    cy.get('#PanelName').type('insurance')
    cy.get('#Order').clear()
    cy.get('#Order').type('4')
    //click on update button
    cy.get('#upBtn').click()
    //verify succes message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Record Updated Successfully')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
    })
})
it('can verify edited fields', () => {
    cy.contains('Field Name - life insurance').invoke('text').then((text) => {
        expect(text.trim()).include("Field Name - life insurance")
    })  
    //
    cy.contains('Field Type -Text').invoke('text').then((text) => {
        expect(text.trim()).include("Field Type -Text")
    })  
    //
    cy.contains('Label Name -life insurance').invoke('text').then((text) => {
        expect(text.trim()).include("Label Name -life insurance")
    })  
    //
    cy.contains('Panel Name- insurance').invoke('text').then((text) => {
        expect(text.trim()).include("Panel Name- insurance")
    })  
    //
    cy.contains('IsMandatory- False').invoke('text').then((text) => {
        expect(text.trim()).include("IsMandatory- False")
    })  
    //
    cy.contains('Order- 4').invoke('text').then((text) => {
        expect(text.trim()).include("Order- 4")
    })  

})    
})

context ('Verify delete funcationality',() => {
it('can delete one record', () => {
    DeleteRecord('venue')
    cy.wait(1000)
    DeleteRecord('Health')
})
})

context ('field creation - Flow',() => {
    it('can replace old data with new data', () => {
        //click on add button
        cy.get('[class="fa fa-plus"]').eq(0).click()
    //
        cy.get('[id="ModuleId"]').eq(0).select('Health')
        cy.get('#FieldName').clear()
        cy.get('#FieldName').type('life insurance')
        cy.get('[name="FieldType"]').select('Text')
        cy.get('#LabelName').clear()
        cy.get('#LabelName').type('life insurance')
        cy.get('#PanelName').clear()
        cy.get('#PanelName').type('insurance')
        cy.get('#Order').clear()
        cy.get('#Order').type('4')
        //click on update button
        cy.get('#sbtBtn').click()
        //verify succes message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Save Successfully..')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
        })
    })
})
})