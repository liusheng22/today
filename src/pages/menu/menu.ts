import { TodayPage } from '../today/today'
import { ToDoListPage } from '../to-do-list/to-do-list'
import { TabsPage } from './../tabs/tabs';
import { SpecialPage } from './../special/special';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register'
import { ListPage } from '../list/list';
import { SettingPage } from '../setting/setting';
import { Tab1Page } from '../tab1/tab1';
import { ReactiontimePage } from '../reactiontime/reactiontime';
import { MemoryPage } from '../memory/memory';
import { NumberMemoryPage } from '../number-memory/number-memory';
import { FeedbackPage } from '../feedback/feedback'
import { UserinfoPage } from '../userinfo/userinfo'

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { BaseUi } from '../../common/baseui';

export interface PageInterface {
	title:string;
	pageName:string;
	tabComponent?: any;
	index ?: number;
  icon:string;
  color ?: string
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage extends BaseUi {
  uid: any
  isShowIonNav: boolean = false
  isShowDisplay: string = 'none'
  userInfo: any


  // Basic root for our content view 首页显示的路由
  rootPage: any;
  // rootPage: any = TodayPage;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: '今日待办', pageName: '今日待办', tabComponent: TodayPage, icon: 'home', color: 'danger'},
    { title: '方块记忆', pageName: '方块记忆', tabComponent: MemoryPage, icon: 'bulb'},
    { title: '数字记忆', pageName: '数字记忆', tabComponent: NumberMemoryPage, icon: 'bulb'},
    { title: '反应时间', pageName: '反应时间', tabComponent: ReactiontimePage, icon: 'bulb' },
    // { title: '待办备忘', pageName: '待办备忘', tabComponent: ToDoListPage, icon: 'contacts' },
    { title: '意见反馈', pageName: '意见反馈', tabComponent: FeedbackPage, icon: 'contacts' },
  ];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage : Storage ,
      public api: ApiProvider,
      public alertCtrl: AlertController,
    ) {
      super()
    }
    
  ionViewDidLoad() {
    this.getUserId().then((val)=>{ 
      this.uid = val
      this.rootPage = this.uid ? TodayPage : RegisterPage
      // this.rootPage = this.uid ? SettingPage : RegisterPage
      this.initUserInfo()
    })
  }

  ionViewDidEnter(){
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }

  initUserInfo(){
    this.api.userInfo(this.uid)
      .subscribe(f=>{
        console.log(f)
        // 验证用户登录状态
        if(f["status"]==true){
          this.userInfo = f['data']
        }else{
          super.showAlert(this.alertCtrl,'登录验证', '自动登录验证失败，可能用户信息已过期，请重新手动登录', '登录')
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

  openPage(page: PageInterface){
  	let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index }
    }
    
    console.log(this.nav.getActiveChildNav())
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else if(page.index != undefined){
      this.nav.setRoot(TabsPage, params);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.tabComponent, params);
    }
  }



  isActive(page: PageInterface) {
    // return page.color
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav()
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary'
      }
      return
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary'
    }
    return
  }




  toSetting(){
    this.navCtrl.push(SettingPage);
  }

}
