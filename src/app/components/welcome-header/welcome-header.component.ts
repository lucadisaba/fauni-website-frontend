import { Component, Input } from '@angular/core';

@Component({
  selector: 'welcome-header',
  standalone: true,
  imports: [],
  templateUrl: './welcome-header.component.html',
  styleUrl: './welcome-header.component.css'
})
export class WelcomeHeaderComponent {
  @Input() profileImage: string = '';
  @Input() name: string = '';
}
