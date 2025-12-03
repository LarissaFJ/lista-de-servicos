import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/components/login/login.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminGuard, AuthGuard } from "./auth/guards/auth.guard";

// app-routing.module.ts
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  }
];



