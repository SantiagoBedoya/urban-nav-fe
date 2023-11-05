import { Component, OnInit } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css'],
})
export class PointsComponent implements OnInit {
  points: Point[] | null = null;
  constructor(private readonly pointService: PointService) {}

  ngOnInit(): void {
    this.getPoints();
  }

  getPoints() {
    this.pointService.getAll().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deletePoint(pointId: string) {
    this.pointService.deletePoint(pointId).subscribe({
      next: (response) => {
        this.points = null;
        this.getPoints();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
