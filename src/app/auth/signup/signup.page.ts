import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loading = false;
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
    this.loading = true
    await this.auth.authSignUp(this.login).finally(()=>{this.loading=false})
  }

}
