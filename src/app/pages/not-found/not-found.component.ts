import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-not-found',
  host: { class: 'flex min-h-0 flex-1 flex-col' },
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  protected readonly language = inject(LanguageService);
}
