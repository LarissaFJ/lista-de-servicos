import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { FormularioComponent } from './app/formulario/formulario.component';
import { ListaServicosComponent } from './app/lista-servicos/lista-servicos.component';

const routes: Routes = [
  { path: '', component: ListaServicosComponent }, // Página inicial: Lista de Serviços
  { path: 'formulario', component: FormularioComponent }, // Página do formulário
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));

