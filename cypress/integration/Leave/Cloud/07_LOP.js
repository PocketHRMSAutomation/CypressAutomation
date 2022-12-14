describe('Leave Process ', function() {
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
var url = Cypress.env('url')
var pastYear  = Cypress.env('pastYear')
var FinancialYear_From = Cypress.env('FinancialYear_From')

var employeeCode = 'L2'
//var employeeCodeName = 'Leave test(CY3)'
//var employeeCodeName = 'Leave Test1(CY3)'
var lopMonth = 'January'
let leave ={LeaveType: "Paid Leave", FromDate: "06/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "06/04/"+FinancialYear_From, ToDateDay: "FULL DAY"};

let leaveDateRange =
	[{LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FULL DAY", TwoDays:"No"},
	 {LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY", TwoDays:"No"},
	 {LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY",TwoDays:"No"}, 
	 {LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY", TwoDays:"No"},
	  {LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY", TwoDays:"No"},
	  {LeaveType: "LOP Days", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "16/04/"+FinancialYear_From, ToDateDay: "FULL DAY", TwoDays:"Yes"},
];
	
let leaveDateRange1 =
	[{LeaveType: "Casual Leave", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FULL DAY", TwoDays:"No"},
	 {LeaveType: "Casual Leave", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY", TwoDays:"No"},
	 {LeaveType: "Casual Leave", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY",TwoDays:"No"}, 
	 {LeaveType: "Casual Leave", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY", TwoDays:"No"},
	  {LeaveType: "Casual Leave", FromDate: "15/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY", TwoDays:"No"},
	  {LeaveType: "Casual Leave", FromDate: "14/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "15/04/"+FinancialYear_From, ToDateDay: "FULL DAY", TwoDays:"Yes"},
	];
	

	beforeEach(function(){
		cy.getCookies()
	})
	
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})

Cypress.Commands.add('navigate_EmployeeProfile',()=>{
 cy.wait(1000)
	cy.get('#globalSearch').click({force: true})		
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(employeeCode)
	cy.wait(2000)
	cy.contains('li', employeeCode).click({force: true})
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
		var result = $sp.hasClass('dripicons-message')
		cy.log(result)
	if ($sp.hasClass('dripicons-message')) {
	
	cy.get('.dripicons-message').then(listing => {
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
	cy.get('#Leave_LeaveConfiguration').click()
	cy.get('#Leave_LeaveConfiguration').click({force:true})
	cy.wait(8000)
	
	cy.get('#ddLeavType').select(LeaveType)
	cy.wait(2000)

	cy.get('#btnDelete').click({force:true})
})	
/*
it('Release Paysheet Lock',function(){
	
	cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')	
		cy.wait(2000)
		
		cy.get('#Month1').select(lopMonth,{force: true})
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear().type(pastYear)
	
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		
		
		cy.wait(2000)
		cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
		cy.xpath("//button[@id='btnRelease']").click({force: true})
		cy.wait(3000)
	
})	


it('Delete Payroll Process', function() {
	const { softAssert, softExpect } = chai;
	cy.navigate_EmployeeProfile()
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get('#month').select(lopMonth,{force: true})
		cy.wait(1000)
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(10000)			
})
*/
/*	it('Delete Leave Posting',function(){
	cy.visit(Cypress.env('url')+'Leave/transaction/LeavePost')
cy.wait(2000)
	cy.get('#month').select(lopMonth,{force: true})
	
	cy.get('#catall').click({force: true})
	
	cy.get('#btnProcessLeavePost').click({force: true})
	cy.wait(5000)
	cy.get('#btnDeleteLeavePost').click({force: true})
	cy.wait(5000)
})

*/

it('Verify LOSS OF PAY DAYS Leaves',function(){
const { softAssert, softExpect } = chai;
	cy.navigate_EmployeeLeave()	
	
	//for(let j=0; j< leaveDateRange.length; j++){
		for(let j=0; j< 1; j++){
	
	
	cy.delete_EmployeesAllLeaves()	
	cy.wait(5000)

		

			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			
			cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveDateRange[j].FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(leaveDateRange[j].ToDate)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay,{force: true})
	//cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
	//cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
	cy.get('#leaveType').select(leaveDateRange[j].LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Test');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(3000)
	
	cy.get('#btnclose').click({force: true})
	cy.wait(2000)
	
	var fromDate1 = (leaveDateRange[j].FromDate).toString();
	var toDate1 = (leaveDateRange[j].ToDate).toString();	
	var fromDate = new Date(fromDate1);
	var toDate = new Date(toDate1);
	cy.log("fromDate: "+fromDate.toDateString())
	cy.log("toDate: "+toDate.toDateString())

	
	cy.get(".toast-message").invoke('text').then((text) => {		
		cy.log(text.trim())

	cy.wait(2000)


	//if(fromDate.getTime() === toDate.getTime())
	//	if(fromDate.toDateString() === toDate.toDateString()){	
	
		if(leaveDateRange[j].FromDateDay == leaveDateRange[j].ToDateDay){
			softExpect(text.trim()).to.eq('Leave Updated Successfully');
			//softExpect(text.trim()).to.eq('Balanced Half day Leave 0');
			

			cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
			cy.log("leaveType: "+leaveType)
			softExpect(leaveType).to.eq('LD');	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
			cy.log("leaveDate: "+leaveDate)
			softExpect(leaveDate).to.eq(leaveDateRange[j].FromDate+' - '+leaveDateRange[j].ToDate);	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
			cy.log("leaveDay: "+leaveDay)
			if(leaveDateRange[j].FromDateDay == 'FULL DAY')
			{
			softExpect(leaveDay).to.eq(' FullDay - FullDay');	
			}
			else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
			{
			softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
			}
			else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
			{
			softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
			}	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
			cy.log("leaveDays: "+leaveDays)
			if(leaveDateRange[j].FromDateDay == 'FULL DAY')
			{
			if(leaveDateRange[j].TwoDays == 'No')
			{
				softExpect(leaveDays).to.eq('1');
			}else{
				softExpect(leaveDays).to.eq('2');
			}
			}
			else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
			{
			softExpect(leaveDays).to.eq('0.5');	
			}
			else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
			{
			softExpect(leaveDays).to.eq('0.5');	
			}	
			})
			
			
		}
		else{
			softExpect(text.trim()).to.eq('From Day and To Day type should be same.');
			cy.get('#btnclose').click({force: true})
		}
		
//	}			
	})
	
	}
			
	})

/*	it('Verify Causal Leaves',function(){
const { softAssert, softExpect } = chai;
	cy.navigate_EmployeeLeave()	
	
	for(let j=0; j< leaveDateRange1.length; j++){
	
	cy.delete_EmployeesAllLeaves()	
	cy.wait(5000)

		

			cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
			
			cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveDateRange1[j].FromDate)
		})
   
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(leaveDateRange1[j].ToDate)
		})

	cy.wait(1000)
	cy.get('#drpFromDayType').select(leaveDateRange1[j].FromDateDay,{force: true})
	cy.get('#drpToDayType').select(leaveDateRange1[j].ToDateDay,{force: true})
	//cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
	//cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
	cy.get('#leaveType').select(leaveDateRange1[j].LeaveType,{force: true})
	
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').clear()
	cy.get('#remarks').type('Test');
	
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(3000)
	
	cy.get('#btnclose').click({force: true})
	cy.wait(2000)
	
	var fromDate1 = (leaveDateRange1[j].FromDate).toString();
	var toDate1 = (leaveDateRange1[j].ToDate).toString();	
	var fromDate = new Date(fromDate1);
	var toDate = new Date(toDate1);
	cy.log("fromDate: "+fromDate.toDateString())
	cy.log("toDate: "+toDate.toDateString())

	
	cy.get(".toast-message").invoke('text').then((text) => {		
		cy.log(text.trim())

	cy.wait(2000)
	//if(fromDate.getTime() === toDate.getTime())
	//	if(fromDate.toDateString() === toDate.toDateString()){	
	
		if(leaveDateRange1[j].FromDateDay == leaveDateRange1[j].ToDateDay){
			softExpect(text.trim()).to.eq('Leave Updated Successfully');
			

			cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
			cy.log("leaveType: "+leaveType)
			softExpect(leaveType).to.eq('LD');	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
			cy.log("leaveDate: "+leaveDate)
			softExpect(leaveDate).to.eq(leaveDateRange1[j].FromDate+' - '+leaveDateRange1[j].ToDate);	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
			cy.log("leaveDay: "+leaveDay)
			if(leaveDateRange1[j].FromDateDay == 'FULL DAY')
			{
			softExpect(leaveDay).to.eq(' FullDay - FullDay');	
			}
			else if(leaveDateRange1[j].FromDateDay == 'FIRST HALF DAY')
			{
			softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
			}
			else if(leaveDateRange1[j].FromDateDay == 'SECOND HALF DAY')
			{
			softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
			}	
			})
			
			cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
			cy.log("leaveDays: "+leaveDays)
			if(leaveDateRange1[j].FromDateDay == 'FULL DAY')
			{
			if(leaveDateRange1[j].TwoDays == 'No')
			{
				softExpect(leaveDays).to.eq('1');
			}else{
				softExpect(leaveDays).to.eq('2');
			}
			}
			else if(leaveDateRange1[j].FromDateDay == 'FIRST HALF DAY')
			{
			softExpect(leaveDays).to.eq('0.5');	
			}
			else if(leaveDateRange1[j].FromDateDay == 'SECOND HALF DAY')
			{
			softExpect(leaveDays).to.eq('0.5');	
			}	
			})
			
			
		}
		else{
			softExpect(text.trim()).to.eq('From Day and To Day type should be same.');
			cy.get('#btnclose').click({force: true})
		}
//	}			
	})
	
	}
			
	})
*/




})