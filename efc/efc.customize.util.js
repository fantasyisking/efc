/**
 * 定制公共业务JS
 * @version 1.0.1
 * @author lishenying
 * @since 2012-08-08
 * @description 公共的业务功能持续添加到这里
 */
Ext.ns('efc', 'efc.customize', 'efc.customize.util');

efc.Cutil = efc.customize.util;

efc.Cutil = function(){
	var version = '0.0.1';
	var author = 'lishenying';
	var since = '2012-08-08';
	
	this.addEvents("onIsWork");
	this.addEvents('onGetOndutyInfo');
	this.addEvents('onDeletePictures');
	this.addEvents('onGetFolderInfo');
};
// 从事件对象继承，使对象可发布消息
Ext.extend(efc.Cutil, Ext.util.Observable);

//
efc.Cutil.workManRoleId = ['10000082'];		// 动态检车员
efc.Cutil.workZzRoleId  = ['10000083'];		// 组长
efc.Cutil.workGzRoleId  = ['10000084'];		// 工长
efc.Cutil.ondutyRoleId  = ['10000084'];		// 值班员（工长作为值班员）
efc.Cutil.workManagerRoleId = ['10000084'];	// 系统管理员、管理员
efc.Cutil.workManagerRoleIdForNode = ['10000078', '10000080', '10000083', '10000084'];	// 系统管理员、管理员、工长、组长(针对单探测站)

//
efc.Cutil.workMode = 'single'	// 作业模式  single 单探测站模式  multi 多探测站模式
efc.Cutil.noPicureUseImage = '/teds/resource/image/nopicture.jpg'; //'/teds/resource/image/o_loading.gif';	// 未获取正常图片时使用的图片
efc.Cutil.waitUseImage = '/teds/resource/image/o_loading.gif';	// 等待图片时使用的图片
efc.Cutil.retrieveUseImage = '/teds/resource/image/retrieveUseImage2.jpg';	// 等待图片时使用的图片
efc.Cutil.cursorsWait = 'wait';//'url(/teds/resource/image/wait.cur)';		// 等待时鼠标样式
efc.Cutil.cursorsDefault = 'default';//'url(/teds/resource/image/wait.cur)';		// 等待时鼠标样式
efc.Cutil.maxPicCount = 66		// 设置部位最大图片数，用于生成图片位置标识

//efc.Cutil.imageHSpace = 3		// 图片间横向间隔像素
//efc.Cutil.imageVSpace = 3		// 图片间纵向间隔像素
efc.Cutil.scrollSpace = 17		// 滚动条宽度像素
efc.Cutil.historySpace = -6		// 历史图片查看间隔时间 月份

efc.Cutil.screenWidth = 1366	// 浏览区域的最大宽度
efc.Cutil.screenHeight = 768	// 浏览区域的最大高度

efc.Cutil.browseHeightOccupy = 190 // 图片浏览区域被占用高度 

efc.Cutil.QueryMode = '1' // 查询选项 日期查询模式  1 按照过车日期  2 按照当班日期

/**
 * 设置探测站配置，作为全局变量使用
 * @param {} roleid
 * @return {Boolean}
 */
efc.Cutil.initStatinConfig = function(record){
	efc.Cutil.local_path = record.data.local_path;			// 图片存储本地目录
	efc.Cutil.virtual_path = record.data.virtual_path;		// 图片存储虚拟目录
	efc.Cutil.image_load_mode = record.data.image_load_mode;// 图片加载模式
	efc.Cutil.singleview_mode = record.data.singleview_mode;// 单张图片放大处理模式
	efc.Cutil.work_mode = record.data.work_mode;			// 作业模式 01 普通作业 02 集中作业
	efc.Cutil.image_mode = record.data.image_mode;			// 图片处理模式 remote 远端处理 server 服务器处理
	
	efc.Cutil.imageQuality = record.data.image_quality;			// 图像处理后质量
	efc.Cutil.suffix = '.' + record.data.image_format;			// 图片后缀
	efc.Cutil.imageFactWidth  = record.data.factimage_width;	// 图片实际宽度
	efc.Cutil.imageFactHeight = record.data.factimage_height;	// 图片实际高度
	efc.Cutil.thumbimage_width  = record.data.thumbimage_width;	// 图片缩放宽度
	efc.Cutil.thumbimage_height = record.data.thumbimage_height;// 图片缩放高度
	
	efc.Cutil.orignalimage_mode = '0'	// 原图处理方式	0 不做任何处理(抓拍程序已经处理)， 1 需要旋转处理  (内部维护项目)
};

/**
 * 设置个人定制配置
 */
efc.Cutil.initUserConfig = function(ds_user_configure){
	if (ds_user_configure.getCount() < 1){
		efc.Cutil.brightness = '1';			// 图片明亮度
		efc.Cutil.contrast   = '1';			// 图片对比度
		efc.Cutil.partZoomScale = 3			// 局部放大初始放大倍数
		efc.Cutil.imageLayout = 'height'		// 图像浏览布局模式
		efc.Cutil.isShowImageFlag = true;	// 是否显示图像位置标识
		efc.Cutil.isShowSelectState = true;	// 是否启用图像选中状态
		efc.Cutil.showSelectState_style = 'solid';	// 选中图片样式
		efc.Cutil.showSelectState_color = 'red';	// 选中图片颜色
		efc.Cutil.showSelectState_space = '1';		// 选中图片框宽度
		efc.Cutil.showBrowseTime = true	// 是否显示加载时间
		efc.Cutil.faultImageZoom = 1.5	// 故障浏览 默认缩放倍数
		efc.Cutil.imageSpace = 1.5		// CSS table "border-spacing"
		
		efc.Cutil.selectImageStyle = efc.Cutil.showSelectState_space + "px " + efc.Cutil.showSelectState_style + " #000000";	// 选中图片时，图片边框样式
		efc.Cutil.selectImageColor = efc.Cutil.showSelectState_color;				// 选中图片时，图片边框颜色
		efc.Cutil.unselectImageStyle = "0px solid #000000"	// 取消选中图片时，图片边框样式
		
		efc.Cutil.imageLoadedMode = '2'; //图片加载模式 1 全部加载 2 按需加载
		efc.Cutil.threshold = 100; //图片加载模式 1 全部加载 2 按需加载
		
		efc.Cutil.imageViewWidth  = 608	// 单张图片浏览宽度
		efc.Cutil.imageViewHeight = 890	// 单张图片浏览高度
		
		efc.Cutil.browseWidth = 0;
		efc.Cutil.browseHeight = 0;
		
		efc.Cutil.autoScrollInterval = 200;
		efc.Cutil.autoScrollSpace = 50;
	}else{
		var record = ds_user_configure.getAt(0);
		
		efc.Cutil.brightness = record.data.brightness || '1';		// 图片明亮度
		efc.Cutil.contrast   = record.data.contrast || '1';			// 图片对比度
		efc.Cutil.partZoomScale = record.data.partzoomscale || 3;	// 局部放大初始放大倍数
		efc.Cutil.imageLayout = record.data.imagelayout || 'height';		// 图像浏览布局模式
		efc.Cutil.isShowImageFlag = (record.data.showimageflag == '1') ? true : false;		// 是否显示图像位置标识
		efc.Cutil.isShowSelectState = (record.data.showselectstate == '1') ? true : false;	// 是否启用图像选中状态
		efc.Cutil.showSelectState_style = record.data.showselectstate_style;	// 选中图片样式
		efc.Cutil.showSelectState_color = record.data.showselectstate_color;	// 选中图片颜色
		efc.Cutil.showSelectState_space = record.data.showselectstate_space;	// 选中图片颜色
		efc.Cutil.showBrowseTime = (record.data.showbrowsetime == '1') ? true : false;	// 是否显示加载时间
		efc.Cutil.faultImageZoom = Ext.isEmpty(record.data.faultimagezoom) ? 1.5 : parseFloat(record.data.faultimagezoom);	// 故障浏览 默认缩放倍数
		efc.Cutil.imageSpace = Ext.isEmpty(record.data.imagespace) ? 1 : parseFloat(record.data.imagespace);		// CSS table "border-spacing"
		
		efc.Cutil.selectImageStyle = record.data.showselectstate_space + "px " + efc.Cutil.showSelectState_style + " #000000";	// 选中图片时，图片边框样式
		efc.Cutil.selectImageColor = efc.Cutil.showSelectState_color;				// 选中图片时，图片边框颜色
		efc.Cutil.unselectImageStyle = "0px solid #000000"	// 取消选中图片时，图片边框样式
		
		efc.Cutil.imageHSpace = efc.Cutil.imageSpace == 0 ? 0 : efc.Cutil.imageSpace*2		// 图片间横向间隔像素
		efc.Cutil.imageVSpace = efc.Cutil.imageSpace == 0 ? 0 : efc.Cutil.imageSpace*2		// 图片间纵向间隔像素
		
		efc.Cutil.imageLoadedMode = Ext.isEmpty(record.data.imageloadedmode) ? '2' : record.data.imageloadedmode; //图片加载模式 1 全部加载 2 按需加载
		efc.Cutil.threshold = Ext.isEmpty(record.data.threshold) ? 100 : parseInt(record.data.threshold); //图片延迟加载的范围阀值
		
		efc.Cutil.imageViewWidth  = Ext.isEmpty(record.data.imageviewwidth) ? 608 : parseInt(record.data.imageviewwidth)	// 单张图片浏览宽度
		efc.Cutil.imageViewHeight = Ext.isEmpty(record.data.imageviewheight) ? 890 : parseInt(record.data.imageviewheight)	// 单张图片浏览高度
		
		efc.Cutil.browseWidth = Ext.isEmpty(record.data.browsewidth) ? 0 : parseInt(record.data.browsewidth);
		efc.Cutil.browseHeight = Ext.isEmpty(record.data.browseheight) ? 0 : parseInt(record.data.browseheight);
		
		efc.Cutil.autoScrollInterval = Ext.isEmpty(record.data.autoscrollinterval) ? 200 : parseInt(record.data.autoscrollinterval);
		efc.Cutil.autoScrollSpace = Ext.isEmpty(record.data.autoscrollspace) ? 50 : parseInt(record.data.autoscrollspace);
	}
}

/**
 * 检查是否是值班员
 * @param {} roleid
 * @return {Boolean}
 */
efc.Cutil.isOndutyMan = function(roleid){
	if (!efc.util.isInArray(roleid, efc.Cutil.ondutyRoleId))
		return false;
	else
		return true;
};

/**
 * 检查是否是业务管理员(业务功能系统使用上的管理员，针对所有探测站)
 * @param {} roleid		人员角色
 * @param {} userType	人员类型
 * @param {} allNode	探测站类型 true : 多探测站；false : 单探测站
 * @return {Boolean}
 */
efc.Cutil.isWorkManager = function(roleid, userType, allNode){
	var workMode = efc.Cutil.workMode;
	// 如果没有传入allNode  默认为单探测站
	workMode = Ext.isEmpty(allNode) ? workMode : (allNode ? workMode = 'multi' : workMode = 'single');
	// 多探测站集中作业 组长不是管理员
	var managerArray = (workMode == 'multi') ? efc.Cutil.workManagerRoleId : efc.Cutil.workManagerRoleIdForNode;
	
	if (efc.util.isInArray(roleid, efc.Cutil.workManagerRoleId) || (userType == '2' || userType == '3'))
		return true;
	else
		return false;
};

/**
 * 检查是否是动态检车员
 * @param {} roleid
 * @return {Boolean}
 */
efc.Cutil.isWorkMan = function(roleid, userType){
	if (!Ext.isEmpty(userType)){
		if  (userType == '2' || userType == '3') {
			return false;
		}
	}
	
	if (!efc.util.isInArray(roleid, efc.Cutil.workManRoleId))
		return false;
	else
		return true;
};

/**
 * 根据图像部位获取图像横纵类型(需要调整)
 * @param {} partid
 * @return {String}  1 纵向   2 横向
 */
efc.Cutil.getImageType = function(partid){
	if (Ext.isEmpty(partid)) return '2'
	
	return '2';
	
	//
	if (partid == 'zdl1' || partid == 'zdl2')
		return '1';
	else
		return '2';
};

/**
 * 获取图片自动识别故障的BOX值
 * @param {} x1
 * @param {} x2
 * @param {} y1
 * @param {} y2
 * @param {} stdscale
 */
efc.Cutil.getFaultSingleBox = function(x1, x2, y1, y2, stdscale, imageSize, imgPosition, pic_layout){
	
	var box = {left : 0, top : 0, width : 0, height : 0};
	
	box.left = parseInt(x1)*stdscale;
	
	if (imgPosition > pic_layout.column_count){
		box.top = parseInt(y1)*stdscale + imageSize.height;
	}else{
		box.top = parseInt(y1)*stdscale;
	}
	
	box.width = parseInt(x2)*stdscale - parseInt(x1)*stdscale;
	box.height = parseInt(y2)*stdscale - parseInt(y1)*stdscale;
	
	return box;
}

/**
 * 获取作业人员所属小组 返回当班信息对象
 */
efc.Cutil.getWorkManTeamInfo = function(workman, onduty_code, team){
	var workManTeamInfo = {};
	Ext.Ajax.request({
		url : '/teds/base/base.do?reqCode=queryWorkManTeam',
		success : function(response, opts) {
			var resultArray = Ext.util.JSON.decode(response.responseText);

			if (resultArray.length > 0){
				if (resultArray[0].sys_code == null) resultArray[0].sys_code = ''
				if (resultArray[0].onduty_code == null) resultArray[0].onduty_code = ''
				if (resultArray[0].work_man == null) resultArray[0].work_man = ''
				if (resultArray[0].man_role == null) resultArray[0].man_role = ''
				if (resultArray[0].dept_code == null) resultArray[0].dept_code = ''
				if (resultArray[0].team == null) resultArray[0].team = ''
				if (resultArray[0].work_seq == null) resultArray[0].work_seq = ''
				
				workManTeamInfo.sys_code = resultArray[0].sys_code;
				workManTeamInfo.onduty_code = resultArray[0].onduty_code;
				workManTeamInfo.work_man = resultArray[0].work_man;
				workManTeamInfo.man_role = resultArray[0].man_role;
				workManTeamInfo.dept_code = resultArray[0].dept_code;
				workManTeamInfo.team = resultArray[0].team;
				workManTeamInfo.work_seq = resultArray[0].work_seq;
			}
			team = resultArray[0].team;
			return workManTeamInfo;
		},
		failure : function(response, opts) {
			return {};
		},
		params : {
			work_man : workman,
			onduty_code : onduty_code
		}
	});	
};

Ext.apply(efc.Cutil.prototype, {
	/**
	 * 检查是否具备浏览车辆权限
	 * @param {} as_cc_code		车次流水号
	 * @param {} as_ch_code		车辆流水号
	 * @param {} al_jhws		机后位数
	 * @param {} as_part		浏览部位
	 * @param {} as_role		角色
	 * @param {} as_team		作业组
	 * @param {} as_bc			班次
	 * @param {} as_user		工作者
	 * @param {} as_ondutycode	当班流水号
	 * @return {Boolean}
	 */
	isWorkTrain : function (as_cc_code, as_ch_code, al_jhws, as_part, as_role, as_usertype, as_team, as_bc, as_user, as_ondutycode, cb) {
		var scope = this;
		
		// 普通作业模式
		if (efc.Cutil.work_mode == '01'){
			scope.fireEvent('onIsWork', true);
			return true
		}
		
		// 集中作业模式 工长可以查看所有;组长可以查看分配到本小组;检车员可以查看分配给自己的段位
		// 管理员 工长
		if (efc.Cutil.isWorkManager(as_role, as_usertype)){
			scope.fireEvent('onIsWork', true);
			return true
		}
		
		// 组长
		if (efc.util.isInArray(as_role, efc.Cutil.workZzRoleId)) {
			Ext.Ajax.request({
				url : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_WorkTrainForTeam',
				params : {
					cc_sys_code : as_cc_code,
					team : as_team,
					bz : as_bc
				},
				success : function(response) {
					var resultArray = Ext.util.JSON.decode(response.responseText);
	
					if (resultArray.count > 0){
						scope.fireEvent('onIsWork', true);
						return true
					}else{
						scope.fireEvent('onIsWork', false);
						return false
					}
				},
				failure : function(response) {
					efc.ext.alert("提示", "获取查询权限失败！");
					scope.fireEvent('onIsWork', false);
					return false
				}
			});
		}
	
		// 动态检车员
		if (efc.Cutil.isWorkMan(as_role)) {
			Ext.Ajax.request({
				url : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_WorkVehicleSect',
				params : {
					cc_sys_code : as_cc_code,
					workman : as_user,
					onduty_code : as_ondutycode
				},
				success : function(response) {
					var resultArray = Ext.util.JSON.decode(response.responseText);
	
					if (al_jhws < resultArray.start_ws || al_jhws > resultArray.end_ws) {
						efc.ext.alert("提示", "指定的车辆不在您的浏览范围内！");
						scope.fireEvent('onIsWork', false);
						return false
					}
	
					// 不对浏览部位进行检查
					if (as_part == '') {
						scope.fireEvent('onIsWork', true);
						return true
					}
	
					if (resultArray.workpart.indexOf('所有') > 0){
						scope.fireEvent('onIsWork', true);
						return true
					}
	
					// 检查 是否具有浏览部件的权限
					Ext.Ajax.request({
						url : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_WorkPart',
						params : {
							workpart : resultArray.workpart
						},
						success : function(response) { // 回调函数有1个参数
							var resultArray1 = Ext.util.JSON.decode(response.responseText);
	
							if (resultArray1.workpart_detail_code.indexOf(as_part) < 0) {
								efc.ext.alert("提示", "您没有被分配该部件的浏览权限,无法进行浏览！");
								scope.fireEvent('onIsWork', true);
								return true
							} else{
								scope.fireEvent('onIsWork', false);
								return false
							}
						},
						failure : function(response) {
							efc.ext.alert("提示", "获取浏览部件明细失败！");
							scope.fireEvent('onIsWork', false);
							return false
						}
					});
				},
				failure : function(response) {
					efc.ext.alert("提示", "获取查询权限失败！");
					scope.fireEvent('onIsWork', false);
					return false
				}
			});
		}
		return true;
	},
	/**
	 * 获取当班信息 返回当班信息对象
	 */
	getOndutyInfo : function(){
		var ondutyInfo = {};
		var scope = this;
		
		Ext.Ajax.request({
			url : '/teds/base/base.do?reqCode=queryOnduyInfo',
			success : function(response, opts) {
				var resultArray = Ext.util.JSON.decode(response.responseText);
	
				if (resultArray.length > 0){
					if (resultArray[0].sys_pk == null) resultArray[0].sys_pk = ''
					if (resultArray[0].onduty_date == null) resultArray[0].onduty_date = ''
					if (resultArray[0].byb == null) resultArray[0].byb = ''
					if (resultArray[0].bz == null) resultArray[0].bz = ''
					if (resultArray[0].onduty_man == null) resultArray[0].onduty_man = ''
					
					ondutyInfo.onduty_code = resultArray[0].sys_pk;
					ondutyInfo.onduty_date = resultArray[0].onduty_date;
					ondutyInfo.byb = resultArray[0].byb;
					ondutyInfo.bz = resultArray[0].bz;
					ondutyInfo.onduty_man = resultArray[0].onduty_man;
					
					scope.fireEvent('onGetOndutyInfo', ondutyInfo);
				}
			},
			failure : function(response, opts) {
				ondutyInfo = {};
				scope.fireEvent('onGetOndutyInfo', ondutyInfo);
			}
		});	
	},
	/**
	 * 清除缓存图片
	 * @param {} folder
	 */ 
	deleteCachePictures : function (folder) {
		var picSet = '&srcfolder=' + folder;
		Ext.Ajax.request({
			url : '/teds/mod_python/tfdsImageDelete.py/handler?' + picSet,
			disableCaching : true,
			scope : this,
			success : function(response) {
				if (response.responseText == "0"){
					efc.ext.alert("提示", "清除缓存图片失败，请手动删除！");						
				}
				this.fireEvent('onDeletePictures');
			},
			failure : function(response) {
				efc.ext.alert("提示", "清除缓存图片失败，请手动删除！");
				this.fireEvent('onDeletePictures');
			}	
		});	
	},
	/**
	 * 获取图片缓存信息
	 * @param {} folder
	 */ 
	getFolderInfo : function(folder){
		var picSet = '&srcfolder=' + folder;
		Ext.Ajax.request({
			url : '/teds/mod_python/tfdsImagesInfo.py/handler?' + picSet,
			disableCaching : true,
			scope : this,
			success : function(response) {
				var foldersize, fildercount;
				if (response.responseText == "-1;-1"){
					efc.ext.alert("提示", "获取图片缓存信息失败！");
					foldersize = '-1';
					fildercount = '-1';
				}else{
					foldersize = response.responseText.split(';')[0];
					fildercount = response.responseText.split(';')[1];
				}
				
				this.fireEvent('onGetFolderInfo', foldersize, fildercount);
			},
			failure : function(response) {
				efc.ext.alert("提示", "获取图片缓存信息失败！");
				this.fireEvent('onGetFolderInfo', '-1', '-1');
			}	
		});
	}
})

/**
 * 转换图片 故障图片的路径
 * @param {} picName		图片文件名
 * @param {} path_folder	指定车次保存的本地目录
 * @param {} show_folder	指定车次保存的web目录
 * @param {} local_path		系统保存图片目录
 * @param {} remote_path	系统保存图片的tomcat设置local_path对应的虚拟目录
 * @param {} userid			用户ID
 * @param {} cc_sys_code	车次流水号
 * @return {}
 */
efc.Cutil.transImagePath = function(picName, path_folder, show_folder, local_path, remote_path, userid, cc_sys_code, mode, pbrightness, pcontrast){
	var imagePathObject = {};
	var pic_adjust = '';
	
	// 图片原始本地路径
	var picLocalSource = path_folder + '\\' + picName;
	// 图片原始web路径
	var picVirtualSource = show_folder + '/' + picName;
	
	if (mode == 'set'){
		// 图片处理后本地路径
		var picLocalTrans = local_path + '\\' + userid + '\\' + picName.substr(0, picName.length - 4) + new Date().pattern("hhmmss") + efc.Cutil.suffix;
		// 图片处理后web路径
		var picVirtualTrans = remote_path + "/" + userid + "/" + picName.substr(0, picName.length - 4) + new Date().pattern("hhmmss") + efc.Cutil.suffix;
	}else{
		if (!Ext.isEmpty(pbrightness) || !Ext.isEmpty(pcontrast)){
			pic_adjust = 'B' + (pbrightness||'') + 'C' + (pcontrast||'');
		}
		
		// 图片处理后本地路径
		var picLocalTrans = local_path + '\\' + userid + '\\' + pic_adjust + picName;
		// 图片处理后web路径
		var picVirtualTrans = remote_path + "/" + userid + "/" + pic_adjust + picName;
		
		// 历史图片处理后本地路径
		var picHistoryLocalTrans = local_path + '\\' + userid + '\\' + cc_sys_code + '_' + picName;
		// 历史图片处理后web路径
		var picHistoryVirtualTrans = remote_path + "/" + userid + "/" + cc_sys_code + '_' + picName;
	}
	
	// 图片临时故障本地路径
	var picLocalFaultTrans = local_path + '\\' + userid + '\\temp_' + picName;
	// 图片临时故障web路径
	var picVirtualFaultTrans = remote_path + "/" + userid + "/temp_" + picName;
	
	imagePathObject.picLocalSource = picLocalSource;
	imagePathObject.picVirtualSource = picVirtualSource;
	imagePathObject.picLocalTrans = picLocalTrans;
	imagePathObject.picVirtualTrans = picVirtualTrans;
	imagePathObject.picLocalFaultTrans = picLocalFaultTrans;
	imagePathObject.picVirtualFaultTrans = picVirtualFaultTrans;
	
	imagePathObject.picHistoryLocalTrans = picHistoryLocalTrans;
	imagePathObject.picHistoryVirtualTrans = picHistoryVirtualTrans;
	
	
	if (!Ext.isEmpty(cc_sys_code)){
		var picVirtualSourceSplit = picVirtualSource.split('/');
		
		// 故障图片web路径
		//var picVirtualFaultSave = picVirtualSource.replace('/' + cc_sys_code.substr(0, 6) + '/', '/gz_picture/');
		var picVirtualFaultSave = picVirtualSource.replace('/' + picVirtualSourceSplit[2] + '/', '/gz_picture/');
		// 故障图片本地路径
		var picLocalFaultSave = picVirtualFaultSave.replace(remote_path, local_path);	//F:/N39F01F01/gz_picture/121229000031/PIC1_0001.jpg
		picLocalFaultSave = picLocalFaultSave.replace('/', '\\');
		
		imagePathObject.picVirtualFaultSave = picVirtualFaultSave;
		imagePathObject.picLocalFaultSave = picLocalFaultSave;
	}else{
		imagePathObject.picVirtualFaultSave = '';
		imagePathObject.picLocalFaultSave = '';
	}
	
	return imagePathObject;
}

/**
 * 获取当前车辆浏览部位的图片布局
 * @param {} part_code
 * @param {} dw
 * @param {} dz
 * @param {} cm
 */
efc.Cutil.getPicLayout = function(part_code, dw, dz, cm){
	var layout = {row_count  : 0, column_count : 0};
	switch (part_code){
		case 'qb1':
			layout = {row_count  : 1, column_count : cm};
			return layout;
			break;
		case 'qb2':
			layout = {row_count  : 1, column_count : cm};
			return layout;
			break;
		case 'cx1':
			layout = {row_count  : 1, column_count : cm};
			return layout;
			break;
		case 'cx2':
			layout = {row_count  : 1, column_count : cm};
			return layout;
			break;
		case 'db':
			layout = {row_count  : 1, column_count : dz};
			return layout;
			break;
		case 'cz1':
			layout = {row_count  : 2, column_count : dw};
			return layout;
			break;
		case 'cz2':
			layout = {row_count  : 2, column_count : dw};
			return layout;
			break;
		default:
			return layout;
			break;
	}
	return layout;
}

/**
 * 获取整车浏览部位所包含的部位
 * @param {} part_code
 * @return {String}
 */
efc.Cutil.getAllPartCode = function(part_code){
	switch (part_code){
		case 'bottom_all':
			return 'cg_jc,cgcm_jc,cg,cgcm,zdl1,zdl2,zjb1,zjb2,';
			break;
		case 'cm_all':
			return 'zxj1,zxj2,cmzjb1,cmzjb2,';
			break;
		default:
			return part_code;
			break;
	}
	return '';
}


efc.Cutil.getHistoryPicPosition = function(part_code, currPicNum, cm, md, wz, cm1, md1, wz1){
	var historyPosition = null;
	switch (part_code){
		case 'qb1':
			historyPosition = currPicNum - cm + 1 + cm1 - 1;
			return historyPosition;
			break;
		case 'qb2':
			historyPosition = currPicNum - cm + 1 + cm1 - 1;
			return historyPosition;
			break;
		case 'cx1':
			historyPosition = currPicNum - cm + 1 + cm1 - 1;
			return historyPosition;
			break;
		case 'cx2':
			historyPosition = currPicNum - cm + 1 + cm1 - 1;
			return historyPosition;
			break;
		case 'db':
			historyPosition = currPicNum - md + 1 + md1 - 1;
			return historyPosition;
			break;
		case 'cz1':
			historyPosition = currPicNum - wz + 1 + wz1 - 1;
			return historyPosition;
			break;
		case 'cz2':
			historyPosition = currPicNum - wz + 1 + wz1 - 1;
			return historyPosition;
			break;
		default:
			return historyPosition;
			break;
	}
	return layout;
}


/**
 * 转换整车浏览下 各图片在单部件浏览下的位置
 * @param {} part_code
 * @param {} part_code_all
 * @param {} picPosition
 * @return {}
 */
efc.Cutil.getPartPosition = function(part_code, part_code_all, picPosition){
	switch (part_code_all){
		case 'bottom_all':
			switch (part_code){
				case 'cg_jc':
					if (picPosition >= 4 && picPosition <= 6)
						return 19 + picPosition;
					if (picPosition >= 7 && picPosition <= 9)
						return 38 + picPosition;
					return picPosition;
				case 'zdl1':
					if (picPosition >= 1 && picPosition <= 2)
						return 3 + picPosition;
					if (picPosition >= 3 && picPosition <= 4)
						return 23 + picPosition;
					if (picPosition >= 5 && picPosition <= 6)
						return 43 + picPosition;
					return picPosition;
				case 'zjb1':
					if (picPosition >= 1 && picPosition <= 6)
						return 5 + picPosition;
					if (picPosition >= 7 && picPosition <= 12)
						return 21 + picPosition;
					if (picPosition >= 13 && picPosition <= 18)
						return 37 + picPosition;
					return picPosition;
				case 'zjb2':
					if (picPosition >= 1 && picPosition <= 6)
						return 11 + picPosition;
					if (picPosition >= 7 && picPosition <= 12)
						return 27 + picPosition;
					if (picPosition >= 13 && picPosition <= 18)
						return 43 + picPosition;
					return picPosition;
				case 'zdl2':
					if (picPosition >= 1 && picPosition <= 2)
						return 17 + picPosition;
					if (picPosition >= 3 && picPosition <= 4)
						return 37 + picPosition;
					if (picPosition >= 5 && picPosition <= 6)
						return 57 + picPosition;
					return picPosition;
				case 'cg':
					if (picPosition >= 1 && picPosition <= 3)
						return 19 + picPosition;
					if (picPosition >= 4 && picPosition <= 6)
						return 38 + picPosition;
					if (picPosition >= 7 && picPosition <= 9)
						return 57 + picPosition;
				default:
					return picPosition;
					break;
			}
			break;
		case 'cm_all':
			switch (part_code){
				case 'zxj1':
					if (picPosition >= 1 && picPosition <= 3)
						return picPosition;
					if (picPosition >= 4 && picPosition <= 6)
						return 15 + picPosition;
					return picPosition;
				case 'cmzjb1':
					if (picPosition >= 1 && picPosition <= 6)
						return 3 + picPosition;
					if (picPosition >= 7 && picPosition <= 8)
						return 15 + picPosition;
					return picPosition;
				case 'cmzjb2':
					if (picPosition >= 1 && picPosition <= 6)
						return 9 + picPosition;
					if (picPosition >= 7 && picPosition <= 12)
						return 21 + picPosition;
					return picPosition;
				case 'zxj2':
					if (picPosition >= 1 && picPosition <= 3)
						return 15 + picPosition;
					if (picPosition >= 4 && picPosition <= 6)
						return 30 + picPosition;
					return picPosition;
				default:
					return picPosition;
					break;
			}
			return picPosition;
			break;
		default:
			return picPosition;
			break;
	}
}

/**
 * 故障选择窗口
 * @class efc.Cutil.WindowFault
 * @extends efc.ux.Window
 */
efc.Cutil.WindowFault = Ext.extend(efc.ux.Window, {
	width : 350, // 窗口宽度
	height : 500, // 窗口高度
	collapsible : false, // 是否可收缩
	maximizable : false, // 设置是否可以最大化
	border : false, // 边框线设置
	constrain : true, // 设置窗口是否可以溢出父容器
	resizable : false,
	closable : false, // 是否可关闭
	modal : true,
	closeAction : 'hide',
	
	initComponent:function() {
		var scope = this;
		
		var grid_commfault = new efc.ux.Grid({
			stripeRows : true,
			columnLines : true,
			autoScroll : true,
			storeUrl : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_CommFault',
			fields : [{name : 'gzdm'}, {name : 'gzmc'}, {name : 'use_count'}, {name : 'czcx'}, {name : 'part_code'}, {name : 'col_name'}],
			cms : [{header : '<center>故障名称</center>', 		width : 236, dataIndex : 'gzmc', align : 'left'}],
			border : false,
			frame : false,
			isNo : true,
			isSm : true,
			isPage : false,
			isEdit : false,
			isSelected : true,
			isFixScroll : false,
			isGroupStore : false
		});
			
		var grid_customfault = new efc.ux.Grid({
			stripeRows : true,
			columnLines : true,
			autoScroll : true,
			storeUrl : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_CustomFault',
			fields : [{name : 'gzdm'}, {name : 'gzmc'}, {name : 'user_name'}],
			cms : [	
				{header : '<center>故障名称</center>', 		width : 230, dataIndex : 'gzmc', align : 'left'},
				{header : '编辑人', 		width : 70, dataIndex : 'user_name', align : 'center'}
			],
			border : false,
			frame : false,
			isNo : true,
			isSm : true,
			isPage : false,
			isEdit : false,
			isSelected : true,
			isFixScroll : false,
			isGroupStore : false
		});
			
		var root_std = new Ext.tree.AsyncTreeNode({
			id : '00',
			text : '标准故障',
			expanded : true
		});
			
		// 定义一个树面板
		var tree_stdfault = new efc.ux.TreePanel({
			loader : new Ext.tree.TreeLoader({
				baseParams : {
					equip_id : ''
				}/*,
				dataUrl : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_StdFaultTree'*/
			}),
			region : 'center',
			useArrows : false,
			root : root_std,
			autoScroll : true,
			border : false,
			animate : false
		});
			
		// 绑定节点单击事件
		tree_stdfault.on("click", function(node, e) {
			if (node.id == '00') {
				return
			} else {
				grid_stdfault.retrieve({
					params : {equip_id : node.id},
					retrieveType : '1'
				});
			}
		});
		//
		var grid_stdfault = new efc.ux.Grid({
			region : 'south',
			stripeRows : true,
			columnLines : true,
			autoScroll : true,
			height : 138,
			storeUrl : '/teds/teds/dynamicwork/trainwork.do?reqCode=act_Sel_StdFault',
			fields : [{name : 'gzdm'}, {name : 'gzmc'}, {name : 'equip_id'}, {name : 'fault_no'}, {name : 'pinyin_code'}],
			cms : [{header : '<center>故障名称</center>', width : 280,	dataIndex : 'gzmc',		align : 'left'}],
			border : true,
			frame : false,
			isNo : true,
			isSm : true,
			isPage : false,
			isEdit : false,
			isSelected : true,
			isFixScroll : false,
			isGroupStore : false
		});
			
		grid_commfault.on('rowdblclick', function(){
			var record = grid_commfault.getRow();
			this.fireEvent('onSetFault', record.data.gzdm, record.data.gzmc);
		}, this);
		grid_customfault.on('rowdblclick', function(){
			var record = grid_customfault.getRow();
			this.fireEvent('onSetFault', record.data.gzdm, record.data.gzmc);
		}, this);
		grid_stdfault.on('rowdblclick', function(){
			var record = grid_stdfault.getRow();
			this.fireEvent('onSetFault', record.data.gzdm, record.data.gzmc);
		}, this);
			
		/**
		 * 故障录入 中部
		 */
		var panel_stdfault = new efc.ux.Panel({
			layout : 'border',
			border : false,
			labelAlign : 'right',
			items : [tree_stdfault, grid_stdfault]
		})
			
		//
		var tablepanel_fault = new Ext.TabPanel({
		    id : 'tab_fault',
			region : 'center',
			split : true,
			defaults:{layout:'fit'},
			activeItem:0,
			tbar : [{
				style : 'padding: 0 0 0 5', // top right bottom left
				text : '故障检索：',
				xtype : 'label'
			}, {
				id : 'fault_input',
				xtype : 'textfield',
				maxLength : 15,
				enableKeyEvents : true,
				scope : this,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							var text = field.getValue();
							scope.retrievePinyin(text);
						}
					}
				},
				anchor : '100%'
			}, '-', {
				text : '关闭',
				iconCls : 'tbar_synchronizeIcon',
				scope : this,
				handler : function() {
					this.onClose();
				}
			}],
			items: [{
			     title:'常用故障'
			    ,id:'tab_comm'
			    ,items : [grid_commfault]
			},/*{
			     title:'标准故障'
			    ,id:'tab_std'
			    ,items : [panel_stdfault]
			},*/{
			     title:'自定义故障'
			    ,id:'tab_custom'
		        ,items : [grid_customfault]
		   }]
		});
			
		grid_commfault.retrieve({retrieveType : '1'});
			
		grid_customfault.retrieve({
			params : {
				user_name : efc.Cutil.isWorkMan(isa_RoleId) ? username : ''
			},
			retrieveType : '1'
		});

		var config = {
			layout : 'border',
    		items : [tablepanel_fault]
    	};
    	
    	Ext.apply(this, Ext.apply(this.initialConfig, config));
    	
		efc.Cutil.WindowFault.superclass.initComponent.apply(this, arguments);
		
		this.addEvents('onSetFault');
		
		this.tablepanel_fault = tablepanel_fault;
		this.grid_stdfault = grid_stdfault;
	},
    onRender:function() {
        efc.Cutil.WindowFault.superclass.onRender.apply(this, arguments);
    },
    retrievePinyin : function(text){
		if (text == null)
			return
			
		for (var i =0; i<15;i++){
			text = text.replace(/[\s]/, '%')
		}
		
		if (text.substr(0, 1) != '%')
			text = '%' + text
		if (efc.util.rsubstring(text, 1) != '%')
			text = text + '%'
		
		/*this.tablepanel_fault.setActiveTab('tab_std');
			
		this.grid_stdfault.retrieve({
			params : {pinyin_code : text},
			retrieveType : '1'
		});*/
    },
    initRetrieve : function(text){
    	Ext.getCmp('fault_input').setValue(text);
    	if (Ext.isEmpty(text)){
    		this.grid_stdfault.getStore().removeAll();
    		return;
    	}
    	this.retrievePinyin(text);
    }
})

efc.Cutil.FullScreen = function(){
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
    window.fullScreenApi = fullScreenApi;
}

