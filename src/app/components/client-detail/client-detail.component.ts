import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from './../../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/Cliente';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  cliente?:Cliente
  clienteForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private clienteService:ClienteService, private formbuilder: FormBuilder){
   this.getClientbyId()
  }

  id?:string;
  getClientbyId(){
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.clienteService.getByID(this.id).subscribe((clienteResponse) => (this.cliente = clienteResponse))

    this.clienteForm = this.formbuilder.group ({
      nome: [this.cliente?.nome],
      telefone: [this.cliente?.telefone],
      id: [this.cliente?.id]
    })

    alert(this.id);
  }

  update():void{
    if(this.clienteForm.valid){
      const clienteAlterado:Cliente = {
        nome: this.clienteForm.value.nome,
        telefone: this.clienteForm.value.telefone,
        id: this.clienteForm.value.id
      }
      this.clienteService.atualizar(clienteAlterado).subscribe()
      alert("Alterando com sucesso")
  }

}}
