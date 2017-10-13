define(["loginAngRegister","detailf","cookie"],function(loginAngRegister,detailf,cookie){
	var detail = function(){
var url = window.location.href;	  //获取当前页面的url
var len = url.length;   //获取url的长度值
var a = url.indexOf("?");   //获取第一次出现？的位置下标
var b = url.substr(a+1, len);   //截取问号之后的内容
/*var c=b.split(“&”);   //从指定的地方将字符串分割成字符串数组
var arr=new Array();  //新建一个数组
for(var i=0;i<c.length;i++){
 	 var d=c[i].split("=")[1]; //从=处将字符串分割成字符串数组,并选择第2个元素
         arr.push(d);	 //将获取的元素存入到数组中	
}*/
var e = url.indexOf("=");
var c = url.split("&");
var id = c[0].substr(e+1, c[0].length);
var d = c[1];
$(function(){
	detailf.detailf();
	loginAngRegister.loginAngRegister();
	var color = "";
	$(".chooseColor").find("p").click(function(){
		$(".chooseColor").find("p").css("border","1px solid #dcdcdc");
		$(this).css("border","1px solid #1abc9c");
		color = $(this).text();
	});
	var num = 1;
	$(".numjian").click(function(){
		if(num > 1){
			num--;
		}
		$("#goodNum").attr("value",num);
	});
	$(".numjia").click(function(){
		num++;
		$("#goodNum").attr("value",num);
	});
	$(window).scroll(function(){
		if($(document).scrollTop() > 1024){
			$(".intro_nav").css("position","fixed");
			$(".intro_nav").css("top",0);
			$(".intro_nav").css("z-index",999);
			
		}else{
			$(".intro_nav").css("position","relative");
		}
		if($(document).scrollTop() > 1024 && $(document).scrollTop() < 11194){
			$(".intro_nav p").find("span").css("color","rgb(102, 102, 102)");
			$(".intro_nav p").find("span").eq(0).css("color","rgb(27, 188, 155)");

		}
		if($(document).scrollTop() > 11194 && $(document).scrollTop() < 11510){
			$(".intro_nav p").find("span").css("color","rgb(102, 102, 102)");
			$(".intro_nav p").find("span").eq(1).css("color","rgb(27, 188, 155)");
		}
		if($(document).scrollTop() > 11510){
			$(".intro_nav p").find("span").css("color","rgb(102, 102, 102)");
			$(".intro_nav p").find("span").eq(2).css("color","rgb(27, 188, 155)");
		}
	});
	//购物车
	var goodName = $(".goodName").text();
	var goodPic = $(".goodpic1").text();
	$("#join").click(function(){
		$(".success").css("display","block");
		var timer = setTimeout(function(){
			$(".success").css("display","none");
		},2000);
		var num = $("#goodNum").attr("value");
		
			//是否是第一次添加cookie
			var first = $.cookie("goods") == null ? true : false;
			if(first){
				//第一次添加  [{id:id,num:2}]
				$.cookie("goods", '[{id:' + id + ',num:' + num + '}]', {
					expires: 7
				});
				sc_car();
			}else{
				var str = $.cookie("goods");
				var arr = eval(str);
				var same = false; //代表是否有相同商品

				//遍历所有的对象，判断是否id相同，num++
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = Number(arr[i].num) + Number(num);
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods", cookieStr,  {
							expires: 7
						});
						same = true;
						break;
					}
				}

				//没有相同的商品
				if(!same){
					var obj = {id: id, num: num};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods", cookieStr, {
						expires: 7
					});
				}
				sc_car();
			}
			return false;		
		
	});
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
	//show，展示商品图片
	$(".showList p").find("img").mouseover(function(){
		var a = $(this).index();
		var b = $(this).attr("src");
		$(".show").find("img").css("display","none");
		$(".show").find("img").eq(a-1).css("display","block");
		$("#b_box_all").find("img").eq(0).attr("src",b);
	})
	
	//导入商品信息
	$.ajax({
		type:"get",
		url:"../data/goodList.php",
		success:function(data){
			var data = JSON.parse(data);
			var html = '';
			html = data[id-1].name;
			$(".goodName").text(html);
			html = data[id-1].pic2;
			$(".goodpic1").text(html);
			html = data[id-1].pic1;
			$(".goodpic2").text(html);
			img = data[id-1].img;
			$(".show").find("img").eq(0).attr("src",img);
			$("#b_box_all").find("img").eq(0).attr("src",img);
			$(".showList p").find("img").eq(0).attr("src",img);
		}		
	});
	//jion
	$(".cart_a").click(function(){
			if(d){
				window.location.href='cart.html?&' + d;
			}else{
				window.location.href='cart.html';
			}
		});
	if(d){
			$(".top_left").find("span").eq(1).html(d + " 您好！");
	}
});
	}
	return {
		detail : detail 
	};
});
