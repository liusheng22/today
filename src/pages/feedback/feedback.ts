import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { BaseUi } from '../../common/baseui';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage extends BaseUi {
  question = ''
  qq = ''
  uid: any

  constructor(public navCtrl: NavController,
    public storage : Storage ,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      super()
  }

  ionViewDidLoad() {
    this.getUserId().then((val)=>{ 
      this.uid = val
    })
  }

  getUserId(): Promise<string> {
    return this.storage.get('uid').then((value) => {
      return value;
    });
  }

  sendQuestion(){
    this.api.userQuestion(this.uid, this.question, this.qq)
      .subscribe(f=>{
        if(f["status"]==true){
          this.question = ''
          this.qq = ''
          super.showToast(this.toastCtrl, '反馈成功，谢谢您提的意见，我会好好采纳的！(刘胜)')
        }else{
          super.showToast(this.toastCtrl, '反馈失败，请查看网络状态')
        }
      },error => console.error('错误：' + error) );
  }

}
