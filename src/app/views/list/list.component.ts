import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pupils } from 'src/app/models/pupils/pupils';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from 'src/app/services/pupils/pupils.service';
import { SideMenuService } from 'src/app/services/side-menu/side-menu.service';
import { TeachersService } from 'src/app/services/teachers/teachers.service';

@Component({
  selector: 'track-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  cards: Pupils[];
  type: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private pupilsService: PupilsService,
    private teachersService: TeachersService,
    private classesService: ClassesService,
    private router: Router,
    private sideMenuService: SideMenuService
  ) {
    this.type = this.activeRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    this.sideMenuService.currentMenu.subscribe((collection) => {
      this.getList(`${collection?.link || this.type}Service`);
    });
  }
  public getList(collection: string): void {
    this[collection].get().subscribe((cards: any) => {
      console.log(cards);
      this.cards = cards;
    });
  }
}
