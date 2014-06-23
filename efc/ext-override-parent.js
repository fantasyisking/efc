/**
 * 重载Ext控件的行为
 * @version 0.0.1
 * @author lishenying
 * @since 2012-08-08
 */
//Ext.BLANK_IMAGE_URL = "/images/ext/s.gif";
/*Ext.override(Ext.Panel, {
	 添加一个属性来控制是否使用iframe层用于防止activex控件遮盖 
	iframeMask : false,
	onRender : function(ct, position) {
		Ext.Panel.superclass.onRender.call(this, ct, position);
		this.createClasses();

		var el = this.el, d = el.dom, bw, ts;

		 hikvision 
		if (this.iframeMask) {
			if (this.shim) {
				Ext.DomHelper.append(this.el.dom, {
					tag : 'iframe',
					id : this.id + '_iframe',
					style : "position:absolute; visibility:inherit; top:0; left:0; width:100%; height:104%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'",
					src : 'javascript:false'
				})
			} else {
				Ext.DomHelper.append(this.el.dom, {
					tag : 'iframe',
					id : this.id + '_iframe',
					style : "position:absolute; visibility:inherit; top:0; left:0; width:100%; height:100%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'",
					src : 'javascript:false'
				})
			}
		}
		 hikvision 

		if (this.collapsible && !this.hideCollapseTool) {
			this.tools = this.tools ? this.tools.slice(0) : [];
			this.tools[this.collapseFirst ? 'unshift' : 'push']({
				id : 'toggle',
				handler : this.toggleCollapse,
				scope : this
			});
		}

		if (this.tools) {
			ts = this.tools;
			this.elements += (this.header !== false) ? ',header' : '';
		}
		this.tools = {};

		el.addClass(this.baseCls);
		if (d.firstChild) { // existing markup
			this.header = el.down('.' + this.headerCls);
			this.bwrap = el.down('.' + this.bwrapCls);
			var cp = this.bwrap ? this.bwrap : el;
			this.tbar = cp.down('.' + this.tbarCls);
			this.body = cp.down('.' + this.bodyCls);
			this.bbar = cp.down('.' + this.bbarCls);
			this.footer = cp.down('.' + this.footerCls);
			this.fromMarkup = true;
		}
		if (this.preventBodyReset === true) {
			el.addClass('x-panel-reset');
		}
		if (this.cls) {
			el.addClass(this.cls);
		}

		if (this.buttons) {
			this.elements += ',footer';
		}

		// This block allows for maximum flexibility and performance when using existing markup

		// framing requires special markup
		if (this.frame) {
			el.insertHtml('afterBegin', String.format(Ext.Element.boxMarkup, this.baseCls));

			this.createElement('header', d.firstChild.firstChild.firstChild);
			this.createElement('bwrap', d);

			// append the mid and bottom frame to the bwrap
			bw = this.bwrap.dom;
			var ml = d.childNodes[1], bl = d.childNodes[2];
			bw.appendChild(ml);
			bw.appendChild(bl);

			var mc = bw.firstChild.firstChild.firstChild;
			this.createElement('tbar', mc);
			this.createElement('body', mc);
			this.createElement('bbar', mc);
			this.createElement('footer', bw.lastChild.firstChild.firstChild);

			if (!this.footer) {
				this.bwrap.dom.lastChild.className += ' x-panel-nofooter';
			}
			
			 * Store a reference to this element so: a) We aren't looking it up all the time b) The last element is reported
			 * incorrectly when using a loadmask
			 
			this.ft = Ext.get(this.bwrap.dom.lastChild);
			this.mc = Ext.get(mc);
		} else {
			this.createElement('header', d);
			this.createElement('bwrap', d);

			// append the mid and bottom frame to the bwrap
			bw = this.bwrap.dom;
			this.createElement('tbar', bw);
			this.createElement('body', bw);
			this.createElement('bbar', bw);
			this.createElement('footer', bw);

			if (!this.header) {
				this.body.addClass(this.bodyCls + '-noheader');
				if (this.tbar) {
					this.tbar.addClass(this.tbarCls + '-noheader');
				}
			}
		}

		if (Ext.isDefined(this.padding)) {
			this.body.setStyle('padding', this.body.addUnits(this.padding));
		}

		if (this.border === false) {
			this.el.addClass(this.baseCls + '-noborder');
			this.body.addClass(this.bodyCls + '-noborder');
			if (this.header) {
				this.header.addClass(this.headerCls + '-noborder');
			}
			if (this.footer) {
				this.footer.addClass(this.footerCls + '-noborder');
			}
			if (this.tbar) {
				this.tbar.addClass(this.tbarCls + '-noborder');
			}
			if (this.bbar) {
				this.bbar.addClass(this.bbarCls + '-noborder');
			}
		}

		if (this.bodyBorder === false) {
			this.body.addClass(this.bodyCls + '-noborder');
		}

		this.bwrap.enableDisplayMode('block');

		if (this.header) {
			this.header.unselectable();

			// for tools, we need to wrap any existing header markup
			if (this.headerAsText) {
				this.header.dom.innerHTML = '<span class="' + this.headerTextCls + '">' + this.header.dom.innerHTML + '</span>';

				if (this.iconCls) {
					this.setIconClass(this.iconCls);
				}
			}
		}

		if (this.floating) {
			this.makeFloating(this.floating);
		}

		if (this.collapsible && this.titleCollapse && this.header) {
			this.mon(this.header, 'click', this.toggleCollapse, this);
			this.header.setStyle('cursor', 'pointer');
		}
		if (ts) {
			this.addTool.apply(this, ts);
		}

		// Render Toolbars.
		if (this.fbar) {
			this.footer.addClass('x-panel-btns');
			this.fbar.ownerCt = this;
			this.fbar.render(this.footer);
			this.footer.createChild({
				cls : 'x-clear'
			});
		}
		if (this.tbar && this.topToolbar) {
			this.topToolbar.ownerCt = this;
			this.topToolbar.render(this.tbar);
		}
		if (this.bbar && this.bottomToolbar) {
			this.bottomToolbar.ownerCt = this;
			this.bottomToolbar.render(this.bbar);
		}
	},
	onResize : function(w, h) {
		 hikvision 
		if (this.iframeMask)
			this.el.dom.style.height = h; // 拖动的时候重新设置了高度
		 hikvision 
		if (Ext.isDefined(w) || Ext.isDefined(h)) {
			if (!this.collapsed) {
				// First, set the the Panel's body width.
				// If we have auto-widthed it, get the resulting full offset width so we can size the Toolbars to match
				// The Toolbars must not buffer this resize operation because we need to know their heights.

				if (Ext.isNumber(w)) {
					this.body.setWidth(w = this.adjustBodyWidth(w - this.getFrameWidth()));
				} else if (w == 'auto') {
					w = this.body.setWidth('auto').dom.offsetWidth;
				} else {
					w = this.body.dom.offsetWidth;
				}

				if (this.tbar) {
					this.tbar.setWidth(w);
					if (this.topToolbar) {
						this.topToolbar.setSize(w);
					}
				}
				if (this.bbar) {
					this.bbar.setWidth(w);
					if (this.bottomToolbar) {
						this.bottomToolbar.setSize(w);
						// The bbar does not move on resize without this.
						if (Ext.isIE) {
							this.bbar.setStyle('position', 'static');
							this.bbar.setStyle('position', '');
						}
					}
				}
				if (this.footer) {
					this.footer.setWidth(w);
					if (this.fbar) {
						this.fbar.setSize(Ext.isIE ? (w - this.footer.getFrameWidth('lr')) : 'auto');
					}
				}

				// At this point, the Toolbars must be layed out for getFrameHeight to find a result.
				if (Ext.isNumber(h)) {
					h = Math.max(0, this.adjustBodyHeight(h - this.getFrameHeight()));
					this.body.setHeight(h);
				} else if (h == 'auto') {
					this.body.setHeight(h);
				}

				if (this.disabled && this.el._mask) {
					this.el._mask.setSize(this.el.dom.clientWidth, this.el.getHeight());
				}
			} else {
				// Adds an event to set the correct height afterExpand. This accounts for the deferHeight flag in panel
				this.queuedBodySize = {
					width : w,
					height : h
				};
				if (!this.queuedExpand && this.allowQueuedExpand !== false) {
					this.queuedExpand = true;
					this.on('expand', function() {
						delete this.queuedExpand;
						this.onResize(this.queuedBodySize.width, this.queuedBodySize.height);
					}, this, {
						single : true
					});
				}
			}
			this.onBodyResize(w, h);
		}
		this.syncShadow();
		Ext.Panel.superclass.onResize.call(this);
	}
})*/

Ext.extend(parent.Ext.Window.DD, parent.Ext.dd.DD, {
	moveOnly : true,
	headerOffsets : [100, 25],
	startDrag : function() {
		var w = this.win;
		this.proxy = w.ghost();
		if (w.constrain !== false) {
			var so = w.el.shadowOffset;
			this.constrainTo(w.container, {
				right : so,
				left : so,
				bottom : so
			});
		} else if (w.constrainHeader !== false) {
			var s = this.proxy.getSize();
			this.constrainTo(w.container, {
				right : -(s.width - this.headerOffsets[0]),
				bottom : -(s.height - this.headerOffsets[1])
			});
		}
		/* hikvision */
		if (this.win.iframeMask) {
			var newiframe = Ext.getDom(this.win.id + '_iframe');
			if (newiframe != null) {
				Ext.DomHelper.append(this.proxy.dom, {
					tag : 'iframe',
					id : this.win.id + '_iframe',
					style : "position:absolute; visibility:inherit; top:0; left:0; width:100%; height:100%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'",
					src : 'javascript:false'
				})
			}
		}
		/* hikvision */
	},
	b4Drag : Ext.emptyFn,

	onDrag : function(e) {
		this.alignElWithMouse(this.proxy, e.getPageX(), e.getPageY());
	},

	endDrag : function(e) {
		this.win.unghost();
		this.win.saveState();
	}
});

Ext.override(parent.Ext.grid.GridPanel, {
	outSideHeight : 0,
	hasOnBodyresize : false,
	afterRender : function() {
		parent.Ext.grid.GridPanel.superclass.afterRender.call(this);
		var v = this.view;
		this.on('bodyresize', v.layout, v);
		v.layout();
		if (this.deferRowRender) {
			v.afterRender.defer(10, this.view);
		} else {
			v.afterRender();
		}
		this.viewReady = true;
		if (this.hasOnBodyresize) {
			var parentP = this.findParentByType("panel") || this.findParentByType("form");
			var grid = this;
			if (parentP == null)
				return;
			parentP.on('bodyresize', function(p, width, height) {
				if (grid.rendered) {
					if (height - grid.outSideHeight < 0)
						return;
					grid.setSize(width, height - grid.outSideHeight)
					efc.util.resizeGrid(grid, width, height)
				}
			})
		}
	}
})

Ext.namespace('efc.form');
efc.form.ASCII_UN_USE = ";'\"\\,./?~!@#$%^&*()-+=_:<>|{}";
Ext.apply(parent.Ext.form.VTypes, {
	IPAddress : function(v) {
		// return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
		// return
		// /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
		// .test(v);
		return /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[0-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
				.test(v);
	},
	IPAddressText : TIP.IP,

	chinese : function(val, field) {
		var reg = /^[\u4e00-\u9fa5]+$/i;
		if (reg.test(val)) {
			return false;
		}
		return true;
	},
	chineseText : TIP.CHINESE,// '该输入项不能为中文',

	illegal : function(val) {
		return /^(\w|\s|[\u4E00-\u9FA5])*$/.test(val);
	},
	illegalText : TIP.NUMBER,// '该输入项由数字、26个英文字母或下划线组成',

	number : function(val) {
		var reg = /^[1-9]([0-9])*$/;
		return reg.test(val);
	},
	numberText : TIP.MUST_INTEGER,// "不允许输入小数",

	mobile :function(val) {
		var reg = /(^(\d{3,4}-)?\d{7,8})$|^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}|18\d{9}/;
		return reg.test(val);
	},
	mobileText : TIP.MOBILE,// "不允许输入小数",
	
	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},
	passwordText : TIP.DIFFERENT,// '新密码与确认密码输入不一致！',

	daterange : function(val, field) {
		var date = field.parseDate(val);

		if (!date) {
			return;
		}
		if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date;
		} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date;
		}
		return true;
	},

	comments : function(val, field) {
		if (field.allowBlank == false && val.trim() == '') {
			this.commentsText = TIP.SPACE;// '不能输入全空格';
			return false;
		}
		var varCode;
		var excludeChars;
		var includeChars;
		if (field.commentsRange != null) {
			excludeChars = field.commentsRange.excludeChars;
			includeChars = field.commentsRange.includeChars;
		}
		var isInclude = false;
		for (var i = 0; i < val.length; i++) {
			varCode = val.charCodeAt(i);
			if (includeChars != null && includeChars.length > 0) {
				isInclude = false;
				for (var j = 0; j < includeChars.length; j++) {
					if (varCode == includeChars.charCodeAt(j)) {
						isInclude = true;
						continue;
					}
				}
				if (isInclude) {
					continue;
				}
			}
			if (excludeChars != null && excludeChars.length > 0) {
				for (var k = 0; k < excludeChars.length; k++) {
					if (varCode == excludeChars.charCodeAt(k)) {
						return false
					}
				}
			}
			if (efc.form.ASCII_UN_USE.indexOf(String.fromCharCode(varCode)) >= 0) {
				return false;
			}
		}
		return true;
	},
	commentsText : TIP.CHARACTER
	// '不允许输入如下字符:(像!@#$%^&*等）'
})

/**
 * 重写Field控件属性
 */
parent.Ext.form.Field.prototype.initComponent = parent.Ext.form.Field.prototype.initComponent.createInterceptor(function() {
	// 如果在定义控件时指定标签分隔符为冒号,不需要进行必选项判断,对Field进行拦截
	if (this.labelSeparator == ':')
		return;
	var fl = this.fieldLabel, ab = this.allowBlank;
	if (ab === false && fl) {
		this.fieldLabel = fl + '&nbsp;<span style="color:red;">*</span>&nbsp;';
	} else if (ab === true && fl) {
		this.fieldLabel = '&nbsp;&nbsp;' + fl;
	}
});

// 控制特殊字符
parent.Ext.form.Field.prototype.initValue = function() {
	if (this.value !== undefined) {
		this.setValue(this.value);
	} else if (this.value == undefined){
		this.setValue("");
	} else if (this.el.dom.value.length > 0) {
		this.setValue(this.el.dom.value);
	}
	if (!isNaN(this.maxLength) && (this.maxLength * 1) > 0 && (this.maxLength != Number.MAX_VALUE)) {
		this.el.dom.maxLength = this.maxLength * 1;
	}
	if (this.vtype == 'comments') {
		var checkOnKeypress = true;
		if (this.commentsRange != null && this.commentsRange.checkOnKeypress == false) {
			checkOnKeypress = false;
		}
		var excludeChars;
		var includeChars;
		if (this.commentsRange != null) {
			excludeChars = this.commentsRange.excludeChars;
			includeChars = this.commentsRange.includeChars;
		}
		if (checkOnKeypress) {
			this.el.dom.onkeypress = function() {
				if (includeChars != null && includeChars.length > 0) {
					for (var j = 0; j < includeChars.length; j++) {
						if (event.keyCode == includeChars.charCodeAt(j)) {
							return true;
						}
					}
				}
				if (excludeChars != null && excludeChars.length > 0) {
					for (var k = 0; k < excludeChars.length; k++) {
						if (event.keyCode == excludeChars.charCodeAt(k)) {
							return false;
						}
					}
				}
				if (efc.form.ASCII_UN_USE.indexOf(String.fromCharCode(event.keyCode)) >= 0) {
					event.returnValue = false;
				}
			}
		}
	}
}

/**
 * 重写RowNumberer控件行为
 * 分页到第二页，相应的序号同时递增
 */
Ext.override(parent.Ext.grid.RowNumberer, {
	renderer : function(b, c, a, d) {
		var start = 0;
		if (a.store.lastOptions != null) {
			var params = a.store.lastOptions.params;
			if (params != null) {
				start = params.start == null ? 0 : params.start;
			}
		}
		if (this.rowspan) {
			c.cellAttr = 'rowspan="' + this.rowspan + '"'
		}
		return (start) + (d + 1);

	}
});


Date.prototype.dateDiff = function(interval, objDate) {
	var d = this, t = d.getTime(), t2 = objDate.getTime(), i = {};
	i["y"] = objDate.getFullYear() - d.getFullYear();
	i["q"] = i["y"] * 4 + Math.floor(objDate.getMonth() / 4)
			- Math.floor(d.getMonth() / 4);
	i["m"] = i["y"] * 12 + objDate.getMonth() - d.getMonth();
	i["ms"] = objDate.getTime() - d.getTime();
	i["w"] = Math.floor((t2 + 345600000) / (604800000))
			- Math.floor((t + 345600000) / (604800000));
	i["d"] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
	i["h"] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
	i["n"] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
	i["s"] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
	return i[interval];
};