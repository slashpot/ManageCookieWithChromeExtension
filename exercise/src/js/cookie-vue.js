new Vue({
			el: "#extension-cookie-management-vue",
			data:{
				cookies:[]
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
				    document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				}
			},
			mounted() {
				this.cookies = this.getCookie();
			},
			template: 
			` 
				<div class="extension-cookie-management-container">
					<ul>
						<li v-for="cookie in cookies">
							name: {{cookie.name}} value: {{cookie.value}}
						</li>
					</ul>
				</div>
			`
		});