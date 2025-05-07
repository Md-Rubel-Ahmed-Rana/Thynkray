import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { OWNERSHIP_META, OwnershipOptions } from 'src/decorators/ownership.decorators';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private reflector: Reflector, private moduleRef: ModuleRef) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<OwnershipOptions>(
      OWNERSHIP_META,
      context.getHandler()
    );

    if (!options){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params[options.paramFieldName]

    const serviceInstance =await this.getServiceByName(options.service)
    const resourceResponse = await serviceInstance[options.fetchMethod](resourceId);
    const resource = resourceResponse?.data

    if (!resource) {
      throw new ForbiddenException('Resource not found.');
    }

    console.log({ resourceId, resource, user});

    console.log({
      left: resource,
      right: user?.id
    });

    const ownerValue = this.getValueByPath(resource, options.ownerField);
    if (ownerValue !== user?.id) {
      throw new ForbiddenException('You are not the owner of this resource.');
    }

    return true;
  }
  
  async getServiceByName(serviceName: string): Promise<any> {
        try {
          const service = this.moduleRef.get(serviceName, { strict: false });
          return service;
        } catch (error) {
          console.error(`Service with name "${serviceName}" not found.`, error);
          return null;
        }
  }

  getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

}
