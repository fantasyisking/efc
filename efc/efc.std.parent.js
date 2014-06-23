/**
 * ExtJs customize Component for Efc.
 * @version 0.0.1
 * @author lishenying
 * @since 2012-08-08
 */
Ext.namespace('efc', 'efc.std', 'efc.std.parent');

/**
 * 基类
 * @return {}
 * @author lishenying
 * @since 2012-08-08
 */
efc.std.parent.Base = function(){
	var version = '0.0.1';
	var author = 'lishenying';
	var since = '2012-08-08';
	
	return {
		getVersion : function (){
			return version;
		},
		getNewRowFlag : function(){
			return '<span style="color:red;font-weight:700;">新增</span>';
		}
	}
};

/**
 * 扩展GridPanel
 * 
 * 		<p><h1>默认配置</h1></p>
 *		<div>frame : true,</div>
 *		<div>autoScroll : true,</div>
 *		<div>region : 'center',</div>
 *		<div>stripeRows : true,</div>
 *		<div>columnLines : true,</div>
 *		<div>loadMask : {msg : '正在加载表格数据,请稍等...'},</div>
 *		<div>plugins : [],  //根据isEdit 自动配置 如果需要其它插件自行配置</div>
 *		 
 * @param		  storeUrl	store 中的url
 * @param		  fields	store 中对象映射的数据库字段数组
 * @param		  cms   	cm
 * @param		  isNo		是否在columnModel 中加入序号
 * @param		  isSm 		有次配置项则在 columnsModel 中加入sm, true 表示单行选择模式
 * @param		  isPage 	是否分页
 * @param		  isEdit	是否可以行编辑
 * 
 * @class Ext.Efc.Grid
 * @extends Ext.grid.GridPanel
 * @author lishenying
 * @since 2012-08-16
 */
efc.std.parent.Grid = Ext.extend(parent.Ext.grid.GridPanel, {
    border:false,
    frame : true,
	autoScroll : true,
	region : 'center',
	stripeRows : true,
	columnLines : true,
	loadMask : {msg : '正在加载表格数据,请稍等...'},
	
	isLoaded : false,
	pagesize : null,
	Records : null,
	isSelected : true,
	isGroupStore : true,
	groupField : null,
		
    initComponent:function() {
        Ext.apply(this, new efc.std.parent.Base());

        var config = this.initConfig();
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.configCmp(config);
		
        efc.std.parent.Grid.superclass.initComponent.call(this);
        
        this.store.on('beforeload', this.retrieveStart);
		this.store.on('load', this.retrieveEnd);
		
    },
    onRender:function() {
        efc.std.parent.Grid.superclass.onRender.apply(this, arguments);
    },
	initConfig : function(options){
		var config = {
			
		}
		return config;
	},  
	/**
	 *
      使用metaData自动配置, metaData 一般情况下: 分页为 {totalProperty : 'TOTALCOUNT',root : 'ROOT'} 不分页为 {}
      fields 对应 Recored对象映射的数据库对象数组
    	[
		    {name: 'firstname'},                  // 映射了Record的"firstname" 字段为行对象的同名键名称 
		    {name: 'job', mapping: 'occupation'}  // 映射了"job"字段为行对象的"occupation"键
		]
	 * @param {} options
	 */
	initStore : function(options){
		this.Records = parent.Ext.data.Record.create(this.fields);
		var group = this.groupField;
	    var metaData = {};
	    if (!parent.Ext.isEmpty(this.isPage) && this.isPage) {
	    	metaData = {totalProperty : 'TOTALCOUNT', root : 'ROOT'};
		}
	    
		if (this.isGroupStore){
			this.store = new parent.Ext.data.GroupingStore({
				proxy : new parent.Ext.data.HttpProxy({url : this.storeUrl || ''}),
				reader : new parent.Ext.data.JsonReader(metaData, this.Records),
				groupField : this.groupField,
				sortInfo : this.sortInfo
			});
			this.view =  new parent.Ext.grid.GroupingView({
							enableGroupingMenu : true, // 是否在表头菜单中进行分组控制，默认为true
							groupByText : "使用当前字段进行分组", // 表头菜单中分组控制的菜单文字，默认为'Group
							enableNoGroups : true, // 是否允许用户关闭分组功能，默认为true
							showGroupsText : "表格分组", // 在表头菜单中启用分组和禁用分组的菜单文字，默认为'Show
							enableGrouping : true, // 是否对数据分组，默认为true
							hideGroupedColumn : false, // 是否隐藏分组列，默认为false
							showGroupName : true, // 是否在分组行上显示分组字段的名字，默认为true
							startCollapsed : false, // 初次显示时分组是否处于收缩状态，默认为false
							groupTextTpl : "{text} (共 {[values.rs.length]} 条)"
						});
		}else{
		    this.store = new parent.Ext.data.Store({
				proxy : new parent.Ext.data.HttpProxy({url : this.storeUrl || ''}),
				reader : new parent.Ext.data.JsonReader(metaData, this.Records)
			});
		}
	},
	initColumns : function () {
		grid = this;
		// 配置CM
		this.columns = this.cms || [];
		
		// 新增行图片标识 
		if (!parent.Ext.isEmpty(this.isEdit) && this.isEdit){
			var imgColumn = {
				header : '',
				dataIndex : 'is_insert',
				width : 30,
				align : 'left',
				renderer : function(value, cellMetaData, record) {
								var is_insert = record.data.is_insert;
								value  = value || '';
								if (is_insert == grid.getNewRowFlag()) {
									return "<a href='javascript:void(0);'><img src='" + webContext
											+ "/resource/image/ext/add.png'/></a>";
								}
								return value;
							}
			};
			
			this.columns = [imgColumn].concat(this.columns);
		}		
		
		// 复选框
		if (!parent.Ext.isEmpty(this.isSm) && this.isSm == true){
			sm = new parent.Ext.grid.CheckboxSelectionModel({singleSelect : this.isSm});
			this.columns = [sm].concat(this.columns);
		}
		// 行号
		if (!parent.Ext.isEmpty(this.isNo) && this.isNo){
			rownum = new parent.Ext.grid.RowNumberer({header : '序号', width : 35})
			this.columns = [rownum].concat(this.columns);
		}
	},
	initPlugins : function(options){
		// 配置 plugins
		this.plugins = this.plugins || [];
		
		if (!parent.Ext.isEmpty(options.plugins)){
			this.plugins = options.plugins;
		}
		
		if (!parent.Ext.isEmpty(this.isEdit) && this.isEdit){
			this.editor = new parent.Ext.ux.grid.RowEditor({
				clicksToEdit : options.clicksToEdit || 2,
				saveText : '保存',
				cancelText : '取消',
				errorText : '错误',
				commitChangesText : '数据已经修改，请保存或者取消'
		    });
			
			this.editor.isDirty = function(){
		        var dirty;
		        this.items.each(function(f){
		            if(( String(this.values[f.id]) !== String(f.getValue()) ) && String(f.getValue())!== 'null'){
		            	dirty = true;
		                return false;
		            }
		        }, this);
		        return dirty;
		    };
			this.editor.isAdd = false;
			this.plugins.push(this.editor);
		}
	},
	initBbar : function(options){
		// 配置分页bbar
		if (!parent.Ext.isEmpty(this.isPage) && this.isPage){
			// 每页显示条数下拉选择框
			var pagesize_combo = new parent.Ext.form.ComboBox({
						name : 'pagesize',
						triggerAction : 'all',
						mode : 'local',
						store : new parent.Ext.data.ArrayStore({
									fields : ['value', 'text'],
									data : [[10, '10条/页'], [20, '20条/页'],
											[50, '50条/页'], [100, '100条/页'],
											[250, '250条/页'], [500, '500条/页']]
								}),
						valueField : 'value',
						displayField : 'text',
						value : '50',
						editable : false,
						width : 85
					});
			this.pagesize = number = parseInt(pagesize_combo.getValue());
			
			// 改变每页显示条数reload数据
			pagesize_combo.on("select", function(comboBox) {
						//this.bbar.pageSize = parseInt(comboBox.getValue());
						number = parseInt(comboBox.getValue());
						this.pagesize = number;
						this.store.reload({
									params : {
										start : 0,
										limit : number
									}
								});
					});
			
			// 分页工具栏
			this.bbar = new parent.Ext.PagingToolbar({
						pageSize : number,
						store : this.store,
						displayInfo : true,
						displayMsg : '显示{0}条到{1}条,共{2}条',
						plugins : new parent.Ext.ux.ProgressBarPager(), // 分页进度条
						emptyMsg : "没有符合条件的记录",
						items : ['-', '&nbsp;&nbsp;', pagesize_combo]
					});
		}		
	},
	configCmp : function(options){
		this.initStore(options);
		this.initColumns(options);
		this.initPlugins(options);
		this.initBbar(options);		
	},
	reconfigCmp : function(options){
		Ext.apply(this, options);
		this.configCmp(options);
		this.reconfigure(this.store, new parent.Ext.grid.ColumnModel(this.columns));
	},
	
	// 检索Grid
	retrieve : function(options){
		grid = this;
		options = options || {};
	    options.params = options.params || {};

	    if (this.isPage){
			options.params.start = 0;
			options.params.limit = this.pagesize;
		}
		// 如果没有设置回调函数，那么自定义回调函数并执行默认选中第一行
		/*options.callback = options.callback || function (r, opts, success){
													if (r.length > 0 || success){
														if (grid.isSelected){
															grid.getSelectionModel().selectRow(0);
														}													
													}
												};*/
												
		/*if (options.retrieveType || options.retrieveType == '1'){
			this.store.load(options);
		}else{
			this.store.reload();
		}*/
		if (options.retrieveType || options.retrieveType == '1'){
			this.store.load(options);
		}else{
			Ext.applyIf(options.params || {}, Ext.isEmpty(this.store.lastOptions) ? {} : this.store.lastOptions.params || {});
			this.store.reload(options);
		}
		
	},
	retrieveStart : function(options){
		
	},
	retrieveEnd : function(thiz, record, opts){
		this.isLoaded = true;
	},
	getRow : function(){
		if (!this.getSelectionModel().hasSelection()){
			parent.Ext.Msg.alert('提示', '您没有选中任何数据!')
		}
		var row = this.getSelectionModel().getSelected();
		return row;	
	},
	getRows : function(){
		// 返回一个行集合JS数组
		var rows = this.getSelectionModel().getSelections();
		if (parent.Ext.isEmpty(rows)) {
			parent.Ext.MessageBox.alert('提示', '您没有选中任何数据!');
			return;
		}
		// 将JS数组中的行级主键，生成以,分隔的字符串
		//var strChecked = jsArray2JsString(rows, 'xmid');
		return rows;
	},
	
	setAdd : function(options){
		this.store.on('add', function(thiz, records, index){
			
		});
	},
	setRemove : function(options){
		this.store.on('remove', function(thiz, record, index){
			
		});
	},
	/**
	 * @description 设置行编辑模式下的保存事件
	 * @param {} config = {url : '', setParams : fn(record), saveAfter : fn(record)}
	 * @注意 	
	 * 			如果需要保存前检查，保存后的返回值 在action中必须返回一个result和msg
	  			outDto.put("result", true);
				outDto.put("msg", "保存成功！");
	 */
	setUpdate : function(options){
		var pGrid = this;
		
		this.store.on('update', function (thiz, record, operation){
					//var record = thiz.getAt(thiz.indexOf(record));
					if (operation == parent.Ext.data.Record.EDIT){
						// 保存前的检查		
						if (options && !parent.Ext.isEmpty(options.saveCheck)) 
							if (!options.saveCheck(record))
								return;
						
						parent.Ext.Ajax.request({
							url : options.url || '',
							params : options.setParams(record) || {},
							success : function(response, opts){
								var result = parent.Ext.decode(response.responseText);
								if (!parent.Ext.isEmpty(result.result) && result.result == false){
									thiz.rejectChanges();
								}else{
									thiz.commitChanges();
								}
								parent.Ext.Msg.alert('提示', '保存成功');
								
								//
								if (!parent.Ext.isEmpty(options.saveAfter)) {
									//this.store.suspendEvents(true);
									options.saveAfter(record, pGrid);
									//this.store.resumeEvents();
								}
							},
							failure : function(response, opts){
								parent.Ext.Msg.alert('错误', '保存失败！');
								thiz.rejectChanges();
							}
						});
					}
			})
	},
	/**
	 * 删除选中的数据
	 * @param {} config = {deletePK : '', deleteCheck : fn, url : '', deleteAfter : fn}
	 */
	deleteRow : function(options){
		var row = this.getRow();
		if (parent.Ext.isEmpty(row)) {
			return;
		}

		var sys_pk = row.get(options.deletePk);
		
		// 删除前的检查
		if (options.deleteCheck && !options.deleteCheck(row)){
			return;
		}

		parent.Ext.Msg.confirm('请确认', '确认删除吗?', function(btn, text) {
			if (btn == 'yes') {
				parent.Ext.Ajax.request({
					url : options.url || '',
					method : 'POST',
					success : function(response) {
						if (!Ext.isEmpty(options.deleteAfter)){
							options.deleteAfter();
						}
						parent.Ext.MessageBox.alert("提示", "删除成功!");
					},
					failure : function(response) {
						parent.Ext.MessageBox.alert('提示', '删除失败!');
					},
					params : {
						sys_pk : sys_pk,
						sys_code : sys_pk
					}
				});
			}
		});
	},
	/**
	 * 批量删除选中的数据
	 * @param {} config = {deletePK : '', deleteCheck : fn, url : '', deleteAfter : fn}
	 */
	deleteRows : function(options){
		var rows = this.getRows();
		if (parent.Ext.isEmpty(rows)) {
			return;
		}
		
		var sys_pks = this.records2Str(rows, options.deletePk);
		// 删除前的检查
		if (!parent.Ext.isEmpty(options.deleteCheck) && !options.deleteCheck(rows)){
			return;
		}
		
		parent.Ext.Msg.confirm('请确认', '确认删除吗?', function(btn, text) {
			if (btn == 'yes') {
				parent.Ext.Ajax.request({
					url : options.url || '',
					method : 'POST',
					success : function(response) {
						if (!parent.Ext.isEmpty(options.deleteAfter)){
							options.deleteAfter();
						}
						parent.Ext.MessageBox.alert("提示", "删除成功!");
					},
					failure : function(response) {
						parent.Ext.MessageBox.alert('提示', '删除失败!');
					},
					params : {
						sys_pks : sys_pks
					}
				});
			}
		});
	},
	removeRow : function(){
		this.editor.stopEditing();
        var s = this.getRows();
        for(var i = 0, r; r = s[i]; i++){
            this.store.remove(r);
        }
	},
	/**
	 * 插入一行
	 * @param {} config = {insertInit : fn} insertInit 接收一个参数 Recrod
	 * 			作为插入前的初始化工作，主要是设置插入record的初始值
	 * @example	config.insertInit
	 * var e = new Record({
            name: 'New Guy',
            email: 'new@exttest.com',
            start: (new Date()).clearTime(),
            salary: 50000,
            active: true
        });
	 */
	insertRow : function(fn){
		
		var e = this.insertInit(fn);
        
        this.editor.stopEditing(false);
        this.store.insert(this.store.getCount(), e);
        this.getView().refresh();	// grid 在reconfigure后会有问题
        this.getSelectionModel().selectRow(0);
        
        this.editor.startEditing(0);
	},
	/**
	 * 插入前的初始化工作，主要是设置插入record的初始值
	 * @param {} config = {insertInit : fn}
	 * @return {} e Ext.data.record
	 * @example	config.insertInit
	 * var e = new Record({
            name: 'New Guy',
            email: 'new@exttest.com',
            start: (new Date()).clearTime(),
            salary: 50000,
            active: true
        });
	 * 
	 */
	insertInit : function (fn){
		return fn(this.Records);
	},
	/**
	 * 将record中指定的字段拼接成字符串
	 * @param {} records 
	 * @param {} column	 record中的字段名
	 * @param {} token   用于拼接的分隔字符
	 * @return {}
	 */
	records2Str : function(records, column, token) {
		var temp = '';
		for (var i = 0; i < records.length; i++) {
			if (i != records.length - 1)
				temp = temp + records[i].get(column) + token || ':';
			else
				temp = temp + records[i].get(column);
		}
		return temp;
	},
	// 刷新后gridpanel的滚动条滚动到原始位置
	initFixScorll : function(){
		this.on('beforerefresh', function(){
				if (this.isFixScroll())
					this.saveScrollPosition();
			});
		this.on('bodyscroll', function(){
			this.fixHScroll();
		});
	},
	setFixScroll : function(opts){
		this.isFixScroll = opts || false;
	},
	isFixScroll : function(){
		return this.fixScroll || false;
	},
	saveScrollPosition : function() {
		this.scrollPosition = this.getView().scroller.dom.scrollLeft;
	},
	// 刷新后gridpanel的滚动条滚动到原始位置
	fixHScroll : function(){
		if(this.isFixScroll()){
			if (isLoaded == true){
				if (gridEqCheck.getView().scroller.dom.scrollLeft == 0){
					gridEqCheck.getView().scroller.dom.scrollLeft = scrollPosition
					isLoaded = false
				}
			}
		}
	}
	

});

/**
 * 创建自定义的下拉框，一般用于行编辑模式下的，下拉列编辑
 * @param {} config
 * 
 * @example 
   <pre><code>
   new Ext.grid.DictionaryColumn({   
				header: "处理方式",   
				dataIndex: 'transact_mode',    
				displayField: 'text',   
				valueField: 'value',   
				mode : 'local',
				store: storeTransact,
				typeAhead : false,
				editable : true,
				width : 90 
			})
	</code></pre>
 * 	
 * @author lishenying
 * @since 2012-08-08	
 */
Ext.grid.DictionaryColumn = function(config){
	    Ext.apply(this, config);
	    if(!this.id){
	        this.id = parent.Ext.id();
	    }
	    this.renderer = this.renderer.createDelegate(this);
		this.valueField = this.valueField || 'id';
		this.displayField = this.displayField || 'value';
		this.mode = this.mode || 'local';
		this.editable = this.editable || false;
		this.typeAhead = this.typeAhead || false;
		
		if (this.editable) {
			this.editor = new parent.Ext.form.ComboBox({
				displayField:this.displayField,
				valueField: this.valueField,
				store: this.store,
				mode: this.mode,
				typeAhead: this.typeAhead,
				triggerAction: 'all',
				lazyRender:true,
				listClass: 'x-combo-list-small'
			});
		}		
	};
// 为grid中下拉控件增加拼音检索
Ext.grid.DictionaryColumn.prototype = {
    renderer : function(v, p, record){
		var index = this.store.find(this.valueField, v);
		if (index < 0){
			return v;
		}else{
			return this.store.getAt(index).get(this.displayField);
		}
    },
    setDisabled :function(flag){
    	this.editor.setDisabled(flag);
    }
};

/**
 * Ext.form.FormPanel 扩展组件
 * @class efc.ux.FormPanel
 * @extends Ext.form.FormPanel
 * @author lishenying
 * @since 2012-08-16
 */
efc.std.parent.FormPanel = Ext.extend(parent.Ext.form.FormPanel, {
    // configurables
	frame : true, // 是否渲染表单面板背景色
	border : false,
	collapsible : false,
	labelWidth : 60, // 标签宽度
	labelAlign : 'right', // 标签对齐方式
	region : 'center',
	bodyStyle : 'padding : 5 5 5 5', // 表单元素和表单面板的边距
	buttonAlign : 'left',
	defaults : {anchor : '100%'},
	
    initComponent:function() {
    	
    	form = this;
    	
    	var config = {};
    	Ext.apply(this, Ext.apply(this.initialConfig, config));
    	
        // call parent
        efc.std.parent.FormPanel.superclass.initComponent.apply(this, arguments);
		
        this.addEvents('save');
    },
    onRender:function() {
        // before parent code
		
        // call parent
        efc.std.parent.FormPanel.superclass.onRender.apply(this, arguments);

        // after parent code, e.g. install event handlers on rendered components
        this.on('save', this.save);
    },
    /**
     * 合并参数对象
     * @param {} formvalues
     * @return {}
     */
    unionParams : function(objname, one, other){
		var params = one || {};
		for (var i = 0; i < other.length; i++){
			//
			for(var s in other[i]){
				eval(objname + "." + s + "='" + other[i][s] + "'");
			}
		}
		return params;
	},
    retrieve:function(opts){
    	// retrieveType = '1'(default)从record中读取  ; retrieveType = '2' 从url中加载
    	if (parent.Ext.isEmpty(opts.retrieveType) || opts.retrieveType == '1'){
    		this.getForm().loadRecord(opts.record);
    	}else{
			this.form.load({
						waitMsg : '正在处理数据,请稍候...',// 提示信息
						waitTitle : '提示',// 标题
						url : opts.url,// 请求的url地址
						params : opts.params,
						success : function(form, action) {// 加载成功的处理函数
							var msg = action.result.data.msg;
							if (msg == 'ok') {
								if (!parent.Ext.isEmpty(opts.retrieveEnd)) {
									opts.retrieveEnd();
								}
							}
							//parent.Ext.Msg.alert('提示', msg);
						},
						failure : function(form, action) {// 加载失败的处理函数
							parent.Ext.Msg.alert('提示', '数据查询失败,错误类型:' + action.failureType);
						}
					});
    	}
    },
	save:function(opts){
		
		if (!this.getForm().isValid()){
			parent.Ext.Msg.alert('提示', '请输入正确的信息!');
			return;
		}
	
		var params = this.form.getValues();
		// 自定义参数
		/*if (opts && !Ext.isEmpty(opts.params))
			params = this.unionParams('params', params, [opts.params]);*/
			
		// 保存前的检查		
		if (opts && !parent.Ext.isEmpty(opts.saveCheck)) 
			if (!opts.saveCheck(params))
				return;
			
		// 确定是新增还是修改

		parent.Ext.Ajax.request({
					url : opts.url || '',
					waitTitle : '提示',
					method : 'POST',
					params : opts.params,
					waitMsg : '正在处理数据,请稍候...',
					success : function() {
						parent.Ext.MessageBox.alert('提示', '保存成功！');
						if (!parent.Ext.isEmpty(opts.saveAfter)) {
							opts.saveAfter();
						}
					},
					failure : function(form, action) {
						parent.Ext.MessageBox.alert('提示', '保存失败');
					}
				});
	},
	insert:function(opts){
		this.form.reset();
		if (!parent.Ext.isEmpty(opts.initInsert))
			opts.initInsert();
	}
	
}); // e/o extend

/**
 * Ext.Panel 扩展组件
 * @class efc.ux.Panel
 * @extends Ext.Panel
 * @author lishenying
 * @since 2012-08-16
 */
efc.std.parent.Panel = Ext.extend(parent.Ext.Panel, {
    frame : false,
	border : true,
	autoScroll : false,
	collapsible : false,
	//bodyStyle : 'padding : 5 5 5 5', // 表单元素和表单面板的边距
	
    initComponent:function() {
    	
    	var config = {};
    	Ext.apply(this, Ext.apply(this.initialConfig, config));
    	
        // call parent
        efc.std.parent.Panel.superclass.initComponent.apply(this, arguments);

    },
    onRender:function() {
        // before parent code
		
        // call parent
        efc.std.parent.Panel.superclass.onRender.apply(this, arguments);

        // after parent code, e.g. install event handlers on rendered components
    }
}); // e/o extend

/**
 * Ext.tree.TreePanel 扩展组件
 * @class efc.ux.TreePanel
 * @extends Ext.tree.TreePanel
 * @author lishenying
 * @since 2012-09-02
 */
efc.std.parent.TreePanel = Ext.extend(parent.Ext.tree.TreePanel, {
    //frame : false,
	//border : true,
	//useArrows : true,
	//autoScroll : true,
	//collapsible : false,
		
    initComponent:function() {
    	
    	var config = {};
    	Ext.apply(this, Ext.apply(this.initialConfig, config));
    	
        // call parent
        efc.std.parent.TreePanel.superclass.initComponent.apply(this, arguments);
    },
    onRender:function() {
        // before parent code
		
        // call parent
        efc.std.parent.TreePanel.superclass.onRender.apply(this, arguments);

        // after parent code, e.g. install event handlers on rendered components
    }
}); // e/o extend

/**
 * Ext.Window 扩展组件
 * @class efc.ux.Window
 * @extends Ext.Window
 * @author lishenying
 * @since 2012-08-16
 */
efc.std.parent.Window = Ext.extend(parent.Ext.Window, {
	//layout : 'border', // 设置窗口布局模式
	width : 700, // 窗口宽度
	height : 500, // 窗口高度
	closable : false, // 是否可关闭
	collapsible : false, // 是否可收缩
	maximizable : false, // 设置是否可以最大化
	border : false, // 边框线设置
	constrain : true, // 设置窗口是否可以溢出父容器
	resizable : false,
	modal : true,
	pageY : (efc.util.getBodyHeight() - this.width)/2, // 页面定位Y坐标
	pageX : (efc.util.getBodyWidth()  - this.width) / 2, // 页面定位X坐标
	
	is_saveadd : false,	// 是否可以保存新增
	buttonsType : 0,	// 1 ： 保存 关闭	2 : 保存 删除 关闭   3 ：关闭	4：删除 关闭
	
	initComponent:function() {
		
		this.buttons = this.buttons || [];	//this.buttons = [];
		
		if (this.is_saveadd){
    		this.buttons.push(new parent.Ext.form.Checkbox({
								id : 'cbx_ins',
								boxLabel : '保存后新增',
								anchor : '100%'
							}));
    	}
    	
    	if (this.buttonsType == 1){
    		this.buttons.push({
								text : '保存',
								iconCls : 'acceptIcon',
								scope : this,
								handler : function() {
									this.onSave();
								}
							}, {
								text : '关闭',
								iconCls : 'tbar_synchronizeIcon',
								scope : this,
								scope : this,
								handler : function() {
									this.onClose();
								}
							});
    		
    	}else if (this.buttonsType == 2){
    		this.buttons.push('->', {
								text : '保存',
								iconCls : 'acceptIcon',
								scope : this,
								handler : function() {
									this.onSave();
								}
							}, {
								text : '删除',
								iconCls : 'deleteIcon',
								scope : this,
								handler : function() {
									//this.fireEvent('delete', this, this.getForm(), this.getForm().getValues());
									this.onDelete();
								}
							}, {
								text : '关闭',
								scope : this,
								iconCls : 'tbar_synchronizeIcon',
								handler : function() {
									this.onClose();
								}
							});
    	}else if (this.buttonsType == 3){
    		this.buttons.push('->', {
								text : '关闭',
								iconCls : 'tbar_synchronizeIcon',
								scope : this,
								handler : function() {
									this.onClose();
								}
							});
    	}else if (this.buttonsType == 4){
    		this.buttons.push('->', {
								text : '删除',
								iconCls : 'deleteIcon',
								scope : this,
								handler : function() {
									this.onDelete();
								}
							}, {
								text : '关闭',
								scope : this,
								iconCls : 'tbar_synchronizeIcon',
								handler : function() {
									this.onClose();
								}
							});
    	}else if (this.buttonsType == 5){
    		this.buttons.push('->', {
								text : '新增',
								iconCls : 'addIcon',
								scope : this,
								handler : function() {
									this.onInsert();
								}
							}, {
								text : '保存',
								iconCls : 'acceptIcon',
								scope : this,
								handler : function() {
									this.onSave();
								}
							}, {
								text : '删除',
								iconCls : 'deleteIcon',
								scope : this,
								handler : function() {
									//this.fireEvent('delete', this, this.getForm(), this.getForm().getValues());
									this.onDelete();
								}
							}, {
								text : '关闭',
								scope : this,
								iconCls : 'tbar_synchronizeIcon',
								handler : function() {
									this.onClose();
								}
							});
    	}
    	
    	var config = {
    		buttons : this.buttons || []
    	};
    	
    	Ext.apply(this, Ext.apply(this.initialConfig, config));

        // call parent
        efc.std.parent.Window.superclass.initComponent.apply(this, arguments);
    },
    onRender:function() {
        // call parent
        efc.std.parent.Window.superclass.onRender.apply(this, arguments);
    },
    onInsert : Ext.emptyFn,
    onSave : Ext.emptyFn,
    onDelete : Ext.emptyFn,
    onClose : function(){
    	this.hide();
    }
});

/**
 *  Ext.form.ComboBox 扩展组件 用于远程数据源
 * <pre><code>
 *    url : '',
 *    valueField : 'sys_code',
 *    displayField : 'sys_name',
 *    fields : [{name : 'sys_code'}, {name : 'sys_name'}]
 * </code></pre>
 * @class efc.ux.RSComboBox
 * @extends Ext.form.ComboBox
 * @author 李沈郢
 * @since 2012-08-20
 */
efc.std.parent.RSComboBox = Ext.extend(parent.Ext.form.ComboBox, {
	valueField : 'sys_code',
	displayField : 'sys_name',
	fields : [{name : 'sys_code'}, {name : 'sys_name'}],
	editable : true,
	anchor : '100%',
	mode : 'local',
	emptyText : '请选择...',
			
	initComponent:function() {
		Ext.apply(this, new efc.std.parent.Base());
		
		this.Records = parent.Ext.data.Record.create(this.fields);
		
    	var comboStore = new parent.Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : this.url || ''
						}),
				reader : new Ext.data.JsonReader({}, this.Records)
			});
		comboStore.load();
    	
		var config = {
			store : comboStore,
			triggerAction : 'all',
			loadingText : '正在加载数据...',
			forceSelection : true,
			resizable : true,
			selectOnFocus : true, 
			plugins:[new QM.plugin.PinyinFilter]
		}
		
        Ext.apply(this, Ext.apply(this.initialConfig, config));

        // call parent
        efc.std.parent.RSComboBox.superclass.initComponent.apply(this, arguments);
    },
	onRender:function() {
		efc.std.parent.RSComboBox.superclass.onRender.apply(this, arguments);
    }
});

/**
 * Ext.form.ComboBox 扩展组件 用于自定义的下拉数据
 * @param data
 * <pre><code>
 *    data : [['白班', '白班'], ['夜班', '夜班']],
 * </code></pre>
 * @class efc.ux.arrayComboBox
 * @extends Ext.form.ComboBox
 * @author lishenying
 * @since 2012-08-16
 */
efc.std.parent.arrayComboBox = Ext.extend(parent.Ext.form.ComboBox, {
	valueField : 'value',
	displayField : 'text',
	fields : ['value', 'text'],
	data : [['白班', '白班'], ['夜班', '夜班']],
	anchor : '100%',
			
	initComponent:function() {
		Ext.apply(this, new efc.ux.Base());
		
		this.Records = parent.Ext.data.Record.create(this.fields);
		
    	var comboStore = new parent.Ext.data.ArrayStore({
				fields : this.fields,
				data : this.data
			});
		
		var config = {
			store : comboStore,
			loadingText : '正在加载数据...',
			mode : 'local',
			triggerAction : 'all',
			forceSelection : true,
			typeAhead : true,
			resizable : true,
			allowBlank : this.allowBlank,
			editable : false
		}
		
        Ext.apply(this, Ext.apply(this.initialConfig, config));

        // call parent
        efc.std.parent.arrayComboBox.superclass.initComponent.apply(this, arguments);
    },
	onRender:function() {
        efc.std.parent.arrayComboBox.superclass.onRender.apply(this, arguments);
    }
});

/**
 * 用于查询的FormPanel
 * @class efc.ux.FormPanelQuery
 * @extends efc.ux.FormPanel
 * @author lishenying
 * @since 2012-08-18
 */
efc.std.parent.QueryFormPanel = Ext.extend(efc.std.parent.FormPanel, {
	title : '<span class="commoncss">查询选项<span>',
	collapsible : true,
	collapseMode : 'mimi',
	border : true,
	frame : true,
	width : 250,
	labelWidth : 60,
	labelAlign : 'right',
	layout : 'form',
	autoScroll : true,
	split : true,
	bodyStyle : '',
	region : 'west',
	
	initComponent:function() {
    	var config = {
    		
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
    	
        efc.std.parent.QueryFormPanel.superclass.initComponent.apply(this, arguments);
    },
    onRender:function() {
        efc.std.parent.QueryFormPanel.superclass.onRender.apply(this, arguments);
    }
});

/**
 * @description 利用Label控件 实现在formpanel中插入IMG
 * @example
 <pre><code> 
   },{   
        xtype:'formimage',//这里要显示效验码图片   
        src:'img.action',//图片的src  
        width:100,//设置图片大小   
        height:22,   
        itemCls:'sex-female', //向左浮动,处理控件横排      
        clearCls:'allow-float'  
    }],   
  </code></pre>
 * @class Efc.ux.FormImage
 * @extends Ext.BoxComponent
 */
efc.std.parent.FormImage = Ext.extend(parent.Ext.BoxComponent, {   
	onRender : function(ct, position){   
		if(!this.el){   
			this.el = parent.document.createElement('img');               
			this.el.src = this.src;   
			if(this.forId){   
				this.el.setAttribute('htmlFor', this.forId);   
			}   
		}
		parent.Ext.form.Label.superclass.onRender.call(this, ct, position);   
	}   
});
Ext.reg('parentformimg', efc.std.parent.FormImage);

/**
 * 
 * @param {} id					唯一标识id
 * @param {} config				conmbobox的配置信息
 * @param {} url				treeLoad的url地址
 * @param {} params				treeLoad的baseParams
 * @param {} clickCallBack		树节点点击事件
 * @param {} extraParams		leaveOnly ：默认为true，判断是否只点击叶子才有效；<br>
 * 								idMultiple : 默认为false，是否多选，多选则callBack不是在点击时有效<br>
 * 								dynParamsCallBack :动态的获取参数，即在combobx展开时调用此方法获取参数<br>
 * @param {} rootParams			treepanel root {id : '', }的各项属性	
 * @param {} maxTreeHeight		treepanel的高度
 * @param {} selfTree			直接传入自定义的TreePanel
 * @return {}
 */
efc.std.parent.treeCombobox = function(id, config, url, params, clickCallBack, extraParams, rootParams, maxTreeHeight, selfTree) {
	var isMultiple = extraParams == null || extraParams.isMultiple == null ? false : extraParams.isMultiple;
	var leaveOnly = extraParams == null || extraParams.leaveOnly == null ? true : extraParams.leaveOnly;
	maxTreeHeight = maxTreeHeight == null ? 200 : maxTreeHeight;
	var dynParams;
	
	function objConcat(a1, a2) {
		var newarr = {};
		for (var k1 in a1) {
			newarr[k1] = a1[k1];
		}
		for (var k2 in a2) {
			newarr[k2] = a2[k2];
		}
		return newarr;
	}

	var arr = objConcat({
		store : new parent.Ext.data.SimpleStore({
			fields : [],
			data : [[]]
		}),
		tpl : "<tpl for='.' scrolling='no'><div  scrolling='no' style='height:" + maxTreeHeight
				+ "px;overflow: hidden;' id='tree_" + id + "'></div></tpl>",
		maxHeight : maxTreeHeight,
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		forceSelection : true,
		onSelect : Ext.emptyFn,
		hideTrigger : false,
		typeAhead : true,
		hasRenderer : false
	}, config);

	var combobox = new parent.Ext.form.ComboBox(arr);
	var tree,
		root = new parent.Ext.tree.AsyncTreeNode({
			id : (rootParams.id  && rootParams.id) ? rootParams.id : '1',
			text : (rootParams.text  && rootParams.text) ? rootParams.text : '',
			dept_type : (rootParams.dept_type  && rootParams.dept_type) ? rootParams.dept_type : '',
			customid : (rootParams.customid  && rootParams.customid) ? rootParams.customid : '',
			expanded : true,
			nodeType : 'async',
			listeners : {
				'beforeexpand' : function(node) {
					node.eachChild(function(child) {
						child.expand();
					});
				}
			}
		});

	if (selfTree == null) {
		tree = new parent.Ext.tree.TreePanel({
			loader : new parent.Ext.tree.TreeLoader({
				dataUrl : url,
				baseParams : params,
				listeners : {
					"loadexception" : function(loader, node, response) {
						node.loaded = false;
						// tree.root.reload();
					},
					"beforeload" : function(loader, node) {
						if (dynParams != null) {
							loader.baseParams = dynParams;
						}
						loader.baseParams.parentId = node.id.split('_')[1];
					}
				}
			}),
			rootVisible : false,
			width : combobox.width,
			autoScroll : true,
			height : maxTreeHeight,
			border : false,
			//tbar : new Ext.Toolbar(),
			//plugins : ['multifilter'],
			root : root/*{
				id : 'controlUnit_0',
				nodeType : 'async',
				listeners : {
					'beforeexpand' : function(node) {
						node.eachChild(function(child) {
							child.expand();
						});
					}
				}
			}*/
		});
	}else{
		tree=selfTree;
		tree.setWidth(combobox.width);
		tree.setHeight(maxTreeHeight);
	}

	var panel = null;

	function e() {
		combobox.expand();
		combobox.un('collapse', e);
	}
	if (!isMultiple) {
		// tree.setHeight(350);
		panel = new parent.Ext.Panel({
			border : false,
			width : combobox.width,
			height : maxTreeHeight,
			layout : 'form',
			autoScroll : true,
			items : [tree]
		});
		tree.on('click', function(node) {
			if (node.isLeaf() || !leaveOnly) {
				clickCallBack.call(null, node);
				combobox.collapse();
				combobox.collapse();
			} else {
				combobox.on('collapse', e);
			}
		});
	} else {
		var btnOk = new parent.Ext.Button({
			text : SAVE,
			width : 40,
			height : 20,
			handler : function() {
				clickCallBack.call(null, tree.getChecked());
				combobox.collapse();
			}
		});

		var btnCancel = new parent.Ext.Button({
			text : CANCLE,
			width : 40,
			height : 20,
			handler : function() {
				combobox.collapse();
			}
		});

		var toolbar = new parent.Ext.Toolbar({
			width : '100%',
			height : 25,
			items : ['->', btnOk, btnCancel],
			cls : 'toolbar_top'
		});
		panel = new parent.Ext.Panel({
			border : false,
			width : combobox.width,
			height : maxTreeHeight,
			autoScroll : true,
			layout : 'form',
			items : [tree],
			bbar : toolbar
		});

		tree.on('click', function(node) {
			combobox.on('collapse', e);
		})
		tree.on('checkchange', function(node) {
			combobox.on('collapse', e);
		})
		// combobox.on("blur", function() {
		// if (dynParams != false)
		// clickCallBack.call(null, tree.getChecked());
		// })

	}
	combobox.on('expand', function() {
		if (!combobox.hasRenderer) {
			combobox.hasRenderer = true;
			panel.render("tree_" + id);
			document.getElementById("tree_" + id).onclick = function() {
				combobox.on('collapse', e);
			}
		}
	});
	if (extraParams != null && extraParams.dynParamsCallBack != null) {
		combobox.on('focus', function() {
			dynParams = extraParams.dynParamsCallBack.call(null);
			if (dynParams == false) {
				return;
			}
			tree.root.reload();
		})
	}
	return combobox;
}

/**
 * @class efc.ux.TreeCheckNodeUI
 * @extends Ext.tree.TreeNodeUI
 * 
 * 对 Ext.tree.TreeNodeUI 进行checkbox功能的扩展,后台返回的结点信息不用非要包含checked属性
 * 
 * 扩展的功能点有：
 * 一、支持只对树的叶子进行选择
 *    只有当返回的树结点属性leaf = true 时，结点才有checkbox可选
 * 	  使用时，只需在声明树时，加上属性 onlyLeafCheckable: true 既可，默认是false
 * 
 * 二、支持对树的单选
 *    只允许选择一个结点
 * 	  使用时，只需在声明树时，加上属性 checkModel: "single" 既可
 * 
 * 二、支持对树的级联多选 
 *    当选择结点时，自动选择该结点下的所有子结点，或该结点的所有父结点（根结点除外），特别是支持异步，当子结点还没显示时，会从后台取得子结点，然后将其选中/取消选中
 *    使用时，只需在声明树时，加上属性 checkModel: "cascade" 或"parentCascade"或"childCascade"既可
 * 
 * 三、添加"check"事件
 *    该事件会在树结点的checkbox发生改变时触发
 *    使用时，只需给树注册事件,如：
 *    tree.on("check",function(node,checked){...});
 * 
 * 默认情况下，checkModel为'multiple'，也就是多选，onlyLeafCheckable为false，所有结点都可选
 * 
 * 使用方法：在loader里加上 baseAttrs:{uiProvider:efc.ux.TreeCheckNodeUI} 既可.
 * 例如：
 *   var tree = new Ext.tree.TreePanel({
 *		el:'tree-ct',
 *		width:568,
 *		height:300,
 *		checkModel: 'cascade',   //对树的级联多选
 *		onlyLeafCheckable: false,//对树所有结点都可选
 *		animate: false,
 *		rootVisible: false,
 *		autoScroll:true,
 *		loader: new Ext.tree.DWRTreeLoader({
 *			dwrCall:Tmplt.getTmpltTree,
 *			baseAttrs: { uiProvider: efc.ux.TreeCheckNodeUI } //添加 uiProvider 属性
 *		}),
 *		root: new Ext.tree.AsyncTreeNode({ id:'0' })
 *	});
 *	tree.on("check",function(node,checked){alert(node.text+" = "+checked)}); //注册"check"事件
 *	tree.render();
 * 
 */
efc.std.parent.TreeCheckNodeUI = function() {
	//多选: 'multiple'(默认)
	//单选: 'single'
	//级联多选: 'cascade'(同时选父和子);'parentCascade'(选父);'childCascade'(选子)
	this.checkModel = 'multiple';
	
	//only leaf can checked
	this.onlyLeafCheckable = false;
	
	efc.std.parent.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);
};

Ext.extend(efc.std.parent.TreeCheckNodeUI, parent.Ext.tree.TreeNodeUI, {

    renderElements : function(n, a, targetNode, bulkRender){
    	var tree = n.getOwnerTree();
		this.checkModel = tree.checkModel || this.checkModel;
		this.onlyLeafCheckable = tree.onlyLeafCheckable || false;
    	
        // add some indent caching, this helps performance when rendering a large tree
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        //var cb = typeof a.checked == 'boolean';
		var cb = (!this.onlyLeafCheckable || a.leaf);
        var href = a.href ? a.href : Ext.isGecko ? "" : "#";
        var buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls,'" unselectable="on">',
            '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
            '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />',
            '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on" />',
            cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',
            '<a hidefocus="on" class="x-tree-node-anchor" href="',href,'" tabIndex="1" ',
             a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '><span unselectable="on">',n.text,"</span></a></div>",
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>"].join('');

        var nel;
        if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){
            this.wrap = parent.Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
        }else{
            this.wrap = parent.Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
        }
        
        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
            parent.Ext.fly(this.checkbox).on('click', this.check.createDelegate(this,[null]));
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[index].firstChild;
    },
    
    // private
    check : function(checked){
        var n = this.node;
		var tree = n.getOwnerTree();
		this.checkModel = tree.checkModel || this.checkModel;
		
		if( checked === null ) {
			checked = this.checkbox.checked;
		} else {
			this.checkbox.checked = checked;
		}
		
		n.attributes.checked = checked;
		tree.fireEvent('check', n, checked);
		
		if(this.checkModel == 'single'){
			var checkedNodes = tree.getChecked();
			for(var i=0;i<checkedNodes.length;i++){
				var node = checkedNodes[i];
				if(node.id != n.id){
					node.getUI().checkbox.checked = false;
					node.attributes.checked = false;
					tree.fireEvent('check', node, false);
				}
			}
		} else if(!this.onlyLeafCheckable){
			if(this.checkModel == 'cascade' || this.checkModel == 'parentCascade'){
				var parentNode = n.parentNode;
				if(parentNode !== null) {
					this.parentCheck(parentNode,checked);
				}
			}
			if(this.checkModel == 'cascade' || this.checkModel == 'childCascade'){
				if( !n.expanded && !n.childrenRendered ) {
					n.expand(false,false,this.childCheck);
				}else {
					this.childCheck(n);  
				}
			}
		}
	},
    
    // private
	childCheck : function(node){
		var a = node.attributes;
		if(!a.leaf) {
			var cs = node.childNodes;
			var csui;
			for(var i = 0; i < cs.length; i++) {
				csui = cs[i].getUI();
				if(csui.checkbox.checked ^ a.checked)
					csui.check(a.checked);
			}
		}
	},
	
	// private
	parentCheck : function(node ,checked){
		var checkbox = node.getUI().checkbox;
		if(typeof checkbox == 'undefined')return ;
		if(!(checked ^ checkbox.checked))return;
		if(!checked && this.childHasChecked(node))return;
		checkbox.checked = checked;
		node.attributes.checked = checked;
		node.getOwnerTree().fireEvent('check', node, checked);
		
		var parentNode = node.parentNode;
		if( parentNode !== null){
			this.parentCheck(parentNode,checked);
		}
	},
	
	// private
	childHasChecked : function(node){
		var childNodes = node.childNodes;
		if(childNodes || childNodes.length>0){
			for(var i=0;i<childNodes.length;i++){
				if(childNodes[i].getUI().checkbox.checked)
					return true;
			}
		}
		return false;
	},
	
    toggleCheck : function(value){
    	var cb = this.checkbox;
        if(cb){
            var checked = (value === undefined ? !cb.checked : value);
            this.check(checked);
        }
    }
});

// 图像浏览
efc.std.parent.imageWindow = Ext.extend(efc.std.parent.Window, {
	title : '图像浏览',
	width : 700,   
    height : 542,
	
	animateTarget : parent.Ext.getBody(),
	closable : true,
    closeAction :'hide',
    modal : false,
    layout:'border',
    buttonsType : 3,
    
	initComponent : function(){
		var config = {
			items : [{   
		        xtype: 'panel',   
		        region: 'center',   
		        layout:'fit',   
		        bodyStyle : 'background-color:#E5E3DF;',   
		        frame:false,   
		        border:false,   
		        html :'<div id="mapPic"><div class="nav">'  
		            +'<div class="up" id="up" title="上"></div><div class="right" id="right" title="右"></div>'  
		            +'<div class="down" id="down" title="下"></div><div class="left" id="left" title="左"></div>'  
		            +'<div class="zoom" id="zoom" title="还原"></div><div class="in" id="in" title="放大"></div>'  
		            +'<div class="out" id="out" title="缩小"></div></div>'  
		            +'<img id="view-image-custom" src="" border="0" style="cursor: url(/teds/resource/image/openhand_8_8.cur), default;" > </div>'  
		    }]
		}
		
		this.on('show', function() {
			this.pageInit();   
		});
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		
	    efc.std.parent.imageWindow.superclass.initComponent.apply(this, arguments);
    },
    onRender : function(ct, position){
		efc.std.parent.imageWindow.superclass.onRender.apply(this, arguments);
	},
	//
	pageInit : function (){   
	    var image = parent.Ext.get('view-image-custom');   
	  	var scope = this;
	  	
	    if(image!=null){   
	        parent.Ext.get('view-image-custom').on({   
	            'mousedown' : {fn : function(){this.setStyle('cursor', 'url(/tvds/resource/image/closedhand_8_8.cur),default;');}, scope : image},   
	            'mouseup' : {fn : function(){this.setStyle('cursor', 'url(/tvds/resource/image/openhand_8_8.cur),move;');}, scope : image},   
	            'dblclick' : {
	            	fn : function(){   
	                	this.zoom(image, true, 1.5);   
	            	},
	            	scope : this
	        	}
	        });   
	        
	        parent.Ext.getDom('view-image-custom').onmousewheel = function ue_mouesewheel(e){
				if (e.wheelDelta){
					if (e.wheelDelta > 0){
						scope.zoom(image, true, 1.5);
					}else{
						scope.zoom(image, false, 1.5);
					}
				}
			}
			
	        new parent.Ext.dd.DD(image, 'pic');   
	           
	        //image.center();//图片居中   
	           
	        //获得原始尺寸   
	        image.osize = {   
	            width : image.getWidth(),   
	            height : image.getHeight()   
	        };   
	       
	        parent.Ext.get('up').on('click',function(){this.imageMove('up',image);}, this);       //向上移动   
	        parent.Ext.get('down').on('click',function(){this.imageMove('down',image);}, this);   //向下移动   
	        parent.Ext.get('left').on('click',function(){this.imageMove('left',image);}, this);   //左移   
	        parent.Ext.get('right').on('click',function(){this.imageMove('right',image);}, this); //右移动   
	        parent.Ext.get('in').on('click',function(){this.zoom(image,true,1.5);}, this);        //放大   
	        parent.Ext.get('out').on('click',function(){this.zoom(image,false,1.5);}, this);      //缩小   
	        parent.Ext.get('zoom').on('click',function(){this.restore(image);}, this);            //还原   
	    }
	},
	imageMove : function(direction, el) {   
	    el.move(direction, 50, true);   
	},
	zoom : function (el,type,offset){   
	    var width = el.getWidth();   
	    var height = el.getHeight();   
	    var nwidth = type ? (width * offset) : (width / offset);   
	    var nheight = type ? (height * offset) : (height / offset);   
	    //var left = type ? -((nwidth - width) / 2):((width - nwidth) / 2);   
	    //var top =  type ? -((nheight - height) / 2):((height - nheight) / 2);
	    var left = 0;
	    var top = 0;
	    
	    el.animate(   
	        {   
	            height: {to: nheight, from: height},   
	            width: {to: nwidth, from: width},   
	            left: {by:left},   
	            top: {by:top}   
	        },   
	        null,         
	        null,        
	        'backBoth',   
	        'motion'  
	    );   
	},
	restore : function (el) {   
	    var size = el.osize;  
	    //自定义回调函数   
	    function center(el,callback){   
	        el.center();   
	        callback(el);   
	    }   
	    el.fadeOut({callback:function(){   
	        el.setSize(size.width, size.height, {callback:function(){   
	            center(el,function(ee){//调用回调   
	                ee.fadeIn();   
	            });   
	        }});   
	    }   
	    });  	
	},
	setSizeByImage : function(aglinType){
		var scope = this;
		var image = parent.Ext.get('view-image-custom');   
	  	
		// 窗口的实际X,Y
        var window_X = this.getPosition()[0];
        var window_Y = this.getPosition()[1];
        
        // 图片的实际X,Y
        var img_X = image.getLeft();
        var img_Y = image.getTop();
        
        var left = window_X > img_X ? (window_X - img_X) : -(img_X - window_X);
        var top  = window_Y > img_Y ? (window_Y - img_Y) : -(img_Y - window_Y);
     		
        var width = image.getWidth();   
	    var height = image.getHeight(); 
	    
	    aglinType = aglinType ? '2' : '1';
	    
	    // 竖向='1' 横向 ='2' 
        if (aglinType == '1') {
        	image.animate({
        		height: {to: 700, from: height},   
	            width: {to: 514, from: width},
	            left: {by:left + 7},   
	            top: {by:top + 52}
        	});
        } else {
        	image.animate({
        		height: {to: 514, from: height},   
	            width: {to: 700, from: width},
	            left: {by:left + 7},   
	            top: {by:top + 52}
        	});
        }
	},
	setImage : function(url){
		parent.Ext.getDom('view-image-custom').src = url
	}
});

