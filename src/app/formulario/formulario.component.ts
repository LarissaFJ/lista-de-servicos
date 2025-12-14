import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Servico, ServicoCategoria } from '../models/servico';
import { ServicosService } from '../servicos/services';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  private api = inject(ServicosService);
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

  novoServico: Servico = { nome: '', telefone: '', categoria: 'OUTROS_SERVICOS', descricao: '' };

  adicionarServico() {
    this.api.create(this.novoServico).subscribe({
      next: () => {
        this.novoServico = { nome: '', telefone: '', categoria: 'OUTROS_SERVICOS', descricao: '' };
        this.router.navigate(['/']);
      },
      error: e => alert('Erro ao salvar: ' + (e?.error?.message ?? 'verifique os campos')),
    });
  }
}