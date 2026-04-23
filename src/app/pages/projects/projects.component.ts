import { Component, inject } from '@angular/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  host: { class: 'flex min-h-0 flex-1 flex-col' },
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  protected readonly language = inject(LanguageService);
}
