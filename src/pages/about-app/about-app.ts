import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AppVersion } from '@ionic-native/app-version'

@IonicPage()
@Component({
  selector: 'page-about-app',
  templateUrl: 'about-app.html',
})
export class AboutAppPage {
  // appName : any ;
  // packageName : string ;
  // versionCode : any ;
  // versionNumber : string ;
  appName = 'Today' ;
  packageName = '今日事今日毕，且提供一些益智游戏' ;
  versionCode = '最新版本' ;
  versionNumber = '1.0.1' ;

  constructor(public navCtrl: NavController, 
    // private appVersion : AppVersion,
    // public plt: Platform,
    public navParams: NavParams) {
      // this.plt.ready().then((readySource)=>{
      //   this.appVersions.getAppName().then((val)=>{
      //     console.log(val)
      //   })
      // })
  }

  ionViewDidLoad() {
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
  }

  ionViewDidEnter(){

  }

}
