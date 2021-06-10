import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from './games-list/games-list.component';
import { BASE_URL, Credentials } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GamessDataService {
  // private BASE_URL : string = "http://localhost:4000/api"

  constructor(private http : HttpClient) { }

  public getGames() : Promise<Game[]> {
    // define url
    const url : string = BASE_URL + '/games';

    // tell http service to make request
    // convert observable to a promise
    // convert response to sjon
    // return response
    // catch and handle errors
    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  public getGame(gameId: string) : Promise<Game> {
    // define url
    const url : string = BASE_URL + '/games/' + gameId;
    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  public addGame(game : Object) : Promise<Game> {
    // define url
    const url : string = BASE_URL + '/games/';
    return this.http.post(url, game).toPromise().then(this.success).catch(this.error);
  }

  public register(credentials: Credentials) : Promise<Game> {
    // define url
    const url : string = BASE_URL + '/users/';
    return this.http.post(url, credentials).toPromise().then(this.success).catch(this.error);
  }

  public login(credentials: Credentials) : Promise<Game> {
    // define url
    const url : string = BASE_URL + '/auth/';
    return this.http.post(url, credentials).toPromise().then(this.success).catch(this.error);
  }

  private success(response : any){
    return response;
  }

  private error(err : any){
    console.log(err);
    return null;
  }
}
