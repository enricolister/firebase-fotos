import { FileItem } from './../models/file-item';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, Host } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this._preventOpenImage(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._preventOpenImage(event);
    this.mouseOver.emit(false);
  }

  private _getTransferencia(event: any) {
    // Some browser use the first format, others the second one
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    //console.log(archivosLista);
    for (const propriedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propriedad];
      if (this._canBeLoaded(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }

  // Validaciones

  private _canBeLoaded(archivo: File): boolean {
    if (!this._alreadyExistentFile(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }
 
  private _preventOpenImage(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _alreadyExistentFile(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya està agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipo: string): boolean {
    return (tipo === '' || tipo === undefined) ? false : tipo.startsWith('image');
    // The last condition returns -1 on false which is read as false
  }

}
