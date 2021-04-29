export const logService = false;

export class NotImplemented extends Error {
  constructor(serviceName: string) {
    super(`${serviceName} is not implemented on your platform`);
  }
}
