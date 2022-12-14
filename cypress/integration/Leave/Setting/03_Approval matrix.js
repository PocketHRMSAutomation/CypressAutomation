describe(['Flow'], 'Add Employee & Leave Related Settings', function () {

    var empid;
    var Staff = 'Staff'
    var ESILocation = 'Pune'
    var ESIDispensary = 'Mumbai'

    var EmpName = 'Ratan'
    var LastName = 'Rao'
    var PtLocation = 'Maharashtra'
    var DateOfBirth = '01/12/1995'
    var DateOfJoining = '02/04/2018'
    var Metro = 'Metro'
    var leave = 'Paid Leave'


    before(() => {
        cy.task('readXlsx', { file: 'cypress/fixtures/Employee/New Employee.xlsx', sheet: "New Employee" }).then((rows) => {
            var rowsLength = rows.length;
            cy.writeFile("cypress/fixtures/Employee/New Employee.json", { rows })
        })
    })

    beforeEach(function () {
        cy.getCookies()
    })

    it('Login to Cloud & select Company', function () {
        cy.login()
        cy.changeCompany();
    })

    it('Assign Manager from Approval Matrix ', () => {
        //		cy.login()
        //cy.changeCompany();
        var filePath = 'New Employee.xlsx'
        var sheetName = 'ApprovalMatrix'

        cy.task('readXlsx', { file: 'cypress/fixtures/Employee/' + filePath, sheet: sheetName }).then((rows) => {
            var rowsLength = rows.length;
            cy.writeFile('cypress/fixtures/' + sheetName + ".json", { rows })
        })

        cy.fixture(sheetName).then((excelData) => {
            excelData.rows.forEach((data, index) => {
                cy.navigate_EmployeeProfile(data.EmployeeCode)

                cy.wait(2000)
                cy.get('#approval_matrix_tab').click({ force: true })
                cy.wait(2000)


                if (data.Priority == 1) {
                    cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
                }
                else {
                    cy.get('#approvalComponentTitle > .row > .col-8 > [onclick=""] > .fas').click({ force: true })
                    cy.wait(2000)
                }

                cy.wait(5000)
                cy.get('#Priority').click({ force: true })
                cy.get('#Priority').clear().type(data.Priority)

                cy.wait(2000)
                cy.get('#select2-approvalManager-container').click({ force: true })
                cy.wait(2000)
                cy.get('input[type="search"]').click({ force: true })
                cy.get('input[type="search"]').type(data.LeaderCode)
                cy.wait(2000)
                cy.contains('li', '[' + data.LeaderCode + ']').click({ force: true })
                //cy.get('.select2-results__option--highlighted').click({ force: true })
                cy.wait(2000)

                if (data.ApprovalMust != '') {
                    cy.get('#approvalmust').select('Yes')
                }

                if (data.ApprovedCancelRights != '') {
                    cy.get('#cancelrights').select('Yes')
                }

                //cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
                cy.get('#' + data.ModuleName + '').click({ force: true })
                //cy.xpath("//label[contains(text(),'On Duty')]").click()
                cy.get('#btnSaveText').click()
                cy.wait(5000)


            })
        })


    })
})
