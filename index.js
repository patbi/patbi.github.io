// variable declarations

let currencyFrom = document.getElementById('from');
let currencyTo = document.getElementById('to');
const CURRENCIES_URL = "https://free.currencyconverterapi.com/api/v5/currencies";
const VALUES_URL  =  "https://free.currencyconverterapi.com/api/v5/convert?q=";
let outputFrom = "";
let outputTo = "";
get(CURRENCIES_URL);
let fromAmount = document.getElementById("fromAmount");
let toAmount   = document.getElementById("toAmount");

	
	// function to detect an url
    
  function get (url)
  {
	  
	  fetch(url)
	  .then(
	    fetchResult => {
	      return fetchResult.text();
	    },
	    fetchError => {
	      console.log("An error occurred during the Request", fetchError); 
	    },
	  )
	  .then(
	    	textResult => 
			{
			    let ret = JSON.parse(textResult);
			    
			    if(url == CURRENCIES_URL)
			    {
					
					let results = ret.results;
					let tab = [];
					let results2 = {};
					for(let key in results)
					{
						tab.push(key);
					}
					
					tab.sort();
					tab.forEach(k => results2[k] = results[k]);
     	
			     	for(let key in results2)
				     	{
				     		if(key == "EUR")
				     		outputFrom += `
				     			<option value="${key}" selected> ${results[key].currencyName} (${key}) </option>
				     		`;
				     		else
				     			outputFrom += `
				     			<option value="${key}"> ${results[key].currencyName} (${key}) </option>
				     		`;

				     		if(key == "XAF")
				     		outputTo += `
				     			<option value="${key}" selected> ${results[key].currencyName} (${key}) </option>
				     		`;
				     		else
				     			outputTo += `
				     			<option value="${key}"> ${results[key].currencyName} (${key}) </option>
				     		`;
				     	}
					     	currencyFrom.innerHTML = outputFrom;
					     	currencyTo.innerHTML = outputTo;			    	
		    	}
		    			if(url.startsWith(VALUES_URL))
			    			{
			    				let keys = url.split("=")[1].split(",")[0];
			    				let values = JSON.parse(textResult).results[keys].val;
  								let amount = fromAmount.value;
  								let total = Number(values) * Number(amount);		
  								toAmount.value = numberWithCommas(total);
			    			}

						},
				    	parseError => 
				    	{
				      		console.log("An error occurred while parsing", parseError);
				    	},
			  		);  
			  }


						  fromAmount.addEventListener("input", function(){
						 		let from = currencyFrom.value;
						 		let to   = currencyTo.value;  

						  		let convertString = from + "_" + to + "," + to + "_" + from;
						  		get(VALUES_URL +convertString);
						  });

						 const numberWithCommas = (x) => {
						  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
						}

						currencyFrom.addEventListener("change", function()
						{
							let from = currencyFrom.value;
						 		let to   = currencyTo.value;  

						  		let convertString = from + "_" + to + "," + to + "_" + from;
						  		get(VALUES_URL +convertString);
						  	});

						currencyTo.addEventListener("change", function()
						{
							let from = currencyFrom.value;
						 		let to   = currencyTo.value;  

						  		let convertString = from + "_" + to + "," + to + "_" + from;
						  		get(VALUES_URL +convertString);
						})



					 // initialization IndexedDb 

					const dbPromise = idb.open('currencyConverter', 1, (upgradeDb) => {
					    switch (upgradeDb.oldVersion) {
					        case 0:
					            upgradeDb.createObjectStore('countries', {
					                keyPath: 'currencyId'
					            });
					        case 1:
					            let countriesStore = upgradeDb.transaction.objectStore('countries');
					            countriesStore.createIndex('country', 'currencyName');
					            countriesStore.createIndex('country-code', 'currencyId');
					        case 2:
					            upgradeDb.createObjectStore('conversionRates', {
					                keyPath: 'query'
					            });
					            let ratesStore = upgradeDb.transaction.objectStore('conversionRates');
					            ratesStore.createIndex('rates', 'query');
					    }
					});


					document.addEventListener('DOMContentLoaded', () => {
					    /*
					     Fetch Countries 
					      */
					    fetch('https://free.currencyconverterapi.com/api/v5/countries')
					        .then(res => res.json())
					        .then(res => {
					            Object.values(res.results).forEach(country => {
					                dbPromise.then(db => {
					                    const countries = db.transaction('countries', 'readwrite').objectStore('countries');
					                    countries.put(country);
					                })
					            });
					            dbPromise.then(db => {
					                const countries = db.transaction('countries', 'readwrite').objectStore('countries');
					                const countriesIndex = countries.index('country');
					                countriesIndex.getAll().then(currencies => {
					                })
					            })
					        }).catch(() => {
					            dbPromise.then(db => {
					                const countries = db.transaction('countries').objectStore('countries');
					                const countriesIndex = countries.index('country');
					                countriesIndex.getAll().then(currencies => {
					                })

					            });
					        });
					});