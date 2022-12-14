describe('Maternity Leave', function() {
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year

var url = Cypress.env('url')
var FinancialYear_From = Cypress.env('FinancialYear_From')

var employeeCode = 'L2'
var employeeCodeName = 'Manager LeaveData'

var femaleEmployeeCode = 'L2'
var maleEmployeeCode = 'L1'
var lopMonth = 'April'
let leave ={LeaveType: "Maternity Leave", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: "06/04/2020", ToDateDay: "FULL DAY"};
 
let leaveSetting ={LeaveType: "Maternity Leave", MaximumLeaveInMonth: "4", 
FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "FULL DAY", ToDate1: "10/04/2020", 
WeekOff_Date1: "05/04/2020", WeekOff_Date2: "12/04/2020", Holiday: "14/04/2020",
previous_Date: "13/04/2020" };

let months =
	[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];	

	beforeEach(function(){
		cy.getCookies()
		})
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
	

Cypress.Commands.add('navigate_FemaleEmployeeProfile',()=>{
 cy.wait(1000)
	cy.get('#globalSearch').click({force: true})		
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(femaleEmployeeCode)
	cy.wait(2000)
	cy.contains('li', femaleEmployeeCode).click({force: true})
	cy.wait(3000)
})

Cypress.Commands.add('navigate_MaleEmployeeProfile',()=>{
 cy.wait(1000)
	cy.get('#globalSearch').click({force: true})		
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(maleEmployeeCode)
	cy.wait(2000)
	cy.contains('li', maleEmployeeCode).click({force: true})
	cy.wait(3000)
})

Cypress.Commands.add('navigate_EmployeeLeave',()=>{
 cy.wait(1000)

	cy.get('#leave_detail_tab').click({force:true});
	cy.wait(2000)
	
	cy.get('#Leave_LeaveEntry').click({force:true})
	cy.wait(3000)
})

Cypress.Commands.add('navigate_LeaveSetting',()=>{

		cy.wait(1000)
		cy.visit(url+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#leave_detail_tab').click({force:true})
		cy.get('#leave_detail_tab').click()
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(3000)
})

Cypress.Commands.add('delete_EmployeesAllLeaves',()=>{
	
	cy.get("i").then(($sp) => {
		var result = $sp.hasClass('text-danger')
		cy.log(result)
	if ($sp.hasClass('text-danger')) {
	
	cy.get('.text-danger').then(listing => {
		var leavelength = Cypress.$(listing).length;
		cy.log("leavelength: "+leavelength)
		
		if(leavelength != 0){		
		cy.get('.text-danger').eq(0).click()
		cy.wait(5000)
		}
		
		if(leavelength != 1)
		{
		cy.delete_EmployeesAllLeaves()
		}		
	})   	
	} 
	else {		
	}
	})	
})

Cypress.Commands.add('delete_EmployeesDebitLeaves',()=>{
 cy.get('div').then(($sp) => {
	if ($sp.is('#debitedLeaves')) {
		
	cy.get('#tableSorter > tbody >tr').then(listing => {
		var rowlength = Cypress.$(listing).length;
		if(rowlength != 0)
		{
			cy.get('#tableSorter > tbody >tr:nth-child(1) >td:nth-child(8) > button').click()
			cy.wait(3000)
		}
		if(rowlength != 1)
		{
		cy.delete_EmployeesDebitLeaves()
		}	
	})
	
	} 
	})	
	
	
})	
		
Cypress.Commands.add('set_DefaultLeaveConfiguration',(LeaveType)=>{
	cy.get('#Leave_LeaveConfiguration').click({force:true})
	cy.wait(8000)
	
	cy.get('#ddLeavType').select(LeaveType)
	cy.wait(2000)
	
	cy.get('#btnDelete').click({force:true})
	cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Data deleted successfully.!')		
		})
})	


it('Verify Validation Massage - Opening is not required for MATERNITY LEAVE', function() {
	cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
	cy.wait(1000)
	cy.get('#leave_detail_tab').click({force:true})
	cy.wait(1000)
	
		cy.server()	
		cy.wait(2000)
		cy.get('#Leave_LeaveDefinition').click( {force: true})
		cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
		cy.wait(2000)
		cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
		//cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#leavName').type('Maternity Leave')
		cy.get('#leavDesc').type('Maternity Leave')
		cy.get('#leavCategory').select('MAT')
		cy.get('#leavOpen').select('REQUIRED',{force:true})
		cy.wait(2000)
		cy.get('#crRounding').select('NIL',{force:true})
		cy.wait(1000)
		cy.get('#leaveType').select('Day Wise',{force: true})
		cy.get('#catall').check({force:true})
		cy.get('#btnLeaveDefinationSave').click({force:true})
		cy.wait(1000)
		//cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Opening is not required for MATERNITY LEAVE')		
		})
	cy.get(".toast-message").click({force:true})

})
	
it('Add Maternity Leave', function() {
	cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
	cy.wait(1000)
	cy.get('#leave_detail_tab').click({force:true})
	cy.wait(1000)
	
		cy.server()	
		cy.wait(2000)
		cy.get('#Leave_LeaveDefinition').click( {force: true})
		cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
		cy.wait(2000)
		cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
		//cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#leavName').type('Maternity Leave')
		cy.get('#leavDesc').type('Maternity Leave')
		cy.get('#leavCategory').select('MAT')
		cy.get('#leavOpen').select('NOT REQUIRED',{force:true})
		cy.wait(2000)
		cy.get('#crRounding').select('NIL',{force:true})
		cy.wait(1000)
		cy.get('#leaveType').select('Day Wise',{force: true})
		cy.get('#catall').check({force:true})
		cy.get('#btnLeaveDefinationSave').click({force:true})
		cy.wait(1000)
		//cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully!!!')		
		})
	cy.get(".toast-message").click({force:true})

})		

it('Set Setting for Maternity Leave',function() {
	cy.navigate_LeaveSetting()
	//cy.set_DefaultLeaveConfiguration('ML')
			
		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(2000)
		cy.get('#ddLeavType').select('Maternity Leave')
		cy.wait(2000)
		cy.get('#whSetting').select('should', {force:true})
		cy.wait(2000)
		cy.get('#ddInterHolidays').select('should', {force:true})
		cy.wait(2000)
		cy.get('#ddInterWeekOff').select('should', {force:true})
		cy.wait(2000)
		cy.get('#txtMinDays').click({force:true})
		cy.get('#txtMinDays').clear().type('180')
		cy.wait(2000)
		cy.get('#txtMaxDays').click({force:true})
		cy.get('#txtMaxDays').clear().type('180')
		cy.wait(2000)
		cy.get('#ddMaternity').select('Female')
		cy.wait(2000)
		cy.get('#MaternityApply').click({force:true})
		cy.get('#MaternityApply').clear().type('1')
		cy.wait(2000)
		cy.get('#btnSave').click()
		
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Data saved successfully.!')		
		})
})

/*
it('Release Paysheet Lock',function(){
	for(let i=0; i< months.length; i++){
	cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')	
		cy.wait(2000)
		
		cy.get('#Month1').select(months[i],{force: true})
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear().type(currentYear)
	
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		
		cy.get('#AdminPass').click({force: true})
		cy.get('#AdminPass').clear().type(Cypress.env('userPass'))
	
		cy.wait(2000)
		cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
		cy.xpath("//button[@id='btnRelease']").click({force: true})
		cy.wait(3000)
		}
})	

it('Delete Payroll Process',function(){
	const { softAssert, softExpect } = chai;
	cy.navigate_MaleEmployeeProfile()
	for(let i=0; i< months.length; i++){
		
	cy.get('#payroll_detail_tab').click({force: true})
	cy.wait(5000)
	cy.get('#Utilities_PayrollProcess').click({force: true})
	cy.wait(5000)
	cy.get('#month').select(months[i], {force: true})
	
	cy.get('#year').click({force: true})
	cy.get('#year').clear().type(currentYear)
	
	cy.get('#btnProcessDelete').click({force: true})
	cy.wait(5000)
	//cy.get(".toast-message").invoke('text').then((text) => {
		//cy.log(text.trim())
	//	softExpect(text.trim()).to.eq('Payroll Process Deleted Successfully');	
	//})
	
	}
})

*/
it('Verify Validation Massage - This leave is only applicable for Female Employee',function() {
	const { softAssert, softExpect } = chai;
	
var someDate = new Date();
someDate.setDate(someDate.getDate() + 179); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
dd='0'+dd;
} 

if(mm<10) 
{
mm='0'+mm;
} 

var after179days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after179days_Date);
cy.wait(2000)


	cy.navigate_MaleEmployeeProfile()
	cy.navigate_EmployeeLeave()
	//cy.delete_EmployeesAllLeaves()
				
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(after179days_Date)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
	cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Maternity Leave');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(5000)
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('This leave is only applicable for Female Employee');	
	})
	cy.get('#btnclose').click({force: true})
	//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	cy.wait(5000)
})	

/*
it('Verify Validation Massage - Leave should be less than or equal to : 180',function() {
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 190); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

var today = new Date(dateFormated);
var dd = today.getDate();


var after190days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after190days_Date);
cy.wait(2000)

	cy.navigate_FemaleEmployeeProfile()		
	cy.navigate_EmployeeLeave()
	//cy.delete_EmployeesAllLeaves()
				
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			cy.get('#fromdate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click({force: true}).then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(after190days_Date)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
	cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Maternity Leave');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(5000)
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Leave should be less than or equal to : 180');	
	})
	cy.get('#btnclose').click({force: true})
	//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	cy.wait(5000)

})	

it('Verify Validation Massage - Leave should be greater than or equal to : 180',function() {
	const { softAssert, softExpect } = chai;
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 170); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

var today = new Date(dateFormated);
var dd = today.getDate();


var after170days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after170days_Date);
cy.wait(2000)

			
	//cy.navigate_EmployeeLeave()
	//cy.delete_EmployeesAllLeaves()
				
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			cy.get('#fromdate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click({force: true}).then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(after170days_Date)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
	cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Maternity Leave');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(5000)
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Leave should be greater than or equal to : 180');	
	})
	cy.get('#btnclose').click({force: true})
	//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	cy.wait(5000)


})	
*/
it('Apply Maternity Leave (180 Days) for Female',function() {
	const { softAssert, softExpect } = chai;
	cy.navigate_FemaleEmployeeProfile()		
	cy.navigate_EmployeeLeave()

		var someDate = new Date();
someDate.setDate(someDate.getDate() + 179); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
dd='0'+dd;
} 

if(mm<10) 
{
mm='0'+mm;
} 
/*today = mm+'-'+dd+'-'+yyyy;
cy.log(today);
today = mm+'/'+dd+'/'+yyyy;
cy.log(today);
today = dd+'-'+mm+'-'+yyyy;
cy.log(today);
*/
var after179days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after179days_Date);
cy.wait(2000)


	//cy.navigate_EmployeeLeave()
	//cy.delete_EmployeesAllLeaves()
				
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			cy.get('#fromdate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click({force: true}).then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(after179days_Date)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
	cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Maternity Leave');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(17000)
	//cy.get(".toast-message").invoke('text').then((text) => {
	//	cy.log(text.trim())
	//	softExpect(text.trim()).to.eq('Leave Updated Successfully');	
	//})
	cy.get('#btnclose').click({force: true})
	//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	cy.wait(5000)


})	



})