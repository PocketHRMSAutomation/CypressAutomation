import OnDuty from '../../Function/OnDuty'

describe('On Duty - Normal Flow', function () {
	const onDuty = new OnDuty()

	//const jsonAssertion = require("soft-assert")
	const { softAssert, softExpect, softTrue } = chai;
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var admin = ''
	var managerID = 'Z1'
	var managerName = 'Timesheet'
	var employeeID = 'Z2'
	var employeeName = 'Akash Avhad'

	var leaveType = 'PL'
	var leaveType1 = 'PaidLeave'
	var onDutyDate = currentDate
	var inDate = currentDate
	var outDate = currentDate
	var inTime_hours = '9'
	var inTime_min = '00'
	var outTime_hours = '17'
	var outTime_min = '00'
	var dayType = 'FULLDAY ONDUTY'
	var remarks = 'Testing'
	var managerRemark = 'Approved by Manager'

	//var onDutyDate = '05/05/2022'


	var downloadPath = 'cypress\\downloads\\'
	var teamReport = 'ReportDetailedManager'
	var myReport = 'ReportDetailed'


	// before(function () {
	// 	cy.fixture('TestData/OnDuty').then(function (data) {
	// 		//this.data = data
	// 		console.log(this.data)
	// 		admin = data.admin
	// 		managerID = data.managerID
	// 		employeeID = data.employeeID
	// 	})
	// })

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})

	it('Apply On Duty',function(){
			cy.EssLogin(employeeID, employeeID)
			onDuty.applyOnDuty(onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) 
	})
		
	
	it('Verify On Duty Details In Previous Details', function() {
		//cy.EssLogin(employeeID, employeeID)
		cy.wait(5000)
		onDuty.verifyOnDutyDetailsInPreviousDetails(onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) 		
})	

	it('Verify Notification at Manager ', function() {
		//cy.wait(5000)
		cy.logout()
			cy.EssLogin(managerID, managerID)
			cy.wait(5000)
			onDuty.verifyNotificationAtManager(employeeID)		
	})	
	
	it('Verify Requsted On Duty Details At Manager', function() {
		//cy.EssLogin(managerID, managerID)
		//cy.wait(5000)
		onDuty.verifyRequstedOnDutyDetailsAtManager(employeeID, employeeName, onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks)	
})	

	it('Approve OnDuty at Manager', function () {
		//cy.EssLogin(managerID, managerID)
		onDuty.approveOnDuty(managerRemark)	
	})

	it('Verify OnDuty in Team Report', function () {
		cy.wait(5000)
		//cy.EssLogin(managerID, managerID)
		onDuty.verifyOnDutyInTeamReport(employeeID, employeeName, onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks)
	})

/*	it('Verify Manager Remark', function () {
		//cy.EssLogin(managerID, managerID)
		onDuty.verifyManagerRemark(managerRemark)
	})
	
	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		onDuty.verifyNotificationAtEmployee(managerID, managerName,onDutyDate )
	})

	it('Verify Status at Employee', function () {
		onDuty.verifyStatusAtEmployee(onDutyDate )
	})

	it('Verify On-Duty in My Report', function () {
		cy.EssLogin(employeeID, employeeID)
		onDuty.verifyOnDutyInMyReport(onDutyDate )	
	})

	it('Verify On-Duty in Employee Report', function () {
		cy.EssLogin(admin, admin)
		onDuty.verifyOnDutyInEmployeeReport(admin, employeeID, onDutyDate )
	})

*/
})