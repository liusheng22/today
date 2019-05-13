import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BaseUi } from '../../common/baseui';

import { MenuPage } from '../menu/menu'
import { TodayPage } from '../today/today'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Injectable()
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUi {

  uid: any
  isShowUserInfo = 0
  message = ''
  userInfo = [
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
  ]
  showSwipe = {
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
  }
  login = {
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
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public api: ApiProvider,
    public storage : Storage,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController) {
      super()
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
  }
  ionViewDidLoad() {
    let bg_login = document.querySelectorAll('.bg_login')[0]
    bg_login['style']['width'] = document.body.scrollHeight + 'px'
    bg_login['style']['height'] = document.body.scrollWidth + 'px'
    // bg_login['style']['width'] = document.body.scrollWidth + 'px'
    // bg_login['style']['height'] = document.body.scrollHeight + 'px'
    
    // content_right
    let content_right = document.querySelectorAll('.content_right')[0]
    content_right['style']['width'] = document.body.scrollWidth + 'px'
    content_right['style']['height'] = document.body.scrollHeight + 'px'
    content_right['style']['left'] = document.body.scrollWidth + 'px'


    
    this.getUserId().then((val)=>{ this.uid = val })
    
  }

  setUserId(uid: string): void {
    this.storage.set('uid', uid);
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }

  input(){
    // console.log(this.userInfo.nickname.nickname)
  }

  focus(i){
    this.userInfo[i].placeholder = ''
    let label = document.querySelectorAll('.input_label')[0]
    label['style']['bottom'] = '35px'
    label['style']['opacity'] = '1'
  }

  blur(i){
    this.userInfo[i].placeholder = this.userInfo[i].text
    let label = document.querySelectorAll('.input_label')[0]
    if(this.userInfo[i].value){
      label['style']['bottom'] = '35px'
      label['style']['opacity'] = 1
    }else{
      label['style']['bottom'] = '0px'
      label['style']['opacity'] = 0
    }
  }
  
  next(i){
    // const toast = this.toastCtrl.create({
    //   message: '操作太快了，慢点哦',
    //   duration: 1000
    // });
    // toast.present();

    let next = document.querySelectorAll('.next_after')[0]
    let bg_animate = document.querySelectorAll('.bg_animate')[0]
    let bg_register = document.querySelectorAll('.bg_register')[0]
    let clientWidth = document.body.clientWidth
    next['style']['width'] = '200px'
    next['style']['opacity'] = 1
    bg_animate['style']['width'] = (i+1) * 20 + '%'
    setTimeout(() => {
      this.isShowUserInfo++
      if(!this.showSwipe.back.isSwipe){
        if(this.isShowUserInfo == 1){
          this.showSwipe.back.isShow = true
        }
      }
      if(this.isShowUserInfo === this.userInfo.length){
        // 校验两次输入的密码一致性
        if(this.userInfo[1]['value'] === this.userInfo[4]['value']){
          let uname = this.userInfo[0]['value']
          let upwd = this.userInfo[1]['value']
          let phone = this.userInfo[2]['value']
          let email = this.userInfo[3]['value']
          // 调用注册接口
          this.api.register(uname, upwd , phone , email)
            .subscribe(f=>{
              if(f["status"]==true){
                setTimeout(() => {
                  this.message = '注册成功, 跳转登录...'
                  setTimeout(() => {
                    this.onDragLeft()
                  }, 300)
                }, 300)
              }else{
                super.showToast(this.toastCtrl, f['msg'])
              }
            },error => console.error('错误：' + error) );
        }else{
          super.showAlert(this.alertCtrl,'密码验证', '两次密码输入不一致，请重新输入', '好叭~')
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
    }, 800)
  }

  onDragLeft(){
    this.showSwipe.left.isShow = false
    this.showSwipe.back.isShow = false
    let content_right = document.querySelectorAll('.content_right')[0]
    let bg_register = document.querySelectorAll('.bg_register')[0]
    let bg_login = document.querySelectorAll('.bg_login')[0]
    bg_login['style']['display'] = 'block'
    setTimeout(()=>{
      bg_register['style']['transform'] = 'rotate(-90deg)'
      bg_register['style']['transform-origin'] = '0 100%'
      bg_login['style']['transform'] = 'rotate(-90deg)'
      bg_login['style']['transform-origin'] = '0 0'
      if(!this.showSwipe.left.isSwipe){
        this.showSwipe.right.isShow = true
        this.showSwipe.left.isSwipe = true
      }
      setTimeout(()=>{
        content_right['style']['left'] = 0 + 'px'
        // bg_register['style']['display'] = 'none'
      },500)
    },100)
    
  }
  
  onDragRight(){
    let content_right = document.querySelectorAll('.content_right')[0]
    let bg_register = document.querySelectorAll('.bg_register')[0]
    let bg_login = document.querySelectorAll('.bg_login')[0]
    bg_register['style']['transform'] = 'rotate(0deg)'
    bg_register['style']['transform-origin'] = '0 100%'
    bg_login['style']['transform'] = 'rotate(0deg)'
    bg_login['style']['transform-origin'] = '0 0'
    bg_login['style']['display'] = 'none'
    this.showSwipe.right.isShow = false
    this.showSwipe.right.isSwipe = true
    content_right['style']['left'] = document.body.scrollWidth + 'px'
  }

  backLastInput(){
    if(this.isShowUserInfo >= 1){
      if(!this.showSwipe.back.isSwipe){
        this.showSwipe.back.isShow = false
        this.showSwipe.back.isSwipe = true
      }
    }
    if(this.isShowUserInfo > 0){
      var i = this.isShowUserInfo
      let bg_animate = document.querySelectorAll('.bg_animate')[0]
      bg_animate['style']['width'] = (i-1) * 20 + '%'
      this.isShowUserInfo = i - 1
    }else{
      const toast = this.toastCtrl.create({
        message: '我是有底线的，不能再退了',
        duration: 1000
      })
      toast.present()
    }
  }

  loginFocus(isPwd){
    let tel_input = document.querySelectorAll('.tel_input')[0]
    let pwd_input = document.querySelectorAll('.pwd_input')[0]
    if(!isPwd){
      tel_input['style']['borderBottomLeftRadius'] = '100% 50%'
      tel_input['style']['borderBottomRightRadius'] = '100% 50%'
    }else{
      pwd_input['style']['borderBottomLeftRadius'] = '100% 40%'
      pwd_input['style']['borderBottomRightRadius'] = '100% 40%'
    }

    setTimeout(() => {
      tel_input['style']['borderRadius'] = '6px'
      pwd_input['style']['borderRadius'] = '6px'
    }, 300)
  }

  loginBlur(isPwd){
    let tel_input = document.querySelectorAll('.tel_input')[0]
    let pwd_input = document.querySelectorAll('.pwd_input')[0]
    if(!isPwd){
      tel_input['style']['borderRadius'] = '6px'
    }else{
      pwd_input['style']['borderRadius'] = '6px'
    }
  }

  loginInput(){
    console.log(this.login.tel.value)
  }

  loginEvent(){
    // 调用登录接口
    let upwd = this.login.pwd['value']
    let phone = this.login.tel['value']
    this.api.login(upwd, phone)
      .subscribe(f=>{
        if(f["status"]==true){
          // 将uid存储到storage中
          super.showToast(this.toastCtrl, f['msg'])
          this.setUserId(f['data']['uid'])
          
          // 消失动画 => 页面跳转到 dotolist
          this.showSwipe.right.isShow = false
          let bg_login = document.querySelectorAll('.bg_login')[0]
          let content_right = document.querySelectorAll('.content_right')[0]
          bg_login['style']['backgroundPositionX'] = '-400px'
          content_right['style']['top'] = document.body.scrollHeight + 'px'
          setTimeout(() => {
            // menu 页面负责跳转，而不是直接跳转到today页面！！！
            this.navCtrl.setRoot(MenuPage)
          }, 800);
        }else{
          super.showToast(this.toastCtrl, f['msg'])
        }
      },error => console.error('错误：' + error) );


    
  }
}
