/*<script src="../js/jquery-1.11.1.js"></script>
		<script type = "text/javascript" src="../js/jquery.cookie.js"></script>
		<script src="../js/cart.js"></script>
		<script src="../js/goodList.js"></script>*/
// 配置路径
require.config({
	shim:{
		cookie:["jquery"]
	},
	paths: {
		jquery: "jquery-1.11.1",
		cookie: "jquery.cookie",
		cart: "cart",
	}
})


//引用该模块中的函数
require(["cart", "jquery","cookie",], function(cart, $, cookie){
	cart.cart();
})