const express = require("express");
const app = express();
const path = require("path");
const port = 3003;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Function to fetch country data
function fetchCountryData(countryName) {
	// Return the country data based on the countryName
	return data.find((country) => country.name === countryName);
}

// Serve static files from the "public" directory
app.use(express.static(__dirname));

// Read the data from the JSON file
const data = require("./data.json");

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:countryName", (req, res) => {
	const countryName = req.params.countryName;
	// Fetch the country data based on the countryName
	const countryData = fetchCountryData(countryName);
	if (countryData) {
		// Render the country page using the "country.ejs" template and pass the border country names
		res.render("country", { country: countryData, data: data });
	} else {
		// Country not found
		res.render("country", { country: null });
	}
});

// Error handling middleware (should be placed at the end)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
