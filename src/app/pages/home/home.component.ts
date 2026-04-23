import { Component, inject } from '@angular/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  host: { class: 'flex min-h-0 flex-1 flex-col' },
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly language = inject(LanguageService);
}
