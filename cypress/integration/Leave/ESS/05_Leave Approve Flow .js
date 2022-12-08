import { get } from 'request';
import Leave from '../../Function/Leave'


describe(['Smoke'], '05_Leave Approve Flow', function () {
	const leave = new Leave()


	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	//const todayDate = '19/10/2022'
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var employeeID = 'Z1'
	//var employeeID = 'Z1'

	var EmployeeFirstName = 'Devang'
	var EmployeeLastName = 'David'
	var employeeJoiningDate = '23/05/2022'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

	var managerID = 'Z2'
	//var managerID = 'Z2'

	var ManagerFirstName = 'Akash '
	var ManagerLastName = 'Avhad'
	var admin = 'SA1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '13/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '13/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = 1

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

	var pass = ''

	function getPassword(empid) {

		cy.readFile('cypress/fixtures/Password.json').then((data) => {
			data.forEach(function (entry) {
				//cy.log(entry)
				var emp = entry.employeeid
				//var pass = entry.password
				//cy.log(dd)
				//cy.log(employeeID)
				var a1 = emp.trim()
				var a2 = empid.trim()

				if (a1 == a2) {
					cy.log("HIIIIIIIIIIIIIIIIIIIIIIIII")
					pass = entry.password
					cy.log("pass:" + pass)
					//return pass

					//return pass;
				}
			})
		})
		//cy.log("pass:" + pass)
		//return pass;
		return pass;
	}

	before(() => {
		//const filename = Password.json'
	})

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})

	/*	it('getPassword', function () {
			pass = getPassword(employeeID)
			cy.log(pass)
			//cy.EssLogin(employeeID, pass)
	
		})
	*/

	it('Apply Leave', function () {
		pass = getPassword(employeeID)
		cy.EssLogin(employeeID, pass)
		leave.applyLeave(leaveType, balance, leaveDay, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
			ReliverSetting)
	})

	it('Verify Leave details in Leave popup of Previous Leave', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''
		//cy.EssLogin(employeeID, employeeID)
		//cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Manager ', function () {
		pass = getPassword(managerID)
		cy.EssLogin(managerID, pass)
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
		//cy.EssLogin(managerID, managerID)
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
		pass = getPassword(employeeID)
		cy.EssLogin(employeeID, pass)
		//cy.EssLogin(employeeID, employeeID)
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

})