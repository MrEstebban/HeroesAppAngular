import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  hayDatos: boolean = true;
  loading: boolean = true;

  constructor(private servicio: FirebaseService) {}

  ngOnInit(): void {
    this.servicio.obtenerListaHeroes().subscribe((respuesta) => {
      this.loading = false;
      if (respuesta.length == 0) {
        this.hayDatos = false;
      }

      this.heroes = respuesta;
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      icon: 'error',
      title: '¿Esta seguro?',
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(index, 1);

        this.servicio.eliminarHeroe(heroe.id).subscribe((respuesta) => {
          
          if(this.heroes.length == 0){
            this.hayDatos = false;
          }

        });
      }
    });
  }
}
