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
  template: `
    <div class="auth-container">
      <h2>{{ isLogin ? 'Login' : 'Cadastrar Conta' }}</h2>
      
      <form (ngSubmit)="onSubmit()" #authForm="ngForm">

        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="password" name="password" type="password" placeholder="Senha" required>
        <button type="submit" [disabled]="!authForm.valid">
          {{ isLogin ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>
      
      <p>
        <a href="#" (click)="toggleMode($event)">
          {{ isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login' }}
        </a>
      </p>
      <p *ngIf="isLogin">
        <a href="#" (click)="showRecoverPassword($event)">Esqueceu a senha?</a>
      </p>
      <p>
        <a routerLink="/" class="back-home">← Voltar para página inicial</a>
      </p>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    .back-home {
      color: #6c757d;
      font-size: 14px;
    }
  `]
})
export class LoginComponent {
  password = '';
  email = '';
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isLogin) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/meus-servicos']),
        error: (err) => console.error('Erro no login:', err)
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
    const email = prompt('Digite seu email para recuperar a senha:');
    if (email) {
      // Simulando recuperação de senha
      console.log('Recuperar senha para:', email);
      alert('Um email de recuperação foi enviado para ' + email);
    }
  }
}

