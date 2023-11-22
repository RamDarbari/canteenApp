import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
  constructor(private scrollToService: ScrollToService) {}

  scrollToHomeSection(): void {
    this.scrollToService.scrollTo({
      target: 'homeSection',
      offset: -50,
      duration: 0,
    });
  }
}
