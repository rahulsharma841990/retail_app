angular.module('retailapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('DashboardCtrl', function($scope, $stateParams, $state) {

    $scope.gotoSearch = function(){

        $state.go('app.search');
    }

})

.controller('LoginCtrl', function($scope, $stateParams, loginService, $ionicLoading, $state) {

    $scope.loginUser = function(user, pass){

        if(user === undefined && pass === undefined){

            $ionicLoading.show({
              template: 'Please fill details',
              noBackdrop: false,
              duration: 1000
            });

            return false;

        }

        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>',
          noBackdrop: false
        });
        loginService.loginUser(user, pass).then(function(response){

            if(response.data.code == 407){
                $ionicLoading.hide();
                $ionicLoading.show({
                  template: response.data.message,
                  noBackdrop: false,
                  duration: 1000
                });
            }else{
                $state.go('app.dashboard');
                $ionicLoading.hide();
            }
        });

        
    }


}).controller('SearchCtrl', function($scope, $stateParams, products, $ionicLoading, ionicMaterialInk, $cordovaBarcodeScanner, searchProd, localStorageService, $state) {

    ionicMaterialInk.displayEffect();
    $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
    });
    
    $scope.scanBarcode = function(){

        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
        
          $scope.barcode = barcodeData.text;
    
        }, function(error) {
          
        });
    }
    
    $scope.searchProd = function(barcode){

        console.log(barcode);
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
        searchProd.getProdsDet(barcode).then(function(response){
            $scope.items = response.data.prod_det;
            localStorageService.set('items',response.data.prod_det);
            $ionicLoading.hide();
        });

    }

    $scope.viewDetail = function(barcode){

        console.log(barcode);
        $state.go('app.viewdetail',{'barcode':barcode});
    }

    products.getProds().then(function(result){

        console.log(result);
        localStorageService.set('items',result.data.items);
        $scope.items = result.data.items;
        $ionicLoading.hide();
    });

}).controller('DetailsCtrl', function($scope, $stateParams, products, $ionicLoading, ionicMaterialInk, $cordovaBarcodeScanner, localStorageService, $state) {

    ionicMaterialInk.displayEffect();
    
    var itemList = localStorageService.get('items');
    var singleItem = '';
    angular.forEach(itemList, function(value, index){

        if(value.bar_code == $state.params.barcode){
            singleItem = value;
            return false; 
        }
    });
    $scope.barcode = singleItem.bar_code;
    $scope.item_name = singleItem.item_name;
    $scope.mrp = singleItem.mrp;
    $scope.sale_price = singleItem.sale_price;
    $scope.purchase_price = singleItem.purchase;

    $scope.goBack = function(){

        $state.go('app.search');
    }
    console.log(singleItem);
});
