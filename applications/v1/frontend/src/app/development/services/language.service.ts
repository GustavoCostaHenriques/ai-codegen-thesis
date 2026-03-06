import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UiLanguage = 'EN' | 'PT';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageSubject = new BehaviorSubject<UiLanguage>('EN');

  readonly language$ = this.languageSubject.asObservable();

  get currentLanguage(): UiLanguage {
    return this.languageSubject.value;
  }

  setLanguage(language: UiLanguage): void {
    this.languageSubject.next(language);
  }
}
