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

    it('Add Employee', function () {


        cy.fixture('/Employee/New Employee').then((excelData) => {
            excelData.rows.forEach((data, index) => {
                cy.server()
                // cy.wait(2000)
                cy.visit(Cypress.env('url') + 'Employee/Employee/EmptyEmployeeList')
                //cy.wait(2000)
                cy.get('.mb-1').find('i').then(listing => {
                    var len = Cypress.$(listing).length;
                    if (len == 2) {
                        cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({ force: true })
                    } else {
                        cy.get("a[onclick='getEmployeeWizard();']").click({ force: true })
                    }
                })
                // cy.wait(4000)
                cy.get("#empWizardTitle").then(($span) => {
                    var basicdetailsheadertext = $span.text();
                    expect(basicdetailsheadertext).equal('Basic Details')
                })
                cy.route('POST', Cypress.env('url') + 'Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')


               // cy.get('input[name=code]').click({ force: true })
                cy.get('input[name=code]').type(data.EmpID.trim())
                cy.wait(3000)
               // cy.get('input[name=fname]').click({ force: true })
                cy.get('input[name=fname]').type(data.FirstName.trim())
                cy.wait(2000)
                cy.get('input[name=lname]').type(data.LastName.trim())
                cy.wait(2000)

                cy.get('#Male').check(data.Gender, { force: true })
                cy.wait(2000)
                cy.get('select[name=category]').select(data.Category, { force: true })
                cy.wait(2000)
                cy.get('select[name=ptlocation]').select(data.ProfTaxLocation)
                cy.wait(2000)

                cy.get('#txt_dateofbirth').click().then(input => {
                    input[0].dispatchEvent(new Event('input', { bubbles: true }))
                    input.val(data.DateOfBirth)
                })

                cy.wait(2000)
                cy.get('#txt_dateofjoining').then(input => {
                    input.val(data.DateOfJoining)
                })
                cy.wait(2000)
                //cy.wait(1000)
                cy.get('[for="Date of Joining"]').click()
                cy.wait
                cy.get('select[name=esilocation]').select(data.ESILocation, { force: true })
                cy.get('select[name=metro]').select(data.Metro_TDS, { force: true })
                cy.get('select[name=esidispensary]').select(data.ESIDispensary, { force: true })
                // cy.wait(1000)
                cy.get('#btnSaveBasicDetail').click({ force: true })

                cy.wait(2000)
                //cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((text) => {
                    expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
                    cy.log(text.trim())
                })
                cy.get(".toast-message").click({ force: true })

                //cy.get('[class="close"]').eq(0).click()
                cy.wait(2000)

                
		//Employee Details
		cy.get("#empWizardTitle").then(($span) => {
            var employeedetailsheadertext = $span.text();
              expect(employeedetailsheadertext).equal('Employee Details')
      })
      
      cy.route('POST', Cypress.env('url')+'Employee/Employee/EmployeeDetailsWizard').as('EmployeeDetailsWizard')
          
       cy.get('select[name=DEPARTMENT]').select(data.Department,{force: true})
       cy.get('select[name=DESIGNATION]').select(data.Designation,{force: true})
    
       cy.wait(1000)
       cy.get('#btnEmployeeDetailSaveNext').click({force: true})

            })
        })

        cy.get('.col-md-1 > .close').click({force: true})
    })

    it('Add Selfservice role & Add Leave Balance', function () {
        var carts = [];

        const filename = 'cypress/fixtures/Password.json'
        cy.writeFile(filename, [{ employeeid: '', password: '' }])

        cy.fixture('/Employee/New Employee').then((excelData) => {
            excelData.rows.forEach((data, index) => {
                cy.wait(1000)
                cy.navigate_EmployeeProfile(data.EmpID)
                cy.wait(1000)
                cy.get('#profile_detail_tab').click({ force: true })
                cy.get('#Profile_SelfServiceRole').click({ force: true })
                cy.get('#Profile_SelfServiceRole').click()
                cy.get('#Profile_SelfServiceRole').click({ force: true })
                cy.wait(2000)
                cy.get('[name="SelfServiceRole"]').select(data.Selfservicerole, { force: true })
                cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
                cy.wait(2000)
                let map = new Map();

                cy.get("#credentials").invoke('text').then((text) => {
                    var str = text;
                    var pass = text.substr(10).trim()
                    cy.log("pass", pass)

                    cy.readFile(filename).then((list) => {
                        list.push({ employeeid: data.EmpID, password: pass })
                        cy.writeFile(filename, list)
                    })


                    // cy.writeFileSync(filename, data.rows[index].{ name: text })
                })
                cy.wait(5000)
                // Add Leave Balance
                cy.get('#leave_detail_tab').click({ force: true });
                cy.wait(5000)

                cy.get('#Leave_LeaveEntry').click({ force: true })
                cy.wait(3000)

                cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function (row, i) {
                    var num = parseFloat(i + 1)
                    cy.log("num: " + num)

                    cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {
                        cy.log("text: " + text)
                        if (text.trim() == leave) {
                            expect(text).to.eq(leave)

                            cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
                                cy.log("availableLeave: " + availableLeave)

                                cy.log("i: " + i)
                                if (availableLeave.trim() == '0') {
                                    cy.get('.float-right > a > .fas').eq(i).click()

                                    //cy.get('.fa-ellipsis-v').eq(i-1).click()

                                    cy.get('#LeaveOpen').click({ force: true })
                                    cy.get('#LeaveOpen').clear()
                                    cy.get('#LeaveOpen').type('10');

                                    cy.get('#saveloader').click({ force: true })
                                    cy.wait(8000)
                                }

                            })
                        }
                    })
                })



            })
        })
        // cy.writeFile('cypress/fixtures/Password.json', carts)


    })

    /*   it('Add Leave Balance ', () => {
   
           cy.fixture('/Employee/New Employee').then((excelData) => {
               excelData.rows.forEach((data, index) => {
                   cy.wait(1000
                   )
                   cy.navigate_EmployeeProfile(data.EmpID)
                   cy.wait(3000)
   
   
                   cy.get('#leave_detail_tab').click({ force: true });
                   cy.wait(2000)
   
                   cy.get('#Leave_LeaveEntry').click({ force: true })
                   cy.wait(3000)
   
                   const { softAssert, softExpect } = chai;
   
                   //cy.navigate_EmployeeLeave()	
   
   
                   cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function (row, i) {
                       var num = parseFloat(i + 1)
                       cy.log("num: " + num)
   
                       cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {
                           cy.log("text: " + text)
                           if (text.trim() == leave) {
                               expect(text).to.eq(leave)
   
   
                               cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
                                   cy.log("availableLeave: " + availableLeave)
   
                                   cy.log("i: " + i)
                                   if (availableLeave.trim() == '0') {
                                       cy.get(':nth-child(2) > .card > .card-body > .float-right > a > .fas').click()
   
                                       //cy.get('.fa-ellipsis-v').eq(i-1).click()
   
                                       cy.get('#LeaveOpen').click({ force: true })
                                       cy.get('#LeaveOpen').clear()
                                       cy.get('#LeaveOpen').type('10');
   
                                       cy.get('#saveloader').click({ force: true })
                                       cy.wait(8000)
                                   }
   
                               })
                           }
                       })
                   })
               })
           })
   
       })
   */

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
