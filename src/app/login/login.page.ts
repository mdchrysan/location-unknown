import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  form: FormGroup;
  errorMessage = '';

  validationMessages = {
    email: [
      { type: 'pattern', message: 'Please input a valid email.' },
    ],
    password: [{ type: 'required', message: 'Please input the password.' }],
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authSrv: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Trying to login...',
      duration: 3000,
    });
    await loading.present();
  }

  async presentToast(toastMessage, toastColor) {
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom',
      color: toastColor,
    });

    await toast.present();
  }

  loginUser() {
    const value= this.form.value;
    this.presentLoading().then(() => {
      this.authSrv.loginUser(value).then(
        (res) => {
          console.log(res);
          this.errorMessage = '';
          this.navCtrl.navigateForward('/home');
          this.presentToast("Login success", "success");
        },
        (err) => {
          console.log(err);
          this.router.navigateByUrl('/login');
          this.presentToast("Your email or password doesn't valid.", "warning");
        }
      );
    })
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
