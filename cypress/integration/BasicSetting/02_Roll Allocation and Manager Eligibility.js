describe('03_Manager Eligibility', function() {
	
	beforeEach(function(){
        cy.getCookies()
	})
			
	it('Login to Cloud & select company', function() {
		cy.login()
		cy.changeCompany();	
	})
	
	it('can add role alocation for leave - Manager ', () => {
		cy.visit(Cypress.env('url') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')
		
		//cy.get('#globalSearch').type('role allocation')
		//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
		cy.wait(2000)
		cy.get('#drpModule').select('Leave')
		cy.wait(1000)
		cy.get('#drpRole').select('Manager')
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Search')]").click()
		cy.wait(1000)
		cy.get('[class="chk menu"]').eq(0).click()
		cy.get('[class="chk menu"]').eq(1).click()
		cy.get('[class="chk menu"]').eq(2).click()
		cy.get('[class="chk menu"]').eq(3).click()
		cy.get('[class="chk menu"]').eq(4).click()
		cy.wait(1000)
		//click on save button
		cy.get('#savedata').click()
		//verify success message 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
	})
	it('can add role alocation for leave - user ', () => {
		//cy.get('#globalSearch').type('role allocation')
		//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
		cy.wait(2000)
		cy.get('#drpModule').select('Leave')
		cy.wait(1000)
		cy.get('#drpRole').select('User')
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Search')]").click()
		cy.wait(1000)
		cy.get('[class="chk menu"]').eq(0).click()
		cy.get('[class="chk menu"]').eq(1).click()
		cy.get('[class="chk menu"]').eq(2).click()
		cy.get('[class="chk menu"]').eq(3).click()
		cy.get('[class="chk menu"]').eq(4).click()
		cy.wait(1000)
		//click on save button
		cy.get('#savedata').click()
		//verify success message 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
	})
	it('can add role alocation for Profile - user ', () => {
		//cy.get('#globalSearch').type('role allocation')
		//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
		cy.wait(2000)
		cy.get('#drpModule').select('Profile')
		cy.get('#drpRole').select('User')
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Search')]").click()
		cy.wait(1000)
		cy.get('[class="chk menu"]').eq(0).click()
		cy.get('[class="chk menu"]').eq(1).click()
		cy.get('[class="chk menu"]').eq(2).click()
		cy.get('[class="chk menu"]').eq(3).click()
		cy.get('[class="chk menu"]').eq(4).click()
		cy.wait(1000)
		//click on save button
		cy.get('#savedata').click()
		//verify success message 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
	})
	it('can add role alocation for Profile - Manager ', () => {
		//cy.get('#globalSearch').type('role allocation')
		//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
		cy.wait(2000)
		cy.get('#drpModule').select('Profile')
		cy.get('#drpRole').select('Manager')
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Search')]").click()
		cy.wait(1000)
		cy.get('[class="chk menu"]').eq(0).click()
		cy.get('[class="chk menu"]').eq(1).click()
		cy.get('[class="chk menu"]').eq(2).click()
		cy.get('[class="chk menu"]').eq(3).click()
		cy.get('[class="chk menu"]').eq(4).click()
		cy.wait(1000)
		//click on save button
		cy.get('#savedata').click()
		//verify success message 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
	})

	it('Set Manager Eligibility details ', () => {
		cy.visit(Cypress.env('url') + 'Settings/Employee/ESSIndex?module=Leave&submodule=ManagerEligibility')
		//cy.get('#globalSearch').type('manager eligibility')
		//cy.xpath("//li[contains(text(),'Manager Eligibility')]").click()
		cy.wait(2000)
		cy.get('[value="Admin"]').click()
		cy.get('[value="Manager"]').click()
		cy.get('[value="User"]').click()
		cy.get('#btnSave').click()
	})


})