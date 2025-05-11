import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { PinoLogger } from 'src/common/logger/pino-logger.service';
import { OWNERSHIP_META, OwnershipOptions } from 'src/decorators/ownership.decorators';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, 
    private readonly moduleRef: ModuleRef,
    private readonly logger: PinoLogger
  ) {}

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
      this.logger.error(`Resource was not found by ${resourceId}`)
      throw new ForbiddenException('Resource not found.');
    }

    const ownerValue = this.getValueByPath(resource, options.ownerField);
    if (ownerValue !== user?.id) {
      this.logger.warn(`${user?.name} is not the owner of ${ownerValue}`)
      throw new ForbiddenException('You are not the owner of this resource.');
    }

    return true;
  }
  
  async getServiceByName(serviceName: string): Promise<any> {
      try {
        const service = this.moduleRef.get(serviceName, { strict: false });
        return service;
      } catch (error: any) {
        this.logger.error(`Service with name "${serviceName}" not found. Error: ${error?.message}`);
        return null;
      }
  }

  getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

}
