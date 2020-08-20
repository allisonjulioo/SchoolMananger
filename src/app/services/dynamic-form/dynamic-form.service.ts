import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { PupilsService } from '../pupils/pupils.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  public currentForm$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentForm = this.currentForm$.asObservable();
  public current: any;
  public collection: string;
  constructor(
    private classesService: ClassesService,
    private pupilsService: PupilsService,
    private teachersService: TeachersService
  ) {
    this.currentForm.subscribe((form) => {
      if (!!form) {
        this.current = form;
        this.getForm(this.collection, form);
      }
    });
  }
  public getForm(collection: string, form?: any): any[] {
    this.collection = collection;
    return {
      pupils: [
        {
          type: 'file',
          name: 'picture',
          label: 'Foto perfil',
          required: true,
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
          type: 'text',
          placeholder: 'Escreva seu dada',
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
          type: 'file',
          name: 'picture',
          label: 'Foto perfil',
          required: true,
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
          type: 'text',
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
          label: 'Horario de inicio;',
          value: form?.end_time,
          required: true,
        },
      ],
    }[collection];
  }

  onUpload(e): void {
    console.log(e);
  }
  private async getOptions(
    service: string
  ): Promise<{ id: string; label: string }[]> {
    const data = await this[`${service}Service`].get().toPromise();
    return await data.map((value: { id: string; name: string }) => {
      return { key: value.id, label: value.name };
    });
  }
}
