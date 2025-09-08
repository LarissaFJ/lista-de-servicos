import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Marque o componente como standalone
  imports: [RouterModule], // Importe o RouterModule para suportar <router-outlet>
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista de Serviços';
}
