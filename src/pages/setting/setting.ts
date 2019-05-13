import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { BaseUi } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

import { AboutAppPage } from '../about-app/about-app'
import { UserinfoPage } from '../userinfo/userinfo'
import { RegisterPage } from '../register/register'

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends BaseUi{

  uid: any
  headface: string;
  selectTheme : string ;
  userInfo: any;

  constructor(public navCtrl: NavController, 
    public storage : Storage ,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public viewCtrl : ViewController ,
    public navParams: NavParams) {
      super()
  }

  ionViewDidLoad() {
    this.getUserId().then((val)=>{ 
      this.uid = val
      this.initUserInfo(val)
    })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }
  removeUserId(): Promise<string> {
    return this.storage.remove('uid').then((value) => {
      return value;
    });
  }

  initUserInfo(uid){
    this.api.userInfo(uid)
      .subscribe(f=>{
        console.log(f)
        if(f["status"]==true){
          this.userInfo = f['data']
          console.log(this.userInfo)
        }else{
          super.showToast(this.toastCtrl,'用户信息已过期，请重新登录')
        }
      },error => console.error('错误：' + error) );
  }

  getUserAvatar(){
    return this.userInfo ? 
      'http://laijiayang.cn/todolist/imgs/avatar/' + this.userInfo['avatar'] + '.jpg'
    :
      'http://laijiayang.cn/todolist/imgs/avatar/emoji/emoji_28.jpg'
  }

  getUserIntro(){
    return this.userInfo ? 
      this.userInfo['intro'] ? this.userInfo['intro'] : '这个人很懒，什么话都没有留下'
    :
      '没有获取用户信息，请退出重新登录'
  }

  getUserNickname(){
    return this.userInfo ? 
      this.userInfo['nickname'] ? this.userInfo['nickname'] : this.userInfo['uname']
    :
      '没有获取用户信息'
  }

  /**
   * 跳转用户编辑页面
   */
  jumpUserPage(){
    this.navCtrl.push(UserinfoPage);
  }

  /**
   * 扫描二维码
   */
  goToScanQRCode(){

  }

  /**
   * 夜间模式切换
   */
  cutTheme(){

  }

  /**
   * 关于 该app
   */
  goToVersions(){
    this.navCtrl.push(AboutAppPage);
  }
  
  /**
   * 退出登录
   */
  exit(){
    this.removeUserId()
    this.dismiss()
    this.navCtrl.push(RegisterPage);
  }

}
