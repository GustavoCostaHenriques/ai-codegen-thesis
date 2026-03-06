import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageCode = 'en' | 'pt';

type TranslationDictionary = Record<LanguageCode, Record<string, string>>;

const DICTIONARY: TranslationDictionary = {
  en: {
    'app.weeks': 'Weeks Overview',
    'app.people': 'Person Management',
    'app.projects': 'Project Management',
    'app.planning': 'Weekly Planning',
    'app.statistics': 'Statistics',
    'app.logout': 'Logout',
    'app.loading': 'Loading...',
    'app.error.default': 'Request failed. Please try again.',
    'app.error.validation': 'Please fix highlighted validation errors.',
    'auth.loginTitle': 'Login',
    'auth.authCardTitle': 'Authentication',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.login': 'Login',
    'auth.changePassword': 'Change password',
    'auth.currentPassword': 'Current password',
    'auth.newPassword': 'New password',
    'auth.confirmNewPassword': 'Confirm new password',
    'auth.cancel': 'Cancel',
    'auth.confirm': 'Confirm',
    'auth.required': 'Required field',
    'auth.invalidCredentials': 'Invalid username or password.',
    'auth.passwordChanged': 'Password changed successfully.',
    'auth.passwordModalTitle': 'Change Password',
    'shell.statisticsTitle': 'Statistics Export',
    'shell.statisticsMessage':
      'Export all application statistics to Excel (.xlsx).',
    'shell.statisticsDescription':
      'Includes persons, projects, weeks, assignments and tasks.',
    'shell.export': 'Confirm',
    'weeks.title': 'Weeks Overview',
    'weeks.create': 'Create Week',
    'weeks.code': 'Week Code',
    'weeks.range': 'Range',
    'weeks.status': 'Status',
    'weeks.actions': 'Actions',
    'weeks.open': 'Open',
    'weeks.edit': 'Edit',
    'weeks.duplicate': 'Duplicate',
    'weeks.delete': 'Delete',
    'weeks.modal.create': 'Create / Edit Week',
    'weeks.modal.remove': 'Remove Week',
    'weeks.modal.removeMessage': 'Week {{code}} will be removed.',
    'weeks.modal.removeWarning': 'This operation cannot be undone.',
    'weeks.weekStart': 'Week Start',
    'weeks.weekEnd': 'Week End',
    'weeks.weekCodeAuto': 'Week Code (auto)',
    'weeks.planned': 'PLANNED',
    'weeks.completed': 'COMPLETED',
    'weeks.pageSummary':
      '{{from}} to {{to}} of {{total}} results',
    'planning.activePersons': 'Active Persons',
    'planning.addProject': 'Add project to day',
    'planning.removeProject': 'Remove project',
    'planning.removeAssignment': 'Remove assignment',
    'planning.addTask': 'Add task',
    'planning.editTask': 'Edit task',
    'planning.deleteTask': 'Delete task',
    'planning.hours': '{{estimated}}h : {{actual}}h',
    'planning.taskPlaceholder': 'Task description',
    'planning.assignmentModalTitle': 'Create assignment',
    'planning.estimatedHours': 'Estimated Hours',
    'planning.actualHours': 'Actual Hours',
    'planning.day': 'Day',
    'planning.project': 'Project',
    'planning.person': 'Person',
    'people.title': 'Person Management',
    'people.create': 'Create Person',
    'people.name': 'Name',
    'people.email': 'Email',
    'people.role': 'Role',
    'people.status': 'Status',
    'people.actions': 'Actions',
    'people.modal.createEdit': 'Create / Edit Person',
    'people.modal.remove': 'Remove Person',
    'people.modal.removeMessage': 'Person {{name}} will be removed.',
    'people.modal.removeWarning': 'Linked account access will be deactivated.',
    'projects.title': 'Project Management',
    'projects.create': 'Create Project',
    'projects.name': 'Name',
    'projects.code': 'Code',
    'projects.status': 'Status',
    'projects.actions': 'Actions',
    'projects.modal.createEdit': 'Create / Edit Project',
    'projects.modal.remove': 'Remove Project',
    'projects.modal.removeMessage':
      'Project {{code}} will be removed and everything associated with it.',
    'projects.modal.removeWarning':
      'Associated planning assignments and tasks are included.',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.search': 'Search',
    'common.language': 'Language',
    'common.empty': 'No data available.',
  },
  pt: {
    'app.weeks': 'Semanas',
    'app.people': 'Pessoas',
    'app.projects': 'Projetos',
    'app.planning': 'Planeamento Semanal',
    'app.statistics': 'Estatisticas',
    'app.logout': 'Terminar sessao',
    'app.loading': 'A carregar...',
    'app.error.default': 'O pedido falhou. Tente novamente.',
    'app.error.validation': 'Corrija os erros de validacao.',
    'auth.loginTitle': 'Login',
    'auth.authCardTitle': 'Autenticacao',
    'auth.username': 'Utilizador',
    'auth.password': 'Palavra-passe',
    'auth.login': 'Entrar',
    'auth.changePassword': 'Alterar palavra-passe',
    'auth.currentPassword': 'Palavra-passe atual',
    'auth.newPassword': 'Nova palavra-passe',
    'auth.confirmNewPassword': 'Confirmar nova palavra-passe',
    'auth.cancel': 'Cancelar',
    'auth.confirm': 'Confirmar',
    'auth.required': 'Campo obrigatorio',
    'auth.invalidCredentials': 'Credenciais invalidas.',
    'auth.passwordChanged': 'Palavra-passe alterada com sucesso.',
    'auth.passwordModalTitle': 'Alterar Palavra-passe',
    'shell.statisticsTitle': 'Exportar Estatisticas',
    'shell.statisticsMessage':
      'Exportar todas as estatisticas da aplicacao para Excel (.xlsx).',
    'shell.statisticsDescription':
      'Inclui pessoas, projetos, semanas, atribuicoes e tarefas.',
    'shell.export': 'Confirmar',
    'weeks.title': 'Visao Geral das Semanas',
    'weeks.create': 'Criar Semana',
    'weeks.code': 'Codigo Semana',
    'weeks.range': 'Intervalo',
    'weeks.status': 'Estado',
    'weeks.actions': 'Acoes',
    'weeks.open': 'Abrir',
    'weeks.edit': 'Editar',
    'weeks.duplicate': 'Duplicar',
    'weeks.delete': 'Eliminar',
    'weeks.modal.create': 'Criar / Editar Semana',
    'weeks.modal.remove': 'Remover Semana',
    'weeks.modal.removeMessage': 'A semana {{code}} sera removida.',
    'weeks.modal.removeWarning': 'Esta operacao nao pode ser desfeita.',
    'weeks.weekStart': 'Inicio da Semana',
    'weeks.weekEnd': 'Fim da Semana',
    'weeks.weekCodeAuto': 'Codigo Semana (auto)',
    'weeks.planned': 'PLANEADA',
    'weeks.completed': 'CONCLUIDA',
    'weeks.pageSummary': '{{from}} a {{to}} de {{total}} resultados',
    'planning.activePersons': 'Pessoas Ativas',
    'planning.addProject': 'Adicionar projeto ao dia',
    'planning.removeProject': 'Remover projeto',
    'planning.removeAssignment': 'Remover atribuicao',
    'planning.addTask': 'Adicionar tarefa',
    'planning.editTask': 'Editar tarefa',
    'planning.deleteTask': 'Apagar tarefa',
    'planning.hours': '{{estimated}}h : {{actual}}h',
    'planning.taskPlaceholder': 'Descricao da tarefa',
    'planning.assignmentModalTitle': 'Criar atribuicao',
    'planning.estimatedHours': 'Horas Estimadas',
    'planning.actualHours': 'Horas Reais',
    'planning.day': 'Dia',
    'planning.project': 'Projeto',
    'planning.person': 'Pessoa',
    'people.title': 'Gestao de Pessoas',
    'people.create': 'Criar Pessoa',
    'people.name': 'Nome',
    'people.email': 'Email',
    'people.role': 'Papel',
    'people.status': 'Estado',
    'people.actions': 'Acoes',
    'people.modal.createEdit': 'Criar / Editar Pessoa',
    'people.modal.remove': 'Remover Pessoa',
    'people.modal.removeMessage': 'A pessoa {{name}} sera removida.',
    'people.modal.removeWarning':
      'O acesso da conta associada sera desativado.',
    'projects.title': 'Gestao de Projetos',
    'projects.create': 'Criar Projeto',
    'projects.name': 'Nome',
    'projects.code': 'Codigo',
    'projects.status': 'Estado',
    'projects.actions': 'Acoes',
    'projects.modal.createEdit': 'Criar / Editar Projeto',
    'projects.modal.remove': 'Remover Projeto',
    'projects.modal.removeMessage':
      'O projeto {{code}} sera removido com tudo o que lhe esta associado.',
    'projects.modal.removeWarning':
      'Atribuicoes e tarefas de planeamento associadas estao incluidas.',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.search': 'Pesquisar',
    'common.language': 'Idioma',
    'common.empty': 'Sem dados disponiveis.',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private static readonly STORAGE_KEY = 'weekly_planning_language';

  private readonly languageSubject = new BehaviorSubject<LanguageCode>('en');
  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem(I18nService.STORAGE_KEY) as
      | LanguageCode
      | null;
    if (stored === 'en' || stored === 'pt') {
      this.languageSubject.next(stored);
    }
  }

  get language(): LanguageCode {
    return this.languageSubject.value;
  }

  setLanguage(language: LanguageCode): void {
    this.languageSubject.next(language);
    localStorage.setItem(I18nService.STORAGE_KEY, language);
  }

  translate(key: string): string {
    const lang = this.languageSubject.value;
    return DICTIONARY[lang][key] ?? key;
  }

  interpolate(key: string, values: Record<string, string | number>): string {
    let translated = this.translate(key);
    Object.entries(values).forEach(([placeholder, value]) => {
      translated = translated.replace(`{{${placeholder}}}`, String(value));
    });
    return translated;
  }
}
