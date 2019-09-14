import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { bindCallback } from 'rxjs';

import { map } from 'rxjs/operators';

const { Geolocation, Modals } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'capApp';
  coords: Coordinates;

  ngOnInit(){
    this.watchPosition().subscribe( coords =>
      this.coords = coords

    );
  }

  watchPosition(): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition)({});

    return watch.pipe(map(pos => pos[0]));
  }

  showAlert() {
    const lat = this.coords.latitude;
    const lng = this.coords.longitude;
    Modals.alert({
      title: 'Your Position',
      message: `Lat: ${lat}, Lng: ${lng}`,
    });
  }

}
