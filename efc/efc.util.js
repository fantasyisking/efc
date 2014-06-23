/**
 * ExtJs util class for efc.
 * @version 0.0.1
 * @author lishenying
 * @since 2012-08-08
 */
Ext.namespace('efc', 'efc.util');

/**
 * 基类
 * @return {}
 */
efc.util = function(){
	var version = '0.0.1';
	var author = 'lishenying';
	var since = '2012-08-08';
	
	return {
		getVersion : function (){
			return version;
		}
	}
};

Date.prototype.pattern=function(fmt) {           
    var o = {           
    "M+" : this.getMonth()+1, //月份           
    "d+" : this.getDate(), //日           
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
    "H+" : this.getHours(), //小时           
    "m+" : this.getMinutes(), //分           
    "s+" : this.getSeconds(), //秒           
    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
    "S" : this.getMilliseconds() //毫秒           
    };           
    var week = {           
    "0" : "/u65e5",           
    "1" : "/u4e00",           
    "2" : "/u4e8c",           
    "3" : "/u4e09",           
    "4" : "/u56db",           
    "5" : "/u4e94",           
    "6" : "/u516d"          
    };           
    if(/(y+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o){           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;           
}


efc.util.getExplorer = function(){  
	var explorer = window.navigator.userAgent ;
	//ie 
	if (explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox 
	else if (explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome
	else if(explorer.indexOf("Chrome") >= 0){
		return 'Chrome';
	}
	//Opera
	else if(explorer.indexOf("Opera") >= 0){
		return 'Opera';
	}
	//Safari
	else if(explorer.indexOf("Safari") >= 0){
		return 'Safari';
	}
	
	return 'ie';
}  


/**
 * 获取窗口宽度
 * @return {}
 */
efc.util.getBodyWidth = function() {
	var winBodyWidth = 0;
	if (window.innerWidth) {
		winBodyWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winBodyWidth = document.body.clientWidth;
	}
	// 通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientWidth) {
		winBodyWidth = document.documentElement.clientWidth;
	}
	return winBodyWidth;
}

/**
 * 获取窗口高度
 * @return {}
 */
efc.util.getBodyHeight = function() {
	var winBodyHeight = 0;
	if (window.innerHeight) {
		winBodyHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winBodyHeight = document.body.clientHeight;
	}
	// 通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight) {
		winBodyHeight = document.documentElement.clientHeight;
	}
	return winBodyHeight;
}

/**
 * 获取对象在屏幕中的相对位置
 * @param {} e:对象
 * @return {x:x, y:y}
 */
efc.util.getAbsPoint = function(e){      
    var x = e.offsetLeft, y = e.offsetTop;      
    while(e=e.offsetParent){
       x += e.offsetLeft;
       y += e.offsetTop;   
    }
	return {x:x, y:y};
}

/**
 * @Description : 去除字符串中的空格
 **/
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
}
/**
 * 判断并填补数字位数
 * @param {} iCount 位数
 * @return {}
 */
String.prototype.ToStringByZero = function(iCount) {   
	var  szContent = this;   
	while(szContent.length < iCount) 
		szContent = "0" + szContent;   
	return   szContent;   
}

/**
 * 判断是否在指定的数组中
 * @param {} needle
 * @param {} haystack
 * @return {Boolean}
 */
efc.util.isInArray = function(needle, haystack){
	type = typeof needle;
 	if(type == "string" || type =="number")
	{
  		for(var i in haystack)
		{
   			if(haystack[i] == needle)
			{
     			return true;
   			}
  		}
 	}
 	return false;
}

/**
 * 去除空格
 * @param {} str
 * @return {}
 */
efc.util.trim = function(str) {
	// return str.replace(/(^s*)|(s*$)/g, "");
	return str.trim();
}
// ltrim
efc.util.ltrim = function(str) {
	return str.replace(/(^s*)/g, "");
}
// rtrim
efc.util.rtrim = function(str) {
	return str.replace(/(s*$)/g, "");
}
/**
 * 取字符串右边
 * 
 * @param rights
 *            被截取的字符串
 * @param rightn
 *            需要截取的个数
 */
efc.util.rsubstring = function(rights, rightn) {
	var sr = rights;
	sr = sr.substring(sr.length - rightn, sr.length);
	return sr;
}
/**
 * 判断字符串是否全部为数字
 * @param {} num
 * @return {Boolean}
 */
efc.util.isNumber = function(num) {
	var strNum = '0123456789';
	if (efc.util.trim(num) == "")
		return false;
	for (var i = 0; i < num.length; i++) {
		if (strNum.indexOf(num.charAt(i)) == -1)
			return false;
	}
	return true;
}
/**
 * 判断变量是否为整型
 * @param {} para
 * @return {Boolean}
 */
efc.util.number = function(para) {
	var re = /^[0-9]+[0-9]*]*$/; // 判断正整数
	if (!re.test(para)) {
		return false;
	} else {
		return true;
	}
}
/**
 * 分隔字符串中的 数字和字符
 * @param {} str
 * @return {} 返回一个2位长度数组, array[0]=数字串; array[1]=字符串
 */
efc.util.splitNumberAndChar = function(str) {
	if (efc.util.trim(str) == "")
		return null;
	var strNum = '0123456789';
	var tmpNum = "";
	var tmpStr = "";
	for (var i = 0; i < str.length; i++) {
		if (strNum.indexOf(str.charAt(i)) == -1) {
			tmpStr = tmpStr + str.charAt(i);
		} else {
			tmpNum = tmpNum + str.charAt(i);
		}
	}
	var array = new Array();
	array[0] = efc.util.trim(tmpNum);
	array[1] = efc.util.trim(tmpStr);
	return array;
}

/**
 * 获取 Ajax对象 区分micro
 * @return {}
 */
efc.util.getAjaxObj = function() {
	var xmlhttp;
	window.status = '';
	if (window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

/**
 * 验证整数范围
 * @param {} value
 * @param {} min
 * @param {} max
 * @param {} label
 * @return {Boolean}
 */
efc.util.validateIntegerRange = function(value, min, max, label) {
	if (value.length == 0 || isNaN(value)) {
		efc.ext.msg(Ext.Msg.WARNING, label + TIP.MUST_INTEGER);
		return false;
	} else {
		if (!efc.util.number(value)) {
			efc.ext.msg(Ext.Msg.WARNING, label + TIP.MUST_INTEGER);
			return false;
		}
	}

	if (value < min || value > max) {
		efc.ext.msg(Ext.Msg.WARNING, label + TIP.VALUE_RANGE + min + "-" + max + TIP.VALUE_BETWEEN);
		return false;
	}

	return true;
};
/**
 * 验证是否为Hex范围
 * @param {} value
 * @param {} label
 * @return {}
 */
efc.util.validateHexRange = function(value, label) {
	if (value.length == 0) {
		return label + " must be a hex number.";
	} else {
		var isNumber = false;
		for (var count = 0; count < value.length; count++) {
			var code = value.charCodeAt(count);
			if (!((code > 47 && code < 58) || (code > 64 && code < 71) || (code > 96 && code < 103))) {
				return label + " must be a hex number.";
			}
		}
	}
}
/**
 * 校验整型范围
 * @param {} value
 * @param {} min
 * @param {} max
 * @param {} label
 * @return {Boolean}
 */
efc.util.validateIntegerRangeDeviceTalk = function(value, min, max, label) {
	if (isNaN(value)) {
		efc.ext.msg(Ext.Msg.WARNING, label + TIP.MUST_INTEGER);
		return false;
	} else {
		var isNumber = false;
		for (var count = 0; count < value.length; count++) {
			var code = value.charCodeAt(count);
			if ((48 > code && code > 57)) {
				efc.ext.msg(Ext.Msg.WARNING, label + TIP.MUST_INTEGER);
				return false;
			}
		}
	}

	if (value < min || value > max) {
		efc.ext.msg(Ext.Msg.WARNING, label + TIP.VALUE_RANGE + min + "-" + max + TIP.VALUE_BETWEEN);
		return false;
	}

	return true;
}
/**
 * 验证是否为IP地址
 * @param {} ipAddress
 * @return {}
 */
efc.util.validateIpAddress = function(ipAddress) {
	return efc.util.validateAddress(ipAddress, TIP.WRONG_IP);
}
/**
 * 验证地址
 * @param {} ipAddress
 * @param {} label
 * @return {Boolean}
 */
efc.util.validateAddress = function(ipAddress, label) {
	if (ipAddress.length == 0) {
		return true;
	}
	var tokens = efc.util.trim(ipAddress).split(".");
	if (tokens.length < 4 || tokens.length > 4) {
		efc.ext.msg(Ext.Msg.WARNING, label);
		return false;
	}
	if (tokens[0] == 0) {
		efc.ext.msg(Ext.Msg.WARNING, label);
		return false;
	}
	for (var k = 0; k < 4; k++) {
		if (isNaN(tokens[k]) || (tokens[k].length == 0) || (tokens[k].length > 3) || tokens[k] > 255 || tokens[k] < 0) {
			efc.ext.msg(Ext.Msg.WARNING, label);
			return false;
		}
		if (tokens[k].length > 1 && tokens[k].indexOf("0") == 0) {
			efc.ext.msg(Ext.Msg.WARNING, label);
			return false;
		}
		if ((tokens[k].indexOf(" ") > -1)) {
			efc.ext.msg(Ext.Msg.WARNING, label);
			return false;
		}
	}
	return true;
}
/**
 * 验证是否为邮箱地址
 * @param {} email
 * @return {Boolean}
 */
efc.util.validateEmail = function(email) {
	var reg = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);

	if (!reg.test(email)) {
		efc.ext.msg(Ext.Msg.WARNING, TIP.WRONG_EMAIL);
		return false;
	}

	return true;
}
/**
 * 允许按下按键
 */
efc.util.keyDownPermit = function() {
	if (event.ctrlKey && event.keyCode == 86) {
		event.keyCode = 0;
		event.returnValue = false;
	}
}
/**
 * 允许按下按键
 * @param {} e
 * @param {} type
 * @return {Boolean}
 */ 
efc.util.keyPressPermit = function(e, type) {
	var keycode;
	if (window.event) // IE
	{
		keycode = e.keyCode;
	} else if (e.which) // Netscape/Firefox/Opera
	{
		keycode = e.which;
		if (keycode == 8) {
			return true;
		}
	} else {
		return true;
	}
	if (type == "ten") {
		if (48 <= keycode && keycode <= 57) {
			return true;
		}
	}

	if (type == "hex") {
		if ((48 <= keycode && keycode <= 57) || (65 <= keycode && keycode <= 70) || (97 <= keycode && keycode <= 102)) {
			return true;
		}
	}
	if (type == "ip") {
		if ((48 <= keycode && keycode <= 57) || keycode == 46) {
			return true;
		}
	}
	if (type == "attribute") {
		if ((48 <= keycode && keycode <= 57) || keycode == 44 || keycode == 45) {
			return true;
		}
	}
	if (type == "name") {
		var bln = false;
		for (var i = 0; i < ASCII_UN_USE.length; i++) {
			if (keycode == parseInt(ASCII_UN_USE[i])) {
				bln = true;
				break;
			}
		}
		return !bln;
	}
	if (type == "directory") {
		if (keycode < 34 || (35 < keycode && keycode < 38) || (42 < keycode && keycode < 46) || (47 < keycode && keycode < 58)
		        || (60 < keycode && keycode < 62) || (63 < keycode && keycode != 92 && keycode != 124 && keycode != 126)) {
			return true;
		}
	}

	return false;
}


/**
 * 校验是否为时间
 * @param {} strIn
 * @return {Boolean}
 */
efc.util.checkTime = function(strIn) {
	var str = strIn;
	if (str.length != 0) {
		reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}
/**
 * 校验日期格式化的格式 format: yyyy-MM-dd 1970-01-01 Feeling 2007-10-25 return:
 * @param {} dateString
 * @param {} format
 * @return {Boolean}
 */
efc.util.checkDateFormat = function(dateString, format) {
	if (dateString == null || format == null) {
		efc.ext.msg(Ext.Msg.WARNING, TIP.WRONG_TIME + format + "MM" + format + "dd");
		return false;
	}
	var ary = dateString.split(format);
	if (ary == null || ary.length != 3) {
		efc.ext.msg(Ext.Msg.WARNING, TIP.WRONG_TIME + format + "MM" + format + "dd");
		return false;
	}
	return true;
}
/**
 * 格式化字符串为日期型 format date time:yyyy-mm-dd hh:mm:ss
 * @param {} datetime
 * @return {String}
 */
efc.util.setDatetimeFormat = function(datetime) {
	if (null == datetime || "" == datetime)
		return "";
	var dt = datetime.split(" ");
	var date = "";
	var time = "";
	var result = "";
	if (dt[0] != null) {
		date = dt[0].split("-");
		result = date[0];
		if (!Ext.isEmpty(date[1])) {
			result = result + "-" + efc.util.addZero(date[1]);
		}
		if (!Ext.isEmpty(date[2])) {
			result = result + "-" + efc.util.addZero(date[2]);
		}
	}
	if (!Ext.isEmpty(dt[1])) {
		time = dt[1].split(":");
		if (!Ext.isEmpty(time[0])) {
			result = result + " " + efc.util.addZero(time[0]);
		}
		if (!Ext.isEmpty(time[1])) {
			result = result + ":" + efc.util.addZero(time[1]);
		}
		if (!Ext.isEmpty(time[2])) {
			result = result + ":" + efc.util.addZero(time[2]);
		}
	}
	return result;
}

/**
 * 将日期类型转换成字符串型格式 yyyy-MM-dd hh:mm:ss
 * @param	Date 
 * 
 * @return	string
 */
efc.util.ChangeTimeToString = function( DateIn ){
    var Year = 0 ;
    var Month = 0 ;
    var Day = 0 ;
    var Hour = 0 ;
    var Minute = 0 ;
    var Second = 0 ;
    var Millisecond = 0;
    var CurrentDate = "" ;

    // 初始化时间
    Year       = DateIn . getFullYear ();
    Month      = DateIn . getMonth ()+ 1 ;
    Day        = DateIn . getDate ();
    Hour       = DateIn . getHours ();
    Minute     = DateIn . getMinutes ();
	Second     = DateIn . getSeconds ();
	Millisecond= DateIn . getMilliseconds();
	
    CurrentDate = Year + "-" ;

    if ( Month >= 10 ){
        CurrentDate = CurrentDate + Month + "-" ;
    } else {
        CurrentDate = CurrentDate + "0" + Month + "-" ;
    }

    if ( Day >= 10 ){
        CurrentDate = CurrentDate + Day ;
    } else{
        CurrentDate = CurrentDate + "0" + Day ;
    }

     if ( Hour >= 10 ){
        CurrentDate = CurrentDate + " " + Hour ;
    }else{
        CurrentDate = CurrentDate + " 0" + Hour ;
    }

    if ( Minute >= 10 ){
        CurrentDate = CurrentDate + ":" + Minute ;
    }else{
        CurrentDate = CurrentDate + ":0" + Minute ;
    }
    
	if ( Second >= 10 ){
        CurrentDate = CurrentDate + ":" + Second ;
    }else{
        CurrentDate = CurrentDate + ":0" + Second ;
    }	    

	if ( Millisecond >= 100 ){
        CurrentDate = CurrentDate + ":" + Millisecond ;
    }else if(Millisecond >= 10 ){
        CurrentDate = CurrentDate + ":0" + Millisecond ;
    }else{
        CurrentDate = CurrentDate + ":00" + Millisecond ;
    }	    
    return CurrentDate ;
} 	


/**
 * 将日期类型转换成字符串型格式 yyyy-MM-dd hh:mm:ss
 * @param	Date 
 * 
 * @return	string
 */
efc.util.formatTime = function( DateIn ){
    var Year = 0 ;
    var Month = 0 ;
    var Day = 0 ;
    var Hour = 0 ;
    var Minute = 0 ;
    var Second = 0 ;
    var Millisecond = 0;
    var CurrentDate = "" ;

    // 初始化时间
    Year       = DateIn . getFullYear ();
    Month      = DateIn . getMonth ()+ 1 ;
    Day        = DateIn . getDate ();
    Hour       = DateIn . getHours ();
    Minute     = DateIn . getMinutes ();
	Second     = DateIn . getSeconds ();
	Millisecond= DateIn . getMilliseconds();
	
    CurrentDate = Year + "-" ;

    if ( Month >= 10 ){
        CurrentDate = CurrentDate + Month + "-" ;
    } else {
        CurrentDate = CurrentDate + "0" + Month + "-" ;
    }

    if ( Day >= 10 ){
        CurrentDate = CurrentDate + Day ;
    } else{
        CurrentDate = CurrentDate + "0" + Day ;
    }

     if ( Hour >= 10 ){
        CurrentDate = CurrentDate + " " + Hour ;
    }else{
        CurrentDate = CurrentDate + " 0" + Hour ;
    }

    if ( Minute >= 10 ){
        CurrentDate = CurrentDate + Minute ;
    }else{
        CurrentDate = CurrentDate + Minute ;
    }
    
	if ( Second >= 10 ){
        CurrentDate = CurrentDate + Second ;
    }else{
        CurrentDate = CurrentDate + Second ;
    }	    

	if ( Millisecond >= 100 ){
        CurrentDate = CurrentDate + Millisecond ;
    }else if(Millisecond >= 10 ){
        CurrentDate = CurrentDate + "0" + Millisecond ;
    }else{
        CurrentDate = CurrentDate + "00" + Millisecond ;
    }	    
    return CurrentDate ;
}

/**
 * 日期型格式化
 */
efc.util.dateTimeFormat = function(v) {
	return v ? v.dateFormat('Y-m-d H:i:s') : '';
}

/**
 * 判断两个时间之间间隔
 * @param {} date1	date1与date2格式：yyyyMMddhhmmss 字符串类型yyyy-MM-dd hh:mm:ss
 * @param {} date2
 * @return {Number} 日期差(单位：秒)
 */
efc.util.getDatesDiff = function(date1,date2){
    if(date1 =="" || date2 =="")
		return 0;
	var y1=  date1.substr(0,4);
    var y2=  date2.substr(0,4);
    var m1 = date1.substr(5,2);
    var m2= date2.substr(5,2);
    var d1= date1.substr(8,2);
    var d2= date2.substr(8,2);

    var hour1 = date1.substr(11,2);
    var hour2 = date2.substr(11,2);
    var minute1 = date1.substr(14,2);
    var minute2 = date2.substr(14,2);
    var s1 = date1.substr(17,2);
    var s2 = date2.substr(17,2);
	
    temp1 = y1+"/"+m1+"/"+d1+" "+hour1+":"+minute1+":"+s1;
    temp2 = y2+"/"+m2+"/"+d2+" "+hour2+":"+minute2+":"+s2;
	
    var beginDate= new Date(temp1);
    var endDate = new Date(temp2);
    
    var date = endDate.getTime() - beginDate.getTime();
    var time = Math.floor(date/1000.0);
	
    return time;
}
/**
 * 判断当前时间与某一时间段的关系
 * @param {} beginTime 字符串类型hh:mm
 * @param {} endTime   字符串类型hh:mm
 * @return {Number} 0:在时间段内
				   -1：在时间段前
				    1：在时间段之后
				   -100:异常
 */
efc.util.checkTimeDuration = function(beginTime, endTime){
	var strb = beginTime.split(":");
    if(strb.length != 2){
    	return -100;
    }
    var stre = endTime.split(":");
    if(stre.length != 2){
    	return -100;
    }
    var b = new Date();
    var e = new Date();
    var n = new Date();
    
    n.setSeconds("00");
    
    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    b.setSeconds("00");

    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    e.setSeconds("00");
    if(n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0){
        return 0;
     }else if(n.getTime() - e.getTime()>0){
        return 1;
     }else if(n.getTime() - b.getTime()<0){
    	 return -1;
     }
     else{
    	 return -100;
     }
}

/**
 * 比较日期
 * @param {} endDate
 * @param {} startDate
 * @return {String} "1"--endDate>startDate; "0"--endDate=startDate; "-1"--endDate<startDate; "-2":error date format
 * @requires format: yyyy-MM-dd 1970-01-01 Feeling 2007-10-25
 */
efc.util.compareDate = function(endDate, startDate) {
	var arrayS,
		arrayE,
		s,
		e;

	if (startDate == null || efc.util.trim(startDate) == "") {
		startDate = new Date();
		var month = parseInt(startDate.getMonth()) + 1;
		s = new Date(startDate.getYear(), month, startDate.getDate());
	} else {
		arrayS = startDate.split("-");
		if (arrayS == null || arrayS.length != 3)
			return "-2";
		s = new Date(arrayS[0], arrayS[1], arrayS[2]);
	}

	arrayE = endDate.split("-");

	e = new Date(arrayE[0], arrayE[1], arrayE[2]);

	if (e.getTime() == s.getTime())
		return "0";
	if (e.getTime() > s.getTime())
		return "1";
	if (e.getTime() < s.getTime())
		return "-1";
}
/**
 * 比较时间大小
 * @param {} endTime
 * @param {} startTime
 * @return {} "1"--endTime>startTime;"0"--endTime=startTime;"-1"--endTime<startTime;
 * @requires format: hh:mm:ss 00:00:00 Feeling 18:23:46
 */
efc.util.compareTime = function(endTime, startTime) {
	var timeS = startTime.split(":");
	var timeE = endTime.split(":");
	var return_value = "-2";
	return_value = efc.util.compareNumber(timeE[0], timeS[0]);
	if (return_value == "0" && timeE.length == 3)
		return_value = efc.util.compareNumber(timeE[1], timeS[1]);
	if (return_value == "0" && timeE.length == 3)
		return_value = efc.util.compareNumber(timeE[2], timeS[2]);

	return return_value;
}
/**
 * 比较数字大小
 * @param {} num1
 * @param {} num2
 * @return {String} "1"--num1>num2;"0"--num1=num2;"-1"--num1<num2;
 */
efc.util.compareNumber = function(num1, num2) {
	if (parseInt(num1) > parseInt(num2))
		return "1";
	else if (parseInt(num1) == parseInt(num2))
		return "0";
	else if (parseInt(num1) < parseInt(num2))
		return "-1";
	else
		"-2";
}
/**
 * 比较日期时间大小
 * @param {} endTime
 * @param {} startTime
 * @return {String} "1"--endTime>startTime; "-1"--endTime<=startTime;
 */
efc.util.compareDateTime = function(endTime, startTime) {
	var et = endTime.split(" ");
	var edate = et[0];
	var etime = et[1];

	var st = startTime.split(" ");
	var sdate = st[0];
	var stime = st[1];

	if (efc.util.compareDate(edate, sdate) == 1) {
		return '1';
	} else if (efc.util.compareDate(edate, sdate) == 0) {
		if (efc.util.compareTime(etime, stime) == 1) {
			return '1';
		} else {
			return '-1';
		}
	} else {
		return '-1';
	}
}
/**
 * 获取时间 整型
 * @param {} date
 * @return {}
 */
efc.util.getTime = function(date) {

	if (date == null || date == "") {
		date = new Date();
		return date.getTime();
	}

	var dt = date.split(" ");
	var vdate = dt[0].split("-");
	var vtime = dt[1].split(":");
	var ndate = new Date(vdate[0], vdate[1] - 1, vdate[2], vtime[0], vtime[1], vtime[2]);
	return ndate.getTime();
}
/**
 * 比较日期和时间
 * @param {} endDate
 * @param {} startDate
 * @return {String}
 */
efc.util.compareDateAndTime = function(endDate, startDate) {

	var endTime = efc.util.getTime(endDate);
	var startTime = efc.util.getTime(startDate);
	if (endTime == startTime)
		return "0";
	if (endTime > startTime)
		return "1";
	if (endTime < startTime)
		return "-1";
}

/**
 * 检查字符串中是否存在空格
 * @param {} value
 * @return {Boolean}
 */
efc.util.checkSpace = function(value) {
	if (value.length == 0)
		return true;
	if (value.indexOf(' ') > -1)
		return false;
	return true;
}
/**
 * 检查按下的键值是否超过限制
 * @param {} e
 * @param {} type
 * @param {} maxValue
 * @param {} value
 * @return {Boolean}
 */
efc.util.checkMaxValue = function(e, type, maxValue, value) {
	var keycode;
	if (window.event) // IE
	{
		keycode = e.keyCode;
	} else if (e.which) // Netscape/Firefox/Opera
	{
		keycode = e.which;
		if (keycode == 8) {
			return true;
		}
	} else {
		return true;
	}
	if (type == "ten") {
		if (48 <= keycode && keycode <= 57) {
			if (maxValue.length > 0 && value.length > 0) {
				return efc.util.compareValue(maxValue, value);
			} else
				return true;
		}
	}
	if (type == "hex") {
		if ((48 <= keycode && keycode <= 57) || (65 <= keycode && keycode <= 70) || (97 <= keycode && keycode <= 102)) {
			return true;
		}
	}
	return false;
}

/**
 * 检查是否为手机号
 * @param {} str
 * @return {Boolean}
 */
efc.util.checkMobile = function(str) {
	var reg = new RegExp(/^(1)[3-9][0-9]{9}$/);
	if (!reg.test(str)) {
		efc.ext.msg(Ext.Msg.WARNING, TIP.WRONG_PHONE);
		return false;
	}
	return true;
}
/**
 * 检查是否为中文
 * @param {} value
 * @return {Boolean}
 */
efc.util.checkChinese = function(value) {
	if (value.match(/[^!-~]/g) == null) {
		return true;
	} else {
		return false;
	}
}

/**
 * sleep 
 * @param {} naptime 单位秒
 */
efc.util.sleep = function(naptime) {
	naptime = naptime * 1000;
	var sleeping = true;
	var now = new Date();
	var alarm;
	var startingMSeconds = now.getTime();
	var alarmMSeconds;
	while (sleeping) {
		alarm = new Date();
		alarmMSeconds = alarm.getTime();
		if (alarmMSeconds - startingMSeconds > naptime) {
			sleeping = false;
		}
	}
}
/**
 * 转换为Unicode格式
 * @param {} str
 * @return {}
 */
efc.util.toUnicode = function(str) {
	if (str == null)
		return null;
	var tmp;
	var resultStr = "";
	for (var i = 0; i < str.length; i++) {
		var temp = str.charCodeAt(i).toString(16);
		resultStr += "\\u" + new Array(5 - String(temp).length).join("0") + temp;
	}
	return resultStr;
}

/**
 * 添加一个cookie addCookie(name,value,expireHours)
 * @param {} name  键
 * @param {} value 值
 * @param {} expireHours 过期时间 单位小时
 */
efc.util.addCookie = function(name, value, expireHours) {
	var cookieString = name + "=" + escape(value);
	// 判断是否设置过期时间
	if (expireHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1000);
		cookieString = cookieString + "; expire=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

/**
 * 获取指定名称的cookie值：getCookie(name)，如果不存在则返回空
 * @param {} name	cookie键
 * @return {String} cookie值
 */
efc.util.getCookie = function(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name)
			return unescape(arr[1]);
	}
	return "";	
}

/**
 * 读取cookie值
 * @param {} name
 * @return {}
 */
efc.util.getCookieValue = function(name) {
	var cookie = efc.util.getCookie(name);
	return cookie == null || cookie == '' ? null : cookie.split(",");
}

/**
 * 删除指定名称的cookie：deleteCookie(name)
 * @param {} name
 */
efc.util.delCookie = function(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=v; expire=" + date.toGMTString();
}

/**
 * 删除所有超期的cookie：delCookies
 */
efc.util.delCookies = function() {
	var cookies = document.cookie;
	var cookie = null;
	for (cookie in cookies) {
		cookie.Expires = new Date();
	}
}

/**
 * 创建xmlhttp
 * @return {}
 */
efc.util.createXmlObj = function() {
	var xmlhttp = null;
	var xmlhttp = null;
	if (window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

efc.util.toXml = function(xmlData) {
	if (xmlData == null)
		return null;
	var xmlDoc;
	try {
		if (window.ActiveXObject) {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(xmlData);
		} else if (document.implementation && document.implementation.createDocument) {
			xmlDoc = document.implementation.createDocument('', '', null);
			xmlDoc.loadXML(xmlData);
		} else {
			xmlDoc = null;
		}
	} catch (e) {
		var oParser = new DOMParser();
		xmlDoc = oParser.parseFromString(xmlData, "text/xml");
	}
	return xmlDoc;
}

efc.util.rightClick = function() {
	return false;
}


/**
 * 
 * @param {} obj
 */
efc.util.toolon = function(obj) {
	if (obj.className != "disabled") {
		obj.className = "active";
	}
}

/**
 * 
 * @param {} obj
 */
efc.util.toolout = function(obj) {
	if (obj.className != "disabled") {
		obj.className = "normal";
	}
}

/**
 * 获取html元素的绝对坐标
 * @param {} oElement 元素ID
 * @return {}
 */
efc.util.findPosition = function(oElement) {
	var x2 = 0;
	var y2 = 0;
	var width = oElement.offsetWidth;
	var height = oElement.offsetHeight;
	if (typeof oElement.offsetParent != 'undefined') {
		var posY = 0
		for (var posX = 0; oElement; oElement = oElement.offsetParent) {
			posX = posX + oElement.offsetLeft;
			posY = posY + oElement.offsetTop;
		}
		x2 = posX + width;
		y2 = posY + height;
		return [posX, posY, x2, y2];
	} else {
		x2 = oElement.x + width;
		y2 = oElement.y + height;
		return [oElement.x, oElement.y, x2, y2];
	}
}

/**
 * 输入检验 匹配由数字、26个英文字母或者下划线组成的字符串
 * @param {} name
 * @return {Boolean}
 */
efc.util.limitNameInput = function(name) {
	var pattern = /^(\w|\s|[\u4E00-\u9FA5])*$/;
	if (pattern.test(name)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 输入检验 匹配由数字、26个英文字母或者下划线或者.组成的字符串
 * 
 * @param {} no
 * @return {Boolean}
 */
efc.util.limitNoInput = function(no) {
	var pattern = /^(\w|\s|\.|\-)*$/;
	if (pattern.test(no)) {
		return true;
	} else {
		return false;
	}
};

/**
 * 校验是否为IP地址
 * @param {} ipAddress
 * @return {Boolean}
 */
efc.util.checkIp = function(ipAddress) {
	if (ipAddress.length == 0) {
		return true;
	}
	var tokens = efc.util.trim(ipAddress).split(".");
	if (tokens.length < 4 || tokens.length > 4) {
		return false;
	}
	if (tokens[0] == 0) {
		return false;
	}
	for (var k = 0; k < 4; k++) {
		if (isNaN(tokens[k]) || (tokens[k].length == 0) || (tokens[k].length > 3) || tokens[k] > 255 || tokens[k] < 0) {
			return false;
		}
		if (tokens[k].length > 1 && tokens[k].indexOf("0") == 0) {
			return false;
		}
		if ((tokens[k].indexOf(" ") > -1)) {
			return false;
		}
	}
	return true;
}

/**
 * 在指定的元素后插入
 * @param {} obj
 */
efc.util.addRedStar = function(obj) {
	var font = document.createElement("font");
	font.setAttribute("color", "red");
	var redStar = document.createTextNode('*');
	font.appendChild(redStar);
	obj.el.dom.parentNode.appendChild(font);
}

/**
 * 对树进行排序
 * 
 * @param {} tree 当前树的名称
 * 
 */
efc.util.sorterTree = function(tree) {
	new Ext.tree.TreeSorter(tree, {
		folderSort : true,
		dir : "asc",
		sortType : function(node) {
			return node.attributes.text;
		}
	});
}

var WAIT_PROGRESS_BAR = null;
/**
 * wait对话框
 * @param {} waitMsg
 * @param {} barTitle
 */
efc.util.waitMsg = function(waitMsg, barTitle) {
	try {
		if (Ext.isEmpty(waitMsg))
			waitMsg = WAIT_MSG_TITLE;
		if (Ext.isEmpty(barTitle))
			barTitle = WAIT_MSG_BARTITLE;
		if (WAIT_PROGRESS_BAR == null) {
			WAIT_PROGRESS_BAR = Ext.Msg.wait(waitMsg, barTitle);
		}
		if (typeof(waitMsg) == "undefined") {
			waitMsg = WAIT_MSG_TITLE;
		}
	} catch (e) {

	}
}

/**
 * 隐藏wait对话框
 */
efc.util.waitMsg.hide = function() {
	try {
		if (WAIT_PROGRESS_BAR != null) {
			WAIT_PROGRESS_BAR.hide();
			WAIT_PROGRESS_BAR = null;
		}
	} catch (e) {

	}
};

/**
 * 获取文件大小
 * 
 * @param {} fileName
 * @return {}
 */
efc.util.getFileSize = function(fileName) {
	if (document.layers) {
		if (navigator.javaEnabled()) {
			var file = new java.io.File(fileName);
			if (location.protocol.toLowerCase() != 'file:')
				netscape.security.PrivilegeManager.enablePrivilege('UniversalFileRead');
			return file.length();
		} else
			return -1;
	} else if (document.all) {
		window.oldOnError = window.onerror;
		window.onerror = function(err) {
			if (err.indexOf('utomation') != -1) {
				efc.ext.msg(Ext.Msg.WARNING, 'file access not possible');
				return true;
			} else
				return false;
		};
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var file = fso.GetFile(fileName);
		window.onerror = window.oldOnError;
		return file.Size;
	}
};

/**
 * 是否包含不可用的字符
 * 
 * @param {} str
 * @return {} {isInclude:boolean ,//是否包含 chars:''}//不可用的字符串
 */
efc.util.isIncludeUnusedChar = function(str) {
	str = efc.util.trim(str);
	var retValue = false;
	var cStr = "";
	for (var i = 0; i < ASCII_UN_USE.length; i++) {
		var s = String.fromCharCode(parseInt(ASCII_UN_USE[i]));
		if (str.indexOf(s) > -1) {
			retValue = true;
			cStr += s + " ";
		}
	}
	if (str.indexOf("“") > -1) {// || ){
		retValue = true;
		cStr += "“" + " ";
	}
	if (str.indexOf("”") > -1) {
		retValue = true;
		cStr += "”" + " ";
	}
	var obj = {};
	obj.isInclude = retValue;
	obj.chars = cStr;
	return obj;
};

/**
 * 提交错误
 * @param {} failureType
 * @param {} message
 */
efc.util.failureSubmit = function(failureType, message) {
	switch (failureType) {
		case Ext.form.Action.CLIENT_INVALID :
			efc.ext.msg(Ext.Msg.ERROR, '无有效参数');
			break;
		case Ext.form.Action.CONNECT_FAILURE :
			efc.ext.msg(Ext.Msg.ERROR, TIP.WEBSERVER_ERR);
			break;
		case Ext.form.Action.SERVER_INVALID :
			efc.ext.msg(Ext.Msg.ERROR, message);
	}
}

efc.util.scriptIdList = new Array();// 动态加载js使用
efc.util.winScriptIdList = new Array();// 动态加载js使用,关于window方式弹出加载的

/**
 * 动态加载JS
 * @param {} jsId
 * @param {} jsPath
 * @param {} callBack
 */
efc.util.addScript = function(jsId, jsPath, callBack) {
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.id = jsId;
	oScript.src = jsPath;
	oScript.onload = oScript.onreadystatechange = function() {
		oScript.onload = oScript.onreadystatechange = null;
		delete oScript;
		delete oHead;
		callBack.call(null);
	}
	oHead.appendChild(oScript);
}

/**
 * 批量加载JS
 * 
 * @param {} jsArray js文件path数组
 * @param {} isWin 	 是否通过window方式弹出加载
 */
efc.util.addScripts = function(jsArray, isWin, callBack) {
	isWin = isWin == null ? false : true;
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var idBefore = "script_";
	var scriptIndex = 0;
	if (isWin)
		idBefore = idBefore + "win_"
	function loadScript() {
		if (scriptIndex >= jsArray.length) {
			delete oHead;
			return;
		}
		var jsId;
		if (isWin) {
			jsId = idBefore + efc.util.winScriptIdList.length
			efc.util.winScriptIdList.push(jsId);
		} else {
			jsId = idBefore + efc.util.scriptIdList.length
			efc.util.scriptIdList.push(jsId);
		}
		efc.util.addScript(jsId, jsArray[scriptIndex], function() {
			scriptIndex++;
			loadScript();
		})
	}
	loadScript();

	// ScriptMgr.load({
	// scripts : jsArray,
	// callback : function() {
	// AssetManageList.ready()
	// }
	// });
}


/**
 * Ext内置内存释放，防止因Ext而导致的内存泄露
 */
efc.util.ExtCleanCache = function() {
	if (Ext.isIE) {
		var t = {};
		for (eid in Ext.elCache) {
			delete Ext.elCache[eid];
		}
		Ext.clean(Ext.elCache);
		setTimeout("CollectGarbage();", 1);
	}
}

/**
 * Ext内置内存释放，针对动态加载的js的释放。
 * @param {} isWin 是否通过window方式弹出加载
 * @param {} isCleanCache 是否释放 默认释放
 */
efc.util.removeMemory = function(isWin, isCleanCache) {
	isWin = isWin == null ? false : isWin;
	isCleanCache = isCleanCache == null ? true : isCleanCache;
	for (var i = 0; i < efc.util.winScriptIdList.length; i++) {
		var script;
		while (script = document.getElementById(efc.util.winScriptIdList[i])) {
			script.parentNode.removeChild(script);
		}
		script = null;
		delete script;
	}
	efc.util.winScriptIdList = null;
	efc.util.winScriptIdList = new Array();
	if (!isWin) {
		for (var i = 0; i < efc.util.scriptIdList.length; i++) {
			var script;
			while (script = document.getElementById(efc.util.scriptIdList[i])) {
				script.parentNode.removeChild(script);
			}
			script = null;
			delete script;
		}
		efc.util.scriptIdList = null;
		efc.util.scriptIdList = new Array();
	}
	if (isCleanCache)
		efc.util.ExtCleanCache();
}

/**
 * grid自适应使用
 * 
 * @param {} grid
 * @param {} width
 * @param {} height
 */
efc.util.resizeGrid = function(grid, width, height) {
	var sss = grid.getGridEl();
	var domHeight = sss.dom.style.height.replace("px", "") - 25;
	if (domHeight < 0) {
		return;
	}
	sss.dom.childNodes[0].style.height = "100%";
	sss.dom.style.width = "100%";
	sss.dom.childNodes[0].style.width = "100%";
	sss.dom.childNodes[0].childNodes[0].style.width = "100%";
	sss.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.width = "100%";
	sss.dom.childNodes[0].childNodes[0].childNodes[1].style.width = "100%";
	sss.dom.childNodes[0].childNodes[0].childNodes[1].style.height = sss.dom.style.height.replace("px", "") - 25;
}

/**
 * 判断一个文件名的扩展名是否在一个扩展名数组中
 * @param {} extArray 扩展名数组
 * @param {} fileName 文件名
 * @return {Boolean}
 */
efc.util.checkFileExtName = function(extArray, fileName) {
	if (!extArray || extArray.length == 0) {
		return false;
	}
	var index = fileName.lastIndexOf(".");
	if (index == -1) {
		return false;
	}
	var extName = fileName.substring(index);
	extName = efc.util.trim(extName.toLowerCase());
	for (var i = 0; i < extArray.length; i++) {
		var e = efc.util.trim(extArray[i].toLowerCase());
		if (e == extName) {
			return true;
		}
	}
	return false;
}

efc.util.pad = function() {  
  var tbl = [];  
  return function(num, n) {  
    var len = n-num.toString().length;  
    if (len <= 0) return num;  
    if (!tbl[len]) tbl[len] = (new Array(len+1)).join('0');  
    return tbl[len] + num;  
  }  
}(); 
//-------------------------------------------------------------------------------------------
var isIE = (document.all) ? true : false;

var $ = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var BindAsEventListener = function(object, fun) {
	return function(event) {
		return fun.call(object, (event || window.event));
	}
}

var CurrentStyle = function(element){
	return element.currentStyle || document.defaultView.getComputedStyle(element, null);
}

function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};

var Drag = Class.create();
Drag.prototype = {
	//拖放对象
 	initialize: function(drag, options) {
	    this.Drag = $(drag);//拖放对象
	    this._x = this._y = 0;//记录鼠标相对拖放对象的位置
	    this._marginLeft = this._marginTop = 0;//记录margin
	    //事件对象(用于绑定移除事件)
	    this._fM = BindAsEventListener(this, this.Move);
	    this._fS = Bind(this, this.Stop);
	    
	    this.SetOptions(options);
	    
	    this.Limit = !!this.options.Limit;
	    this.mxLeft = parseInt(this.options.mxLeft);
	    this.mxRight = parseInt(this.options.mxRight);
	    this.mxTop = parseInt(this.options.mxTop);
	    this.mxBottom = parseInt(this.options.mxBottom);
	    
	    this.LockX = !!this.options.LockX;
	    this.LockY = !!this.options.LockY;
	    this.Lock = !!this.options.Lock;
	    
	    this.onStart = this.options.onStart;
	    this.onMove = this.options.onMove;
	    this.onStop = this.options.onStop;
	    
	    this._Handle = $(this.options.Handle) || this.Drag;
	    this._mxContainer = $(this.options.mxContainer) || null;
	    
	    this.Drag.style.position = "absolute";
	    //透明
	    if(isIE && !!this.options.Transparent){
	        //填充拖放对象
	        with(this._Handle.appendChild(document.createElement("div")).style){
	            width = height = "100%"; backgroundColor = "#fff"; filter = "alpha(opacity:0)"; fontSize = 0;
	        }
	    }
	    //修正范围
	    this.Repair();
	    addEventHandler(this._Handle, "mousedown", BindAsEventListener(this, this.Start));
	},
	//设置默认属性
	SetOptions: function(options) {
	    this.options = {//默认值
	        Handle:            "",//设置触发对象（不设置则使用拖放对象）
	        Limit:            false,//是否设置范围限制(为true时下面参数有用,可以是负数)
	        mxLeft:            0,//左边限制
	        mxRight:        9999,//右边限制
	        mxTop:            0,//上边限制
	        mxBottom:        9999,//下边限制
	        mxContainer:    "",//指定限制在容器内
	        LockX:            false,//是否锁定水平方向拖放
	        LockY:            false,//是否锁定垂直方向拖放
	        Lock:            false,//是否锁定
	        Transparent:    false,//是否透明
	        onStart:        function(){},//开始移动时执行
	        onMove:            function(){},//移动时执行
	        onStop:            function(){}//结束移动时执行
	    };
	    Extend(this.options, options || {});
	},
	//准备拖动
	Start: function(oEvent) {
	    if(this.Lock){ return; }
	    this.Repair();
	    //记录鼠标相对拖放对象的位置
	    this._x = oEvent.clientX - this.Drag.offsetLeft;
	    this._y = oEvent.clientY - this.Drag.offsetTop;
	    //记录margin
	    this._marginLeft = parseInt(CurrentStyle(this.Drag).marginLeft) || 0;
	    this._marginTop = parseInt(CurrentStyle(this.Drag).marginTop) || 0;
	    //mousemove时移动 mouseup时停止
	    addEventHandler(document, "mousemove", this._fM);
	    addEventHandler(document, "mouseup", this._fS);
	    if(isIE){
	        //焦点丢失
	        addEventHandler(this._Handle, "losecapture", this._fS);
	        //设置鼠标捕获
	        this._Handle.setCapture();
	    }else{
	        //焦点丢失
	        addEventHandler(window, "blur", this._fS);
	        //阻止默认动作
	        oEvent.preventDefault();
	    };
	    //附加程序
	    this.onStart();
  	},
  	//修正范围
  	Repair: function() {
	    if(this.Limit){
	        //修正错误范围参数
	        this.mxRight = Math.max(this.mxRight, this.mxLeft + this.Drag.offsetWidth);
	        this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.Drag.offsetHeight);
	        //如果有容器必须设置position为relative来相对定位，并在获取offset之前设置
	        !this._mxContainer || CurrentStyle(this._mxContainer).position == "relative" || (this._mxContainer.style.position = "relative");
	    }
 	},
  	//拖动
  	Move: function(oEvent) {
	    //判断是否锁定
	    if(this.Lock){ this.Stop(); return; };
	    //清除选择
	    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	    //设置移动参数
	    var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY - this._y;
	    //设置范围限制
	    if(this.Limit){
	        //设置范围参数
	        var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
	        //如果设置了容器，再修正范围参数
	        if(!!this._mxContainer){
	            mxLeft = Math.max(mxLeft, 0);
	            mxTop = Math.max(mxTop, 0);
	            mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
	            mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight);
	        };
	        //修正移动参数
	        iLeft = Math.max(Math.min(iLeft, mxRight - this.Drag.offsetWidth), mxLeft);
	        iTop = Math.max(Math.min(iTop, mxBottom - this.Drag.offsetHeight), mxTop);
	    }
	    //设置位置，并修正margin
	    if(!this.LockX){ this.Drag.style.left = iLeft - this._marginLeft + "px"; }
	    if(!this.LockY){ this.Drag.style.top = iTop - this._marginTop + "px"; }
	    //附加程序
	    this.onMove();
  	},
  	//停止拖动
  	Stop: function() {
	    //移除事件
	    removeEventHandler(document, "mousemove", this._fM);
	    removeEventHandler(document, "mouseup", this._fS);
	    if(isIE){
	        removeEventHandler(this._Handle, "losecapture", this._fS);
	        this._Handle.releaseCapture();
	    }else{
	        removeEventHandler(window, "blur", this._fS);
	    };
	    //附加程序
	    this.onStop();
  	}
};
//--------------------------------------------------------------------------------------------

var LazyLoad = function(elems, options) {
	//初始化程序
	this._initialize(elems, options);
	//如果没有元素就退出
	if ( this.isFinish() ) return;
	//初始化模式设置
	this._initMode();
	//进行第一次触发
	this.resize(true);
};

LazyLoad.prototype = {
 	//初始化程序
 	_initialize: function(elems, options) {
		this._elems = elems;//加载元素集合
		this._rect = {};//容器位置参数对象
		this._range = {};//加载范围参数对象
		this._loadData = null;//加载程序
		this._timer = null;//定时器
		this._lock = false;//延时锁定
		//静态使用属性
		this._index = 0;//记录索引
		this._direction = 0;//记录方向
		this._lastScroll = { "left": 0, "top": 0 };//记录滚动值
		this._setElems = function(){};//重置元素集合程序
		
		var opt = this._setOptions(options);
		
		this.delay = opt.delay;
		this.threshold = opt.threshold;
		this.beforeLoad = opt.beforeLoad;
		
		this._onLoadData = opt.onLoadData;
		this._container = this._initContainer($$(this.options.container));//容器
  	},
  	//设置默认属性
  	_setOptions: function(options) {
	    this.options = {//默认值
			container:	window,//容器
			mode:		"dynamic",//模式
			threshold:	0,//加载范围阈值
			delay:		100,//延时时间
			beforeLoad:	function(){},//加载前执行
			onLoadData:	function(){}//显示加载数据
	    };
	    return $$.extend(this.options, options || {});
  	},
  	//初始化容器设置
  	_initContainer: function(container) {
		var doc = document,
			isWindow = container == window || container == doc
				|| !container.tagName || (/^(?:body|html)$/i).test( container.tagName );
		if ( isWindow ) {
			container = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
		}
		//定义执行方法
		var oThis = this, width = 0, height = 0;
		this.load = $$F.bind( this._load, this );
		this.resize = $$F.bind( this._resize, this );
		this.delayLoad = function() { oThis._delay( oThis.load ); };
		this.delayResize = function(){//防止重复触发bug
			var clientWidth = container.clientWidth,
				clientHeight = container.clientHeight;
			if( clientWidth != width || clientHeight != height ) {
				width = clientWidth; height = clientHeight;
				oThis._delay( oThis.resize );
			}
		};
		//记录绑定元素方便移除
		this._binder = isWindow ? window : container;
		//绑定事件
		$$E.addEvent( this._binder, "scroll", this.delayLoad );
		isWindow && $$E.addEvent( this._binder, "resize", this.delayResize );
		//获取容器位置参数函数
		this._getContainerRect = isWindow && ( "innerHeight" in window )
			? function(){ return {
					"left":	0, "right":	window.innerWidth,
					"top":	0, "bottom":window.innerHeight
				}}
			: function(){ return oThis._getRect(container); }	;
		//设置获取scroll值函数
		this._getScroll = isWindow
			? function() { return {
					"left": $$D.getScrollLeft(), "top": $$D.getScrollTop()
				}}
			: function() { return {
					"left": container.scrollLeft, "top": container.scrollTop
				}};
		return container;
  	},
  	//初始化模式设置
  	_initMode: function() {
		switch ( this.options.mode.toLowerCase() ) {
			case "vertical" ://垂直方向
				this._initStatic( "vertical", "vertical" );
				break;
			case "horizontal" ://水平方向
				this._initStatic( "horizontal", "horizontal" );
				break;
			case "cross" :
			case "cross-vertical" ://垂直正交方向
				this._initStatic( "cross", "vertical" );
				break;
			case "cross-horizontal" ://水平正交方向
				this._initStatic( "cross", "horizontal" );
				break;
			case "dynamic" ://动态加载
			default :
				this._loadData = this._loadDynamic;
		}
  	},
  	//初始化静态加载设置
  	_initStatic: function(mode, direction) {
		//设置模式
		var isVertical = direction == "vertical";
		if ( mode == "cross" ) {
			this._crossDirection = $$F.bind( this._getCrossDirection, this,
				isVertical ? "_verticalDirection" : "_horizontalDirection",
				isVertical ? "_horizontalDirection" : "_verticalDirection" );
		}
		//设置元素
		var pos = isVertical ? "top" : "left",
			sortFunction = function( x, y ) { return x._rect[ pos ] - y._rect[ pos ]; },
			getRect = function( elem ) { elem._rect = this._getRect(elem); return elem; };
		this._setElems = function() {//转换数组并排序
			this._elems = $$A.map( this._elems, getRect, this ).sort( sortFunction );
		};
		//设置加载函数
		this._loadData = $$F.bind( this._loadStatic, this,
			"_" + mode + "Direction",
			$$F.bind( this._outofRange, this, mode, "_" + direction + "BeforeRange" ),
			$$F.bind( this._outofRange, this, mode, "_" + direction + "AfterRange" ) );
  	},
  	//延时程序
  	_delay: function(run) {
		clearTimeout(this._timer);
		if ( this.isFinish() ) return;
		var oThis = this, delay = this.delay;
		if ( this._lock ) {//防止连续触发
			this._timer = setTimeout( function(){ oThis._delay(run); }, delay );
		} else {
			this._lock = true; run();
			setTimeout( function(){ oThis._lock = false; }, delay );
		}
  	},
  	//重置范围参数并加载数据
 	 _resize: function(change) {
		if ( this.isFinish() ) return;
		this._rect = this._getContainerRect();
		//位置改变的话需要重置元素位置
		if ( change ) { this._setElems(); }
		this._load(true);
  	},
  	//加载程序
  	_load: function(force) {
		if ( this.isFinish() ) return;
		var rect = this._rect, scroll = this._getScroll(),
			left = scroll.left, top = scroll.top,
			threshold = Math.max( 0, this.threshold | 0 );
		//记录原始加载范围参数
		this._range = {
			top:	rect.top + top - threshold,
			bottom:	rect.bottom + top + threshold,
			left:	rect.left + left - threshold,
			right:	rect.right + left + threshold
		}
		//加载数据
		this.beforeLoad();
		this._loadData(force);
  	},
  	//动态加载程序
  	_loadDynamic: function() {
		this._elems = $$A.filter( this._elems, function( elem ) {
				return !this._insideRange( elem );
			}, this );
  	},
  	//静态加载程序
  	_loadStatic: function(direction, beforeRange, afterRange, force) {
		//获取方向
		direction = this[ direction ]( force );
		if ( !direction ) return;
		//根据方向历遍图片对象
		var elems = this._elems, i = this._index,
			begin = [], middle = [], end = [];
		if ( direction > 0 ) {//向后滚动
			begin = elems.slice( 0, i );
			for ( var len = elems.length ; i < len; i++ ) {
				if ( afterRange( middle, elems[i] ) ) {
					end = elems.slice( i + 1 ); break;
				}
			}
			i = begin.length + middle.length - 1;
		} else {//向前滚动
			end = elems.slice( i + 1 );
			for ( ; i >= 0; i-- ) {
				if ( beforeRange( middle, elems[i] ) ) {
					begin = elems.slice( 0, i ); break;
				}
			}
			middle.reverse();
		}
		this._index = Math.max( 0, i );
		this._elems = begin.concat( middle, end );
  	},
  	//垂直和水平滚动方向获取程序
  	_verticalDirection: function(force) {
	  	return this._getDirection( force, "top" );
  	}, 
  	_horizontalDirection: function(force) {
	  	return this._getDirection( force, "left" );
  	},
  	//滚动方向获取程序
  	_getDirection: function(force, scroll) {
		var now = this._getScroll()[ scroll ], _scroll = this._lastScroll;
		if ( force ) { _scroll[ scroll ] = now; this._index = 0; return 1; }
		var old = _scroll[ scroll ]; _scroll[ scroll ] = now;
		return now - old;
  	},
  	//cross滚动方向获取程序
 	_getCrossDirection: function(primary, secondary, force) {
		var direction;
		if ( !force ) {
			direction = this[ primary ]();
			secondary = this[ secondary ]();
			if ( !direction && !secondary ) {//无滚动
				return 0;
			} else if ( !direction ) {//次方向滚动
				if ( this._direction ) {
					direction = -this._direction;//用上一次的相反方向
				} else {
					force = true;//没有记录过方向
				}
			} else if ( secondary && direction * this._direction >= 0 ) {
				force = true;//同时滚动并且方向跟上一次滚动相同
			}
		}
		if ( force ) {
			this._lastScroll = this._getScroll(); this._index = 0; direction = 1;
		}
		return ( this._direction = direction );
  	},
  	//判断是否加载范围内
  	_insideRange: function(elem, mode) {
		var range = this._range, rect = elem._rect || this._getRect(elem),
			insideH = rect.right >= range.left && rect.left <= range.right,
			insideV = rect.bottom >= range.top && rect.top <= range.bottom,
			inside = {
					"horizontal":	insideH,
					"vertical":		insideV,
					"cross":		insideH && insideV
				}[ mode || "cross" ];
		//在加载范围内加载数据
		if ( inside ) { this._onLoadData(elem); }
		return inside;
  	},
  	//判断是否超过加载范围
  	_outofRange: function(mode, compare, middle, elem) {
		if ( !this._insideRange( elem, mode ) ) {
			middle.push(elem);
			return this[ compare ]( elem._rect );
		}
 	},
	_horizontalBeforeRange: function(rect) { return rect.right < this._range.left; },
	_horizontalAfterRange: function(rect) { return rect.left > this._range.right; },
	_verticalBeforeRange: function(rect) { return rect.bottom < this._range.top; },
	_verticalAfterRange: function(rect) { return rect.top > this._range.bottom; },
  	//获取位置参数
  	_getRect: function(node) {
		var n = node, left = 0, top = 0;
		while (n) { left += n.offsetLeft; top += n.offsetTop; n = n.offsetParent; };
		return {
			"left": left, "right": left + node.offsetWidth,
			"top": top, "bottom": top + node.offsetHeight
		};
  	},
  	//是否完成加载
  	isFinish: function() {
		if ( !this._elems || !this._elems.length ) {
			this.dispose(); return true;
		} else {
			return false;
		}
  	},
  	//销毁程序
  	dispose: function(load) {
		clearTimeout(this._timer);
		if ( this._elems || this._binder ) {
			//加载全部元素
			if ( load && this._elems ) {
				$$A.forEach( this._elems, this._onLoadData, this );
			}
			//清除关联
			$$E.removeEvent( this._binder, "scroll", this.delayLoad );
			$$E.removeEvent( this._binder, "resize", this.delayResize );
			this._elems = this._binder = null;
		}
  	}
}

//--------------------------------------------------------------------------------------------
