import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';

@Component({
  selector: 'track-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sideMenuService: SideMenuService
  ) {}

  ngOnInit(): void {
    this.getSideMenu();
  }
  public logout(): void {
    this.authService.logout();
  }
  public getSideMenu(): void {
    this.sideMenuService.get().subscribe((res) => console.log(res));
  }
}
