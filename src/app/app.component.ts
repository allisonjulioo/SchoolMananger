import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { GuardsService } from './services/guards/guards.service';

@Component({
  selector: 'track-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private defaultTitle = 'Trackto Challenge';
  constructor(
    private router: Router,
    private titleService: Title,
    private guard: GuardsService
  ) {
    this.titleService.setTitle(this.defaultTitle);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join(' | ');
        this.titleService.setTitle(`${this.defaultTitle}: ${title}`);
        this.guard.checkIfUserLogged();
      });
  }
  private getTitle(
    state: RouterState & any,
    parent: ActivatedRoute
  ): NavigationEnd[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
