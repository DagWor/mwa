import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthenticationService, Credentials } from '../authentication.service';
import { GamessDataService } from '../gamess-data.service';
import jwtDecode, { JwtPayload } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = "";
  err: string = "";

  password: any = "";
  username: string = "";

  loggedInUser!: string;


  // helper = new JwtHelperService();



  constructor(private appComponent: AppComponent, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login($event: Event): void {
    if (!this.username || !this.password) this.err = "Missing Entries"
    else this.doLogin($event);

  }

  private doLogin($event: Event) {
    $event.preventDefault();
    this.err = "";
    const credentials: Credentials = {
      username: this.username,
      password: this.password

    }

    this.authenticationService.login(credentials).then(response => this.loginSuccess.bind(this, response)()).catch(this.loginError.bind(this))
  }

  private loginSuccess(response: any) {
    sessionStorage.setItem('token', response.token);

    const decoded:any = jwtDecode(response.token);

    console.log(decoded['username'])
    
    this.loggedInUser = decoded['username'] as string;
    // this.router.navigate([""])
    sessionStorage.setItem('user', this.loggedInUser);
    location.href = "/"
  }

  private loginError(error: any) {
    this.err = ""
  }
}
