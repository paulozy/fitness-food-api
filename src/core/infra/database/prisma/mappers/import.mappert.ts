import { Import } from '@core/domain/entities/import.entity';
import { Import as RawImport } from '@prisma/client';

export class ImportMapper {
  static toPersistence(data: Import): RawImport {
    return {
      id: data.id,
      status: data.status,
      file: data.file,
      created_t: data.created_at,
    };
  }

  static toDomain(data: RawImport): Import {
    return Import.create({
      id: data.id,
      status: data.status,
      file: data.file,
      created_at: data.created_t,
    });
  }
}
