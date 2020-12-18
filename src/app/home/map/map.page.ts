import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  locName: string;
  isCheckedIn: boolean = false;
  infoWindow: any = new google.maps.InfoWindow();
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  curPos: any = {
    lat: -6.175392,
    lng: 106.827153
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap(this.curPos);
  }
  
  showCurrentLoc(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent("Your Current Location");
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
      });
    }
  }

  showMap(pos: any){
    console.log('test Monas', pos);
    const location = new google.maps.LatLng(pos.lat, pos.lng);
    const options = {
      center: location,
      zoom: 13,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  addLocation(){
    var currentTime = new Date().getTime()
    // this.userService.setUserLocation(this.userUid ,this.userLoc, currentTime);
    // this.userService.updateCheckinList(this.userUid, this.locName, currentTime, "add");
    // this.presentToast("Check in added.","success");
    // this.locName = "";
    this.toggleLoc();
  }

  toggleLoc(){
    this.isCheckedIn = !this.isCheckedIn;
  }
}
