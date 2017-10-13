/*<!--		<script src="../js/gVerify.js"></script>
		<script src="../js/perfect_startMove.js"></script>
		<script src="../js/tool.js"></script>-->
	<!--		<script src="../js/jquery-1.11.1.js"></script>
		<script type = "text/javascript" src="../js/jquery.cookie.js"></script>
		<script src="../js/goodList.js"></script>
		<script src="../js/jquery.pagination.js"></script>
		<script src="../js/loginAngRegister.js"></script>-->*/
require.config({
	shim:{
		cookie:["jquery"]
	},
	paths: {
		gVerify: "gVerify",
		jquery: "jquery-1.11.1",
		tool: "tool",
		cookie: "jquery.cookie",
		goodList: "goodList",
		loginAngRegister: "loginAngRegister",
		startMove: "perfect_startMove",
		pagination:"jquery.pagination"
	}
})


//引用该模块中的函数
require(["goodList", "jquery","startMove","cookie","loginAngRegister","gVerify","pagination"], function(goodList, $, startMove, cookie, loginAngRegister, gVerify,pagination){
	goodList.goodList();
})