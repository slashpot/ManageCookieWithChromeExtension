class NativeCookieManagement {
	setCookie(name, value = "") {
		let date = new Date();
		date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
		const expires = "; expires=" + date.toUTCString();
		const path = "; path=/";
		document.cookie = `${name}=${value}${expires}${path}`;
	}

	eraseCookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
	}

	getCookie() {
		if (document.cookie === "") return [];

		return document.cookie.split("; ").map(cookie => {
			const [name, value] = cookie.split("=");
			return { name, value };
		});
	}

	getContainer() {
		const container = document.createElement("DIV");
		container.className = "extension-cookie-management-container";
		document.querySelector("#extension-cookie-management-native").appendChild(container);
		return container;
	}

	getCookieList(container) {
		const cookieList = document.createElement("UL");
		cookieList.setAttribute("id", "cookieList");

		const cookies = this.getCookie();
		cookies.forEach(cookie => {
			const list = document.createElement("LI");
			list.textContent = "name: " + cookie.name + " value: " + cookie.value;
			list.addEventListener("click", function(){
				this.eraseCookie(cookie.name);
				cookieList.removeChild(list);
			}.bind(this));

			cookieList.appendChild(list);
		});
		return cookieList;
	}

	getCookieInfo() {
		const nameInput = document.querySelector("#nameInput");
		const valueInput = document.querySelector("#valueInput");

		if (nameInput.value != "" && valueInput.value!= "") {
			this.setCookie(nameInput.value, valueInput.value);

			const cookieList = document.querySelector("#cookieList");

			const newCookie = document.createElement("LI");
			newCookie.textContent = "name: " + nameInput.value + " value: " + valueInput.value;
			newCookie.addEventListener("click", function(){
				cookieList.removeChild(newCookie);
				this.eraseCookie(nameInput.value);
			}.bind(this));

			cookieList.appendChild(newCookie);
		}
	}

	getAddCookieElement() {
		const addCookieContainer = document.createElement("DIV");

		const nameInput = document.createElement("INPUT");
		nameInput.setAttribute("id", "nameInput");

		const valueInput = document.createElement("INPUT");
		valueInput.setAttribute("id", "valueInput");

		const addCookieButton = document.createElement("BUTTON");
		addCookieButton.textContent = "Add";
		
		addCookieButton.addEventListener("click", this.getCookieInfo.bind(this));

		addCookieContainer.appendChild(nameInput);
		addCookieContainer.appendChild(valueInput);
		addCookieContainer.appendChild(addCookieButton);
		
		return addCookieContainer;
	}

	constructor() {
		const container = this.getContainer();
		container.appendChild(this.getAddCookieElement());
		container.appendChild(this.getCookieList());
	}
}

new NativeCookieManagement()