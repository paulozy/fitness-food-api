import { Product } from '@core/domain/entities/product.entity';
import { faker } from '@faker-js/faker';

export const createProductFactory = (code: string): Product => {
  return Product.create({
    code,
    url: 'https://www.google.com',
    brands: 'Coca Cola',
    categories: 'Bebidas',
    labels: 'Sem açucar',
    cities: 'São Paulo',
    purchase_places: 'Supermercado',
    stores: 'Supermercado',
    ingredients_text: 'Açucar, agua, gas',
    traces: 'Açucar',
    serving_size: '200ml',
    serving_quantity: '1',
    nutriscore_score: '10',
    nutriscore_grade: 'A',
    main_category: 'Bebidas',
    image_url: 'https://www.google.com',
    created_t: String(new Date().getTime()),
    last_modified_t: String(new Date().getTime()),
    product_name: 'Coca Cola',
    quantity: '200ml',
    creator: 'Codeby',
  });
};

export const createManyProductsPayloadFactory = (quantity: number) => {
  const products = [];

  for (let i = 0; i < quantity; i++) {
    const code = faker.random.numeric(10);

    products.push({
      code,
      url: 'https://www.google.com',
      brands: 'Coca Cola',
      categories: 'Bebidas',
      labels: 'Sem açucar',
      cities: 'São Paulo',
      purchase_places: 'Supermercado',
      stores: 'Supermercado',
      ingredients_text: 'Açucar, agua, gas',
      traces: 'Açucar',
      serving_size: '200ml',
      serving_quantity: '1',
      nutriscore_score: '10',
      nutriscore_grade: 'A',
      main_category: 'Bebidas',
      image_url: 'https://www.google.com',
      created_t: String(new Date().getTime()),
      last_modified_t: String(new Date().getTime()),
      product_name: 'Coca Cola',
      quantity: '200ml',
      creator: 'Codeby',
    });
  }

  return products;
};
