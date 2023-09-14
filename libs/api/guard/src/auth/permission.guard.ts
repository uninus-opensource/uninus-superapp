import { Type, CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { Observable } from "rxjs";
import { EAppsOrigin } from "@uninus/entities";
import { PrismaService } from "@uninus/api/models";

export const PermissionGuard = (appOrigin: EAppsOrigin): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    constructor(private prisma: PrismaService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return true;
    }
  }
  return mixin(PermissionGuardMixin);
};
