import { Provider } from '@angular/core';
import { providePersistence } from './persistence.provider';
import { provideHttpClients } from './http-clients.provider';
import { provideHttpAgents } from './http-agents.provider';

export function provideInfrastructure(): Provider[] {
  return [
    ...providePersistence(),
    ...provideHttpClients(),
    ...provideHttpAgents(),
  ];
}
