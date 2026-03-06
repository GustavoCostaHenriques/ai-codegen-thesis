import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent {
  @Input() title = '';
  @Input() active: 'weeks' | 'persons' | 'projects' | 'planning' = 'weeks';
  @Output() logoutRequested = new EventEmitter<void>();

  isActive(target: 'weeks' | 'persons' | 'projects'): boolean {
    if (target === 'weeks') {
      return this.active === 'weeks' || this.active === 'planning';
    }

    return this.active === target;
  }
}
