import { Routes } from '@angular/router';
import { ListaServicosComponent } from './lista-servicos/lista-servicos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MeusServicosComponent } from './meus-servicos/meus-servicos.component';
import { EditarServicoComponent } from './editar-servico/editar-servico.component';

export const routes: Routes = [
  { path: '', component: ListaServicosComponent },
  { path: 'formulario', component: FormularioComponent, canActivate: [AuthGuard] },
  { path: 'editar-servico', component: EditarServicoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'meus-servicos', component: MeusServicosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];