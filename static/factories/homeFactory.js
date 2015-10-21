myApp.factory("homeFactory", ["$http", 
	function($http) {
		
		var base = "https://api.instagram.com/v1";
		// get your own client id http://instagram.com/developer/
		var clientId = 'ea3ce3ac91c24bebafc9c76a017bfd0b';
		return {
			// 'get': function(count, hashtag) {
			// 	var request = '/tags/' + hashtag + '/media/recent';
			// 	// var request = '/users/search?q=' + hashtag;
			// 	var url = base + request;
			// 	console.log(url);
			// 	var config = {
			// 		'params': {
			// 			'client_id': clientId,
			// 			'count': count,
			// 			'callback': 'JSON_CALLBACK'
			// 		}
			// 	};
			// 	return $http.jsonp(url, config);
			// },

			// 'user': function(userId){
			// 	var request = '/users/' + userId + '/?';
			// 	var url = base + request;
			// 	console.log(url);
			// 	var config = {
			// 		'params': {
			// 			'client_id': clientId,
			// 			'callback': 'JSON_CALLBACK'
			// 		}
			// 	};
			// 	return $http.jsonp(url, config);
			// },

			// 'more': function(count, next_url){
			// 	var config = {
			// 		'params': {
			// 			'client_id': clientId,
			// 			'count': count,
			// 			'callback': 'JSON_CALLBACK'
			// 		}
			// 	};
			// 	return $http.jsonp(next_url, config);
			// },
			
			'populate': function(count){
				var request = '/media/popular?'
				var url = base + request;
				var config = {
					'params': {
						'client_id': clientId,
						'count': count,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config);
			}
		};
	}
]);

// https://api.instagram.com/v1/users/search?q=jack
// https://api.instagram.com/v1/users/{user-id}/?
// https://api.instagram.com/v1/media/popular?
// https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&
// https://api.instagram.com/v1/tags/nofilter/media/recent?







