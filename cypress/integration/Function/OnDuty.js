
class OnDuty {

    applyOnDuty(onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) {
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=onduty')

        cy.get('#dtStartEntry').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(inDate)
        })

        cy.get('#dtEndEntry').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(outDate)
        })

        cy.get('#tmInTimeHour').clear();
        cy.get('#tmInTimeHour').type(inTime_hours);
        cy.get('#tmInTimeMin').clear();
        cy.get('#tmInTimeMin').type(inTime_min);
        cy.get('#tmOutTimeHour').clear();
        cy.get('#tmOutTimeHour').type(outTime_hours);
        cy.get('#tmOutTimeMin').clear();
        cy.get('#tmOutTimeMin').type(outTime_min);
        cy.get('#ddType').select(dayType);
        cy.get('#txtRemarks').clear();
        cy.get('#txtRemarks').type(remarks);
        cy.get('#btnSave').click();

        cy.get(".noty_body").invoke('text').then((Notification) => {
            cy.log("Notification: " + Notification)
            cy.get(".noty_body").should('contain', 'Data Saved Successfully.!')
        })

    }

    verifyOnDutyDetailsInPreviousDetails(onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) {

        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=onduty')
        cy.wait(2000)

        cy.get('#entryDate-').invoke('text').then((text) => {
            expect(text.trim()).to.equal(onDutyDate)
        })
        cy.get('.odd > :nth-child(2)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inDate)
        })
        cy.get('.odd > :nth-child(3)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inTime_hours + ":" + inTime_min)
        })
        cy.get('.odd > :nth-child(4)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outDate)
        })
        cy.get('.odd > :nth-child(5)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outTime_hours + ":" + outTime_min)
        })
        cy.get(':nth-child(6) > span').invoke('text').then((text) => {
            expect(dayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(text.replace(/ +/g, "").trim().trim().toLowerCase())
        })
        cy.get('.tag').invoke('text').then((text) => {
            expect(text.trim()).to.equal('Pending for Approval')
        })
        cy.get('.odd > :nth-child(8)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(remarks)
        })
        //cy.get('#btnApprove > .btn-primary')
    }

    verifyNotificationAtManager(employeeID) {
        var moment = require('moment');
        cy.get('[style="position:relative;"] > .nav-link > .fa').click({ force: true });

        cy.wait(2000)


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

        //cy.get('.accordion').click({force:true});
        cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
            cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
                cy.log("title: " + title)
                cy.log("Note: " + Note)
                expect(title.trim()).to.include('On Duty Pending')
                expect(Note.trim()).to.include(employeeID)
                //softExpect(Note.trim()).to.contains(employeeID);	

                cy.get('.content-body >h6>small').eq(0).should(($el) => {
                    const m = moment($el.text().trim())
                    expect(m.isBetween(start, end),
                        `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
                })

            })
        })


    }

    verifyRequstedOnDutyDetailsAtManager(employeeID, employeeName, onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) {

        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveApproval?Menu=onduty')
        cy.wait(2000)


        cy.get('[data-title="Code"]').invoke('text').then((EmpCode) => {
            expect(EmpCode.trim()).to.equal(employeeID)
        })
        cy.get('[data-title="Name"]').invoke('text').then((EmpCode) => {
            expect(EmpCode.trim()).to.contains(employeeName)
        })
        cy.readFile('cypress/fixtures/Company.json').then((text) => {
            text.forEach(function (entry) {

                var company = entry.comapnayname

                cy.get('[data-title="Company Name"]').invoke('text').then((LeaveType) => {
                    expect(LeaveType.trim()).to.equal(company)
                })

            })
        })

        cy.get('.odd > :nth-child(5)').invoke('text').then((text) => {
            expect(text.trim()).to.contains(onDutyDate)
        })
        cy.get('[data-title="In Date"]').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inDate)
        })
        cy.get('[data-title="In Time"]').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inTime_hours + ":" + inTime_min)
        })
        cy.get('[data-title="Out Date"]').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outDate)
        })
        cy.get('.odd > :nth-child(9)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outTime_hours + ":" + outTime_min)
        })
        cy.get('.odd > :nth-child(10)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(remarks)
        })


    }

    approveOnDuty(managerRemark)	 {
        const { softAssert, softExpect, softTrue } = chai;
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveApproval?Menu=onduty')
        cy.wait(2000)

        cy.get('#Remarks').type(managerRemark)
        cy.get('.tdAccept > .clsRadio').click({ force: true })
        cy.get('.row > :nth-child(5) > #btnsave').click({ force: true })
        cy.get(".noty_body").should('contain', 'Records are processed in background, please wait!')


  /*      cy.get("body").then($body => {
            if ($body.find("#tblData > tbody >tr").length > 0) {
                cy.log("EmpCode: " + 'Swatiiiii')


                cy.get('#tblData > tbody > tr').each(function (row, i) {
                    var num = parseFloat(i + 1)
                    cy.log("num: " + num)

                    //cy.wait(2000)	

                    cy.xpath("//table[@id='tblData']//tbody/tr[" + num + "]/td[2]").invoke('text').then((EmpCode) => {
                        cy.xpath("//table[@id='tblData']//tbody/tr[" + num + "]/td[6]").invoke('text').then((OnDutyDate) => {
                            cy.log("EmpCode: " + EmpCode)
                            cy.log("onDutyDate: " + onDutyDate)



                            cy.get('#tblData > tbody').find('tr').then(listing => {
                                const listingCount = Cypress.$(listing).length;
                                expect(listing).to.have.length(listingCount);

                                if (EmpCode.trim() == employeeID && OnDutyDate.trim() == onDutyDate) {

                                    cy.xpath("//table[@id='tblData']//tbody/tr[" + num + "]/td[12]/input").click({ force: true })
                                    cy.get('.col-lg-2 > #btnsave').click()

                                    cy.get(".noty_body").should('contain', 'Records are processed in background, please wait!')
                                }
                                else if (num == listingCount) {
                                    cy.softAssert(true, false, 'No Records Found in table.');
                                }
                            });

                        })
                    })
                })

            }
            else {

                cy.softAssert(true, false, 'No Records Found.');

            }
            cy.softAssertAll();
        });
*/
    }

    verifyOnDutyInTeamReport(employeeID, employeeName, onDutyDate, inDate, outDate, inTime_hours, inTime_min, outTime_hours, outTime_min, dayType, remarks) {
        cy.wait(5000)
        cy.visit(Cypress.env('essUrl') + 'Leave/TeamReport/MyTeamLeaveReport?Menu=OnDutyReport');
        cy.wait(500)

        cy.get('.odd > :nth-child(2)').invoke('text').then((EmpCode) => {
            expect(EmpCode.trim()).to.equal(employeeID)
        })
        cy.get('.odd > :nth-child(3)').invoke('text').then((EmpCode) => {
            expect(EmpCode.trim()).to.contains(employeeName)
        })
        cy.readFile('cypress/fixtures/Company.json').then((text) => {
            text.forEach(function (entry) {

                var company = entry.comapnayname

                cy.get('.odd > :nth-child(4)').invoke('text').then((LeaveType) => {
                    expect(LeaveType.trim()).to.equal(company)
                })

            })
        })

        cy.get('.odd > :nth-child(5)').invoke('text').then((text) => {
            expect(text.trim()).to.contains(onDutyDate)
        })
        cy.get('.odd > :nth-child(6)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inDate)
        })
        cy.get('.odd > :nth-child(7)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(inTime_hours + ":" + inTime_min)
        })
        cy.get('.odd > :nth-child(8)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outDate)
        })
        cy.get('.odd > :nth-child(9)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(outTime_hours + ":" + outTime_min)
        })
        cy.get('.odd > :nth-child(11)').invoke('text').then((text) => {
            expect(dayType.replace(/ +/g, "").trim().toLowerCase()).to.contains(text.replace(/ +/g, "").trim().trim().toLowerCase())
        })
        cy.get('.odd > :nth-child(12)').invoke('text').then((text) => {
            expect(text.trim()).to.equal(remarks)
        })
        cy.get('.tag').invoke('text').then((text) => {
            expect(text.trim()).to.equal('Approved')
        })

        // cy.get('#EStableSorterOnDuty >tbody > tr').each(function (row, i) {
        //     var num = parseFloat(i + 1)

        //     cy.get('#EStableSorterOnDuty >tbody > tr:nth-child(' + num + ') >:nth-child(2)').invoke('text').then((EmpCode) => {
        //         cy.get('#EStableSorterOnDuty >tbody > tr:nth-child(' + num + ') >:nth-child(6)').invoke('text').then((OnDutyDate) => {

        //             if (EmpCode.trim() == employeeID && OnDutyDate.trim() == onDutyDate) {
        //                 cy.log(EmpCode.trim())
        //                 cy.log(OnDutyDate.trim())
        //                 cy.get('#EStableSorterOnDuty >tbody > tr:nth-child(' + num + ') >:nth-child(13)>span').invoke('text').then((text) => {
        //                     expect(text.trim()).to.include("Approved")
        //                 })
        //             }
        //         })
        //     })
        // })
    }

    verifyManagerRemark(managerRemark){
        const { softAssert, softExpect, softTrue } = chai;
        cy.visit(Cypress.env('essUrl') + 'Leave/TeamReport/MyTeamLeaveReport?Menu=OnDutyReport');
        cy.wait(500)
        cy.get(':nth-child(14) > .btn').click({ force: true })

}

    verifyNotificationAtEmployee(managerID, managerName, onDutyDate) {


        cy.get('.notification > :nth-child(2) > .nav-link > .fa').click({ force: true })
        cy.wait(2000)

        cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
            cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {
                cy.log("title: " + title)
                cy.log("Note: " + Note)

                expect(title.trim()).to.include('On Duty Approved');
                expect(Note.trim()).to.include('Requisition of On Duty Approved by ' + managerID + ' (' + managerName + ' ) for ' + onDutyDate);

            })
        })
    }

    verifyStatusAtEmployee(onDutyDate) {
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=onduty')
        cy.wait(2000)

        cy.get('#EStableSorter >tbody>tr').each(function (row, i) {
            var num = parseFloat(i + 1)
            var len =
                cy.get('#EStableSorter >tbody>tr:nth-child(' + num + ') >:nth-child(1)').invoke('text').then((OnDutyDate) => {


                    if (OnDutyDate.trim() == onDutyDate) {
                        cy.log("onDutyDate: " + onDutyDate)
                        cy.get('#EStableSorter >tbody>tr:nth-child(' + num + ') >:nth-child(7)>span').invoke('text').then((text) => {

                            expect(text.trim()).to.include('Approved');

                            cy.wait(2000)
                        })
                    }

                })
        })
    }

    verifyOnDutyInMyReport(onDutyDate) {
        cy.visit(Cypress.env('essUrl') + 'Leave/MyReport/MyLeaveReport?Menu=OnDuty')
        cy.wait(2000)

        cy.get('#DataTables_Table_0>tbody>tr').each(function (row, i) {
            var num = parseFloat(i + 1)
            var len =
                cy.get('#DataTables_Table_0>tbody>tr:nth-child(' + num + ') >:nth-child(1)').invoke('text').then((OnDutyDate) => {

                    if (OnDutyDate.trim() == onDutyDate) {
                        cy.log("onDutyDate: " + onDutyDate)
                        cy.get('#DataTables_Table_0>tbody>tr:nth-child(' + num + ') >:nth-child(9)>span').invoke('text').then((text) => {

                            expect(text.trim()).to.include('Approved');

                            cy.wait(2000)
                        })
                    }

                })
        })
    }

    verifyOnDutyInEmployeeReport(admin, employeeID, onDutyDate) {

        cy.visit(Cypress.env('essUrl') + 'Leave/EmployeeReport/EmployeeLeaveReport?Menu=OnDutyReport');
        cy.wait(500)

        cy.get('#select2-multiEmp-container').click({ force: true })
        cy.get('input[type="search"]').click({ force: true })
        cy.get('input[type="search"]').type(employeeID)
        cy.contains('li', '[' + employeeID + ']').click({ force: true })

        cy.get('#searchbtn').click({ force: true })
        cy.wait(1000)

        cy.get('#EStableSorterOnDuty>tbody>tr').each(function (row, i) {
            var num = parseFloat(i + 1)
            var len =

                cy.get('#EStableSorterOnDuty>tbody>tr:nth-child(' + num + ') >:nth-child(5)').invoke('text').then((OnDutyDate) => {

                    if (OnDutyDate.trim() == onDutyDate) {

                        cy.get('#EStableSorterOnDuty>tbody>tr:nth-child(' + num + ') >:nth-child(13) > span').invoke('text').then((text) => {
                            expect(text.trim()).to.include('Approved');

                        })
                    }

                })
        })
    }

}



export default OnDuty