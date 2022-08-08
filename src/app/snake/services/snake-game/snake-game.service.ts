import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Direction, FoodType, SnakeType } from '../../interfaces/snake.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SnakeGameService {
  /**
   * The snake
   */
  public snake!: SnakeType;

  /**
   * Food for the snake
   */
  public food!: FoodType;

  /**
   * Default snake direction
   */
  public snakeDirection: Direction = { x: 0, y: 0 };


  constructor() {
    this.spawnSnake();
    this.spawnFood();
  }

  /**
   * Updates the game
   * called from game loop
   */
  public update(): void {
    this.moveSnake();
  }

  private moveSnake(): void {
    for (let i = this.snake.length - 2; i >= 0; i--) {
      this.snake[i + 1] = { ...this.snake[i] };
    }
    this.snake[0] = {
      x: this.snake[0].x + this.snakeDirection.x,
      y: this.snake[0].y + this.snakeDirection.y,
    };

    if (
      this.checkCollisionWithSnake(this.snake) ||
      this.checkCollisionWithWall(this.snake)
    ) {
      alert("Game Over");
      this.resetState();
      return;
    }
    if (this.eatFood(this.snake, this.food)) {
      console.log("EAT Food");
      const newFood = this.generateFood();
      console.log("New food spawned at : ", newFood);
      this.snake.push(this.food);
      this.food = newFood;
    }
  }

  /**
   * Checks if the snake can eat food
   * @returns true if the snake can eat food false otherwise
   */
  private eatFood(snake: SnakeType, food: FoodType): boolean {
    return snake[0].x === food.x && snake[0].y === food.y;
  }

  /**
   * Checks if the snake is colliding with the snake
   * @param newSnake snake to check collision with
   * @returns true if the snake is colliding with the snake false otherwise
   */
  private checkCollisionWithSnake(newSnake: SnakeType): boolean {
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[0].x === newSnake[i].x && newSnake[0].y === newSnake[i].y) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the snake is colliding with the wall
   * @param newSnake snake to check collision with
   * @returns true if the snake is colliding with the wall false otherwise
   */
  private checkCollisionWithWall(newSnake: SnakeType): boolean {
    return newSnake[0].x < 0 ||
      newSnake[0].x > environment.snakeGame.boardSize ||
      newSnake[0].y < 0 ||
      newSnake[0].y > environment.snakeGame.boardSize;
  }

  /**
   * Generates a food
   * @returns new food
   */
  private generateFood(): FoodType {
    const x = Math.floor(Math.random() * environment.snakeGame.boardSize);
    const y = Math.floor(Math.random() * environment.snakeGame.boardSize);
    if (x === 0 || y === 0) {
      return this.generateFood();
    }
    return { x, y };
  }

  /**
  * Registers a keydown event
  */
  public registerKeyboardEvents(): void {
    console.log('Game controller is ready!');

    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowUp":
          this.snakeDirection = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          this.snakeDirection = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          this.snakeDirection = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          this.snakeDirection = { x: 1, y: 0 };
          break;
      }
    });
  }

  /**
   * Spawns the snake
   */
  public spawnSnake(): void {
    this.snake = [
      {
        x: 12,
        y: 13
      }
    ];
    console.log("Snake spawned at : ", this.snake);

  }

  /**
   * Spawns the food
   */
  public spawnFood(): void {
    this.food = {
      x: 10,
      y: 11
    }
    console.log("Food spawned at : ", this.food);
  }

  public resetState(): void {
    this.spawnSnake();
    this.spawnFood();
    this.snakeDirection = { x: 0, y: 0 };
  }
}
