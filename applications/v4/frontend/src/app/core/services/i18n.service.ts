import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'PT-PT' | 'EN';

type Dictionary = Record<string, string>;

const TRANSLATIONS: Record<Language, Dictionary> = {
  EN: {
    login: 'Login',
    username: 'Username',
    password: 'Password',
    language: 'Language',
    createAccount: 'Create Account',
    changePassword: 'Change Password',
    confirm: 'Confirm',
    cancel: 'Cancel',
    logout: 'Logout',
    weeksOverview: 'Weeks Overview',
    weeklyPlanning: 'Weekly Planning',
    personManagement: 'Person Management',
    projectManagement: 'Project Management',
    createWeek: 'Create Week',
    open: 'Open',
    edit: 'Edit',
    remove: 'Delete',
    weekCode: 'Week Code',
    range: 'Range',
    status: 'Status',
    actions: 'Actions',
    addPerson: 'Add Person',
    addProject: 'Add Project',
    addTask: 'Add Task',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    code: 'Code',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    taskDescription: 'Task Description'
  },
  'PT-PT': {
    login: 'Entrar',
    username: 'Utilizador',
    password: 'Palavra-passe',
    language: 'Idioma',
    createAccount: 'Criar Conta',
    changePassword: 'Alterar Palavra-passe',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    logout: 'Terminar Sessao',
    weeksOverview: 'Visao Semanas',
    weeklyPlanning: 'Planeamento Semanal',
    personManagement: 'Gestao de Pessoas',
    projectManagement: 'Gestao de Projetos',
    createWeek: 'Criar Semana',
    open: 'Abrir',
    edit: 'Editar',
    remove: 'Remover',
    weekCode: 'Codigo Semana',
    range: 'Intervalo',
    status: 'Estado',
    actions: 'Acoes',
    addPerson: 'Adicionar Pessoa',
    addProject: 'Adicionar Projeto',
    addTask: 'Adicionar Tarefa',
    name: 'Nome',
    email: 'Email',
    role: 'Perfil',
    code: 'Codigo',
    currentPassword: 'Palavra-passe Atual',
    newPassword: 'Nova Palavra-passe',
    confirmNewPassword: 'Confirmar Nova Palavra-passe',
    taskDescription: 'Descricao da Tarefa'
  }
};

const STORAGE_KEY = 'weekly_planning_lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly languageSubject = new BehaviorSubject<Language>(this.initialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  get currentLanguage(): Language {
    return this.languageSubject.value;
  }

  setLanguage(language: Language): void {
    this.languageSubject.next(language);
    localStorage.setItem(STORAGE_KEY, language);
  }

  t(key: string): string {
    const current = TRANSLATIONS[this.currentLanguage][key];
    if (current) {
      return current;
    }

    return TRANSLATIONS.EN[key] ?? key;
  }

  private initialLanguage(): Language {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'PT-PT' || saved === 'EN' ? saved : 'EN';
  }
}
