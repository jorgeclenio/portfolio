import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent implements OnInit {
  theme: 'dark' | 'light' = 'dark';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    this.theme = stored ?? 'dark';
    this.applyTheme();
  }

  toggle(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = this.document.body;
    if (this.theme === 'light') {
      body.setAttribute('data-theme', 'light');
    } else {
      body.removeAttribute('data-theme');
    }
  }
}
