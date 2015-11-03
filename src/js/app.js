angular
    .module('studentsInfo', [])
    .controller('appController', appController);

function appController() {
    vm = this;
    vm.newValue = "name";
    vm.students = [{
        name: "Test1",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test2",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test3",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test",
        email: "test@test.com",
        testMark: 10
    }, {
        name: "Test",
        email: "test@test.com",
        testMark: 10
    }]
}