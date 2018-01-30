class NativeCookieManagement{
    toggleMenu(){
		document.querySelector(".menu-button").style.display= document.querySelector(".menu-button").style.display == "none" ? "block" : "none";
		document.querySelector("#main-area").style.display= document.querySelector("#main-area").style.display == "none" ? "block" : "none";
	}
	
	setCookie(name,value = ""){
	    let date = new Date();
	    date.setTime(date.getTime() + (24*60*60*1000));
		const expires = "; expires=" + date.toUTCString();
	    const path = "; path=/";
	    document.cookie = `${name}=${value}${expires}${path}`;
	}
	
	eraseCookie(name){   	
	    document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
	}
	
	createCookieElement(name, value){
		const cookieEle = document.createElement("LI");
		cookieEle.textContent = `${name} : ${value}`;
		cookieEle.addEventListener("click", this.removeCookie.bind(this,name));
		
		return cookieEle;
	}
	
	addCookie(){
		const name = document.getElementById("cookie-name").value;
		const value = document.getElementById("cookie-value").value;
		if(name.trim() === "") return;
		this.setCookie(name,value);
		document.getElementById("cookies").appendChild(this.createCookieElement(name, value));
	}
	
	removeCookie(name,event){
		if(confirm(`Remove cookie "${name}" ? `)){
			this.eraseCookie(name);
			event.target.parentNode.removeChild(event.target);
		}
	}
	
	getCookie(){
		if(document.cookie === "") return [];
					
		return document.cookie.split("; ").map(cookie => {
			const [name, value] = cookie.split("=");
			return {name, value};
		});
	}
	
	constructor()
	{
		const cookies = document.createElement("UL");
		cookies.id = "cookies";
		for(let cookie of this.getCookie()){
			cookies.appendChild(this.createCookieElement(cookie.name, cookie.value));
		}
		
		const addButton = document.createElement("BUTTON");
		addButton.textContent = "Add";
		addButton.addEventListener("click", this.addCookie.bind(this));
		
		const inputName = document.createElement("INPUT");
		inputName.id = "cookie-name";
		
		const inputValue = document.createElement("INPUT");
		inputValue.id = "cookie-value";
		
		const closeMenuButton = document.createElement("DIV");
		closeMenuButton.className = "close-menu";
		closeMenuButton.textContent = "x";
		closeMenuButton.addEventListener("click", this.toggleMenu.bind(this));
		
		const mainArea = document.createElement("DIV");
		mainArea.id = "main-area";
		mainArea.appendChild(closeMenuButton);
		mainArea.appendChild(inputName);
		mainArea.appendChild(inputValue);
		mainArea.appendChild(addButton);
		mainArea.appendChild(cookies);
		mainArea.style.display = "none";
		
		const menuButton = document.createElement("DIV");
		menuButton.className = "menu-button";
		menuButton.textContent = "》";
		menuButton.addEventListener("click", this.toggleMenu.bind(this));
		
		const container = document.createElement("DIV");
		container.className = "extension-cookie-management-container";
		container.appendChild(mainArea);
		container.appendChild(menuButton);
		document.querySelector("#extension-cookie-management-native").appendChild(container);
	}
}

new NativeCookieManagement();