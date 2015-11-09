angular
    .module('studentsInfo')
    .filter('decision', function() {
        return function(input, option) {
        	var out = [];
            if (input) {
                input.forEach( function (value, index) {
                	console.log(value.conclusion, option);
                    if (option === "All") {
                        out.push(value);
                    } else {
                        if(value.conclusion === option) {
                        	out.push(value);
                        }
                    }

                });
            }
            return out;
        }
    });
