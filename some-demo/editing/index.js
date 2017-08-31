
var code = `
body{
	margin: 40px;
	background:#999;
}
p{
	color:green;
	font-size: 32px;
	border: 2px solid blue;
}
`;
var n=0;
var content = document.getElementById("content");
var style = document.getElementById("style");
setInterval(function(){
	content.innerHTML = code.substring(0,n);
	style.innerHTML = code.substring(0,n);
	n=n+1;
},100);
