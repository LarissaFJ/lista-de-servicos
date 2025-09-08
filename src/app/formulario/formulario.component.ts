import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  novoServico = {
    nome: '',
    telefone: '',
    categoria: '',
    descricao: '',
  };

  // Categorias disponíveis para o dropdown
  categorias: string[] = [
    'Serviços Gerais',
    'Culinária',
    'Animais',
    'Beleza e Estética',
    'Tecnologia e Informática',
    'Educação',
    'Outros Serviços',
  ];

  constructor(private router: Router) {
    this.inicializarServicosPredefinidos();
  }

  inicializarServicosPredefinidos() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');

    if (services.length === 0) {
      const servicosPredefinidos = [
        {
          nome: 'Escola Inovação',
          telefone: '519991831001',
          categoria: 'Educação',
          descricao: 'Cursos profissionalizantes. Aulas Presenciais e EAD.',
        },
        {
          nome: 'MR Soluções Elétricas',
          telefone: '51992325581',
          categoria: 'Outros Serviços',
          descricao: 'Soluções Elétricas.',
        },
        {
          nome: 'Gás e Água Distribuidora JR',
          telefone: '5134903899',
          categoria: 'Outros Serviços',
          descricao: 'Distribuidora de água e gás.',
        },
    
      ];

      // Salva os serviços predefinidos no localStorage
      localStorage.setItem('services', JSON.stringify(servicosPredefinidos));
    }
  }

 

  adicionarServico() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    services.push({ ...this.novoServico });
    localStorage.setItem('services', JSON.stringify(services));

    // Limpa o formulário após o envio
    this.novoServico = {
      nome: '',
      telefone: '',
      categoria: '',
      descricao: '',
    };
    this.router.navigate(['/']);
  }
}
