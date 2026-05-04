import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  carregant = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  login(): void {
    this.error = '';
    this.carregant = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (exit) => {
        if (exit) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.error = 'Credencials incorrectes';
          this.carregant = false;
        }
      },
      error: (err) => {
        console.error('Error al fer login:', err);
        this.error = 'Error al connectar amb el servidor';
        this.carregant = false;
      }
    });
  }

}
