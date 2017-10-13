define(function(){
	var cart = function(){
var url = window.location.href;	  //获取当前页面的url
var len = url.length;   //获取url的长度值
var a = url.indexOf("?");//获取第一次出现？的位置下标
var c = url.split("&");
var b = c[0].substr(a+1,c[0].length);
var d = c[1];
$(function(){
	//已经存储在cookie数据进行加载
		sc_msg();
		function sc_msg(){
			$.ajax({
				url: "../data/goodList.php",
				type: "get",
				success: function(data){
					var sc_arr = eval($.cookie("goods"));
					var html = '';
					var sum = 0;
					var res = JSON.parse(data);
					for(var i in sc_arr){
						var pic = res[sc_arr[i].id - 1].pic2;
						var pic1 = pic.substr(1,pic.length);
						sum += parseInt(pic1 * sc_arr[i].num * 100) / 100;
						html += "<div><img src=" + res[sc_arr[i].id - 1].img + " /><p><span>" + res[sc_arr[i].id - 1].name + "</span><span>满150包邮</span><span>颜色：漆色</span></p><p>" + pic1 + "</p><p>" + sc_arr[i].num + "</p><p>" + parseInt(pic1 * sc_arr[i].num * 100) / 100 + "</p><p class =remove value =" + sc_arr[i].id + ">删除</p></div>";
					}
					$(".goodsCart").html(html);
						$(".remove").click(function(){
							var arr = eval($.cookie("goods"));
							id = $(this).attr("value");
							var a = "";
							for(var i in arr){
								if(arr[i].id == id){
									a = i;
								}
							}
							arr.splice(a,1);
							var cookieStr = JSON.stringify(arr);
							$.cookie("goods", cookieStr,  {
												expires: 7
											});
							 location.reload();
						});
					$(".addSum").html(sum);
				}
			})
		}
		sc_car();
		function sc_car(){
			var sc_str = $.cookie("goods");
			if(sc_str){ //判断字符串是否存在
				var sc_arr = eval(sc_str);
				var sc_num = 0;
				for(var i in sc_arr){
					sc_num = Number(sc_arr[i].num) + sc_num;
				}
				$(".cart_a").find("span").html(sc_num);
			}
		}
		$(".cart_a").click(function(){
			window.location.href='cart.html';
		});
});
	}
	return {
		cart : cart 
	};
});
