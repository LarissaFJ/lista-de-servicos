// login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password = '';
  email = '';
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isLogin) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          if (this.authService.isAdmin()) {
            this.router.navigate(['/servicos-cadastrados']);
          } else {
            this.router.navigate(['/meus-servicos']);
          }
        },
        error: (err) => {
          console.error('Erro no login:', err);
          const errorMessage = err?.error?.message || err?.message || 'Email ou senha inválidos';
          alert(errorMessage);
        }
      });
    } else {
      this.authService.register(this.email, this.password).subscribe({
        next: () => {
          alert('Conta cadastrada com sucesso!');
          this.isLogin = true;
          this.clearForm();
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          alert('Erro ao cadastrar: ' + (err?.error?.message || 'Verifique os dados'));
        }
      });
    }
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.clearForm();
  }

  private clearForm() {
    this.password = '';
    this.email = '';
  }

 showRecoverPassword(event: Event) {
  event.preventDefault();
  this.router.navigate(['/esqueci-senha']);
}

  }
