import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = "";
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }


  login( email: string, password: string ){
    const data = { email, password };
    console.log('te odio pinche cors')

    return new Promise( resolve =>{

      this.http.post(`${URL}/user/login`, data)
      .subscribe( async resp => {
        console.log(resp);
  
        if( resp['ok' as keyof typeof resp] ){
          let tokenDB = resp['token' as keyof typeof resp];
          if (typeof tokenDB === 'string') {
            await this.guardarToken(tokenDB);
            resolve(true);
          }
        } else {
          this.token = "";
          this.storage.clear();
          resolve(false);
        }
  
      });
      
    });


  }

  logOut(){
    this.token = "";
    this.usuario = {};
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  registro( usuario: Usuario,){

    return new Promise( resolve =>{

      this.http.post(`${URL}/user/create`, usuario)
      .subscribe( async resp => {
        console.log(resp);

        if( resp['ok' as keyof typeof resp] ){
          let tokenDB = resp['token' as keyof typeof resp];
          if (typeof tokenDB === 'string') {
            await this.guardarToken(tokenDB);
            resolve(true);
          }
        } else {
          this.token = "";
          this.storage.clear();
          resolve(false);
        }

      });

    });

  }

  getUsuario(){

    if( !this.usuario._id ){
      this.validaToken();
    }

    return{ ...this.usuario};
  }

  async guardarToken( token: string ){

    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  
  }

  async crearStorage(){
    this.storage.create();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || '';
  }

  async validaToken(): Promise<boolean> {

    this.crearStorage();

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token,
      });

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {
          if (resp['ok' as keyof typeof resp]) {
            this.usuario = resp['usuario' as keyof typeof resp] as Usuario;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });

    });
  }

  actualizarUsuario( usuario: Usuario ){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve =>{

      this.http.post(`${URL}/user/update`, usuario, { headers })
      .subscribe( resp => {
        console.log(resp);
          
          if( resp['ok' as keyof typeof resp] ){
            let tokenDB = resp['token' as keyof typeof resp];
            if (typeof tokenDB === 'string') {
              this.guardarToken(tokenDB);
              resolve(true);
            }
          } else {
            resolve(false);
          }

      });

    });
  }


}
