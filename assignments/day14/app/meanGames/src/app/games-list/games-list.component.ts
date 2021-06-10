import { Component, OnInit } from '@angular/core';

import { GamessDataService } from "../gamess-data.service";

export class Game {
  _id!: number;
  title!: string;
  price!: number;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
  publisher!: {
    name: string
  };
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  title: string = "These are all the games: "

  games: Game[] = []; // = [this.game01, this.game02]
  constructor(private gamesDataService : GamessDataService) { }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames() : void {
    this.gamesDataService.getGames().then(res => this.success(res)).catch(err => this.error(err))
  }

  private success(response : Game[]){
    this.games = response;
  }

  private error(err : any){
    console.log(err);
  }
}
