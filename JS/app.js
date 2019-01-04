
var app = angular.module('rest', []);
var app = angular.module('rest', ['angular.filter']);

app.controller("menuController", function($scope, $http){
	$http.get("https://thesmartq.firebaseio.com/menu.json").then(function(response){
		$scope.content = response.data;
	}, function(response){
   		$scope.content = "Something went wrong";
	});

	var res = false;
	$scope.checkTime = function(time,name){
   		var range = time.split("-"),
        date  = new Date(),
        now = date.toTimeString()
        res = now >= range[0] && now <= range[1];
        $scope.show = !res;
        return !res;
	}

	$scope.checkCount = function(key){
		if(obj[key] == 0)
			return true;
		else
			return false;
	}

	$scope.add = function(key, price){
		var res = ++obj[key];
		updateCount(key, res);
		updateDataInCart(key, res, true, price);
		displayTotalsInCart(true);
	}

	$scope.subtract = function(key, price){
		var res = --obj[key];
		updateCount(key, res);
		updateDataInCart(key, res, false, price);
		displayTotalsInCart(false);
	}

	function displayTotalsInCart(isAdd){
		var count = parseInt(document.getElementsByClassName("cart")[0].getElementsByTagName("span")[0].innerHTML);
		if(isAdd)
			count+=1;
		else
			count-=1;
		document.getElementsByClassName("cart")[0].getElementsByTagName("span")[0].innerHTML = count;
	}

	function AddSubTotals(){
		var elementInCart = document.getElementById("cartContent");
		var rowCount = elementInCart.rows.length;
		var total = 0;
		for(i=0; i<rowCount; i++)
		{
			total += parseInt(elementInCart.rows[i].cells[3].innerHTML.split(' ')[1]);
		}
		document.getElementById("Total").innerHTML = total;
	}

	function updateCount(key, res){
		var elements = document.getElementsByClassName("dish");
		for(var i=0; i<elements.length; i++)
		{
			var name = elements[i].cells.item(0).childNodes[3].textContent.toString().trim();
			if(name == key)
				elements[i].cells[2].getElementsByClassName('count')[0].innerHTML = res;
		}
	}

	$scope.showCart = function(onClick, onRowUpdate = false){
		if (onClick) {
			if(document.getElementById("cartContent").rows.length == 0){
				if(document.getElementById("emptyCart").style.display == "none")
					document.getElementById("emptyCart").style.display = "block";
				else
					document.getElementById("emptyCart").style.display = "none";
			}
			else
			{
				if(document.getElementById("nonEmptyCart").style.display == "none")
					document.getElementById("nonEmptyCart").style.display = "block";
				else
					document.getElementById("nonEmptyCart").style.display = "none";
			}
		}
		else if(onRowUpdate && (document.getElementById("nonEmptyCart").style.display == "block" || 
			document.getElementById("emptyCart").style.display == "block"))
		{
			if(document.getElementById("cartContent").rows.length == 0)
			{
				document.getElementById("emptyCart").style.display = "block";
				document.getElementById("nonEmptyCart").style.display = "none";
			}
			else
			{
				document.getElementById("nonEmptyCart").style.display = "block";
				document.getElementById("emptyCart").style.display = "none";
			}
		}
	}

	function updateDataInCart(key, res, isadd, price){
		var elementInCart = document.getElementById("cartContent");
		var rowCount = elementInCart.rows.length;
		var totalprice = res * price; 
		// var row = table.insertRow(rowCount);
		if(isadd)
		{
			if (res==1) {
				var row = elementInCart.insertRow(-1);
				var cell0 = row.insertCell();
				var cell1 = row.insertCell();
				var cell2 = row.insertCell();
				var cell3 = row.insertCell();
				cell0.innerHTML = key;
				cell1.innerHTML = "x";
				cell2.innerHTML = res;
				cell3.innerHTML = "Rs. " + totalprice;
				$scope.showCart(false, true);
			}
			else{
				for (var i = 0; i < rowCount; i++) {
					if (elementInCart.rows[i].cells[0].innerHTML == key)
					{
						elementInCart.rows[i].cells[2].innerHTML = res;
						elementInCart.rows[i].cells[3].innerHTML = "Rs. " + totalprice;
					}
				}
			}
		}
		else
		{
			if(res == 0){
				for (var i=0; i < rowCount; i++)
				{
					if (elementInCart.rows[i].cells[0].innerHTML == key) {
						elementInCart.deleteRow(i);
						$scope.showCart(false, true);
						break;
					}
				}
			}
			else{
				for (var i = 0; i < rowCount; i++) {
					if (elementInCart.rows[i].cells[0].innerHTML == key)
					{
						elementInCart.rows[i].cells[2].innerHTML = res;
						elementInCart.rows[i].cells[3].innerHTML = "Rs. " + totalprice;
					}
				}
			}
		}
		AddSubTotals();
	}

	var obj={
		'Egg Chinese Combo': 0,
		'Chicken Chinese Combo': 0,
		'Lebanese Falafal Pockets': 0,
		'Lebanese Chicken Pockets': 0,
		'Mexican Veg Nachos': 0,
		'Mexican Non Veg Nachos': 0, 
		'Indonesian  Nasi Goreng Tofu': 0,
		'Indonesian Nasi Goreng Chicken': 0,
		'Veg Salad': 0,
		'Non Veg Salad': 0,
		'Chicken Starter': 0,
		'Veg Starter': 0,
		'Paneer Starter': 0,
		'Veg Chinese Combo': 0
	}
});

