angular
    .module('studentsInfo')
    .directive('interviewersList', interviewersList);

function interviewersList() {
	return {
		templateUrl: "src/app/directives/interviewersListDirective.tmp.html",
		restriction: "A"
	};
}