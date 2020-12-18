import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private authSrv: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authSrv.logoutUser()
      .then(res => {
          console.log(res);
          this.navCtrl.navigateForward('/login');
        }).catch(error => {
          console.log(error);
      });
  }
}
