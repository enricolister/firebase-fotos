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
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  // Validaciones
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
    return (tipo === '' !! tipo === undefined) ?
  }

}
