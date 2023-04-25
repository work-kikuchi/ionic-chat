import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  login:{
    email:string,
    password:string
  } = {
    email: '',
    password: ''
  }
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  async signIn():Promise<void>{
    await this.auth.authSignIn(this.login)
  }

}
