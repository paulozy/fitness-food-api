import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductRules {
  @ApiProperty({
    nullable: true,
    enum: ['published', 'draft', 'trash'],
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    nullable: true,
    example: 'Coca Cola, Pepsi, ...',
  })
  @IsString()
  @IsOptional()
  brands?: string;

  @ApiProperty({
    nullable: true,
    example: 'Soda, Juice, ...',
  })
  @IsString()
  @IsOptional()
  categories?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  labels?: string;

  @ApiProperty({
    nullable: true,
    example: 'Braga, Porto, Lisboa, ...',
  })
  @IsString()
  @IsOptional()
  cities?: string;

  @ApiProperty({
    nullable: true,
    example: 'Supermarket, Grocery, ...',
  })
  @IsString()
  @IsOptional()
  purchase_places?: string;

  @ApiProperty({
    nullable: true,
    example: 'Carrefour, Auchan, ...',
  })
  @IsString()
  @IsOptional()
  stores?: string;

  @ApiProperty({
    nullable: true,
    example: 'Chocolate, Sugar, ...',
  })
  @IsString()
  @IsOptional()
  ingredients_text?: string;

  @ApiProperty({
    nullable: true,
    example: 'Soja Lecithin, ...',
  })
  @IsString()
  @IsOptional()
  traces?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  serving_size?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  serving_quantity?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  nutriscore_score?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  nutriscore_grade?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  main_category?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  product_name?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  quantity?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  creator?: string;

  constructor(props: UpdateProductRules) {
    Object.assign(this, props);
  }
}
