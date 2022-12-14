describe('Attendence Module ', function() {

	
	var machineNo = 1
	var machineName = 'Machine_'+machineNo
	
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	it('Pocket HRMS Login', function() {
		cy.login()
	})


	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany();
	}) 
	
	
	it('Navigate to Attendance', function() {
		//cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)			
	})
	
	it('General Time Office Settings', function() {
		cy.get('#Attendance_GeneralTimeOfficeSettings').click({force: true})
		cy.wait(3000)
		cy.get('#ddLate').select('COMPCODE',{force: true})
		cy.get('#ddPermission').select('COMPCODE',{force: true})
		cy.get('#ddOverTime').select('CATEGORY',{force: true})
		cy.wait(1000)
		cy.get('#ddLunchTime').select('COMPCODE',{force: true})
		cy.get('#ddPaidHoliday').select('COMPCODE',{force: true})
		cy.get('#ddPaidWeekOff').select('COMPCODE',{force: true})
		cy.get('#ddShift').select('COMPCODE',{force: true})
		cy.get('#ddUnpunch').select('COMPCODE',{force: true})
		cy.wait(1000)
		cy.get('#ddOnDuty').select('COMPCODE',{force: true})
		cy.get('#ddUserRights').select('CATEGORY',{force: true})
		cy.get('#ddOTCompOff').select('COMPCODE',{force: true})
		cy.get('#ddPermissionEntry').select('SINGLE',{force: true})
		cy.wait(1000)
		cy.get('#ddPunchImpType').select('SISO',{force: true})
		cy.get('#ddPunchImpPar').select('COMPCODE',{force: true})
		cy.get('#ddPunchImpLog').select('MD',{force: true})
		cy.get('#ddShiftEntInp').select('CM',{force: true})
		cy.wait(1000)
		cy.get('#ddPayrollPost').select('CM',{force: true})
		cy.get('#ddLeaveEntInp').select('CM',{force: true})
        cy.get('#btnSaveGeneralTimeOffice').click({force: true})
		cy.wait(6000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully !')
			//cy.get(".toast-message").click()
		})
	})
		
	it('Add Shift Details', function() {
		cy.wait(1000)
		
		cy.readFile('D:/CypressPocketHRMS_Cloud/cypress/fixtures/Attendance/ShiftDetails.json').then((text) =>{
                 text.forEach(function(entry) {	

		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(3000)	
		
		
		cy.get("button").then(($sp) => {
			var result = $sp.hasClass('mb-1')
			cy.log(result)
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true});
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click({force: true});
		}
		})
	
		cy.wait(3000)
		cy.get('#insShiftName').click({force: true})
		cy.get('#insShiftName').clear()		
		cy.get('#insShiftName').type(entry.ShiftName)
		
		cy.get('#insFromHour').click({force: true})
		cy.get('#insFromHour').clear()
		cy.get('#insFromHour').type(entry.FromTime_HH)	
		
		cy.get('#insFromMin').click({force: true})
		cy.get('#insFromMin').clear()
		cy.get('#insFromMin').type(entry.FromTime_MM)
		
		cy.wait(1000)
		cy.get('#insToHour').click({force: true})
		cy.get('#insToHour').clear()
		cy.get('#insToHour').type(entry.ToTime_HH)	
		
		cy.get('#insToMin').click({force: true})
		cy.get('#insToMin').clear()
		cy.get('#insToMin').type(entry.ToTime_MM)
		
		cy.wait(1000)
		cy.get('select[id=insStatus]').select(entry.Status,{force: true})	
		
		cy.get('#insShortName').click({force: true})
		cy.get('#insShortName').clear()
		cy.get('#insShortName').type(entry.ReportShortName)
			
		cy.wait(1000)
		cy.get('#ddImportINStart').select(entry.ImportINTimeStartAs_Day,{force: true})
		
		cy.get('#txtImportINStartHour').click({force: true})
		cy.get('#txtImportINStartHour').clear()
		cy.get('#txtImportINStartHour').type(entry.ImportINTimeStartAs_HH)	
		
		cy.get('#txtImportINStartMin').click({force: true})
		cy.get('#txtImportINStartMin').clear()
		cy.get('#txtImportINStartMin').type(entry.ImportINTimeStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportINEnd').select(entry.ImportINTimeEndAs_Day,{force: true})	
		
		cy.get('#txtImportINEndHour').click({force: true})
		cy.get('#txtImportINEndHour').clear()
		cy.get('#txtImportINEndHour').type(entry.ImportINTimeEndAs_HH)	
		
		cy.get('#txtImportINEndMin').click({force: true})
		cy.get('#txtImportINEndMin').clear()
		cy.get('#txtImportINEndMin').type(entry.ImportINTimeEndAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportOUTStart').select(entry.ImportOutTimeStartAs_Day,{force: true})	
		
		cy.get('#txtImportOUTStartHour').click({force: true})
		cy.get('#txtImportOUTStartHour').clear()
		cy.get('#txtImportOUTStartHour').type(entry.ImportOutTimeStartAs_HH)	
		
		cy.get('#txtImportOUTStartMin').click({force: true})
		cy.get('#txtImportOUTStartMin').clear()
		cy.get('#txtImportOUTStartMin').type(entry.ImportOutTimeStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportOUTEnd').select(entry.ImportOutTimeEndAs_Day,{force: true})	
		
		cy.get('#txtImportOUTEndHour').click({force: true})
		cy.get('#txtImportOUTEndHour').clear()
		cy.get('#txtImportOUTEndHour').type(entry.ImportOutTimeEndAs_HH)	
		
		cy.get('#txtImportOUTEndMin').click({force: true})
		cy.get('#txtImportOUTEndMin').clear()
		cy.get('#txtImportOUTEndMin').type(entry.ImportOutTimeEndAs_MM)
		
		cy.wait(1000)
		cy.get('#ddLunchInStart').select(entry.LunchINStartAs_Day,{force: true})	
		
		cy.get('#txtLunchINStartHour').click({force: true})
		cy.get('#txtLunchINStartHour').clear()
		cy.get('#txtLunchINStartHour').type(entry.LunchINStartAs_HH)	
		
		cy.get('#txtLunchINStartMin').click({force: true})
		cy.get('#txtLunchINStartMin').clear()
		cy.get('#txtLunchINStartMin').type(entry.LunchINStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddLunchInEnd').select(entry.LunchINEndAs_Day,{force: true})	
		
		cy.get('#txtLunchINEndHour').click({force: true})
		cy.get('#txtLunchINEndHour').clear()
		cy.get('#txtLunchINEndHour').type(entry.LunchINEndAs_HH)	
		
		cy.get('#txtLunchINEndMin').click({force: true})
		cy.get('#txtLunchINEndMin').clear()
		cy.get('#txtLunchINEndMin').type(entry.LunchINEndAs_MM)
	
		cy.wait(1000)
		cy.get('#btnSaveShift').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Settings saved successfully.!')
			//cy.get(".toast-message").click()
		})
		})
		 })
	})	
	
	
})	