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
  newPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email) {
      alert('Informe o email');
      return;
    }

    if (!this.newPassword) {
      alert('Informe a nova senha');
      return;
    }

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!passwordRegex.test(this.newPassword)) {
    alert(
      'A senha deve conter:\n' +
      '- 1 letra maiúscula\n' +
      '- 1 letra minúscula\n' +
      '- 1 número\n' +
      '- 1 caractere especial\n' +
      '- mínimo 6 caracteres'
    );
    return;
    }

    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        alert('Senha redefinida com sucesso!');
        this.email = '';
        this.newPassword = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Erro ao redefinir senha');
      }
    });
  }
}