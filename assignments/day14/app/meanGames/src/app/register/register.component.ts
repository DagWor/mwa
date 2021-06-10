import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Credentials } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message : string = "";
  err : string = "";

  password : any = "";
  passwordRepeat : any = "";
  username : string = "";
  name : string = "";

  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  register() :void {
    if(!this.username || !this.password || !this.passwordRepeat || !this.name){
      this.err = "Missing Entries"
    } else if(this.password !== this.passwordRepeat) this.err = "Passwords do not match"
    else {
      this.doRegister();
    }
  }

  private doRegister(){
    this.err = "";
    const credentials : Credentials = {
      name: this.name,
      username: this.username,
      password: this.password

    }
    this.authenticationService.register(credentials).then(this.registerSuccess).catch(this.registerError)
  }

  private registerSuccess(){
    this.router.navigate(["/games"])
  }

  private registerError(error : string){
    this.err = error
  }
}
