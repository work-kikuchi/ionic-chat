import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loading = false
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
    this.loading = true
    await this.auth.authSignIn(this.login).finally(()=>{this.loading = true})
  }

}
