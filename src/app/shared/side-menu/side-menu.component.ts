import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideMenu } from 'src/app/models/side-menu/side-menu';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuardsService } from 'src/app/services/guards/guards.service';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';

@Component({
  selector: 'track-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public sideMenu: SideMenu[];
  user: User;
  constructor(
    private activeRoute: ActivatedRoute,
    private guardService: GuardsService,
    private authService: AuthService,
    private sideMenuService: SideMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSideMenu();
    this.guardService.currentUser.subscribe((user) => (this.user = user));
  }
  public logout(): void {
    this.authService.logout();
  }
  public getSideMenu(): void {
    this.sideMenuService.get().subscribe((response: SideMenu[]) => {
      this.sideMenu = response;
      /**
       * @description
       * in case of reload window or navigate
       */
      // tslint:disable-next-line: no-string-literal
      let routeType = this.activeRoute.snapshot['_routerState'].url?.split('/');
      routeType = routeType[routeType.length - 1];
      this.handleClickSideMenu(
        response.find((menu) => menu?.link === routeType)
      );
    });
  }
  public handleClickSideMenu(menu: SideMenu): void {
    this.router.navigate([`main/list/${menu.link}`]);
    this.sideMenuService.currentMenu$.next(menu);
  }
}
