import { Observable } from 'rxjs/Rx'
import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ApiProvider {
  // ip = 'http://127.0.0.1:3000';  //本地
  // ip = 'http://www.laiwenge.com';  //服务器
  // ip = 'http://120.79.138.215:3000';  //自己服务器
  ip = 'http://laijiayang.cn:3000';  //自己服务器

  constructor(public http: Http, public https: HttpModule) {
    // console.log('Hello RestProvider Provider');
  }

  
  //后端数据API
    //user
    private UserRegister = this.ip + '/user/register';
    private UserLogin = this.ip + '/user/login';
    private UserUserInfo = this.ip + '/user/userInfo';
    private MemoryAdd = this.ip + '/memory/add';
    private MemoryList = this.ip + '/memory/list';
    private NumberMemoryAdd = this.ip + '/numberMemory/add';
    private NumberMemoryLog = this.ip + '/numberMemory/log';
    private NumberMemoryList = this.ip + '/numberMemory/list';
    private ReactionTimeAdd = this.ip + '/reactionTime/add';
    private ReactionTimeList = this.ip + '/reactionTime/list';
    private TodolistAddGroup = this.ip + '/todolist/addGroup';
    private TodolistAddItems = this.ip + '/todolist/addItems';
    private TodolistGroupList = this.ip + '/todolist/groupList';
    private TodolistItemsList = this.ip + '/todolist/itemsList';
    private TodolistUpdateGroup = this.ip + '/todolist/updateGroup';
    private TodolistUpdateItems = this.ip + '/todolist/updateItems';
    private UserLocation = this.ip + '/user/location'
    private UserQuestion = this.ip + '/user/question'
    private UserUpdate = this.ip + '/user/update'
  //后端数据API-end

  // 第三方API
    private WeatherApi = 'https://free-api.heweather.net/s6/weather/now'


  register(uname, upwd , phone , email): Observable<string[]> {
    return this.getUrlReturn(this.UserRegister + `?uname=${uname}&upwd=${upwd}&phone=${phone}&email=${email} `);
  }
  login(upwd , phone): Observable<string[]> {
    return this.getUrlReturn(this.UserLogin + `?upwd=${upwd}&phone=${phone} `);
  }
  userInfo(uid): Observable<string[]> {
    return this.getUrlReturn(this.UserUserInfo + `?uid=${uid} `);
  }
  memoryAdd(uid, level, reverseNum, combo, score, maxLevel, isValid): Observable<string[]> {
    return this.getUrlReturn(this.MemoryAdd + `?uid=${uid}&level=${level}&reverseNum=${reverseNum}&combo=${combo}&score=${score}&maxLevel=${maxLevel}&isValid=${isValid} `);
  }
  memoryList(uid): Observable<string[]> {
    return this.getUrlReturn(this.MemoryList + `?uid=${uid} `);
  }
  numberMemoryAdd(uid, level, number, answer): Observable<string[]> {
    return this.getUrlReturn(this.NumberMemoryAdd + `?uid=${uid}&level=${level}&number=${number}&answer=${answer} `);
  }
  numberMemoryLog(uid, level, number, answer, isAnswer): Observable<string[]> {
    return this.getUrlReturn(this.NumberMemoryLog + `?uid=${uid}&level=${level}&number=${number}&answer=${answer}&isAnswer=${isAnswer} `);
  }
  numberMemoryList(uid): Observable<string[]> {
    return this.getUrlReturn(this.NumberMemoryList + `?uid=${uid} `);
  }
  reactionTimeAdd(uid, time, isValid): Observable<string[]> {
    return this.getUrlReturn(this.ReactionTimeAdd + `?uid=${uid}&time=${time}&isValid=${isValid} `);
  }
  reactionTimeList(uid): Observable<string[]> {
    return this.getUrlReturn(this.ReactionTimeList + `?uid=${uid} `);
  }
  todolistAddGroup(uid, groups, color): Observable<string[]> {
    return this.getUrlReturn(this.TodolistAddGroup + `?uid=${uid}&groups=${groups}&color=${color} `);
  }
  todolistAddItems(uid, gid, items): Observable<string[]> {
    return this.getUrlReturn(this.TodolistAddItems + `?uid=${uid}&gid=${gid}&items=${items} `);
  }
  todolistGroupList(uid): Observable<string[]> {
    return this.getUrlReturn(this.TodolistGroupList + `?uid=${uid} `);
  }
  todolistItemsList(uid, gid, gidArr): Observable<string[]> {
    return this.getUrlReturn(this.TodolistItemsList + `?uid=${uid}&gid=${gid}&gidArr=${gidArr} `);
  }
  todolistUpdateGroup(uid, gid, groups, color, isDelete): Observable<string[]> {
    return this.getUrlReturn(this.TodolistUpdateGroup + `?uid=${uid}&gid=${gid}&groups=${groups}&color=${color}&isDelete=${isDelete} `);
  }
  todolistUpdateItems(uid, gid, iid, items, isFinish, isDelete): Observable<string[]> {
    return this.getUrlReturn(this.TodolistUpdateItems + `?uid=${uid}&gid=${gid}&iid=${iid}&items=${items}&isFinish=${isFinish}&isDelete=${isDelete} `);
  }
  getTodayWeather(location): Observable<string[]> {
    return this.getUrlReturn(this.WeatherApi + `?location=${location}&key=986e815a614d4b3baedcccf0b62a91ec `);
  }
  userLocation(uid, address, business, longitude, latitude): Observable<string[]> {
    return this.getUrlReturn(this.UserLocation + `?uid=${uid}&address=${address}&business=${business}&longitude=${longitude}&latitude=${latitude} `);
  }
  userQuestion(uid, question, contact): Observable<string[]> {
    return this.getUrlReturn(this.UserQuestion + `?uid=${uid}&question=${question}&contact=${contact} `);
  }
  userUpdate(uid, nickname, gender, phone, email, avatar, address, intro): Observable<string[]> {
    return this.getUrlReturn(this.UserUpdate + `?uid=${uid}&nickname=${nickname}&gender=${gender}&phone=${phone}&email=${email}&avatar=${avatar}&address=${address}&intro=${intro} `);
  }
  

  /**
   * 全局获取 http 请求的方法
   * 
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  /**
   * 处理接口返回的数据  处理成json格式
   * 
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json()
    return body;
  }

  public hideTabs(){  //隐藏tabs选项卡
    let scrollContent = document.querySelectorAll('.scroll-content');
    Object.keys(scrollContent).map((key) => {
      scrollContent[ key ].style.marginBottom = '0px';
    });

    let fixedContent = document.querySelectorAll('.fixed-content');
    Object.keys(scrollContent).map((key) => {
      scrollContent[ key ].style.marginBottom = '0px';
    });

    let tabbarElem = document.querySelectorAll('.tabbar');
    Object.keys(tabbarElem).map((key) => {
      tabbarElem[ key ].style.display = 'none';
    });
  }

  public showTabs(){  //显示tabs选项卡
    let scrollContent = document.querySelectorAll('.scroll-content');
    Object.keys(scrollContent).map((key) => {
      scrollContent[ key ].style.marginBottom = '67px';
    });

    let fixedContent = document.querySelectorAll('.fixed-content');
    Object.keys(scrollContent).map((key) => {
      scrollContent[ key ].style.marginBottom = '67px';
    });

    let tabbarElem = document.querySelectorAll('.tabbar');
    Object.keys(tabbarElem).map((key) => {
      tabbarElem[ key ].style.display = 'flex';
    });
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并处理在 console 中显示 error
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string
    //instanceof 判断是否为Respones
    if (error instanceof Response) {
      const body = error.json() || ""
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.status || ""} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(errMsg)
  }
  
}
