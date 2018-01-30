class JQueryCookieManagement{
    toggleMenu(){
		$(".menu-button").toggle();
		$("#main-area").toggle();
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
		return $("<li>", {text: `${name} : ${value}`}).on("click", this.removeCookie.bind(this,name));
	}
	
	addCookie(){
		const name = $("#cookie-name").val();
		const value = $("#cookie-value").val();
		if(name.trim() === "") return;
		this.setCookie(name,value);
		$("#cookies").append(this.createCookieElement(name, value));
	}
	
	removeCookie(name,event){
		if(confirm(`Remove cookie "${name}" ? `)){
			this.eraseCookie(name);
			$(event.target).remove();
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
		const cookies = $("<ul>", { id: "cookies"});

		for(let cookie of this.getCookie()){
			cookies.append(this.createCookieElement(cookie.name, cookie.value));
		}
		
		const addButton = $("<button>", {text: "Add"}).on("click", this.addCookie.bind(this));
		
		const inputName = $("<input>", {id: "cookie-name"});
		
		const inputValue = $("<input>", {id: "cookie-value"});
		
		const closeMenuButton = $("<div>", { class: "close-menu", text: "x"}).on("click", this.toggleMenu.bind(this));
		
		const mainArea = $("<div>", { id: "main-area" }).append(closeMenuButton).append(inputName).append(inputValue).append(addButton).append(cookies).hide();
		
		const menuButton = $("<div>", { class: "menu-button", text: "》"}).on("click", this.toggleMenu.bind(this));
		
		const container = $("<div>", { class: "extension-cookie-management-container"}).append(mainArea).append(menuButton);	
		
		$("#extension-cookie-management-jquery").append(container);
	}
}

new JQueryCookieManagement();