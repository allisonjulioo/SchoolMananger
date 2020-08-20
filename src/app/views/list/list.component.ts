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
  collectionService: string;
  collection: string;
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
      this.collection = collection?.link;
      this.collectionService = `${collection?.link || this.type}Service`;
      this.getList();
    });
  }
  public getList(): void {
    this[this.collectionService]
      .get()
      .subscribe((cards: any) => (this.cards = cards));
  }
  public handleClickDelete({ id }: any): void {
    this[this.collectionService].delete(id).then(() => this.getList());
  }
  public handleClickEdit({ id }: any): void {
    this.router.navigate(['main', 'edit', id, this.collection]);
  }
}
