import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../Place';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css'],
})
export class PlaceItemComponent implements OnInit {
  @Input() placeItem: Place;
  @Input() odd: boolean;
  @Input() last: boolean;
  @Input() highlighted: boolean;

  private placeName: string;
  private objectId: string | null;

  getPlaceName() {
    return this.placeName;
  }

  getObjectId() {
    return this.objectId;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.placeItem?.name) {
      this.placeName = this.placeItem.name;
    } else {
      this.objectId = this.placeItem?.objectID ? this.placeItem.objectID : null;

      let location = this.placeItem?.locale_names?.default;
      if (Array.isArray(location)) this.placeName = location[0];
    }
  }
}
