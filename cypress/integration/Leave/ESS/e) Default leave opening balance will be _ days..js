import Leave from './Pages/Leave/Leave';


describe('e) Default leave opening balance will be _ days.', function () {
    const leave = new Leave()

    const { softAssert, softExpect, softTrue } = chai;


    var leaveType = 'Sick Leave'

    var leaveTypeValue = 'PL'
    var employeeID = 'L1'
    var employeeID1 = 'L8'
    var leaveFromDate = '09/11/2022'
    var leaveToDate = '13/11/2022'

    var moment = require('moment');
    const Day = moment().format('DD')
    const Day1 = parseInt(Day) + 2
    const Day2 = parseInt(Day) - 1
    const Month = moment().format('MM')
    const year = moment().format('YYYY')
    const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
    const todayDate = Day + '/' + Month + '/' + year
    const tomorrowDate = Day1 + '/' + Month + '/' + year

    var leaveFromDate1 = tomorrowDate
    //var leaveFromDate = '13/10/2022'
    var leaveToDate1 = tomorrowDate
    var LeaveBalance = 5

    beforeEach(function () {
        cy.getCookies()
        cy.getCookies_ESS()
    })

   

    it('Login to Cloud', function () {
        cy.login()
        cy.changeCompany();
    })

    it('Setting for Default leave opening balance will be _ days.', function () {
        leave.DeleteLeaveConfiguration(leaveType)

        // cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#txtDefault').type(LeaveBalance)

        //click on save button
        cy.get('#btnSave').click()
        cy.wait(5000)
        //verify success message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data saved successfully.!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })

    it('Verify Leave Balance in Cloud', function () {

        cy.navigate_EmployeeProfile(employeeID)
        cy.get('#leave_detail_tab').click()
        cy.wait(2000)
        cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function (row, i) {
            var num = parseFloat(i + 1)
            cy.log("num: " + num)

            cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {
                cy.log("text: " + text)
                if (text.trim() == leaveType) {
                    expect(text).to.eq(leaveType)

                    cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
                        cy.log("availableLeave: " + availableLeave)
                        assert.equal(LeaveBalance, parseInt(availableLeave), "Available Leave Balance is not match")


                        // expect(LeaveBalance).to.eq(LeaveBalance)
                        //expect(availableLeave).to.eq(LeaveBalance)
                    })
                }
            })
        })
    })

    it('Verify Leave Balance in ESS', function () {

        //cy.EssLogin(employeeID, getPassword(employeeID))
        cy.EssLogin(employeeID, employeeID)

        
        //cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
        //cy.get('#drpLeaveType').select(leaveType)
        cy.wait(5000)

        cy.get('#leaveBalance').invoke('text').then((text) => {
            assert.equal(LeaveBalance, parseInt(text), "Available Leave Balance is not match")
            //expect(text.trim()).to.contain('5')
        })
    })


})