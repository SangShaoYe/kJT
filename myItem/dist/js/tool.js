//库

//获取元素节点
function $(vArg){
	switch(vArg[0]){
		case "#": //id
			return document.getElementById(vArg.substring(1));
			break;
		case ".": //class
			// return document.getElementsByClassName()
			return elementsByClassName(document, vArg.substring(1));
			break;
		default:
			var subStr = vArg.substring(0, 5);
			if(subStr == "name="){
				//name
				return document.getElementsByName(vArg.substring(5));
			}else{
				//tagName
				return document.getElementsByTagName(vArg);
			}
			break;
	}
}

//获取当前有效样式
function getStyle(element, attr){
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}
/*
	随机颜色
*/
function randomColor(){
	return "rgba(" + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", 1)";
}
/*
	通过className获取元素节点
*/
function elementsByClassName(parentNode, className){
	var result = []; //用于存储符合条件的元素节点
	//1、获取当前节点下，所有的节点
	var nodes =  parentNode.getElementsByTagName("*");
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			//2、存储
			result.push(nodes[i]);
		}
	}
	return result;
}
function removeSpaceNode(nodes){
	var arr = []; //存储不是空白节点的元素
	for(var i = 0; i < nodes.length; i++){
		//判断空白节点
		if(!(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue))){
			arr.push(nodes[i]);
		}
	}
	return arr;
}

//删除子节点上的空白节点
function removeSpaceNode2(parent){
	for(var i = parent.childNodes.length - 1; i >= 0 ; i--){
		if(parent.childNodes[i].nodeType == 3 && /^\s+$/.test(parent.childNodes[i].nodeValue)){
			//是空白节点，删除，通过父节点，删除子节点
			parent.removeChild(parent.childNodes[i]);
		}
	}
}

//创建一个带文本的节点
function createNodeWithText(tagName, text){
	//1、创建元素节点
	var node = document.createElement(tagName);
	//2、创建文本节点
	var oTxt = document.createTextNode(text);
	//3、将文本节点插入元素节点内
	node.appendChild(oTxt);
	//4、返回元素节点
	return node;
}


//插入到某个节点之后
function insertAfter(newNode, oldNode){
	var parent = oldNode.parentNode;
	if(parent.lastChild == oldNode){
		//最后一个节点，插入到末尾
		parent.appendChild(newNode);
	}else{
		//找到下一个节点
		parent.insertBefore(newNode, oldNode.nextSibling);
	}
}


//阻止事件冒泡
function stopBubble(e){
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}


//拖拽
function drag(node){
	//1、添加鼠标按下事件
	var offsetX = 0; //记录相对位置
	var offsetY = 0;
	node.onmousedown = function(ev){
		var e = ev || window.event;
		offsetX = e.clientX - node.offsetLeft;
		offsetY = e.clientY - node.offsetTop;
		//2、添加移动
		document.onmousemove = function(ev){
			var e = ev || window.event;
			//改变拖拽物体的坐标
			node.style.left = e.clientX - offsetX + "px";
			node.style.top = e.clientY - offsetY + "px";

		}

		//3、取消拖拽
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}

//碰撞检测的函数
function crash(node1, node2){
	var l1 = node1.offsetLeft;
	var t1 = node1.offsetTop;
	var r1 = node1.offsetLeft + node1.offsetWidth;
	var b1 = node1.offsetTop + node1.offsetHeight;

	var l2 = node2.offsetLeft;
	var t2 = node2.offsetTop;
	var r2 = node2.offsetLeft + node2.offsetWidth;
	var b2 = node2.offsetTop + node2.offsetHeight;

	//肯定碰撞不了的条件
	if(!(r2 < l1 || l2 > r1 || b2 < t1 || t2 > b1)){
		return true;
	}else{
		return false;
	}
}


//添加事件，跨浏览器的兼容写法
function addEvent(obj, type, func){
	if(obj.addEventListener){
		obj.addEventListener(type, func, false);
	}else{
		obj.attachEvent("on" + type, func);
	}
}

function removeEvent(obj, type, func){
	if(obj.removeEventListener){
		obj.removeEventListener(type, func);
	}else{
		obj.detachEvent("on" + type, func);
	}
}

function setCookie(name, value, {expires = 7, path, domain, secure}){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires){

		cookieText += ";expires=" + numOfDate(expires);
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(secure){
		cookieText += ";secure";
	}
	//设置cookie
	document.cookie = cookieText;
}


function getCookie(name){
	//1、取出存好的cookie
	var cookieText = decodeURIComponent(document.cookie);
	//2、找出键值对的位置
	var start = cookieText.indexOf(name);
	if(start == -1){
		return null;
	}else{
		var end = cookieText.indexOf(";", start);
		if(end == -1){
			//这是结尾
			end = cookieText.length;
		}
	}

	//3、将键值对提取出来
	var str = cookieText.substring(start, end);
	var arr = str.split("=");
	return arr[1];
}

// 超级英雄=钢铁侠; X战警=金刚狼; 变种人=万磁王

function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "= ;expires=" + new Date(0);
}

function numOfDate(n){
	var d = new Date();
	var day = d.getDate();
	d.setDate(day + n);
	return d;
}

function $_cookie(){
	//通过参数所传内容区分
	switch(arguments.length){                     
		case 1: //获取cookie
			return getCookie(arguments[0]);
			break;
		case 2:
			//1、删除cookie
			if(!arguments[1]){
				removeCookie(arguments[0]);
			}else{
				//2、设置cookie
				setCookie(arguments[0], arguments[1]);
			}
			break;
		default:
			//3、设置cookie  arguments[2] 必须是json对象
			setCookie(arguments[0], arguments[1], arguments[2]);
			break;
	}
}



