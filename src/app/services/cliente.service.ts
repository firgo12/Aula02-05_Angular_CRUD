import { Injectable } from '@angular/core';
import {Cliente} from '../interfaces/Cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clienteUrl = "http://localhost:3000/clientes";
  constructor(private http: HttpClient) {

  }

  //Esta lista virá da API
  clientes:Cliente[] = [];

  listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.clienteUrl) as Observable<Cliente[]>

    //return this.clientes;
  }

  getByID(id:string) : Observable<Cliente>{
    return this.http.get(`${this.clienteUrl}/${id}`) as Observable<Cliente>
  }

  remover(id:string){
    //const cliente = this.clientes.find(c => c.id == id);

    // if(cliente){
    //    const index = this.clientes.indexOf(cliente);
    //    this.clientes.splice(index,1);
    // }

    return this.http.delete(`${this.clienteUrl}/${id}`)
  }

  httpHeader = {
    headers:{
      "Content-Type":"application/json"
    }
  };


  atualizar(cliente:Cliente){
    return this.http.put(`${this.clienteUrl}/${cliente.id}`, cliente, this.httpHeader)
  }

  adicionar(cliente:Cliente){

    return this.http.post(this.clienteUrl, cliente, this.httpHeader)

    //this.clientes.push(cliente);
  }
}
