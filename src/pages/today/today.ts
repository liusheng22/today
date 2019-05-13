import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController, ItemSliding, AlertController, } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BaseUi } from '../../common/baseui';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import advancedFormat from 'dayjs/plugin/advancedFormat'
// import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var BMap;
declare var BMapLib;
declare var BMap_Symbol_SHAPE_POINT;
declare var BMAP_STATUS_SUCCESS;

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage extends BaseUi {
  @ViewChild('hjmap') mapElement: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  myIcon: any;
  
  @ViewChild('editItemsInput') editItemsInput
  @ViewChild("header") header
  @ViewChild("ionHeader") ionHeader
  nowDate = {
    monthList: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year: '',
    month: '',
    day: '',
    date: ''
  }
  uid: any
  weather: any
  isAddStatus = false
  groupList = []
  itemsList = []
  isShowShade = false
  isShowOtherShade = false
  isShowAddGroup = false
  isShowAddItems = false
  currentGroup = {
    idx: 0,
    name: ''
  }
  currentEditItems = {
    groupIdx: 0,
    itemsIdx: 0,
    name: ''
  }
  currentEditGroup = {
    groupIdx: 0,
    name: '',
    color: ''
  }
  itemsTitleStyle = {
    off: {
      textDecoration: 'none',
      color: '#000'
    },
    on: {
      textDecoration: 'line-through',
      color: '#a6a6a6'
    }
  }
  groupName: string
  itemsName: string
  editItemsName: string
  editGroupName: string
  isShowEditItems = false
  isShowEditGroup = false
  isShowHeader = true
  count: number = 0
  boxClassName: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public storage : Storage ,
    public api: ApiProvider,
    public viewCtrl : ViewController,
    public loadingCtrl : LoadingController,
    // private geolocation: Geolocation,
    public el: ElementRef ) {
      super()
  }

  ionViewDidLoad() {
    // 动态设置header背景图的宽高
    let header = document.querySelectorAll('.ion-page>.header')[0]
    let title_content = document.querySelectorAll('.title_content')[0]
    header['style']['width'] = document.body.scrollWidth + 'px'
    header['style']['height'] = document.body.scrollWidth/1.875 + 'px '
    title_content['style']['height'] = document.body.scrollWidth/1.875 + 'px '

    // 设置显示当前日期时间
    this.getTodayDate()

    // 获得今日天气
    this.getTodayWeather()
  }

  ionViewDidEnter() {
    this.getLocationByBrowser()
    // this.getLocationByIp()
    // 地图绘画测试
    // this.mapTest()

    // 获取uid
    this.getUserId().then((val)=>{ 
      this.uid = val
      // 请求初始化数据
      this.initUserInfo()
    })

    // 随机获得今日份today背景
    this.getTodayBg()
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  getTodayBg(){
    let num = Math.floor( Math.random() * 13)
    this.el.nativeElement.querySelector('.ion-page .content').style.backgroundImage = `url('http://laijiayang.cn/todolist/imgs/today/bg_today_main/ (${num}).jpg')`
  }

  getTodayDate(){
    this.nowDate.year = dayjs().format('YYYY')
    this.nowDate.month = this.nowDate.monthList[Number(dayjs().format('M'))-1]
    this.nowDate.day = dayjs().format('DD')
    // setInterval(()=>{
    //   this.nowDate.date = dayjs().format('HH:mm:ss')
    // }, 1000)
  }

  getTodayWeather(){
    let location = 'auto_ip'
    this.api.getTodayWeather(location)
      .subscribe(f=>{
        console.log(f)
        if(f["HeWeather6"][0]["status"]==='ok'){
          this.weather = f['HeWeather6'][0]['now']
          console.log(this.weather)
        }else{
          super.showToast(this.toastCtrl, '天气信息获取失败，请检查网络')
        }
      },error => console.error('错误：' + error) );
  }

  getTodayWeatherIcon(){
    return this.weather?
      'https://cdn.heweather.com/cond_icon/'+this.weather.cond_code+'.png'
    :
      'https://cdn.heweather.com/cond_icon/999.png'
  }

  getTodayWeatherTmp(){
    return this.weather? this.weather.tmp : '未知'
  }

  getTodayWeatherCondTxt(){
    return this.weather? this.weather.cond_txt : ''
  }

  getUserTodayGroup(){
    // 获取用户待办事项组
    // var loading = super.showLoading(this.loadingCtrl,"loading...")
    this.api.todolistGroupList(this.uid)
      .subscribe(f=>{
        console.log(f)
        if(f["status"]==true){
          // loading.dismiss()
          this.groupList = f['data']
          this.getUserTodayItems()
        }else{
          // loading.dismiss()
        }
      },error => console.error('错误：' + error) );
  }

  getUserTodayItems(){
    // 获取用户待办事项列表
    // var loading = super.showLoading(this.loadingCtrl,"loading...")
    let str = ''
    if(this.groupList.length){
      this.groupList.forEach((v, i) => {
        if(i+1 === this.groupList.length){
          str += v.gid
        }else{
          str += v.gid + ','
        }
      });
    }
    this.api.todolistItemsList(this.uid, '', str)
      .subscribe(f=>{
        console.log(f)
        if(f["status"]==true){
          this.itemsList = f['data']
          // loading.dismiss()
        }else{
          // loading.dismiss()
        }
      },error => console.error('错误：' + error) );
  }

  initUserInfo(){
    this.api.userInfo(this.uid)
      .subscribe(f=>{
        console.log(f)
        // 验证用户登录状态
        if(f["status"]==true){
          this.getUserTodayGroup()
          // this.dismiss()  //关闭当前页面
        }else{
          super.showAlert(this.alertCtrl,'登录验证', '自动登录验证失败，可能用户信息已过期，请重新手动登录', '登录')
        }
      },error => console.error('错误：' + error) );
  }

  showAddBtn(){
    let addBtn = document.querySelectorAll('.add_list .icon')[0]
    let add_list_name = document.querySelectorAll('.add_list .add_list_name')[0]
    let add_list_item = document.querySelectorAll('.add_list .add_list_item')[0]
    addBtn['style']['transform'] = 'rotate(45deg)'
    add_list_name.classList.add('add_list_name_addClass')
    add_list_item.classList.add('add_list_item_addClass')
    add_list_name['style']['display'] = 'block'
    add_list_item['style']['display'] = 'block'
    // add_list_name['style']['animation'] = 'nameMoveX 1s cubic-bezier(0,1.55,.99,-0.59) forwards'
    // add_list_item['style']['animation'] = 'itemMoveX 1s cubic-bezier(0,1.55,.99,-0.59) forwards'
    add_list_name['style']['animation'] = 'nameMoveX .5s ease-out forwards'
    add_list_item['style']['animation'] = 'itemMoveY .5s ease-out forwards'
    this.isAddStatus = true
  }

  hideAddBtn(){
    let addBtn = document.querySelectorAll('.add_list .icon')[0]
    let add_list_name = document.querySelectorAll('.add_list .add_list_name')[0]
    let add_list_item = document.querySelectorAll('.add_list .add_list_item')[0]
    addBtn['style']['transform'] = 'rotate(0deg)'
    add_list_name.classList.remove('add_list_name_addClass')
    add_list_item.classList.remove('add_list_item_addClass')
    add_list_name['style']['animation'] = 'scaleSmall .5s linear forwards'
    add_list_item['style']['animation'] = 'scaleSmall .5s linear forwards'
    setTimeout(() => {
      add_list_name['style']['display'] = 'none'
      add_list_item['style']['display'] = 'none'
    }, 500);
    this.isAddStatus = false
  }

  addBtnEvent(status){
    if(!status){
      this.showAddBtn()
    }else{
      this.hideAddBtn()
    }
  }

  addToDoGroup(){
    this.isShowAddGroup = true
    this.isShowShade = true
    this.groupName = ''
    this.hideAddBtn()
    this.openShade('.add_group_box', '.add_group_input')
  }
  
  addToDoItems(){
    this.isShowAddItems = true
    this.isShowShade = true
    this.itemsName = ''
    this.hideAddBtn()
    this.openShade('.add_items_box', '.add_items_input')
    setTimeout(() => {
      if(this.groupList.length){
        let add_items_list_box = document.querySelectorAll('.add_items_list_box .add_items_list')[0]
        add_items_list_box['classList']['add']('add_items_list_active')
        // 初始化当前 将要添加的组
        this.currentGroup.name = add_items_list_box.innerHTML
        this.currentGroup.idx = 0
      }else{
        document.querySelector('.add_items_list_box').innerHTML = '<div>请先添加一个待办组吧</div>'
      }
    }, 100);
  }

  /**
   * 
   * @param status 是否为敲击键盘监听事件
   * @param str 组名称 (17个字 限字数，添加完之后 清空)
   * @param event 键盘事件
   */
  addToGroup(status, str, event){
    let isNext: boolean
    function bgColor(){
      var r = Math.floor( Math.random() * 256)
      var b = Math.floor( Math.random() * 256)
      var g = Math.floor( Math.random() * 256)
      return "rgb("+r+","+g+","+b+")"
    }

    if(status){ // 键盘监听事件
      if (event && event.keyCode == 13) {
        // 回车事件
        isNext = true
      }else{
        isNext = false
      }
    }else{  // 手动点击事件
      isNext = true
    }

    if(isNext){
      if(this.groupName){
        if(this.groupName.length <= 17){
          // 添加到组列表中
          var loading = super.showLoading(this.loadingCtrl,"loading...")
          this.api.todolistAddGroup(this.uid, str, bgColor())
            .subscribe(f=>{
              console.log(f)
              // 验证用户登录状态
              if(f["status"]==true){
                loading.dismiss()
                super.showToast(this.toastCtrl, f['msg'])
              }else{
                loading.dismiss()
              }
            },error => console.error('错误：' + error) );
          // 重新渲染组列表
          this.getUserTodayGroup()
  
          // this.groupList.push({name: str, color: bgColor()})
          this.groupName = ''
        }else{
          this.toastCtrl.create({
            message: '亲少打点字吧，17个字以下最好啦😊',
            duration: 1500
          }).present()
        }
      }else{
        this.toastCtrl.create({
          message: '要输入名字哦，总不能让我给你写吧👿',
          duration: 1500
        }).present()
      }
    }
  }

  /**
   * 
   * @param status 是否为敲击键盘监听事件
   * @param str 成员名称 (限字数 14)
   * @param event 键盘事件
   */
  addToItems(status, str, event){
    let isNext: boolean
    if(status){ // 键盘监听事件
      if (event && event.keyCode == 13) {
        // 回车事件
        isNext = true
      }else{
        isNext = false
      }
    }else{  // 手动点击事件
      isNext = true
    }

    if(isNext){
      if(this.itemsName){
        if(this.itemsName.length <= 14){
          if(this.currentGroup.name){
            // if(!this.itemsList[this.currentGroup.idx]){
            //   this.itemsList[this.currentGroup.idx] = []
            // }
            // this.itemsList[this.currentGroup.idx].push({name: str, checked: false})
  
            var loading = super.showLoading(this.loadingCtrl,"loading...")
            let gid = this.groupList[this.currentGroup.idx].gid
            this.api.todolistAddItems(this.uid, gid, str)
              .subscribe(f=>{
                console.log(f)
                // 验证用户登录状态
                if(f["status"]==true){
                  loading.dismiss()
                  super.showToast(this.toastCtrl, f['msg'])
                }else{
                  loading.dismiss()
                }
              },error => console.error('错误：' + error) );
            // 重新渲染组列表
            this.getUserTodayGroup()
  
            this.itemsName = ''
            this.toastCtrl.create({
              message: '已将 「'+ str +'」 添加至 「'+ this.currentGroup.name +'」 待办组',
              duration: 1500
            }).present()
          }else{
            this.toastCtrl.create({
              message: '请先添加一个待办组吧',
              duration: 1500
            }).present()
          }
        }else{
          this.toastCtrl.create({
            message: '亲少打点字吧，14个字以下最好啦😊',
            duration: 1500
          }).present()
        }
      }else{
        this.toastCtrl.create({
          message: '要输入事件哦，总不能让我给你写吧👿',
          duration: 1500
        }).present()
      }
    }
  }

  checkAddItems(name, e){
    // e.target.parentNode.children['remove']('add_items_list_active')
    let childrens = e.target.parentNode.children
    for(var i = 0,len = childrens.length; i < len; i++){
      childrens[i].classList['remove']('add_items_list_active')
      if(i<len-1){
        if(name === this.groupList[i].groups){
          this.currentGroup.idx = i
        }
      }
    }
    e.target.classList['add']('add_items_list_active')
    this.currentGroup.name = name
  }
  
  checked(groupIdx, itemsIdx, name, status, items: ItemSliding){
    items.close()
    this.currentEditItems.groupIdx = groupIdx
    this.currentEditItems.itemsIdx = itemsIdx
    this.currentEditItems.name = name

    let gid = this.groupList[groupIdx].gid
    let iid = this.itemsList[groupIdx][itemsIdx].iid
    let isFinish = !status? 1 : 0
    let isDelete = this.itemsList[groupIdx][itemsIdx].is_delete
    this.api.todolistUpdateItems(this.uid, gid, iid, name, isFinish, isDelete)
      .subscribe(f=>{
        if(f["status"]){
          // this.getUserTodayGroup()
          this.itemsList[groupIdx][itemsIdx].is_finish = !status
        }else{
          super.showToast(this.toastCtrl, '待办事项修改失败')
        }
      },error => console.error('错误：' + error) );
  }

  /**
   * 打开 遮罩层
   */
  openShade(boxClassName, inputClassName){
    this.boxClassName = boxClassName
    setTimeout(() => {
      this.el.nativeElement.querySelector(boxClassName).style.top = '95px'
      this.el.nativeElement.querySelector('.close_shade').style.bottom = '40%'
      setTimeout(() => {
        this.el.nativeElement.querySelector(inputClassName).focus()
        // this.editItemsInput.setFocus()
        // this.el.nativeElement.querySelector('.add_items_input input').focus()
        // document.querySelectorAll('.add_items_input')[0].setFocus()
      },150)
    })

    this.isShowShade = true
    this.el.nativeElement.querySelector('.content').style.filter = 'blur(5px)'
    this.el.nativeElement.querySelector('.header').style.filter = 'blur(5px)'
  }

  /**
   * 关闭 遮罩层
   */
  closeShade(){
    setTimeout(() => {
      this.el.nativeElement.querySelector(this.boxClassName).style.top = '-150px'
      this.el.nativeElement.querySelector('.close_shade').style.bottom = '0%'
      setTimeout(() => {
        this.isShowAddGroup = false
        this.isShowAddItems = false
        this.isShowEditItems = false
        this.isShowEditGroup = false
        this.isShowShade = false
      }, 500);
    });
    this.el.nativeElement.querySelector('.content').style.filter = 'none'
    this.el.nativeElement.querySelector('.header').style.filter = 'none'
  }

  /**
   * 编辑 待办事项 
   * @param groupIdx 组下标
   * @param itemsIdx 组成员下标
   * @param name 待办事项名称
   * @param items 
   */
  editItems(groupIdx, itemsIdx, name, items: ItemSliding){
    // this.currentEditItems.name = this.itemsList[groupIdx][itemsIdx].name
    items.close()
    this.currentEditItems = {
      groupIdx: groupIdx,
      itemsIdx: itemsIdx,
      name: name
    }
    this.isShowEditItems = true
    this.openShade('.edit_items_box', '.add_items_input')
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
  }

  editGroup(groupIdx, name, color){
    this.currentEditGroup = {
      name: name,
      color: color,
      groupIdx: groupIdx
    }
    this.isShowEditGroup = true
    this.openShade('.edit_group_box', '.add_group_input')
    // setTimeout(() => {
    //   this.el.nativeElement.querySelector('.add_group_input').focus()
    // },150)
  }

  /**
   * 
   * @param status 是否为敲击键盘监听事件
   * @param str 成员名称 (限字数 14)
   * @param event 键盘事件
   */
  confirmItemsName(status, name, event){
    let isNext: boolean
    if(status){ // 键盘监听事件
      if (event && event.keyCode == 13) {
        // 回车事件
        isNext = true
      }else{
        isNext = false
      }
    }else{  // 手动点击事件
      isNext = true
    }

    if(isNext){
      let gid = this.groupList[this.currentEditItems.groupIdx].gid
      let iid = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].iid
      let isFinish = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].is_finish
      let isDelete = this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].is_delete
      this.api.todolistUpdateItems(this.uid, gid, iid, name, isFinish, isDelete)
        .subscribe(f=>{
          if(f["status"]){
            // this.getUserTodayGroup()
            this.itemsList[this.currentEditItems.groupIdx][this.currentEditItems.itemsIdx].items = name
          }else{
            super.showToast(this.toastCtrl, '待办事项修改失败')
          }
        },error => console.error('错误：' + error) );
    }
  }

  confirmGroupName(name){
    let gid = this.groupList[this.currentEditGroup.groupIdx].gid
    let groups = name
    let color = this.groupList[this.currentEditGroup.groupIdx].color
    let isDelete = this.groupList[this.currentEditGroup.groupIdx].is_delete
    this.api.todolistUpdateGroup(this.uid, gid, groups, color, isDelete)
      .subscribe(f=>{
        if(f["status"]){
          this.getUserTodayGroup()
        }else{
          super.showToast(this.toastCtrl, '待办组名修改失败')
        }
      },error => console.error('错误：' + error) );

    // this.groupList[this.currentEditGroup.groupIdx].name = name
  }

  deleteItems(groupIdx, itemsIdx, name, items: ItemSliding){
    items.close()
    this.currentEditItems.groupIdx = groupIdx
    this.currentEditItems.itemsIdx = itemsIdx
    this.currentEditItems.name = name

    let gid = this.groupList[groupIdx].gid
    let iid = this.itemsList[groupIdx][itemsIdx].iid
    let isFinish = this.itemsList[groupIdx][itemsIdx].is_finish

    let alert = this.alertCtrl.create({
      title: '删除',
      message: '删除待办组「'+ this.groupList[groupIdx].groups +'」中待办事项「'+ name +'」吗 ?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.toastCtrl.create({
              message: '以后可要三思而后行哦',
              duration: 1500
            }).present()
          }
        },
        {
          text: '确定',
          handler: () => {
            this.api.todolistUpdateItems(this.uid, gid, iid, name, isFinish, 1)
              .subscribe(f=>{
                if(f["status"]){
                  this.itemsList[groupIdx].splice(itemsIdx, 1)
                }else{
                  super.showToast(this.toastCtrl, '待办事项删除失败')
                }
              },error => console.error('错误：' + error) );
          }
        }
      ]
    })
    alert.present()
  }

  deleteGroup(groupIdx){
    this.currentGroup.idx = groupIdx
    this.isShowOtherShade = true
    this.el.nativeElement.querySelectorAll('.close_other')[groupIdx].style.display = 'inline-block'
    this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.add('delete_group_shake')
  }
  
  closeOtherShade(isDelete, groupIdx = this.currentGroup.idx){
    this.isShowOtherShade = false
    this.el.nativeElement.querySelectorAll('.close_other')[groupIdx].style.display = 'none'
    this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.remove('delete_group_shake')
    if(isDelete){
      this.el.nativeElement.querySelectorAll('.group_items_box')[groupIdx].classList.add('delete_group')
      setTimeout(() => {
        let gid = this.groupList[groupIdx].gid
        let groups = this.groupList[groupIdx].groups
        let color = this.groupList[groupIdx].color
        this.api.todolistUpdateGroup(this.uid, gid, groups, color, 1)
          .subscribe(f=>{
            if(f["status"]){
              this.groupList.splice(groupIdx, 1)
              this.itemsList.splice(groupIdx, 1)
              this.showHeader()
            }else{
              super.showToast(this.toastCtrl, '待办组删除失败')
            }
          },error => console.error('错误：' + error) );
      }, 700)
    }
  }

  getItemsList(i){
    return this.itemsList[i]
  }

  colorPicker(val) {
    console.log(val)
    let gid = this.groupList[this.currentEditGroup.groupIdx].gid
    let groups = this.groupList[this.currentEditGroup.groupIdx].groups
    let isDelete = this.groupList[this.currentEditGroup.groupIdx].is_delete
    this.api.todolistUpdateGroup(this.uid, gid, groups, val, isDelete)
      .subscribe(f=>{
        if(f["status"]){
          this.currentEditGroup.color = val
          this.groupList[this.currentEditGroup.groupIdx]['color'] = val
        }else{
          super.showToast(this.toastCtrl, '待办组颜色修改失败')
        }
      },error => console.error('错误：' + error) );
  }
  
  stopDefaultBlur(){
    setTimeout(() => {
      this.el.nativeElement.querySelector('.color_selector').blur()
    }, 150);
  }

  editItemsDoubleClick(groupIdx, itemsIdx, name, items: ItemSliding){
    this.count++
    setTimeout(() => {
      if(this.count > 1){
        this.count = 0
        this.editItems(groupIdx, itemsIdx, name, items)
      }else{
        this.count = 0
      }
    }, 250)
  }

  showHeader(){
    if(this.groupList.length <= 2){
      this.ionHeader.nativeElement.style.display = 'block'
      this.header._elementRef.nativeElement.style.opacity = 1
    }
  }

  ionContentScroll(e){
    // console.log(e)

    // 沉浸式
    let headerHeight = document.body.scrollWidth/1.875
    let opacity = (headerHeight - e.scrollTop) / headerHeight //设置滚动距离300的时候导航栏消失
    this.header._elementRef.nativeElement.style.opacity = opacity
    if(opacity > 0){
      // console.log(this.header._elementRef)
      // console.log(this.ionHeader._elementRef)
      this.ionHeader.nativeElement.style.display = 'block'
    }else{
      this.ionHeader.nativeElement.style.display = 'none'
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
  }

  saveUserLocation(address, business, lng, lat){
    this.api.userLocation(this.uid, address, business, lng, lat)
      .subscribe(f=>{
        if(f["status"]){
          // 成功存入本次记录
        }else{
          super.showToast(this.toastCtrl, '用户地理位置失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }




  getLocationByBrowser(){
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


    let that = this
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS){
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(rs) {
          var lbs_point = '';
          var address = '';
          if (rs.surroundingPois.length > 0) {
            lbs_point = rs.surroundingPois[0].point.lng+","+rs.surroundingPois[0].point.lat;
            address =  rs.surroundingPois[0].title;
          } else {
            lbs_point = rs.point.lng+","+rs.point.lat;
            address = rs.address;
          }
          console.log(rs)

          that.saveUserLocation(rs.address, rs.business, rs.point.lng, rs.point.lat)
        })
      }
    },{
        enableHighAccuracy : false
      }
    )


    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp)
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    
    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   console.log(data)
    // });
  }
  
  getLocationByIp() {
    let myCity = new BMap.LocalCity();
    myCity.get(result => {
      console.log(result)
      let cityName = result.name;
      console.log("当前定位城市:" + cityName);
    });
  }


  mapTest(){
    let myIcon = new BMap.Icon("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542011881784&di=479e68d4b134c4fdd40080ab6e57cbe2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c2ac57beb18d0000012e7eaa6d19.jpg%401280w_1l_2o_100sh.jpg", new BMap.Size(32, 32));
    let map = new BMap.Map(this.mapElement.nativeElement, {
      enableMapClick: true
    }); //创建地图实例
    map.enableScrollWheelZoom(); //启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); //连续缩放效果，默认禁用
    let point = new BMap.Point(118.06, 24.27); //坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 8); //设置中心和地图显示级别
    
    var marker = new BMap.Marker(point, { icon: myIcon });  // 创建标注
    // var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 100,     // 信息窗口高度
      title : "厦门东软慧聚科技有限公司" , // 信息窗口标题
      enableMessage:true,//设置允许信息窗发送短息
      message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
    }
    var infoWindow = new BMap.InfoWindow("地址：北京东软慧聚科技有限公司", opts);  // 创建信息窗口对象 
    marker.addEventListener("click", function(){          
      map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
    
  }
  

}


