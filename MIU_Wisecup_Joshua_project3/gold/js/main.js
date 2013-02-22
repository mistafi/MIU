// JavaScript Document
// MIU Project 3 Gold 
// Joshua Wisecup
// Term 1302 

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#newItem').on('pageinit', function(){

		var pebbleForm = $('#pebbleForm');
		    pebbleForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = pebbleForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

//Auto Fill Local Storage as default
var autofillData = function (){
//store JSON into Local Storage
	for(var n in jsonData){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(jsonData[n]));
	} 
};
		
//Get data
var getData = function(){
	if(localStorage.length === 0) {
		alert("There is no data in Local Storage so example data was added.");
		autoFillDefault();
	}
	//write data from local storage to the browser
	var makeNewDiv = document.createElement("div");
	makeNewDiv.setAttribute("id", "items");
	var makeNewList = document.createElement("ol");
	makeNewList.setAttribute("class", "unstyled");
	makeNewDiv.appendChild(makeNewList);
	document.body.appendChild(makeNewDiv);
	document.getElementById("items").style.display = "block";													

	for (var i=0, len=localStorage.length; i<len;i++){
		var makeNewLi = document.createElement("li");
		var navLinksLi = document.createElement("li");
		makeNewList.appendChild(makeNewLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//Convert the string from local storage value back to an object using JSON.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeSubList.setAttribute("class", "unstyled well");
		makeNewLi.appendChild(makeSubList);
		getCatImage(obj.dropdownSelect[1],makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement("li");
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(navLinksLi);
		}
		makeNavLinksLi(localStorage.key(i), navLinksLi); // create edit and delete links for each item in local storage
	}
	document.getElementById("mainContainer").appendChild(makeNewDiv);
};

var storeData = function(data){
	//if no key, then it's brand new and we need a new key
	if(!key){
	var id 				= Math.floor(Math.random()*100000001);
	}else {
		//set the id to the existing key so it will not overwrite the data
		id = key;
	}
	//Gather up our form field values and store in an object
	//Object properties contain an array with form label and input values
	getCheckBoxValue();
	var item			= {};
	item.dropdownSelect	= ["Type:", document.getElementById("dropdownSelect").value];
	item.inputName		= ["Name:", document.getElementById("inputName").value];
	item.inputAddress	= ["Address:", document.getElementById("inputAddress").value];
	item.inputAddress2	= ["Address2:", document.getElementById("inputAddress2").value];
	item.inputCity		= ["City:", document.getElementById("inputCity").value];
	item.inputState		= ["State:", document.getElementById("inputState").value];
	item.inputZip		= ["Zip Code:", document.getElementById("inputZip").value];
	item.inputRating	= ["Rating:", document.getElementById("inputRating").value];
	item.inputDate		= ["Date of Visit:", document.getElementById("inputDate").value];
	//item.inputHidden	= ["Hidden:", ge("inputHidden").value];
	item.inputArea		= ["Notes:", document.getElementById("inputArea").value];
	item.inputCheck		= ["Favorite:", favoriteValue];
	
	//Save data into local storage. Use stringify to convert object into a string		
	localStorage.setItem(id, JSON.stringify(item));
	
	//localStorage.setItem("test","hello");
	//alert(localStorage.length);
	alert("Pebble Saved! You have " + localStorage.length + " pebbles saved.");
}; 

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this pebble?");	
	if(ask){
		localStorage.removeItem(this.key);
		alert("Pebble was deleted.");
		window.location.reload();
	}else{
		alert("Pebble was not deleted.");
	}
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All pebbles are deleted!");
		window.location.reload();
		return false;
	}
};


