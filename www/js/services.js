/*
* Module
*
* Retail App Services
*/

angular.module('retailapp.services', [])

.factory('loginService', function($http, $ionicLoading){

	var ApiUrl = 'http://futurewebs.in/retail_server/index.php/loginUser';

	var token = '4028b71c7f65566d9eef6a0b8a229ec9';
	Object.toparams = function ObjecttoParams(obj) 
	{
	  var p = [];
	  for (var key in obj) 
	  {
	    p.push(key + '=' + encodeURIComponent(obj[key]));
	  }
	  return p.join('&');
	};
	return {

		loginUser: function(user, pass){
			
			var postData = {};
			postData['token'] = token;
			postData['user'] = user;
			postData['pass'] = pass;
			return $http({

					url: ApiUrl,
					method: 'post',
					data: Object.toparams(postData),
					headers: {
					        'Content-Type': 'application/x-www-form-urlencoded'
					    }
			})
		}
	}
}).factory('products', function($http, $ionicLoading){

	var ApiUrl = 'http://futurewebs.in/retail_server/index.php/products';

	var token = '4028b71c7f65566d9eef6a0b8a229ec9';
	Object.toparams = function ObjecttoParams(obj) 
	{
	  var p = [];
	  for (var key in obj) 
	  {
	    p.push(key + '=' + encodeURIComponent(obj[key]));
	  }
	  return p.join('&');
	};
	return {

		getProds: function(user, pass){
			
			var postData = {};
			postData['token'] = token;
			return $http({

					url: ApiUrl,
					method: 'post',
					data: Object.toparams(postData),
					headers: {
					        'Content-Type': 'application/x-www-form-urlencoded'
					    }
			})
		}
	}

}).factory('searchProd', function($http, $ionicLoading){

	var ApiUrl = 'http://futurewebs.in/retail_server/index.php/search-prod';

	var token = '4028b71c7f65566d9eef6a0b8a229ec9';
	Object.toparams = function ObjecttoParams(obj) 
	{
	  var p = [];
	  for (var key in obj) 
	  {
	    p.push(key + '=' + encodeURIComponent(obj[key]));
	  }
	  return p.join('&');
	};
	return {

		getProdsDet: function(barcode){
			
			var postData = {};
			postData['token'] = token;
			postData['barcode'] = barcode;
			return $http({

					url: ApiUrl,
					method: 'post',
					data: Object.toparams(postData),
					headers: {
					        'Content-Type': 'application/x-www-form-urlencoded'
					    }
			})
		}
	}
})