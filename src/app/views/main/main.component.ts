import { Component, OnInit } from '@angular/core';
import { SideMenu } from 'src/app/models/side-menu/side-menu';

@Component({
  selector: 'track-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public handlerAdd(menu: SideMenu): void {
    console.log(menu);
  }
}
