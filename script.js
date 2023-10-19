function shuffleArray(array) {
	// Fisher-Yates shuffle algorithm
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

fetch("data.json")
	.then((response) => response.json())
	.then((data) => {
		const countryCardsContainer = document.getElementById(
			"country-cards-container"
		);
		const cardTemplate = document.getElementById("card-template");

		// Shuffle the data array randomly
		const shuffledData = shuffleArray(data);

		// Store the original data for filtering
		const originalData = shuffledData;

		// Render all country cards
		renderCountryCards(shuffledData, cardTemplate, countryCardsContainer);

		// Handle region filter change event
		const regionFilter = document.getElementById("region-filter");
		regionFilter.addEventListener("change", () => {
			const selectedRegion = regionFilter.value;

			if (selectedRegion === "") {
				// If "All" is selected, render all country cards
				renderCountryCards(originalData, cardTemplate, countryCardsContainer);
			} else {
				// Filter the data based on the selected region
				const filteredData = originalData.filter(
					(country) => country.region === selectedRegion
				);

				// Render the filtered country cards
				renderCountryCards(filteredData, cardTemplate, countryCardsContainer);
			}
		});
	})
	.catch((error) => {
		console.error(error);
	});

function renderCountryCards(data, template, container) {
	// Clear the container before rendering
	container.innerHTML = "";

	data.forEach((country) => {
		const countryCard = createCountryCard(country, template);
		container.appendChild(countryCard);
	});
}

function createCountryCard(country, template) {
	const countryCard = template.content.firstElementChild.cloneNode(true);

	const countryImage = countryCard.querySelector(".country-image");
	const img = document.createElement("img");
	const flagURL = country.flags.svg || country.flags.png || "";
	img.src = flagURL;
	img.loading = "lazy";
	countryImage.appendChild(img);

	const countryName = countryCard.querySelector(".country-name");
	countryName.textContent = country.name;

	const population = countryCard.querySelector(".pop");
	population.innerHTML = `<span class="first-word">Population: </span>${country.population}`;

	const region = countryCard.querySelector(".region");
	region.innerHTML = `<span class="first-word">Region: </span>${country.region}`;

	const capital = countryCard.querySelector(".capital");
	capital.innerHTML = `<span class="first-word">Capital: </span>${country.capital}`;

	countryCard.addEventListener("click", () => {
		navigateToCountryPage(country.name);
	});

	return countryCard;
}
function navigateToCountryPage(countryName) {
	// Redirect to the country page
	window.location.href = `/${countryName}`;
}

//######################################################################
// Get the search input element
const searchInput = document.getElementById("search-container");
const autocompleteDropdown = document.getElementById("autocomplete-dropdown");

// Fetch the JSON data
fetch("../data.json")
	.then((response) => response.json())
	.then((data) => {
		// Extract the country names from the JSON data
		const countryNames = data.map((country) => country.name);

		searchInput.addEventListener("input", (event) => {
			const query = event.target.value;

			const filteredArray = countryNames.filter((country) => {
				const lowerCountry = country.toLowerCase();
				const lowerQuery = query.toLowerCase();
				return lowerCountry.startsWith(lowerQuery);
			});

			const autocompleteOptions = filteredArray
				.map((country) => {
					return `<div class="autocomplete-option">${country}</div>`;
				})
				.join("");

			autocompleteDropdown.innerHTML = autocompleteOptions;
			if (query.length > 0) {
				autocompleteDropdown.style.display = "block";
			} else {
				autocompleteDropdown.style.display = "none";
			}
		});

		autocompleteDropdown.addEventListener("click", (event) => {
			const selectedOption = event.target;
			const selectedValue = selectedOption.textContent;
			searchInput.value = selectedValue;
			autocompleteDropdown.style.display = "none";
			navigateToCountryPage(selectedValue);
		});
	})
	.catch((error) => {
		console.error(error);
	});
// ############################################
