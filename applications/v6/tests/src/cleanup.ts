export class CleanupStack {
  private readonly callbacks: Array<() => Promise<void>> = [];

  push(callback: () => Promise<void>): void {
    this.callbacks.unshift(callback);
  }

  async run(): Promise<void> {
    const errors: Error[] = [];

    for (const callback of this.callbacks) {
      try {
        await callback();
      } catch (error) {
        errors.push(error as Error);
      }
    }

    if (errors.length > 0) {
      throw new AggregateError(errors, 'One or more cleanup steps failed.');
    }
  }
}
