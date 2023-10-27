import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../state';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  private permission!: number;
  private permissions: number[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store
      .select(UserSelectors.permissions)
      .subscribe(userPermissions => {
        this.permissions = userPermissions;
      });

    this.updateView();
  }

  @Input()
  set appRole(val: number) {
    this.permission = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): any {
    if(this.permissions.length > 0) {
      return this.permissions.includes(this.permission);
    }
  }
}
