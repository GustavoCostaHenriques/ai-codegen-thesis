import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent {
  @Input() planningWeekId: string | null = null;

  get planningRoute(): string {
    return this.planningWeekId ? `/weeks/${this.planningWeekId}/days` : '/weeks';
  }
}
