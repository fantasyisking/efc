// global
//消息提示框
var TIP_MESSAGE = "提示信息";
var TIP_WARNING = "警告信息";
var TIP_ERROR = "错误信息";
var TIP_CONFIRM = "确认信息";

var SAVE_SUCCESS = "保存成功！";
var SAVE_FAIL = "保存失败！";
var DELETE_SUCCESS = "删除成功！";
var DELETE_FAIL = "删除失败！";
var IMPORT_SUCCESS = "导入成功！";
var IMPORT_FAIL = "导出失败！";
var DELETE_CONFIRM = "确定要删除吗？";
var ONLY_ONE_COLUMN = "只能选择一条记录！";
var NO_COLUMN = "没有选中记录，无法进行操作！";
var CONTROL_UNIT_FIRST = "请选择相关组织机构再操作！";
var FORM_CHECK = "表单中存在不合法的项，请检查！";
var NO_PRIVILEGE = "您没有权限进行此操作！"
var SUBMIT_SUCCESS = "提交成功！";
var SUBMIT_FAIL = "提交失败！";
var MODIFY_SUCCESS = "修改成功！";
var MODIFY_FALL = "修改失败！";
var SERVER_ERROR = "不能连接到服务器！";
var PLATFORM = "运用软件平台";

//时间比较提示
var EARLY = "不能早于";
var LATER = "不能晚于";

//excel导出提示
var SEARCH_FIRST = "请先查询！";
var EMPTY = "数据为空！"

//按钮
var ADD = "添加";
var MODIFY = "修改";
var DELETE = "删除";
var EXCEL = "导出";
var SEARCH = "搜索";
var SAVE = "确定";
var CANCLE = "取消";
var RESET = "重置";
var ADDALL = "全选";
var DELETEALL = "全删";
var SELECT = "选择";
var OK = "确定";
var IMPORT = "导入";
var REFRESH = "刷新";
var CLOSE = "关闭";

var PLEASE_CHOOSE = "请选择";
var PLEASE_TYPE = "请输入";

//两棵树互相选择时
var SELECTED = "已选列表";
var SELECTING = "可选列表";

//保存或加载时
var WAITING = "请稍后";
var SAVING = "正在保存数据......";
var LOADING = "正在加载数据......";
var PORTING = "正在导入数据......";

// login
var LOGIN_TITLE = "用户登录";

var LOGIN_USERNAME = "用户名";
var LOGIN_PASSWORD = "密码";
var LOGIN_TO = "登录到";

var LOGIN_BTN_LOGIN = "登录";
var LOGIN_BTN_RESET = "重置";
var LOGIN_BTN_DOWNLOAD = "插件下载";

var LOGIN_CONTROL_CLIENT = "控制客户端";
var LOGIN_CONFIG_CLIENT = "配置客户端";
var LOGIN_PLATFORM = "管理平台";

var LOGIN_PLEASE_INPUT_USERNAME = "请输入用户名！";
var LOGIN_PLEASE_INPUT_PASSWORD = "请输入密码！";

var LOGIN_WAITING = "请稍后";
var LOGIN_LOGINNING = "正在登录系统......";
var MODIFY_PASSWORD = "修改密码";
var SHOW_VERSION = "版本信息";
var LOG_OUT = "退出";
var BACK = "返回管理平台";
var NO_RIGHTS = "您没有权限，请管理员分配权限！";
var LOG_OUT_FAIL = "退出系统失败！";
var LOG_OUT_CONFIRM = "确定要推出系统吗？";

var OLD_PASSWORD = "原密码";
var NEW_PASSWORD = "新密码";
var CONFIRM_PASSWORD = "确认密码";
var PASSWORD_CHECK = "新密码与确认密码输入不一致，请重新输入！";
var WRONG_PASSWORD = "原密码错误！";

// tip
var TIP = TIP ||{};
TIP.MUST_INTEGER = "必须为整数！";
TIP.VALUE_RANGE = "的取值范围：在";
TIP.VALUE_BETWEEN = "之间！";
TIP.WRONG_IP = "IP地址输入不正确！";
TIP.WRONG_EMAIL = "电子邮件格式不正确！";
TIP.WRONG_TIME = "时间格式输入错误，正确格式是：yyyy";
TIP.WRONG_PHONE = "手机号码格式不正确！";
TIP.IP = "该输入项必须是IP地址，格式如： '172.0.0.1'";
TIP.CHINESE = "该输入项不能为中文";
TIP.NUMBER = "该输入项由数字、26个英文字母或下划线组成";
TIP.DIFFERENT = "新密码与确认密码输入不一致";
TIP.WEBSERVER_ERR = "服务器连接出现异常，请稍候...";
TIP.ERROR = "用户账户已经过期或受限，确定将返回。";
TIP.SYSINFO = "系统消息";
TIP.SPACE = "不能输入全空格！";
TIP.CHARACTER = "不允许输入如下字符:(像;空格'\"\\,./?~!@#$%^&*()-+=_:<>|{})";
TIP.MOBILE = "住宅电话或手机号码格式输入错误！正确格式如88075998或13983561257或0714-22222222";