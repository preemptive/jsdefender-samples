import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogOut } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.states';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getState: Observable<any>;
  user: string | null = null;
  peoples: any;
  loader: boolean = false;

  constructor(
    private authService: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.user = state?.user?.username ?? null;
    });

    this.retrievePeople();
  }

  /**
   * this method is used to get planets information
   */
  retrievePeople(): void {
    if (this.user) {
      this.loader = true;

      this.authService.getItem().pipe(
        catchError((error) => {
          this.loader = false;
          console.error(error);
          return of([]);
        })
      ).subscribe({
        next: (data) => {
          this.peoples = data;
          this.loader = false;
        },
        error: (error) => {
          this.loader = false;
          console.log(error);
        }
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  /**
   * this method is used for logout functionality
   */
  signout(): void {
    this.store.dispatch(new LogOut());
  }
}
