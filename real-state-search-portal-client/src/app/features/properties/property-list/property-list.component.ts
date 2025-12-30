import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent {
  properties: any[] = [];

  filterForm = this.fb.group({
    city: [null],
    bedrooms: [null],
    minPrice: [null],
    maxPrice: [null],
  });

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.search();
  }

  search() {
    this.propertyService
    .search(this.filterForm.value)
    .subscribe((r) => (this.properties = r));
  }

  favorite(id: number) {
    this.favoriteService.toggleFavorite(id).subscribe();
  }

  viewProperty(id: number) {
    this.router.navigate([`/property/${id}`]);
  }
}
