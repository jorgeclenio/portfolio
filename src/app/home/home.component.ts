import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public myName: string = '{ 𝙹𝙾𝚁𝙶𝙴 𝙲𝙻𝙴𝙽𝙸𝙾 }';
  public info: string = '💻 Computer Engineer & Full Stack Developer 🤓';
  public stack: string = 'angular | nodejs | sql';
}
