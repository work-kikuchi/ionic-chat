import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { NavController, AlertController } from "@ionic/angular";
import { firebaseError } from "./firebase.error";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private navController: NavController,
    private alertController: AlertController
  ) { }

  authSignUp(login:{email:string, password:string}){
    return this.fireAuth.createUserWithEmailAndPassword(
      login.email, login.password
    ).then(() => this.navController.navigateForward('/'))
      .catch(async error =>{
        await this.alertError(error)
      })
  }

  authSignIn(login:{email:string, password:string}){
    return this.fireAuth.signInWithEmailAndPassword(
      login.email,login.password
    ).then(()=>this.navController.navigateForward('/'))
      .catch(async error =>{
        await this.alertError(error)
      })
  }

  authSignOut(){
    return this.fireAuth.signOut()
      .then(()=>this.navController.navigateRoot('/auth/signin'))
      .catch(async error=>{
        await this.alertError(error)
      })
  }

  async alertError(e:any){
    if(firebaseError.hasOwnProperty(e.code)){
      // @ts-ignore
      e = firebaseError[e.code]
    }
    const alert = await this.alertController.create({
      header: e.code,
      message: e.message,
      buttons:['閉じる']
    });
    await alert.present()
  }
}
