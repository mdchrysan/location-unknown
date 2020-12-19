import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private userEmail: string;
  private idUser: string;
  private userData: any;
  private boolGetData: boolean = false;

  constructor(
    private authSrv: AuthService,
    private navCtrl: NavController,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.getIdUser();
  }

  getIdUser(){
    this.authSrv.userDetails().subscribe(res => {
      console.log("res---> ", res);
      console.log("uid--->", res.uid);
      if(res !== null){
        this.idUser = res.uid;
        this.getUserData();
      }
    }, err => {
      console.log(err);
    })
  }

  getUserData(){
    this.db.object('/user/' + this.idUser).valueChanges().subscribe(data => {
      console.log(data);
      this.userData = data;
      this.userEmail = this.userData.email;
      this.boolGetData = true;
    })
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
