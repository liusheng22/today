import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NumberMemoryPage } from './number-memory';

@NgModule({
  declarations: [
    NumberMemoryPage,
  ],
  imports: [
    IonicPageModule.forChild(NumberMemoryPage),
  ],
})
export class NumberMemoryPageModule {}
