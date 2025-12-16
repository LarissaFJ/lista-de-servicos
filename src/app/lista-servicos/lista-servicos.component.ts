import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Servico } from '../models/servico';
import { ServicosService } from '../servicos/services';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-lista-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css'],
})
export class ListaServicosComponent implements OnInit {
  private api = inject(ServicosService);
  private authService = inject(AuthService);
  private router = inject(Router);
  servicos: Servico[] = [];
  q = '';

  ngOnInit() { this.buscar(); }

  buscar() {
    this.api.list({ q: this.q, size: 100 }).subscribe(p => this.servicos = p.content);
  }

  cadastrarServico() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/formulario']);
    } else {
      alert('Você precisa estar logado para cadastrar um serviço.');
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

isAdmin(): boolean {
  return this.authService.isAdmin();
}

  meusServicos() {
    this.router.navigate(['/meus-servicos']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}