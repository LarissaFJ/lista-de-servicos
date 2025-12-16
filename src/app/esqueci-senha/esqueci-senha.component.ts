import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  email = '';
  novaSenha = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email) {
      alert('Informe o email');
      return;
    }

    if (!this.novaSenha) {
      alert('Informe a nova senha');
      return;
    }

    if (this.novaSenha.length < 6) {
      alert('Nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    this.authService.resetPassword(this.email, this.novaSenha).subscribe({
      next: () => {
        alert('Senha redefinida com sucesso!');
        this.email = '';
        this.novaSenha = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Erro ao redefinir senha');
      }
    });
  }
}