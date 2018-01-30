class ReactMenuButton extends React.Component{
	
	toggleMenu(){
		this.props.toggleMenu();
	}
	
	render(){
		if(this.props.showMenu) return null;
		return React.createElement("DIV", {className: "menu-button", onClick: this.toggleMenu.bind(this)}, "》");
	}
}

class ReactMainArea extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			name: "",
			value: ""
		}
	}
	
	toggleMenu(){
		this.props.toggleMenu();
	}
	
	removeCookie(name){
		this.props.removeCookie(name);
	}
				
	addCookie(){
		this.props.addCookie(this.state.name, this.state.value);
	}
	
	handleNameChanged(e){
		this.setState({
			name: e.target.value
		})
	}
	
	handleValueChanged(e){
		this.setState({
			value: e.target.value
		})
	}
	
	render(){
		if(!this.props.showMenu) return null;
		const cookies = this.props.cookies.map(cookie => React.createElement("LI", {dataSet:{name:cookie.name},onClick: this.removeCookie.bind(this, cookie.name)}, `${cookie.name} : ${cookie.value}`));
		
		return React.createElement(
			"DIV",
			{},
			React.createElement("DIV", {className: "close-menu", onClick: this.toggleMenu.bind(this)}, "x"),
			React.createElement("INPUT", {onChange: this.handleNameChanged.bind(this)}, null),
			React.createElement("INPUT", {onChange: this.handleValueChanged.bind(this)}, null),
			React.createElement("BUTTON", {onClick: this.addCookie.bind(this)}, "Add"),
			React.createElement(
				"UL",
				{}, 
				cookies
			)
		);
	}
}

class ReactCookieManagement extends React.Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			showMenu: false,
			cookies: []
		};
	}
	
	componentWillMount(){
		this.setState({
			cookies: this.getCookie()
		});
	}
	
	getCookie(){
		if(document.cookie === "") return [];
					
		return document.cookie.split("; ").map(cookie => {
			const [name, value] = cookie.split("=");
			return {name, value};
		});
	}
					
    setCookie(name,value = ""){
	    let date = new Date();
	    date.setTime(date.getTime() + (24*60*60*1000));
		const expires = "; expires=" + date.toUTCString();
	    const path = "; path=/";
	    document.cookie = `${name}=${value}${expires}${path}`;
	}
	
	eraseCookie(name){   
		if(confirm(`Remove cookie "${name}" ? `)){
	    	document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
	    }
	}
	
	addCookie(name, value){
		if(name.trim() === "") return;
		this.setCookie(name, value);
		this.setState({
			cookies: this.getCookie()
		})
	}
	
	removeCookie(name){
		this.eraseCookie(name);
		this.setState({
			cookies: this.getCookie()
		})
	}
				
	toggleMenu(){
		this.setState(prevState => ({ 
				showMenu: !prevState.showMenu
			})
		);
	}
	
	render(){
		return React.createElement(
			"DIV", 
			{className: 'extension-cookie-management-container'}, 
			React.createElement(ReactMainArea, {toggleMenu: this.toggleMenu.bind(this), addCookie:this.addCookie.bind(this), removeCookie:this.removeCookie.bind(this), cookies:this.state.cookies, showMenu: this.state.showMenu} , null),
			React.createElement(ReactMenuButton, {toggleMenu: this.toggleMenu.bind(this), showMenu: this.state.showMenu} , null)
		);
	}
}


ReactDOM.render(React.createElement(ReactCookieManagement, {}, null),document.getElementById("extension-cookie-management-react"));