import { Component, OnInit } from '@angular/core';
import { Pupils } from 'src/app/models/pupils/pupils';
import { PupilsService } from 'src/app/services/pupils/pupils.service';

@Component({
  selector: 'track-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  pupils: Pupils[];
  constructor(private pupilService: PupilsService) {}

  ngOnInit(): void {
    this.getPupils();
  }

  public getPupils(): void {
    this.pupilService.get().subscribe((pupils) => (this.pupils = pupils));
  }
}
