import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, debounceTime } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Place, Places } from '../../Place';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  places: Place[] | undefined;

  search: FormGroup = new FormGroup({
    place: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  public currentPlace: string;

  constructor(private placesService: PlacesService, private router: Router) {}

  get place() {
    return this.search.get('place');
  }

  ngOnInit(): void {
    this.place?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((text: string) => this.searchPlaces(text));
  }

  selectPlace(place: Place) {
    if (place.objectID) {
      this.currentPlace = place.objectID;
    }
  }

  searchPlaces(place: string) {
    if (this.search.valid) {
      this.placesService
        .getPlaces(place)
        .subscribe((places) => (this.places = places.hits));
    }
  }

  onSubmit() {
    const redirect = () => {
      this.router.navigate(['/place'], { state: { id: this.currentPlace } });
    };

    redirect();
  }
}
