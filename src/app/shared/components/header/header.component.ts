import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user$ = this.authService.giveUser();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/cataleg']);
  }

}
