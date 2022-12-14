describe('01_Setting', function () {

    
    var esiLocation = ['Pune']
    var esiDispensary = ['Pune', 'Mumbai']
    var department = ['IT', 'HR']
    var designation = ['Manager', 'HR']

    function Randomcomapnyname(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return 'Test_' + result;
    }

    function companycode(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function AddCategory(Category) {
        cy.server()
        cy.route('GET', Cypress.env('url') + 'Payroll/Settings/getCategoryWiseEmployeeCount').as('addCategory')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=category')

        //	cy.get('#HR_Category').click()
        cy.get('[title="Add Category"]').eq(0).click({ force: true })

        cy.get("#categoryModalLabel").then(($span) => {
            var catagoryheadertex = $span.text();
            expect(catagoryheadertex).to.have.string('New Category')
        })
        cy.get('#categoryName').should('be.visible').should('not.disabled')
        cy.get('#categoryName').should('exist')

        cy.get('#description').should('be.visible').should('not.disabled')
        cy.get('#description').should('exist')

        cy.get('#displayOrder').should('be.visible').should('not.disabled')
        cy.get('#displayOrder').should('exist')

        cy.get('#categoryName').click()
        cy.get('#categoryName').type(Category)

        cy.get('#description').click()
        cy.get('#description').type(Category)


        cy.get('#displayOrder').click()
        cy.get('#displayOrder').type('1')

        cy.get('#createBtn').click()
        cy.wait(1000)

        cy.wait('@addCategory').its('status').should('eq', 200)

        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Category added successfully.!')
        })

        cy.get(".toast-message").click()

        cy.get('.accordion > .card > .card-body').contains(Category)

    }



    function navigatePopupData(Component, Data) {
        cy.server()
        cy.route('GET', '/Payroll/Settings/getPopUpData?tableName=').as('loadPopupComponant')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=popup')
        cy.get('#HR_PopUpData').click()

        cy.wait('@loadPopupComponant').its('status').should('eq', 200)

    }
    function AddPopupdata(Component, Data) {

        navigatePopupData()
        cy.wait(2000)
        //var comp = Component.replaceAll(' ', '')
        //cy.server()
        //cy.route('POST', '/Payroll/Settings/SavePopupData?fieldname='+comp.toUpperCase()+'&popupValue='+Data.toUpperCase()+'&Id=').as('getPopupdata')

        cy.get('#metadatatable').select(Component)
        cy.get('[title="Add Popup"]').eq(0).click()

        cy.get('#popupvalue').click()
        cy.get('#popupvalue').type(Data)
        cy.get('[onclick="submitData()"]').click()
        //cy.wait(1000)
        //cy.wait('@getPopupdata').its('status').should('eq', 200) 

        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data Saved Successfully')
        })
        cy.get(".toast-message").click()
        cy.wait(2000)
        cy.get('#metadatatable').select(Component)
        cy.get('#popUpDataForm').contains(Data)
        cy.wait(1000)

    }

    beforeEach(function () {
        cy.getCookies()
    })

    it('Login to Cloud & select Company', function () {
        cy.login()
        cy.changeCompany();
    })
    
 /*   it('Add Company', function () {
        cy.server()

        cy.route('POST', Cypress.env('url') + 'Admin/Company/Index').as('companycreate')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=companyprofile')

        cy.get('[title="Add New Company"]').eq(0).click({ force: true })

        var companyText = Randomcomapnyname(5);
        var SelfservicecodeText = companycode(5);
        cy.writeFile('cypress/fixtures/Company.json', [{ "comapnayname": companyText, "comapnaycode": SelfservicecodeText }])

        cy.get('#txtname').type(companyText)
        cy.get('#txtcompanycode').type(SelfservicecodeText)


        cy.get('#SubmitBtn').click({ force: true })
        cy.wait('@companycreate').its('status').should('eq', 200)
        cy.wait(5000)


    })
*/
 /*   it('Verify added Company details', function () {
        cy.readFile('cypress/fixtures/Company.json').then((text) => {
            //D:/CypressPocketHRMS/cypress/fixtures
            text.forEach(function (entry) {
                var company = entry.comapnayname
                var companyCode = entry.comapnaycode
                cy.server()

                cy.route('POST', Cypress.env('url') + 'Admin/Company/Index').as('companycreate')

                cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=companyprofile')

                cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain(company)
                })

                cy.xpath("//p[contains(@title, 'Company Code')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain(companyCode)
                })

                cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain('Turbhe Navi mumbai')
                })

                cy.xpath("//span[contains(@id, 'City')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain('Turbhe - 421501')
                })

                cy.xpath("//span[contains(@id, 'State')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain('Maharashtra')
                })

                cy.xpath("//span[contains(@id, 'Telephone')]").invoke('text').then((text) => {
                    expect(text.trim()).to.contain('022-247171')

                })

            })
        })
    })
*/
  /*  it('add Category - staff', function () {
        AddCategory('Staff')
    })
    */
/*
    it('Add ESI Location', function () {

        for (let i = 0; i < esiLocation.length; i++) {
            AddPopupdata('ESI Location', esiLocation[i])
        }

    })
    it('Add ESI Dispensary', function () {

        for (let i = 0; i < esiDispensary.length; i++) {
            AddPopupdata('ESI Dispensary', esiDispensary[i])
        }

    })
    it('Add Department', function () {

        for (let i = 0; i < department.length; i++) {
            AddPopupdata('Department', department[i])
        }

    })
    it('Add Designation', function () {

        for (let i = 0; i < designation.length; i++) {
            AddPopupdata('Designation', designation[i])
        }

    })
*/

    it('Set financial year', function () {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({ force: true })
        cy.wait(1000)
        cy.get('#Leave_DefineCalendar').click({ force: true })
        cy.wait(2000)
        cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({ force: true })
        cy.wait(1000)
        cy.get('input[name="start"]').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val('01/04/' + Cypress.env('FinancialYear_From'))
        })
        cy.get('input[name="end"]').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val('31/03/' + Cypress.env('FinancialYear_To'))
        })
        cy.get('#drpDefault').select('Yes', { force: true })
        cy.get('#ddComponent').select('COMPCODE')
        cy.get('#ddHoli').select('COMPCODE')
        cy.get('#ddLeaveCredit').select('CATEGORY')
        cy.get('#ddWeekOff').select('COMPCODE')
        cy.get('#ddCompOff').select('COMPCODE')
        cy.get('#btnSaveFinSet').click({ force: true })
        cy.wait(3000)
        cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            expect(text.trim()).equal('Records Saved Successfully!!!')
        })
    })

    it('Add Leave - PL', function () {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({ force: true })
        cy.wait(1000)

        cy.server()
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click({ force: true })
        cy.wait(10000)
        cy.route('POST', Cypress.env('url') + 'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(4000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({ force: true })
        //  cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(3000)
        cy.get('#leavName').type('PL')
        cy.get('#leavDesc').type('Paid Leave')
        cy.get('#leavCategory').select('EL')
        cy.get('#leavOpen').select('REQUIRED', { force: true })
        cy.wait(2000)
        cy.get('#crRounding').select('NIL', { force: true })
        cy.wait(1000)
        cy.get('#leaveType').select('Day Wise', { force: true })
        cy.get('#catall').check({ force: true })
        cy.get('#btnLeaveDefinationSave').click({ force: true })
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')
        })
        cy.get(".toast-message").click({ force: true })

    })


    it('Add Leave - Sick Leave', function () {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({ force: true })
        cy.wait(1000)

        cy.server()
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click({ force: true })
        cy.route('POST', Cypress.env('url') + 'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(2000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({ force: true })
        //cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(2000)
        cy.get('#leavName').type('SL')
        cy.get('#leavDesc').type('Sick Leave')
        cy.get('#leavCategory').select('SL')
        cy.get('#leavOpen').select('REQUIRED', { force: true })
        cy.wait(2000)
        //cy.get('#crRounding').select('NIL',{force:true})
        cy.wait(1000)
        cy.get('#reliverR').select('Y', { force: true })
        cy.get('#leaveType').select('Day Wise', { force: true })
        cy.get('#catall').check({ force: true })
        cy.get('#btnLeaveDefinationSave').click({ force: true })
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')
        })
        cy.get(".toast-message").click({ force: true })

    })
/*
    it('Add Leave - MATERNITY  LEAVE', function () {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({ force: true })
        cy.wait(1000)
        cy.server()
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click({ force: true })
        cy.route('POST', Cypress.env('url') + 'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(2000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({ force: true })
        //cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(2000)
        cy.get('#leavName').type('MATERNITY LEAVE')
        cy.get('#leavDesc').type('MATERNITY LEAVE')
        cy.get('#leavCategory').select('MAT')
       // cy.get('#leavOpen').select('REQUIRED', { force: true })
        cy.wait(2000)
        //cy.get('#crRounding').select('NIL',{force:true})
        cy.wait(1000)
        //cy.get('#reliverR').select('Y', { force: true })
        cy.get('#leaveType').select('Day Wise', { force: true })
        cy.get('#catall').check({ force: true })
        cy.get('#btnLeaveDefinationSave').click({ force: true })
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')
        })
        cy.get(".toast-message").click({ force: true })
    })
  */  
    it('Add Leave - Marriage leave', function () {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({ force: true })
        cy.wait(1000)
        cy.server()
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click({ force: true })
        cy.route('POST', Cypress.env('url') + 'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(2000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({ force: true })
        //cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(2000)
        cy.get('#leavName').type('Marriage leave')
        cy.get('#leavDesc').type('Marriage leave')
        cy.get('#leavCategory').select('WL')
       // cy.get('#leavOpen').select('REQUIRED', { force: true })
        cy.wait(2000)
        //cy.get('#crRounding').select('NIL',{force:true})
        cy.wait(1000)
        //cy.get('#reliverR').select('Y', { force: true })
        cy.get('#leaveType').select('Day Wise', { force: true })
        cy.get('#catall').check({ force: true })
        cy.get('#btnLeaveDefinationSave').click({ force: true })
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')
        })
        cy.get(".toast-message").click({ force: true })
    })
    
})

