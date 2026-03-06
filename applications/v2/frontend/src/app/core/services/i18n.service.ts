import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

export type LanguageCode = 'EN' | 'PT';
type Dictionary = Record<string, string>;

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly languageStorageKey = 'weekly-planning.language';
  private readonly dictionarySignal = signal<Dictionary>({});
  private readonly languageSignal = signal<LanguageCode>(this.readStoredLanguage());

  readonly language = computed(() => this.languageSignal());

  constructor(private readonly http: HttpClient) {
    this.loadDictionary(this.languageSignal());
  }

  setLanguage(language: LanguageCode): void {
    if (language === this.languageSignal()) {
      return;
    }

    this.languageSignal.set(language);
    this.writeStoredLanguage(language);
    this.loadDictionary(language);
  }

  translate(key: string): string {
    return this.dictionarySignal()[key] ?? key;
  }

  private loadDictionary(language: LanguageCode): void {
    this.http
      .get<Dictionary>(`/i18n/${language.toLowerCase()}.json`)
      .pipe(catchError(() => of({})))
      .subscribe(dictionary => this.dictionarySignal.set(dictionary));
  }

  private readStoredLanguage(): LanguageCode {
    if (typeof localStorage === 'undefined') {
      return 'EN';
    }

    try {
      const stored = localStorage.getItem(this.languageStorageKey);
      return stored === 'PT' ? 'PT' : 'EN';
    } catch {
      return 'EN';
    }
  }

  private writeStoredLanguage(language: LanguageCode): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.languageStorageKey, language);
    } catch {
      // Ignore storage write errors in non-browser contexts.
    }
  }
}
