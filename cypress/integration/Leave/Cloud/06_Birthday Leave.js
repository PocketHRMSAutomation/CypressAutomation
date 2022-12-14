describe('Birthday Leave', function() {
	
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
let leave ={LeaveType: "BL", FromDate: "06/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "06/04/"+FinancialYear_From, ToDateDay: "FULL DAY",
	ToDate1 :"07/04/"+FinancialYear_From, Birthday :"01/12/"+FinancialYear_From};
	 
beforeEach(function(){
	cy.getCookies()
})


	
it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
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
   
	   
  it('Verify Validation Massage - Opening is not required for BIRTH DAY LEAVE', function() {
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
		  // cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
		   cy.wait(2000)
		   cy.get('#leavName').type('BL')
		   cy.get('#leavDesc').type('Birthday Leave')
		   cy.get('#leavCategory').select('BL')
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
			   expect(text.trim()).equal('Opening is not required for BIRTH DAY LEAVE')		
		   })
	   cy.get(".toast-message").click({force:true})
  
   })
	   
   it('Add Leave Defination for Birthday Leave', function() {
	   
		   cy.server()	
		   cy.wait(2000)
		  // cy.get('#Leave_LeaveDefinition').click( {force: true})
		   cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
		   cy.wait(2000)
		   //cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
		  // cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
		   cy.wait(2000)
		   cy.get('#leavName').clear()
		   cy.get('#leavName').type('BL')
		   cy.get('#leavDesc').clear()
		   cy.get('#leavDesc').type('Birthday Leave')
		   cy.get('#leavCategory').select('BL')
		   cy.get('#leavOpen').select('NOT REQUIRED',{force:true})
		   cy.wait(2000)
		   cy.get('#crRounding').select('NIL',{force:true})
		   cy.wait(1000)
		   cy.get('#leaveType').select('Day Wise',{force: true})
		   cy.get('#catall').check({force:true})
		   cy.get('#btnLeaveDefinationSave').click({force:true})
		   cy.wait(1000)
		   cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
		   cy.get(".toast-message").invoke('text').then((text) => {
			   expect(text.trim()).equal('Records Saved Successfully!!!')		
		   })
	   cy.get(".toast-message").click({force:true})
  
   }) 

   it('Verify Validation Massage - Birthday Leave Only Allowed On Employee Date Of Birth',function() {
	   const { softAssert, softExpect } = chai;
			   
	   cy.navigate_MaleEmployeeProfile()
	   cy.navigate_EmployeeLeave()
	   cy.delete_EmployeesAllLeaves()
				   
			   cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			   cy.wait(2000)
			   cy.get('#fromdate').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			   input.val(leave.FromDate)
		   })
	  
		   cy.wait(1000)
		   cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
		   input.val(leave.ToDate)
		   })
   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
	   cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
	   cy.get('#leaveType').select(leave.LeaveType,{force: true})
	   
	   cy.get('#remarks').click({force: true})
	   cy.get('#remarks').clear()
	   cy.get('#remarks').type('Birthday Leave');
	   
	   cy.wait(3000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(5000)
	   cy.get(".toast-message").invoke('text').then((text) => {
		   cy.log(text.trim())
		   softExpect(text.trim()).to.eq("Birthday Leave Only Allowed On Employee's Date Of Birth");	
	   })
	   cy.get('#btnclose').click({force: true})
	   //cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	   cy.wait(5000)

   
   })	
   
   it('Verify Validation Massage - For Birthday Leave Only One Day Leave Allowed',function() {
	   const { softAssert, softExpect } = chai;
			   
	   //cy.navigate_MaleEmployeeProfile()
	   //cy.navigate_EmployeeLeave()
	   cy.delete_EmployeesAllLeaves()
				   
			   cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			   cy.wait(2000)
			   cy.get('#fromdate').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			   input.val(leave.FromDate)
		   })
	  
		   cy.wait(1000)
		   cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
		   input.val(leave.ToDate1)
		   })
   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
	   cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
	   cy.get('#leaveType').select(leave.LeaveType,{force: true})
	   
	   cy.get('#remarks').click({force: true})
	   cy.get('#remarks').clear()
	   cy.get('#remarks').type('Birthday Leave');
	   
	   cy.wait(3000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(5000)
	   cy.get(".toast-message").invoke('text').then((text) => {
		   cy.log(text.trim())
		   softExpect(text.trim()).to.eq("For Birthday Leave Only One Day Leave Allowed");	
	   })
	   cy.get('#btnclose').click({force: true})
	   //cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	   cy.wait(5000)

   
   })	
   
   it('Add Birthday Leave',function() {
	   const { softAssert, softExpect } = chai;
			   
	   //cy.navigate_MaleEmployeeProfile()
	   //cy.navigate_EmployeeLeave()
	   cy.delete_EmployeesAllLeaves()
				   
			   cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			   cy.wait(2000)
			   cy.get('#fromdate').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			   input.val(leave.Birthday)
		   })
	  
		   cy.wait(1000)
		   cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
		   input.val(leave.Birthday)
		   })
   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
	   cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
	   cy.get('#leaveType').select(leave.LeaveType,{force: true})
	   
	   cy.get('#remarks').click({force: true})
	   cy.get('#remarks').clear()
	   cy.get('#remarks').type('Birthday Leave');
	   
	   cy.wait(3000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(5000)
	   cy.get(".toast-message").invoke('text').then((text) => {
		   cy.log(text.trim())
		   softExpect(text.trim()).to.eq("Leave Updated Successfully");	
	   })
	   cy.get('#btnclose').click({force: true})
	   //cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	   cy.wait(5000)

   
   })	
   
   it('Verify Validation Massage - Leave is already applied for the same date',function() {
	   const { softAssert, softExpect } = chai;
			   
	   //cy.navigate_MaleEmployeeProfile()
	   //cy.navigate_EmployeeLeave()
	   //cy.delete_EmployeesAllLeaves()
				   
			   cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			   cy.wait(2000)
			   cy.get('#fromdate').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			   input.val(leave.Birthday)
		   })
	  
		   cy.wait(1000)
		   cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
		   input.val(leave.Birthday)
		   })
   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
	   cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
	   cy.get('#leaveType').select(leave.LeaveType,{force: true})
	   
	   cy.get('#remarks').click({force: true})
	   cy.get('#remarks').clear()
	   cy.get('#remarks').type('Birthday Leave');
	   
	   cy.wait(3000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(5000)
	   cy.get(".toast-message").invoke('text').then((text) => {
		   cy.log(text.trim())
		   softExpect(text.trim()).to.eq("Leave is already applied for the same date");	
	   })
	   cy.get('#btnclose').click({force: true})
	   //cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
	   cy.wait(5000)

   
   })	
   
   
   

})