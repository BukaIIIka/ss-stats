import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { districts } from '../scripts/map_districts';
import { DistrictData } from '../scripts/district-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  private defaultDistrictName = 'Riga';
  private map: L.Map;
  private activeElements: any;

  public currentDistrictName: string = this.defaultDistrictName;
  public isInfoBlockHidden: boolean = true;
  public currentData: DistrictData = new DistrictData();
  public isLoading: boolean = false;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const initialState = {
      lng: 56.95,
      lat: 24.1,
      zoom: 11
    };
    const map = L.map(this.mapContainer.nativeElement).setView([initialState.lng, initialState.lat], initialState.zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/bukaiiika/ckldmir601yq517s20k10ke6c/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnVrYWlpaWthIiwiYSI6ImNra2w1Y2Z3YjBhb28ycXJxZG16NWhheDcifQ.8EksqpcH1sNDs1_YwK6PLw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    districts.forEach((district) => {
      let polygon = L.polygon(district.polygonPoints, {weight: 1, color: '#9ba99c'}).addTo(map);
      polygon.on('click', (el) => {
        if (this.currentDistrictName === district.name) {
          this.hideInfoBlock();
        } else {
          this.clearActiveDistricts();
          el.target.getElement().classList.toggle('active');
          this.openInfoBlock(district.id);
          this.currentDistrictName = district.name;
        }
      });
      polygon.bindTooltip(district.name);
    });
  }

  private openInfoBlock = (districtId) => {
    this.currentData = undefined;
    this.isLoading = true;
    fetch(`http://212.71.232.17:80/jason/${districtId}/`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Что-то пошло не так на API сервере.');
        }
      })
      .then(response => {
        this.currentData = response;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
      });
    this.isInfoBlockHidden = false;
  }

  private clearActiveDistricts = () => {
    this.activeElements = document.getElementsByClassName('active');
    for (const el of this.activeElements) {
      el.classList.remove('active');
    }
  }

  public hideInfoBlock = () => {
    this.isInfoBlockHidden = true;
    this.clearActiveDistricts();
    this.currentDistrictName = this.defaultDistrictName;
  }

  public showDistrictsStats(id: number, name: string, el: HTMLElement) {
    if (this.currentDistrictName === name) {
      this.hideInfoBlock();
    } else {
      this.clearActiveDistricts();
      el.classList.toggle('active');
      this.openInfoBlock(id);
      this.currentDistrictName = name;
    }
  }
}
