function toggleLightMode() {
	const templateBody = document.getElementById("template-body");
	templateBody.classList.toggle("light-mode");

	// Save the dark mode state in localStorage
	const isLightMode = templateBody.classList.contains("light-mode");
	localStorage.setItem("isLightMode", isLightMode);
}

const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function () {
	// Correct the function invocation and update toggleIHTML
	toggleLightMode();

	const toggleIHTML = toggleButton.innerHTML;

	if (toggleIHTML === '<i class="fa-solid fa-moon"></i> Dark Mode') {
		toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
	} else {
		toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
	}
});

// Check the stored dark mode state on page load
window.addEventListener("DOMContentLoaded", function () {
	const storedState = localStorage.getItem("isLightMode");
	if (storedState === "true") {
		const templateBody = document.getElementById("template-body");
		templateBody.classList.add("light-mode");
		// Update the button text accordingly
		toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
	}
});
