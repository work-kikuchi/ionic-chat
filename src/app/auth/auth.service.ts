import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
    public navController: NavController
  ) { }

  authSignUp(login:{email:string, password:string}){
    return this.fireAuth.createUserWithEmailAndPassword(
      login.email, login.password
    ).then(() => this.navController.navigateForward('/'))
      .catch(error =>{
        console.log(error)
        // throw error;
      })
  }

  authSignIn(login:{email:string, password:string}){
    return this.fireAuth.signInWithEmailAndPassword(
      login.email,login.password
    ).then(()=>this.navController.navigateForward('/'))
      .catch(error =>{
        console.log(error)
        // throw error
      })
  }

  authSignOut(){
    return this.fireAuth.signOut()
      .then(()=>this.navController.navigateRoot('/auth/signin'))
      .catch(error=>{
        console.log(error)
        // throw error;
      })
  }
}
