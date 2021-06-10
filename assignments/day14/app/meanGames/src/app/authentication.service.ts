import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GamessDataService } from './gamess-data.service';

export const BASE_URL : string = "http://localhost:4000/api"

export class Credentials {
    username! : string;
    password! : string;
    name? : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    

  constructor(private http : HttpClient, private gamesDataService: GamessDataService) { }

  public register(credentials : Credentials) : Promise<any> {
    // define url
    return this.gamesDataService.register(credentials).then(this.success).catch(this.error);
  }

  public login(credentials : Credentials) : Promise<any> {
    // define url
    return this.gamesDataService.login(credentials).then(this.success).catch(this.error);
  }

  private success(response : any){
    return response;
  }

  private error(err : any){
    console.log(err);
    return null;
  }
}
