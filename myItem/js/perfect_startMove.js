function startMove(obj, json, func){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//启动
		var bStop = true; //默认这个宝箱所有的钥匙都是集齐的。
		for(var attr in json){
			//<1>获取当前的样式的当前值
			//【注】对于透明度来说，取值的时候应该做区分
			var iCur = 0;
			if(attr == "opacity"){ //透明度
				iCur = parseFloat(getStyle(obj, attr)) * 100;
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}
			var speed = (json[attr] - iCur) / 8;
			//<2>处理速度
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//<3>判断是否到终点
			if(iCur != json[attr]){
				bStop = false;
			}

			//【注】在赋值的时候也得对透明度进行区分
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity=" + (iCur + speed) + ");";
				obj.style.opacity = (iCur + speed) / 100;
			}else{
				obj.style[attr] = iCur + speed + "px";
			}
			
		}

		//判断宝箱上是否钥匙齐全
		if(bStop){
			clearInterval(obj.timer);
			if(func){
				func();
			}
		}
	}, 30);
}

function getStyle(element, style){
	return element.currentStyle ? element.currentStyle[style] : getComputedStyle(element)[style];
}