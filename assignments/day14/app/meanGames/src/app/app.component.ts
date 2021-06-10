import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mean Games';
  
  // if(sessionStorage.getItem('token')){ isLoggedIn : boolean = false;}

  loggedInUser? = sessionStorage.getItem('user');
  isLoggedIn : boolean = sessionStorage.getItem('token') ? true  : false;

  logout() {
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
    location.reload();
  }
}
