import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from '../pupils/pupils.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  public currentForm$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentForm = this.currentForm$.asObservable();
  public inTransfer$: BehaviorSubject<any> = new BehaviorSubject(null);
  public inTransfer = this.inTransfer$.asObservable();
  public collection: string;
  publicselectedFile: File = null;
  checkOptions: { id: string; label: string }[] = [];
  constructor(
    private classesService: ClassesService,
    private pupilsService: PupilsService,
    private teachersService: TeachersService,
    private storage: AngularFireStorage
  ) {}
  public getForm(collection: string, form?: any): any[] {
    this.collection = collection;
    return {
      pupils: [
        {
          type: 'file',
          name: 'picture',
          label: '',
          value: form?.picture,
          onUpload: this.onUpload.bind(this),
        },
        {
          type: 'text',
          name: 'name',
          label: 'Nome',
          value: form?.name,
          required: true,
        },
        {
          type: 'number',
          placeholder: 'Sua idade',
          name: 'age',
          label: 'Idade',
          value: form?.age,
          required: true,
        },
        {
          type: 'dropdown',
          name: 'class',
          label: 'Turma',
          value: form?.class,
          required: true,
          options: this.getOptions('classes'),
        },
        {
          type: 'text',
          name: 'responsible_name',
          label: 'Nome do responsável',
          value: form?.responsible_name,
          required: true,
        },
      ],
      teachers: [
        {
          type: 'text',
          name: 'name',
          label: 'Nome',
          value: form?.name,
          required: true,
        },
        {
          type: 'checkbox',
          name: 'classes',
          label: 'Classes',
          required: true,
          options: this.getOptions('classes'),
        },
      ],
      classes: [
        {
          type: 'text',
          name: 'name',
          label: 'Nome da Turma',
          value: form?.name,
          required: true,
        },
        {
          type: 'number',
          name: 'age_range',
          label: 'Faixa etária das crianças',
          value: form?.age_range,
          required: true,
        },
        {
          type: 'dropdown',
          name: 'responsible_teacher',
          label: 'Professor responsável',
          value: form?.responsible_teacher,
          required: true,
          options: this.getOptions('teachers'),
        },
        {
          type: 'text',
          name: 'start_time',
          label: 'Horario de inicio',
          value: form?.start_time,
          required: true,
        },
        {
          type: 'text',
          name: 'end_time',
          label: 'Horario de fim',
          value: form?.end_time,
          required: true,
        },
      ],
    }[collection];
  }
  async returnEssaporra(): Promise<void> {
    this.checkOptions = await this.getOptions('classes');
  }

  onUpload(event): void {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `images/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(`images/${n}`, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((data) => {
            this.inTransfer$.next({ type: 'uploaded', data });
          });
        })
      )
      .subscribe(({ bytesTransferred, totalBytes }) => {
        if (bytesTransferred) {
          this.inTransfer$.next({
            type: 'running',
            data: { bytesTransferred, totalBytes },
          });
        }
      });
  }
  private async getOptions(
    service: string
  ): Promise<{ id: string; label: string }[]> {
    const data = await this[`${service}Service`].get().toPromise();
    const final = await data.map((value: { id: string; name: string }) => {
      return { key: value.id, label: value.name };
    });
    return final;
  }
}
