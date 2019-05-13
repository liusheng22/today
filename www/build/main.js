webpackJsonp([0],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dayjs__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dayjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_dayjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dayjs_locale_zh_cn__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dayjs_locale_zh_cn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_dayjs_locale_zh_cn__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TodayPage = (function (_super) {
    __extends(TodayPage, _super);
    function TodayPage(navCtrl, navParams, toastCtrl, alertCtrl, storage, api, viewCtrl, loadingCtrl, 
        // private geolocation: Geolocation,
        el) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.toastCtrl = toastCtrl;
        _this.alertCtrl = alertCtrl;
        _this.storage = storage;
        _this.api = api;
        _this.viewCtrl = viewCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.el = el;
        _this.nowDate = {
            monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            year: '',
            month: '',
            day: '',
            date: ''
        };
        _this.isAddStatus = false;
        _this.groupList = [];
        _this.itemsList = [];
        _this.isShowShade = false;
        _this.isShowOtherShade = false;
        _this.isShowAddGroup = false;
        _this.isShowAddItems = false;
        _this.currentGroup = {
            idx: 0,
            name: ''
        };
        _this.currentEditItems = {
            groupIdx: 0,
            itemsIdx: 0,
            name: ''
        };
        _this.currentEditGroup = {
            groupIdx: 0,
            name: '',
            color: ''
        };
        _this.itemsTitleStyle = {
            off: {
                textDecoration: 'none',
                color: '#000'
            },
            on: {
                textDecoration: 'line-through',
                color: '#a6a6a6'
            }
        };
        _this.isShowEditItems = false;
        _this.isShowEditGroup = false;
        _this.isShowHeader = true;
        _this.count = 0;
        return _this;
    }
    TodayPage.prototype.ionViewDidLoad = function () {
        // 动态设置header背景图的宽高
        var header = document.querySelectorAll('.ion-page>.header')[0];
        var title_content = document.querySelectorAll('.title_content')[0];
        header['style']['width'] = document.body.scrollWidth + 'px';
        header['style']['height'] = document.body.scrollWidth / 1.875 + 'px ';
        title_content['style']['height'] = document.body.scrollWidth / 1.875 + 'px ';
        // 设置显示当前日期时间
        this.getTodayDate();
        // 获得今日天气
        this.getTodayWeather();
    };
    TodayPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.getLocationByBrowser();
        // this.getLocationByIp()
        // 地图绘画测试
        // this.mapTest()
        // 获取uid
        this.getUserId().then(function (val) {
            _this.uid = val;
            // 请求初始化数据
            _this.initUserInfo();
        });
        // 随机获得今日份today背景
        this.getTodayBg();
    };
    TodayPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    TodayPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TodayPage.prototype.getTodayBg = function () {
        var num = Math.floor(Math.random() * 13);
        this.el.nativeElement.querySelector('.ion-page .content').style.backgroundImage = "url('http://laijiayang.cn/todolist/imgs/today/bg_today_main/ (" + num + ").jpg')";
    };
    TodayPage.prototype.getTodayDate = function () {
        this.nowDate.year = __WEBPACK_IMPORTED_MODULE_5_dayjs___default()().format('YYYY');
        this.nowDate.month = this.nowDate.monthList[Number(__WEBPACK_IMPORTED_MODULE_5_dayjs___default()().format('M')) - 1];
        this.nowDate.day = __WEBPACK_IMPORTED_MODULE_5_dayjs___default()().format('DD');
        // setInterval(()=>{
        //   this.nowDate.date = dayjs().format('HH:mm:ss')
        // }, 1000)
    };
    TodayPage.prototype.getTodayWeather = function () {
        var _this = this;
        var location = 'auto_ip';
        this.api.getTodayWeather(location)
            .subscribe(function (f) {
            console.log(f);
            if (f["HeWeather6"][0]["status"] === 'ok') {
                _this.weather = f['HeWeather6'][0]['now'];
                console.log(_this.weather);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '天气信息获取失败，请检查网络');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.getTodayWeatherIcon = function () {
        return this.weather ?
            'https://cdn.heweather.com/cond_icon/' + this.weather.cond_code + '.png'
            :
                'https://cdn.heweather.com/cond_icon/999.png';
    };
    TodayPage.prototype.getTodayWeatherTmp = function () {
        return this.weather ? this.weather.tmp : '未知';
    };
    TodayPage.prototype.getTodayWeatherCondTxt = function () {
        return this.weather ? this.weather.cond_txt : '';
    };
    TodayPage.prototype.getUserTodayGroup = function () {
        var _this = this;
        // 获取用户待办事项组
        // var loading = super.showLoading(this.loadingCtrl,"loading...")
        this.api.todolistGroupList(this.uid)
            .subscribe(function (f) {
            console.log(f);
            if (f["status"] == true) {
                // loading.dismiss()
                _this.groupList = f['data'];
                _this.getUserTodayItems();
            }
            else {
                // loading.dismiss()
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.getUserTodayItems = function () {
        var _this = this;
        // 获取用户待办事项列表
        // var loading = super.showLoading(this.loadingCtrl,"loading...")
        var str = '';
        if (this.groupList.length) {
            this.groupList.forEach(function (v, i) {
                if (i + 1 === _this.groupList.length) {
                    str += v.gid;
                }
                else {
                    str += v.gid + ',';
                }
            });
        }
        this.api.todolistItemsList(this.uid, '', str)
            .subscribe(function (f) {
            console.log(f);
            if (f["status"] == true) {
                _this.itemsList = f['data'];
                // loading.dismiss()
            }
            else {
                // loading.dismiss()
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.initUserInfo = function () {
        var _this = this;
        this.api.userInfo(this.uid)
            .subscribe(function (f) {
            console.log(f);
            // 验证用户登录状态
            if (f["status"] == true) {
                _this.getUserTodayGroup();
                // this.dismiss()  //关闭当前页面
            }
            else {
                _super.prototype.showAlert.call(_this, _this.alertCtrl, '登录验证', '自动登录验证失败，可能用户信息已过期，请重新手动登录', '登录');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.showAddBtn = function () {
        var addBtn = document.querySelectorAll('.add_list .icon')[0];
        var add_list_name = document.querySelectorAll('.add_list .add_list_name')[0];
        var add_list_item = document.querySelectorAll('.add_list .add_list_item')[0];
        addBtn['style']['transform'] = 'rotate(45deg)';
        add_list_name.classList.add('add_list_name_addClass');
        add_list_item.classList.add('add_list_item_addClass');
        add_list_name['style']['display'] = 'block';
        add_list_item['style']['display'] = 'block';
        // add_list_name['style']['animation'] = 'nameMoveX 1s cubic-bezier(0,1.55,.99,-0.59) forwards'
        // add_list_item['style']['animation'] = 'itemMoveX 1s cubic-bezier(0,1.55,.99,-0.59) forwards'
        add_list_name['style']['animation'] = 'nameMoveX .5s ease-out forwards';
        add_list_item['style']['animation'] = 'itemMoveY .5s ease-out forwards';
        this.isAddStatus = true;
    };
    TodayPage.prototype.hideAddBtn = function () {
        var addBtn = document.querySelectorAll('.add_list .icon')[0];
        var add_list_name = document.querySelectorAll('.add_list .add_list_name')[0];
        var add_list_item = document.querySelectorAll('.add_list .add_list_item')[0];
        addBtn['style']['transform'] = 'rotate(0deg)';
        add_list_name.classList.remove('add_list_name_addClass');
        add_list_item.classList.remove('add_list_item_addClass');
        add_list_name['style']['animation'] = 'scaleSmall .5s linear forwards';
        add_list_item['style']['animation'] = 'scaleSmall .5s linear forwards';
        setTimeout(function () {
            add_list_name['style']['display'] = 'none';
            add_list_item['style']['display'] = 'none';
        }, 500);
        this.isAddStatus = false;
    };
    TodayPage.prototype.addBtnEvent = function (status) {
        if (!status) {
            this.showAddBtn();
        }
        else {
            this.hideAddBtn();
        }
    };
    TodayPage.prototype.addToDoGroup = function () {
        this.isShowAddGroup = true;
        this.isShowShade = true;
        this.groupName = '';
        this.hideAddBtn();
        this.openShade('.add_group_box', '.add_group_input');
    };
    TodayPage.prototype.addToDoItems = function () {
        var _this = this;
        this.isShowAddItems = true;
        this.isShowShade = true;
        this.itemsName = '';
        this.hideAddBtn();
        this.openShade('.add_items_box', '.add_items_input');
        setTimeout(function () {
            if (_this.groupList.length) {
                var add_items_list_box = document.querySelectorAll('.add_items_list_box .add_items_list')[0];
                add_items_list_box['classList']['add']('add_items_list_active');
                // 初始化当前 将要添加的组
                _this.currentGroup.name = add_items_list_box.innerHTML;
                _this.currentGroup.idx = 0;
            }
            else {
                document.querySelector('.add_items_list_box').innerHTML = '<div>请先添加一个待办组吧</div>';
            }
        }, 100);
    };
    /**
     *
     * @param status 是否为敲击键盘监听事件
     * @param str 组名称 (17个字 限字数，添加完之后 清空)
     * @param event 键盘事件
     */
    TodayPage.prototype.addToGroup = function (status, str, event) {
        var _this = this;
        var isNext;
        function bgColor() {
            var r = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        if (status) {
            if (event && event.keyCode == 13) {
                // 回车事件
                isNext = true;
            }
            else {
                isNext = false;
            }
        }
        else {
            isNext = true;
        }
        if (isNext) {
            if (this.groupName) {
                if (this.groupName.length <= 17) {
                    // 添加到组列表中
                    var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "loading...");
                    this.api.todolistAddGroup(this.uid, str, bgColor())
                        .subscribe(function (f) {
                        console.log(f);
                        // 验证用户登录状态
                        if (f["status"] == true) {
                            loading.dismiss();
                            _super.prototype.showToast.call(_this, _this.toastCtrl, f['msg']);
                        }
                        else {
                            loading.dismiss();
                        }
                    }, function (error) { return console.error('错误：' + error); });
                    // 重新渲染组列表
                    this.getUserTodayGroup();
                    // this.groupList.push({name: str, color: bgColor()})
                    this.groupName = '';
                }
                else {
                    this.toastCtrl.create({
                        message: '亲少打点字吧，17个字以下最好啦😊',
                        duration: 1500
                    }).present();
                }
            }
            else {
                this.toastCtrl.create({
                    message: '要输入名字哦，总不能让我给你写吧👿',
                    duration: 1500
                }).present();
            }
        }
    };
    /**
     *
     * @param status 是否为敲击键盘监听事件
     * @param str 成员名称 (限字数 14)
     * @param event 键盘事件
     */
    TodayPage.prototype.addToItems = function (status, str, event) {
        var _this = this;
        var isNext;
        if (status) {
            if (event && event.keyCode == 13) {
                // 回车事件
                isNext = true;
            }
            else {
                isNext = false;
            }
        }
        else {
            isNext = true;
        }
        if (isNext) {
            if (this.itemsName) {
                if (this.itemsName.length <= 14) {
                    if (this.currentGroup.name) {
                        // if(!this.itemsList[this.currentGroup.idx]){
                        //   this.itemsList[this.currentGroup.idx] = []
                        // }
                        // this.itemsList[this.currentGroup.idx].push({name: str, checked: false})
                        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "loading...");
                        var gid = this.groupList[this.currentGroup.idx].gid;
                        this.api.todolistAddItems(this.uid, gid, str)
                            .subscribe(function (f) {
                            console.log(f);
                            // 验证用户登录状态
                            if (f["status"] == true) {
                                loading.dismiss();
                                _super.prototype.showToast.call(_this, _this.toastCtrl, f['msg']);
                            }
                            else {
                                loading.dismiss();
                            }
                        }, function (error) { return console.error('错误：' + error); });
                        // 重新渲染组列表
                        this.getUserTodayGroup();
                        this.itemsName = '';
                        this.toastCtrl.create({
                            message: '已将 「' + str + '」 添加至 「' + this.currentGroup.name + '」 待办组',
                            duration: 1500
                        }).present();
                    }
                    else {
                        this.toastCtrl.create({
                            message: '请先添加一个待办组吧',
                            duration: 1500
                        }).present();
                    }
                }
                else {
                    this.toastCtrl.create({
                        message: '亲少打点字吧，14个字以下最好啦😊',
                        duration: 1500
                    }).present();
                }
            }
            else {
                this.toastCtrl.create({
                    message: '要输入事件哦，总不能让我给你写吧👿',
                    duration: 1500
                }).present();
            }
        }
    };
    TodayPage.prototype.checkAddItems = function (name, e) {
        // e.target.parentNode.children['remove']('add_items_list_active')
        var childrens = e.target.parentNode.children;
        for (var i = 0, len = childrens.length; i < len; i++) {
            childrens[i].classList['remove']('add_items_list_active');
            if (i < len - 1) {
                if (name === this.groupList[i].groups) {
                    this.currentGroup.idx = i;
                }
            }
        }
        e.target.classList['add']('add_items_list_active');
        this.currentGroup.name = name;
    };
    TodayPage.prototype.checked = function (groupIdx, itemsIdx, name, status, items) {
        var _this = this;
        items.close();
        this.currentEditItems.groupIdx = groupIdx;
        this.currentEditItems.itemsIdx = itemsIdx;
        this.currentEditItems.name = name;
        var gid = this.groupList[groupIdx].gid;
        var iid = this.itemsList[groupIdx][itemsIdx].iid;
        var isFinish = !status ? 1 : 0;
        var isDelete = this.itemsList[groupIdx][itemsIdx].is_delete;
        this.api.todolistUpdateItems(this.uid, gid, iid, name, isFinish, isDelete)
            .subscribe(function (f) {
            if (f["status"]) {
                // this.getUserTodayGroup()
                _this.itemsList[groupIdx][itemsIdx].is_finish = !status;
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '待办事项修改失败');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    /**
     * 打开 遮罩层
     */
    TodayPage.prototype.openShade = function (boxClassName, inputClassName) {
        var _this = this;
        this.boxClassName = boxClassName;
        setTimeout(function () {
            _this.el.nativeElement.querySelector(boxClassName).style.top = '95px';
            _this.el.nativeElement.querySelector('.close_shade').style.bottom = '40%';
            setTimeout(function () {
                _this.el.nativeElement.querySelector(inputClassName).focus();
                // this.editItemsInput.setFocus()
                // this.el.nativeElement.querySelector('.add_items_input input').focus()
                // document.querySelectorAll('.add_items_input')[0].setFocus()
            }, 150);
        });
        this.isShowShade = true;
        this.el.nativeElement.querySelector('.content').style.filter = 'blur(5px)';
        this.el.nativeElement.querySelector('.header').style.filter = 'blur(5px)';
    };
    /**
     * 关闭 遮罩层
     */
    TodayPage.prototype.closeShade = function () {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.querySelector(_this.boxClassName).style.top = '-150px';
            _this.el.nativeElement.querySelector('.close_shade').style.bottom = '0%';
            setTimeout(function () {
                _this.isShowAddGroup = false;
                _this.isShowAddItems = false;
                _this.isShowEditItems = false;
                _this.isShowEditGroup = false;
                _this.isShowShade = false;
            }, 500);
        });
        this.el.nativeElement.querySelector('.content').style.filter = 'none';
        this.el.nativeElement.querySelector('.header').style.filter = 'none';
    };
    /**
     * 编辑 待办事项
     * @param groupIdx 组下标
     * @param itemsIdx 组成员下标
     * @param name 待办事项名称
     * @param items
     */
    TodayPage.prototype.editItems = function (groupIdx, itemsIdx, name, items) {
        // this.currentEditItems.name = this.itemsList[groupIdx][itemsIdx].name
        items.close();
        this.currentEditItems = {
            groupIdx: groupIdx,
            itemsIdx: itemsIdx,
            name: name
        };
        this.isShowEditItems = true;
        this.openShade('.edit_items_box', '.add_items_input');
        // setTimeout(() => {
        //   this.el.nativeElement.querySelector('.edit_items_box').style.top = '95px'
        //   this.el.nativeElement.querySelector('.close_shade').style.bottom = '50%'
        //   setTimeout(() => {
        //     this.el.nativeElement.querySelector('.add_items_input').focus()
        //     // this.editItemsInput.setFocus()
        //     // this.el.nativeElement.querySelector('.add_items_input input').focus()
        //     // document.querySelectorAll('.add_items_input')[0].setFocus()
        //   },150)
        // })
    };
    TodayPage.prototype.editGroup = function (groupIdx, name, color) {
        this.currentEditGroup = {
            name: name,
            color: color,
            groupIdx: groupIdx
        };
        this.isShowEditGroup = true;
        this.openShade('.edit_group_box', '.add_group_input');
        // setTimeout(() => {
        //   this.el.nativeElement.querySelector('.add_group_input').focus()
        // },150)
    };
    /**
     *
     * @param status 是否为敲击键盘监听事件
     * @param str 成员名称 (限字数 14)
     * @param event 键盘事件
     */
    TodayPage.prototype.confirmItemsName = function (status, name, event) {
        var _this = this;
        var isNext;
        if (status) {
            if (event && event.keyCode == 13) {
                // 回车事件
                isNext = true;
            }
            else {
                isNext = false;
            }
        }
        else {
            isNext = true;
        }
        if (isNext) {
            var gid = this.groupList[this.currentEditItems.groupIdx].gid;
            var iid = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].iid;
            var isFinish = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].is_finish;
            var isDelete = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].is_delete;
            this.api.todolistUpdateItems(this.uid, gid, iid, name, isFinish, isDelete)
                .subscribe(function (f) {
                if (f["status"]) {
                    // this.getUserTodayGroup()
                    _this.itemsList[_this.currentEditItems.groupIdx][_this.currentEditItems.itemsIdx].items = name;
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, '待办事项修改失败');
                }
            }, function (error) { return console.error('错误：' + error); });
        }
    };
    TodayPage.prototype.confirmGroupName = function (name) {
        var _this = this;
        var gid = this.groupList[this.currentEditGroup.groupIdx].gid;
        var groups = name;
        var color = this.groupList[this.currentEditGroup.groupIdx].color;
        var isDelete = this.groupList[this.currentEditGroup.groupIdx].is_delete;
        this.api.todolistUpdateGroup(this.uid, gid, groups, color, isDelete)
            .subscribe(function (f) {
            if (f["status"]) {
                _this.getUserTodayGroup();
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '待办组名修改失败');
            }
        }, function (error) { return console.error('错误：' + error); });
        // this.groupList[this.currentEditGroup.groupIdx].name = name
    };
    TodayPage.prototype.deleteItems = function (groupIdx, itemsIdx, name, items) {
        var _this = this;
        items.close();
        this.currentEditItems.groupIdx = groupIdx;
        this.currentEditItems.itemsIdx = itemsIdx;
        this.currentEditItems.name = name;
        var gid = this.groupList[groupIdx].gid;
        var iid = this.itemsList[groupIdx][itemsIdx].iid;
        var isFinish = this.itemsList[groupIdx][itemsIdx].is_finish;
        var alert = this.alertCtrl.create({
            title: '删除',
            message: '删除待办组「' + this.groupList[groupIdx].groups + '」中待办事项「' + name + '」吗 ?',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        _this.toastCtrl.create({
                            message: '以后可要三思而后行哦',
                            duration: 1500
                        }).present();
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.api.todolistUpdateItems(_this.uid, gid, iid, name, isFinish, 1)
                            .subscribe(function (f) {
                            if (f["status"]) {
                                _this.itemsList[groupIdx].splice(itemsIdx, 1);
                            }
                            else {
                                _super.prototype.showToast.call(_this, _this.toastCtrl, '待办事项删除失败');
                            }
                        }, function (error) { return console.error('错误：' + error); });
                    }
                }
            ]
        });
        alert.present();
    };
    TodayPage.prototype.deleteGroup = function (groupIdx) {
        this.currentGroup.idx = groupIdx;
        this.isShowOtherShade = true;
        this.el.nativeElement.querySelectorAll('.close_other')[groupIdx].style.display = 'inline-block';
        this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.add('delete_group_shake');
    };
    TodayPage.prototype.closeOtherShade = function (isDelete, groupIdx) {
        var _this = this;
        if (groupIdx === void 0) { groupIdx = this.currentGroup.idx; }
        this.isShowOtherShade = false;
        this.el.nativeElement.querySelectorAll('.close_other')[groupIdx].style.display = 'none';
        this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.remove('delete_group_shake');
        if (isDelete) {
            this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.add('delete_group');
            setTimeout(function () {
                var gid = _this.groupList[groupIdx].gid;
                var groups = _this.groupList[groupIdx].groups;
                var color = _this.groupList[groupIdx].color;
                _this.api.todolistUpdateGroup(_this.uid, gid, groups, color, 1)
                    .subscribe(function (f) {
                    if (f["status"]) {
                        _this.groupList.splice(groupIdx, 1);
                        _this.itemsList.splice(groupIdx, 1);
                        _this.showHeader();
                    }
                    else {
                        _super.prototype.showToast.call(_this, _this.toastCtrl, '待办组删除失败');
                    }
                }, function (error) { return console.error('错误：' + error); });
            }, 700);
        }
    };
    TodayPage.prototype.getItemsList = function (i) {
        return this.itemsList[i];
    };
    TodayPage.prototype.colorPicker = function (val) {
        var _this = this;
        console.log(val);
        var gid = this.groupList[this.currentEditGroup.groupIdx].gid;
        var groups = this.groupList[this.currentEditGroup.groupIdx].groups;
        var isDelete = this.groupList[this.currentEditGroup.groupIdx].is_delete;
        this.api.todolistUpdateGroup(this.uid, gid, groups, val, isDelete)
            .subscribe(function (f) {
            if (f["status"]) {
                _this.currentEditGroup.color = val;
                _this.groupList[_this.currentEditGroup.groupIdx]['color'] = val;
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '待办组颜色修改失败');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.stopDefaultBlur = function () {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.querySelector('.color_selector').blur();
        }, 150);
    };
    TodayPage.prototype.editItemsDoubleClick = function (groupIdx, itemsIdx, name, items) {
        var _this = this;
        this.count++;
        setTimeout(function () {
            if (_this.count > 1) {
                _this.count = 0;
                _this.editItems(groupIdx, itemsIdx, name, items);
            }
            else {
                _this.count = 0;
            }
        }, 250);
    };
    TodayPage.prototype.showHeader = function () {
        if (this.groupList.length <= 2) {
            this.ionHeader.nativeElement.style.display = 'block';
            this.header._elementRef.nativeElement.style.opacity = 1;
        }
    };
    TodayPage.prototype.ionContentScroll = function (e) {
        // console.log(e)
        // 沉浸式
        var headerHeight = document.body.scrollWidth / 1.875;
        var opacity = (headerHeight - e.scrollTop) / headerHeight; //设置滚动距离300的时候导航栏消失
        this.header._elementRef.nativeElement.style.opacity = opacity;
        if (opacity > 0) {
            // console.log(this.header._elementRef)
            // console.log(this.ionHeader._elementRef)
            this.ionHeader.nativeElement.style.display = 'block';
        }
        else {
            this.ionHeader.nativeElement.style.display = 'none';
        }
        // let headerHeight = document.body.scrollWidth/1.875
        // // console.log(headerHeight, e.scrollTop)
        // if(e.scrollTop > 0){
        //   if(e.scrollTop >= 80){
        //     this.el.nativeElement.querySelector('.title_content').style.display = 'none'
        //   }
        //   if(headerHeight > e.scrollTop){
        //     this.el.nativeElement.querySelector('.ion-page .header').style.height = headerHeight - e.scrollTop + 'px'
        //     this.el.nativeElement.querySelector('.ion-page .content .fixed-content').style.marginTop = headerHeight - e.scrollTop + 'px'
        //     this.el.nativeElement.querySelector('.ion-page .content .scroll-content').style.marginTop = headerHeight - e.scrollTop + 'px'
        //     console.log(this.el.nativeElement.querySelector('.ion-page .header').style.height, e.scrollTop)
        //   }else{
        //     console.log(this.el.nativeElement.querySelector('.ion-page .header'))
        //     if(this.isShowHeader){
        //       this.isShowHeader = false
        //       this.el.nativeElement.querySelector('.ion-page .header').style.display = 'none'
        //     }
        //     // this.el.nativeElement.querySelector('.ion-page .content').style.height = document.body.scrollHeight + 'px'
        //     this.el.nativeElement.querySelector('.ion-page .content .fixed-content').style.marginTop = '0px'
        //     this.el.nativeElement.querySelector('.ion-page .content .scroll-content').style.marginTop ='0px'
        //   }
        //   // this.el.nativeElement.querySelector('.title_content').style.height = ''
        //   if(e.directionY == 'down'){
        //   }else{
        //     // content 往上滑 时候
        //     if(e.scrollTop <= 80){
        //       this.el.nativeElement.querySelector('.title_content').style.display = 'block'
        //     }
        //     this.el.nativeElement.querySelector('.ion-page .header').style.display = 'block'
        //   }
        // }else{
        //   this.el.nativeElement.querySelector('.ion-page .header').style.display = 'block'
        //   this.isShowHeader = true
        //   this.el.nativeElement.querySelector('.ion-page .content .fixed-content').style.marginTop = headerHeight + 'px'
        //   this.el.nativeElement.querySelector('.ion-page .content .scroll-content').style.marginTop = headerHeight + 'px'
        // }
    };
    TodayPage.prototype.saveUserLocation = function (address, business, lng, lat) {
        var _this = this;
        this.api.userLocation(this.uid, address, business, lng, lat)
            .subscribe(function (f) {
            if (f["status"]) {
                // 成功存入本次记录
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '用户地理位置失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    TodayPage.prototype.getLocationByBrowser = function () {
        // let locations = new BMap.Geolocation()
        // locations.getCurrentPosition( res => {
        //   console.log(res)
        //   alert(JSON.stringify(res))
        //   // super.showAlert(this.alertCtrl,'登录验证', res.address.altitude, '登录')
        // }, { 
        //   enableHighAccuracy: false,
        //   timeout:Infinity,
        //   MaximumAge:0,
        //   coorType: 'bd09ll'
        // })
        // var geolocation = new BMap.Geolocation();
        // // 开启SDK辅助定位
        // geolocation.enableSDKLocation();
        // geolocation.getCurrentPosition(function(r){
        //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //     var mk = new BMap.Marker(r.point);
        //     console.log('您的位置：'+r.point.lng+','+r.point.lat)
        //   }
        //   else {
        //     alert('failed'+this.getStatus());
        //   }        
        // }, { 
        //   enableHighAccuracy: false,
        //   timeout:Infinity,
        //   MaximumAge:0,
        //   coorType: 'bd09ll'
        // });
        var that = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var myGeo = new BMap.Geocoder();
                myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (rs) {
                    var lbs_point = '';
                    var address = '';
                    if (rs.surroundingPois.length > 0) {
                        lbs_point = rs.surroundingPois[0].point.lng + "," + rs.surroundingPois[0].point.lat;
                        address = rs.surroundingPois[0].title;
                    }
                    else {
                        lbs_point = rs.point.lng + "," + rs.point.lat;
                        address = rs.address;
                    }
                    console.log(rs);
                    that.saveUserLocation(rs.address, rs.business, rs.point.lng, rs.point.lat);
                });
            }
        }, {
            enableHighAccuracy: false
        });
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   console.log(resp)
        // }).catch((error) => {
        //   console.log('Error getting location', error);
        // });
        // let watch = this.geolocation.watchPosition();
        // watch.subscribe((data) => {
        //   console.log(data)
        // });
    };
    TodayPage.prototype.getLocationByIp = function () {
        var myCity = new BMap.LocalCity();
        myCity.get(function (result) {
            console.log(result);
            var cityName = result.name;
            console.log("当前定位城市:" + cityName);
        });
    };
    TodayPage.prototype.mapTest = function () {
        var myIcon = new BMap.Icon("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542011881784&di=479e68d4b134c4fdd40080ab6e57cbe2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c2ac57beb18d0000012e7eaa6d19.jpg%401280w_1l_2o_100sh.jpg", new BMap.Size(32, 32));
        var map = new BMap.Map(this.mapElement.nativeElement, {
            enableMapClick: true
        }); //创建地图实例
        map.enableScrollWheelZoom(); //启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //连续缩放效果，默认禁用
        var point = new BMap.Point(118.06, 24.27); //坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 8); //设置中心和地图显示级别
        var marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
        // var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        var opts = {
            width: 200,
            height: 100,
            title: "厦门东软慧聚科技有限公司",
            enableMessage: true,
            message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        };
        var infoWindow = new BMap.InfoWindow("地址：北京东软慧聚科技有限公司", opts); // 创建信息窗口对象 
        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
    };
    return TodayPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('hjmap'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], TodayPage.prototype, "mapElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('editItemsInput'),
    __metadata("design:type", Object)
], TodayPage.prototype, "editItemsInput", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])("header"),
    __metadata("design:type", Object)
], TodayPage.prototype, "header", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])("ionHeader"),
    __metadata("design:type", Object)
], TodayPage.prototype, "ionHeader", void 0);
TodayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-today',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\today\today.html"*/'<!-- 加入no-border让header无边框 -->\n<ion-header [hidden]="!isShowHeader" #ionHeader no-border >\n<!-- <ion-header #ionHeader no-border > -->\n  <!-- 加入transparent让header透明 -->\n  <ion-navbar transparent #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="title_content">\n      <div class="today_weather">\n        <img [src]="getTodayWeatherIcon()" alt="">\n      </div>\n      <div class="today_weather_temp">\n        {{getTodayWeatherTmp()}}°C\n        <a style="font-size:12px;color:#fff;">{{getTodayWeatherCondTxt()}}</a>\n      </div>\n      <div class="show_time">\n        <div class="show_time_year">{{nowDate.year}}</div>\n        <div class="show_time_month">{{nowDate.month}}</div>\n        <div class="show_time_today">{{nowDate.day}}</div>\n      </div>\n      <div class="show_time_date">{{nowDate.date}}</div>\n      <div class="today_text">\n        <img alt="今日诗词" src="https://v2.jinrishici.com/one.svg?font-size=20&spacing=2&color=gray">\n      </div>\n    </div>\n    <!-- <ion-title>Today</ion-title> -->\n  </ion-navbar>\n</ion-header>\n\n<!-- <ion-content > -->\n<ion-content (ionScroll)="ionContentScroll($event)" fullscreen >\n\n  <!-- 禁止其他操作 遮罩层 -->\n  <div class="disable_other_shade" *ngIf="isShowOtherShade" (tap)="closeOtherShade(false)" ></div>\n\n  <!-- 待办事项列表 -->\n  <div class="group_items_box" *ngFor="let v of groupList, let i = index" (press)="deleteGroup(i)" >\n    <div class="close_other" (tap)="closeOtherShade(true, i)"><ion-icon [style.color]="v.color" name="close"></ion-icon></div>\n    <div class="group_items_title" [style.backgroundColor]="v.color" (tap)="editGroup(i, v.groups, v.color)" >{{v.groups}}</div>\n    <div class="group_items">\n      <ion-list no-lines>\n        <!-- <ion-item-sliding #items *ngFor="let val of itemsList[i], let idx = index"> -->\n        <ion-item-sliding #items *ngFor="let val of getItemsList(i), let idx = index" (tap)="editItemsDoubleClick(i, idx, val.items, items)">\n          <ion-item >\n            <div [style.textDecorationColor]="val.color" [ngStyle]="val.is_finish?itemsTitleStyle.on:itemsTitleStyle.off" class="items_title">{{val.items}}</div>\n            <span class="items_checked_off" *ngIf="!val.is_finish" (tap)="checked(i, idx, val.items, val.is_finish, items)" ><ion-icon name="radio-button-off"></ion-icon></span>\n            <span class="items_checked_on" *ngIf="val.is_finish" (tap)="checked(i, idx, val.items, val.is_finish, items)" [style.color]="v.color" ><ion-icon name="checkmark-circle"></ion-icon></span>\n          </ion-item>\n          <ion-item-options side="left">\n            <button class="side_checked" ion-button *ngIf="!val.is_finish" (tap)="checked(i, idx, val.items, val.is_finish, items)" >\n              <ion-icon name="sad"></ion-icon>\n            </button>\n            <button class="side_checked" [style.backgroundColor]="v.color" style="color: #fff" ion-button *ngIf="val.is_finish" (tap)="checked(i, idx, val.items, val.is_finish, items)" >\n              <ion-icon name="happy"></ion-icon>\n            </button>\n          </ion-item-options>\n          <!-- color="secondary" -->\n          <ion-item-options side="right">\n            <button ion-button color="primary" (tap)="editItems(i, idx, val.items, items)" >\n              <ion-icon name="create"></ion-icon>\n              编辑\n            </button>\n            <button ion-button color="danger" (tap)="deleteItems(i, idx, val.items, items)" >\n              <ion-icon name="trash"></ion-icon>\n              删除\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </div>\n  </div>\n\n  <!-- 待办组为空时，提示添用户添加 -->\n  <div class="no_find_box" *ngIf="!groupList.length" >\n    <!-- <div id="hjmap" #hjmap></div> -->\n    <p>\n      今天什么事都没有，快添加点事儿做吧~\n    </p>\n    <a></a>\n  </div>\n\n</ion-content>\n\n<!-- 添加 待办 按钮 -->\n<div class="add_list" >\n  <ion-icon name="add" *ngIf="!isShowShade" (tap)="addBtnEvent(isAddStatus)" ></ion-icon>\n  <ion-icon name="add" *ngIf="isShowShade" ></ion-icon>\n  <div class="add_list_name" (tap)="addToDoGroup()" ></div>\n  <div class="add_list_item" (tap)="addToDoItems()" ></div>\n\n  <!-- <div>\n    <ion-icon name="create"></ion-icon>\n    <ion-icon name="document"></ion-icon>\n    <ion-icon name="paper"></ion-icon>\n  </div> -->\n</div>\n\n<!-- 弹出框 遮罩层 -->\n<div class="shade" *ngIf="isShowShade" (tap)="closeShade()" >\n  <div class="close_shade" (tap)="closeShade()" ><ion-icon name="close"></ion-icon></div>\n</div>\n\n<!-- 添加待办组 -->\n<div class="add_group_box" *ngIf="isShowAddGroup">\n  <div class="add_group_title">添加待办组</div>\n  <div class="add_group">\n    <div class="add_input_box">\n      <div class="add_group_input_box">\n        <input type="text" placeholder="请输入组名" class="add_group_input" [(ngModel)]="groupName" (keypress)=\'addToGroup(true, groupName, $event)\' >\n      </div>\n      <div class="add_group_event" (tap)="addToGroup(false, groupName)" >\n        <ion-icon name="checkmark"></ion-icon>\n      </div>\n    </div>\n    <div class="add_group_list_box">\n        <span>已有的待办组：</span>\n      <div *ngFor="let v of groupList" class="add_group_list" [style.backgroundColor]="v.color" >{{v.groups}}</div>\n    </div>\n  </div>\n</div>\n\n<!-- 添加待办事项 -->\n<div class="add_items_box" *ngIf="isShowAddItems">\n  <div class="add_items_title">添加待办事项</div>\n  <div class="add_items">\n    <div class="add_input_box">\n      <div class="add_items_input_box">\n        <input type="text" placeholder="请输入待办事项" class="add_items_input" [(ngModel)]="itemsName" (keypress)=\'addToItems(true, itemsName, $event)\' >\n      </div>\n      <div class="add_items_event" (tap)="addToItems(false, itemsName)" >\n        <ion-icon name="checkmark"></ion-icon>\n      </div>\n    </div>\n    <div class="add_items_list_box">\n      <span>添加到该组：</span>\n      <div *ngFor="let v of groupList" class="add_items_list" (tap)="checkAddItems(v.groups, $event)" >{{v.groups}}</div>\n    </div>\n  </div>\n</div>\n\n<!-- 编辑 待办事项名称 -->\n<div class="edit_items_box" *ngIf="isShowEditItems" >\n  <div class="edit_items">\n      <div class="add_input_box">\n        <div class="add_items_input_box">\n          <input type="text" #editItemsInput placeholder="请输入待办事项" class="add_items_input" [(ngModel)]="currentEditItems.name" (keypress)=\'confirmItemsName(true, currentEditItems.name, $event)\' >\n          <!-- <ion-input type="text" #editItemsInput placeholder="请输入待办事项" class="add_items_input" [(ngModel)]="currentEditItems.name" ></ion-input> -->\n        </div>\n        <div class="add_items_event" (tap)="confirmItemsName(false, currentEditItems.name)" >\n          <ion-icon name="checkmark"></ion-icon>\n        </div>\n      </div>\n  </div>\n</div>\n\n<!-- 编辑 待办事项组名 & 组颜色 -->\n<div class="edit_group_box" *ngIf="isShowEditGroup" >\n  <div class="edit_group_title" [style.backgroundColor]="currentEditGroup.color" >修改待办组</div>\n  <div class="edit_group">\n      <div class="add_input_box">\n        <div class="add_group_input_box">\n          <input type="text" placeholder="请输入待办组" class="add_group_input" [(ngModel)]="currentEditGroup.name" >\n        </div>\n        <input class="color_selector" value="点击选色"\n          [style.background]="currentEditGroup.color"\n          [cpAlphaChannel]="\'always\'"\n          [cpOutputFormat]="\'rgba\'"\n          (tap)="stopDefaultBlur()"\n          [(colorPicker)]="currentEditGroup.color"\n          (colorPickerChange)="colorPicker($event)" />\n\n        <!-- https://segmentfault.com/a/1190000014777946 -->\n        <!-- dayjs的api  https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/API-reference.md#%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4 -->\n        <!-- 小米天气接口介绍   https://raw.githubusercontent.com/jokermonn/-Api/master/XiaomiWeather.md -->\n        <!-- 小米天气接口  https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=22.529605019869&longitude=113.94339045511&isLocated=true&locationKey=weathercn%101280601&days=7&appKey=weather20181219&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh_cn -->\n        <!-- 地区 id  https://github.com/jokermonn/-Api/blob/master/Meizu_cities.json -->\n        <!-- 已完成： 双击编辑 、 获得input焦点 、 遮罩层模糊 、 编辑框动画效果  、 向下滚动隐藏顶部 、  -->\n        <!-- 1、要监听 上下滑动事件，来判断删除完的 待办组之后 ，再也无法显示header的问题 -->\n        <!-- 2、要让header消失和隐藏更平滑 & 滑动太快导致header样式问题 & 只有三个待办组时,不能向下滑动到header隐藏 -->\n        <!-- 待办空空如也，快添加一些吧，跟换添加按钮为ionic组件 -->\n        <div class="add_group_event" (tap)="confirmGroupName(currentEditGroup.name)" >\n          <ion-icon name="checkmark"></ion-icon>\n        </div>\n      </div>\n  </div>\n</div>'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\today\today.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _k || Object])
], TodayPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=today.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 207:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 207;

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__today_today__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_setting__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reactiontime_reactiontime__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__memory_memory__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__number_memory_number_memory__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__feedback_feedback__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MenuPage = (function (_super) {
    __extends(MenuPage, _super);
    function MenuPage(navCtrl, navParams, storage, api, alertCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.storage = storage;
        _this.api = api;
        _this.alertCtrl = alertCtrl;
        _this.isShowIonNav = false;
        _this.isShowDisplay = 'none';
        _this.pages = [
            { title: '今日待办', pageName: '今日待办', tabComponent: __WEBPACK_IMPORTED_MODULE_0__today_today__["a" /* TodayPage */], icon: 'home', color: 'danger' },
            { title: '方块记忆', pageName: '方块记忆', tabComponent: __WEBPACK_IMPORTED_MODULE_5__memory_memory__["a" /* MemoryPage */], icon: 'bulb' },
            { title: '数字记忆', pageName: '数字记忆', tabComponent: __WEBPACK_IMPORTED_MODULE_6__number_memory_number_memory__["a" /* NumberMemoryPage */], icon: 'bulb' },
            { title: '反应时间', pageName: '反应时间', tabComponent: __WEBPACK_IMPORTED_MODULE_4__reactiontime_reactiontime__["a" /* ReactiontimePage */], icon: 'bulb' },
            // { title: '待办备忘', pageName: '待办备忘', tabComponent: ToDoListPage, icon: 'contacts' },
            { title: '意见反馈', pageName: '意见反馈', tabComponent: __WEBPACK_IMPORTED_MODULE_7__feedback_feedback__["a" /* FeedbackPage */], icon: 'contacts' },
        ];
        return _this;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.rootPage = _this.uid ? __WEBPACK_IMPORTED_MODULE_0__today_today__["a" /* TodayPage */] : __WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */];
            // this.rootPage = this.uid ? SettingPage : RegisterPage
            _this.initUserInfo();
        });
    };
    MenuPage.prototype.ionViewDidEnter = function () {
    };
    MenuPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    MenuPage.prototype.initUserInfo = function () {
        var _this = this;
        this.api.userInfo(this.uid)
            .subscribe(function (f) {
            console.log(f);
            // 验证用户登录状态
            if (f["status"] == true) {
                _this.userInfo = f['data'];
            }
            else {
                _super.prototype.showAlert.call(_this, _this.alertCtrl, '登录验证', '自动登录验证失败，可能用户信息已过期，请重新手动登录', '登录');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    MenuPage.prototype.getUserAvatar = function () {
        return this.userInfo ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.userInfo['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    MenuPage.prototype.getUserIntro = function () {
        return this.userInfo ?
            this.userInfo['intro'] ? this.userInfo['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    MenuPage.prototype.getUserNickname = function () {
        return this.userInfo ?
            this.userInfo['nickname'] ? this.userInfo['nickname'] : this.userInfo['uname']
            :
                '没有获取用户信息';
    };
    MenuPage.prototype.openPage = function (page) {
        var params = {};
        // The index is equal to the order of our tabs inside tabs.ts
        if (page.index) {
            params = { tabIndex: page.index };
        }
        console.log(this.nav.getActiveChildNav());
        // The active child nav is our Tabs Navigation
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else if (page.index != undefined) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */], params);
        }
        else {
            // Tabs are not active, so reset the root page 
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(page.tabComponent, params);
        }
    };
    MenuPage.prototype.isActive = function (page) {
        // return page.color
        // Again the Tabs Navigation
        var childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        // Fallback needed when there is no active childnav (tabs not active)
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        return;
    };
    MenuPage.prototype.toSetting = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__setting_setting__["a" /* SettingPage */]);
    };
    return MenuPage;
}(__WEBPACK_IMPORTED_MODULE_12__common_baseui__["a" /* BaseUi */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["h" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["h" /* Nav */]) === "function" && _a || Object)
], MenuPage.prototype, "nav", void 0);
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>\n        <div style="height: 162px;width:100%;position: relative;">\n            <ion-chip class="avatar_user">\n                <ion-avatar>\n                  <!-- <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"> -->\n                  <img [src]="getUserAvatar()">\n                </ion-avatar>\n                <ion-label>{{getUserNickname()}}</ion-label>\n            </ion-chip>\n            <div class="intro_user">\n              <p>{{getUserIntro()}}</p>\n            </div>\n            <div class="setting_user">\n              <ion-icon name="settings" (click)="toSetting()" ></ion-icon>\n            </div>\n        </div>\n      </ion-title>\n      <!-- <div style="height: 180px;width:100%;">\n        11\n      </div> -->\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let page of pages" (click)="openPage(page)">\n      	<ion-icon item-start [name]="page.icon" [color]="isActive(page)"></ion-icon>\n        {{page.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" [hidden]="isShowIonNav" ></ion-nav>\n<!-- <ion-nav [root]="SpecialPage" #content swipeBackEnabled="false" ></ion-nav> -->'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\menu\menu.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["i" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["j" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_11__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__providers_api_api__["a" /* ApiProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object])
], MenuPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApiProvider = (function () {
    function ApiProvider(http, https) {
        this.http = http;
        this.https = https;
        // ip = 'http://127.0.0.1:3000';  //本地
        // ip = 'http://www.laiwenge.com';  //服务器
        // ip = 'http://120.79.138.215:3000';  //自己服务器
        this.ip = 'http://laijiayang.cn:3000'; //自己服务器
        //后端数据API
        //user
        this.UserRegister = this.ip + '/user/register';
        this.UserLogin = this.ip + '/user/login';
        this.UserUserInfo = this.ip + '/user/userInfo';
        this.MemoryAdd = this.ip + '/memory/add';
        this.MemoryList = this.ip + '/memory/list';
        this.NumberMemoryAdd = this.ip + '/numberMemory/add';
        this.NumberMemoryLog = this.ip + '/numberMemory/log';
        this.NumberMemoryList = this.ip + '/numberMemory/list';
        this.ReactionTimeAdd = this.ip + '/reactionTime/add';
        this.ReactionTimeList = this.ip + '/reactionTime/list';
        this.TodolistAddGroup = this.ip + '/todolist/addGroup';
        this.TodolistAddItems = this.ip + '/todolist/addItems';
        this.TodolistGroupList = this.ip + '/todolist/groupList';
        this.TodolistItemsList = this.ip + '/todolist/itemsList';
        this.TodolistUpdateGroup = this.ip + '/todolist/updateGroup';
        this.TodolistUpdateItems = this.ip + '/todolist/updateItems';
        this.UserLocation = this.ip + '/user/location';
        this.UserQuestion = this.ip + '/user/question';
        this.UserUpdate = this.ip + '/user/update';
        //后端数据API-end
        // 第三方API
        this.WeatherApi = 'https://free-api.heweather.net/s6/weather/now';
        // console.log('Hello RestProvider Provider');
    }
    ApiProvider.prototype.register = function (uname, upwd, phone, email) {
        return this.getUrlReturn(this.UserRegister + ("?uname=" + uname + "&upwd=" + upwd + "&phone=" + phone + "&email=" + email + " "));
    };
    ApiProvider.prototype.login = function (upwd, phone) {
        return this.getUrlReturn(this.UserLogin + ("?upwd=" + upwd + "&phone=" + phone + " "));
    };
    ApiProvider.prototype.userInfo = function (uid) {
        return this.getUrlReturn(this.UserUserInfo + ("?uid=" + uid + " "));
    };
    ApiProvider.prototype.memoryAdd = function (uid, level, reverseNum, combo, score, maxLevel, isValid) {
        return this.getUrlReturn(this.MemoryAdd + ("?uid=" + uid + "&level=" + level + "&reverseNum=" + reverseNum + "&combo=" + combo + "&score=" + score + "&maxLevel=" + maxLevel + "&isValid=" + isValid + " "));
    };
    ApiProvider.prototype.memoryList = function (uid) {
        return this.getUrlReturn(this.MemoryList + ("?uid=" + uid + " "));
    };
    ApiProvider.prototype.numberMemoryAdd = function (uid, level, number, answer) {
        return this.getUrlReturn(this.NumberMemoryAdd + ("?uid=" + uid + "&level=" + level + "&number=" + number + "&answer=" + answer + " "));
    };
    ApiProvider.prototype.numberMemoryLog = function (uid, level, number, answer, isAnswer) {
        return this.getUrlReturn(this.NumberMemoryLog + ("?uid=" + uid + "&level=" + level + "&number=" + number + "&answer=" + answer + "&isAnswer=" + isAnswer + " "));
    };
    ApiProvider.prototype.numberMemoryList = function (uid) {
        return this.getUrlReturn(this.NumberMemoryList + ("?uid=" + uid + " "));
    };
    ApiProvider.prototype.reactionTimeAdd = function (uid, time, isValid) {
        return this.getUrlReturn(this.ReactionTimeAdd + ("?uid=" + uid + "&time=" + time + "&isValid=" + isValid + " "));
    };
    ApiProvider.prototype.reactionTimeList = function (uid) {
        return this.getUrlReturn(this.ReactionTimeList + ("?uid=" + uid + " "));
    };
    ApiProvider.prototype.todolistAddGroup = function (uid, groups, color) {
        return this.getUrlReturn(this.TodolistAddGroup + ("?uid=" + uid + "&groups=" + groups + "&color=" + color + " "));
    };
    ApiProvider.prototype.todolistAddItems = function (uid, gid, items) {
        return this.getUrlReturn(this.TodolistAddItems + ("?uid=" + uid + "&gid=" + gid + "&items=" + items + " "));
    };
    ApiProvider.prototype.todolistGroupList = function (uid) {
        return this.getUrlReturn(this.TodolistGroupList + ("?uid=" + uid + " "));
    };
    ApiProvider.prototype.todolistItemsList = function (uid, gid, gidArr) {
        return this.getUrlReturn(this.TodolistItemsList + ("?uid=" + uid + "&gid=" + gid + "&gidArr=" + gidArr + " "));
    };
    ApiProvider.prototype.todolistUpdateGroup = function (uid, gid, groups, color, isDelete) {
        return this.getUrlReturn(this.TodolistUpdateGroup + ("?uid=" + uid + "&gid=" + gid + "&groups=" + groups + "&color=" + color + "&isDelete=" + isDelete + " "));
    };
    ApiProvider.prototype.todolistUpdateItems = function (uid, gid, iid, items, isFinish, isDelete) {
        return this.getUrlReturn(this.TodolistUpdateItems + ("?uid=" + uid + "&gid=" + gid + "&iid=" + iid + "&items=" + items + "&isFinish=" + isFinish + "&isDelete=" + isDelete + " "));
    };
    ApiProvider.prototype.getTodayWeather = function (location) {
        return this.getUrlReturn(this.WeatherApi + ("?location=" + location + "&key=986e815a614d4b3baedcccf0b62a91ec "));
    };
    ApiProvider.prototype.userLocation = function (uid, address, business, longitude, latitude) {
        return this.getUrlReturn(this.UserLocation + ("?uid=" + uid + "&address=" + address + "&business=" + business + "&longitude=" + longitude + "&latitude=" + latitude + " "));
    };
    ApiProvider.prototype.userQuestion = function (uid, question, contact) {
        return this.getUrlReturn(this.UserQuestion + ("?uid=" + uid + "&question=" + question + "&contact=" + contact + " "));
    };
    ApiProvider.prototype.userUpdate = function (uid, nickname, gender, phone, email, avatar, address, intro) {
        return this.getUrlReturn(this.UserUpdate + ("?uid=" + uid + "&nickname=" + nickname + "&gender=" + gender + "&phone=" + phone + "&email=" + email + "&avatar=" + avatar + "&address=" + address + "&intro=" + intro + " "));
    };
    /**
     * 全局获取 http 请求的方法
     *
     * @private
     * @param {string} url
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    ApiProvider.prototype.getUrlReturn = function (url) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * 处理接口返回的数据  处理成json格式
     *
     * @private
     * @param {Response} res
     * @returns
     * @memberof RestProvider
     */
    ApiProvider.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ApiProvider.prototype.hideTabs = function () {
        var scrollContent = document.querySelectorAll('.scroll-content');
        Object.keys(scrollContent).map(function (key) {
            scrollContent[key].style.marginBottom = '0px';
        });
        var fixedContent = document.querySelectorAll('.fixed-content');
        Object.keys(scrollContent).map(function (key) {
            scrollContent[key].style.marginBottom = '0px';
        });
        var tabbarElem = document.querySelectorAll('.tabbar');
        Object.keys(tabbarElem).map(function (key) {
            tabbarElem[key].style.display = 'none';
        });
    };
    ApiProvider.prototype.showTabs = function () {
        var scrollContent = document.querySelectorAll('.scroll-content');
        Object.keys(scrollContent).map(function (key) {
            scrollContent[key].style.marginBottom = '67px';
        });
        var fixedContent = document.querySelectorAll('.fixed-content');
        Object.keys(scrollContent).map(function (key) {
            scrollContent[key].style.marginBottom = '67px';
        });
        var tabbarElem = document.querySelectorAll('.tabbar');
        Object.keys(tabbarElem).map(function (key) {
            tabbarElem[key].style.display = 'flex';
        });
    };
    /**
     * 处理请求中的错误，考虑了各种情况的错误处理并处理在 console 中显示 error
     *
     * @private
     * @param {(Response | any)} error
     * @returns
     * @memberof RestProvider
     */
    ApiProvider.prototype.handleError = function (error) {
        var errMsg;
        //instanceof 判断是否为Respones
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */]) {
            var body = error.json() || "";
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.status || "") + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return ApiProvider;
}());
ApiProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */]) === "function" && _b || Object])
], ApiProvider);

var _a, _b;
//# sourceMappingURL=api.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseUi; });
/**
 * UI 层的所有公共方法的抽象类
 *
 * @export
 * @abstract
 * @class BaseUi
 */
var BaseUi = (function () {
    function BaseUi() {
    }
    /**
     * 通用的展示 loading 组件
     *
     * @protected
     * @param {LoadingController} loadingCtrl 展示等待框
     * @param {string} message 显示消息
     * @returns {Loading}
     * @memberof BaseUi
     */
    BaseUi.prototype.showLoading = function (loadingCtrl, message) {
        var loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面变化的时候自动关闭loading
        });
        loader.present();
        return loader;
    };
    /**
     * 通用的展示 toast 组件
     *
     * @protected
     * @param {ToastController} toastCtrl  3秒提示框toast组件
     * @param {string} message 提示的消息
     * @returns {Toast}
     * @memberof BaseUi
     */
    BaseUi.prototype.showToast = function (toastCtrl, message) {
        var toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    /**
     * 通用的 alert 组件
     *
     * @param alertCtrl     alert提示框
     * @param til   弹出框的标题
     * @param content   弹出框的内容
     * @param btnName   确认按钮的名字
     */
    BaseUi.prototype.showAlert = function (alertCtrl, til, content, btnName) {
        var alert = alertCtrl.create({
            title: til,
            subTitle: content,
            buttons: [btnName]
        });
        alert.present();
        return alert;
    };
    return BaseUi;
}());

//# sourceMappingURL=baseui.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__to_do_list_to_do_list__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab1_tab1__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage(navParams) {
        // tab1Root: any = TodayPage;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__tab1_tab1__["a" /* Tab1Page */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_0__to_do_list_to_do_list__["a" /* ToDoListPage */];
        this.hideNavBar = false;
        // Set the active tab based on the passed index from menu.ts
        this.myIndex = navParams.data.tabIndex || 0;
        this.hideNavBar = true;
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\tabs\tabs.html"*/'<ion-tabs [selectedIndex]="myIndex">\n  <ion-tab [root]="tab1Root" tabTitle="Today" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="To do List" tabIcon="contacts"></ion-tab>\n  <!-- <ion-tab [root]="tab2Root" tabTitle="Tab 2" tabIcon="contacts" show=false></ion-tab > -->\n</ion-tabs>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\tabs\tabs.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]) === "function" && _a || Object])
], TabsPage);

var _a;
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToDoListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ToDoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ToDoListPage = (function () {
    function ToDoListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ToDoListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ToDoListPage');
    };
    return ToDoListPage;
}());
ToDoListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-to-do-list',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\to-do-list\to-do-list.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>toDoList</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<h3>toDoList page</h3>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\to-do-list\to-do-list.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], ToDoListPage);

var _a, _b;
//# sourceMappingURL=to-do-list.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tab1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Tab1Page = (function () {
    function Tab1Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Tab1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Tab1Page');
    };
    return Tab1Page;
}());
Tab1Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tab1',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\tab1\tab1.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Tab 1</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<h3>Tab 1 page</h3>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\tab1\tab1.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], Tab1Page);

var _a, _b;
//# sourceMappingURL=tab1.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu__ = __webpack_require__(254);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function (_super) {
    __extends(RegisterPage, _super);
    function RegisterPage(navCtrl, navParams, api, storage, alertCtrl, toastCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.api = api;
        _this.storage = storage;
        _this.alertCtrl = alertCtrl;
        _this.toastCtrl = toastCtrl;
        _this.isShowUserInfo = 0;
        _this.message = '';
        _this.userInfo = [
            {
                nickname: '',
                value: '',
                id: 'nickname',
                placeholder: '请输入昵称',
                text: '请输入昵称'
            },
            {
                pwd: '',
                value: '',
                id: 'pwd',
                placeholder: '请输入密码',
                text: '请输入密码',
            },
            {
                mobile: '',
                value: '',
                id: 'mobile',
                placeholder: '请输入手机号',
                text: '请输入手机号',
            },
            {
                email: '',
                value: '',
                id: 'email',
                placeholder: '请输入Email',
                text: '请输入Email',
            },
            {
                confirmPwd: '',
                value: '',
                id: 'confirmPwd',
                placeholder: '请确认密码',
                text: '请确认密码',
            }
        ];
        _this.showSwipe = {
            left: {
                isShow: true,
                isSwipe: false
            },
            right: {
                isShow: false,
                isSwipe: false
            },
            back: {
                isShow: false,
                isSwipe: false
            }
        };
        _this.login = {
            tel: {
                placeholder: "请输入手机号",
                text: "请输入手机号",
                value: ""
            },
            pwd: {
                placeholder: "请输入密码",
                text: "请输入密码",
                value: ""
            }
        };
        return _this;
    }
    RegisterPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var bg_login = document.querySelectorAll('.bg_login')[0];
        bg_login['style']['width'] = document.body.scrollHeight + 'px';
        bg_login['style']['height'] = document.body.scrollWidth + 'px';
        // bg_login['style']['width'] = document.body.scrollWidth + 'px'
        // bg_login['style']['height'] = document.body.scrollHeight + 'px'
        // content_right
        var content_right = document.querySelectorAll('.content_right')[0];
        content_right['style']['width'] = document.body.scrollWidth + 'px';
        content_right['style']['height'] = document.body.scrollHeight + 'px';
        content_right['style']['left'] = document.body.scrollWidth + 'px';
        this.getUserId().then(function (val) { _this.uid = val; });
    };
    RegisterPage.prototype.setUserId = function (uid) {
        this.storage.set('uid', uid);
    };
    RegisterPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    RegisterPage.prototype.input = function () {
        // console.log(this.userInfo.nickname.nickname)
    };
    RegisterPage.prototype.focus = function (i) {
        this.userInfo[i].placeholder = '';
        var label = document.querySelectorAll('.input_label')[0];
        label['style']['bottom'] = '35px';
        label['style']['opacity'] = '1';
    };
    RegisterPage.prototype.blur = function (i) {
        this.userInfo[i].placeholder = this.userInfo[i].text;
        var label = document.querySelectorAll('.input_label')[0];
        if (this.userInfo[i].value) {
            label['style']['bottom'] = '35px';
            label['style']['opacity'] = 1;
        }
        else {
            label['style']['bottom'] = '0px';
            label['style']['opacity'] = 0;
        }
    };
    RegisterPage.prototype.next = function (i) {
        // const toast = this.toastCtrl.create({
        //   message: '操作太快了，慢点哦',
        //   duration: 1000
        // });
        // toast.present();
        var _this = this;
        var next = document.querySelectorAll('.next_after')[0];
        var bg_animate = document.querySelectorAll('.bg_animate')[0];
        var bg_register = document.querySelectorAll('.bg_register')[0];
        var clientWidth = document.body.clientWidth;
        next['style']['width'] = '200px';
        next['style']['opacity'] = 1;
        bg_animate['style']['width'] = (i + 1) * 20 + '%';
        setTimeout(function () {
            _this.isShowUserInfo++;
            if (!_this.showSwipe.back.isSwipe) {
                if (_this.isShowUserInfo == 1) {
                    _this.showSwipe.back.isShow = true;
                }
            }
            if (_this.isShowUserInfo === _this.userInfo.length) {
                // 校验两次输入的密码一致性
                if (_this.userInfo[1]['value'] === _this.userInfo[4]['value']) {
                    var uname = _this.userInfo[0]['value'];
                    var upwd = _this.userInfo[1]['value'];
                    var phone = _this.userInfo[2]['value'];
                    var email = _this.userInfo[3]['value'];
                    // 调用注册接口
                    _this.api.register(uname, upwd, phone, email)
                        .subscribe(function (f) {
                        if (f["status"] == true) {
                            setTimeout(function () {
                                _this.message = '注册成功, 跳转登录...';
                                setTimeout(function () {
                                    _this.onDragLeft();
                                }, 300);
                            }, 300);
                        }
                        else {
                            _super.prototype.showToast.call(_this, _this.toastCtrl, f['msg']);
                        }
                    }, function (error) { return console.error('错误：' + error); });
                }
                else {
                    _super.prototype.showAlert.call(_this, _this.alertCtrl, '密码验证', '两次密码输入不一致，请重新输入', '好叭~');
                }
                // setTimeout(() => {
                //   bg_animate['style']['width'] = 0
                //   setTimeout(() => {
                //     bg_register['style']['width'] = 0
                //     setTimeout(() => {
                //       let toasts = document.querySelectorAll('.toast')[0]
                //       toasts['style']['display'] = 'block'
                //       toasts['style']['opacity'] = 0
                //       this.navCtrl.setRoot(LoginPage)
                //     }, 100);
                //   }, 800);
                // }, 800);
            }
        }, 800);
    };
    RegisterPage.prototype.onDragLeft = function () {
        var _this = this;
        this.showSwipe.left.isShow = false;
        this.showSwipe.back.isShow = false;
        var content_right = document.querySelectorAll('.content_right')[0];
        var bg_register = document.querySelectorAll('.bg_register')[0];
        var bg_login = document.querySelectorAll('.bg_login')[0];
        bg_login['style']['display'] = 'block';
        setTimeout(function () {
            bg_register['style']['transform'] = 'rotate(-90deg)';
            bg_register['style']['transform-origin'] = '0 100%';
            bg_login['style']['transform'] = 'rotate(-90deg)';
            bg_login['style']['transform-origin'] = '0 0';
            if (!_this.showSwipe.left.isSwipe) {
                _this.showSwipe.right.isShow = true;
                _this.showSwipe.left.isSwipe = true;
            }
            setTimeout(function () {
                content_right['style']['left'] = 0 + 'px';
                // bg_register['style']['display'] = 'none'
            }, 500);
        }, 100);
    };
    RegisterPage.prototype.onDragRight = function () {
        var content_right = document.querySelectorAll('.content_right')[0];
        var bg_register = document.querySelectorAll('.bg_register')[0];
        var bg_login = document.querySelectorAll('.bg_login')[0];
        bg_register['style']['transform'] = 'rotate(0deg)';
        bg_register['style']['transform-origin'] = '0 100%';
        bg_login['style']['transform'] = 'rotate(0deg)';
        bg_login['style']['transform-origin'] = '0 0';
        bg_login['style']['display'] = 'none';
        this.showSwipe.right.isShow = false;
        this.showSwipe.right.isSwipe = true;
        content_right['style']['left'] = document.body.scrollWidth + 'px';
    };
    RegisterPage.prototype.backLastInput = function () {
        if (this.isShowUserInfo >= 1) {
            if (!this.showSwipe.back.isSwipe) {
                this.showSwipe.back.isShow = false;
                this.showSwipe.back.isSwipe = true;
            }
        }
        if (this.isShowUserInfo > 0) {
            var i = this.isShowUserInfo;
            var bg_animate = document.querySelectorAll('.bg_animate')[0];
            bg_animate['style']['width'] = (i - 1) * 20 + '%';
            this.isShowUserInfo = i - 1;
        }
        else {
            var toast = this.toastCtrl.create({
                message: '我是有底线的，不能再退了',
                duration: 1000
            });
            toast.present();
        }
    };
    RegisterPage.prototype.loginFocus = function (isPwd) {
        var tel_input = document.querySelectorAll('.tel_input')[0];
        var pwd_input = document.querySelectorAll('.pwd_input')[0];
        if (!isPwd) {
            tel_input['style']['borderBottomLeftRadius'] = '100% 50%';
            tel_input['style']['borderBottomRightRadius'] = '100% 50%';
        }
        else {
            pwd_input['style']['borderBottomLeftRadius'] = '100% 40%';
            pwd_input['style']['borderBottomRightRadius'] = '100% 40%';
        }
        setTimeout(function () {
            tel_input['style']['borderRadius'] = '6px';
            pwd_input['style']['borderRadius'] = '6px';
        }, 300);
    };
    RegisterPage.prototype.loginBlur = function (isPwd) {
        var tel_input = document.querySelectorAll('.tel_input')[0];
        var pwd_input = document.querySelectorAll('.pwd_input')[0];
        if (!isPwd) {
            tel_input['style']['borderRadius'] = '6px';
        }
        else {
            pwd_input['style']['borderRadius'] = '6px';
        }
    };
    RegisterPage.prototype.loginInput = function () {
        console.log(this.login.tel.value);
    };
    RegisterPage.prototype.loginEvent = function () {
        var _this = this;
        // 调用登录接口
        var upwd = this.login.pwd['value'];
        var phone = this.login.tel['value'];
        this.api.login(upwd, phone)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 将uid存储到storage中
                _super.prototype.showToast.call(_this, _this.toastCtrl, f['msg']);
                _this.setUserId(f['data']['uid']);
                // 消失动画 => 页面跳转到 dotolist
                _this.showSwipe.right.isShow = false;
                var bg_login = document.querySelectorAll('.bg_login')[0];
                var content_right = document.querySelectorAll('.content_right')[0];
                bg_login['style']['backgroundPositionX'] = '-400px';
                content_right['style']['top'] = document.body.scrollHeight + 'px';
                setTimeout(function () {
                    // menu 页面负责跳转，而不是直接跳转到today页面！！！
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
                }, 800);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, f['msg']);
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    return RegisterPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\register\register.html"*/'<ion-content>\n  <div class="bg_register" (swipeLeft)="onDragLeft($event)" (swipeRight)="backLastInput($event)" >\n    <div class="bg_animate"></div>\n\n    <!-- 注册 -->\n    <div class="register_title">SIGN UP</div>\n    <div *ngFor="let v of userInfo; let i = index">\n      <div class="edit_info_box" *ngIf="isShowUserInfo === i" >\n        <div class="input_box">\n          <div class="input">\n            <input id="{{v.id}}" placeholder="{{v.placeholder}}" type="text" [(ngModel)]="v.value" (focus)="focus(i)" (blur)="blur(i)" (input)="input()" >\n          </div>\n          <label class="input_label" for="{{v.id}}">{{v.text}}</label>\n        </div>\n        <div class="next_btn">\n            <button class="next" (click)="next(i)" >Next</button>\n            <button class="next_after" >Next</button>\n        </div>\n      </div>\n    </div>\n    <div class="toast" *ngIf="isShowUserInfo === userInfo.length" (click)="onDragLeft()" >\n      {{message}}\n    </div>\n  </div>\n\n  <!-- 登录 -->\n  <div class="content_right" (swipeRight)="onDragRight($event)" >\n    <div class="content_right_title">SIGN IN</div>\n    <div class="login_input_box">\n      <div class="login_box">\n        <div class="tel_input">\n          <input id="tel_input" [placeholder]="login.tel.placeholder" type="Number" [(ngModel)]="login.tel.value" (focus)="loginFocus(0)" (blur)="loginBlur(0)" (input)="loginInput()" >\n        </div>\n        <div class="pwd_input">\n          <input id="pwd_input" [placeholder]="login.pwd.placeholder" type="password" [(ngModel)]="login.pwd.value" (focus)="loginFocus(1)" (blur)="loginBlur(1)" >\n        </div>\n      </div>\n      <button class="login_btn" (click)="loginEvent()" >Login</button>\n    </div>\n  </div>\n\n  <!-- 提示左滑 -->\n  <div class="to_login" *ngIf="showSwipe.left.isShow" (swipeLeft)="onDragLeft($event)" >\n    <div class="to_login_top">\n      <div class="top_arrow_left"></div>\n    </div>\n    <span class="left_swipe">往左滑登录</span>\n    <div class="to_login_bottom">\n      <div class="bottom_arrows_left"></div>\n    </div>\n  </div>\n\n  <!-- 提示右滑 -->\n  <div class="to_register" *ngIf="showSwipe.right.isShow" (swipeRight)="onDragRight($event)" >\n    <div class="to_register_top">\n      <div class="top_arrow_right"></div>\n    </div>\n    <span class="right_swipe">往右滑注册</span>\n    <div class="to_register_bottom">\n      <div class="bottom_arrow_right"></div>\n    </div>\n  </div>\n\n  <!-- 提示右滑返回 -->\n  <div class="to_back" *ngIf="showSwipe.back.isShow" (swipeRight)="backLastInput($event)" >\n    <div class="to_back_top">\n      <div class="top_arrow_right_back"></div>\n    </div>\n    <span class="right_swipe_back">右滑上一步</span>\n    <div class="to_back_bottom">\n      <div class="bottom_arrow_right_back"></div>\n    </div>\n  </div>\n\n  <div class="bg_login">\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _f || Object])
], RegisterPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=register.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__about_app_about_app__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userinfo_userinfo__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_register__ = __webpack_require__(352);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingPage = (function (_super) {
    __extends(SettingPage, _super);
    function SettingPage(navCtrl, storage, api, toastCtrl, viewCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.api = api;
        _this.toastCtrl = toastCtrl;
        _this.viewCtrl = viewCtrl;
        _this.navParams = navParams;
        return _this;
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.initUserInfo(val);
        });
    };
    SettingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SettingPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    SettingPage.prototype.removeUserId = function () {
        return this.storage.remove('uid').then(function (value) {
            return value;
        });
    };
    SettingPage.prototype.initUserInfo = function (uid) {
        var _this = this;
        this.api.userInfo(uid)
            .subscribe(function (f) {
            console.log(f);
            if (f["status"] == true) {
                _this.userInfo = f['data'];
                console.log(_this.userInfo);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '用户信息已过期，请重新登录');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    SettingPage.prototype.getUserAvatar = function () {
        return this.userInfo ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.userInfo['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    SettingPage.prototype.getUserIntro = function () {
        return this.userInfo ?
            this.userInfo['intro'] ? this.userInfo['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    SettingPage.prototype.getUserNickname = function () {
        return this.userInfo ?
            this.userInfo['nickname'] ? this.userInfo['nickname'] : this.userInfo['uname']
            :
                '没有获取用户信息';
    };
    /**
     * 跳转用户编辑页面
     */
    SettingPage.prototype.jumpUserPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__userinfo_userinfo__["a" /* UserinfoPage */]);
    };
    /**
     * 扫描二维码
     */
    SettingPage.prototype.goToScanQRCode = function () {
    };
    /**
     * 夜间模式切换
     */
    SettingPage.prototype.cutTheme = function () {
    };
    /**
     * 关于 该app
     */
    SettingPage.prototype.goToVersions = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__about_app_about_app__["a" /* AboutAppPage */]);
    };
    /**
     * 退出登录
     */
    SettingPage.prototype.exit = function () {
        this.removeUserId();
        this.dismiss();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__register_register__["a" /* RegisterPage */]);
    };
    return SettingPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUi */]));
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\setting\setting.html"*/'<ion-header #ionHeader no-border >\n  <ion-navbar #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>设置</ion-title>\n  </ion-navbar>\n</ion-header>\n  \n  <ion-content>\n      <ion-list class="marginTop">\n        <button ion-item (click)="jumpUserPage()" >\n          <ion-avatar item-start>\n            <img [src]="getUserAvatar()" />\n          </ion-avatar>\n          <h2>{{getUserNickname()}}</h2>\n          <p>{{getUserIntro()}}</p>\n        </button>\n      </ion-list>\n\n      <ion-list class="list_content" no-border>\n          <ion-list-header>\n            工具\n          </ion-list-header>\n      \n          <button ion-item (click)="goToScanQRCode()" >\n            <ion-icon name=\'qr-scanner\' color="dark" item-start></ion-icon>\n            <ion-label>\n              扫描二维码\n            </ion-label>\n          </button>\n\n          <ion-item>\n            <ion-toggle color="purple" checked="false" (ionChange)="cutTheme()" ></ion-toggle>\n              <ion-label>\n                夜间模式\n              </ion-label>\n            <ion-icon name=\'cloudy-night\' color="purple" item-start></ion-icon>\n          </ion-item>\n      </ion-list>\n\n      <ion-list class="list_content">\n          <ion-list-header >\n            系统\n          </ion-list-header>\n      \n          <!-- <button ion-item>\n            <ion-icon name=\'settings\' item-start></ion-icon>\n            设置\n          </button> -->\n      \n          <button ion-item (tap)="goToVersions()" >\n            <ion-icon name=\'help-circle\' color="secondary" item-start></ion-icon>\n              关于\n            <ion-note item-end>关于该app</ion-note>\n          </button>\n\n          <button ion-item (tap)="exit()" >\n            <ion-icon name=\'exit\' color="danger" item-start></ion-icon>\n              退出\n            <ion-note item-end>退出登录</ion-note>\n          </button>\n        </ion-list>\n\n  </ion-content>\n  '/*ion-inline-end:"F:\project\ionic\todolist\src\pages\setting\setting.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_api_api__["a" /* ApiProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _f || Object])
], SettingPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutAppPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AppVersion } from '@ionic-native/app-version'
var AboutAppPage = (function () {
    function AboutAppPage(navCtrl, 
        // private appVersion : AppVersion,
        // public plt: Platform,
        navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // appName : any ;
        // packageName : string ;
        // versionCode : any ;
        // versionNumber : string ;
        this.appName = 'Today';
        this.packageName = '今日事今日毕，且提供一些益智游戏';
        this.versionCode = '最新版本';
        this.versionNumber = '1.0.1';
        // this.plt.ready().then((readySource)=>{
        //   this.appVersions.getAppName().then((val)=>{
        //     console.log(val)
        //   })
        // })
    }
    AboutAppPage.prototype.ionViewDidLoad = function () {
        // this.appVersion.getAppName()
        //   .then(v=>{
        //     this.appName = v ;
        //   }) ;
        // this.appVersion.getPackageName()
        //   .then(v=>{
        //     this.packageName = v ;
        //   }) ;
        // this.appVersion.getVersionCode()
        //   .then(v=>{ 
        //     this.versionCode = v ;
        //   }) ;
        // this.appVersion.getVersionNumber()
        //   .then(v=>{
        //     this.versionNumber = v ;
        //   }) ;
    };
    AboutAppPage.prototype.ionViewDidEnter = function () {
    };
    return AboutAppPage;
}());
AboutAppPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about-app',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\about-app\about-app.html"*/'<ion-header #ionHeader no-border >\n  <ion-navbar #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>关于</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <ion-list>\n    <ion-item>\n      App : {{appName}}\n    </ion-item>\n    <ion-item>\n      功能 : {{packageName}}\n    </ion-item>\n    <ion-item>\n      版本 : {{versionCode}}\n    </ion-item>\n    <ion-item>\n      版本号 : {{versionNumber}}\n    </ion-item>\n    <ion-item>\n      作者 : 刘胜\n    </ion-item>\n    <ion-item>\n      联系方式 : black.liusheng@gmail.com\n    </ion-item>\n    <ion-item>\n      Github : github.com/liusheng22/today\n    </ion-item>\n    <ion-item>\n      该web项目 : laijiayang.cn/today\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\about-app\about-app.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], AboutAppPage);

var _a, _b;
//# sourceMappingURL=about-app.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserinfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserinfoPage = (function (_super) {
    __extends(UserinfoPage, _super);
    function UserinfoPage(navCtrl, toastCtrl, storage, api, viewCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.toastCtrl = toastCtrl;
        _this.storage = storage;
        _this.api = api;
        _this.viewCtrl = viewCtrl;
        _this.navParams = navParams;
        return _this;
    }
    UserinfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.initUserInfo(val);
        });
    };
    UserinfoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    UserinfoPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    UserinfoPage.prototype.initUserInfo = function (uid) {
        var _this = this;
        this.api.userInfo(uid)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.userInfo = f['data'];
                _this.nickname = _this.getUserNickname();
                _this.intro = _this.getUserIntro();
                _this.gender = _this.getUserGender();
                _this.phone = _this.getUserPhone();
                _this.email = _this.getUserEmail();
                _this.address = _this.getUserAddress();
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '用户信息已过期，请重新登录');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    UserinfoPage.prototype.getUserAvatar = function () {
        return this.userInfo ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.userInfo['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    UserinfoPage.prototype.getUserIntro = function () {
        return this.userInfo ?
            this.userInfo['intro'] ? this.userInfo['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    UserinfoPage.prototype.getUserUname = function () {
        return this.userInfo ?
            this.userInfo['nickname'] ? this.userInfo['nickname'] : this.userInfo['uname']
            :
                '没有获取用户信息';
    };
    UserinfoPage.prototype.getUserGender = function () {
        return this.userInfo ?
            this.userInfo['gender'] >= 0 ? this.userInfo['gender'] + '' : '-1'
            :
                '-1';
    };
    UserinfoPage.prototype.getUserNickname = function () {
        return this.userInfo ?
            this.userInfo['nickname'] ? this.userInfo['nickname'] + '' : ''
            :
                '';
    };
    UserinfoPage.prototype.getUserPhone = function () {
        return this.userInfo ?
            this.userInfo['phone'] ? this.userInfo['phone'] + '' : ''
            :
                '';
    };
    UserinfoPage.prototype.getUserEmail = function () {
        return this.userInfo ?
            this.userInfo['email'] ? this.userInfo['email'] + '' : ''
            :
                '';
    };
    UserinfoPage.prototype.getUserAddress = function () {
        return this.userInfo ?
            this.userInfo['address'] ? this.userInfo['address'] + '' : ''
            :
                '';
    };
    UserinfoPage.prototype.updateUserInfo = function () {
        var _this = this;
        this.api.userUpdate(this.uid, this.nickname, this.gender, this.phone, this.email, '', this.address, this.intro)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.initUserInfo(_this.uid);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '用户信息更新失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    return UserinfoPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
UserinfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-userinfo',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\userinfo\userinfo.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()" >\n        <span ion-text color="primary" showWhen="ios" >取消</span>\n        <ion-icon name="md-close" showWhen="android" ></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>用户中心</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="marginTop marginBottom">\n    <button ion-item >\n      <ion-avatar item-start>\n        <img [src]="getUserAvatar()" />\n      </ion-avatar>\n      <h2>{{getUserUname()}}</h2>\n    </button>\n  </ion-list>\n\n  <ion-list>\n    <!-- <ion-item>\n      <ion-label>用户名 :</ion-label>\n      <ion-input type="text" [(ngModel)]="uname" disabled="true"></ion-input>\n    </ion-item> -->\n    <ion-item>\n      <ion-label>昵称 :</ion-label>\n      <ion-input type="text" [(ngModel)]="nickname"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>简介 :</ion-label>\n      <ion-input type="text" [(ngModel)]="intro"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>性别</ion-label>\n      <ion-select [(ngModel)]="gender">\n        <ion-option value="1">男</ion-option>\n        <ion-option value="0">女</ion-option>\n        <ion-option value="-1">未知</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>手机 :</ion-label>\n      <ion-input type="text" [(ngModel)]="phone" disabled="true" ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>邮箱 :</ion-label>\n      <ion-input type="text" [(ngModel)]="email" ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>地址 :</ion-label>\n      <ion-input type="text" [(ngModel)]="address" ></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <div padding text-center class="paddingTop">\n    <button ion-button color="primary" block (tap)="updateUserInfo()">保存</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\userinfo\userinfo.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _f || Object])
], UserinfoPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=userinfo.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactiontimePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReactiontimePage = (function (_super) {
    __extends(ReactiontimePage, _super);
    function ReactiontimePage(navCtrl, el, storage, api, toastCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.el = el;
        _this.storage = storage;
        _this.api = api;
        _this.toastCtrl = toastCtrl;
        _this.navParams = navParams;
        _this.isShowBegin = true;
        _this.isShowWait = false;
        _this.isShowClick = false;
        _this.isShowFast = false;
        _this.isShowComplete = false;
        _this.timing = {
            begin: 0,
            end: 0,
            result: 0
        };
        _this.rankList = [];
        return _this;
    }
    ReactiontimePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // 先获取该用户 uid
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.getReactionTimeRank(val);
        });
    };
    ReactiontimePage.prototype.ionViewDidEnter = function () {
        // this.background.nativeElement.style.backgroundColor = '#4bdb6a'
        this.changeBgColor('reaction_over');
    };
    ReactiontimePage.prototype.randomSecond = function () {
        return Math.random() * 4000 + 1000;
    };
    ReactiontimePage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    ReactiontimePage.prototype.getUserAvatar = function (i) {
        return this.rankList.length ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.rankList[i]['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    ReactiontimePage.prototype.getUserNickname = function (i) {
        return this.rankList.length ?
            this.rankList[i]['nickname'] ? this.rankList[i]['nickname'] : this.rankList[i]['uname']
            :
                '佚名';
    };
    ReactiontimePage.prototype.getUserIntro = function (i) {
        return this.rankList.length ?
            this.rankList[i]['intro'] ? this.rankList[i]['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    ReactiontimePage.prototype.changeBgColor = function (str) {
        // 选择要出现的背景色
        this.background.nativeElement.classList.remove('reaction_wait'); // 红
        this.background.nativeElement.classList.remove('reaction_true'); // 绿
        this.background.nativeElement.classList.remove('reaction_over'); // 蓝
        if (str) {
            this.background.nativeElement.classList.add(str);
        }
    };
    ReactiontimePage.prototype.changeShowPage = function () {
        // 选择要出现的页面
        this.isShowBegin = false;
        this.isShowWait = false;
        this.isShowClick = false;
        this.isShowFast = false;
        this.isShowComplete = false;
    };
    ReactiontimePage.prototype.getReactionTimeRank = function (uid) {
        var _this = this;
        // 获得排名列表
        this.api.reactionTimeList(uid)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.rankList = f['data'];
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '获取排名列表失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    ReactiontimePage.prototype.gaming = function () {
        var _this = this;
        // 提前随机一个秒数
        this.randomSecondNum = parseInt(this.randomSecond() + '');
        console.log('随机的秒数是： ' + this.randomSecondNum);
        // 计时器 开始
        this.timing.begin = new Date().getTime();
        // 通过这个秒数设定一个 定时器
        this.beginInterval = setTimeout(function () {
            _this.changeBgColor('reaction_true');
            _this.isShowWait = false;
            _this.isShowClick = true;
            console.log('定时器到点了：' + _this.beginInterval);
        }, this.randomSecondNum);
    };
    ReactiontimePage.prototype.beginGame = function () {
        this.changeBgColor('reaction_wait');
        this.isShowBegin = false;
        this.isShowWait = true;
        this.gaming();
    };
    ReactiontimePage.prototype.handleReaction = function () {
        // 超前按下了，记录下时间搓
        this.timing.end = new Date().getTime();
        // 记录此次无效成绩
        this.beforeHandle();
        // 清空定时器
        clearTimeout(this.beginInterval);
        // 进入 '点击太快' 页面
        this.changeBgColor('reaction_over');
        this.isShowWait = false;
        this.isShowFast = true;
    };
    ReactiontimePage.prototype.againGame = function () {
        this.timing = {
            begin: 0,
            end: 0,
            result: 0
        };
        // 清空定时器
        clearTimeout(this.beginInterval);
        this.changeBgColor('reaction_wait');
        this.changeShowPage();
        this.isShowWait = true;
        this.gaming();
    };
    ReactiontimePage.prototype.handleClick = function () {
        // 准确按下按钮，记录下时间搓，并计算出结果
        this.timing.end = new Date().getTime();
        this.timing.result = (this.timing.end - this.timing.begin) - this.randomSecondNum;
        // 记录此次有效成绩
        this.justHandle();
        // 清空定时器
        clearTimeout(this.beginInterval);
        this.changeBgColor('reaction_over');
        this.isShowClick = false;
        this.isShowWait = false;
        this.isShowComplete = true;
    };
    ReactiontimePage.prototype.beforeHandle = function () {
        var _this = this;
        this.timing.result = this.timing.end - this.timing.begin;
        this.api.reactionTimeAdd(this.uid, this.timing.result, 0)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 成功存入无效成绩
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '成绩录入失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
        // this.againGame()
    };
    ReactiontimePage.prototype.justHandle = function () {
        var _this = this;
        this.api.reactionTimeAdd(this.uid, this.timing.result, 1)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 成功存入无效成绩
                _this.getReactionTimeRank(_this.uid);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '成绩录入失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
        // this.againGame()
    };
    return ReactiontimePage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('background'),
    __metadata("design:type", Object)
], ReactiontimePage.prototype, "background", void 0);
ReactiontimePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reactiontime',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\reactiontime\reactiontime.html"*/'<ion-header #ionHeader no-border >\n  <ion-navbar #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>反应时间</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="reaction_content">\n    <div class="action_content" #background>\n      <div class="action_text" (tap)="handleReaction()" *ngIf="isShowWait" >等待颜色变成绿色</div>\n      <!-- 介绍游戏规则 -->\n      <div class="action_presentation" (tap)="beginGame()" *ngIf="isShowBegin" >\n        <div>\n          <p>点击便开始</p>\n          <p>当红色变为绿色时,要尽快单击</p>\n        </div>\n      </div>\n      <div class="action_click" (tap)="handleClick()" *ngIf="isShowClick" >快点击啊</div>\n      <!-- <div class="action_fast" (tap)="beforeHandle()" *ngIf="isShowFast" >还没到呢,你点太快了，再试一次吧</div> -->\n      <div class="action_fast" (tap)="againGame()" *ngIf="isShowFast" >还没到呢,你点太快了，再试一次吧</div>\n      <!-- <div class="action_complete" (tap)="justHandle()" *ngIf="isShowComplete" > -->\n      <div class="action_complete" (tap)="againGame()" *ngIf="isShowComplete" >\n          <div>\n            <p>速度：{{timing.result}}ms</p>\n            <p>再试一次吧,说不定成绩会更好呢?</p>\n          </div>\n        </div>\n    </div>\n  </div>\n  \n  <div class="reaction_rank" *ngIf="rankList.length">\n      <ion-list>\n        <ion-item *ngFor="let v of rankList, let i = index" >\n            <ion-avatar item-start>\n              <img [src]="getUserAvatar(i)">\n            </ion-avatar>\n            <h2>{{getUserNickname(i)}}</h2>\n            <h3>反应速度：{{v.time}}ms</h3>\n            <p>{{getUserIntro(i)}}</p>\n            <ion-note item-end>No.{{i+1}}</ion-note>\n        </ion-item>\n      </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\reactiontime\reactiontime.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _f || Object])
], ReactiontimePage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=reactiontime.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MemoryPage = (function (_super) {
    __extends(MemoryPage, _super);
    function MemoryPage(navCtrl, el, storage, api, toastCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.el = el;
        _this.storage = storage;
        _this.api = api;
        _this.toastCtrl = toastCtrl;
        _this.navParams = navParams;
        _this.rankList = [];
        _this.params = {
            level: 1,
            width: 3,
            lives: 3,
            rever: 3,
            combo: 0,
            click: 0,
            error: 0,
            score: 0,
            maxLv: 0,
            time: 2,
            last: true,
        };
        _this.isReversal = true; // 小方块是否在翻转中
        _this.isGameOver = false;
        _this.isComboNum = false;
        _this.isComboScore = false;
        _this.thisTimeScore = 0;
        _this.widthLenArr = [3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10]; // 每个关卡的边长(大正方型的宽,每个边的小方块个数)
        _this.reversalArr = []; //记录随机翻转的方块的坐标
        _this.reversalClassArr = []; //记录随机翻转的方块的Class
        _this.widthArr = [];
        return _this;
        // this.widthArr = new Array(this.params.width).map((v,i)=>i)
    }
    MemoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.getMemoryRank(val);
        });
        // document.querySelector('.content_memory')['style']['height'] = document.body.scrollWidth + 'px'
    };
    MemoryPage.prototype.ionViewDidEnter = function () {
        this.params.width = this.widthLenArr[this.params.level - 1];
        this.initGame(this.params.level, this.params.width);
    };
    MemoryPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    MemoryPage.prototype.getUserAvatar = function (i) {
        return this.rankList.length ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.rankList[i]['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    MemoryPage.prototype.getUserNickname = function (i) {
        return this.rankList.length ?
            this.rankList[i]['nickname'] ? this.rankList[i]['nickname'] : this.rankList[i]['uname']
            :
                '佚名';
    };
    MemoryPage.prototype.getUserIntro = function (i) {
        return this.rankList.length ?
            this.rankList[i]['intro'] ? this.rankList[i]['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    /**
     * 随机一个某区间的整数
     *
     * @param {*} m 区间最小数
     * @param {*} n 区间最大数
     * @returns
     * @memberof MemoryPage
     */
    MemoryPage.prototype.randomNum = function (m, n) {
        return parseInt(Math.random() * (n - m) + m);
    };
    /**
     * 随机本轮关卡所需的方块的定位
     *
     * @param {*} len 随机的最大边值
     * @param {*} reversalNum 本轮不得超过的翻转个数
     * @memberof MemoryPage
     */
    MemoryPage.prototype.randomClass = function (len, reversalNum) {
        console.log(len, reversalNum);
        if (this.reversalClassArr.length < reversalNum) {
            var x = this.randomNum(0, len);
            var y = this.randomNum(0, len);
            // 如果这个坐标没有重复，则使用它
            if (this.reversalClassArr.indexOf('x_' + x + '_y_' + y) < 0) {
                this.reversalClassArr.push('x_' + x + '_y_' + y);
                this.reversalArr.push({ x: x, y: y });
                if (this.reversalClassArr.length < reversalNum) {
                    this.randomClass(this.params.width, this.params.rever);
                }
            }
            else {
                // 如果已经存在该 class/坐标，再随机一次
                this.randomClass(this.params.width, this.params.rever);
            }
        }
    };
    MemoryPage.prototype.initGameParams = function () {
        this.params = {
            level: 1,
            width: 3,
            lives: 3,
            rever: 3,
            combo: 0,
            click: 0,
            error: 0,
            score: 0,
            maxLv: 0,
            time: 2,
            last: true,
        };
    };
    MemoryPage.prototype.saveGameLog = function (isValid) {
        var _this = this;
        this.api.memoryAdd(this.uid, this.params.level, this.params.rever, this.params.combo, this.params.score, this.params.maxLv, isValid)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 成绩录入成功
                _this.getMemoryRank(_this.uid);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '录入成绩失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    MemoryPage.prototype.getMemoryRank = function (uid) {
        var _this = this;
        // 获得排名列表
        this.api.memoryList(uid)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.rankList = f['data'];
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '获取排名列表失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    /**
     * 初始化游戏方块 及 游戏规则
     *
     * @param {*} level 本关卡等级
     * @param {*} len   本关卡方块边长个数
     * @memberof MemoryPage
     */
    MemoryPage.prototype.initGame = function (level, len) {
        var _this = this;
        // 清空上一次的白色方块 和 灰色方块
        // this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
        //   v.classList.remove('succ_square')
        //   v.classList.remove('fail_square')
        // })
        // 清空上一次的翻转的方块坐标
        this.reversalArr = [];
        // 清空上一次的翻转的方块Class
        this.reversalClassArr = [];
        // 定大正方形边长
        this.widthArr = new Array(len).map(function (v, i) { return i; });
        // 定每个小方块的 宽高
        setTimeout(function () {
            _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                v['style']['width'] = 90 / len + '%';
            });
            _this.el.nativeElement.querySelectorAll('.x_memory_box').forEach(function (v, i) {
                v['style']['height'] = 90 / len + '%';
            });
        });
        // 规定该关卡的最多翻转个数
        var reversalMaxNum = ((len * len) - 1) % 2 ? (len * len) / 2 - 1 : ((len * len) - 1) / 2;
        // 规定该关卡的翻转个数
        var reversalNum = level + 2;
        this.params.rever = level + 2;
        console.log(len, level);
        // 随机翻转某些方块 让玩家记忆
        this.randomClass(len, reversalNum);
        console.log(this.reversalArr);
        console.log(this.reversalClassArr);
        // 翻转方块方法1：
        setTimeout(function () {
            setTimeout(function () {
                _this.reversalClassArr.forEach(function (v, i) {
                    _this.el.nativeElement.querySelector('.' + v).classList.add('square_rotate_show');
                    console.log('正在翻转？');
                    setTimeout(function () {
                        _this.el.nativeElement.querySelector('.' + v).classList.remove('square_rotate_show');
                        _this.isReversal = false;
                        console.log('翻转完了？');
                    }, 2700);
                });
            });
        }, 500);
        // 翻转方块方法2：
        // setTimeout(() => {
        //   this.reversalClassArr.forEach((v, i) => {
        //     this.el.nativeElement.querySelector('.'+v).classList.add('square_rotate_static')
        //     this.el.nativeElement.querySelector('.'+v).classList.add('succ_square')
        //   })
        // })
        // setTimeout(() => {
        //   this.reversalClassArr.forEach((v, i) => {
        //     this.el.nativeElement.querySelector('.'+v).classList.remove('square_rotate_static')
        //     this.el.nativeElement.querySelector('.'+v).classList.add('square_rotate_back')
        //     setTimeout(() => {
        //       this.el.nativeElement.querySelector('.'+v).classList.remove('succ_square')
        //       this.el.nativeElement.querySelector('.'+v).classList.remove('square_rotate_back')
        //     }, 500);
        //   })
        // }, 2000)
    };
    MemoryPage.prototype.initWhiteSquare = function () {
        var _this = this;
        // 定时 2秒后将所有方块还原，并开始下一关卡
        // setTimeout(() => {
        this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
            v.classList.remove('square_rotate_back');
        });
        this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
            v.classList.remove('square_rotate_back');
        });
        this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
            v.classList.add('square_rotate_static');
        });
        this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
            v.classList.add('square_rotate_static');
        });
        setTimeout(function () {
            _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                v.classList.remove('succ_square');
                v.classList.remove('fail_square');
                v.classList.remove('square_rotate_static');
            });
            _this.startGame();
        }, 500);
        // }, 2000)
    };
    MemoryPage.prototype.startGame = function () {
        this.params.width = this.widthLenArr[this.params.level - 1];
        this.initGame(this.params.level, this.params.width);
    };
    // 选择对的时候
    MemoryPage.prototype.selectRight = function (el) {
        el.classList.add('square_rotate_y');
        setTimeout(function () {
            el.classList.remove('square_rotate_y');
            el.classList.add('succ_square');
        }, 500);
    };
    // 选择错误的时候
    MemoryPage.prototype.selectFail = function (el) {
        el.classList.add('square_rotate_y');
        setTimeout(function () {
            el.classList.remove('square_rotate_y');
            el.classList.add('fail_square');
        }, 500);
    };
    // 重新开始游戏
    MemoryPage.prototype.againGame = function () {
        // 关闭 Again 窗口
        this.isGameOver = false;
        // 如果重新开始，就清除掉这个定时器
        clearInterval(this.clearFailInterval);
        // 快速清除所有 灰色 和 白色 小方块
        this.initWhiteSquare();
        // 初始化游戏数据
        this.initGameParams();
    };
    MemoryPage.prototype.squareEvent = function (e) {
        var _this = this;
        var el = e.target;
        this.params.click++;
        if (this.params.click < this.params.rever) {
            // 如果这次点击 小于或等于 方块个数，则这次点击为有效
            if (this.reversalClassArr.indexOf(el.classList[1]) >= 0) {
                // 如果点击对了，则翻转过来，并定为白色，计算得分score，再combo加1，last为true
                this.selectRight(el);
                this.params.combo++;
                this.thisTimeScore = this.params.combo * this.params.level;
                this.params.score += this.params.combo * this.params.level;
                if (!this.params.last) {
                    // 如果上次错的，修订为正确值
                    this.params.last = true;
                }
                // 如果上一次是错的，就展示第一次Combo计数；上一次的对的，也展示连续Combo次数
                this.isComboNum = true;
                this.isComboScore = true;
                // 定时关掉Combo提示
                clearTimeout(this.successTimeout);
                this.successTimeout = setTimeout(function () {
                    _this.isComboNum = false;
                    _this.isComboScore = false;
                }, 2000);
                // setTimeout(() => {
                //   this.startGame()
                // }, 1000);
            }
            else {
                // 如果点击的错了，则翻转过来，并定为灰色，且关卡点击错误计数error加1
                this.params.error++;
                this.params.combo = 0;
                this.params.last = false;
                if (this.params.error < 3) {
                    // 本关卡错误次数小于3次
                    this.selectFail(el);
                }
                else if (this.params.error == 3) {
                    // 本关卡错误次数刚好3次
                    this.selectFail(el);
                    // 生命值lives减1
                    this.params.lives--;
                    if (this.params.lives > 0 && this.params.level > 1) {
                        // 生命值lives大于等于0，且当前关卡等级是大于1的，可以降低一级level，然后继续游戏
                        this.params.click = 0;
                        this.params.error = 0;
                        // this.params.maxLv = this.params.level
                        if (this.params.level <= 1) {
                            this.params.level = 1;
                        }
                        else {
                            this.params.level--;
                        }
                        _super.prototype.showToast.call(this, this.toastCtrl, '退回上一级关卡，还有 ' + this.params.lives + ' 机会哦~');
                        // 定时 2秒后将所有方块还原，并开始下一关卡
                        this.clearFailInterval = setTimeout(function () {
                            _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                                v.classList.remove('square_rotate_back');
                            });
                            _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                                v.classList.remove('square_rotate_back');
                            });
                            _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                                v.classList.add('square_rotate_static');
                            });
                            _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                                v.classList.add('square_rotate_static');
                            });
                            setTimeout(function () {
                                _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                                    v.classList.remove('succ_square');
                                    v.classList.remove('fail_square');
                                    v.classList.remove('square_rotate_static');
                                });
                                _this.startGame();
                            }, 500);
                        }, 2000);
                    }
                    else {
                        // game over，本轮游戏结束，点击重新开始的时候记得初始化游戏参数！！！
                        // this.initGameParams()
                        _super.prototype.showToast.call(this, this.toastCtrl, '很遗憾，已经给了3次机会了，再来一次吧~');
                        // 保存该次游戏
                        this.saveGameLog(1);
                        this.isGameOver = true;
                    }
                }
            }
        }
        else if (this.params.click == this.params.rever) {
            // 如果这次点击是本关卡最后一次，先判断点对还是错
            this.isReversal = true;
            if (this.reversalClassArr.indexOf(el.classList[1]) >= 0) {
                // 如果点击对了，则翻转过来，并定为白色，计算本次得分，且本轮结束让关卡level加1，combo加1，
                this.selectRight(el);
                this.params.combo++;
                this.thisTimeScore = this.params.combo * this.params.level;
                this.params.score += this.params.combo * this.params.level;
                this.params.level++;
                if (!this.params.last) {
                    // 如果上次错的，修订为正确值
                    this.params.last = true;
                }
                // 如果上一次是错的，就展示第一次Combo计数；上一次的对的，也展示连续Combo次数
                this.isComboNum = true;
                this.isComboScore = true;
                // 清空点击次数click 和 点击错误次数
                this.params.click = 0;
                this.params.error = 0;
                // 记录本轮关卡的等级+1作为最高等级，中途失败的不记录
                this.params.maxLv = this.params.level;
                // 定时关掉Combo提示
                clearTimeout(this.successTimeout);
                this.successTimeout = setTimeout(function () {
                    _this.isComboNum = false;
                    _this.isComboScore = false;
                }, 2000);
                _super.prototype.showToast.call(this, this.toastCtrl, '真厉害，恭喜进入第' + this.params.level + '关卡');
                // 定时 2秒后将所有方块还原，并开始下一关卡
                setTimeout(function () {
                    _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                        v.classList.remove('square_rotate_back');
                    });
                    _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                        v.classList.remove('square_rotate_back');
                    });
                    _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                        v.classList.add('square_rotate_static');
                    });
                    _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                        v.classList.add('square_rotate_static');
                    });
                    setTimeout(function () {
                        _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                            v.classList.remove('succ_square');
                            v.classList.remove('fail_square');
                            v.classList.remove('square_rotate_static');
                        });
                        _this.startGame();
                    }, 500);
                }, 2000);
            }
            else {
                // 虽然点击错了，方块翻转过来，并定为灰色，且关卡点击错误计数error加1，combo断了
                this.params.error++;
                this.params.combo = 0;
                this.params.last = false;
                this.selectFail(el);
                if (this.params.error < 3) {
                    // 但是本关卡错误次数小于3次，进入下一关卡，并清除click 和  error
                    this.params.level++;
                    // 记录本轮关卡的等级+1作为最高等级，中途失败的不记录
                    this.params.maxLv = this.params.level;
                    // 清空点击次数click 和 点击错误次数
                    this.params.click = 0;
                    this.params.error = 0;
                    // 定时 2秒后将所有方块还原，并开始下一关卡
                    setTimeout(function () {
                        _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                            v.classList.remove('square_rotate_back');
                        });
                        _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                            v.classList.remove('square_rotate_back');
                        });
                        _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                            v.classList.add('square_rotate_static');
                        });
                        _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                            v.classList.add('square_rotate_static');
                        });
                        setTimeout(function () {
                            _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                                v.classList.remove('succ_square');
                                v.classList.remove('fail_square');
                                v.classList.remove('square_rotate_static');
                            });
                            _this.startGame();
                        }, 500);
                    }, 2000);
                }
                else if (this.params.error == 3) {
                    this.isReversal = true;
                    // 本关卡错误次数已经3次，将生命值lives减1,关卡等级level也减1
                    this.params.lives--;
                    if (this.params.lives > 0 && this.params.level > 1) {
                        // 生命值lives大于等于0，且当前关卡等级是大于1的，可以降低一级level，然后继续游戏
                        // 清空点击次数click 和 点击错误次数
                        this.params.click = 0;
                        this.params.error = 0;
                        // this.params.maxLv = this.params.level
                        if (this.params.level <= 1) {
                            this.params.level = 1;
                        }
                        else {
                            this.params.level--;
                        }
                        _super.prototype.showToast.call(this, this.toastCtrl, '退回上一级关卡，还有 ' + this.params.lives + ' 机会哦~');
                        // 定时 2秒后将所有方块还原，并开始下一关卡
                        setTimeout(function () {
                            _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                                v.classList.remove('square_rotate_back');
                            });
                            _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                                v.classList.remove('square_rotate_back');
                            });
                            _this.el.nativeElement.querySelectorAll('.succ_square').forEach(function (v, i) {
                                v.classList.add('square_rotate_static');
                            });
                            _this.el.nativeElement.querySelectorAll('.fail_square').forEach(function (v, i) {
                                v.classList.add('square_rotate_static');
                            });
                            setTimeout(function () {
                                _this.el.nativeElement.querySelectorAll('.def_square').forEach(function (v, i) {
                                    v.classList.remove('succ_square');
                                    v.classList.remove('fail_square');
                                    v.classList.remove('square_rotate_static');
                                });
                                _this.startGame();
                            }, 500);
                        }, 2000);
                    }
                    else {
                        // game over，本轮游戏结束，点击重新开始的时候记得初始化游戏参数！！！
                        _super.prototype.showToast.call(this, this.toastCtrl, '第一关就错了，笨死了，再来一次吧~');
                        this.saveGameLog(0);
                        this.isGameOver = true;
                    }
                }
            }
        }
        else {
            // 如果意外超过的话，该将点击次数值 清零了
            this.params.click = 0;
        }
    };
    return MemoryPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
MemoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-memory',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\memory\memory.html"*/'<ion-header #ionHeader no-border >\n  <ion-navbar #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>方块记忆</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="content_main" >\n    <!-- 游戏信息部分 -->\n    <div class="content_info">\n      <p>记住方块</p>\n      <div class="level_info">\n        <p>\n          Level: {{params.level}} &nbsp;&nbsp; | &nbsp;&nbsp; Combo: {{params.combo}} &nbsp;&nbsp; | &nbsp;&nbsp; lives: {{params.lives}}\n        </p>\n        <div>\n          score: {{params.score}}\n        </div>\n      </div>\n      <div class="combo_num" *ngIf="isComboNum">\n        <div class="combo_text">Combo</div>\n        <div class="combo_x">&nbsp;&nbsp;x&nbsp;&nbsp;</div>\n        <div class="combo_sum">{{params.combo}}</div>\n      </div>\n      <div class="combo_score" *ngIf="isComboScore">\n        <div class="combo_score_add">+</div>\n        <div class="combo_this_score">{{thisTimeScore}}</div>\n      </div>\n    </div>\n\n    <!-- 游戏部分 -->\n    <div class="content_memory">\n      <!-- 遮罩层，翻转未完成时禁止点击 -->\n      <div *ngIf="isReversal" class="mask_layer"></div>\n      \n      <!-- 大小方块部分 -->\n      <div *ngFor="let heightNum of widthArr;let heightIdx=index" class="x_memory_box">\n        <div class="x_memory_container">\n          <div *ngFor="let widthNum of widthArr;let widthIdx=index" class="def_square x_{{heightIdx}}_y_{{widthIdx}}" (tap)="squareEvent($event)" >\n              <!-- x_{{heightIdx}}_y_{{widthIdx}} -->\n          </div>\n        </div>\n      </div>\n\n      <!-- game over结束内容 -->\n      <div class="game_over" *ngIf="isGameOver">\n        <div class="show_over_info">\n          <p class="over_user_name">用户名1</p>\n          <div class="over_user">\n            <p class="over_user_maxlv">最高level：{{params.maxLv}}</p>\n            <p class="over_user_score">得分：{{params.score}}</p>\n            <p class="over_user_text">再来一次吧，说不定会更好?</p>\n            <button ion-button color="secondary" round outline (click)="againGame()" >Again</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <!-- 游戏排名 -->\n  <div class="reaction_rank" *ngIf="rankList.length">\n      <ion-list>\n        <ion-item *ngFor="let v of rankList, let i = index" >\n            <ion-avatar item-start>\n              <img [src]="getUserAvatar(i)">\n            </ion-avatar>\n            <h2>{{getUserNickname(i)}}</h2>\n            <h3>最高得分：{{v.score}} 分</h3>\n            <p>{{getUserIntro(i)}}</p>\n            <ion-note item-end>No.{{i+1}}</ion-note>\n        </ion-item>\n      </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\memory\memory.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _f || Object])
], MemoryPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=memory.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberMemoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NumberMemoryPage = (function (_super) {
    __extends(NumberMemoryPage, _super);
    function NumberMemoryPage(navCtrl, storage, api, toastCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.api = api;
        _this.toastCtrl = toastCtrl;
        _this.navParams = navParams;
        _this.rankList = [];
        _this.initNum = 1; //初始化数字
        _this.randomNum = ''; // 随机展示的数字(字符串)
        _this.inputNum = ''; // 用户输入的答案数字字符串
        _this.isGameInit = true;
        _this.isGameBegin = false;
        _this.isGameHand = false;
        _this.isGameOver = false;
        _this.isAnswer = false;
        return _this;
    }
    NumberMemoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
            _this.getNumberMemoryRank(val);
        });
    };
    NumberMemoryPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    NumberMemoryPage.prototype.getUserAvatar = function (i) {
        return this.rankList.length ?
            'http://laijiayang.cn/todolist/imgs/avatar/' + this.rankList[i]['avatar'] + '.jpg'
            :
                'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg';
    };
    NumberMemoryPage.prototype.getUserNickname = function (i) {
        return this.rankList.length ?
            this.rankList[i]['nickname'] ? this.rankList[i]['nickname'] : this.rankList[i]['uname']
            :
                '佚名';
    };
    NumberMemoryPage.prototype.getUserIntro = function (i) {
        return this.rankList.length ?
            this.rankList[i]['intro'] ? this.rankList[i]['intro'] : '这个人很懒，什么话都没有留下'
            :
                '没有获取用户信息，请退出重新登录';
    };
    NumberMemoryPage.prototype.getNumberMemoryRank = function (uid) {
        var _this = this;
        // 获得排名列表
        this.api.numberMemoryList(uid)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.rankList = f['data'];
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '获取排名列表失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    NumberMemoryPage.prototype.initAllStatus = function () {
        this.isGameInit = false;
        this.isGameBegin = false;
        this.isGameHand = false;
        this.isGameOver = false;
    };
    NumberMemoryPage.prototype.gameInitEvent = function () {
        this.initAllStatus();
        this.isGameBegin = true;
        this.randomNumStr(this.initNum);
        this.startInterval(this.initNum);
    };
    NumberMemoryPage.prototype.saveGameLog = function (status) {
        var _this = this;
        // 保存该次游戏记录 log
        this.api.numberMemoryLog(this.uid, this.initNum, this.randomNum, this.inputNum, status)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 成功存入本次记录
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '本次记录录入失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    NumberMemoryPage.prototype.saveGameAdd = function () {
        var _this = this;
        // 保存该次游戏记录 log
        this.api.numberMemoryAdd(this.uid, this.initNum, this.randomNum, this.inputNum)
            .subscribe(function (f) {
            if (f["status"] == true) {
                // 成功存入本次最终成绩
                _this.getNumberMemoryRank(_this.uid);
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '本次成绩记录录入失败，请检查网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    NumberMemoryPage.prototype.gameHandEvent = function (status, event) {
        var that = this;
        function check() {
            if (that.randomNum == that.inputNum) {
                that.saveGameLog(1);
                that.isAnswer = true;
                that.initNum++;
                that.inputNum = '';
                that.randomNum = '';
                that.gameInitEvent();
            }
            else {
                that.saveGameLog(0);
                that.saveGameAdd();
                that.isAnswer = false;
                that.initAllStatus();
                that.isGameOver = true;
            }
        }
        var isNext;
        if (status) {
            if (event && event.keyCode == 13) {
                // 回车事件
                isNext = true;
            }
            else {
                isNext = false;
            }
        }
        else {
            isNext = true;
        }
        if (isNext) {
            check();
        }
    };
    NumberMemoryPage.prototype.gameNextEvent = function () {
        this.initNum = 1;
        this.randomNum = '';
        this.inputNum = '';
        this.gameInitEvent();
    };
    NumberMemoryPage.prototype.gameOverEvent = function () {
        // 保存用户游戏成绩
        // 初始化所有数据
        this.initNum = 1;
        clearInterval(this.interval);
        // 回到初始页面
        this.initAllStatus();
        this.isGameInit = true;
    };
    NumberMemoryPage.prototype.randomNumStr = function (num) {
        var that = this;
        function ran(min, max) {
            return that.randomNum += Math.floor(Math.random() * (max - min) + min) + '';
        }
        for (var i = 0; i < num; i++) {
            i ? ran(0, 9) : ran(1, 9);
            console.log('随机出来数字串' + this.randomNum);
        }
    };
    NumberMemoryPage.prototype.startInterval = function (num) {
        var _this = this;
        this.intervalNum = num;
        this.interval = setInterval(function () {
            console.log('此时倒计时数：' + num);
            if (num) {
                num--;
                _this.intervalNum = num;
            }
            else {
                clearInterval(_this.interval);
                _this.initAllStatus();
                _this.isGameHand = true;
                setTimeout(function () {
                    // this.el.nativeElement.querySelector(inputClassName).focus()
                    console.log(_this.numInput);
                    _this.numInput.setFocus();
                }, 150);
            }
        }, 1000);
    };
    NumberMemoryPage.prototype.endInterval = function () {
        clearInterval(this.interval);
    };
    return NumberMemoryPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('numInput'),
    __metadata("design:type", Object)
], NumberMemoryPage.prototype, "numInput", void 0);
NumberMemoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-number-memory',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\number-memory\number-memory.html"*/'<ion-header #ionHeader no-border >\n  <ion-navbar #header >\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>数字记忆</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="game_container">\n    <!-- 游戏初始化首页 -->\n    <div class="game_init" *ngIf="isGameInit" >\n      <div>\n        Are you ready?\n      </div>\n      <div>\n        <a class="start_btn" (tap)="gameInitEvent()" >\n          START\n        </a>\n      </div>\n    </div>\n\n    <!-- 游戏开始 -->\n    <div class="game_begin" *ngIf="isGameBegin">\n      <div class="show_number_str">\n        {{randomNum}}\n      </div>\n      <div class="memory_strip">\n        记忆时间倒计时：<a style="color:red">{{intervalNum}}</a>\n      </div>\n    </div>\n\n    <!-- 游戏答题中 -->\n    <div class="game_hand" *ngIf="isGameHand">\n      <div class="number_input_str">\n        <ion-item>\n          <ion-label floating>数字：</ion-label>\n          <ion-input #numInput type="number" [(ngModel)]="inputNum" (keypress)=\'gameHandEvent(true, $event)\' ></ion-input>\n        </ion-item>\n      </div>\n      <div>\n        <a class="end_btn" (tap)="gameHandEvent(false)">确定</a>\n      </div>\n    </div>\n\n    <!-- 游戏一个关卡结束 -->\n    <div class="game_level_over" *ngIf="isGameOver">\n      <div class="game_level">\n        <div>\n          <p>\n            数字：\n          </p>\n          <p>{{randomNum}}</p>\n        </div>\n        <div>\n          <p>\n            你的答案：\n          </p>\n          <p class="answer_true" *ngIf="isAnswer">{{inputNum}}</p>\n          <p class="answer_false" *ngIf="!isAnswer">{{inputNum}}</p>\n        </div>\n        <div>\n          <p>\n            Level {{initNum}}\n          </p>\n        </div>\n      </div>\n      <div>\n        <a class="next_btn" (tap)="gameNextEvent()">NEXT</a>\n        <a class="next_btn" (tap)="gameOverEvent()">Over</a>\n      </div>\n    </div>\n\n    <!-- 游戏排名 -->\n    <div class="reaction_rank" *ngIf="rankList.length">\n        <ion-list>\n          <ion-item *ngFor="let v of rankList, let i = index" >\n              <ion-avatar item-start>\n                <img [src]="getUserAvatar(i)">\n              </ion-avatar>\n              <h2>{{getUserNickname(i)}}</h2>\n              <h3>最高等级：{{v.level}} 级</h3>\n              <p>{{getUserIntro(i)}}</p>\n              <ion-note item-end>No.{{i+1}}</ion-note>\n          </ion-item>\n        </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\number-memory\number-memory.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _e || Object])
], NumberMemoryPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=number-memory.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedbackPage = (function (_super) {
    __extends(FeedbackPage, _super);
    function FeedbackPage(navCtrl, storage, api, toastCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.api = api;
        _this.toastCtrl = toastCtrl;
        _this.navParams = navParams;
        _this.question = '';
        _this.qq = '';
        return _this;
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getUserId().then(function (val) {
            _this.uid = val;
        });
    };
    FeedbackPage.prototype.getUserId = function () {
        return this.storage.get('uid').then(function (value) {
            return value;
        });
    };
    FeedbackPage.prototype.sendQuestion = function () {
        var _this = this;
        this.api.userQuestion(this.uid, this.question, this.qq)
            .subscribe(function (f) {
            if (f["status"] == true) {
                _this.question = '';
                _this.qq = '';
                _super.prototype.showToast.call(_this, _this.toastCtrl, '反馈成功，谢谢您提的意见，我会好好采纳的！(刘胜)');
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, '反馈失败，请查看网络状态');
            }
        }, function (error) { return console.error('错误：' + error); });
    };
    return FeedbackPage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUi */]));
FeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-feedback',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\feedback\feedback.html"*/'<ion-header #ionHeader no-border >\n  <ion-toolbar #header>\n    <button ion-button menuToggle icon-only start >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>意见反馈</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (tap)="sendQuestion()" >\n        <ion-icon name="send"></ion-icon>\n        发送\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="question">\n    <div class="question_title">\n      问题和意见：\n    </div>\n    <div class="question_content">\n      <textarea name="" id="" cols="30" rows="10" [(ngModel)]="question" ></textarea>\n    </div>\n  </div>\n\n  <div class="qq">\n    <div class="qq_title">\n      QQ/邮箱/电话：\n    </div>\n    <div class="qq_content">\n      <textarea name="" id="" cols="30" rows="10" [(ngModel)]="qq" ></textarea>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\feedback\feedback.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _e || Object])
], FeedbackPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SplashPage = (function () {
    function SplashPage(navCtrl, splashScreen, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.splashScreen = splashScreen;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplashPage');
    };
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    return SplashPage;
}());
SplashPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-splash',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\splash\splash.html"*/'<ion-content>\n    <!-- <svg id="bars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.15 224.35">\n        <defs>\n            <style>.cls-1{fill:#dd238c;}.cls-2{fill:#ef4328;}.cls-3{fill:#7dd0df;}.cls-4{fill:#febf12;}.cls-5{fill:#282828;}</style>\n        </defs>\n        <title>jmlogo</title>\n        <rect class="cls-1" x="27.22" width="20.06" height="163.78"/>\n        <rect class="cls-2" y="4" width="20.06" height="163.78"/>\n        <rect class="cls-3" x="13.9" y="13.1" width="20.06" height="163.78"/>\n        <rect class="cls-4" x="43.1" y="7.45" width="20.06" height="163.78"/>\n        <path class="cls-5" d="" transform="translate(-224.04 -108.31)"/>\n        <path class="cls-5" d="M243.5,323a12,12,0,0,1-.5,3.43,8.88,8.88,0,0,1-1.63,3.1,8.24,8.24,0,0,1-3,2.26,10.8,10.8,0,0,1-4.58.86,9.63,9.63,0,0,1-6-1.82,8.48,8.48,0,0,1-3.07-5.47l4-.82a5.64,5.64,0,0,0,1.66,3.19,4.86,4.86,0,0,0,3.43,1.18,5.71,5.71,0,0,0,2.83-.62,4.53,4.53,0,0,0,1.7-1.63,7,7,0,0,0,.84-2.33,15.15,15.15,0,0,0,.24-2.71V297.82h4V323Z" transform="translate(-224.04 -108.31)"/>\n        <path class="cls-5" d="M252,297.82h6l11.52,26.64h0.1l11.62-26.64H287v34h-4V303.29h-0.1L270.72,331.8h-2.45l-12.19-28.51H256V331.8h-4v-34Z" transform="translate(-224.04 -108.31)"/>\n    </svg> -->\n    \n    \n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="728px" height="280px" viewBox="0 0 728 280" enable-background="new 0 0 728 280" xml:space="preserve">  <image id="image0" width="728" height="280" x="0" y="0"\n      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtgAAAEYBAMAAACU/ZwfAAAABGdBTUEAALGPC/xhBQAAACBjSFJN\n  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAHlBMVEUAAAAAFR0BlcsCq+kB\n  gK4BapEBVXQAQFcAKjr////B5IGUAAAAAXRSTlMAQObYZgAAAAFiS0dECfHZpewAAAAHdElNRQfj\n  BQsVDA2LDJnXAAAU+UlEQVR42u2dzUPTytfHk/Qty0pVWGIDPncJmbZ02UtAXfYaQJe9RsBlNSos\n  q1Xhz37mfU6SSYtX+/KT81lom7Z5+ebkzJkzZwbHQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAE\n  QRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAE\n  QRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQZAizVWfwH0i2Dm+/LLqk7gvBISxc3aFii8eITYj\n  PB6u+mT+dHacravzQyH53qpP5k9nR/zHFEexF4rbVGIzor1Vn88fTYW0O+bd0sR224DhqkVYFpWQ\n  lIq9tcD4hAAGqxZhWVS2KyVi+y+pDt3Jgo4boNhA7IaQozNZzHGjbf0Sxfap1rtn5wHpLea4sT4S\n  iu1MhU27MRku5LjJvn5578X2SacpXgSdn93lnUj7+uW9F3tDG/QGGf3+o6aEHOg3917suKs2uUH/\n  5/Z4F6ZhYNqC+y62CwSYLsCPtAYtfTfvvdh1MtHbquD1Qo5638X2QrPNX4DT9vbAEe672GkXfGUB\n  YlT3qmSR+19TrGK7IFagPevtXz6Ke3Nxctgm4bP34n1tv0aa6sN7LraX6Tf+airQ/XRo8iBjvqne\n  B63CbxD7dila/TJWsdMIii0tuwJSR3s/cYRPMucUto+OAilx46AhZXfuLPaDLw9KPvFfdu+0h5Vj\n  FbtdAQ2kEqMFxN6+8/5pf5+NbV7eNtk75Tz8Hmh27yK2/5bdsvBsYvnse0AW08v97djEdnsw3PNl\n  ZzINdbb/7vkSpvXutX5bk82i23XNPuaL7X7UQ9Kv85/xTLDc7c1JQG/s+/mntXVzfhQczP/eb8Ym\n  dqPfAAIo4WPdk/yJYDDNyqNjkA6QeK7Y/OnYPbu8OKH/v8h+Rs2aPP3OH5hGLO/I81k7e3BzfiIc\n  24LymTOwiV3fd0BvOpEuJdJ5OulvwcDWbsneH5JwDN/r6LoNYpx5YvtUxGcT8fJNVm2mb/hO9MEe\n  cUfTZjL+34zr1a4wWL6jt4rdpxapRGoQbtHulWkV68LzAh9e4jPdIPcM6GNFIMaZJ3ZCwn/1m+8E\n  7JK+IU8n4u4/omfxip6X+yMiVje3dX56di3E3jm9/NKsLN/RW93IAdVTmXYiLq4BRq+k550v9gb5\n  K7tBZ0TiZqwflDlif82OFj1SyV9u8dSsHdYvGFGtn8rt7hvL+QjXTjopkW11ppe8QrF9KkksH9dv\n  ROhTD425yNMM9vRO7GK7gdJF0dK3cJLoJkCKvXnStrVujZwnouLLO9gSZs138TwA7oX6+EFuL3Uz\n  5qk2gT7sKsV2AuYqyNMvztZbZdC1nnl8K927iV0rXPNURQDpONXBAP+WtDxjn4qk4BNi2WJXyDu1\n  Kcj66Ua+8WvQKOUVvZzPkREb9GFXKnYyYm2bRJxSddf0QqR9zhU7DfOXo8dnpqOp1oOJXTetW1an\n  OilEaHXyhP8P/EBEsq1dms1UupG6h+4HLXF9AdnMOVjFbjF/+o1L3ZZX4R2Zc5NGOVfs4rCDHnls\n  DVtQbPocMcujvoQa+JMZsom9CJVrBGzJfquefaamwO6/NeUL0IddFlaxG9wkN0+Ojt+n8tIrsXnq\n  uGQe6LTbxW4UgwLdKlYGFW2LZECfcu09PhD4PPjEMk4kpQSmmT7JfSXTY2kQW5S3iNTxHOwp1lhF\n  EQ11QdPE2BEvQ/DCeWJXi05Rx3seOCx5HsHgOYGmvWF91iMm5ePImOa3/DemMNRIrTbsLqhuYAZ2\n  sWvyrru625gmwENuc7lMpGwXu5Wxp63bByBbWwWjB7luoQ8Dt1g7G+pgdpVmG/Q20ihlhmlm8w1P\n  bF9ZG7GpE2T9CPeNfqSTJDeONV/sFDzKP1gDuHOpXWlt30Re+R7f1Iho0gZ1nhkZq81Dx+80ZwTo\n  PlByo9BOg8tYKiVi075f5/iE/nN6espPO060jQmT8PbmiW26LSa0URLU+ybyIrlovE70Dz31JXo+\n  4RHRvjfqO25n5qhGYA4el5QH/IZBkZ+krCIqySWvD2Ntp6JlmS+2ScS6bMrO5XlkutqNA9O8FbxB\n  pP2PvsM0nmg6fqRuVoseMIQlbAWS3OlaWH4xepnYcU7snUjbh4iZvP05Yjdg/1445SgYqw97JvIq\n  GN5UG70yPldkjXQSgT0WESxhK2AaDK8sBxLP+PliKBM7/6prgmZhk3PFrhqxVWMY6DmXftcY3KT4\n  y5E6knzhCZP+ROTjwFxy3ExnZKQ93SSkJlt50j4em6/EC6g+mk2Z2MahiW094wSFt/X6czo1LSN2\n  VYrd1h+6nRnBgK8cUEuZeNL5cfGO9ehVE0lPKhlPZ2SkjZeKhnoT4x/9lWRtxDZK8W3ugYmqRc9t\n  rtgpdCP/3LJcG/haOCsYUF0SVQTnKo+mEk+s3z8dVbJ9FfezGRIynlr3FGgbS9r0dpkTXPpQjV1s\n  /8rYHd/m943YVSX29kyxY9NA+lyp3WsgTjArGEi68mfS9qhNHrPY0Qz6UJfcGmaTpLT5BBldXUCn\n  XfaUTaPwQd8sXfpQjV3sKkjR822NvpFOXKMHtljFDkCwkArDBGJHzRnBQIvIs5BH8MgzqmR3rL/w\n  PQjpmWeTpLxJ12et76XqFsl8L/jNdE3Epn3xcWZbvZ9v7jywxSp2CEqw5YgtuLp4MiMY8MSjP1WP\n  1zQ7ssgHG2kntA7zAdQ+jiOQIpS7d83TMXCyYreWPi5mF7vyzHR3+bbafl5a78B4GqvYnRa0nE2e\n  r36m1UnGM9onGYXo5AcN+jt6ZIzfuN0JPaVM3i6mTR91y+YAYvc15f48cnt1vZZit07NWQux/8pL\n  WzkAowkWsd1ObtyJjQ2a2WfpaEb75PM766pAz4nAkMIm2w0Tsn4AuyuiYs7U8KtxipaJbPjhgdjL\n  H4S0iz19S7Lbqi8KYveMXdktu57vuv14aWafTYdZl/n9cGds3nFzrKuBC6etW0b3LYtJvjOx/Z4D\n  okeROvNNMy7tNtFih+8ebL3srqHY6Ycwu80riN3qGU9j99luMRf9WA+pZMrh2TAugXls3oOqBkoY\n  faDHNCYJ/6X9T6Z71wkG+hceuWCDZJF+XOQ57Sr3xw/nhiDvuy5iJ2C6gRD7tTFT4R5a3Tk2EthG\n  WWh8NrAclzrbnQBkQnkiphXnxr9Z1Qh3+9/5T0OY3WBe4i9Y6yw6Uu6+uiEVrjIVe7xuYsfTbnZb\n  5Z0RWzyJ0475nT3ObtYsE4Tr0rQz5fDU177I5LF5CDxNs2Kz4qfOe+q1Y7GPAGY3puH1TTDmGSp4\n  lo2BCgFFDmAdxY6AQxVi/2vErnGDTUPzFetpJ2MaIYTHl1+amc1y2CRTDi+6ilOjA7/XyQYUu8HC\n  mVdNFoyEr8SPmiC4ZM3tw75jKkJFUqE20v003oJmxF6TaKQNQgW+rQXEFkFAarLOJbmRAZ8mTJ2s\n  CfgcZtrbXAtYDi+6e6DygRtoBGzf/UREr4Z6fRr2cZIJMAkW6bltkH8SyZHqWFt/zE4bir0uoV8H\n  ZC+F2O9h54xtSUBuwyq2t68qfbMlTSKjlSmHr5Ozd0xyfVBuoDvG9lm8xyo0aTAS6mKRdATk4pqm\n  ILITORHP1KdU6U+b4Ye1E9vvgqaHv5yOQZjFUxdgtL0kny2uZevzCcmMxYgBgUw5fJXFc/RI2lC5\n  gXZM5BCJHNSPAHSLWHLEHJeL7Q2N2L7Iuo+NpDGc+7A+Yjd6IEtUFNujVp4pOrI3NcFIXXcMa/5E\n  25sph6+Q9z+Coco/ObJ169a07SfMnv2XvH3U8w8qg2puxL++Z2pJXL77ytj4IrHOhLnvrfXIjdQP\n  gI/g29JxYMR2g/A0U59qF3vDjFpGIAgUAUOmHJ7ZWLXnpNnWrWtsn90gGow8Z0IdqS95e8Dtc8v2\n  9wtij2rGlFkbu2tOZE0SUbU+sGMltpGfj9/C6gO72H6gO9k1MDFEfhmWw/PLjpqm2IP7864ZIvfI\n  TSyzfg/1Xa7tA7fPxXYP6mDGH/uxN4STldmKWIY1EbvaB3YrxY7AOTs/Tt9ldmKPWB/xyE9oAeJE\n  4SxgOTzPY7SGLdC6UWGp7W/r92oGA/UFqsWr931jtaJFL4hdHYBOZY7pegweeAcgnybFjrdn7KSk\n  e7DJvGSHRcWms6HaJVgOzyOG2h4Ue0TFBvUIKgH4nRA144y2scATiSRfD4jNH8XaXrY4CrImIzWV\n  p8DH8m3JONmbsZPSAWxC2qyOzzWrPKh2CZbD88tu9CsglBix9QZN+cQG74yy/nr3serWu13giUT/\n  ppsXu9GnLmxYIvZ6jEG2jkFcJ8VO/6PYkmxfz8mWw/NNbq8CWjcq0KEzBQtxELLD5q52m06sjtYB\n  K00Jn5ARm31Gb4hLSix4TQZ8pyckty0ZT2ecWqnYUaim1I3NNQqDhuXw4lUXij2gd0omjzh1ORGs\n  qesamNs3D4d4XmgAkxWbDein1uJMZ2bZyRLFTt+EuW3JqDXDw5WKHWz7n0+Pjo4vwOVKa5yOTAMl\n  XnU80LrRLyXNGminN1+StpgE4qrB96hpjFM0ux0gtjhOMqH3yW4nswqqFoN95kGa35aMvBmBUqnY\n  lnIFVwoIy+FFENaGYu+xjpRrn0o8laaaTMz98krEbg3NvJAca1J+BjOsUuxhbUZCskxsWyGOGqWF\n  5fB2sSvDkrCtIZvIdGzuV40/ixmx+bXU9lmUb93NmhRWwgyrDP0G9RmTq8rEPrfUNKog0Ns2mQ0R\n  DQag981yXdXtsrBNjipMh+bA4vSKYrvsGwn5W29ujPUxBssQOKOTdaEAGIIKsbd9y7CL3kmJ2JGl\n  5F9V2MFyePH7vNj1vlO1h21yc2UAEh9iIKYgNjV/3idSg/OPdW3nutRnd2BUJBJReyavpPmYFatI\n  ULxBeqINLIf3rGK7vbKwzRWzvb3tGojM2aEsYjM/4j7k4w4s5atH7Ndl5oHbhQU0Ip+97xS6kA39\n  wzKxSXFWjS4HhuXwYrwQis0PelgatolBHVamY6Qb0X/DekFs57BJW9IPbB2O00Mz1XBtJjD5PbAs\n  rRwW6zuFQDudJ7ZLCn7eTNyC5fDCQAtiUw9Qy0/IVrth1lDvg5w4z0qGtaLYGwc1Gvt9KMz8bpSE\n  30sWu3EA2w4xut6TwZWhTuaJ7ZNC+5Zov+CDcnhx3QWxvW2rJ+Kfs7oHlhwZ6S3bJWK7QcB8B68R\n  2vkXlpk310Hs2gF0Z6IiqlOwhHiu2I3ChP1vZhEeF5TDi+xdQezGAUuK2OL7N3zAhZXpDPTp7JWI\n  7bRIh9/irdsvcDZqbUZ4tUSxqwfQnYnrJvm49CuZK3Y9L/YjEkZj9QaUw4tXBbGZu3UDELapryci\n  ujBzmLZuzrnJWsVOyVhPgE+MOa/JqgyZDKsshqdmnVnsr07IdL7YWc/zkZDX5gphOTx3W0Wxp0Nm\n  gGCyAKcRqUiuTe3ZZSsQqRJZKLaq1ffpJ9ShTRxek2mim+VXMljFzmRY5Tba/sCgtxGQjlmUpmS9\n  kRp0AXzRlb8808rCcnjucIti19nvE1gE74haHXkikZN0A3gOVOzcxCs5rfIh6Uxyy74sf6DGKnYm\n  wyq3Jdts6FHdAzZ2Gs4Vu8oSoo7zYOv28wmPul44xotkyuF5qJkRW9wH9nWXSrSrlyHZjOm7WGa0\n  40mq1iDa5UNCYbUgtpxoVizHX346m4lNzFpP4gQzGVZ1A3hj1REXzRZ3i0JP/Sp4emndt0cyhK/Z\n  qK4GlsPzC7eIvcGeep/HEWfXt7dX56J+pCpvbjpu8RmWX7jDYWLX9Dn9LUfhN4SzckVqfQSOv/QM\n  Kxc7bw2ZDKuKUNgmesLPrm7ZCimdj2EI9lGy74zUZxNqZeBiQTm8y9MDGbEH4oOI/cB9A/bzdOLU\n  A/7EsDRtQ/5xl5b4vjmn1lDuWq1sz2roQ+j9l58asYqdpKSwjUe0rhp56d4Gf88XuzW4OT1iZnZ0\n  esEnciWwhyLK4V3qYtri8baI7TwUZR4/5AKjfDHXR0RqrSR2WFlDTuzpSPxfNbWxvlwcSoq//A5k\n  Riivd8FPILaILZ50XovOChuTnjNfbPlsa74qkeSn085JGzj9ADpcJWMiFxHYurq4uLxmv/9opiF4\n  /MDsfsn5x0Wxo5JVAlaxkE5W7D15gt9PNXFXLBQga1cd9+aKXvLXcOIYV1+WGE5Hmbcfsn/zpjVo\n  qdaty1s3q9h+kF2yYTMCazhU92/4c0HCIxGwhJ+O1DmN5Vlbl79wVrIel1XstvVzsBjuNxZBAWVK\n  xE7GUKU4Y9fSgbHWrSmPG4DWzXyVOuiJfuPDwkoeg1Odz671X+USp9Nu7xydij0kpfa7/Eo/Vi9q\n  YhHVDYCBnBG7pk3qY7FTZyV+/uUB5/bmPCqsourt+VKkmvABgf5oOgDfo2HmM/5F98dJpnyMag90\n  ttIgpfHd8meu5yKGPXEJ8J4Dy/9Kuizyo5Hu67vtOzJ73r1s5j+tmgn8coEv/VHW2fPZHdQUCIy3\n  78a0dNEt9ydWSl4kDWDsGX/8ja0GF4ApiXPwzwO2avZZfvKBQNjz1ufzQ9nVAGKPsl/dOmfRyM7l\n  5GcvpVXqReorCEbs50FK/PHm23a4U7TR/3iY3hXXkHpdMW0jMHf4dwlRLW0fW8tPQ62SBtP5+Oxa\n  11sH5g5PftMxYlIW+UXLz4ysEhfovCBq4deSUd36mrjsP4jkie6t50hX0KX5s2ELb25Yw1R/BcvC\n  /+H4IRvpsXntdPllDH88ycCyYLrD+mf/I3/+43+JapePPYxym/2ALD+X/efDAvZafkVMligervrM\n  /kD47MCUZFJgbGz+fvVoloTL6qSoI4EDz1TrCL3IIthgaZc6WC6J/QmQV8Hkv+8RKcUNWJj9mI0u\n  NR25uMOL5K9f3Cti52E4ccRyR2TniOe9/nmY/4MuyO9CzC3Wf5lld9zAUGRhNOQA0+bbw3b7+Nrx\n  I3Qii+Nh9i8q3LPc6rL5AFcWjXLDzshv5oMaJqbBCGq9aD6yEeerz28D9pcTkAWzKf9A4V2HqpFf\n  YuvzxeWXX98NgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI\n  giAIgiAIgiAIgiAIgiAIgiAIgiBIGf8PVlWYZXn3e0gAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTkt\n  MDUtMTJUMDQ6MTI6MTMtMDc6MDBZkNpZAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA1LTEyVDA0\n  OjEyOjEzLTA3OjAwKM1i5QAAAABJRU5ErkJggg==" />\n  </svg>\n</ion-content>'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\splash\splash.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _d || Object])
], SplashPage);

var _a, _b, _c, _d;
//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(366);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_today_today__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_to_do_list_to_do_list__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_special_special__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_reactiontime_reactiontime__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_memory_memory__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_number_memory_number_memory__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_feedback_feedback__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_splash_splash__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_about_app_about_app__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_userinfo_userinfo__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_tab1_tab1__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_home_home__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_list_list__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_color_picker__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_api_api__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























// 第三方插件


// import { AppVersion} from '@ionic-native/app-version'
// import { Geolocation } from '@ionic-native/geolocation/ngx';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_special_special__["a" /* SpecialPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_to_do_list_to_do_list__["a" /* ToDoListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_reactiontime_reactiontime__["a" /* ReactiontimePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_memory_memory__["a" /* MemoryPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_number_memory_number_memory__["a" /* NumberMemoryPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_splash_splash__["a" /* SplashPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_about_app_about_app__["a" /* AboutAppPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_userinfo_userinfo__["a" /* UserinfoPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_tab1_tab1__["a" /* Tab1Page */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_25_ngx_color_picker__["a" /* ColorPickerModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/today/today.module#TodayPageModule', name: 'TodayPage', segment: 'today', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/to-do-list/to-do-list.module#ToDoListPageModule', name: 'ToDoListPage', segment: 'to-do-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/about-app/about-app.module#AboutAppPageModule', name: 'AboutAppPage', segment: 'about-app', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/userinfo/userinfo.module#UserinfoPageModule', name: 'UserinfoPage', segment: 'userinfo', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reactiontime/reactiontime.module#ReactiontimePageModule', name: 'ReactiontimePage', segment: 'reactiontime', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/memory/memory.module#MemoryPageModule', name: 'MemoryPage', segment: 'memory', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/number-memory/number-memory.module#NumberMemoryPageModule', name: 'NumberMemoryPage', segment: 'number-memory', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notes/notes.module#NotesPageModule', name: 'NotesPage', segment: 'notes', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                name: 'myApp',
                driverOrder: ['sqlite', 'indexeddb', 'websql'],
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_today_today__["a" /* TodayPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_to_do_list_to_do_list__["a" /* ToDoListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_special_special__["a" /* SpecialPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_reactiontime_reactiontime__["a" /* ReactiontimePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_number_memory_number_memory__["a" /* NumberMemoryPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_memory_memory__["a" /* MemoryPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_splash_splash__["a" /* SplashPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_about_app_about_app__["a" /* AboutAppPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_userinfo_userinfo__["a" /* UserinfoPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_tab1_tab1__["a" /* Tab1Page */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            // Geolocation,
            // AppVersion,
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_26__providers_api_api__["a" /* ApiProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__ = __webpack_require__(360);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    // rootPage:any = TodayPage;
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* MenuPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            // splashScreen.hide();
            var splash = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__["a" /* SplashPage */]);
            splash.present();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"F:\project\ionic\todolist\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]) === "function" && _d || Object])
], MyApp);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpecialPage = (function () {
    function SpecialPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SpecialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SpecialPage');
    };
    return SpecialPage;
}());
SpecialPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-special',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\special\special.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Special</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n <h3>Special Page</h3>\n\n\n</ion-content>\n\n<ion-footer>\n	  <ion-grid>\n	    <ion-row>\n	    <ion-col><button ion-button>button 1</button></ion-col>\n	    <ion-col style="text-align: center"><button ion-button>button 2</button></ion-col>\n	    <ion-col style="text-align: right"><button ion-button>button 3</button></ion-col>\n	    </ion-row>\n	  </ion-grid>\n	</ion-footer>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\special\special.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], SpecialPage);

var _a, _b;
//# sourceMappingURL=special.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n	<h3>Landing page / Home page</h3>\n\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\home\home.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], HomePage);

var _a, _b;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListPage');
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"F:\project\ionic\todolist\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<h3>List Page</h3>\n</ion-content>\n'/*ion-inline-end:"F:\project\ionic\todolist\src\pages\list\list.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
], ListPage);

var _a, _b;
//# sourceMappingURL=list.js.map

/***/ })

},[361]);
//# sourceMappingURL=main.js.map