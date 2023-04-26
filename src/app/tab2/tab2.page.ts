import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ModalController } from "@ionic/angular";
import { ProfilePage } from "../shared/profile/profile.page";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private authService:AuthService,
    private modalController: ModalController
  ) {}

  async openProfile():Promise<void>{
    const modal = await this.modalController.create({
      component:ProfilePage
    })
    await modal.present()
  }

  async signOut(): Promise<void>{
    await this.authService.authSignOut()
  }

}
