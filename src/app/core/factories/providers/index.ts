import { AuthInjectionFactory } from '@/app/core/factories/providers/auth-injection-factory';
import { Provider } from '@angular/core';

/**
 * Group all providers to inject in the application, to reduce complexity in the main module.
 */
export const getAllProviders: Provider[] = [
  ...new AuthInjectionFactory().createProviders(),
];
