import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/user';
  private userRegisterData: any;
  userRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }

  setRegisterData(userData){
    this.userRegisterData = userData;
  }

  getRegisterData(){
    return this.userRegisterData;
  }

  getAll(): AngularFireList<User> {
    return this.userRef;
  }

  create(key: string, value: any): any {
    return this.userRef.set(key, value);
  }

  update(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }

  getDetail(userId: string) {
    return this.db.object('/user/' + userId).valueChanges();
  }
}
