function setSpacer() {
	let winHeight = window.innerHeight;
	//alert("Window height: " + winHeight);
	let containerHeight = document.getElementById("main-container").offsetHeight;
	//alert("Container height: " + containerHeight);
	
	let toAdd = winHeight - containerHeight;
	if(toAdd < 1) {
		//alert("spacer hidden");
		document.getElementById("spacer").style.height = "0px";
	}
	else {
		//alert("spacer set");
		document.getElementById("spacer").style.height = toAdd + "px";
		//alert("spacer height: " + document.getElementById("spacer").style.height);
	}
	
}

window.onload = setSpacer;