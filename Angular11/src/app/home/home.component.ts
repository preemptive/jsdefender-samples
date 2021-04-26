import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogOut } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getState: Observable<any>;
  user = null;

  peoples: any;
  loginUser: any;
  loader: any;
  name: any;

  constructor(
    private authService: AuthService,
    public router: Router,
    private store: Store<AppState>) { this.getState = this.store.select(selectAuthState); }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (state.user) {
        this.user = state.user.username;
      }
    });
    this.retrievePeople();
  }
  retrievePeople(): void {
    if (this.user) {
      this.loader = true;
      this.authService.getItem()
        .subscribe(
          data => {
            this.peoples = data;
            this.loader = false;
          },
          error => {
            this.loader = false;
            console.log(error);
          });
    } else {
      this.router.navigateByUrl('/');
    }
  }
  signout(): void {
    this.store.dispatch(new LogOut());
  }
}
