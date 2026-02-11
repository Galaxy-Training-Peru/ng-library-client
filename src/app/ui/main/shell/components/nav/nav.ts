import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  public navItems = [
    { link: '/library/authors', label: 'Authors', icon: 'people_alt' },
    { link: '/library/books', label: 'Books', icon: 'auto_stories' },
    { link: '/library/catalog', label: 'Catalog', icon: 'insert_chart_outlined' }
  ];
}
