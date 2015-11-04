angular
    .module('studentsInfo', ['ngTable']);

(function() {
    angular
        .module('studentsInfo')
        .controller('appController', appController);

    function appController(NgTableParams) {
        var vm = this;
        var data = [{
                firstName: "Test1",
                secondName: "Test2",
                mobileNumber: 5555,
                email: "test@test.com",
                testMark: 10,
                englishLevel: "B1",
                selfDescription: "Awesome man",
                teacherOpinion: "good",
                decision: "YES"
            }, {
                firstName: "Test2",
                secondName: "Test2",
                mobileNumber: 6666,
                email: "test@test.com",
                testMark: 10
            }, {
                firstName: "Test3",
                secondName: "Test2",
                mobileNumber: 5555,
                email: "test@test.com",
                testMark: 10
            }, {
                firstName: "Test",
                secondName: "Test2",
                mobileNumber: 5555,
                email: "test@test.com",
                testMark: 10
            }, {
                firstName: "Test",
                secondName: "Test2",
                mobileNumber: 5555,
                email: "test@test.com",
                testMark: 10
            }]

        vm.studentProfile = {};
        vm.openUserProfile = openUserProfile;
        vm.tableParams = new NgTableParams({}, {
            dataset: data
        });

        function openUserProfile(studentInfo) {
            vm.studentProfile = {};
            for (var key in studentInfo) {
                if (studentInfo[key]) {
                    vm.studentProfile[key] = studentInfo[key];
                }
            }
        }
    }
})();

(function() {
    "use strict";
    angular.module("studentsInfo")
})();