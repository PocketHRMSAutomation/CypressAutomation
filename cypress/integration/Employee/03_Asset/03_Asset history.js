
describe('appreciation page', () =>{
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


it ('can select empoloyee',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on empoloyee tab
    cy.get('[data-name="Employee"]').click()
    //click on employee list
    cy.get('[data-link="/Employee/Employee/EmployeeList"]').click()
    //click on 1st employee name
    cy.get('[title="Mohan Mithun Mane"]').click()
    cy.wait(2000)
})

context ('Verify Asset history tab',() => {
it('To check Asset history tab is working propely or not',() => {
    cy.get('#Profile_AssetHistory').click()
    cy.get('#Profile_AssetHistory').click()
    cy.wait(4000)
})
it('To check Assigned asset to employee button is working propely or not',() => {
    //cy.get('[title="Assign Asset To Employee"]').eq(0).click({force:true})
    cy.get('[class="fas fa-plus"]').eq(0).click()
    //cy.xpath('//body/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]/div[1]/div[2]/span[1]/i[1]').click()
    //verify assign asset pop-up will open or not
    cy.wait(5000)
})
})

context ('Verify validation message',() => {
/*it('can verify validation meessage for select asset name',() => {
    //
    cy.xpath("//button[@id='btnSbmtAssignAsset']").click({force:true})
    //cy.get('#btnSbmtAssignAsset').eq(0).click({force:true})
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Select Asset Name !!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})*/

it('can verify validation meessage for Enter Any Notes',() => {
    //
   // cy.get('[id="HRComponantId"]').click()
   cy.get('[id="HRComponantId"]').select('mouse',{force:true})
   //cy.xpath("//select[@id='HRComponantId']").select('mouse',{force:true})
    //cy.get('[onchange="getAssetByComponent()"]').eq(0).select('Mobile')
    cy.wait(6000)
    //click on submit button
    cy.get('#btnSbmtAssignAsset').eq(0).click()
    //verify validation mesage 
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Any Notes !!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    //close pop-up
    //cy.get('[class="close"]').click({force:true})
})
})

context ('Verify add funcationality',() => {
    it('can add data inside all fieldls',() => {
        //cy.get('[id="HRComponantId"]').select('mouse',{force:true})
        cy.wait(1000)
        cy.get('#NotesId').eq(0).type('please dfkjs')
        //click on submit button
        cy.get('#btnSbmtAssignAsset').eq(0).click()
        cy.wait(1000)
        /*verify success message  
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Saved Successfully !!')
         })
        //click on message to close message box
        cy.get(".toast-message").click()*/
        cy.wait(5000)
    })
    it('can verify release button is properlyworkong or not', () => {
    //release asset from employee
    cy.get('.btn-dark').click()
    cy.wait(2000)
    //
    //cy.get('#txtReleaseAssetName').type('lenovo',{force:true})
    //click on release button
    cy.get('#ReleaseNotesId').type('all assets are recevie in proper condition')
    //click on submit button
    cy.get('#btnSbmt').click()
    cy.wait(2000)
    /*verify success message  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Asset Released successfully.')
         })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)*/

    })
})
})