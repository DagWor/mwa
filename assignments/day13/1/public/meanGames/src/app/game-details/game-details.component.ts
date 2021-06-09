import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../games-list/games-list.component';
import { GamessDataService } from '../gamess-data.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  title: string = "Game Details"

  game!: Game; // = [this.game01, this.game02]
  constructor(private route : ActivatedRoute, private gamesDataService : GamessDataService) { }

  ngOnInit(): void {
    this.getGame();
  }

  private getGame() : void {
    let gameId = this.route.snapshot.params.gameId;
    this.gamesDataService.getGame(gameId!).then(res => this.success(res)).catch(err => this.error(err))
  }

  private success(response : any){
    this.game = response;
  }

  private error(err : any){
    console.log(err);
  }
}
