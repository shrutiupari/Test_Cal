import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-Calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  inp1: number;
  inp2: number;
  result: number;
  symbol: string;
  count: number;

  ngOnInit() {
  }

}
