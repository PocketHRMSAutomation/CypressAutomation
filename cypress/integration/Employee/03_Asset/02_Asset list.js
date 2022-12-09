
describe('Asset list page', () =>{
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
    //cy.xpath("//label[contains(text(),'Test_91764')]").click()
    //click on select button
    cy.get('#defaultCompanySave').click()
    cy.wait(2000)
})*/

var filePath1 = 'Employee/IMG-20220916-WA0049.jpg'
var filepath2 = 'sample file.pdf'
var updatedFilePath1 = 'Employee/IMG_20220812_171834.jpg'
var updatedFilePath2 = 'light bill.pdf'

beforeEach(function(){
    cy.getCookies() 
})

function DeleteRecord () {

    cy.get('.text-danger').eq(0).click({force:true});
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Asset deleted successfully.!')
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
context ('Verify asset list tab',() => {
it ('verify asset list tab is working or not',() => { 
    //click on asset list tab
    cy.get('#HR_AssetList').click()
                
    cy.contains('Asset List').invoke('text').then((text) => {
    expect(text.trim()).equal('Asset List')
    })  
})
it ('verify Add asset list button is working or not',() => { 
    
    cy.get('[class="fas fa-plus"]').eq(0).click()
    //verify asset list pop-up will open or not
    cy.contains('Update Asset').invoke('text').then((text) => {
    expect(text.trim()).equal('Update Asset')
    })  
})    
})

/*
context ('Verify validation message',() => {
it('can verify validation  message for asset category field', () => {
        //click on submit button
        cy.get('#submitbutton').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Select Asset Category !!')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
         })
}) 
it('can verify validation  message for asset name text field', () => {
    //select category
    cy.get('[id="HRComponantId"]').select('Mobile')
     //click on submit button 
     cy.get('#submitbutton').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Enter Asset Name !!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
})
it('can verify validation  message for asset tag text field', () => {
    //type asset name
    cy.get('#AssetNameId').type('samsung')
     //click on submit button
     cy.get('#submitbutton').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Enter Asset Tag !!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
})
it('can verify validation  message for model name text field', () => {
    //type asset tag
    cy.get('#AssetTagId').type('samsung')
     //click on submit button
     cy.get('#submitbutton').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Enter Model Name !!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
})
it('can verify validation  message for serial number text field', () => {
    //type model name
    cy.get('#ModelNameId').type('S20')
     //click on submit button
     cy.get('#submitbutton').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Enter Serial Number !!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
}) 
it('can verify validation  message for default location field', () => {
    //type serial number
    cy.get('#SerialNoId').type('52365236')
     //click on submit button
     cy.get('#submitbutton').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Select  Default Location !!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
      })
})
it('can verify success message', () => {
     //select location
     cy.get('#LocationId').select('Pune') 
     //click on submit button
     cy.get('#submitbutton').click() 
     cy.wait(1000)
     //close the pop-up
     cy.get('[class="close"]').eq(0).click({force:true})
     cy.wait(2000)
}) 
it('can verify duplicate record', () => {
    //click on add asset button
    cy.get('[class="fas fa-plus"]').eq(0).click()
    cy.wait(1000)
    //select category
    cy.get('#HRComponantId').select('Mobile')
    //type asset name
    cy.get('#AssetNameId').clear()
    cy.get('#AssetNameId').type('samsung')
    //type asset tag
    cy.get('#AssetTagId').clear()
    cy.get('#AssetTagId').type('samsung')
    //type model name
    cy.get('#ModelNameId').clear()
    cy.get('#ModelNameId').type('S20')
    //type serial number
    cy.get('#SerialNoId').clear()
    cy.get('#SerialNoId').type('52365236')
    //select location
    cy.get('#LocationId').select('Pune')
    //click on submit button
    cy.get('#submitbutton').click()
    //close the pop-up
    cy.get('[class="close"]').eq(0).click({force:true})    
})                                    
})
*/

context ('Verify add funcationality',() => {
it('can add record', () => {
     //click on add asset button
    cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
    cy.wait(1000)
    //cy.get('#HRComponantId').select('mouse')
    cy.get('[id="HRComponantId"]').select('mouse',{force:true})
    //type asset name
    cy.get('#AssetNameId').clear()
    cy.get('#AssetNameId').type('mouse')
     //type asset tag
     cy.get('#AssetTagId').clear()
     cy.get('#AssetTagId').type('center')
     //type model name
    cy.get('#ModelNameId').clear()
    cy.get('#ModelNameId').type('center2')
    //type serial number
    cy.get('#SerialNoId').clear()
    cy.get('#SerialNoId').type('C12345')
    //type vendor name
    cy.get('#VenderId').type('Amazon')
    //type description
    cy.get('#DescriptionId').type('dhsfkjsdhhfj')
    //select location
    cy.get('#LocationId').select('Pune')

    /*
    //attachment
    cy.wait(1000)
    cy.fixture(filePath1, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    cy.get('#FileNameId').eq(0).upload({
    fileContent,
    fileName: filePath1,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    encoding: 'utf8'
    })
    })
    //attachment
    cy.wait(1000)
    cy.fixture(filepath2, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    cy.get('#FileNameId').eq(0).upload({
    fileContent,
    fileName: filepath2,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    encoding: 'utf8'
    })
    })
    */
    //click on submit button
    cy.get('#submitbutton').click()
    cy.wait(1000) 
})/*
it('can download attached files', () => {
    cy.get('.fa-edit').eq(0).click({force:true})
     cy.wait(1000)
    //download image
    cy.get('[title="Download Image"]').click()
    //download invoice
    cy.get('[title="Download Invoice"]').click()
    //close pop-up 
    cy.get('[class="close"]').eq(0).click({force:true})

})*/
it('can veify added record', () => {
    cy.contains('mouse').invoke('text').then((text) => {
        expect(text.trim()).include("mouse")
    })   
    
    cy.contains("mouse").invoke('text').then((text) => {
        expect(text.trim()).include("mouse")
    })     
    //
    cy.contains('center2').invoke('text').then((text) => {
    expect(text.trim()).include("center2")
    })      
    //
    cy.contains('C12345').invoke('text').then((text) => {
        expect(text.trim()).include("C12345")
    })      
    //
    cy.contains('center').invoke('text').then((text) => {
        expect(text.trim()).include("center")
    })      
    //
    cy.contains('Pune').invoke('text').then((text) => {
        expect(text.trim()).include("Pune")
    }) 
    
})
})


context ('Verify edit funcationality',() => {
it('can replace old data with new data', () => {
     cy.get('.fa-edit').eq(0).click({force:true})
     cy.wait(1000)
     //type asset name
     cy.get('#AssetNameId').clear()
     cy.get('#AssetNameId').type('lenovo')
    //type asset tag
    cy.get('#AssetTagId').clear()
    cy.get('#AssetTagId').type('lenovo')
    //type model name
    cy.get('#ModelNameId').clear()
    cy.get('#ModelNameId').type('f90')
    //type serial number
    cy.get('#SerialNoId').clear()
    cy.get('#SerialNoId').type('9097987')
    //type vendor name
    cy.get('#VenderId').clear()
    cy.get('#VenderId').type('Ak suppliers')
    //type description
    cy.get('#DescriptionId').clear()
    cy.get('#DescriptionId').type('use carefully')
    //select location
    cy.get('#LocationId').select('Mumbai')
    //click on submit button
    cy.get('#submitbutton').click() 
    cy.wait(1000)
    /*

    //attachment
    cy.wait(1000)
    cy.fixture(updatedFilePath1, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    cy.get('#FileNameId').eq(0).upload({
    fileContent,
    fileName: updatedFilePath1,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    encoding: 'utf8'
    })
    })

    //attachment
    cy.wait(1000)
    cy.fixture(updatedFilePath2, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    cy.get('#FileNameId').eq(0).upload({
    fileContent,
    fileName: updatedFilePath2,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    encoding: 'utf8'
    })
    })

    */
})
    
it('can verify edited data', () => {
    //
    cy.contains('lenovo').invoke('text').then((text) => {
    expect(text.trim()).include("lenovo")
    })  
    //
    cy.contains('f90').invoke('text').then((text) => {
    expect(text.trim()).include("f90")
    })
    //
    cy.contains('9097987').invoke('text').then((text) => {
    expect(text.trim()).include("9097987")
    })    
    //
    cy.contains('Mumbai').invoke('text').then((text) => {
    expect(text.trim()).include("Mumbai")
    })
})
})


context ('Verify delete funcationality',() => {
it('can delelte record', () => {
    DeleteRecord('mobile')
    //DeleteRecord('lenovo')
})
})

context ('Asset list - Flow',() => {
    it('can add record', () => {
         //click on add asset button
        cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
        cy.wait(1000)
        //cy.get('#HRComponantId').select('mouse')
        cy.get('[id="HRComponantId"]').select('mouse',{force:true})
        //type asset name
        cy.get('#AssetNameId').clear()
        cy.get('#AssetNameId').type('mouse')
         //type asset tag
         cy.get('#AssetTagId').clear()
         cy.get('#AssetTagId').type('center')
         //type model name
        cy.get('#ModelNameId').clear()
        cy.get('#ModelNameId').type('center2')
        //type serial number
        cy.get('#SerialNoId').clear()
        cy.get('#SerialNoId').type('C12345')
        //type vendor name
        cy.get('#VenderId').type('Amazon')
        //type description
        cy.get('#DescriptionId').type('dhsfkjsdhhfj')
        //select location
        cy.get('#LocationId').select('Pune')

        /*
        //attachment
        cy.wait(1000)
        cy.fixture(filePath1, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
        cy.get('#FileNameId').eq(0).upload({
        fileContent,
        fileName: filePath1,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        encoding: 'utf8'
        })
        })
        //attachment
        cy.wait(1000)
        cy.fixture(filepath2, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
        cy.get('#FileNameId').eq(0).upload({
        fileContent,
        fileName: filepath2,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        encoding: 'utf8'
        })
        })
        */
        //click on submit button
        cy.get('#submitbutton').click()
        cy.wait(1000) 
    })
    it('can add record', () => {
        //click on add asset button
       cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
       cy.wait(1000)
       //cy.get('#HRComponantId').select('mouse')
       cy.get('[id="HRComponantId"]').select('Mobile',{force:true})
       //type asset name
       cy.get('#AssetNameId').clear()
       cy.get('#AssetNameId').type('Mobile')
        //type asset tag
        cy.get('#AssetTagId').clear()
        cy.get('#AssetTagId').type('center')
        //type model name
       cy.get('#ModelNameId').clear()
       cy.get('#ModelNameId').type('center2')
       //type serial number
       cy.get('#SerialNoId').clear()
       cy.get('#SerialNoId').type('C12345')
       //type vendor name
       cy.get('#VenderId').type('Amazon')
       //type description
       cy.get('#DescriptionId').type('dhsfkjsdhhfj')
       //select location
       cy.get('#LocationId').select('Pune')

       /*
       //attachment
       cy.wait(1000)
        cy.fixture(filePath1, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
        cy.get('#FileNameId').eq(0).upload({
        fileContent,
        fileName: filePath1,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        encoding: 'utf8'
        })
        })
       //attachment
       cy.wait(1000)
       cy.fixture(filepath2, 'binary')
       .then(Cypress.Blob.binaryStringToBlob)
       .then(fileContent => {
       cy.get('#FileNameId').eq(0).upload({
       fileContent,
       fileName: filepath2,
       mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       encoding: 'utf8'
       })
       })
       */
       //click on submit button
       cy.get('#submitbutton').click()
       cy.wait(1000) 
   })
})
})
