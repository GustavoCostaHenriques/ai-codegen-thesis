import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'pt-PT' | 'en';

const LANGUAGE_STORAGE_KEY = 'weekly-planning.language';

type TranslationMap = Record<string, string>;

const TRANSLATIONS: Record<AppLanguage, TranslationMap> = {
  en: {
    'app.language': 'Language',
    'app.language.pt-PT': 'PT',
    'app.language.en': 'EN',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.create': 'Create',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.open': 'Open',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.noData': 'No data available.',
    'common.actions': 'Actions',
    'common.required': 'This field is required.',
    'common.invalidEmail': 'Invalid email format.',
    'common.minLength': 'Minimum length not met.',
    'common.networkError': 'Network error. Please try again.',
    'nav.weeks': 'Weeks',
    'nav.persons': 'Persons',
    'nav.projects': 'Projects',
    'nav.logout': 'Logout',
    'auth.login': 'Login',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'Email',
    'auth.changePassword': 'Change Password',
    'auth.createAccount': 'Create Account',
    'auth.currentPassword': 'Current Password',
    'auth.newPassword': 'New Password',
    'auth.confirmNewPassword': 'Confirm New Password',
    'auth.createAccountTitle': 'Create Account',
    'auth.changePasswordTitle': 'Change Password',
    'auth.loginFailed': 'Login failed. Check your credentials.',
    'auth.accountCreated': 'Account created successfully.',
    'auth.passwordChanged': 'Password changed successfully.',
    'auth.passwordMismatch': 'Password confirmation does not match.',
    'auth.registerFailed': 'Unable to create account.',
    'auth.changePasswordFailed': 'Unable to change password.',
    'weeks.title': 'Weeks Overview',
    'weeks.create': 'Create Week',
    'weeks.weekCode': 'Week Code',
    'weeks.weekRange': 'Week Range',
    'weeks.weekStart': 'Week Start',
    'weeks.weekEnd': 'Week End',
    'weeks.status': 'Status',
    'weeks.modal.createEdit': 'Create / Edit Week',
    'weeks.modal.remove': 'Remove Week',
    'weeks.modal.removeText': 'The week {weekCode} ({weekRange}) will be removed.',
    'weeks.loadFailed': 'Unable to load weeks.',
    'weeks.saveFailed': 'Unable to save week.',
    'weeks.deleteFailed': 'Unable to delete week.',
    'planning.title': 'Planning for the week - {weekCode}',
    'planning.titleFallback': 'Weekly Planning',
    'planning.addPerson': 'Add Person',
    'planning.addProject': 'Add Project',
    'planning.addTask': 'Add Task',
    'planning.modal.addPerson': 'Add Person to Day',
    'planning.modal.addProject': 'Add Project to Person',
    'planning.modal.addTask': 'Add Task',
    'planning.modal.removeTask': 'Remove Task',
    'planning.modal.removePerson': 'Remove Person',
    'planning.modal.removeProject': 'Remove Project',
    'planning.modal.removeTaskText': 'Are you sure you want to remove this task?',
    'planning.modal.removePersonText': 'Are you sure you want to remove this person?',
    'planning.modal.removeProjectText': 'Are you sure you want to remove this project?',
    'planning.day': 'Day',
    'planning.person': 'Person',
    'planning.project': 'Project',
    'planning.task': 'Task',
    'planning.taskDescription': 'Task Description',
    'planning.loadFailed': 'Unable to load weekly planning.',
    'planning.saveFailed': 'Unable to save planning change.',
    'persons.title': 'Person Management',
    'persons.create': 'Create Person',
    'persons.name': 'Name',
    'persons.email': 'Email',
    'persons.role': 'Role',
    'persons.status': 'Status',
    'persons.password': 'Password',
    'persons.passwordReadonlyHint': 'Password is managed by change password API.',
    'persons.modal.createEdit': 'Create / Edit Person',
    'persons.modal.remove': 'Remove Person',
    'persons.modal.removeText': 'The person {name} ({email}) will be removed.',
    'persons.loadFailed': 'Unable to load persons.',
    'persons.saveFailed': 'Unable to save person.',
    'persons.deleteFailed': 'Unable to delete person.',
    'projects.title': 'Project Management',
    'projects.create': 'Create Project',
    'projects.name': 'Name',
    'projects.code': 'Code',
    'projects.status': 'Status',
    'projects.modal.createEdit': 'Create / Edit Project',
    'projects.modal.remove': 'Remove Project',
    'projects.modal.removeText': 'The project {name} ({code}) will be removed.',
    'projects.loadFailed': 'Unable to load projects.',
    'projects.saveFailed': 'Unable to save project.',
    'projects.deleteFailed': 'Unable to delete project.',
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.info': 'Page {page} of {totalPages}',
    'role.ADMIN': 'ADMIN',
    'role.VIEWER': 'VIEWER',
    'status.ACTIVE': 'ACTIVE',
    'status.INACTIVE': 'INACTIVE',
    'status.PLANNED': 'PLANNED',
    'status.COMPLETED': 'COMPLETED',
    'weekDay.MONDAY': 'Mon',
    'weekDay.TUESDAY': 'Tue',
    'weekDay.WEDNESDAY': 'Wed',
    'weekDay.THURSDAY': 'Thu',
    'weekDay.FRIDAY': 'Fri',
    'weekDay.SATURDAY': 'Sat',
    'weekDay.SUNDAY': 'Sun',
  },
  'pt-PT': {
    'app.language': 'Idioma',
    'app.language.pt-PT': 'PT',
    'app.language.en': 'EN',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.close': 'Fechar',
    'common.create': 'Criar',
    'common.edit': 'Editar',
    'common.delete': 'Remover',
    'common.open': 'Abrir',
    'common.save': 'Guardar',
    'common.loading': 'A carregar...',
    'common.noData': 'Sem dados para apresentar.',
    'common.actions': 'Acoes',
    'common.required': 'Campo obrigatorio.',
    'common.invalidEmail': 'Formato de email invalido.',
    'common.minLength': 'Nao cumpre o tamanho minimo.',
    'common.networkError': 'Erro de rede. Tente novamente.',
    'nav.weeks': 'Semanas',
    'nav.persons': 'Pessoas',
    'nav.projects': 'Projetos',
    'nav.logout': 'Sair',
    'auth.login': 'Login',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'Email',
    'auth.changePassword': 'Alterar Password',
    'auth.createAccount': 'Criar Conta',
    'auth.currentPassword': 'Password Atual',
    'auth.newPassword': 'Nova Password',
    'auth.confirmNewPassword': 'Confirmar Nova Password',
    'auth.createAccountTitle': 'Criar Conta',
    'auth.changePasswordTitle': 'Alterar Password',
    'auth.loginFailed': 'Falha no login. Verifique as credenciais.',
    'auth.accountCreated': 'Conta criada com sucesso.',
    'auth.passwordChanged': 'Password alterada com sucesso.',
    'auth.passwordMismatch': 'A confirmacao da password nao corresponde.',
    'auth.registerFailed': 'Nao foi possivel criar a conta.',
    'auth.changePasswordFailed': 'Nao foi possivel alterar a password.',
    'weeks.title': 'Visao Geral de Semanas',
    'weeks.create': 'Criar Semana',
    'weeks.weekCode': 'Codigo da Semana',
    'weeks.weekRange': 'Intervalo da Semana',
    'weeks.weekStart': 'Inicio da Semana',
    'weeks.weekEnd': 'Fim da Semana',
    'weeks.status': 'Estado',
    'weeks.modal.createEdit': 'Criar / Editar Semana',
    'weeks.modal.remove': 'Remover Semana',
    'weeks.modal.removeText': 'A semana {weekCode} ({weekRange}) vai ser removida.',
    'weeks.loadFailed': 'Nao foi possivel carregar semanas.',
    'weeks.saveFailed': 'Nao foi possivel guardar semana.',
    'weeks.deleteFailed': 'Nao foi possivel remover semana.',
    'planning.title': 'Planeamento da semana - {weekCode}',
    'planning.titleFallback': 'Planeamento Semanal',
    'planning.addPerson': 'Adicionar Pessoa',
    'planning.addProject': 'Adicionar Projeto',
    'planning.addTask': 'Adicionar Tarefa',
    'planning.modal.addPerson': 'Adicionar Pessoa ao Dia',
    'planning.modal.addProject': 'Adicionar Projeto a Pessoa',
    'planning.modal.addTask': 'Adicionar Tarefa',
    'planning.modal.removeTask': 'Remover Tarefa',
    'planning.modal.removePerson': 'Remover Pessoa',
    'planning.modal.removeProject': 'Remover Projeto',
    'planning.modal.removeTaskText': 'Tem a certeza que pretende remover esta tarefa?',
    'planning.modal.removePersonText': 'Tem a certeza que pretende remover esta pessoa?',
    'planning.modal.removeProjectText': 'Tem a certeza que pretende remover este projeto?',
    'planning.day': 'Dia',
    'planning.person': 'Pessoa',
    'planning.project': 'Projeto',
    'planning.task': 'Tarefa',
    'planning.taskDescription': 'Descricao da Tarefa',
    'planning.loadFailed': 'Nao foi possivel carregar planeamento semanal.',
    'planning.saveFailed': 'Nao foi possivel guardar alteracao.',
    'persons.title': 'Gestao de Pessoas',
    'persons.create': 'Criar Pessoa',
    'persons.name': 'Nome',
    'persons.email': 'Email',
    'persons.role': 'Papel',
    'persons.status': 'Estado',
    'persons.password': 'Password',
    'persons.passwordReadonlyHint': 'A password e gerida na API de alteracao de password.',
    'persons.modal.createEdit': 'Criar / Editar Pessoa',
    'persons.modal.remove': 'Remover Pessoa',
    'persons.modal.removeText': 'A pessoa {name} ({email}) vai ser removida.',
    'persons.loadFailed': 'Nao foi possivel carregar pessoas.',
    'persons.saveFailed': 'Nao foi possivel guardar pessoa.',
    'persons.deleteFailed': 'Nao foi possivel remover pessoa.',
    'projects.title': 'Gestao de Projetos',
    'projects.create': 'Criar Projeto',
    'projects.name': 'Nome',
    'projects.code': 'Codigo',
    'projects.status': 'Estado',
    'projects.modal.createEdit': 'Criar / Editar Projeto',
    'projects.modal.remove': 'Remover Projeto',
    'projects.modal.removeText': 'O projeto {name} ({code}) vai ser removido.',
    'projects.loadFailed': 'Nao foi possivel carregar projetos.',
    'projects.saveFailed': 'Nao foi possivel guardar projeto.',
    'projects.deleteFailed': 'Nao foi possivel remover projeto.',
    'pagination.previous': 'Anterior',
    'pagination.next': 'Seguinte',
    'pagination.info': 'Pagina {page} de {totalPages}',
    'role.ADMIN': 'ADMIN',
    'role.VIEWER': 'VIEWER',
    'status.ACTIVE': 'ATIVO',
    'status.INACTIVE': 'INATIVO',
    'status.PLANNED': 'PLANEADO',
    'status.COMPLETED': 'CONCLUIDO',
    'weekDay.MONDAY': 'Seg',
    'weekDay.TUESDAY': 'Ter',
    'weekDay.WEDNESDAY': 'Qua',
    'weekDay.THURSDAY': 'Qui',
    'weekDay.FRIDAY': 'Sex',
    'weekDay.SATURDAY': 'Sab',
    'weekDay.SUNDAY': 'Dom',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly languageSignal = signal<AppLanguage>(this.readLanguage());
  readonly language = this.languageSignal.asReadonly();

  setLanguage(language: AppLanguage): void {
    this.languageSignal.set(language);
    this.writeLanguage(language);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const bundle = TRANSLATIONS[this.languageSignal()] ?? TRANSLATIONS.en;
    const fallbackBundle = TRANSLATIONS.en;
    let value = bundle[key] ?? fallbackBundle[key] ?? key;

    if (!params) {
      return value;
    }

    for (const [paramKey, paramValue] of Object.entries(params)) {
      value = value.replaceAll(`{${paramKey}}`, String(paramValue));
    }

    return value;
  }

  private readLanguage(): AppLanguage {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage === 'pt-PT' || savedLanguage === 'en') {
        return savedLanguage;
      }
    } catch {
      // Ignore storage read errors.
    }

    return 'en';
  }

  private writeLanguage(language: AppLanguage): void {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage write errors.
    }
  }
}
