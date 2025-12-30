import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/core/models/property.model';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  property: Property | undefined;
  favorites: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe((favorites: any) => {
      this.favorites = favorites;
      // this.property = this.favoriteProperties.find((p) => p.id === propertyId);
    });
  }

  removeFavorite(id: number) {
    this.favoriteService.toggleFavorite(id).subscribe(() => {
      this.favorites = this.favorites.filter(
        (p) => p.id !== id
      );
    });
  }
}
