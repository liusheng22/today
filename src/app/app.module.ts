import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ItemSliding } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'; 

import { MyApp } from './app.component';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { TabsPage } from '../pages/tabs/tabs';
import { TodayPage } from '../pages/today/today';
import { ToDoListPage } from '../pages/to-do-list/to-do-list';
import { SpecialPage } from '../pages/special/special';
import { SettingPage } from '../pages/setting/setting';
import { ReactiontimePage } from '../pages/reactiontime/reactiontime'
import { MemoryPage } from '../pages/memory/memory';
import { NumberMemoryPage } from '../pages/number-memory/number-memory';
import { FeedbackPage } from '../pages/feedback//feedback'
import { SplashPage } from '../pages/splash/splash';
import { AboutAppPage } from '../pages/about-app/about-app'
import { UserinfoPage } from '../pages/userinfo/userinfo'

import { Tab1Page } from '../pages/tab1/tab1';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

// 第三方插件
import { ColorPickerModule } from 'ngx-color-picker';
import { ApiProvider } from '../providers/api/api';
// import { AppVersion} from '@ionic-native/app-version'
// import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    MenuPage,
    TabsPage,
    SpecialPage,
    HomePage,
    ListPage,
    TodayPage,
    ToDoListPage,
    SettingPage,
    ReactiontimePage,
    MemoryPage,
    NumberMemoryPage,
    FeedbackPage,
    SplashPage,
    AboutAppPage,
    UserinfoPage,
    Tab1Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ColorPickerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({   //全局定义 storage 引入的方式不一样
      name: 'myApp',
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
      // driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    MenuPage,
    TabsPage,
    TodayPage,
    ToDoListPage,
    SpecialPage,
    HomePage,
    ListPage,
    SettingPage,
    ReactiontimePage,
    NumberMemoryPage,
    MemoryPage,
    FeedbackPage,
    SplashPage,
    AboutAppPage,
    UserinfoPage,
    Tab1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Geolocation,
    // AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
