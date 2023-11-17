import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-point',
  templateUrl: './create-point.component.html',
  styleUrls: ['./create-point.component.css'],
})
export class CreatePointComponent implements OnInit {
  points: Point[] | null = null;

  pointForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    edges: this.fb.array<FormGroup>([]),
  });

  constructor(
    private fb: FormBuilder,
    private pointService: PointService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pointService.getAll().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get edges() {
    return this.pointForm.controls['edges'] as FormArray;
  }

  addEdge() {
    const edgeForm = this.fb.group({
      weight: [0, [Validators.required]],
      pointId: ['', [Validators.required]],
    });

    this.edges.push(edgeForm);
  }

  deleteEdge(edgeIndex: number) {
    this.edges.removeAt(edgeIndex);
  }

  createPoint() {
    if (this.pointForm.valid) {
      const { name, edges } = this.pointForm.value;
      this.pointService.create(name).subscribe({
        next: (response) => {
          this.pointService.addEdges(response._id, edges).subscribe({
            next: (resp) => {
              this.router.navigate(['/dashboard/points']);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
