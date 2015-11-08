angular
    .module('studentsInfo')
    .controller('appController', appController);

function appController($scope, $http) {
    var vm = this;
    vm.predicate = 'age';
    vm.reverse = true;
    vm.order = function(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
      };
    
    vm.students = [];
    vm.studentProfile = {};
    vm.decisionByColor = {
        "Yes": "success",
        "No": "danger",
        "Maybe": "warning"
    };
    vm.getSocialMediaImage = getSocialMediaImage;
    vm.openUserProfile = openUserProfile;
    vm.sendInfo = sendInfo;

    getData();

    function openUserProfile(studentInfo) {
        console.log(studentInfo);
        vm.studentProfile = {};
        for (var key in studentInfo) {
            if (studentInfo[key]) {
                vm.studentProfile[key] = studentInfo[key];
            }
        }
    }

    function sendInfo(data) {
        console.log("Send info");
        var feedback = "Feedback=" + data.feedback + "&Conclusion=" + data.conclusion + "&E-mail=" + data.email;
        console.log(feedback);
        feedback = encodeURI(feedback);
        vm.students.forEach(function(value, index) {
            console.log(value.id, data.id);
            if(value.email === data.email) {
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
           // getData();
        }, function(error) {
            console.log(error);
          //  getData();
        });
    }

    function getSocialMediaImage(url) {
        if(url.indexOf("fb") > -1 || url.indexOf("facebook") > -1) {
            return "img/facebook.png";
        }
        if(url.indexOf("vk.com") > -1) {
            return "img/vk.png";
        }
    }

    function getData() {
        var url = 'https://spreadsheets.google.com/feeds/list/1FzkGijfnvihEVnI43EF0mJK4H2nxGMDj7R7ZJY0Bb5k/od6/public/values?alt=json-in-script&callback=?';
        jQuery.getJSON(url).success(function(data) {
            console.log(data);
            vm.students = [];
            data.feed.entry.forEach(function(value, index) {
                vm.students.push({
                    conclusion: value.gsx$conclusion.$t,
                    engLevel: value.gsx$englishlevel.$t,
                    feedback: value.gsx$feedback.$t,
                    nameEng: value.gsx$firstandlastnameeng.$t,
                    nameUkr: value.gsx$firstandlastnameukr.$t,
                    email: value["gsx$e-mail"].$t,
                    socialLink: value.gsx$linktosocialnetworkaccountfacebookvketc.$t,
                    phone: value.gsx$phone.$t,
                    timestamp: value.gsx$timestamp.$t,
                    entryDecision: value.gsx$whyhaveyoudecidedtojointhiscourse.$t,
                    mark: value.gsx$mark.$t
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
