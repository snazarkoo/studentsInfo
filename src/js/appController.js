angular
    .module('studentsInfo')
    .controller('appController', appController);

function appController($scope, $http) {
    var vm = this;
    vm.students = [];
    vm.studentProfile = {};
    vm.decisionByColor = {
        "Yes": "success",
        "No": "danger",
        "Maybe": "warning"
    };
    vm.openUserProfile = openUserProfile;
    vm.sendInfo = sendInfo;

    getData();

    function openUserProfile(studentInfo) {
        vm.studentProfile = {};
        for (var key in studentInfo) {
            if (studentInfo[key]) {
                vm.studentProfile[key] = studentInfo[key];
            }
        }
    }

    function sendInfo(data) {
        console.log("Send info");
        var feedback = "Feedback=" + data.feedback + "&id=" + data.id + "&Conclusion=" + data.conclusion;
        console.log(feedback);
        feedback = encodeURI(feedback);
        vm.students.forEach(function(value, index) {
            if(value.id === data.id) {
                value.feedback = data.feedback;
                value.conclusion = data.conclusion;
            }
        });
        var req = {
            method: 'POST',
            url: 'https://script.google.com/macros/s/AKfycby-Fnpz1VJRZoaPrmV9DB84D2cUnyZp392-5FSka-S7cRUQkMI/exec',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            withCredentials: true,
            data: feedback
        };
        $http(req).then(function(data) {
            console.log("success" + data);
        }, function(error) {
            console.log(error);
        });
    }

    function getData() {
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
        }).error(function(message) {
            console.error('error' + message);
        }).complete(function() {
            console.log('completed!');
        });
    }
}
