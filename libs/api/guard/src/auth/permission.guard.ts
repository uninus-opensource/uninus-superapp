import { Type, CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { Observable } from "rxjs";
import { EAppsOrigin } from "@uninus/entities";
import { PrismaClient } from "@uninus/api/services";

export const PermissionGuard = (appsWhiteList: Array<EAppsOrigin>): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.validateRequest(context);
    }
    async validateRequest(payload: ExecutionContext): Promise<boolean> {
      const prisma = new PrismaClient();
      const request = payload.switchToHttp().getRequest();
      const roleUser = request?.user?.role;
      const origin = request?.headers["app-origin"];
      const data = await prisma.appsOrigin.findMany({
        select: {
          name: true,
          roles: {
            select: {
              name: true,
            },
          },
        },
      });
      const permissions: {
        [key: string]: string[];
      } = {};

      data.forEach((el) => {
        permissions[el?.name] = el?.roles?.length ? el?.roles.map((el) => el?.name) : [];
      });

      return appsWhiteList.includes(origin) && permissions[origin].includes(roleUser);
    }
  }
  return mixin(PermissionGuardMixin);
};
