import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user/user';
@Injectable()
export class HttpUtilService {
  public user: User;
  constructor(private router: Router) {}

  private API_URL = 'http://localhost:8000/';

  url(path: string): string {
    return this.API_URL + path;
  }

  public headers(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (!!this.user.stsTokenManager.accessToken) {
      const authToken = localStorage.token;
      headers.append('Authorization', `Bearer ${authToken}`);
    }
    return { headers };
  }

  public async extrairDados(response: Response): Promise<any> {
    const data = response.json();
    console.log(data);
    return data || {};
  }

  public processarErros(erro: any): Observable<never> {
    if (erro.status === 401) {
      delete localStorage.user;
      location.reload();
      this.router.navigate(['/login']);
    }

    return throwError('Erro acessando servidor remoto.');
  }
}
