import { Import } from './import.entity';

describe('Import Entity', () => {
  it('should be possible create a new import', () => {
    const created_at = String(new Date().getTime());

    const import_ = Import.create({
      status: 'SUCCESS',
      created_at,
      file: 'file.csv',
    });

    expect(import_).toBeInstanceOf(Import);

    expect(import_.status).toBe('SUCCESS');
    expect(import_.created_at).toBe(created_at);
  });

  it('should be possible create a new import with id', () => {
    const created_at = String(new Date().getTime());

    const import_ = Import.create({
      id: '123',
      status: 'SUCCESS',
      created_at,
      file: 'file.csv',
    });

    expect(import_).toBeInstanceOf(Import);

    expect(import_.id).toBe('123');
    expect(import_.status).toBe('SUCCESS');
    expect(import_.created_at).toBe(created_at);
  });
});
