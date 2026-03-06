import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { TopNavComponent } from '../components/top-nav/top-nav.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  title = 'Weeks Overview';
  active: 'weeks' | 'persons' | 'projects' | 'planning' = 'weeks';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.readRouteData();
      });
  }


  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }

  private readRouteData(): void {
    let current = this.route.root;

    while (current.firstChild) {
      current = current.firstChild;
    }

    const data = current.snapshot.data ?? {};

    this.title = data['title'] ?? 'Weeks Overview';
    this.active = data['active'] ?? 'weeks';
  }

}
