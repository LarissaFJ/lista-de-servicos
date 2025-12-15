import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicosService } from '../servicos/services';
import { Servico } from '../models/servico';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-servicos-cadastrados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicos-cadastrados.component.html',
  styleUrls: ['./servicos-cadastrados.component.css']
})
export class ServicosCadastradosComponent implements OnInit {
  private api = inject(ServicosService);
  private authService = inject(AuthService);
  private router = inject(Router);
  servicos: Servico[] = [];

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    // Admin usa endpoint diferente ou método específico
    this.api.list({ size: 100 }).subscribe({
      next: p => this.servicos = p.content,
      error: err => {
        console.error('Erro ao carregar serviços:', err);
        if (err.status === 403) {
          alert('Acesso negado. Verifique suas permissões de administrador.');
        }
      }
    });
  }

  removerServico(index: number) {
    const servico = this.servicos[index];
    if (servico.id && confirm('Confirma excluir?')) {
      // Admin usa método específico para deletar
      this.api.deleteAdmin(servico.id).subscribe({
        next: () => this.buscar(),
        error: err => {
          console.error('Erro ao remover serviço:', err);
          alert('Erro ao remover serviço. Verifique suas permissões.');
        }
      });
    }
  }

  editarServico(index: number) {
    const servico = this.servicos[index];
    if (servico.id) {
      this.router.navigate(['/editar-servico'], { queryParams: { id: servico.id } });
    }
  }

  cadastrarServico() {
    this.router.navigate(['/formulario']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}