import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

export type AppLocale = 'pt-BR' | 'en';

const STORAGE_KEY = 'portfolio-lang';

export interface AppStrings {
  navInicio: string;
  navProjetos: string;
  footerBuiltBy: string;
  footerLangLabel: string;
  themeDefault: string;
  themeLight: string;
  themeDark: string;
  themeGroup: string;
  homeTitle: string;
  homeSubtitle: string;
  projectsTitle: string;
  projectsSubtitle: string;
  notFoundTitle: string;
  notFoundBack: string;
}

const STRINGS: Record<AppLocale, AppStrings> = {
  'pt-BR': {
    navInicio: 'Início',
    navProjetos: 'Projetos',
    footerBuiltBy: 'por @jorgeclenio',
    footerLangLabel: 'Idioma',
    themeDefault: 'Tema do sistema',
    themeLight: 'Tema claro',
    themeDark: 'Tema escuro',
    themeGroup: 'Seleção de tema',
    homeTitle: 'Portfólio',
    homeSubtitle: 'Conteúdo principal da aplicação.',
    projectsTitle: 'Projetos',
    projectsSubtitle: 'Em breve.',
    notFoundTitle: 'Página não encontrada',
    notFoundBack: 'Voltar ao início',
  },
  en: {
    navInicio: 'Home',
    navProjetos: 'Projects',
    footerBuiltBy: 'built by @jorgeclenio',
    footerLangLabel: 'Language',
    themeDefault: 'System theme',
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    themeGroup: 'Theme selection',
    homeTitle: 'Portfolio',
    homeSubtitle: 'Main application content.',
    projectsTitle: 'Projects',
    projectsSubtitle: 'Coming soon.',
    notFoundTitle: 'Page not found',
    notFoundBack: 'Back to home',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly locale = signal<AppLocale>(this.readStored());
  readonly messages = computed(() => STRINGS[this.locale()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.syncHtmlLang();
    }
  }

  setLocale(next: AppLocale): void {
    this.locale.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    this.syncHtmlLang();
  }

  private readStored(): AppLocale {
    if (!isPlatformBrowser(this.platformId)) return 'pt-BR';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'en' || raw === 'pt-BR') return raw;
    } catch {
      /* ignore */
    }
    return 'pt-BR';
  }

  private syncHtmlLang(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.lang = this.locale();
  }
}
