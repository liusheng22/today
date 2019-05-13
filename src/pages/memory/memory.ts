import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { BaseUi } from '../../common/baseui';

@IonicPage()
@Component({
  selector: 'page-memory',
  templateUrl: 'memory.html',
})
export class MemoryPage extends BaseUi {

  uid: any
  rankList = []
  params = {
    level: 1, // 等级
    width: 3, // 宽为多少的正方形
    lives: 3, // 还有几次错误的机会
    rever: 3, // 该次翻转的个数
    combo: 0, // 连续选对多少次
    click: 0, // 点击的次数
    error: 0, // 在某个关卡点击错误的次数
    score: 0, // 最终得分
    maxLv: 0, // 玩到最高的关卡等级
    time: 2,  // 记忆时间
    last: true,  // 上一次点击是否正确，用来判断Combo
  }
  isReversal = true  // 小方块是否在翻转中
  isGameOver = false
  isComboNum = false
  isComboScore = false
  successTimeout: any
  failTimeout: any
  thisTimeScore = 0
  widthLenArr = [3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7 ,7 ,7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10]  // 每个关卡的边长(大正方型的宽,每个边的小方块个数)
  reversalArr = []  //记录随机翻转的方块的坐标
  reversalClassArr = []  //记录随机翻转的方块的Class
  widthArr = []

  clearFailInterval: any

  constructor(public navCtrl: NavController, 
    public el: ElementRef,
    public storage : Storage ,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      super()
    // this.widthArr = new Array(this.params.width).map((v,i)=>i)
  }

  ionViewDidLoad() {
    this.getUserId().then((val)=>{ 
      this.uid = val
      this.getMemoryRank(val)
    })

    // document.querySelector('.content_memory')['style']['height'] = document.body.scrollWidth + 'px'
  }

  ionViewDidEnter(){
    this.params.width = this.widthLenArr[this.params.level - 1]
    this.initGame(this.params.level, this.params.width)
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

  /**
   * 随机一个某区间的整数
   *
   * @param {*} m 区间最小数
   * @param {*} n 区间最大数
   * @returns
   * @memberof MemoryPage
   */
  randomNum(m, n){
    return parseInt( Math.random() * (n - m) + m )
  }

  /**
   * 随机本轮关卡所需的方块的定位
   *
   * @param {*} len 随机的最大边值
   * @param {*} reversalNum 本轮不得超过的翻转个数
   * @memberof MemoryPage
   */
  randomClass(len, reversalNum){
    console.log(len, reversalNum)
    if(this.reversalClassArr.length < reversalNum){
      let x = this.randomNum(0, len)
      let y = this.randomNum(0, len)
      // 如果这个坐标没有重复，则使用它
      if(this.reversalClassArr.indexOf('x_' + x + '_y_' + y) < 0){
        this.reversalClassArr.push('x_' + x + '_y_' + y)
        this.reversalArr.push({x: x, y: y})
        if(this.reversalClassArr.length < reversalNum){
          this.randomClass(this.params.width, this.params.rever)
        }
      }else{
        // 如果已经存在该 class/坐标，再随机一次
        this.randomClass(this.params.width, this.params.rever)
      }
    }
  }

  initGameParams(){
    this.params = {
      level: 1, // 等级
      width: 3, // 宽为多少的正方形
      lives: 3, // 还有几次错误的机会
      rever: 3, // 该次翻转的个数
      combo: 0, // 连续选对多少次
      click: 0, // 点击的次数
      error: 0, // 在某个关卡点击错误的次数
      score: 0, // 最终得分
      maxLv: 0, // 玩到最高的关卡等级
      time: 2,  // 记忆时间
      last: true,  // 上一次点击是否正确，用来判断Combo
    }
  }

  saveGameLog(isValid){
    this.api.memoryAdd(this.uid, this.params.level, this.params.rever, this.params.combo, this.params.score, this.params.maxLv, isValid)
      .subscribe(f=>{
        if(f["status"]==true){
          // 成绩录入成功
          this.getMemoryRank(this.uid)
        }else{
          super.showToast(this.toastCtrl, '录入成绩失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }

  getMemoryRank(uid){
    // 获得排名列表
    this.api.memoryList(uid)
      .subscribe(f=>{
        if(f["status"]==true){
          this.rankList = f['data']
        }else{
          super.showToast(this.toastCtrl, '获取排名列表失败，请检查网络状态')
        }
      },error => console.error('错误：' + error) );
  }
  
  /**
   * 初始化游戏方块 及 游戏规则
   *
   * @param {*} level 本关卡等级
   * @param {*} len   本关卡方块边长个数
   * @memberof MemoryPage
   */
  initGame(level, len){
    // 清空上一次的白色方块 和 灰色方块
    // this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
    //   v.classList.remove('succ_square')
    //   v.classList.remove('fail_square')
    // })
    // 清空上一次的翻转的方块坐标
    this.reversalArr = []
    // 清空上一次的翻转的方块Class
    this.reversalClassArr = []
    // 定大正方形边长
    this.widthArr = new Array(len).map((v,i)=>i)
    // 定每个小方块的 宽高
    setTimeout(() => {
      this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
        v['style']['width'] = 90/len + '%'
      })
      this.el.nativeElement.querySelectorAll('.x_memory_box').forEach((v, i)=>{
        v['style']['height'] = 90/len + '%'
      })
    })
    // 规定该关卡的最多翻转个数
    let reversalMaxNum = ((len * len) - 1) % 2 ? (len * len)/2 - 1 : ((len * len) - 1)/2
    // 规定该关卡的翻转个数
    let reversalNum = level + 2
    this.params.rever = level + 2
    console.log(len, level)
    // 随机翻转某些方块 让玩家记忆
    this.randomClass(len, reversalNum)
    
    console.log(this.reversalArr)
    console.log(this.reversalClassArr)
    // 翻转方块方法1：
    setTimeout(() => {
      setTimeout(() => {
        this.reversalClassArr.forEach((v, i) => {
          this.el.nativeElement.querySelector('.'+v).classList.add('square_rotate_show')
          console.log('正在翻转？')
          setTimeout(() => {
            this.el.nativeElement.querySelector('.'+v).classList.remove('square_rotate_show')
            this.isReversal = false
            console.log('翻转完了？')
          }, 2700);
        })
      })
    }, 500)
    // 翻转方块方法2：
    // setTimeout(() => {
    //   this.reversalClassArr.forEach((v, i) => {
    //     this.el.nativeElement.querySelector('.'+v).classList.add('square_rotate_static')
    //     this.el.nativeElement.querySelector('.'+v).classList.add('succ_square')
    //   })
    // })
    // setTimeout(() => {
    //   this.reversalClassArr.forEach((v, i) => {
    //     this.el.nativeElement.querySelector('.'+v).classList.remove('square_rotate_static')
    //     this.el.nativeElement.querySelector('.'+v).classList.add('square_rotate_back')
    //     setTimeout(() => {
    //       this.el.nativeElement.querySelector('.'+v).classList.remove('succ_square')
    //       this.el.nativeElement.querySelector('.'+v).classList.remove('square_rotate_back')
    //     }, 500);
    //   })
    // }, 2000)

  }

  initWhiteSquare(){
    // 定时 2秒后将所有方块还原，并开始下一关卡
    // setTimeout(() => {
      this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
        v.classList.remove('square_rotate_back')
      })
      this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
        v.classList.remove('square_rotate_back')
      })
      this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
        v.classList.add('square_rotate_static')
      })
      this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
        v.classList.add('square_rotate_static')
      })
      setTimeout(() => {
        this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
          v.classList.remove('succ_square')
          v.classList.remove('fail_square')
          v.classList.remove('square_rotate_static')
        })
        this.startGame()
      }, 500)
    // }, 2000)
  }

  startGame(){
    this.params.width = this.widthLenArr[this.params.level - 1]
    this.initGame(this.params.level, this.params.width)
  }


  // 选择对的时候
  selectRight(el){
    el.classList.add('square_rotate_y')
    setTimeout(()=>{
      el.classList.remove('square_rotate_y')
      el.classList.add('succ_square')
    }, 500)
  }

  // 选择错误的时候
  selectFail(el){
    el.classList.add('square_rotate_y')
    setTimeout(()=>{
      el.classList.remove('square_rotate_y')
      el.classList.add('fail_square')
    }, 500)
  }

  // 重新开始游戏
  againGame(){
    // 关闭 Again 窗口
    this.isGameOver = false
    // 如果重新开始，就清除掉这个定时器
    clearInterval(this.clearFailInterval)
    // 快速清除所有 灰色 和 白色 小方块
    this.initWhiteSquare()
    // 初始化游戏数据
    this.initGameParams()
  }

  squareEvent(e){
    let el = e.target
    this.params.click++
    if(this.params.click < this.params.rever){
      // 如果这次点击 小于或等于 方块个数，则这次点击为有效
      if(this.reversalClassArr.indexOf(el.classList[1]) >= 0){
        // 如果点击对了，则翻转过来，并定为白色，计算得分score，再combo加1，last为true
        this.selectRight(el)
        this.params.combo++
        this.thisTimeScore = this.params.combo * this.params.level
        this.params.score += this.params.combo * this.params.level
        if(!this.params.last){
          // 如果上次错的，修订为正确值
          this.params.last = true
        }
        // 如果上一次是错的，就展示第一次Combo计数；上一次的对的，也展示连续Combo次数
        this.isComboNum = true
        this.isComboScore = true
        // 定时关掉Combo提示
        clearTimeout(this.successTimeout)
        this.successTimeout = setTimeout(() => {
          this.isComboNum = false
          this.isComboScore = false
        }, 2000)
        // setTimeout(() => {
        //   this.startGame()
        // }, 1000);
      }else{
        // 如果点击的错了，则翻转过来，并定为灰色，且关卡点击错误计数error加1
        this.params.error++
        this.params.combo = 0
        this.params.last = false
        if(this.params.error < 3){
          // 本关卡错误次数小于3次
          this.selectFail(el)
        }else if(this.params.error == 3){
          // 本关卡错误次数刚好3次
          this.selectFail(el)
          // 生命值lives减1
          this.params.lives--
          if(this.params.lives > 0 && this.params.level > 1){
            // 生命值lives大于等于0，且当前关卡等级是大于1的，可以降低一级level，然后继续游戏
            this.params.click = 0
            this.params.error = 0
            // this.params.maxLv = this.params.level
            if(this.params.level <= 1){
              this.params.level = 1
            }else{
              this.params.level--
            }
            super.showToast(this.toastCtrl, '退回上一级关卡，还有 '+ this.params.lives +' 机会哦~')
            // 定时 2秒后将所有方块还原，并开始下一关卡
            this.clearFailInterval = setTimeout(() => {
              this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
                v.classList.remove('square_rotate_back')
              })
              this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
                v.classList.remove('square_rotate_back')
              })
              this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
                v.classList.add('square_rotate_static')
              })
              this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
                v.classList.add('square_rotate_static')
              })
              setTimeout(() => {
                this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
                  v.classList.remove('succ_square')
                  v.classList.remove('fail_square')
                  v.classList.remove('square_rotate_static')
                })
                this.startGame()
              }, 500)
            }, 2000)
          }else{
            // game over，本轮游戏结束，点击重新开始的时候记得初始化游戏参数！！！
            // this.initGameParams()
            super.showToast(this.toastCtrl, '很遗憾，已经给了3次机会了，再来一次吧~')
            // 保存该次游戏
            this.saveGameLog(1)
            this.isGameOver = true
          }
        }
      }
    }else if(this.params.click == this.params.rever){
      // 如果这次点击是本关卡最后一次，先判断点对还是错
      this.isReversal = true
      if(this.reversalClassArr.indexOf(el.classList[1]) >= 0){
        // 如果点击对了，则翻转过来，并定为白色，计算本次得分，且本轮结束让关卡level加1，combo加1，
        this.selectRight(el)
        this.params.combo++
        this.thisTimeScore = this.params.combo * this.params.level
        this.params.score += this.params.combo * this.params.level
        this.params.level++
        if(!this.params.last){
          // 如果上次错的，修订为正确值
          this.params.last = true
        }
        // 如果上一次是错的，就展示第一次Combo计数；上一次的对的，也展示连续Combo次数
        this.isComboNum = true
        this.isComboScore = true
        // 清空点击次数click 和 点击错误次数
        this.params.click = 0
        this.params.error = 0
        // 记录本轮关卡的等级+1作为最高等级，中途失败的不记录
        this.params.maxLv = this.params.level
        // 定时关掉Combo提示
        clearTimeout(this.successTimeout)
        this.successTimeout = setTimeout(() => {
          this.isComboNum = false
          this.isComboScore = false
        }, 2000)
        super.showToast(this.toastCtrl, '真厉害，恭喜进入第'+ this.params.level +'关卡')
        // 定时 2秒后将所有方块还原，并开始下一关卡
        setTimeout(() => {
          this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
            v.classList.remove('square_rotate_back')
          })
          this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
            v.classList.remove('square_rotate_back')
          })
          this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
            v.classList.add('square_rotate_static')
          })
          this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
            v.classList.add('square_rotate_static')
          })
          setTimeout(() => {
            this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
              v.classList.remove('succ_square')
              v.classList.remove('fail_square')
              v.classList.remove('square_rotate_static')
            })
            this.startGame()
          }, 500)
        }, 2000)
      }else{
        // 虽然点击错了，方块翻转过来，并定为灰色，且关卡点击错误计数error加1，combo断了
        this.params.error++
        this.params.combo = 0
        this.params.last = false
        this.selectFail(el)
        if(this.params.error < 3){
          // 但是本关卡错误次数小于3次，进入下一关卡，并清除click 和  error
          this.params.level++
          // 记录本轮关卡的等级+1作为最高等级，中途失败的不记录
          this.params.maxLv = this.params.level
          // 清空点击次数click 和 点击错误次数
          this.params.click = 0
          this.params.error = 0
          // 定时 2秒后将所有方块还原，并开始下一关卡
          setTimeout(() => {
            this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
              v.classList.remove('square_rotate_back')
            })
            this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
              v.classList.remove('square_rotate_back')
            })
            this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
              v.classList.add('square_rotate_static')
            })
            this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
              v.classList.add('square_rotate_static')
            })
            setTimeout(() => {
              this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
                v.classList.remove('succ_square')
                v.classList.remove('fail_square')
                v.classList.remove('square_rotate_static')
              })
              this.startGame()
            }, 500)
          }, 2000)
        }else if(this.params.error == 3){
          this.isReversal = true
          // 本关卡错误次数已经3次，将生命值lives减1,关卡等级level也减1
          this.params.lives--
          if(this.params.lives > 0 && this.params.level > 1){
            // 生命值lives大于等于0，且当前关卡等级是大于1的，可以降低一级level，然后继续游戏
            // 清空点击次数click 和 点击错误次数
            this.params.click = 0
            this.params.error = 0
            // this.params.maxLv = this.params.level
            if(this.params.level <= 1){
              this.params.level = 1
            }else{
              this.params.level--
            }
            super.showToast(this.toastCtrl, '退回上一级关卡，还有 '+ this.params.lives +' 机会哦~')
            // 定时 2秒后将所有方块还原，并开始下一关卡
            setTimeout(() => {
              this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
                v.classList.remove('square_rotate_back')
              })
              this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
                v.classList.remove('square_rotate_back')
              })
              this.el.nativeElement.querySelectorAll('.succ_square').forEach((v, i)=>{
                v.classList.add('square_rotate_static')
              })
              this.el.nativeElement.querySelectorAll('.fail_square').forEach((v, i)=>{
                v.classList.add('square_rotate_static')
              })
              setTimeout(() => {
                this.el.nativeElement.querySelectorAll('.def_square').forEach((v, i)=>{
                  v.classList.remove('succ_square')
                  v.classList.remove('fail_square')
                  v.classList.remove('square_rotate_static')
                })
                this.startGame()
              }, 500)
            }, 2000)
          }else{
            // game over，本轮游戏结束，点击重新开始的时候记得初始化游戏参数！！！
            super.showToast(this.toastCtrl, '第一关就错了，笨死了，再来一次吧~')
            this.saveGameLog(0)
            this.isGameOver = true
          }
        }
      }
    }else{
      // 如果意外超过的话，该将点击次数值 清零了
      this.params.click = 0
    }
  }

}
