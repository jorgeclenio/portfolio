import { Component, inject } from '@angular/core';

import { AppLocale, LanguageService } from '../../../services/language.service';
import { ThemeMode, ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly language = inject(LanguageService);
  protected readonly theme = inject(ThemeService);

  protected readonly githubHref = 'https://github.com/jorgeclenio/';

  protected onLocaleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as AppLocale;
    this.language.setLocale(value);
  }

  protected setTheme(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }
}
