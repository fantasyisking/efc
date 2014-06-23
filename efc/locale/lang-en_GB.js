// global
var TIP_MESSAGE = "Message";//"提示信息";
var TIP_WARNING = "Warning";//"警告信息";
var TIP_ERROR = "Error";//"错误信息";
var TIP_CONFIRM = "Confirm";//"确认信息";

var SAVE_SUCCESS = "Save successfully!";//保存成功
var SAVE_FAIL = "Save Failed!";//保存失败
var DELETE_SUCCESS = "Delete successfully!";//删除成功
var DELETE_FAIL = "Delete Failed";//删除失败
var IMPORT_SUCCESS = "Import successfully!";//导入成功
var IMPORT_FAIL = "Import Failed!";//导入失败
var DELETE_CONFIRM = "Are you sure?";//确定吗
var ONLY_ONE_COLUMN = "Only one column can be selected!";//只能选中一条记录
var NO_COLUMN = "No column is selected!";//没有选中记录，无法操作
var CONTROL_UNIT_FIRST = "Please choose one site first!"//请先选择组织单元
var FORM_CHECK = "Please check the form first!";//表单有错误，请先检查
var NO_PRIVILEGE = "Sorry, No privilege!";//"您没有权限进行此操作！"
var SUBMIT_SUCCESS = "Submit successfully!";//"提交成功！";
var SUBMIT_FAIL = "Submit Failed!";//"提交失败！";
var MODIFY_SUCCESS = "Modify successfully!";//"修改成功！";
var MODIFY_FALL = "Modify Failed!";//"修改失败！";
var PLATFORM = "iVMS-7000v3.0";//"海康威视监控系统综合管理平台";
var SERVER_ERROR = "Can't connect to server!";//"服务器异常！";
//时间比较提示
var EARLY = " can't be earlier than ";//不能早于
var LATER = " can't be later than "//不能晚于

//excel导出提示
var SEARCH_FIRST = "Please search first!";//请先查询
var EMPTY = "No data!"//空数据

//按钮
var ADD = "Add ";//添加
var MODIFY = "Modify ";//修改
var DELETE = "Delete";//删除
var EXCEL = "Export";//导出
var SEARCH = "Search";//搜索
var SAVE = "Save";//保存
var CANCLE = "Cancle";//取消
var RESET = "Reset";//重置
var ADDALL = "Add all";//全选
var DELETEALL = "Delete all";//全删
var SELECT = "Select";//选择
var OK = "OK";//确定
var IMPORT = "Import";//导入
var REFRESH = "Fefresh";//刷新

var PLEASE_CHOOSE = "Please choose ";//请选择
var PLEASE_TYPE = "Please type ";//请输入

//两棵树互相选择时
var SELECTED = "Selected List";//已选列表
var SELECTING = "Selecting List";//可选列表

//保存或加载数据时
var WAITING = "Please Waiting"//请稍候
var SAVING = "Data Saving......";//正在保存数据 
var LOADING = "Data Loading......";//正在加载数据
var PORTING = "Data Importing......";//正在导入数据
// login
var LOGIN_TITLE = "User Login";//用户登录

var LOGIN_USERNAME = "Username";//用户名
var LOGIN_PASSWORD = "Password";//密码
var LOGIN_TO = "Login to";//登录到

var LOGIN_BTN_LOGIN = "Login";//登录
var LOGIN_BTN_RESET = "Reset";//重置
var LOGIN_BTN_DOWNLOAD = "Download";//插件下载

var LOGIN_CONTROL_CLIENT = "Control Client";//控制客户端
var LOGIN_CONFIG_CLIENT = "Config Client";//配置客户端
var LOGIN_PLATFORM = "Platform";//管理平台

var LOGIN_PLEASE_INPUT_USERNAME = "Please input username!";//请输入用户名
var LOGIN_PLEASE_INPUT_PASSWORD = "Please input password!";//请输入密码
var LOGIN_PLEASE_SELECT_DOMAINNUM = "Please select domainnum!";//请选择线路号

var LOGIN_WAITING = "waiting";//等待
var LOGIN_LOGINNING = "login......";//正在登录
var MODIFY_PASSWORD = "Modify Password";//修改密码
var SHOW_VERSION = "Version";//版本信息
var LOG_OUT = "Logout";//注销
var BACK = "Back to platform";//"返回管理平台";
var NO_RIGHTS = "You don't have the privileges to continue!";//无权限提示
var LOG_OUT_FAIL = "Logout Fail!"//"注销失败
var LOG_OUT_CONFIRM = "Are you sure you want to log out?";//确定注销提示

var OLD_PASSWORD = "Old Pin";
var NEW_PASSWORD = "New Pin";
var CONFIRM_PASSWORD = "Confirm Pin";
var PASSWORD_CHECK = "Please check the new pin and the confirm pin!";
var WRONG_PASSWORD = "The old pin is incorrect!";

// organize
var CONTROL_UNIT = "Site";//组织单元
var REGION = "Area";//监控区域

var CHANNEL = "Channel";

// tip
var TIP = TIP ||{};
TIP.MUST_INTEGER = "Has to be an Integer";//"不允许输入小数！";
TIP.VALUE_RANGE = " the vale should bewteen ";//"的取值范围：在";
TIP.VALUE_BETWEEN = " !";//"之间！";
TIP.WRONG_IP = "Incorrect IP format";//"IP地址输入不正确！";
TIP.WRONG_EMAIL = "Incorrect Email format";//"电子邮件格式不正确！";
TIP.WRONG_TIME = "Incorrect time format";//"时间格式输入错误，正确格式是：yyyy";
TIP.WRONG_PHONE = "Incorrect mobile phone format";//"手机号码格式不正确！";
TIP.IP = "IP format should be like 172.0.0.1";//"该输入项必须是IP地址，格式如： '172.0.0.0'";
TIP.CHINESE = "Can't be Chinese";//"该输入项不能为中文";
TIP.NUMBER = "Incorrect format!";//"该输入项由数字、26个英文字母或下划线组成";
TIP.DIFFERENT = "Different password";//"新密码与确认密码输入不一致";
TIP.WEBSERVER_ERR = "Failed to connect to servers, please try later...";//"服务器连接出现异常，请稍候...";
TIP.ERROR = "User account either expired or limited. Click OK to return.";
TIP.SYSINFO = "System Info";//"系统消息";
TIP.SPACE = "Can't be all space!";//"不能输入全空格！";
TIP.CHARACTER = "Characters like ;'\"\\,./?~!@#$%^&*()-+=_:<>|{} are not allowed!";//"不允许输入如下字符:(像!@#$%^&*等）";
TIP.MOBILE = "住宅电话或手机号码格式输入错误！正确格式如88075998或13956471257或0571-22222222";