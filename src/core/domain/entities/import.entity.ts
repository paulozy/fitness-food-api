import { randomUUID as uuid } from 'crypto';
import { InvalidStatusError } from '../@errors/invalid-status-error';

enum ImportStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

interface ImportProps {
  id?: string;
  file: string;
  status: string;
  created_at: string;
}

export class Import {
  id: string;
  file: string;
  status: string;
  created_at: string;

  private constructor(props: ImportProps) {
    const id = props.id ?? uuid();
    Object.assign(this, {
      ...props,
      id,
    });
  }

  static create(props: ImportProps): Import {
    Import.validateStatus(props.status);

    return new Import(props);
  }

  static validateStatus(status: string): void {
    if (!Object.values(ImportStatus).includes(status as ImportStatus)) {
      throw new InvalidStatusError(status);
    }
  }
}
