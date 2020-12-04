import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './interfaces/user-data';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-demo2';
  user$: Observable<UserData>;

  constructor(public authService: AuthService) {
    this.user$ = this.authService.user$;
    this.user$.subscribe((user) => console.log(user));
  }
}
