myApp.controller('homeController', ['$scope', 'homeFactory', 
	function($scope, homeFactory){

		var next_url = '';
		var scope = [];
		$scope.chartData = [];
		// var instagramSuccess = function(scope, res) {
		// 	if (res.meta.code !== 200) {
		// 		scope.error = res.meta.error_type + ' | ' + res.meta.error_message;
		// 		return;
		// 	}
		// 	if (res.data.length > 0) {
		// 		scope.items = res.data;
		// 		console.log(scope);
		// 	} else {
		// 		scope.error = "This hashtag has returned no results";
		// 	}
		// };

		// var moreSuccess = function(res){
		// 	$scope.search.items = res.data;
		// }

		// $scope.login = function(){
		// 	homeFactory.get(1, $scope.search.hash).success(function(response){
		// 		// homeFactory.user(response.data[0].id).success(function(response){
		// 		// 	console.log(response);
		// 		// })
		// 		// console.log(response.data[0].id);
		// 		instagramSuccess($scope.search, response);
		// 		next_url = response.pagination.next_url;
		// 	})

		// }

		// $scope.more = function(){
		// 	console.log("more");
		// 	homeFactory.more(1, next_url).success(function(response){
		// 		moreSuccess(response);
		// 		next_url = response.pagination.next_url;
		// 	})
		// }

		$scope.popular = function(){
			homeFactory.populate(5).success(function(response){
				console.log(response);
				$scope.data = [];
				$scope.chartData = response.data;
				$scope.search = response.data;
			})
		}
		// homeFactory.get(9, $scope.example1.hash).success(function(response) {
		// 	instagramSuccess($scope.example1, response);
		// });
	}
]);