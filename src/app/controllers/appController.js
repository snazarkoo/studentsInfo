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
function AppController($scope, StudentService) {
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
    }

    /**
     * Get all students
     * @memberOf studentsInfo.AppController
     */
    function getStudents() {
        StudentService.getAllStudents(success, error);
        vm.showAnimation = true;

        function success(res) {
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
                        mark: student.gsx$mark.$t
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
    }

    /**
     * Update student's 'feeadback' and 'conclusion' fields in spreadsheets
     * @param  {Object} newData Student new data
     * @memberOf studentsInfo.AppController
     */
    function updataStudent(newData) {
        var requestData = createRequestData(newData.feedback, newData.conclusion, newData.email);
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        };
        vm.showAnimation = true;

        StudentService.updateStudentByEmail(cbSuccess, cbError, config, requestData);

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
    function createRequestData(feedback, conclusion, email) {
        var requestData = "Feedback=" + feedback + "&Conclusion=" + conclusion + "&E-mail=" + email;
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
}