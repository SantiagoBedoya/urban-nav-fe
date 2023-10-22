import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective {
  private permission!: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appRole(val: number) {
    console.log(val);
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
    const permissions = JSON.parse(sessionStorage.getItem('permissions')!);
    return permissions.includes(this.permission);
  }
}
