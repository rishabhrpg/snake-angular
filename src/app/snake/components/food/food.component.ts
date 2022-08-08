import { Component, Input, OnInit } from '@angular/core';
import { FoodType } from '../../interfaces/snake.interfaces';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  @Input()
  public food!: FoodType;

  constructor() { }

  ngOnInit(): void {
  }

}
