const btn = document.querySelectorAll(".btn");

btn.forEach((b) =>
	b.addEventListener("click", () => {
		window.location.href = "/"; // Redirect to the main page URL
	})
);

function navigateToCountryPage(countryName) {
	// Redirect to the country page
	window.location.href = `/${encodeURIComponent(countryName)}`;
}

const borderBtn = document.querySelectorAll(".country");
borderBtn.forEach((country) => {
	country.addEventListener("click", () => {
		const countryName = country.textContent;
		navigateToCountryPage(countryName);
	});
});
