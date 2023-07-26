import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'
import { UserState } from '../state/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  toggle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  xporcentaje: BehaviorSubject<number> = new BehaviorSubject(0);

  //Permisos
  public interfaces = [];
  public persona: any = {};

  inscripcionSeleccionada: BehaviorSubject<any> = new BehaviorSubject(0);
  cad: Subject<string> = new Subject<string>();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly messageService: MessageService,
    //private readonly store: Store<{ user: UserState }>
    ) {
  }

  private createHeaders(): HttpHeaders {

    const headers = new HttpHeaders({
      //? Get token from localstorge
      "Authorization": `Bearer ${localStorage.getItem("Authorization")}`,
      "apikey": environment.apikey,
      "Content-Type": "application/json"
    });
    return headers;
  }


  /*
  ? T: Specific type
  ? null: Server response 200 but without body response
  ? void: An error during http petition execution
  */
  public async get<T>(url: string): Promise<T | null | void> {

    const headers = this.createHeaders();

    try {
      return await new Promise((resolve, reject) => {
        this.http.get<T>(url, { headers, observe: "response" }).subscribe({

          next: (response: HttpResponse<T>) => {
            resolve(response.body);
          },

          error: (err: HttpErrorResponse) => {
            reject(err);
          }

        });
      })
    } catch (error: HttpErrorResponse | any) {
      console.log(error);
      this.handleError(error.status);
    }
  }

  public async post<T>(url: string, obj: Object = {}): Promise<T | null | void> {
    const headers = this.createHeaders();

    try {
      return await new Promise((resolve, reject) => {
        this.http.post<T>(url, obj, { headers, observe: "response" }).subscribe({

          next: (response: HttpResponse<T>) => {
            resolve(response.body);
          },

          error: (err: HttpErrorResponse) => {
            reject(err);
          }

        });
      })
    } catch (error: HttpErrorResponse | any) {
      this.handleError(error.status);
    }
  }


  public async put<T>(url: string, obj: Object = {}): Promise<T | null | void> {
    const headers = this.createHeaders();

    try {
      return await new Promise((resolve, reject) => {
        this.http.put<T>(url, obj, { headers, observe: "response" }).subscribe({

          next: (response: HttpResponse<T>) => {
            resolve(response.body);
          },

          error: (err: HttpErrorResponse) => {
            reject(err);
          }

        });
      })
    } catch (error: HttpErrorResponse | any) {
      this.handleError(error.status);
    }
  }


  public async patch<T>(url: string, obj: Object = {}): Promise<T | null | void> {
    const headers = this.createHeaders();

    try {
      return await new Promise((resolve, reject) => {
        this.http.patch<T>(url, obj, { headers, observe: "response" }).subscribe({

          next: (response: HttpResponse<T>) => {
            resolve(response.body);
          },

          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        });
      })
    } catch (error: HttpErrorResponse | any) {
      this.handleError(error.status);
    }
  }

  public async delete<T>(url: string): Promise<T | null | void> {
    const headers = this.createHeaders();

    try {
      return await new Promise((resolve, reject) => {
        this.http.delete<T>(url, { headers, observe: "response" }).subscribe({

          next: (response: HttpResponse<T>) => {
            resolve(response.body);
          },

          error: (err: HttpErrorResponse) => {
            reject(err);
          }

        });
      })
    } catch (error: HttpErrorResponse | any) {
      this.handleError(error.status);
    }
  }

  private handleError(errorCode: number) {
    switch (errorCode) {

      case 401:
        this.router.navigateByUrl("/unauthorized");
        break;
      case 403:
        this.logout();
        break;
      default:
        console.error(`Unhandled exeption: ${errorCode}`);
        break;

    }
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigateByUrl('/login');
  }




  //! ---------------Funciones que hacen peticiones--------------- //
  // [GET]
  // public async request(url: string) {
  //   const headers = this.getCabecera();
  //   let ans = await new Promise((resolve, reject) => {
  //     this.http.get(url, { headers, observe: 'response' }).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         resolve(response.body);
  //       },
  //       error: (err) => {
  //         if(err.status == 401 || err.status == 403)
  //           this.logOut();
  //         reject(err);
  //       }
  //     })
  //   });
  //   return ans;
  // }


  // [POST]
  // public async requestPost(url: string, obj: any = null) {
  //   const headers = this.getCabecera();
  //   let ans = await new Promise((resolve, reject) => {
  //     this.http.post(url, obj, { headers, observe: 'response' }).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         resolve(response.body);
  //       },
  //       error: (err) => {
  //         if (err.status == 401 || err.status == 403)
  //           this.logout();
  //         reject(err);
  //       }
  //     })
  //   });
  //   return ans;
  // }

  uploadPhoto(file: File) {
    this.xporcentaje.next(0);
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xmlRequest = new XMLHttpRequest();
      formData.append('files', file, file.name);

      xmlRequest.onreadystatechange = function () {
        if (xmlRequest.readyState === 4) {
          if (xmlRequest.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xmlRequest.response));
          } else {
            console.log('Fallo la solictud');
            reject(JSON.parse(xmlRequest.response));
          }
        }
      };
      let url = environment.urlFile;
      xmlRequest.open('POST', url, true);
      xmlRequest.upload.onprogress = (e) => {
        var percentComplete = Math.ceil((e.loaded / e.total) * 100);
        this.xporcentaje.next(percentComplete);
      };
      // xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage.getItem('Authorization') == null ? '' : localStorage.getItem('Authorization')));
      xmlRequest.send(formData);
    });
  }

  mostrarToast(obj: { severity: string, summary: string, detail: string }) {
    this.messageService.add(obj);
  }


}
