import { Component, Input, OnInit } from '@angular/core';
import { SnakeType } from '../../interfaces/snake.interfaces';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

  @Input()
  public snake!: SnakeType;

  constructor() { }

  ngOnInit(): void {
  }

}
