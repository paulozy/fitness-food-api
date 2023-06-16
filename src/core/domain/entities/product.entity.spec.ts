import { Product } from './product.entity';

describe('Product Entity', () => {
  it('should be possible create a new product', () => {
    const created_t = new Date().getTime();
    const last_modified_t = new Date().getTime();

    const product = Product.create({
      code: 123,
      status: 'ok',
      imported_t: '2020-01-01',
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
      serving_quantity: 1,
      nutriscore_score: 10,
      nutriscore_grade: 'A',
      main_category: 'Bebidas',
      image_url: 'https://www.google.com',
      created_t,
      last_modified_t,
      product_name: 'Coca Cola',
      quantity: '200ml',
      creator: 'admin',
    });

    expect(product).toBeInstanceOf(Product);

    expect(product.code).toBe(123);
    expect(product.status).toBe('ok');
    expect(product.imported_t).toBe('2020-01-01');
    expect(product.url).toBe('https://www.google.com');
    expect(product.brands).toBe('Coca Cola');
    expect(product.categories).toBe('Bebidas');
    expect(product.labels).toBe('Sem açucar');
    expect(product.cities).toBe('São Paulo');
    expect(product.purchase_places).toBe('Supermercado');
    expect(product.stores).toBe('Supermercado');
    expect(product.ingredients_text).toBe('Açucar, agua, gas');
    expect(product.traces).toBe('Açucar');
    expect(product.serving_size).toBe('200ml');
    expect(product.serving_quantity).toBe(1);
    expect(product.nutriscore_score).toBe(10);
    expect(product.nutriscore_grade).toBe('A');
    expect(product.main_category).toBe('Bebidas');
    expect(product.image_url).toBe('https://www.google.com');
    expect(product.created_t).toBe(created_t);
    expect(product.last_modified_t).toBe(last_modified_t);
    expect(product.product_name).toBe('Coca Cola');
    expect(product.quantity).toBe('200ml');
    expect(product.creator).toBe('admin');
  });
});
