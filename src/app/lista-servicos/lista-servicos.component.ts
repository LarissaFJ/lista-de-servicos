import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-servicos',
  standalone: true, // Componente standalone
  imports: [CommonModule, RouterModule], // Importa CommonModule e RouterModule
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css'],
})
export class ListaServicosComponent implements OnInit {
  servicos: any[] = []; // Lista de serviços

  constructor() {}

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    const services = localStorage.getItem('services');
    if (services) {
      console.log('Serviços carregados do localStorage:', services); 
      this.servicos = JSON.parse(services);
    } else {
      console.log('Nenhum serviço encontrado no localStorage');
      this.servicos = [];
    }
  }
  

  removerServico(index: number) {
    // Remove o serviço pelo índice
    this.servicos.splice(index, 1);
    // Atualiza o localStorage
    localStorage.setItem('services', JSON.stringify(this.servicos));
  }
}


