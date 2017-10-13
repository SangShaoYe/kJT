<?php
	header("Content-type: text/html;charset=utf-8");
	error_reporting(0);
	
	$con = mysql_connect("localhost", "root", "123456");
//	$conn->query("SET NAMES utf8");

	if(!$con){
//		echo "error";
		exit;
	}else{
//		echo "success";
	}

	//2、选择数据库
	mysql_select_db("myitem");
	mysql_query("set names utf8");
	//3、查找
	$sql = "SELECT * FROM nav1_ul";

	//4、接受返回数据
	$res = mysql_query($sql);
	//将查询的结果集封装到一个数组里
//	$css = $res->fetch_all();
	while($row = mysql_fetch_array($res)){
		$array[] = $row;
		//$array[$rows['name']] = $rows;
	}
	//以json的格式发送ajax的success中由data接收
	echo json_encode($array);  
	$con->close();
?>