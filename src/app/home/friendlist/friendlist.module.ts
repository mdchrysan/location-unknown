import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendlistPageRoutingModule } from './friendlist-routing.module';

import { FriendlistPage } from './friendlist.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendlistPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FriendlistPage]
})
export class FriendlistPageModule {}
