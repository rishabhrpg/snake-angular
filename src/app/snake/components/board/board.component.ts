import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnakeGameService } from '../../services/snake-game/snake-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private lastRenderTime: number = 0;

  constructor(
    public snakeGameService: SnakeGameService
  ) { }

  ngOnInit(): void {
    this.snakeGameService.registerKeyboardEvents();
    window.requestAnimationFrame(ctime => this.gameLoop(ctime));
  }

  /**
   * Game loop
   * @param ctime the current time
   */
  private gameLoop(ctime: number): void {
    window.requestAnimationFrame(newTime => this.gameLoop(newTime));
    if (ctime > this.lastRenderTime + 1000 / environment.snakeGame.framesPerSeconds) {
      this.snakeGameService.update();
      this.lastRenderTime = ctime;
    }
  }
}
