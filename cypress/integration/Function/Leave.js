

class Leave {


	verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
		leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
		leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
		ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2) {

		cy.xpath("//button[contains(@onclick,'displayModal')]").click({ force: true })

		const { softAssert, softExpect, softTrue } = chai;
		cy.wait(2000)

		cy.get('.form-horizontal > :nth-child(1) > :nth-child(1) > :nth-child(2)').invoke('text').then((EmployeeName) => {
			softExpect(EmployeeName.trim()).to.eq(EmployeeFirstName + " " + EmployeeLastName)
		})

		cy.get('.form-horizontal > :nth-child(2) > :nth-child(1) > :nth-child(2)').invoke('text').then((ManagerName) => {
			softExpect(ManagerName.trim()).to.eq(ManagerFirstName + ManagerLastName)
		})

		cy.get('.form-horizontal > :nth-child(1) > :nth-child(2) > :nth-child(2)').invoke('text').then((EmployeeID) => {
			softExpect(EmployeeID.trim()).to.eq(employeeID)
		})

		cy.get('.form-horizontal > :nth-child(1) > :nth-child(3) > :nth-child(2)').invoke('text').then((Department) => {
			softExpect(Department.trim()).to.eq(department.trim())
			//expect(Department.trim()).to.contains(Department.trim())
		})


		if (ManagerLevel == 1) {


			cy.get('.form-horizontal > :nth-child(2) > :nth-child(2) > :nth-child(2)').invoke('text').then((Designation) => {
				softExpect(Designation.trim()).to.eq(designation.trim())
				//expect(Designation.trim()).to.contains(Designation.trim())
			})


			cy.get('.form-horizontal > :nth-child(2) > :nth-child(3) > :nth-child(2)').invoke('text').then((EmployeeJoiningDate) => {
				softExpect(EmployeeJoiningDate.trim()).to.eq(employeeJoiningDate.trim())
				//expect(EmployeeJoiningDate.trim()).to.contains(employeeJoiningDate.trim())
			})
		}

		else if (ManagerLevel == 2) {

			cy.get('.form-horizontal > :nth-child(2) > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(ManagerFirstName_2 + ManagerLastName_2)
				//expect(Designation.trim()).to.contains(Designation.trim())
			})

			cy.get('.form-horizontal > :nth-child(2) > :nth-child(3) > :nth-child(2)').invoke('text').then((Designation) => {
				softExpect(Designation.trim()).to.eq(Designation.trim())
			})


			cy.get('.form-horizontal > :nth-child(2) > :nth-child(4) > :nth-child(2)').invoke('text').then((EmployeeJoiningDate) => {

				softExpect(EmployeeJoiningDate.trim()).to.eq(employeeJoiningDate.trim())
			})

			cy.get('.form-horizontal > :nth-child(2) > :nth-child(5) > :nth-child(2)').invoke('text').then((LeaveTypeValue) => {
				softExpect(LeaveTypeValue.trim()).to.contains(leaveTypeValue)
			})

			cy.get('.form-horizontal > :nth-child(2) > :nth-child(5) > :nth-child(2)').invoke('text').then((Balance) => {

				softExpect(Balance.trim()).to.contains(balance)
			})

			cy.get('.mt-4 > tbody > :nth-child(2) > :nth-child(1)').invoke('text').then((Approvel_2) => {

				softExpect(Approvel_2.trim()).to.eq('level  2')
			})

			cy.get('tbody > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
				assert.equal(text.trim(), managerID_2.trim(), "Manager 2 ID is not match")
				//softExpect(text.trim()).to.eq(managerID_2)
			})

			cy.get('tbody > :nth-child(2) > :nth-child(3)').invoke('text').then((text) => {
				assert.equal(text.trim(), ManagerFirstName_2 + ' ' + ManagerLastName_2.trim(), "Manager 2 Name is not match")
				//softExpect(text.trim()).to.eq(ManagerFirstName_2 + ' ' + ManagerLastName_2)
			})

			cy.get('tbody > :nth-child(2) > :nth-child(4)').invoke('text').then((text) => {
				assert.equal(text.trim(), ManagerStatus_2.trim(), "Manager 2 Status is not match")
				//softExpect(text.trim()).to.eq(ManagerStatus_2)
			})

			cy.get('tbody > :nth-child(2) > :nth-child(5)').invoke('text').then((text) => {
				assert.equal(text.trim(), ManagerRemark_2.trim(), "Manager 2 Remark is not match")
				//softExpect(text.trim()).to.eq(ManagerRemark_2.trim())
			})

			
		}

		cy.get('.form-horizontal > :nth-child(1) > :nth-child(4) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), todayDate.trim(), "Today Date is not match")
			//softExpect(text.trim()).to.eq(todayDate)
		})


		cy.get('.form-horizontal > :nth-child(3) > :nth-child(1) > :nth-child(2)').invoke('text').then((LeaveFromDay) => {

			cy.log(LeaveFromDay.trim())
			var data = LeaveFromDay.trim()
			var date = data.slice(0, 11);
			cy.log(date)
			var type = data.slice(11, 18);
			cy.log(type)

			softExpect(date.trim()).to.contains(leaveFromDate)
			softExpect(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(type.trim().toLowerCase())
			//softExpect(type.trim().toLowerCase()).to.contains(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase())
		})


		cy.get('.form-horizontal > :nth-child(3) > :nth-child(2) > :nth-child(2)').invoke('text').then((LeaveToDay) => {

			cy.log(LeaveToDay.trim())
			var data = LeaveToDay.trim()
			var date = data.slice(0, 11);
			cy.log(date)
			var type = data.slice(11, 18);
			cy.log(type)

			softExpect(date.trim()).to.contains(leaveToDate)
			softExpect(leaveToDayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(type.trim().toLowerCase())
			//softExpect(type.trim().toLowerCase()).to.contains(leaveToDayType.replace(/ +/g, "").trim().toLowerCase())


			//expect(text.trim()).to.contains(leaveToDate +" "+leaveToDayType.replace(/ +/g, "").trim().toLowerCase())
		})

		cy.get('.form-horizontal > :nth-child(4) > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), Reason.trim(), "Leave Reason is not match")
			//softExpect(text.trim()).to.eq(Reason.trim())
			//expect(text.trim()).to.contains(Reason)
		})

		cy.get('.form-horizontal > :nth-child(4) > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), LeaveStation.trim(), "Leave Station is not match")
			//softExpect(text.trim()).to.eq(LeaveStation.trim())
			//expect(text.trim()).to.contains(LeaveStation)
		})

		cy.get('.form-horizontal > :nth-child(3) > :nth-child(3) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), VacationAddress.trim(), "Vacation Address is not match")
			//softExpect(text.trim()).to.eq(VacationAddress.trim())
			//expect(text.trim()).to.contains(VacationAddress)
		})

		cy.get(':nth-child(4) > :nth-child(3) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), ContactNumber.trim(), "Contact Number is not match")
			//softExpect(text.trim()).to.eq(ContactNumber.trim())
			//expect(text.trim()).to.contains(ContactNumber)
		})

		if (ReliverSetting == 'Yes') {
			cy.get('.form-horizontal > :nth-child(3) > :nth-child(4) > :nth-child(2)').invoke('text').then((text) => {
				assert.equal(text.trim(), ReliverCode.trim(), "Reliver Code is not match")
				//softExpect(text.trim()).to.eq(ReliverCode.trim())
				//expect(text.trim()).to.contains(ReliverCode)
			})

			cy.get(':nth-child(4) > :nth-child(4) > :nth-child(2)').invoke('text').then((text) => {
				assert.equal(text.trim(), ReliverName.trim(), "Reliver Name is not match")
				//softExpect(text.trim()).to.eq(ReliverName.trim())
				//expect(text.trim()).to.contains(ReliverName)
			})

			cy.get('.form-horizontal > :nth-child(3) > :nth-child(5) > :nth-child(2)').invoke('text').then((text) => {
				assert.equal(text.trim(), department.trim(), "Reliver Department is not match")
				//softExpect(text.trim()).to.eq(ReliverName.trim())
				//expect(text.trim()).to.contains(ReliverName)
			})

		}

		cy.get('.mt-4 > tbody > :nth-child(1) > :nth-child(1)').invoke('text').then((text) => {
			assert.equal(text.trim(), APPROVERS.trim(), "Approver is not match")
			//softExpect(text.trim()).to.eq(APPROVERS.trim())
			//expect(text.trim()).to.contains(APPROVERS)
		})


		cy.get('.mt-4 > tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
			assert.equal(text.trim(), managerID.trim(), "Manager ID is not match")
			//softExpect(text.trim()).to.eq(managerID.trim())
			//expect(text.trim()).to.contains(managerID)
		})

		cy.get('.mt-4 > tbody > :nth-child(1) > :nth-child(3)').invoke('text').then((text) => {
			assert.equal(text.trim(), (ManagerFirstName + " " + ManagerLastName), "Manager Name is not match")
			//softExpect(text.trim()).to.eq((ManagerFirstName + " " + ManagerLastName))
			//expect(text.trim()).to.contains((ManagerFirstName + " " + ManagerLastName))
		})
		cy.get('.mt-4 > tbody > :nth-child(1) > :nth-child(4)').invoke('text').then((text) => {
			assert.equal(text.trim(), ManagerStatus_1, "Manager Status is not match")

		})
		cy.get('.mt-4 > tbody > :nth-child(1) > :nth-child(5)').invoke('text').then((text) => {
			assert.equal(ManagerRemark_1, text.trim(), "Manager Remark is not match")

		})

		cy.get('#balance-dialog > .modal-dialog > .modal-content > .modal-footer > .btn').click({ force: true })

	}

	applyLeave(leaveType, balance, leaveDay, leaveFromDate, leaveToDate, leaveFromDayType, leaveToDayType,
		Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
		ReliverSetting) {

		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

		cy.wait(3000)
		cy.get('#drpLeaveType').select(leaveType)
		cy.wait(500)

		if (ReliverSetting == 'Yes') {
			cy.get('#select2-multiEmp-container').click({ force: true })
			cy.get('input[type="search"]').click({ force: true })
			cy.get('input[type="search"]').type(ReliverCode)
			cy.contains('li', '[' + ReliverCode + ']').click({ force: true })
		}

		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
		})

		cy.get('#txtReason').click({ force: true })

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
		})

		cy.get('#txtReason').click({ force: true })
		cy.get('#txtReason').type(Reason)

		cy.get('#drpFromLeaveTyp').select(leaveFromDayType, { force: true })
		cy.get('#drpToLeaveTyp').select(leaveToDayType, { force: true })

		cy.get('#drpLeaveStation').select(LeaveStation, { force: true })

		cy.get('#txtAddress').click({ force: true })
		cy.get('#txtAddress').type(VacationAddress)
		cy.get('#txtContact').click({ force: true })
		cy.get('#txtContact').type(ContactNumber)


		cy.get('#btnAdd').click({ force: true })

		cy.get('[data-title="From Date"]').should('have.text', leaveFromDate);
		cy.get('[data-title="Half/Full Day"]').eq(0).should('have.text', leaveFromDayType);

		// cy.get('#tblLeave > tbody > tr > :nth-child(2)').should('have.text', leaveFromDayType);
		cy.get('[data-title="To Date"]').should('have.text', leaveToDate);
		cy.get('[data-title="Half/Full Day"]').eq(1).should('have.text', leaveFromDayType);

		// cy.get('#tblLeave > tbody > tr > :nth-child(4)').should('have.text', leaveToDayType);
		cy.get('.days').invoke('text').then((text) => {
			assert.equal(leaveDay, text.trim(), "Leave days is not match")
			//softExpect(parseInt(text)).to.eq(parseInt(leaveDay));
		})
		//cy.get('.days').should('have.text', leaveDay);
		cy.get('[data-title="Leave Type"]').should('have.text', leaveType);
		cy.get('#btnConfirm').click();

		cy.get('.noty_body').should('have.text', "Leave Applied Successfully!!!");

		cy.wait(2000)

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[1]/span").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Pending');
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[2]").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq(leaveFromDate);
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[3]").invoke('text').then((text) => {
			softExpect(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(text.trim().toLowerCase())
			//softExpect(text.trim().toLowerCase()).to.contains(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase());
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[4]").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq(leaveToDate);
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[5]").invoke('text').then((text) => {
			softExpect(leaveToDayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(text.trim().toLowerCase())
			//softExpect(text.trim().toLowerCase()).to.contains(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase());
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[6]").invoke('text').then((text) => {
			assert.equal(leaveDay, text.trim(), "Leave days is not match")
			//softExpect(parseInt(text)).to.eq(parseInt(leaveDay));
		})

		cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[7]").invoke('text').then((text) => {
			assert.equal(leaveType, text.trim(), "Leave Type is not match")
			//softExpect(text.trim()).to.eq(leaveType);
		})

		
	}

	verifyNotificationAtManager(employeeID) {
		var moment = require('moment');
		//cy.get('#empCount').click();
		cy.get('[style="position:relative;"] > .nav-link > .fa').click({force:true});


		const addTen = moment().add(10, 'minutes').calendar()
		var addTenMinutesTime = addTen.slice(8);

		const subtractTen = moment().subtract(10, 'minutes').calendar()
		var subtractTenMinutesTime = subtractTen.slice(8);

		const currentTime = moment().format('DD MMM yyyy')

		var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

		var afterTenMinutes = currentTime + " " + addTenMinutesTime

		const start = moment(beforeTenMinutes)
		const end = moment(afterTenMinutes)
		// display hours + minutes + AM|PM
		const f = 'DD MMM yyyy hh:mm A'


		cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
			cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
				cy.log("title: " + title)
				cy.log("Note: " + Note)
				expect(title.trim()).to.include('Leave Applied')
				expect(Note.trim()).to.include(employeeID)
				//softExpect(Note.trim()).to.contains(employeeID);	

				cy.get('.content-body >h6 >small').eq(0).should(($el) => {
					const m = moment($el.text().trim())
					expect(m.isBetween(start, end),
						`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
				})

			})
		})


	}

	verifyRequstedLeaveDetailsAtManager(employeeID, EmployeeFirstName, EmployeeLastName,
		leaveTypeValue, leaveFromDate, leaveToDate) {

		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)


		cy.get('#tblData > tbody > tr').each(function (row, i) {
			var num = parseFloat(i + 1)

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(3)').invoke('text').then((EmpCode) => {
				expect(EmpCode.trim()).to.equal(employeeID)
			})

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(4)').invoke('text').then((EmpCode) => {
				expect(EmpCode.trim()).to.contains(EmployeeFirstName)
			})

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(4)').invoke('text').then((EmpCode) => {
				expect(EmpCode.trim()).to.contains(EmployeeLastName)
			})

			cy.readFile('cypress/fixtures/Company.json').then((text) => {
				text.forEach(function (entry) {

					var company = entry.comapnayname

					cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(5)').invoke('text').then((LeaveType) => {
						expect(LeaveType.trim()).to.equal(company)
					})

				})
			})

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(7)').invoke('text').then((LeaveType) => {
				expect(LeaveType.trim()).to.equal(leaveTypeValue)
			})

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(8)').invoke('text').then((LeaveDate) => {
				expect(LeaveDate.trim()).to.equal(leaveFromDate)
			})

			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(9)').invoke('text').then((LeaveDate) => {
				expect(LeaveDate.trim()).to.equal(leaveToDate)
			})

		})

		// cy.get('.btn-primary').click({ force: true })

		// this.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
		// 	ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
		// 	leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
		// 	leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		// 	APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
		// 	ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

		//})


	}

	approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus) {

		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function (row, i) {
			var num = parseFloat(i + 1)

			cy.log("num: " + num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(3)').invoke('text').then((EmpCode) => {
				cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(7)').invoke('text').then((LeaveType) => {
					cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(8)').invoke('text').then((LeaveDate) => {
						cy.log("EmpCode: " + EmpCode)
						cy.log("LeaveType: " + LeaveType)
						cy.log("LeaveDate: " + leaveFromDate)

						cy.get('#tblData > tbody').find('tr').then(listing => {
							const listingCount = Cypress.$(listing).length;
							expect(listing).to.have.length(listingCount);

							cy.log("employeeID: " + employeeID)
							cy.log("leaveType: " + leaveType)
							cy.log("leaveTypeValue: " + leaveTypeValue)
							cy.log("leaveFromDate: " + leaveFromDate)

							if (EmpCode.trim() == employeeID && LeaveType.trim() == leaveType || LeaveType.trim() == leaveTypeValue && LeaveDate.trim() == leaveFromDate) {

								if (LeaveStatus == 'Approved') {

									cy.get('#tblData > tbody > tr:nth-child(' + num + ')>td:nth-child(12)>input').click({ force: true })
								}
								else {
									cy.get('.tdReject > .clsRadio').click({ force: true })
								}

								cy.get('.tdReason>input').click({ force: true })
								cy.get('.tdReason>input').type(ManagerRemark_1)


								cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
								cy.wait(1000)
								cy.get(".noty_body").invoke('text').then((text) => {

									softExpect(text.trim()).to.eq("Records are processed in background, please wait!");

									cy.wait(2000)
								})
							}
							else if (num == listingCount) {
								//cy.softAssert(true, false, 'Same data not found in the table');
								//cy.softAssertAll();
							}
						});
					})
				})
			})

		})


	}

	verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate, LeaveStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.wait(10000)
		cy.visit(Cypress.env('essUrl') + 'Leave/TeamReport/MyTeamLeaveReport?Menu=leavedetails');
		cy.wait(500)


		cy.get('#StartDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
		})


		cy.get('#EndDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
		})

		cy.get('#searchbtn').click();
		cy.wait(5000)

		cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr").each(function (row, i) {
			var num = parseFloat(i + 1)
			var len =

				cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr[" + num + "]/td[1]").invoke('text').then((EmpCode) => {
					cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr[" + num + "]/td[4]").invoke('text').then((Fromdate) => {

						if (EmpCode.trim() == employeeID && Fromdate.trim() == leaveFromDate) {
							cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr[" + num + "]/td[9]").invoke('text').then((text) => {
								softExpect(text.trim()).to.eq(LeaveStatus);

								cy.wait(2000)
							})
						}
					})
				})
		})

	}

	verifyNotificationAtEmployee(employeeID, LeaveStatus) {
		cy.wait(5000)
		const { softAssert, softExpect, softTrue } = chai;
		var moment = require('moment');
		const addTen = moment().add(10, 'minutes').calendar()
		var addTenMinutesTime = addTen.slice(8);

		const subtractTen = moment().subtract(10, 'minutes').calendar()
		var subtractTenMinutesTime = subtractTen.slice(8);

		const currentTime = moment().format('DD MMM yyyy')

		var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

		var afterTenMinutes = currentTime + " " + addTenMinutesTime

		const start = moment(beforeTenMinutes)
		const end = moment(afterTenMinutes)
		// display hours + minutes + AM|PM
		const f = 'DD MMM yyyy hh:mm A'


		cy.get('#empCount').click({ force: true });
		cy.wait(2000)
		cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
			cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
				cy.log("title: " + title)
				cy.log("Note: " + Note)

				if (LeaveStatus == 'Approved') {
					expect(title.trim()).to.include('Leave Accepted');
					softExpect(Note.trim()).to.contains('Approval of Leave for ' + employeeID);
				}
				else {
					expect(title.trim()).to.include('Leave Rejected');
					softExpect(Note.trim()).to.contains('Rejection of Leave for ' + employeeID);
				}


				cy.get('.content-body >h6 >small').eq(0).should(($el) => {
					const m = moment($el.text().trim())
					expect(m.isBetween(start, end),
						`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
				})

			})
		})


	}



	verifyNotificationAtReliver(employeeID, EmployeeFirstName, EmployeeLastName, leaveFromDate, leaveToDate) {
		const { softAssert, softExpect, softTrue } = chai;
		var moment = require('moment');
		const addTen = moment().add(10, 'minutes').calendar()
		var addTenMinutesTime = addTen.slice(8);

		const subtractTen = moment().subtract(10, 'minutes').calendar()
		var subtractTenMinutesTime = subtractTen.slice(8);

		const currentTime = moment().format('DD MMM yyyy')

		var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

		var afterTenMinutes = currentTime + " " + addTenMinutesTime

		const start = moment(beforeTenMinutes)
		const end = moment(afterTenMinutes)
		// display hours + minutes + AM|PM
		const f = 'DD MMM yyyy hh:mm A'


		cy.get('#empCount').click({ force: true })
		cy.wait(2000)
		cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
			cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
				cy.log("title: " + title)
				cy.log("Note: " + Note)

				expect(title.trim()).to.include('Reliver Employee');
				softExpect(Note.trim()).to.contains('You will be Reliver for ' + employeeID + ' (' + EmployeeFirstName + ' ' + EmployeeLastName + ') from ' + leaveFromDate + ' to ' + leaveToDate);

				cy.get('.content-body >h6 >small').eq(0).should(($el) => {
					const m = moment($el.text().trim())
					expect(m.isBetween(start, end),
						`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
				})

			})
		})


	}

	verifyStatusAtEmployee(leaveFromDate, LeaveStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)


		cy.get('.table-responsive-vertical > .table > tbody > tr').each(function (row, i) {
			var num = parseFloat(i + 1)


			cy.get('.table-responsive-vertical > .table > tbody > tr:nth-child(' + num + ') >:nth-child(2)').invoke('text').then((Fromdate) => {

				cy.log(Fromdate)
				cy.log(leaveFromDate)

				if (Fromdate.trim() == leaveFromDate) {
					cy.get('.table-responsive-vertical > .table > tbody > tr:nth-child(' + num + ') >:nth-child(1)').invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(LeaveStatus);

						cy.wait(2000)
					})
				}

			})
		})

	}


	verifyLeaveInMyReport(LeaveStatus, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, leaveTypeValue) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Leave/MyReport/MyLeaveReport?Menu=leavedetails');
		//cy.get('#leavedetails_Tab').click();
		cy.wait(3000)

		cy.get('#ESRtableSorter> tbody > tr').each(function (row, i) {
			var num = parseFloat(i + 1)

			cy.get('#ESRtableSorter> tbody > tr:nth-child(' + num + ') >:nth-child(2)').invoke('text').then((Fromdate) => {

				if (Fromdate.trim() == leaveFromDate) {
					cy.get('.tag').invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(LeaveStatus);
					})

					cy.get('[data-title="From Date"]').invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(leaveFromDate);
					})

					cy.get('.odd > :nth-child(3)').invoke('text').then((text) => {
						softExpect(text.trim().toLowerCase()).to.contains(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase())

					})

					cy.get('[data-title="To Date"]').invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(leaveToDate);
					})

					cy.get('.odd > :nth-child(5)').invoke('text').then((text) => {
						softExpect(text.trim().toLowerCase()).to.contains(leaveToDayType.replace(/ +/g, "").trim().toLowerCase())
					})

					cy.get('[data-title="No Of Day(s)"]').invoke('text').then((text) => {
						softExpect(parseInt(text.trim())).to.eq(leaveDay);
					})

					cy.get('[data-title="Leave Type"] > .btn').invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(leaveTypeValue);
					})
				}

			})
		})

		// cy.xpath("//button[contains(@onclick,'displayModal')]").click({ force: true })

		// this.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
		// 	ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
		// 	leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
		// 	leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		// 	APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
		// 	ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	}

	verifyLeaveInEmployeeReport(employeeID, leaveFromDate, LeaveStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Leave/EmployeeReport/EmployeeLeaveReport?Menu=leavedetails');
		cy.wait(500)

		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.contains('li', '[' + employeeID + ']').click({ force: true })

		cy.get('#searchbtn').click({ force: true })
		cy.wait(1000)

		cy.get('#dataGrid> div >table >tbody > tr').each(function (row, i) {
			var num = parseFloat(i + 1)
			var len =

				cy.get('#dataGrid> div> table >tbody > tr:nth-child(' + num + ') >:nth-child(3)').invoke('text').then((Fromdate) => {

					if (Fromdate.trim() == leaveFromDate) {
						assert.equal(Fromdate.trim(), leaveFromDate, "Product Text found.")
						softExpect(Fromdate.trim()).to.eq(leaveFromDate);

						cy.get('#dataGrid> div> table >tbody > tr:nth-child(' + num + ') >:nth-child(8) > span').invoke('text').then((text) => {
							softExpect(text.trim()).to.eq(LeaveStatus);

						})
					}

				})
		})

		// cy.xpath("//button[contains(@onclick,'displayModal')]").click({ force: true })

		// this.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
		// 	ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
		// 	leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
		// 	leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		// 	APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
		// 	ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)



	}

	setRelever(leaveTypeValue) {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({ force: true })
		cy.wait(1000)

		cy.server()
		cy.wait(2000)
		cy.get('#Leave_LeaveDefinition').click({ force: true })
		cy.wait(10000)
		cy.route('POST', Cypress.env('url') + 'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
		cy.wait(4000)

		cy.get('.media-body>u>h4').each(function (row, i) {
			var num = parseFloat(i)

			cy.get('.media-body>u>h4').eq(num).invoke('text').then((text) => {

				if (text.trim() == leaveTypeValue) {
					cy.get('.fa-edit').eq(num).click({ force: true })

					cy.wait(2000)
					cy.get('#reliverR').select('N', { force: true })
					cy.wait(2000)
					cy.get('#btnLeaveDefinationUpdate').click({ force: true })
					cy.wait(1000)
					cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
					cy.get(".toast-message").invoke('text').then((text) => {
						expect(text.trim()).equal('Records Saved Successfully!!!')
					})
					cy.get(".toast-message").click({ force: true })


				}

			})
		})

	}

	SetSelfServiceRole(EmployeeID, Role) {

		cy.navigate_EmployeeProfile(EmployeeID)
		cy.wait(2000)
		cy.get('#profile_detail_tab').click()
		cy.wait(1000)
		cy.get('#Profile_SelfServiceRole').click()
		cy.wait(1000)
		cy.get('[name="SelfServiceRole"]').select(Role)
		cy.get('[value="Save"]').click()
		cy.wait(2000)
	}

	SetPassword(EmployeeID) {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=GeneratePassword')

		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(EmployeeID)
		cy.contains('li', '[' + EmployeeID + ']').click({ force: true })


		// cy.xpath("//label[contains(text(),'Category')]").click()
		cy.wait(2000)
		cy.get('#OverWriteRad').click({ force: true })
		cy.wait(2000)
		cy.get('[name="PayslipPassword"]').eq(2).click({ force: true })
		cy.wait(2000)
		cy.get('#savesetting').click()
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).contains('Generate Password will get processed in background.')
			cy.wait(20000)
		})
	}

	SetManager(employeeID, managerID) {
		cy.navigate_EmployeeProfile(employeeID)
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })
		cy.wait(2000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)
		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#approvalmust').select('Yes', { force: true })
		cy.get('#cancelrights').select('Yes', { force: true })
		//cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
		cy.get('#Leave').click({ force: true })
		cy.xpath("//label[contains(text(),'Attendance Regularization')]").click({ force: true })
		//cy.xpath("//label[contains(text(),'On Duty')]").click()
		cy.get('#btnSaveText').click({ force: true })
		cy.wait(2000)
	}

	AddLeaveOpening(employeeID, leaveType) {
		cy.navigate_EmployeeProfile(employeeID)
		cy.wait(2000)
		cy.get('#leave_detail_tab').click()

		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function (row, i) {
			var num = parseFloat(i + 1)
			cy.log("num: " + num)

			cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {
				cy.log("text: " + text)
				if (text.trim() == leaveType) {
					expect(text).to.eq(leaveType)


					cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
						cy.log("availableLeave: " + availableLeave)

						cy.log("i: " + i)
						if (availableLeave.trim() == '0') {
							cy.get(':nth-child(2) > .card > .card-body > .float-right > a > .fas').click()

							//cy.get('.fa-ellipsis-v').eq(i-1).click()

							cy.get('#LeaveOpen').click({ force: true })
							cy.get('#LeaveOpen').clear()
							cy.get('#LeaveOpen').type('10');

							cy.get('#saveloader').click({ force: true })
							cy.wait(8000)
						}

					})
				}
			})

		})
	}


	DeleteLeaveConfiguration(leaveType) {
		cy.wait(1000)
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#leave_detail_tab').click({ force: true })
		cy.get('#leave_detail_tab').click()
		cy.get('#leave_detail_tab').click({ force: true })
		cy.wait(3000)


		cy.get('#Leave_LeaveConfiguration').click({ force: true })
		cy.wait(8000)

		cy.get('#ddLeavType').select(leaveType)
		cy.wait(2000)

		cy.get('#btnDelete').click({ force: true })
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data deleted successfully.!')
		})
	}

	addLeaveFromCloud(leaveType, leaveTypeValue, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, Reason) {
		const { softAssert, softExpect, softTrue } = chai;
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
			softExpect(text.trim()).to.eq('Leave Updated Successfully');
		})

		cy.get('#btnclose').click({ force: true })
		cy.wait(2000)

		var i = 0;

		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {
			cy.log("openingLeave: " + openingLeave)


			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {
				cy.log("debitLeave: " + debitLeave)


				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {
					cy.log("usedLeave: " + usedLeave)


					cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
						cy.log("availableLeave: " + availableLeave)
						var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave) - parseFloat(debitLeave)
						//softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));
					})

				})
			})
		})

		cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((LeaveType) => {
			softExpect(LeaveType).to.eq(leaveTypeValue);
		})

		cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {
			softExpect(leaveDate).to.eq(leaveFromDate + ' - ' + leaveToDate);
		})

		cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {
			softExpect(leaveDay.replace(/ +/g, "").trim().toLowerCase()).to.eq(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase() + '-' + leaveToDayType.replace(/ +/g, "").trim().toLowerCase());
		})

		cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {
			softExpect(parseInt(leaveDays)).to.eq(leaveDay);
		})

	}

	deleteEmployeesAllLeaves() {
		cy.get("i").then(($sp) => {
			var result = $sp.hasClass('dripicons-message')
			cy.log(result)
			if ($sp.hasClass('dripicons-message')) {

				cy.get('.dripicons-message').then(listing => {
					var leavelength = Cypress.$(listing).length;
					cy.log("leavelength: " + leavelength)

					if (leavelength != 0) {
						cy.get('.text-danger').eq(0).click()
						cy.wait(5000)
					}

					if (leavelength != 1) {
						cy.delete_EmployeesAllLeaves()
					}
				})
			}
			else {
			}
		})
	}

	cancelLeaveFromESS() {
		const { softAssert, softExpect, softTrue } = chai;
		cy.get(':nth-child(9) > .btn').click({ force: true })
		// cy.get(".noty_body").invoke('text').then((text) => {

		// 	softExpect(text.trim()).to.eq("Leave cancelled");

		// 	cy.wait(2000)
		// })

	}
}



export default Leave