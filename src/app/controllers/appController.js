angular
    .module('studentsInfo')
    .controller('AppController', AppController);

/**
 * @ngdoc controller
 * @name AppController
 * @requires $scope
 * @requires StudentService 
 * @memberOf studentsInfo.AppController
*/
function AppController($scope, $filter, $location, StudentService, smoothScroll) {
    var vm = this;

    initDefaults();
    getStudents();

    /**
     * Initialize variables and functions
     * @memberOf studentsInfo.AppController
     */
    function initDefaults() {
        vm.students = [];
        vm.studentProfile = null;
        vm.predicate = 'age';
        vm.reverse = true;
        vm.decision = "All";
        vm.order = order;
        vm.openUserProfile = openUserProfile;
        vm.updataStudent = updataStudent;
        vm.getStudents = getStudents;
        vm.decisionByColor = {
            "Yes": "success",
            "No": "danger",
            "Maybe": "warning"
        };
        vm.showAnimation = false;
        vm.deleteInterviewer = deleteInterviewer;
        vm.addInterviewer = addInterviewer;
        vm.interviewers = [
            {
            'id': getUniqueId(), 
            'name': 'yev'
            }
        ];
        vm.deb = function () {
            console.log(vm.interviewers);
        }
        vm.uniqueInterviewerError = false;
    }

    /**
     * Get all students
     * @memberOf studentsInfo.AppController
     */
    function getStudents() {
        StudentService.getAllStudents(success, error);
        vm.showAnimation = true;

        function success(res) {
            console.log(res);
            vm.showAnimation = false;
            var students = res.data.feed.entry;
            if (vm.students) {
                vm.students = [];
            }
            if(students) {
                students.forEach(function(student) {
                    vm.students.push({
                        conclusion: student.gsx$conclusion.$t,
                        engLevel: student.gsx$englishlevel.$t,
                        feedback: student.gsx$feedback.$t,
                        nameEng: student.gsx$firstandlastnameeng.$t,
                        nameUkr: student.gsx$firstandlastnameukr.$t,
                        email: student["gsx$e-mail"].$t,
                        socialLink: student.gsx$linktosocialnetworkaccountfacebookvketc.$t,
                        phone: student.gsx$phone.$t,
                        timestamp: student.gsx$timestamp.$t,
                        entryDecision: student.gsx$whyhaveyoudecidedtojointhiscourse.$t,
                        mark: student.gsx$mark.$t,
                        position: student.gsx$position.$t,
                        interviewTime: student.gsx$interviewtime.$t
                    })
                });
            } else {
                vm.error = "Here is no students";
            }
        }

        function error(error) {
            vm.error = "Cannot get students";
            vm.showAnimation = false;
        }
    }

    /**
     * Initialize studentProfile model variable with appropriate data
     * @param  {Object} studentInfo Student information
     * @memberOf studentsInfo.AppController
     */
    function openUserProfile(studentInfo) {
        vm.studentProfile = angular.extend({}, studentInfo);
        $location.path('top');
        smoothScroll(document.body);
    }

    /**
     * Update student's 'feeadback' and 'conclusion' fields in spreadsheets
     * @param  {Object} newData Student new data
     * @memberOf studentsInfo.AppController
     */
    function updataStudent(newData) {
        var interviewTime = $filter('date')(new Date(), "MMMM dd");

        var requestData = createRequestData(newData.feedback, newData.conclusion, newData.email, interviewTime);
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        };
        

        if(isUniqueInterviewers()) {
            vm.uniqueInterviewerError = false;
            vm.showAnimation = true;
            StudentService.updateStudentByEmail(cbSuccess, cbError, config, requestData);
        } else {
            vm.uniqueInterviewerError = true;
        }
        

        function cbSuccess() {
            getStudents();
            vm.showAnimation = false;
        }

        function cbError(error) {
            getStudents();
            vm.showAnimation = false;
        }
    }

    /**
     * Create url data representation
     * @param  {String} feedback Feeadback about student
     * @param  {String} conclusion Interview's conclusion
     * @param  {String} email Student's e-mail
     * @memberOf studentsInfo.AppController
     */
    function createRequestData(feedback, conclusion, email, time) {
        console.log(time.toString());
        var requestData = "Feedback=" + feedback + "&Conclusion=" + conclusion + "&E-mail=" + email + "&Interview time=" + time;
        requestData = encodeURI(requestData);
        return requestData;
    }

    /**
     * Sort data depending on predicate
     * @param  {String} predicate Predicate
     * @memberOf studentsInfo.AppController
     */
    function order(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
    }

    function getUniqueId() {
        return (new Date()).getTime();
    }

    function addInterviewer() {
        vm.interviewers.push({
            id: getUniqueId(),
            name: 'yev'
        });
    }
    function deleteInterviewer(interviewer) {
        vm.interviewers.forEach(function(value, index) {
            if(interviewer.id === value.id) {
                console.log(index);
                vm.interviewers.splice(index, 1);
            }
        });
    }
    function isUniqueInterviewers() {
        var temp = angular.copy(vm.interviewers);
        temp.sort(function(a, b) { return a.name < b.name; });
        for(var i = 0; i < temp.length - 1; ++i) {
            if(temp[i].name === temp[i + 1].name) {
                return false;
            }
        }
        return true;
    }
}