import { Component } from '@angular/core';
import { HeaderBarComponent } from '../../dumb-components/header-bar/header-bar.component';
import { FooterBarComponent } from '../../dumb-components/footer-bar/footer-bar.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [HeaderBarComponent, FooterBarComponent],
  template: `
        <header class="px-6 pt-6"><header-bar /></header>
        <main>
            <ng-content>
                <!-- Page content -->
            </ng-content>
        </main>
        <footer>
            <footer-bar />
        </footer>
    `,
})
export class MainContainerComponent {

}
