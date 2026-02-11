import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Header } from '../components/header/header';
import { Nav } from '../components/nav/nav';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    Header,
    Nav
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  private bo = inject(BreakpointObserver);

  public readonly isHandset = toSignal(
    this.bo.observe(Breakpoints.Handset).pipe(map(r => r.matches)),
    { initialValue: false }
  );
  public readonly mode = computed<MatDrawerMode>(() => this.isHandset() ? 'over' : 'side');
  public readonly role = computed(() => this.isHandset() ? 'dialog' : 'navigation');
  public readonly opened = computed(() => !this.isHandset());
}
