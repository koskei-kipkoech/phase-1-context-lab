/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return{
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

let employeeData = [
    ['moe', 'sizlak', 'barkeep', 2],
    ['bartholomew', 'simpson', 'scamp', 3]
]
function createEmployeeRecords(employeeData){
    return employeeData.map(createEmployeeRecord)
}

function createTimeInEvent(dateTimeString){
    let [date, hour] = dateTimeString.split(' ');
    let newEvent ={
        type: 'TimeIn',
        date:date,
        hour: parseInt(hour,10)
    }
    this.timeInEvents.push(newEvent);
    return this;
}

function createTimeOutEvent(dateTimeString){
    let [date, hour] = dateTimeString.split(' ');
    let newEvent ={
        type: 'TimeOut',
        date:date,
        hour: parseInt(hour,10)
    }
    this.timeOutEvents.push(newEvent);
    return this;
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this,date);
    return hours * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(employee => employee.firstName === firstNameString)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((total,employee) => {
        return total + allWagesFor.call(employee)
    },0)
}


