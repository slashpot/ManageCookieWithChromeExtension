new Vue({
			el: "#extension-cookie-management-vue",
			data:{
				cookie:{
					name:"",
					value:"",	
				},
				cookies:[],
				showMenu: false
			},			
			methods: {			
				getCookie(){
					if(document.cookie === "") return [];
								
					return document.cookie.split("; ").map(cookie => {
						const [name, value] = cookie.split("=");
						return {name, value};
					});
				},				
			    setCookie(name,value = ""){
				    let date = new Date();
				    date.setTime(date.getTime() + (24*60*60*1000));
					const expires = "; expires=" + date.toUTCString();
				    const path = "; path=/";
				    document.cookie = `${name}=${value}${expires}${path}`;
				},
				eraseCookie(name){   
					if(confirm(`Remove cookie "${name}" ? `)){
				    	document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				    }
				},
				addCookie(){
					if(this.cookie.name.trim() === "") return;
					this.setCookie(this.cookie.name, this.cookie.value);
					this.cookies = this.getCookie();
				},
				removeCookie(name){
					this.eraseCookie(name);
					this.cookies = this.getCookie();
				},
				toggleMenu(){
					this.showMenu = !this.showMenu;
				}
			},
			created(){
				this.cookies = this.getCookie();
			},
			template: ` 
				<div class="extension-cookie-management-container">
					<template v-if="showMenu">
						<div class="close-menu" @click="toggleMenu">x</div>
						<input type="text" v-model="cookie.name"/>
						<input type="text" v-model="cookie.value"/>
						<button @click="addCookie">Add</button>
						<ul>
							<li v-for="cookie in cookies" @click="removeCookie(cookie.name)">{{cookie.name}} : {{cookie.value}}</li>
						</ul>
					</template>
					<div v-else @click="toggleMenu" class="menu-button">》</div>
				</div>
			`
		});