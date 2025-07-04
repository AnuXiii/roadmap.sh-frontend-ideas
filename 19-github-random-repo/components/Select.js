import { programmingLanguages } from "../data.js";
import { getRandomRepo } from "../app.js";

class Select extends HTMLElement {
	#isOpen = false;

	connectedCallback() {
		this.render();
		this.initSelect();
	}

	render() {
		this.innerHTML = /*html*/ `
      <div class="select" role="combobox" aria-expanded="false" aria-controls="options-list">
        <div class="select-display flex items-center justify-between p-1 border-gray rounded-md" tabindex="0">
          <span class="selected">Choose</span>
          <ion-icon name="arrow-down-outline" class="arrow"></ion-icon>
        </div>
        <ul id="options-list" class="options bg-black rounded-md border-gray">
          ${
						programmingLanguages.length > 0
							? programmingLanguages
									.map(
										(lang) => `
                    <li 
                      id="${lang.id}" 
                      class="option p-1" 
                      data-value="${lang.name}" 
                      data-color="${lang.color}" 
                      role="option"
                      tabindex="-1"
                    >${lang.name}</li>
                  `
									)
									.join("")
							: '<li class="option p-1" role="option">No languages available</li>'
					}
        </ul>
        <input type="text" id="value" name="value" hidden value="" aria-hidden="true"/>
      </div>
    `;
	}

	initSelect() {
		const selectDisplay = this.querySelector(".select-display");
		const arrow = this.querySelector(".arrow");
		const options = this.querySelector(".options");
		const input = this.querySelector("#value");

		const toggleDropdown = () => {
			this.#isOpen = !this.#isOpen;
			arrow.classList.toggle("rotate-180");
			this.setAttribute("aria-expanded", this.#isOpen.toString());
			options.classList.toggle("active", this.#isOpen);
			options.style.height = this.#isOpen ? `${options.scrollHeight}px` : "0";
		};

		const selectValue = (e) => {
			const validTarget = e.target.closest("li");
			if (!validTarget) return;

			const selectDisplayValue = selectDisplay.querySelector(".selected");
			selectDisplayValue.textContent = validTarget.dataset.value;
			input.value = validTarget.dataset.value;
			input.setAttribute("lang-color", validTarget.dataset.color);
			toggleDropdown();
			getRandomRepo(input.value, validTarget.dataset.color);
		};

		selectDisplay.addEventListener("click", toggleDropdown);
		options.addEventListener("click", selectValue);

		document.addEventListener("click", (e) => {
			if (this.#isOpen && !e.target.closest(".select")) {
				toggleDropdown();
			}
		});
	}
}

customElements.define("c-select", Select);
