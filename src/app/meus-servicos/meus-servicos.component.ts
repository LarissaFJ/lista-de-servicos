import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicosService } from '../servicos/services';
import { Servico } from '../models/servico';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-meus-servicos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meus-servicos.component.html',
  styleUrls: ['./meus-servicos.component.css']
})
export class MeusServicosComponent implements OnInit {
  private api = inject(ServicosService);
  private authService = inject(AuthService);
  private router = inject(Router);
  servicos: Servico[] = [];

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.api.list({ size: 100 }).subscribe(p => this.servicos = p.content);
  }

  removerServico(index: number) {
    const servico = this.servicos[index];
    if (servico.id && confirm('Confirma excluir?')) {
      this.api.delete(servico.id).subscribe(() => this.buscar());
    }
  }

  editarServico(index: number) {
    const servico = this.servicos[index];
    if (servico.id) {
      this.router.navigate(['/formulario'], { queryParams: { id: servico.id } });
    }
  }

  cadastrarServico() {
    this.router.navigate(['/formulario']);
  }
}
