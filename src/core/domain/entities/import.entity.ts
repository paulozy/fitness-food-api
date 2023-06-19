import { InvalidStatusError } from '../@errors/invalid-status-error';

enum ImportStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

interface ImportProps {
  id?: string;
  status: string;
  created_at: string;
}

export class Import {
  id: string;
  status: string;
  created_at: string;

  private constructor(props: ImportProps) {
    Object.assign(this, props);
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
