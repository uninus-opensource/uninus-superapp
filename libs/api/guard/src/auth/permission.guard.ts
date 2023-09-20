import { Type, CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { Observable } from "rxjs";
import { EAppsOrigin } from "@uninus/entities";

export const PermissionGuard = (appsWhiteList: Array<EAppsOrigin>): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const roleUser = request.user.role;
      const appOrigin = request.headers["app-origin"];
      const permissions = JSON.parse(process.env["APPS_PERMISSION"] as string);
      return appsWhiteList.includes(appOrigin) && permissions[`${appOrigin}`].includes(roleUser);
    }
  }
  return mixin(PermissionGuardMixin);
};
