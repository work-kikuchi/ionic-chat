import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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

  async signUp(){
    console.log('テスト', this.login)
    await this.auth.authSignUp(this.login)
  }

}
