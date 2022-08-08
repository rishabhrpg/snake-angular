import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SnakeComponent } from './components/snake/snake.component';
import { FoodComponent } from './components/food/food.component';



@NgModule({
  declarations: [
    BoardComponent,
    SnakeComponent,
    FoodComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent
  ]
})
export class SnakeModule { }
