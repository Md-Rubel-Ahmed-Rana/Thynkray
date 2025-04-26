import { SetMetadata } from '@nestjs/common';

export const OWNERSHIP_META = 'ownership_check';

export interface OwnershipOptions {
  service: any;
  fetchMethod: string;
  ownerField: string;
  paramFieldName: string;
}

export const CheckOwnership = (options: OwnershipOptions) =>
  SetMetadata(OWNERSHIP_META, options);
