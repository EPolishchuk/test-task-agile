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
  public currentPlaceName: string;

  constructor(private placesService: PlacesService, private router: Router) {}

  get place() {
    return this.search.get('place');
  }

  ngOnInit(): void {
    console.log(this.currentPlace);
    this.place?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((text: string) => this.searchPlaces(text));
  }

  selectPlace(place: Place) {
    if (place.objectID) {
      this.currentPlace = place.objectID;
      console.log(this.currentPlace);
      let name = place?.locale_names?.default;
      if (name && Array.isArray(name)) {
        this.currentPlaceName = name[0];
      }
      this.addToLocalStorage(this.currentPlace, this.currentPlaceName);
    }
  }

  searchPlaces(place: string) {
    let cache = this.getFromLocalStorage();

    if (this.search.valid) {
      this.placesService.getPlaces(place).subscribe((places) => {
        if (cache && places.hits !== undefined) {
          this.places = cache.concat(places.hits);
        } else {
          this.places = places.hits;
        }
      });
    }
  }

  addToLocalStorage(name: string, newItem: string): void {
    let history: string | null = localStorage.getItem('placeHistory');
    if (history !== null) {
      let cache: string[] = history.split(',');
      if (cache.length >= 3) {
        cache.shift();
      }
      cache.push(`${name}:${newItem}`);
      localStorage.setItem('placeHistory', cache.join(','));
    } else {
      localStorage.setItem('placeHistory', `${name}:${newItem}`);
    }
  }

  getFromLocalStorage(): Place[] | null {
    let history: string | null = localStorage.getItem('placeHistory');
    if (history !== null) {
      let arr = history.split(',').map((el) => ({
        objectID: el.split(':')[0],
        name: el.split(':')[1],
      }));
      return arr;
    }
    return null;
  }

  onSubmit() {
    const redirect = () => {
      this.router.navigate(['/place'], { state: { id: this.currentPlace } });
    };

    redirect();
  }
}
