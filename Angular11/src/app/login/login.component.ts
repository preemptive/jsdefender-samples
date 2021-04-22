import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/app.states';
import { Login } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  loader: any;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (state.errorMessage != null) {
        this.errorMessage = state.errorMessage;
      } else {
        this.errorMessage = state.errorMessage;
      }

    });
  }

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      dob: this.user.dob
    };
    this.loader = true;
    this.store.dispatch(new Login(payload));
    this.loader = false;
  }

}
