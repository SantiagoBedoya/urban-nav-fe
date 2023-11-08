import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Point } from '../../interfaces/point.interface';
import { PointService } from '../../services/point.service';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.component.html',
  styleUrls: ['./edit-point.component.css'],
})
export class EditPointComponent implements OnInit {
  points: Point[] | null = null;
  point: Point | null = null;

  pointForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private pointService: PointService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pointId = this.route.snapshot.paramMap.get('pointId')!;
    this.pointService.getById(pointId).subscribe({
      next: (response) => {
        this.point = response;
        this.pointForm = this.fb.group({
          name: [response.name, [Validators.required]],
          edges: this.fb.array(
            response.edges!.map((edge) =>
              this.fb.group({
                weight: [edge.weight, [Validators.required]],
                pointId: [edge.pointId, [Validators.required]],
              })
            )
          ),
        });
      },
    });
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

  updatePoint() {
    if (this.pointForm.valid) {
      const { name, edges } = this.pointForm.value;
      this.pointService
        .updateById(this.point?._id!, {
          name,
          edges,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/dashboard/points']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
