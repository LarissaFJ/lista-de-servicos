import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';;
import { JwtInterceptor } from './app/auth/interceptors/jwt.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptors([JwtInterceptor]))
  ],
}).catch((err) => console.error(err));

