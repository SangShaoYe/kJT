<?php 
	header("content-type:text/html;charset='utf-8'");
	error_reporting(0);

	//处理添加请求
	//1、接受到数据 
	$username = $_POST["username"];
	$password = $_POST["password"];

	/*
		1、链接数据库
		
		mysql_connect()
		该函数用于链接数据库
			参数1：数据库的IP地址
			参数2：数据库的用户名
			参数3：数据库的密码
		【返回值】登陆状态
	 */
	$con = mysql_connect("localhost", "root", "123456");

	if(!$con){
//		echo "error";
		exit;
	}else{
//		echo "success";
	}

	//2、选择数据库
	mysql_select_db("myitem");
	mysql_query("set names utf8");
	//3、拼接sql语句
	$sql = "INSERT INTO USER VALUES('$username', '$password')";

	//4、将sql语句发给数据库
	$is_ok = mysql_query($sql);

	//5、得到结果
	if($is_ok){
		echo "注册成功"; 
		header("Location: ../html/index.html?risucess");
	}else{
		echo "注册失败";	
		header("Location: ../html/index.html?risucess");
	}
 ?>