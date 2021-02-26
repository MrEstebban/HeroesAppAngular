import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeroeModel } from '../models/heroe.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private Url = 'https://crudbasico-46812.firebaseio.com/heroes';

  constructor(private request: HttpClient) { }

  guardarHeroe(heroe: HeroeModel){
    return this.request.post(this.Url + '.json', heroe)
    .pipe(map(dataBack => {
      return dataBack['name'];
    }));
  }

  actualizarHeroe(heroe: HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.request.put(this.Url + `/${heroe.id}.json`, heroeTemp);
  }

  obtenerListaHeroes(){
    return this.request.get(this.Url + '.json')
    .pipe(
      map(this.transformar_en_array)
    );
  }

  transformar_en_array(respuestaObj: Object){
    
    const heroes: HeroeModel[] = [];

    if(respuestaObj === null){return [];}
    
    Object.keys(respuestaObj).forEach(key => {
      
      const heroe: HeroeModel = respuestaObj[key];
      heroe.id = key;

      heroes.push(heroe);

    })
    
    return heroes;
    
  }

  getHeroe(id: string){
    return this.request.get(this.Url + `/${id}.json`);
  }

  eliminarHeroe(id: string){
    return this.request.delete(this.Url + `/${id}.json`);
  }



}
