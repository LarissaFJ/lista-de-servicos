import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Servico, ServicoCategoria } from '../models/servico';
import { ServicosService } from '../servicos/services';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-editar-servico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-servico.component.html',
  styleUrls: ['./editar-servico.component.css'],
})
export class EditarServicoComponent implements OnInit {
  private api = inject(ServicosService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  
  constructor(private router: Router) {}

  categorias: { label: string; value: ServicoCategoria }[] = [
    { label: 'Serviços Gerais', value: 'SERVICOS_GERAIS' },
    { label: 'Culinária', value: 'CULINARIA' },
    { label: 'Animais', value: 'ANIMAIS' },
    { label: 'Beleza e Estética', value: 'BELEZA_E_ESTETICA' },
    { label: 'Tecnologia e Informática', value: 'TECNOLOGIA_E_INFORMATICA' },
    { label: 'Educação', value: 'EDUCACAO' },
    { label: 'Outros Serviços', value: 'OUTROS_SERVICOS' },
  ];

  servico: Servico = { nome: '', telefone: '', categoria: 'OUTROS_SERVICOS', descricao: '' };
  servicoId: number | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.servicoId = +params['id'];
        this.carregarServico();
      } else {
        alert('ID do serviço não encontrado');
        this.router.navigate(['/meus-servicos']);
      }
    });
  }

  carregarServico() {
    if (this.servicoId) {
      this.api.get(this.servicoId).subscribe({
        next: (servico) => {
          this.servico = servico;
        },
        error: (e) => {
          alert('Erro ao carregar serviço: ' + (e?.error?.message ?? 'Serviço não encontrado'));
          this.router.navigate(['/meus-servicos']);
        }
      });
    }
  }

  salvarAlteracoes() {
    if (this.servicoId) {
      this.api.update(this.servicoId, this.servico).subscribe({
        next: () => {
          alert('Serviço atualizado com sucesso!');
          this.router.navigate(['/meus-servicos']);
        },
        error: e => alert('Erro ao atualizar: ' + (e?.error?.message ?? 'verifique os campos')),
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}