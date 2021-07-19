import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../Place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
})
export class PlaceComponent implements OnInit {
  public id: string;
  public place: Place;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    if (history.state.id) {
      this.id = history.state.id;
      localStorage.setItem('id', history.state.id);
    } else {
      this.id = localStorage.getItem('id') || '';
    }
  }

  onSubmit() {
    this.placesService
      .getPlace(this.id)
      .subscribe((place) => (this.place = place));
  }
}
