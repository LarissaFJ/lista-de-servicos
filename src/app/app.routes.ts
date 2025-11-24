
import { Routes } from '@angular/router';
import { ListaServicosComponent } from './lista-servicos/lista-servicos.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
  { path: '', component: ListaServicosComponent },
  { path: 'novo', component: FormularioComponent },
  { path: '**', redirectTo: '' }
];
