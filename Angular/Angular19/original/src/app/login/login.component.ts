import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/app.states';
import { Login } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null = null;
  loader: boolean = false;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.loader = state?.loading ?? false;
      this.errorMessage = state?.errorMessage ?? null;

      if (this.errorMessage) {
        this.loader = false;
      }
    });
  }

  /**
   * This method is a success callback function of login API call.
   */
  onSubmit(): void {
    this.loader = true; 
    const payload = {
      username: this.user.username,
      dob: this.user.dob
    };
    this.store.dispatch(new Login( payload ));
  }

}
