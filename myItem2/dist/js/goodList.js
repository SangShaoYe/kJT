var url = window.location.href;	  //获取当前页面的url
var len = url.length;   //获取url的长度值
var a = url.indexOf("?");//获取第一次出现？的位置下标
var c = url.split("&");
var b = c[0].substr(a+1,c[0].length);
var d = c[1];
$(function(){
	$('.M-box').pagination({
		pageCount:9,
		jump:true,
		coping:true,
		prevContent:'上页',
		nextContent:'下页'
	},function(api){
		 $('.now').text(api.getCurrent());
	});
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
					$(".nav_list_1").click(function(){
						$(window).attr('location','index.html');
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
						html += '<div class = nav_ul_p><li class = nav_ul_list_' + i +'><a href = "#">' +  nav_list[i].name + '</a><span>></span></li></div>'
					}
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
				}
			});
	$.ajax({
		type:"get",
		url:"../data/goodList.php",
		success:function(data){
			var data = JSON.parse(data);
			var html = '';
			for(var i = 0; i < data.length; i++){
				html = "<a id = goodList class = goodList value = " + data[i].id + "><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
				$(".switch-wrap").find("li").eq(i).html(html);
			}
		}		
	});
	var count = 0;
	var over = 24;
	var page = 1;
	$(".prev").click(function(){	
		page--;
		if(page < 1){
			page = 1;
		}
		$("#chose_page").html(page);
		count -= 24;
		over -=24;
		if(count < 0){
			count = 0;
			over = 24;
			return null;
		}
		$.ajax({
			type:"get",
			url:"../data/goodList.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				var a = 0;
				for(var i = count; i < over; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
					$(".switch-wrap").find("li").eq(a).html(html);
					a++;
				}
			}		
		});
	});
	$(".next").click(function(){
		page++;
		if(page > 9){
			page = 9;
		}
		$("#chose_page").html(page);
		count += 24;
		over += 24;
		if(count > 201){
			count = 192;
			over = 201;
			return null;
		}
		$.ajax({
			type:"get",
			url:"../data/goodList.php",
			success:function(data){
				var data = JSON.parse(data);
				var html = '';
				var a = 0;
				for(var i = count; i < over; i++){
					html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";;
					$(".switch-wrap").find("li").eq(a).html(html);
					a++;
				}
			}		
		});
	});	
		//商品列表条件筛选
		var isSheng = false;
		$(".choosemo").click(function(){
			$(".choose_pic").find("img").attr("src","../images/o1.png");
			$.ajax({
				type:"get",
				url:"../data/goodList.php",
				success:function(data){
					var data = JSON.parse(data);
					var html = '';
					for(var i = 0; i < data.length; i++){
						html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
						$(".switch-wrap").find("li").eq(i).html(html);
					}
				}		
			});
		})
		$(".choose_pic").click(function(){
			$(".choose_pic").find("img").attr("src","../images/desc.png");
			isSheng = !isSheng;
			if(isSheng == false){
				$(".choose_pic").find("img").addClass("piczz");
				$.ajax({
					type:"get",
					url:"../data/goodListj.php",
					success:function(data){
						var data = JSON.parse(data);
						var html = '';
						for(var i = 0; i < data.length; i++){
							html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
							$(".switch-wrap").find("li").eq(i).html(html);
						}
					}		
				});
			}else{
				$(".choose_pic").find("img").removeClass("piczz");
				$.ajax({
					type:"get",
					url:"../data/goodLists.php",
					success:function(data){
						var data = JSON.parse(data);
						var html = '';
						for(var i = 0; i < data.length; i++){
							html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";
							$(".switch-wrap").find("li").eq(i).html(html);
						}
					}		
				});
			}
		})
		
		
		//底部分页
		$(".jump-btn").click(function(){
			page = $(".jump-ipt").val();
			$("#chose_page").html(page);
			count = 24 * (page - 1);
			over = count + 24;
			$.ajax({
				type:"get",
				url:"../data/goodList.php",
				success:function(data){
					var data = JSON.parse(data);
					var html = '';
					var a = 0;
					for(var i = count; i < over; i++){
						html = "<a id = goodList class = goodList><img src=" + data[i].img + "><p class=goodName><img src=../images/startGoodsLogo.png />" + data[i].name + "</p><p class=goodPic><span>" + data[i].pic2 + "</span><span>" + data[i].pic1 + "</span></p></a>";;
						$(".switch-wrap").find("li").eq(a).html(html);
						a++;
					}
				}		
			});
		})
	
	$("#goodListbox").find("li").click(function(){
		var id = $(this).find("a").attr("value");
		window.location.href='detail.html?id=' + id + "&" + d;
	})
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
		if(d){
			$(".top_left").find("span").eq(1).html(d + " 您好！");
		}
});//页面加载完之后的

function showScroll(){
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}