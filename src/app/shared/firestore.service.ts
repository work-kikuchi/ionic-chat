import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { first } from "rxjs/operators";
import { lastValueFrom } from "rxjs";

export interface IUser{
  displayName:string,
  photoDataUrl:string
}
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<IUser> | undefined;
  constructor(
    private fireStore: AngularFirestore
  ) { }

  userInit(uid:string):Promise<IUser | undefined>{
    this.userDoc = this.fireStore.doc<IUser>('users/'+uid);
    return lastValueFrom(this.userDoc.valueChanges().pipe(first()))
  }

  async userSet(user: IUser):Promise<void>{
    await this.userDoc?.set(user)
  }
}
