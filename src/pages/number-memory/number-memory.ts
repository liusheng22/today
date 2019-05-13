import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { BaseUi } from '../../common/baseui';

@IonicPage()
@Component({
  selector: 'page-number-memory',
  templateUrl: 'number-memory.html',
})
export class NumberMemoryPage extends BaseUi {
  @ViewChild('numInput') numInput

  uid: any
  rankList = []
  interval: any // 定时器
  intervalNum: number // 定时器倒计时的数字
  
  initNum = 1   //初始化数字
  randomNum = '' // 随机展示的数字(字符串)
  inputNum = ''  // 用户输入的答案数字字符串

  isGameInit = true
  isGameBegin = false
  isGameHand = false
  isGameOver = false
  isAnswer = false

  constructor(
    public navCtrl: NavController, 
    public storage : Storage ,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      super()
  }

  ionViewDidLoad() {
    this.getUserId().then((val)=>{ 
      this.uid = val
      this.getNumberMemoryRank(val)
    })
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }

  getUserAvatar(i){
    return this.rankList.length ? 
      'http://laijiayang.cn/todolist/imgs/avatar/' + this.rankList[i]['avatar'] + '.jpg'
    :
      'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg'
  }

  getUserNickname(i){
    return this.rankList.length ? 
      this.rankList[i]['nickname'] ? this.rankList[i]['nickname'] : this.rankList[i]['uname']
    :
      '佚名'
  }

  getUserIntro(i){
    return this.rankList.length ? 
      this.rankList[i]['intro'] ? this.rankList[i]['intro'] : '这个人很懒，什么话都没有留下'
    :
      '没有获取用户信息，请退出重新登录'
  }

  getNumberMemoryRank(uid){
    // 获得排名列表
    this.api.numberMemoryList(uid)
      .subscribe(f=>{
        if(f["status"]==true){
          this.rankList = f['data']
        }else{
          super.showToast(this.toastCtrl, '获取排名列表失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

  initAllStatus(){
    this.isGameInit = false
    this.isGameBegin = false
    this.isGameHand = false
    this.isGameOver = false
  }

  gameInitEvent(){
    this.initAllStatus()
    this.isGameBegin = true

    this.randomNumStr(this.initNum)
    this.startInterval(this.initNum)
  }

  saveGameLog(status){
    // 保存该次游戏记录 log
    this.api.numberMemoryLog(this.uid, this.initNum, this.randomNum, this.inputNum, status)
      .subscribe(f=>{
        if(f["status"]==true){
          // 成功存入本次记录
        }else{
          super.showToast(this.toastCtrl, '本次记录录入失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

  saveGameAdd(){
    // 保存该次游戏记录 log
    this.api.numberMemoryAdd(this.uid, this.initNum, this.randomNum, this.inputNum)
      .subscribe(f=>{
        if(f["status"]==true){
          // 成功存入本次最终成绩
          this.getNumberMemoryRank(this.uid)
        }else{
          super.showToast(this.toastCtrl, '本次成绩记录录入失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

  gameHandEvent(status, event){
    let that = this

    function check(){
      if(that.randomNum == that.inputNum){
        that.saveGameLog(1)
        that.isAnswer = true
        that.initNum++
        that.inputNum = ''
        that.randomNum = ''
        that.gameInitEvent()
      }else{
        that.saveGameLog(0)
        that.saveGameAdd()
        that.isAnswer = false
        that.initAllStatus()
        that.isGameOver = true
      }
    }

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
      check()
    }
  }

  gameNextEvent(){  // 继续游戏
    this.initNum = 1
    this.randomNum = ''
    this.inputNum = ''
    this.gameInitEvent()
  }

  gameOverEvent(){  // 不玩了，结束游戏，回到首页
    // 保存用户游戏成绩

    // 初始化所有数据
    this.initNum = 1
    clearInterval(this.interval)

    // 回到初始页面
    this.initAllStatus()
    this.isGameInit = true
  }

  randomNumStr(num){
    let that = this
    function ran(min, max){
      return that.randomNum += Math.floor(Math.random() * (max - min) + min) + '';
    }
    for (let i = 0; i < num; i++) {
      i ? ran(0, 9) : ran(1, 9)
      console.log('随机出来数字串'+this.randomNum)
    }
  }

  startInterval(num){
    this.intervalNum = num
    this.interval = setInterval(()=>{
      console.log('此时倒计时数：'+num)
      if(num){
        num--
        this.intervalNum = num
      }else{
        clearInterval(this.interval)
        this.initAllStatus()
        this.isGameHand = true
        setTimeout(() => {
          // this.el.nativeElement.querySelector(inputClassName).focus()
          console.log(this.numInput)
          this.numInput.setFocus()
        },150)
      }
    }, 1000)
  }

  endInterval(){
    clearInterval(this.interval)
  }



}
