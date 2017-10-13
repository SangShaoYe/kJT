/*		<script src="../js/gVerify.js"></script>
		<script src="../js/perfect_startMove.js"></script>
		<script src="../js/tool.js"></script>
		<script src="../js/detailf.js"></script>
		<script src="../js/jquery-1.11.1.js"></script>
		<script type = "text/javascript" src="../js/jquery.cookie.js"></script>
		<script src="../js/detail.js"></script>
		<script src="../js/loginAngRegister.js"></script>*/
require.config({
	shim:{
		cookie:["jquery"]
	},
	paths: {
		gVerify: "gVerify",
		jquery: "jquery-1.11.1",
		tool: "tool",
		cookie: "jquery.cookie",
		detail: "detail",
		loginAngRegister: "loginAngRegister",
		startMove: "perfect_startMove",
		detailf:"detailf"
	}
})


//引用该模块中的函数
require(["detail", "jquery","startMove","cookie","loginAngRegister","gVerify","detailf"], function(detail, $, startMove, cookie, loginAngRegister, gVerify,detailf){
	detail.detail();
})