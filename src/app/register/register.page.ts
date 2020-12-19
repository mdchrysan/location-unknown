import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData: any;
  idUser: string;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  validations_form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private router: Router,
    private authSrv: AuthService,
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
    });
  }

  async presentErrorToast() {
    const toast = await this.toastCtrl.create({
      message: 'Failed to register. Please fill all the form.',
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Registering your account...',
      duration: 3000,
    });
    await loading.present();

    const { data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 1000,
    });
    toast.present();
  }

  registerUser() {
    if(this.validations_form.valid){
      this.userData = this.validations_form.value
    }else{
      this.presentErrorToast();
    }

    if(this.userData != null){
      this.presentLoading().then(() => {
        this.authSrv.registerUser(this.userData)
        .then(res => {
          console.log(res);
          this.idUser = res.user.uid;
          this.addUserData();
        }, err => {
          console.log(err);
          this.router.navigateByUrl('/register');
          this.presentToast("Email's already used.", "warning");
        });
      });
    }
    else{
      this.router.navigateByUrl('/register');
      this.presentToast("Register failed.", "danger");
    }
  }

  addUserData(){
    console.log("iduser---> ", this.idUser);
    console.log("userdata---> ", this.userData);
    this.userSrv.create(this.idUser, this.userData)
      .then(res => {
        this.router.navigateByUrl('/login');
        this.presentToast("Register success! Please login.","success");
      })
      .catch(error => console.log(error));;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }
}
