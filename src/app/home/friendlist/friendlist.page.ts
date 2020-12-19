import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.page.html',
  styleUrls: ['./friendlist.page.scss'],
})
export class FriendlistPage implements OnInit {
  private userData: any;
  searchBar: string;

  constructor(
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.userSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
      )
    ).subscribe(data => {
      this.userData = data;
    });
  }

}
