// set up your achievement name here!!!
const name = "";

if(!document.getElementById(`extension-cookie-management-name`))
{
	const ele = document.createElement("DIV");
	ele.id = `extension-cookie-management-name`;
	ele.textContent=name;
	document.body.appendChild(ele);
}


const allJS = ["native", "jquery", "react", "angular", "vue"];

allJS.map((js) => {
	if(!document.getElementById(`extension-cookie-management-${js}`))
	{
		const ele = document.createElement("DIV");
		ele.id = `extension-cookie-management-${js}`;
		document.body.appendChild(ele);
	}
});