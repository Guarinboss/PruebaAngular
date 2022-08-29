import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const initCliente = {
  primerNombre :'',
  segundoNombre : '',
  primerApellido : '',
  segundoApellido :'',
  telefono : '',
  direccion  : '',
  ciudadDeResidencia : '',
}

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private cliente$ = new BehaviorSubject<any>(initCliente);

  get selectedClient$():Observable<any> {
    return this.cliente$.asObservable();
  }

  setCliente(cliente: any):void {
    this.cliente$.next(cliente);
  }

  listaClientes : Cliente[] = [];

  private url: string = `${environment.HOST}`;

  constructor(private http: HttpClient) {  }


  getInformacionCliente(numero : String, tipo : String){
    return this.http.get<Cliente[]>(this.url+ "/consultar?numero="+numero+"&tipo="+tipo);
  }
}
