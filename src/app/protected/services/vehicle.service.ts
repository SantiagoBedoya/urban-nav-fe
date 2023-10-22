import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { Vehicle } from '../interfaces/vehicle.interface';
import { UserActions, UserSelectors } from 'src/app/state';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class vehicleService {
  private uri = environment.baseURL + '/vehicles';
  constructor(private readonly httpClient: HttpClient, private store: Store) {}

  editVehicleInfo(newVehicle: Vehicle) {
    const token = sessionStorage.getItem('access_token');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`),
    };

    this.store
      .select(UserSelectors.vehicle)
      .pipe(take(1))
      .subscribe((vehicle) => {
        (newVehicle);
        this.httpClient
          .patch<Vehicle>(`${this.uri}/${vehicle?._id}`, newVehicle, options)
          .subscribe({
            next: () => {
              this.store.dispatch(
                UserActions.setVehicle({
                  vehicle: { ...vehicle, ...newVehicle },
                })
              );
              sessionStorage.setItem(
                'driver_vehicle',
                JSON.stringify(newVehicle)
              );
            },
            error: (error) => console.error('There was an error!', error),
          });
      });
  }

  createVehicle(newVehicle: Vehicle) {
    const token = sessionStorage.getItem('access_token');
    const userId = sessionStorage.getItem('user_id');

    const fullVehicle = {
      ...newVehicle,
      userId,
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`),
    };

    return this.httpClient
      .post<Vehicle>(`${this.uri}`, fullVehicle, options)
      .subscribe({
        next: (data) => {
          this.store.dispatch(
            UserActions.setVehicle({
              vehicle: { ...data },
            })
          );
          sessionStorage.setItem('driver_vehicle', JSON.stringify(data));
        },
      });
  }

  getVehicleInfo(vehicleId: string) {
    const token = sessionStorage.getItem('access_token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`),
    };
    return this.httpClient.get<Vehicle>(`${this.uri}/${vehicleId}`, headers);
  }
}
