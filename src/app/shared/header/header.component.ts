import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SideMenu } from 'src/app/models/side-menu/side-menu';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';

@Component({
  selector: 'track-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: SideMenu;
  @Output() public add: EventEmitter<SideMenu> = new EventEmitter();
  constructor(private sideMenuService: SideMenuService) {}

  ngOnInit(): void {
    this.sideMenuService.currentMenu.subscribe((menu) => {
      this.menu = menu;
    });
  }
  public handleAdd(): void {
    this.add.next(this.menu);
  }
}
