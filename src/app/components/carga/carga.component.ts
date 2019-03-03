import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { FileItem } from './../../models/file-item';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent {

  archivos: FileItem[] = [];

  constructor(public _cargaImagenes: CargaImagenesService ) { }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

}
