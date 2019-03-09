import { FileItem } from './../models/file-item';
import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { puts } from 'util';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) {}

  private guardarImagen(
    imagen: {
      nombre: string,
      url: string,
    }
  ) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
    .add(imagen);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();
    for (const imagen of imagenes) {
      imagen.estaSubiendo = true;
      if (imagen.progreso >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${imagen.nombreArchivo}`)
          .put(imagen.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => imagen.progreso =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (error) => console.log('Error al subir: ', error),
      () => {
        console.log('Imagen cargada correctamente');
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          imagen.url = downloadURL;
          imagen.estaSubiendo = false;
          this.guardarImagen({
            nombre: imagen.nombreArchivo,
            url: imagen.url
          });
        });
      });
    }
  }
}
