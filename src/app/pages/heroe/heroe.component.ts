import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  actualizar: boolean = false;

  constructor(
    private servicio: FirebaseService,
    private router: ActivatedRoute) {

    this.router.params.subscribe((event) => {
      this.servicio.getHeroe(event.id).subscribe((respuesta) => {
        if (respuesta) {
          this.heroe.id = event.id;
          this.heroe.nombre = respuesta['nombre'];
          this.heroe.poder = respuesta['poder'];
          this.heroe.vivo = respuesta['vivo'];
        }
      });
    });
  }

  ngOnInit(): void {}

  guardar(forma: NgForm) {
    if (forma.invalid) {
      console.log('Formuario no valido');

      return;
    }

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      text: 'Guardando información',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let peticion = new Observable();

    if (this.heroe.id) {
      peticion = this.servicio.actualizarHeroe(this.heroe);
    } else {
      peticion = this.servicio.guardarHeroe(this.heroe);
    }

    peticion.subscribe((dataBack) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }
}
