/*<script src="../js/gVerify.js"></script>
		<script src="../js/jquery-1.11.1.js"></script>
		<script src="../js/perfect_startMove.js"></script>
		<script src="../js/tool.js"></script>
		<link rel="stylesheet" type="text/css" href="../css/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../css/public.css" />
		<link rel="stylesheet" type="text/css" href="../css/index.css" />
		<script src="../js/jquery-1.11.1.js"></script>
		<script type = "text/javascript" src="../js/jquery.cookie.js"></script>
		<script src="../js/index.js"></script>
		<script src="../js/loginAngRegister.js"></script>*/
// 配置路径
require.config({
	shim:{
		cookie:["jquery"]
	},
	paths: {
		gVerify: "gVerify",
		jquery: "jquery-1.11.1",
		tool: "tool",
		cookie: "jquery.cookie",
		index: "index",
		loginAngRegister: "loginAngRegister",
		startMove: "perfect_startMove"
	}
})


//引用该模块中的函数
require(["index", "jquery","startMove","cookie","loginAngRegister","gVerify"], function(index, $, startMove, cookie, loginAngRegister, gVerify){
	index.index();
})