const selectBox = document.querySelector(".select-box");
const containerInner = document.querySelectorAll(".container-inner .container-inner");
let previousIndex = 0;

const categories = [...containerInner].map((item) => item.dataset.category);

selectBox.addEventListener("click", (e) => {
	const validTarget = e.target.closest(".select-box-item");

	if (validTarget) {
		selectBox.querySelector(".selected").classList.remove("selected");
		validTarget.classList.add("selected");

		let newCategory = validTarget.dataset.category;
		let newIndex = categories.indexOf(newCategory);
		let direction = newIndex > previousIndex ? "slide-right" : "slide-left";

		previousIndex = newIndex;
		showProject(newCategory, direction);
	}
});

function showProject(category, direction) {
	containerInner.forEach((container) => {
		container.classList.add("hidden");
		container.classList.remove("slide-right", "slide-left");

		if (container.dataset.category === category) {
			container.classList.add(direction);
			container.classList.remove("hidden");
		}
	});
}
