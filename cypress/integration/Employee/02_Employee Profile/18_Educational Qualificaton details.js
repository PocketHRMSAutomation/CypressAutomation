describe('18_Educational Qualificaton details', () =>{
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

context ('Verify Education/Qualification details tab',() => {
it ('verify Education/Qualification details tab is working or not',() => { 
    //click on Medical Academic details tab
    cy.xpath("//li[@id='Profile_Education/QualificationDetails']").click()
    /*             
    cy.contains('Medical Academic Details').invoke('text').then((text) => {
    expect(text.trim()).equal('Medical Academic Details')
    })  */
})
it ('verify Add Education/Qualification button is working or not',() => { 
        
    cy.get('[title=" Add Education/Qualification Details"]').click({force:true})
    cy.wait(1000)
    //verify asset list pop-up will open or not
    cy.contains('Add Education/Qualification Details').invoke('text').then((text) => {
    expect(text.trim()).equal('Add Education/Qualification Details')
    })  
})    
})

context ('Verify all validation messages',() => {
//mandatory fields
it('verify valdation massage for Enter Degree/Diploma name', () => {
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Degree/Diploma Name')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()
   
})
it('verify valdation massage for Enter subject', () => {
    //type degree diploma name in that text field
    //cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('BE')
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Subject')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for Enter Board/Univerisity name', () => {
    //type dsubject in that text field
    cy.get('#Stream').clear()
    cy.get('#Stream').type('mechanical')
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Board/UniversityName')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for Enter from date', () => {
    //type board university namet in that text field
    cy.get('#BoardUniversityName').clear()
    cy.get('#BoardUniversityName').type('Pune university')
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter From Date')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for Enter to date', () => {
    //type from date in that text field
    cy.get('#FromDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2018')
        })
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter To Date')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click() 
    cy.wait(1000) 
})
it('verify success massage ', () => {
    //type to date in that text field
    cy.get('#ToDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2021')
        })
        cy.wait(2000)
    //click on save button
    cy.get('[onclick="checkForm(this)"]').click({force:true})
    cy.get(1000)

    cy.get('#profile_detail_tab').click()
    cy.wait(4000)
    //
    cy.xpath("//li[@id='Profile_Education/QualificationDetails']").click()
    //cy.xpath("//li[@id='Profile_Education/QualificationDetails']").click()
    //cy.xpath("//li[@id='Profile_Education/QualificationDetails']").click()
    cy.wait(1000)

    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Save successfully')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
    cy.wait(1000)
})
//invalid data
it('verify valdation massage for Enter invalid Degree/Diploma name', () => {
    //click on Add Medical Academic Details
    cy.get('[class="fas fa-user-plus"]').eq(0).click()
    //type degree diploma name in that text field
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('12')
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Degree/Diploma Name only!')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})

it('verify valdation massage for Enter invalid Subject', () => {
    //type subject name in that text field
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('jgf')
    //
    cy.get('#Stream').clear()
    cy.get('#Stream').type('13')
    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Subject only!')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for Enter invalid Board/University name ', () => {
    //type subject name in that text field
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('jgf')
    //
    cy.get('#Stream').clear()
    cy.get('#Stream').type('gdft')
    //
    cy.get('#BoardUniversityName').clear()
    cy.get('#BoardUniversityName').type('15')

    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Board/UniversityName only!')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for duplicate records', () => {
    //type subject name in that text field
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('jgf')
    //
    cy.get('#Stream').clear()
    cy.get('#Stream').type('gdft')
    //
    cy.get('#BoardUniversityName').clear()
    cy.get('#BoardUniversityName').type('jhduy')

    //type from date in that text field
    cy.get('#FromDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2018')
        })
    //type to date in that text field
    cy.get('#ToDate').click({force:true}).then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2021')
        })

    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Education /  Qualification Details is present for this period')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
/*
it('verify valdation massage for invalid date range', () => {
     //type from date in that text field
     cy.get('#FromDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/05/2012')
        })
    //type to date in that text field
    cy.get('#ToDate').click({force:true}).then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2011')
        })
        
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Invalid range !!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.get(".toast-message").click()
    cy.get(".toast-message").click()
    cy.wait(10000)        
})
*/
it('verify valdation massage for Invalid Division', () => {
    //type subject name in that text field
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('jgghf')
    //
    cy.get('#Stream').clear()
    cy.get('#Stream').type('gdf')
    //
    cy.get('#BoardUniversityName').clear()
    cy.get('#BoardUniversityName').type('jhuy')

    //type from date in that text field
    cy.get('#FromDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2018')
        })
    //type to date in that text field
    cy.get('#ToDate').click({force:true}).then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2020')
        })
     //
     //cy.get('#Grade_Class').clear()
     cy.get('#Grade_Class').type('102',{force:true})    

    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Division only!')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()  
})
it('verify valdation massage for invalid percentage', () => {
    //put invalid percentage
    cy.get('#Percentage').type('102',{force:true})
     //click on save button
     cy.get('#btnCreate').click()
     //submit blank form and verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
         expect(text.trim()).equal('Enter Percentage only!')
     })
     cy.wait(1000)
     //click on message to close message box
     cy.get(".toast-message").click() 
 })
it('verify valdation massage for invalid Area Of Specialization', () => {
    //
    cy.get('#Specialization').type('123',{force:true})

    //click on save button
    cy.get('#btnCreate').click()
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Specialization only!')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()
    
    //close pop-up
    cy.get('[class="close"]').eq(0).click({force:true})
    cy.wait(1000)
})
})

context ('Verify Add Funcationality',() => {
it('Add Data in all fields', () => {
     //click on Add Medical Academic Details
     cy.get('[class="fas fa-user-plus"]').eq(0).click()
    //
    cy.get('#DegreeName').clear()
    cy.get('#DegreeName').type('Bchelor Of Engineering')
    //
    cy.get('#Stream').clear()
    cy.get('#Stream').type('Civil')
    //
    cy.get('#BoardUniversityName').clear()
    cy.get('#BoardUniversityName').type('Mumbai University')

    //type from date in that text field
    cy.get('#FromDate').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2015')
        })
    //type to date in that text field
    cy.get('#ToDate').click({force:true}).then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/04/2016')
        })

    //ADD PERCENTAGE
    cy.get('#Percentage').type('95',{force:true})

    //type division in this field
    //cy.get('#Grade_Class').clear()
    cy.get('#Grade_Class').type('Mumbai',{force:true})

    //type Area Of specialization
    cy.get('#Specialization').type('engineering',{force:true})

    //type remark in this text field
    cy.get('#Remarks').type('best university 12345',{force:true})

    //click on radio button
    cy.get('#Option2').click({force:true})

    //Attached file
    cy.fixture(filePath, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
    //cy.xpath("//input[@id='File']").upload({
    cy.get("#filemedical").upload({
    fileContent,
    fileName: filePath,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    encoding: 'utf8'
    })
    })
    //click on save button
    cy.get('#btnCreate').click()
    cy.wait(1000)
    //submit blank form and verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data Save successfully')
    })
    cy.wait(1000)
    //click on message to close message box
    cy.get(".toast-message").click()
})
it('verify Added Data in all fields', () => {
    //
    cy.xpath("//span[contains(text(),'Bchelor Of Engineering')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Bchelor Of Engineering')
    })
    //
    cy.xpath("//span[contains(text(),'Civil')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Civil')
    })
    //
    cy.xpath("//span[contains(text(),'Mumbai University')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Mumbai University')
    })
    //
    cy.xpath("//span[contains(text(),'Mumbai')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Mumbai')
    })
    //
    cy.xpath("//span[contains(text(),'NO')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('NO')
    })
    //
    cy.xpath("//span[contains(text(),'engineering')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('engineering')
    })
    //
    cy.get('[title=" From Date - To Date : 04/04/2015- 04/04/2016 "]').invoke('text').then((text) => {
    expect(text.trim()).to.contain('04/04/2015- 04/04/2016')
    })
    //
    cy.xpath("//span[contains(text(),'1 Year 1 Day')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('1 Year 1 Day')
    })
    //
    cy.xpath("//span[contains(text(),'best university 12345')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('best university 12345')
    })
    //download attached file
    //cy.get('[class="fa fa-download"]').eq(0).click({force:true})
})
})

context ('Verify Edit Funcationality',() => {
it('update previous data with the new data', () => {
    //click on Add Medical Academic Details
    cy.get('.fa-edit').eq(0).click()
   //
   cy.get('#DegreeName').clear()
   cy.get('#DegreeName').type('Bchelor Of Engg')
   //
   cy.get('#Stream').clear()
   cy.get('#Stream').type('Automobile')
   //
   cy.get('#BoardUniversityName').clear()
   cy.get('#BoardUniversityName').type('banglore University')

   //type from date in that text field
   cy.get('#FromDate').click().then(input =>
       { input[0].dispatchEvent(new Event('input', {
       bubbles: true }))
       input.val('04/04/2010')
       })
   //type to date in that text field
   cy.get('#ToDate').click({force:true}).then(input =>
       { input[0].dispatchEvent(new Event('input', {
       bubbles: true }))
       input.val('04/04/2012')
       })

   //type division in this field
   cy.get('#Grade_Class').clear({force:true})
   cy.get('#Grade_Class').type('banglore',{force:true})

   //type Area Of specialization
   cy.get('#Specialization').clear({force:true})
   cy.get('#Specialization').type('engg',{force:true})

   //type remark in this text field
   cy.get('#Remarks').clear({force:true})
   cy.get('#Remarks').type('best university 54321',{force:true})

   //click on radio button
   cy.get('#Option2').click({force:true})

   //Attached file
   cy.fixture(updatedFilePath, 'binary')
   .then(Cypress.Blob.binaryStringToBlob)
   .then(fileContent => {
   //cy.xpath("//input[@id='File']").upload({
   cy.get("#filemedical").upload({
   fileContent,
   fileName: updatedFilePath,
   mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
   encoding: 'utf8'
   })
   })

   //click on save button
   cy.get('#btnCreate').click()
   //submit blank form and verify validation message
   cy.get(".toast-message").invoke('text').then((text) => {
       expect(text.trim()).equal('Data Save successfully')
   })
   //click on message to close message box
   cy.get(".toast-message").click()
})
it('verify updated Data in all fields', () => {
    //
    cy.xpath("//span[contains(text(),'Bchelor Of Engg')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Bchelor Of Engg')
    })
    //
    cy.xpath("//span[contains(text(),'Automobile')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Automobile')
    })
    //
    cy.xpath("//span[contains(text(),'banglore University')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('banglore University')
    })
    //
    cy.xpath("//span[contains(text(),'banglore')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('banglore')
    })
    //
    cy.xpath("//span[contains(text(),'NO')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('NO')
    })
    //
    cy.xpath("//span[contains(text(),'engg')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('engg')
    })
    //
    cy.get('[title=" From Date - To Date : 04/04/2010- 04/04/2012 "]').invoke('text').then((text) => {
    expect(text.trim()).to.contain('04/04/2010- 04/04/2012')
    })
    /*
    cy.xpath("//span[contains(text(),'2 Year 1 Day')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('2 Year 1 Day')
    })
    */
    cy.xpath("//span[contains(text(),'best university 54321')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('best university 54321')
    })
    //
    cy.wait(5000)
    //download attached file
    //cy.get('[class="fa fa-download"]').eq(0).click({force:true})
})

it('verify attached file', () => {
   cy.get('.fa-download').eq(0).click({force:true})
})
})
/*
context ('Verify for delete funcationality',() => { 
it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(0).click()
    cy.wait(1000)

})

it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(0).click()
    cy.wait(1000)
})
})*/

})