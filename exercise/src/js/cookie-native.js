class NativeCookieManagement{
	
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
		
	getCookie(){
		if(document.cookie === "") return [];
					
		return document.cookie.split("; ").map(cookie => {
			const [name, value] = cookie.split("=");
			return {name, value};
		});
	}
	
	constructor()
	{		
		const container = document.createElement("DIV");
		const cookieList = document.createElement("UL");
		container.appendChild(cookieList);

		const cookies = this.getCookie();
		cookies.forEach(cookie => {
			const list = document.createElement("LI");
			list.textContent = "name: " + cookie.name +" value: " + cookie.value;
			cookieList.appendChild(list);
		});

		container.className = "extension-cookie-management-container";
		document.querySelector("#extension-cookie-management-native").appendChild(container);
	}
}

new NativeCookieManagement()