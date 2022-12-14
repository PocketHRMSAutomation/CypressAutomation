import Leave from './Pages/Leave/Leave';
describe('j) This Leave must be applied before _ days.', function () {
    const leave = new Leave()
    const { softAssert, softExpect, softTrue } = chai;

    var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
   
	const Day2 = parseInt(Day) + 2
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	//const tomorrowDate = Day1 + '/' + Month + '/' + year
    const tomorrowDate  = moment().add(1, 'days').format('DD/MM/YYYY').toString();

    //const DateAfterTwoDays = Day2 + '/' + Month + '/' + year
    const DateAfterTwoDays =  moment().add(2, 'days').format('DD/MM/YYYY').toString();


    var leaveFromDate = DateAfterTwoDays
    var leaveToDate = DateAfterTwoDays

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

    var leaveDay = 1


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


    var daysAppliedBeforeDay = 2


    beforeEach(function () {
		cy.getCookies()
        cy.getCookies_ESS()
	})
  
    it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})

	it('Setting for This Leave must be applied before _ days.',function(){
        leave.DeleteLeaveConfiguration(leaveType)

        //cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
		cy.wait(2000)
        cy.get('#leavCrCalBeforeDays').clear()
        cy.get('#leavCrCalBeforeDays').type(daysAppliedBeforeDay)
        cy.wait(1000)
         
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


    it('Verify Validation Message - Leave should be applied before '+daysAppliedBeforeDay+' days', function () {
           var leaveFromDate = tomorrowDate
	var leaveToDate = tomorrowDate
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


       // cy.get('#btnAddLeave').click({ force: true })
        cy.xpath("//button[@id='btnAddLeave']").click()
        
        cy.wait(2000)



        cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            softExpect(text.trim()).to.eq('Leave should be applied before '+daysAppliedBeforeDay+' days');
        })

        cy.get('#btnclose').click({ force: true })
        cy.wait(2000)

    })

    
    it('Verify Leave by adding Leave From Cloud', function () {
    
        // cy.navigate_EmployeeProfile(employeeID)
         leave.addLeaveFromCloud(leaveType, leaveTypeValue, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, Reason)
         leave.deleteEmployeesAllLeaves()
     })


    it('login to ESS',function(){

        cy.EssLogin(employeeID, employeeID)
        //cy.EssLogin(employeeID, getPassword(employeeID))
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    
    })

    it('verify validation message - Leave should be applied before '+daysAppliedBeforeDay+' days',function(){
       var leaveFromDate = tomorrowDate
	var leaveToDate = tomorrowDate
            cy.get('#drpLeaveType').select('Paid Leave')
            cy.wait(2000)
    
            
            cy.get('#txtFromDate').click().then(input => {
                input[0].dispatchEvent(new Event('input', { bubbles: true }))
                input.val(tomorrowDate)
            })
            //
            cy.get('#txtToDate').click().then(input => {
                input[0].dispatchEvent(new Event('input', { bubbles: true }))
                input.val(tomorrowDate)
           })
             //clck on add butoon
             cy.get('#btnAdd').click()
             cy.wait(2000)
             //verify validation message
             cy.get(".noty_body").invoke('text').then((text) => {
                 expect(text.trim()).equal('Leave should be applied before '+daysAppliedBeforeDay+' days')
             })
             cy.wait(1000)
             //click on message to close message box
             cy.get(".noty_body").click()
             cy.wait(2000)
    })

    it('Verify Leave by adding Leave From ESS', function () {
       
       // cy.EssLogin(employeeID, employeeID)
       leave.applyLeave(leaveType, balance, leaveDay, leaveFromDate, leaveToDate, leaveFromDayType, 
        leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
        ReliverSetting)
        cy.wait(2000)
        
    })
    

    it('Verify Leave details in Leave popup of Previous Leave', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''
		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

    it('Cancel Leave', function () {		
		leave.cancelLeaveFromESS()
	})
    /*

	it('Verify Notification at Manager ', function () {
		cy.EssLogin(managerID, managerID)
		cy.wait(5000)
		leave.verifyNotificationAtManager(employeeID)
	})

	it('Verify Requsted Leave Details At Manager', function () {

		//cy.EssLogin(managerID, managerID)

		leave.verifyRequstedLeaveDetailsAtManager(employeeID, EmployeeFirstName, EmployeeLastName,
			leaveTypeValue, leaveFromDate, leaveToDate)
	})

	it('Verify Leave details in Leave popup of Manager Approval Page', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Approve Leave at Manager', function () {
		
		//cy.EssLogin(managerID, managerID)
		leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)
	})

	it('Verify Leave in Team Report', function () {
		var balance = balance - leaveDay
		cy.wait(5000)
		cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of Team Report', function () {

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID, LeaveStatus)


	})

	it('Verify Status at Employee after Approved Leave', function () {
		balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(leaveFromDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of Previous Leave After Approved Leave', function () {


		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Leave in My Report', function () {
		balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(leaveFromDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of My Report', function () {

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Leave in Employee Report', function () {
		balance = balance - leaveDay
		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(employeeID, leaveFromDate, LeaveStatus)


	})

	it('Verify Leave details in Leave popup of Employee Report', function () {
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})
  */
})