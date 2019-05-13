import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BaseUi } from '../../common/baseui';

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage extends BaseUi {

  uid: any
  userInfo: any
  uname: string
  intro: string
  nickname : string
  gender : string 
  phone : string 
  email : string 
  address : string 

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public storage : Storage ,
    public api: ApiProvider,
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

  initUserInfo(uid){
    this.api.userInfo(uid)
      .subscribe(f=>{
        if(f["status"]==true){
          this.userInfo = f['data']
          this.nickname = this.getUserNickname()
          this.intro = this.getUserIntro()
          this.gender = this.getUserGender()
          this.phone = this.getUserPhone()
          this.email = this.getUserEmail()
          this.address = this.getUserAddress()
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

  getUserUname(){
    return this.userInfo ? 
      this.userInfo['nickname'] ? this.userInfo['nickname'] : this.userInfo['uname']
    :
      '没有获取用户信息'
  }

  getUserGender(){
    return this.userInfo ? 
      this.userInfo['gender']>=0 ? this.userInfo['gender'] + '' : '-1'
    :
      '-1'
  }

  getUserNickname(){
    return this.userInfo ? 
      this.userInfo['nickname'] ? this.userInfo['nickname'] + '' : ''
    :
      ''
  }
  getUserPhone(){
    return this.userInfo ? 
      this.userInfo['phone'] ? this.userInfo['phone'] + '' : ''
    :
      ''
  }
  getUserEmail(){
    return this.userInfo ? 
      this.userInfo['email'] ? this.userInfo['email'] + '' : ''
    :
      ''
  }
  getUserAddress(){
    return this.userInfo ? 
      this.userInfo['address'] ? this.userInfo['address'] + '' : ''
    :
      ''
  }

  updateUserInfo(){
    this.api.userUpdate(this.uid, this.nickname, this.gender, this.phone, this.email, '', this.address, this.intro)
      .subscribe(f=>{
        if(f["status"]==true){
          this.initUserInfo(this.uid)
        }else{
          super.showToast(this.toastCtrl,'用户信息更新失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

}
