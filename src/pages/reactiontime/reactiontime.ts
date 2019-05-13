import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { BaseUi } from '../../common/baseui';

@IonicPage()
@Component({
  selector: 'page-reactiontime',
  templateUrl: 'reactiontime.html',
})
export class ReactiontimePage extends BaseUi {
  @ViewChild('background') background

  isShowBegin: boolean = true
  isShowWait: boolean = false
  isShowClick: boolean = false
  isShowFast: boolean = false
  isShowComplete: boolean = false
  beginInterval: any
  randomSecondNum: number
  timing = {
    begin: 0,
    end: 0,
    result: 0
  }
  uid: any
  rankList = []

  constructor(public navCtrl: NavController, 
    public el: ElementRef,
    public storage : Storage ,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      super()
  }

  ionViewDidLoad() {
    // 先获取该用户 uid
    this.getUserId().then((val)=>{ 
      this.uid = val
      this.getReactionTimeRank(val)
    })
  }

  ionViewDidEnter(){
    // this.background.nativeElement.style.backgroundColor = '#4bdb6a'
    this.changeBgColor('reaction_over')
  }
  
  randomSecond(){
    return Math.random() * 4000 + 1000
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

  changeBgColor(str){
    // 选择要出现的背景色
    this.background.nativeElement.classList.remove('reaction_wait') // 红
    this.background.nativeElement.classList.remove('reaction_true') // 绿
    this.background.nativeElement.classList.remove('reaction_over') // 蓝
    if(str){
      this.background.nativeElement.classList.add(str)
    }
  }

  changeShowPage(){
    // 选择要出现的页面
    this.isShowBegin = false
    this.isShowWait = false
    this.isShowClick = false
    this.isShowFast = false
    this.isShowComplete = false
  }

  getReactionTimeRank(uid){
    // 获得排名列表
    this.api.reactionTimeList(uid)
      .subscribe(f=>{
        if(f["status"]==true){
          this.rankList = f['data']
        }else{
          super.showToast(this.toastCtrl, '获取排名列表失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

  gaming(){
    // 提前随机一个秒数
    this.randomSecondNum = parseInt(this.randomSecond() + '')
    console.log('随机的秒数是： '+ this.randomSecondNum)
    // 计时器 开始
    this.timing.begin = new Date().getTime()
    // 通过这个秒数设定一个 定时器
    this.beginInterval = setTimeout(() => {
      this.changeBgColor('reaction_true')
      this.isShowWait = false
      this.isShowClick = true
      console.log('定时器到点了：'+this.beginInterval)
    }, this.randomSecondNum);
  }

  beginGame(){
    this.changeBgColor('reaction_wait')
    this.isShowBegin = false
    this.isShowWait = true

    this.gaming()
  }

  handleReaction(){
    // 超前按下了，记录下时间搓
    this.timing.end = new Date().getTime()
    // 记录此次无效成绩
    this.beforeHandle()

    // 清空定时器
    clearTimeout(this.beginInterval)

    // 进入 '点击太快' 页面
    this.changeBgColor('reaction_over')
    this.isShowWait = false
    this.isShowFast = true
  }

  againGame(){
    this.timing = {
      begin: 0,
      end: 0,
      result: 0
    }
    // 清空定时器
    clearTimeout(this.beginInterval)
    this.changeBgColor('reaction_wait')
    this.changeShowPage()
    this.isShowWait = true
    this.gaming()
  }

  handleClick(){
    // 准确按下按钮，记录下时间搓，并计算出结果
    this.timing.end = new Date().getTime()
    this.timing.result = (this.timing.end - this.timing.begin) - this.randomSecondNum
    // 记录此次有效成绩
    this.justHandle()

    // 清空定时器
    clearTimeout(this.beginInterval)

    this.changeBgColor('reaction_over')
    this.isShowClick = false
    this.isShowWait = false
    this.isShowComplete = true
  }

  beforeHandle(){
    this.timing.result = this.timing.end - this.timing.begin
    this.api.reactionTimeAdd(this.uid, this.timing.result, 0)
      .subscribe(f=>{
        if(f["status"]==true){
          // 成功存入无效成绩
        }else{
          super.showToast(this.toastCtrl, '成绩录入失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );

    // this.againGame()
  }

  justHandle(){
    this.api.reactionTimeAdd(this.uid, this.timing.result, 1)
      .subscribe(f=>{
        if(f["status"]==true){
          // 成功存入无效成绩
          this.getReactionTimeRank(this.uid)
        }else{
          super.showToast(this.toastCtrl, '成绩录入失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );

    // this.againGame()
  }


}
