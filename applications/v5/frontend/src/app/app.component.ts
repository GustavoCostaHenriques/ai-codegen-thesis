import { AfterViewInit, Component } from '@angular/core';
import { DesignSystemService } from './core/services/design-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  constructor(private readonly designSystemService: DesignSystemService) {}

  ngAfterViewInit(): void {
    this.designSystemService.load().catch(() => {
      // Non-blocking fallback: UI remains functional without enhancement script.
    });
  }
}
