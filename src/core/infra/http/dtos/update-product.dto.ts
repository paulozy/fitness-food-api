import { IsOptional, IsString } from 'class-validator';

export class UpdateProductRules {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  brands?: string;

  @IsString()
  @IsOptional()
  categories?: string;

  @IsString()
  @IsOptional()
  labels?: string;

  @IsString()
  @IsOptional()
  cities?: string;

  @IsString()
  @IsOptional()
  purchase_places?: string;

  @IsString()
  @IsOptional()
  stores?: string;

  @IsString()
  @IsOptional()
  ingredients_text?: string;

  @IsString()
  @IsOptional()
  traces?: string;

  @IsString()
  @IsOptional()
  serving_size?: string;

  @IsString()
  @IsOptional()
  serving_quantity?: string;

  @IsString()
  @IsOptional()
  nutriscore_score?: string;

  @IsString()
  @IsOptional()
  nutriscore_grade?: string;

  @IsString()
  @IsOptional()
  main_category?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  @IsOptional()
  product_name?: string;

  @IsString()
  @IsOptional()
  quantity?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  constructor(props: UpdateProductRules) {
    Object.assign(this, props);
  }
}
