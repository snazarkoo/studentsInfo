angular
    .module('studentsInfo')
    .filter('DecisionFilter', DecisionFilter);

/**
 * @ngdoc filter
 * @name DecisionFilter
 * @description Operations about students 
 * @requires $http 
 * @requires UrlConstants
 * @memberOf studentsInfo.decisonFilter
 */
function DecisionFilter() {
    return function(input, option) {
        var out = [];
        if (input) {
            input.forEach(function(value, index) {
                if (option === "All") {
                    out.push(value);
                } else {
                    if (value.conclusion === option) {
                        out.push(value);
                    }
                }

            });
        }
        return out;
    }
}
