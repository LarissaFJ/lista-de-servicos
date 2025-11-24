import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Servico } from '../models/servico';
import { ServicosService } from '../servicos/services';

@Component({
  selector: 'app-lista-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css'],
})
export class ListaServicosComponent implements OnInit {
  private api = inject(ServicosService);
  servicos: Servico[] = [];
  q = '';

  ngOnInit() { this.buscar(); }

  buscar() {
    this.api.list({ q: this.q, size: 100 }).subscribe(p => this.servicos = p.content);
  }

  removerServico(index: number) {
    const servico = this.servicos[index];
    if (servico.id && confirm('Confirma excluir?')) {
      this.api.delete(servico.id).subscribe(() => this.buscar());
    }
  }
}
