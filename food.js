{
let myRequest = new XMLHttpRequest();
let myNewRequest = new XMLHttpRequest();
let dogfood = {};
let catfood = {};
dogFoodList = [];
catFoodList =[];
let mainDiv = document.getElementById('dogFoodList');
createFoodCard = function(brandList)
{
	console.log(brandList);
	brandList.forEach(function(item)
	{
	let cardDiv = document.createElement('div');
	cardDiv.setAttribute('class', 'cardDiv')
	mainDiv.appendChild(cardDiv);
	let h2 = document.createElement('h2');
	h2.innerHTML = item.name;
	cardDiv.appendChild(h2);
	if(item.hasOwnProperty('breeds'))
	{
		let h3 = document.createElement('h3');
		cardDiv.appendChild(h3);
		h3.innerHTML = "Breeds: ";
		item.breeds.forEach(function(breed)
		{
		h3.innerHTML += `${breed}, `;
		})
	}
	let table = document.createElement('table');
	cardDiv.appendChild(table);
	let tr1 = document.createElement('tr'); //main header row
	table.appendChild(tr1);
	let th1 = document.createElement('th'); // row - heading
	th1.innerHTML = "Type";
	tr1.appendChild(th1);
	let th2 = document.createElement('th');
	th2.innerHTML = "Name";
	tr1.appendChild(th2);
	let th3 = document.createElement('th');
	th3.innerHTML = "Price";
	tr1.appendChild(th3);
	item.types.forEach(function(itemType)
	{	
		itemType.volumes.forEach(function(item)
		{
		let tr2 = document.createElement('tr') // sub row
		table.appendChild(tr2);
			let td1 = document.createElement('td');
			td1.innerHTML = itemType.foodType;
			tr2.appendChild(td1);
			let td2 = document.createElement('td');
			td2.innerHTML = item.name;
			tr2.appendChild(td2);
			let td3 = document.createElement('td');
			td3.innerHTML = item.price;
			tr2.appendChild(td3);
		})
	})
})

}
loadDogFood = function()
{
	let data = JSON.parse(event.target.responseText);
	dogFoodList = data.dog_brands;
	console.log(dogFoodList);
	createFoodCard(dogFoodList);
	callCatFoodJSON();	
}

loadCatFood = function()
{
	let data = JSON.parse(event.target.responseText);
	catFoodList = data.cat_brands;
	createFoodCard(catFoodList);
}
dogfood.getDatabase = function()
{
	return dogFoodList;
}

catfood.getDatabase = function()
{
	return catFoodList;
}
myRequest.addEventListener('load', loadDogFood);
myRequest.open("GET", "dogfood.json");
myRequest.send();

function callCatFoodJSON()
{
	myNewRequest.addEventListener('load', loadCatFood);
	myNewRequest.open("GET", "catfood.json");
	myNewRequest.send();
}
window.food = window.food || {};
food.dogfood = dogfood;
food.catfood = catfood;
}