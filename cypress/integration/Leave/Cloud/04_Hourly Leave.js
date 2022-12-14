describe('Hourly Leave', function() {
	
	var moment = require('moment');
		const Day = moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = moment().format('MM')
		const year = moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
	
var url = Cypress.env('url')
var FinancialYear_From = Cypress.env('FinancialYear_From')

var employeeID = 'L2'
var employeeCodeName = 'Manager LeaveData'
var PayrollProcessMonth=''	
var EmpLengthInMonthlyInput= ''
	
let hourlyLeave = 
{LeaveType: "HourlyLeave" , EntryDate: currentDate, InDate_HH: "09", InDate_MM: "00", OutDate_HH: "10", OutDate_MM: "00", Minute: "09:00 - 10:00"}

		 

beforeEach(function(){
	cy.getCookies()
	})
	
it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})



Cypress.Commands.add('navigate_EmployeeProfile',()=>{

	var employeeID = 'L2'
 cy.wait(1000)
	cy.get('#globalSearch').click({force: true})		
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(employeeID)
	cy.wait(2000)
	cy.contains('li', employeeCodeName).click({force: true})
	cy.wait(3000)
})

Cypress.Commands.add('navigate_EmployeeLeave',()=>{
 cy.wait(1000)
	cy.navigate_EmployeeProfile()
	
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

it('Add_NewLeave_SpecialLeave with Leavetype(hourly) ', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.server()
		cy.wait(1000)
		cy.get('#Leave_LeaveDefinition').click( {force: true})
		cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
		cy.wait(5000)
		cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
		//cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
		cy.wait(3000)
		cy.get('#leavName').click({force:true})
		cy.get('#leavName').type('Hourly Leave')
		cy.get('#leavDesc').type('Hourly Leave')
		cy.get('#leavCategory').select('SPL')
		cy.wait(1000)
		cy.get('#leaveType').select('Hourly',{force: true})
		cy.wait(1000)
		cy.get('#catall').check({force:true})
		cy.wait(1000)
		cy.get('#btnLeaveDefinationSave').click({force:true})
	   cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
})


it('Verify From time should be less than to time',function(){
const { softAssert, softExpect } = chai;

	cy.navigate_EmployeeLeave()	
	cy.delete_EmployeesAllLeaves()	
	cy.wait(5000)
			
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			cy.get('#leaveType').select(hourlyLeave.LeaveType)
			cy.wait(2000)
			
			cy.get('#entryDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(hourlyLeave.EntryDate)
		})
			
					cy.get('#FromHours').click({force: true})
					cy.get('#FromHours').clear()
					cy.get('#FromHours').type(hourlyLeave.OutDate_HH)	 
					
					cy.get('#FromMins').click({force: true})
					cy.get('#FromMins').clear()
					cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
					
					cy.get('#ToHours').click({force: true})
					cy.get('#ToHours').clear()
					cy.get('#ToHours').type(hourlyLeave.InDate_HH)	
					
					cy.get('#ToMins').click({force: true})
					cy.get('#ToMins').clear()
					cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(3000)
	
	cy.get(".toast-message").invoke('text').then((text) => {		
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From time should be less than to time');
	})	
	
			cy.wait(2000)
			cy.get('#leaveType').select(hourlyLeave.LeaveType)
			cy.wait(2000)
			
			cy.get('#entryDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(hourlyLeave.EntryDate)
		})
			
					cy.get('#FromHours').click({force: true})
					cy.get('#FromHours').clear()
					cy.get('#FromHours').type(hourlyLeave.InDate_HH)	 
					
					cy.get('#FromMins').click({force: true})
					cy.get('#FromMins').clear()
					cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
					
					cy.get('#ToHours').click({force: true})
					cy.get('#ToHours').clear()
					cy.get('#ToHours').type(hourlyLeave.OutDate_HH)	
					
					cy.get('#ToMins').click({force: true})
					cy.get('#ToMins').clear()
					cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(3000)
	
	cy.get(".toast-message").invoke('text').then((text) => {		
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Leave Updated Successfully');
	})	
	
	cy.get('#btnclose').click({force: true})
	cy.wait(2000)
	
				
			cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
			cy.log("leaveType: "+leaveType)
			softExpect(leaveType).to.eq(hourlyLeave.LeaveType);	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
			cy.log("leaveDate: "+leaveDate)
			softExpect(leaveDate).to.eq(hourlyLeave.EntryDate);	
			})
			
			
			cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveMin) => {	
			cy.log("leaveMin: "+leaveMin)
			softExpect(leaveMin).to.eq(hourlyLeave.Minute);	
			})
			
	})

it('If leave is already applied within same time frame then it will not allowed',function(){
const { softAssert, softExpect } = chai;

			
			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
		
			cy.get('#leaveType').select(hourlyLeave.LeaveType)
			cy.wait(2000)
			cy.get('#entryDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(hourlyLeave.EntryDate)
		})
			
		
					cy.get('#FromHours').click({force: true})
					cy.get('#FromHours').clear()
					cy.get('#FromHours').type(hourlyLeave.InDate_HH)	 
					
					cy.get('#FromMins').click({force: true})
					cy.get('#FromMins').clear()
					cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
					
					cy.get('#ToHours').click({force: true})
					cy.get('#ToHours').clear()
					cy.get('#ToHours').type(hourlyLeave.OutDate_HH)	
					
					cy.get('#ToMins').click({force: true})
					cy.get('#ToMins').clear()
					cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(3000)
	
	cy.get(".toast-message").invoke('text').then((text) => {		
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Entry Alreay Exists Within Same Time Frame');
	})	
	
	cy.get('#btnclose').click({force: true})
	cy.wait(2000)
	
			
	})


	
})