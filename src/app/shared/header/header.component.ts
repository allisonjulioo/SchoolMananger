import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private activeRoute: ActivatedRoute,
    private sideMenuService: SideMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sideMenuService.currentMenu.subscribe((menu) => {
      this.menu = menu;
    });
  }
  public handleAdd(): void {
    this.router.navigate(['main', 'edit', 'new', this.menu.link]);
    this.add.next(this.menu);
  }
}
