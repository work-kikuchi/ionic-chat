import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { first, concatMap } from 'rxjs/operators';
import { lastValueFrom, Observable, firstValueFrom } from 'rxjs';

export interface IUser {
  displayName: string;
  photoDataUrl: string;
}

export interface IMessage {
  uid: string;
  message: string;
  timestamp: number;
}

export interface IChat extends IUser, IMessage {}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<IUser> | undefined;
  messageCollection: AngularFirestoreCollection<IMessage>;
  userCollection: AngularFirestoreCollection<IUser>;

  private readonly fireStore = inject(AngularFirestore);

  constructor() {
    this.messageCollection = this.fireStore.collection<IMessage>(
      'chat',
      (ref) => ref.orderBy('timestamp', 'desc')
    );
    this.userCollection = this.fireStore.collection<IUser>('users');
  }

  messageAdd(message: IMessage): Promise<DocumentReference<IMessage>> {
    return this.messageCollection.add(message);
  }

  chatInit(): Observable<IChat[]> {
    return this.messageCollection.valueChanges({ idField: 'messageId' }).pipe(
      concatMap(async (message) => {
        const users = await firstValueFrom(
          this.userCollection.valueChanges({ idField: 'uid' }).pipe(first())
        );
        return message.map((message) => {
          const user = users?.find((u) => u.uid === message.uid);
          return Object.assign(message, user);
        });
      })
    );
  }

  userInit(uid: string): Promise<IUser | undefined> {
    this.userDoc = this.fireStore.doc<IUser>('users/' + uid);
    return lastValueFrom(this.userDoc.valueChanges().pipe(first()));
  }

  async userSet(user: IUser): Promise<void> {
    await this.userDoc?.set(user);
  }
}
