import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { PropertyService } from 'src/app/core/services/property.service';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent {
  property: any;

  constructor(
    private route: ActivatedRoute,
    private service: PropertyService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getPropertyById(id).subscribe((r) => (this.property = r));
  }

  favorite() {
    this.favoriteService.toggleFavorite(this.property.id).subscribe();
  }
}
