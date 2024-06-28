import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Observable, Subscription, timeout } from 'rxjs';
import { AuthStatus } from './auth/interfaces/user.interface';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  
  private authService = inject(AuthService);
  public isLoading: boolean = true;
  public isLoggedIn?: Subscription;


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn().subscribe(status => {
      if (status !== AuthStatus.Checking) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoggedIn?.unsubscribe();
  }

}
