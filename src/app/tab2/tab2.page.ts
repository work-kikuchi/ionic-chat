import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private authService:AuthService
  ) {}

  async signOut(): Promise<void>{
    await this.authService.authSignOut()
  }

}
