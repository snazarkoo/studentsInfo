angular
    .module('studentsInfo', [])
    .controller('appController', appController);

function appController($scope, $http) {
    vm = this;
    vm.newValue = "name";
    vm.students = [{name: "sdasaddas"}];
    var url = 'https://spreadsheets.google.com/feeds/list/1FzkGijfnvihEVnI43EF0mJK4H2nxGMDj7R7ZJY0Bb5k/od6/public/values?alt=json-in-script&callback=?';
    jQuery.getJSON(url).success(function(data) {

        data.feed.entry.forEach(function(value, index) {
            vm.students.push({id: value.gsx$id.$t, name: value.gsx$name.$t, mark: value.gsx$mark.$t, surname: value.gsx$surname.$t});
        });
        $scope.$digest();
        console.log(vm.students);
    }).error(function(message) {
        console.error('error' + message);
    }).complete(function() {
        console.log('completed!');
    });
}
