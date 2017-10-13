var url = window.location.href;	  //获取当前页面的url
var len = url.length;   //获取url的长度值
var a = url.indexOf("?");//获取第一次出现？的位置下标
var c = url.split("&");
var b = c[0].substr(a+1,c[0].length);
var d = c[1];
	$(function(){
		//显示登录界面（单例）
		$(".login").click(function(){
			show();
		});		
		var show = (function(){
				var oDiv = null;
				var html = null;
				var createDiv = function(){
					html = '<p><span>登录</span><span class="closeLogin"></span></p><img src="../images/c24ab85a-ad2d-4834-975d-a3e9467b8052.png" /><p><span>没有账号？</span><span class="regnow">立即注册</span><span class="lognow">立即登录</span></p><div class="login2"><form action="../data/login.php" method = "post"><span></span><p><img src="../images/icons-1.png"/><input type="text" placeholder="请输入您的手机号或用户名" id="username" name="username" class="username2"/><span id="verify5"></span></p><p><img src="../images/icons-2.png"/><input type="text" placeholder="请输入密码" id="password" name="password" class="password2" maxlength="18"/><span id="verify6"></span></p><input id="agree" type="checkbox" checked="checked" tabindex="5" name="agree"/><label for="agree" id="agree-label">我同意<span class="agreement">《bestkeep用户服务协议》</span></label><input type = "submit" value = "登录" class="loginbtn"/></form></div><div class="register2"><form action="../data/register.php" method = "post"><span></span><p><img src="../images/icons-1.png"/><input type="text" placeholder="请输入您的手机号或用户名" id="username" name="username" class="username"/><span id="verify1"></span></p><p><img src="../images/icons-2.png"/><input type="text" placeholder="密码（6-18位，含字母、数字）" id="password" name="password" class="password" maxlength="18"/><span id="verify2"></span></p><p><img src="../images/icons-2.png"/><input type="text" placeholder="确认密码" id="password-again" name="password-again" class="password-again" maxlength="18"/><span id="verify3"></span></p><p><img src="../images/icons-4.png"/><input type="text" placeholder="图片验证码" id="v-img-code" name="v-img-code" maxlength="18"/><span id="v_container"></span><span id="verify4"></span></p><p class="pCode"><img src="../images/icons-5.png"/><input type="text" placeholder="手机验证码" id="smsCode" name="smsCode" maxlength="18"/><button class="btntime smsCode-btn button-verifyCodeSend">发送验证码</button></p><input id="agree" type="checkbox" checked="checked" tabindex="5" name="agree"/><label for="agree" id="agree-label">我同意<span class="agreement">《bestkeep用户服务协议》</span></label><input type = "submit" value = "注册" class="regbtn"/></form></div>';
					$(".loginAndRegist").html(html);
					$(".loginAndRegist").css("display","block");
					$(".closeLogin").click(function(){
						$(".loginAndRegist").css("display","none");
					});
					//login跟reg切换
					$(".regnow").click(function(){
						$(".lognow").css("display","block");
						$(".regnow").css("display","none");
						$(".register2").css("display","block");
						$(".login2").css("display","none");
						
					})
					$(".lognow").click(function(){
						$(".regnow").css("display","block");
						$(".lognow").css("display","none");
						$(".login2").css("display","block");
						$(".register2").css("display","none");
						
					})
						//表单验证
						//验证码验证
						var verifyCode = new GVerify("v_container");
				        $(".v-img-code").blur = function(){
				            var res = verifyCode.validate($(".v-img-code").value);
				            if(res){
				                $("#verify4").css("display","block");
				                $("#verify4").css("background-position-x","-24px");
				            }else{
				                $("#verify4").css("display","block");
				                $("#verify4").css("background-position-x","-46px");
				            }
				        }
				        //用户名验证
				        $(".username").blur(function(){
							var str = $(".username").val();
							var pattern = /^1[34578]\d{9}$/; 
							if(pattern.test(str)){
								$("#verify1").css("display","block");
				                $("#verify1").css("background-position-x","-24px");
							}else{
								$("#verify1").css("display","block");
				                $("#verify1").css("background-position-x","-46px");
							}
						})
						$(".password").blur(function(){
							var str = $(".password").val();
							var pattern = /^\w{6,}$/;
							if(pattern.test(str)){
								$("#verify2").css("display","block");
				                $("#verify2").css("background-position-x","-24px");
							}else{
								$("#verify2").css("display","block");
				                $("#verify2").css("background-position-x","-46px");
							}
						})
						$(".username2").blur(function(){
							var str = $(".username2").val();
							var pattern = /^1[34578]\d{9}$/; 
							if(pattern.test(str)){
								$("#verify5").css("display","block");
				                $("#verify5").css("background-position-x","-24px");
							}else{
								$("#verify5").css("display","block");
				                $("#verify5").css("background-position-x","-46px");
							}
						})
						$(".password2").blur(function(){
							var str = $(".password2").val();
							var pattern = /^\w{6,}$/;
							if(pattern.test(str)){
								$("#verify6").css("display","block");
				                $("#verify6").css("background-position-x","-24px");
							}else{
								$("#verify6").css("display","block");
				                $("#verify6").css("background-position-x","-46px");
							}
						})
					
						$(".password-again").blur(function(){
							var str1 = $(".password").val();
							var str = $(".password-again").val();
							if(!str){
								$("#verify3").css("display","block");
				                $("#verify3").css("background-position-x","0px");
							}
							if(str1 == str){
								$("#verify3").css("display","block");
				                $("#verify3").css("background-position-x","-24px");
							}else{
								$("#verify3").css("display","block");
				                $("#verify3").css("background-position-x","-46px");
							}
				       })//表单验证结束
				}
				return createDiv;
			})();
		//关闭登录
		if(b == "losucess"){
			alert("登录成功");	
		}else if(b == "lofail"){
			alert("登录失败，请重新登录");    	
		}else if(b == "risucess"){
			alert("恭喜，注册成功");  	
		}else if(b == "risucess"){
			alert("注册失败，请重新注册");    	
		}
		if(d){
			$(".top_left").find("span").eq(1).html(d + " 您好！");
		}
})