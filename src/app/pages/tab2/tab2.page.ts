import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string [] = [];
  cargandoGeo = false;
  
  constructor( private postService: PostsService,
               private router: Router,
               private geolocation: Geolocation,
               private camera: Camera) {}

  post= {
    mensaje: '',
    coords: '',
    posicion: false

  }
  
  async crearPost() {

    console.log(this.post);

    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: '',
      posicion: false
    };

    this.tempImages = [];

    this.router.navigateByUrl('/main/tabs/tab1');

  }
  
  getGeo(){

    if(!this.post.posicion){
      this.post.coords = '';
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      //resp.coords.latitude
      //resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      console.log(coords);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }

  camara(){    
      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA
      }
      this.procesarImagen(options);
  }

  libreria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen(options);

  }

  procesarImagen( options: CameraOptions ){
    this.camera.getPicture(options).then(( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc( imageData );

      this.postService.subirImagen( imageData );
      this.tempImages.push( img );
      console.log(img);
    }, (err) => {
      // Handle error
    });

  }

}
