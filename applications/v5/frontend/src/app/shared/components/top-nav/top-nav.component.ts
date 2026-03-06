import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageCode } from '../../services/i18n.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
  standalone: false,
})
export class TopNavComponent {
  @Input() titleKey = '';
  @Input() isAdmin = false;
  @Input() currentRoute = '';
  @Input() currentLanguage: LanguageCode = 'en';
  @Input() logoutLoading = false;

  @Output() logout = new EventEmitter<void>();
  @Output() openStatistics = new EventEmitter<void>();
  @Output() languageChange = new EventEmitter<LanguageCode>();

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value as LanguageCode;
    this.languageChange.emit(language);
  }

  onLogout(): void {
    this.logout.emit();
  }

  onOpenStatistics(): void {
    this.openStatistics.emit();
  }
}
