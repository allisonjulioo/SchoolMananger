import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenu } from 'src/app/models/side-menu/side-menu';

@Component({
  selector: 'track-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['main', 'list', 'pupils']);
  }

  public handlerAdd(menu: SideMenu): void {}
}
