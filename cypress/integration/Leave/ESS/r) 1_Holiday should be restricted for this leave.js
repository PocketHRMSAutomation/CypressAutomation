import Leave from './Pages/Leave/Leave';
describe('r) 1_Holiday should be restricted for this leave', function () {
    const leave = new Leave()
    const { softAssert, softExpect, softTrue } = chai;

    var moment = require('moment');
    const Day = moment().format('DD')
    const Day1 = parseInt(Day) + 2
    const Day2 = parseInt(Day) - 1
    const Month = moment().format('MM')
    const year = moment().format('YYYY')
    const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
    const todayDate = Day + '/' + Month + '/' + year
    const tomorrowDate = Day1 + '/' + Month + '/' + year

    var employeeID = 'L1'
    var EmployeeFirstName = 'User'
    var EmployeeLastName = 'Leave'
    var managerID = 'L2'
    var ManagerFirstName = 'Manager '
    var ManagerLastName = 'LeaveData'


    var employeeJoiningDate = '15/10/2022'
    var department = 'IT'
    var designation = 'HR'
    var balance = 10

    var admin = 'SA1'
    var leaveType = 'Paid Leave'
    var leaveTypeValue = 'PL'

    var HolidayDate = '15/11/2022'
    var leaveFromDate = HolidayDate
    var leaveToDate = '16/11/2022'
    var leaveDay = 2

    var leaveFromDayType = 'FULL DAY'
    var leaveToDayType = 'FULL DAY'

    var Reason = 'Office Metting'
    var LeaveStation = 'Yes'
    var VacationAddress = 'Pune'
    var ContactNumber = '9876543210'
    var ReliverSetting = 'No'
    var ReliverCode = ''
    var ReliverName = ''

    var APPROVERS = 'level  1'
    var MANAGERREMARKS = ''

    var LeaveStatus = 'Approved'
    var ManagerStatus_1 = 'Approved'
    var ManagerStatus_2 = 'Approved'
    var ManagerLevel = 1
    var ManagerRemark_1 = 'Approved by Manager 1'
    var ManagerRemark_2 = 'Approved by Manager 2'

    var managerID_2 = ''
    var ManagerFirstName_2 = ' '
    var ManagerLastName_2 = ''

    beforeEach(function () {
        cy.getCookies()
        cy.getCookies_ESS()
    })

    
   

    it('Login to Cloud', function () {
        cy.login()
        cy.changeCompany();
    })

    it('Setting for Holiday should be restricted for this leave', function () {

        leave.DeleteLeaveConfiguration(leaveType)

        //cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#ddRestrictedHolidays').select('should')
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

    it('Verify Validation Message - From Date is Holiday. ', function () {

        cy.navigate_EmployeeProfile(employeeID)

        cy.get('#leave_detail_tab').click({ force: true });
        cy.wait(2000)

        cy.get('#Leave_LeaveEntry').click({ force: true })

        cy.wait(5000)
        cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({ force: true })
        cy.wait(2000)

        cy.get('#leaveType').select(leaveType, { force: true })

        cy.get('#remarks').click({ force: true })
        cy.get('#remarks').clear()
        cy.get('#remarks').type(Reason);

        cy.get('#fromdate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveFromDate)
        })

        cy.wait(1000)
        cy.get('#todate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveToDate)
        })

        cy.wait(1000)
        cy.get('#drpFromDayType').select(leaveFromDayType, { force: true })
        cy.get('#drpToDayType').select(leaveToDayType, { force: true })
        //cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
        //cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)


        cy.wait(3000)
        cy.get('#btnAddLeave').click({ force: true })
        cy.wait(3000)



        cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            softExpect(text.trim()).to.eq('From Date is holiday.');
        })

        cy.get('#btnclose').click({ force: true })
        cy.wait(2000)

    })

    it('Verify Validation Message - To Date is Holiday. ', function () {

        var HolidayDate = '15/11/2022'
        var leaveFromDate = '14/11/2022'
        var leaveToDate = HolidayDate


     //   cy.navigate_EmployeeProfile(employeeID)

        cy.get('#leave_detail_tab').click({ force: true });
        cy.wait(2000)

        cy.get('#Leave_LeaveEntry').click({ force: true })

        cy.wait(5000)
        cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({ force: true })
        cy.wait(2000)

        cy.get('#leaveType').select(leaveType, { force: true })

        cy.get('#remarks').click({ force: true })
        cy.get('#remarks').clear()
        cy.get('#remarks').type(Reason);

        cy.get('#fromdate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveFromDate)
        })

        cy.wait(1000)
        cy.get('#todate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveToDate)
        })

        cy.wait(1000)
        cy.get('#drpFromDayType').select(leaveFromDayType, { force: true })
        cy.get('#drpToDayType').select(leaveToDayType, { force: true })
        //cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
        //cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)


        cy.wait(3000)
        cy.get('#btnAddLeave').click({ force: true })
        cy.wait(3000)



        cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            softExpect(text.trim()).to.eq('To Date is holiday.');
        })

        cy.get('#btnclose').click({ force: true })
        cy.wait(2000)

    })

    it('login to ESS', function () {


        cy.EssLogin(employeeID, employeeID)
        //cy.EssLogin(employeeID, getPassword(employeeID))
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

    })
    it('verify validation message - From Date is Holiday. ', function () {


        cy.get('#drpLeaveType').select(leaveType)
        //
       
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
		})

		cy.get('#txtReason').click({ force: true })

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
		})

        //clck on add butoon
        cy.get('#btnAdd').click()
        cy.wait(3000)
        //verify validation message
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('From Date is holiday.')
        })
        cy.wait(1000)
        cy.wait(2000)
    })

    it('verify validation message - To Date is Holiday. ', function () {

        var HolidayDate = '15/11/2022'
        var leaveFromDate = '14/11/2022'
        var leaveToDate = HolidayDate

      
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
		})

		cy.get('#txtReason').click({ force: true })

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
		})


        //clck on add butoon
        cy.get('#btnAdd').click()
        cy.wait(3000)
        //verify validation message
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('To Date is holiday.')
        })
        cy.wait(1000)
        cy.wait(2000)
    })

})