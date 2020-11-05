import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-survey-nav',
  templateUrl: './survey-nav.component.html',
  styleUrls: ['./survey-nav.component.css']
})
export class SurveyNavComponent implements OnInit {

  categoryTitle: any;
  surveys: string[];
  category: number = 0;
  activeMeasurements: any[] = [];

  constructor(private dataService: DataService) {

    dataService.getDisabledMeasurements()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));

    this.activeMeasurements = [
      { meas: "ecog", active: true },
      { meas: "likert", active: true },
      { meas: "breath", active: true },
      { meas: "pain", active: true },
      { meas: "fluid", active: true },
      { meas: "qol", active: true },
      { meas: "hads", active: true }
    ];

    this.dataService.disabledMeasurements.subscribe((data) => {
      data.forEach(number => {
        this.activeMeasurements[number - 1].active = false;
      })
    });

  }

  ngOnInit(): void {
    this.dataService.categoryChosen.subscribe(data => {
      this.category = data;
    })
  }

  checkMeasurement(measurementId) {

    let patientCategory = JSON.parse(sessionStorage.getItem('Patient')).patientCategories
      .find(catId => catId.categoryId == this.category);

    return patientCategory.measurementIds.find(measId => measId == measurementId);
  }

}
