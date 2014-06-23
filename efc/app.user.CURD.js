Ext.ns("App.Users.CURD");   
/**  
 * ExtJs 组件化编程 实例
 * 一个组件一个JS文件,多个组件拼接成一个模块,这些组件都放在一个文件夹下,命名方法其实很简单,类似java如: 
 *	在App文件夹下的Scene文件夹内 

 */  
App.Users.CURD = Ext.extend(Ext.Panel,{   
	//属性代码全部写在这里   
	title:"CURD",   
	//初始化组件(如果你的组件需要改变样式或者需要动它的dom,你可以重写父类的onRender,并把部分视图代码放在onRender函数中)   
	initComponent:function(){   
		App.Users.CURD.superclass.initComponent.call(this,arguments);   
	    //先定义自定义事件(如果必要的话)   
	       
	    //接着视图代码全部写在这里   
	  
	},   
	//方法函数全部写在这里   
	//先将与后台数据交互的函数写出来   
	addUser : function() {   
		//对应后台同名的Action方法函数
	},   
	delUser : function() {   
	    //对应后台同名的Action方法函数
	},   
	updateUser : function() {   
	    //对应后台同名的Action方法函数   
	},   
    //供自己内部使用的函数跟在后面   
	formClear : function() {   
		//
	},   
    //提供给外部调用的函数紧跟数据操作   
	getSelectUsers : function(){   
        //return ......   
    },
	setXXXX : function() {
		
    },   
    //最后就是事件处理函数,因为函数比较多,事件处理往往伴随着页面逻辑,放在后面比较好找....混在中间不太好找   
	onSubmit : function() {   
		
	},
	onDlet : function() {   
		
	}   
});   
  
//*因为是基于UI的组件,因此一般都可以独立测试,测试通过后注释掉即可(注意我的注释写法)   
Ext.onReady(function(){
	//.........   
});   
//*/  
