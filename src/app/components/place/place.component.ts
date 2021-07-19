import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../Place';

interface prettyPlace {
  name?: string,
  isCity?: boolean,
  city?: string,
  country?: string,
  population?: string,
  location?: {
    lat:number,
    lng:number
  }
}

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlaceComponent implements OnInit {

  placeGroup: FormGroup = new FormGroup({
    placeId: new FormControl('')
  });

  public loading: boolean;
  public id: string;
  public place: Place;
  public prettyPlace: prettyPlace;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.loading = false;
    if (history.state.id) {
      this.id = history.state.id;
      localStorage.setItem('id', history.state.id);
    } else {
      this.id = localStorage.getItem('id') || '';
    }
  }

  onSubmit(): void {
    this.loading = true;
    const self = this;
    setTimeout(function() {
      self.loading = false;
    }, 300);
    this.placesService
      .getPlace(this.id)
      .subscribe((place) => {this.place = place; this.prettyPrintPlace(this.place);});
  }

  prettyPrintPlace (place: Place): void {
    let formattedPlace:prettyPlace = {};

    let name = Array.isArray(place?.locale_names?.default) ? place?.locale_names?.default[0] : undefined;
    let country = place?.country?.en || place?.country?.default;
    let city = Array.isArray(place?.city?.en) ? place?.city?.en[0] : undefined;
    let isCity = place?.is_city;
    let location = place?._geoloc;
    let population = Number(place?.population);

    if (name) formattedPlace.name = name;
    if (country) formattedPlace.country = country;
    if (city) formattedPlace.city = city;
    if (isCity !== undefined) formattedPlace.isCity = isCity;
    if (location !== undefined) formattedPlace.location = Array.isArray(location) ? location[0] : location;
    if (population !== undefined) formattedPlace.population = population.toLocaleString();

    this.prettyPlace = formattedPlace;
  }
}
