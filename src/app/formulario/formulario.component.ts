import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Servico, ServicoCategoria } from '../models/servico';
import { ServicosService } from '../servicos/services';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  private api = inject(ServicosService);
  private authService = inject(AuthService);
  
  constructor(private router: Router) {}

  private readonly telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}$/;

  categorias: { label: string; value: ServicoCategoria }[] = [
    { label: 'Serviços Gerais', value: 'SERVICOS_GERAIS' },
    { label: 'Culinária', value: 'CULINARIA' },
    { label: 'Animais', value: 'ANIMAIS' },
    { label: 'Beleza e Estética', value: 'BELEZA_E_ESTETICA' },
    { label: 'Tecnologia e Informática', value: 'TECNOLOGIA_E_INFORMATICA' },
    { label: 'Educação', value: 'EDUCACAO' },
    { label: 'Outros Serviços', value: 'OUTROS_SERVICOS' },
  ];

  novoServico: Servico = { nome: '', telefone: '', categoria: 'OUTROS_SERVICOS', descricao: '' };

  adicionarServico() {
    const tel = (this.novoServico.telefone || '').trim();
    if (!this.novoServico.nome.trim()) {
      alert('Informe o nome do serviço.');
      return;
    }

    if (!tel) {
      alert('Informe o telefone com DDD.');
      return;
    }

    if (!this.telefoneRegex.test(tel)) {
      alert('Telefone inválido. Use DDD + número. Ex: 51999999999');
      return;
    }
   this.api.create(this.novoServico).subscribe({
      next: () => {
        this.novoServico = { nome: '', telefone: '', categoria: 'OUTROS_SERVICOS', descricao: '' };
        if (this.authService.isAdmin()) {
          this.router.navigate(['/servicos-cadastrados']);
        } else {
          this.router.navigate(['/meus-servicos']);
        }
      },
      error: e => alert('Erro ao salvar: ' + (e?.error?.message ?? 'verifique os campos')),
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}