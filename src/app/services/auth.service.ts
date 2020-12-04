import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;

  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser.uid;
        return this.db.doc<UserData>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private resolveLogin(): void {
    this.router.navigateByUrl('/');
    this.snackBar.open('ログインしました', null);
  }

  private rejectLogin(error: { message: any }): void {
    console.error(error.message);
    this.snackBar.open(
      'ログインエラーです。数秒後にもう一度お試しください。',
      null
    );
  }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await this.afAuth
        .signInWithPopup(provider);
      return this.resolveLogin();
    } catch (error) {
      return this.rejectLogin(error);
    }
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null);
    });
  }
}
