angular
    .module('studentsInfo')
    .service('StudentService', StudentService);

/**
 * @ngdoc service
 * @name StudentService
 * @description Operations about students 
 * @requires $http 
 * @requires UrlConstants
 * @memberOf studentsInfo.AppController
 */
function StudentService($http, UrlConstants) {
	var service = {
		getAllStudents: getAllStudents,
		updateStudentByEmail: updateStudentByEmail
	};
	return service;

	/**
     * Get All Students
     * @param  {Function} cbSuccess On success callback function 
     * @param  {Function} cbError On error callback function 
     * @memberOf studentsInfo.AppController
     */
	function getAllStudents(cbSuccess, cbError) {
		$http.get(UrlConstants.GetStudents)
			.success(cbSuccess)
			.error(cbError);
	}

	/**
     * Update Student depending on data
     * @param  {Function} cbSuccess On success callback function 
     * @param  {Function} cbError On error callback function
     * @param  {Object} config Configuration for request
     * @param  {String} data Url request data
     * @memberOf studentsInfo.AppController
     */
	function updateStudentByEmail(cbSuccess, cbError, config, data) {
		$http.post(UrlConstants.UpdateStudent, data, config)
			.success(cbSuccess)
			.error(cbError);
	}
}