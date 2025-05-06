import { monitor } from '@open-telemetry/api';

export class Observability {
  static trackTransaction(transactionId: string) {
    const span = monitor.startSpan('transactionProcessing');
    try {
      // Processing logic
      span.end();
    } catch (error) {
      span.recordException(error);
      span.end();
    }
  }
}