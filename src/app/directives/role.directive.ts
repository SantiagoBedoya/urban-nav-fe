import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '../user/services/user.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  private permission!: number;
  private userPermissions: Array<number> = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('user_id')!;
    this.userService.getUserPermissions(userId).subscribe((res) => {
      this.userPermissions = res.permissions;
      this.updateView();
    });
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

  private checkPermission(): boolean {
    return this.userPermissions.includes(this.permission);
  }
}
