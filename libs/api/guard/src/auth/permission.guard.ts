import { Type, CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { Observable } from "rxjs";

export const PermissionGuard = (permissionKey: string): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const user = context.switchToHttp().getRequest().user;
      const userPermissions = user.role.permissions;

      return userPermissions.includes(permissionKey);
    }
  }
  return mixin(PermissionGuardMixin);
};
