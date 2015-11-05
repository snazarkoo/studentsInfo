angular
    .module('studentsInfo', ['ngTable']);

(function() {
    angular
        .module('studentsInfo')
        .controller('appController', appController);

    function appController($scope, NgTableParams, $http) {
        var vm = this;
        vm.students = [];

        vm.studentProfile = {};
        vm.openUserProfile = openUserProfile;
        vm.send = send;
        var url = 'https://spreadsheets.google.com/feeds/list/1FzkGijfnvihEVnI43EF0mJK4H2nxGMDj7R7ZJY0Bb5k/od6/public/values?alt=json-in-script&callback=?';
        jQuery.getJSON(url).success(function(data) {
            console.log(data);
            data.feed.entry.forEach(function(value, index) {
                vm.students.push({
                    conclusion: value.gsx$conclusion.$t,
                    engLevel: value.gsx$englishlevel.$t,
                    feedback: value.gsx$feedback.$t,
                    nameEng: value.gsx$firstandlastnameeng.$t,
                    nameUkr: value.gsx$firstandlastnameukr.$t,
                    id: value.gsx$id.$t,
                    socialLink: value.gsx$linktosocialnetworkaccountfacebookvketc.$t,
                    phone: value.gsx$phone.$t,
                    timestamp: value.gsx$timestamp.$t,
                    entryDecision: value.gsx$whyhaveyoudecidedtojointhiscourse.$t
                });
            });
            $scope.$digest();
            console.log(vm.students);
        }).error(function(message) {
            console.error('error' + message);
        }).complete(function() {
            console.log('completed!');
        });

        function openUserProfile(studentInfo) {
            vm.studentProfile = {};
            for (var key in studentInfo) {
                if (studentInfo[key]) {
                    vm.studentProfile[key] = studentInfo[key];
                }
            }
        }

        function send(data) {
            console.log(data);
            var feedback = "Feedback=" + data.feedback + "&id=" + data.id + "&Conclusion=" + data.conclusion;
            console.log(feedback);
            var req = {
                method: 'POST',
                url: 'https://script.google.com/macros/s/AKfycby-Fnpz1VJRZoaPrmV9DB84D2cUnyZp392-5FSka-S7cRUQkMI/exec',
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                withCredentials: true,
                data: feedback
            }

            $http(req).then(function(data) {
                console.log("success" + data);
            }, function(error) {
                console.log(error);
            });
        }
    }
})();

(function() {
    "use strict";
    angular.module("studentsInfo")
})();
