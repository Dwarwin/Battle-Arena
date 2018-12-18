import {AfterViewInit, Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {

  loading: boolean;

  constructor(private router: Router) {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          setTimeout(() => this.loading = false, 300);
        }
      });
  }
}
