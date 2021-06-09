import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamessDataService {
  private BASE_URL : string = "http://localhost:5000/api"

  constructor(private http : HttpClient) { }

  public getGames() : Promise<Game[]> {
    // define url
    const url : string = this.BASE_URL + '/games';

    // tell http service to make request
    // convert observable to a promise
    // convert response to sjon
    // return response
    // catch and handle errors
    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  public getGame(gameId: string) : Promise<Game> {
    // define url
    const url : string = this.BASE_URL + '/games/' + gameId;

    // tell http service to make request
    // convert observable to a promise
    // convert response to sjon
    // return response
    // catch and handle errors
    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  private success(response : any){
    return response;
  }

  private error(err : any){
    console.log(err);
    return null;
  }
}
