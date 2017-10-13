var url = window.location.href;	  //获取当前页面的url
var len = url.length;   //获取url的长度值
var a = url.indexOf("?");//获取第一次出现？的位置下标
var c = url.split("&");
var b = c[0].substr(a+1,c[0].length);
var d = c[1];
		$(function(){
			$.ajax({
				type:"post",
				url:"../data/nav1.php",
				success:function(data){
					var nav_list = JSON.parse(data);
					var html = '';
					for(var i = 0; i < nav_list.length; i++){
						html += '<li class = nav_list_' + i +'>' +  nav_list[i] + '</li>';
					}
					$("#nav1_ul").html(html);
					var html2 = nav_list[0] + '<ul class="nav_ul_ul" id="nav_ul_ul"></ul>';
					$("#nav1_ul").find("li").eq(0).css("position","relative");
					$("#nav1_ul").find("li").eq(0).html(html2);
					$("#nav1_ul").find("li").each(function(i){
						$(this).mouseover(function(){
							$(this).css("color","#1abc9c");
						});
						$(this).mouseout(function(){
							$(this).css("color","#333");
						})
					});
					$("#nav1_ul").find("li").eq(0).mouseout(function(){
						$(this).css("color","white");
					});
				}
			});
			$.ajax({
				type:"post",
				url:"../data/nav1_ul.php",
				success:function(data){
					var nav_list = JSON.parse(data);
					var html ='';
					for(var i = 0; i < nav_list.length; i++){
						html += '<div class = nav_ul_p><li class = nav_ul_list_' + i +'><a href = "#">' +  nav_list[i].name + '</a><span>></span></li></div>';
					}
					$("#nav_ul_ul").find("li").eq(0).attr("href","goodList.html")
					$("#nav_ul_ul").html(html);
					$("#nav_ul_ul").find("li").eq(0).addClass("iconfont icon-shafa");
					$("#nav_ul_ul").find("li").eq(1).addClass("iconfont icon-meizhuangyongpin");
					$("#nav_ul_ul").find("li").eq(2).addClass("iconfont icon-dianfanbao");
					$("#nav_ul_ul").find("li").eq(3).addClass("iconfont icon-dangao");
					$("#nav_ul_ul").find("li").eq(4).addClass("iconfont icon-yingerche");
					$("#nav_ul_ul").find("li").eq(5).addClass("iconfont icon-jiaonang");
					$("#nav_ul_ul").find("li").eq(6).addClass("iconfont icon-xiangji");
					$("#nav_ul_ul").find("li").eq(7).addClass("iconfont icon-diannao");
					$("#nav_ul_ul").find("li").eq(8).addClass("iconfont icon-xiangbao");
					var nav_ul = document.getElementById("nav_ul_ul");
					var olis = nav_ul.getElementsByTagName("li");
					for(var i = 0; i < nav_list.length;i++){
						// $("div").appendTo($("span")); //找到div插入到span节点子节点的末尾
						var node  = document.createElement("div");
/*						var node2 = document.createElement("table");
						node2.id = "nav_ul_table" + i;
						node.appendChild(node2);*/
						node.className = "nav_ul_node";
						node.style.position = "absolute";
						node.id = "nav_ul_node" + i;
						olis[i].appendChild(node);						
					}
					//table
						$.ajax({
							type:"get",
							url:"../data/subNav.json",
							success:function(data){
								for(var i = 0; i < data.length; i++){
									var html ='';//data[i].goodlist[]
									for(var j = 0; j < data[i].goodlist1.length;j++){
										html += '<div><p>'+ data[i].goodlist1[j].name2 +'</p><p class="pv"></p></div>';
									}
									var odiv = document.getElementsByClassName("nav_ul_node");
									odiv[i].innerHTML = html;
									
								
								}
								
								for(var i = 0; i < data.length; i++){
									for(var j = 0; j < data[i].goodlist1.length;j++){
										var html2 ='';
										for(var k = 0; k < data[i].goodlist1[j].goodlist2.length;k++){
											html2 += '<span>' + data[i].goodlist1[j].goodlist2[k] + '<em>|</em></span>';
										}
										var odiv = document.getElementsByClassName("nav_ul_node");
										var opv = odiv[i].getElementsByClassName("pv");
										opv[j].innerHTML = html2;				
									}
								
								}
							}

						});
						$(".nav_ul_list_0").click(function(){
							if(d){
								$(window).attr('location','goodList.html?&' + d);
							}else{
								$(window).attr('location','goodList.html');
							}
					});
				}
			});
			

			
			//轮播图		
			
			var oDiv = document.getElementById("banner");
			var oUl = oDiv.getElementsByTagName("ul")[0];
			var aLis = oUl.getElementsByTagName("li");		
			var timer = null;
			var count = 1;
			$.ajax({
				type:"get",
				url:"../data/banner.php",
				success:function(data){
					var data = JSON.parse(data);
					for(var i = 0; i < aLis.length; i++){
						aLis[i].style.background = "url(" + data[i]  + ")";
					}
				}

			});	
			timer = setInterval(timerInterval,5000);
			function timerInterval(){
				count++;
				count = count % 7;
				$("#count").find("span").css("background-color","#4a5966");
				$("#count").find("span").eq(count).css("background-color","#1abc9c");
				startMove(oUl,{
					left : oUl.offsetLeft - aLis[0].offsetWidth
				},function(){
					if(oUl.offsetLeft < -aLis[0].offsetWidth * 6){
						oUl.style.left = 0;
					}
				})
			}
			oUl.onmousemove = function(){
				clearInterval(timer);
			}
			oUl.onmouseout = function(){
				timer = setInterval(timerInterval,5000);
			}
			
		var ocount = document.getElementById("count");
		var spans = ocount.getElementsByTagName("span");
		$("#count").find("span").mousedown(function(){
			oUl.style.left = -aLis[0].offsetWidth * $(this).index() + "px";
			$("#count").find("span").css("background-color","#4a5966");
			$(this).css("background-color","#1abc9c");
			count = $(this).index() + 1;
		})	
		
		
		//starGoods
		$.ajax({
			type:"get",
			url:"../data/starGoods.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap").find("li").eq(i).html(html);
				}
			}		
		});
		//最新上架
		$.ajax({
			type:"get",
			url:"../data/starGoods.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap2").find("li").eq(i).html(html);
				}
			}		
		});
		
		//lnk-wrap-1 图片切换
		var count = 0; 
		$(".lnk-wrap-1").mousedown(function(){
			count++;
			if(count > 1){
				count = 1;
				$(".lnk-wrap-1").css("background","rgba(0, 0, 0, 0.1)");
			}else{
				$(".lnk-wrap").find("span").css("background","rgba(0, 0, 0, 0.3)");
			}
			$(".switch-wrap").find("ul").css("display","none");
			$(".switch-wrap").find("ul").eq(count).css("display","block");
		});
		$(".lnk-wrap-2").mousedown(function(){
			count--;
			if(count < 0){
				count = 0;
				$(".lnk-wrap-2").css("background","rgba(0, 0, 0, 0.1)");
			}else{
				$(".lnk-wrap").find("span").css("background","rgba(0, 0, 0, 0.3)");
			}
			$(".switch-wrap").find("ul").css("display","none");
			$(".switch-wrap").find("ul").eq(count).css("display","block");
		});
		var count2 = 0; 
		$(".lnk-wrap2-1").mousedown(function(){
			count2++;
			if(count2 > 1){
				count2 = 1;
				$(".lnk-wrap2-1").css("background","rgba(0, 0, 0, 0.1)");
			}else{
				$(".lnk-wrap2").find("span").css("background","rgba(0, 0, 0, 0.3)");
			}
			$(".switch-wrap2").find("ul").css("display","none");
			$(".switch-wrap2").find("ul").eq(count2).css("display","block");
		});
		$(".lnk-wrap2-2").mousedown(function(){
			count2--;
			if(count2 < 0){
				count2 = 0;
				$(".lnk-wrap2-2").css("background","rgba(0, 0, 0, 0.1)");
			}else{
				$(".lnk-wrap2").find("span").css("background","rgba(0, 0, 0, 0.3)");
			}
			$(".switch-wrap2").find("ul").css("display","none");
			$(".switch-wrap2").find("ul").eq(count2).css("display","block");
		});
		//life
		$.ajax({
			type:"get",
			url:"../data/life.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap3").find("li").eq(i).html(html);
				}
			}		
		});
		//beauty
		$.ajax({
			type:"get",
			url:"../data/beauty.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap4").find("li").eq(i).html(html);
				}
			}		
		});
		// electrical
		$.ajax({
			type:"get",
			url:"../data/electrical.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap5").find("li").eq(i).html(html);
				}
			}		
		});
		//food
		$.ajax({
			type:"get",
			url:"../data/food.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap6").find("li").eq(i).html(html);
				}
			}		
		});
		//child
		$.ajax({
			type:"get",
			url:"../data/child.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				for(var i = 0; i < data.length; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap7").find("li").eq(i).html(html);
				}
			}		
		});
		
		$("#home").click(function(){
			 location.reload();
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
		$(".cart_a").click(function(){
			if(d){
				window.location.href='cart.html?&' + d;
			}else{
				window.location.href='cart.html';
			}
		});
		

	});//$(function(){})的结束
	
	//返回顶部
	function showScroll(){
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
















