import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  title = 'Mean Games';

  constructor() { }

  ngOnInit(): void {
  }
  
  // if(sessionStorage.getItem('token')){ isLoggedIn : boolean = false;}

  loggedInUser? = sessionStorage.getItem('user');
  isLoggedIn : boolean = sessionStorage.getItem('token') ? true  : false;

  logout() {
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
    location.reload();
  }
}
