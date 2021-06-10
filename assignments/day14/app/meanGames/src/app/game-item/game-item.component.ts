import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input()
  game!:Game
  constructor() {
  }

  ngOnInit(): void {
  }

}
