import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ModalController, IonContent, ViewWillEnter } from '@ionic/angular';
import { ProfilePage } from '../shared/profile/profile.page';
import { AuthService } from '../auth/auth.service';
import { FirestoreService, IChat, IUser } from '../shared/firestore.service';
import { Observable } from 'rxjs';

// pre-commitテスト
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, ViewWillEnter {
  message = '';
  // @ts-ignore
  uid: string;
  // @ts-ignore
  user: IUser;
  // @ts-ignore
  chat: Observable<IChat[]>;
  @ViewChild(IonContent, { static: true }) // @ts-ignore
  content: IonContent;

  private readonly modalController = inject(ModalController);
  private readonly auth = inject(AuthService);
  private readonly fireStore = inject(FirestoreService);

  constructor() {}

  async ngOnInit(): Promise<void> {
    const user = await this.fireStore.userInit(await this.auth.getUserId());
    if (!user) {
      const modal = await this.modalController.create({
        component: ProfilePage,
      });
      await modal.present();
      modal.onWillDismiss().then(() => {
        this.ionViewWillEnter();
      });
    }
    this.chat = this.fireStore.chatInit();
  }

  async ionViewWillEnter(): Promise<void> {
    this.uid = await this.auth.getUserId();
    // @ts-ignore
    this.user = await this.fireStore.userInit(this.uid);
  }

  async postMessage() {
    if (!this.user) {
      alert('プロフィールの登録が必要です');
      return;
    }
    await this.fireStore.messageAdd({
      uid: this.uid,
      message: this.message,
      timestamp: Date.now(),
    });
    this.message = '';
    await this.content.scrollToTop(100);
  }

  trackByFn(index: any, item: any) {
    return item.messageId;
  }
}
