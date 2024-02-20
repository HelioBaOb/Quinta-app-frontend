import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const URL = environment.url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  

  constructor(private http: HttpClient,
              private storage: Storage) { }


  login( email: string, password: string ){
    const data = { email, password };
    console.log(data);

    this.http.post(`${URL}/user/login`, data, httpOptions)
    .subscribe( resp => {
      console.log(resp);
    });


  }


}
