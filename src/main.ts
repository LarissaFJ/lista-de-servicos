import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { FormularioComponent } from './app/formulario/formulario.component';
import { ListaServicosComponent } from './app/lista-servicos/lista-servicos.component';
import { LoginComponent } from './app/auth/components/login/login.component';
import { JwtInterceptor } from './app/auth/interceptors/jwt.interceptor';

const routes: Routes = [
  { path: '', component: ListaServicosComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'login', component: LoginComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptors([JwtInterceptor]))
  ],
}).catch((err) => console.error(err));

