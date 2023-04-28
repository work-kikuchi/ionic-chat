import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '../../auth/auth.service';
import { FirestoreService, IUser } from '../firestore.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {
  uid: string = '';
  user: IUser = {
    displayName: '',
    photoDataUrl: '',
  };
  photo: string | undefined = '';

  private readonly modalController = inject(ModalController);
  private readonly authService = inject(AuthService);
  private readonly fireStore = inject(FirestoreService);

  constructor() {}

  ngOnInit() {}

  async ionViewWillEnter(): Promise<void> {
    this.uid = await this.authService.getUserId();
    const user = await this.fireStore.userInit(this.uid);
    if (user) {
      this.user = user;
    }
  }

  async updateProfile(): Promise<void> {
    if (this.photo) {
      this.user.photoDataUrl = this.photo;
    }
    await this.fireStore.userSet(this.user);
    await this.modalController.dismiss();
  }

  async modalDismiss(): Promise<void> {
    await this.modalController.dismiss();
  }

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
    });
    this.photo = image && image.dataUrl;
  }
}
