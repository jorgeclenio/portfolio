import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

export type ThemeMode = 'default' | 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly mode = signal<ThemeMode>(this.readStored());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyToDocument(this.mode());
    }

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => {
        if (this.mode() === 'default') {
          this.applyToDocument('default');
        }
      };
      mql.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mql.removeEventListener('change', onChange));
    });
  }

  setMode(next: ThemeMode): void {
    this.mode.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (isPlatformBrowser(this.platformId)) {
      this.applyToDocument(next);
    }
  }

  private readStored(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) return 'default';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'light' || raw === 'dark' || raw === 'default') return raw;
    } catch {
      /* ignore */
    }
    return 'default';
  }

  private applyToDocument(theme: ThemeMode): void {
    const root = this.document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      return;
    }
    if (theme === 'dark') {
      root.classList.add('dark');
      return;
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    root.classList.toggle('dark', prefersDark);
  }
}
