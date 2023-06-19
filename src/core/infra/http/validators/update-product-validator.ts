import { ClassValidatorFields } from '@core/@shared/infra/validators/class-validator-fields';
import { UpdateProductRules } from '../dtos/update-product.dto';

export class UpdateProductValidator extends ClassValidatorFields<UpdateProductRules> {
  validate(data: UpdateProductRules): boolean {
    return super.validate(new UpdateProductRules(data ?? ({} as any)));
  }
}

export class UpdateSingupValidatorFactory {
  static create(): UpdateProductValidator {
    return new UpdateProductValidator();
  }
}
