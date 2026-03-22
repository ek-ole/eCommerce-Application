import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type AuthMiddlewareOptions } from '@commercetools/ts-client';

import {
  authUrl,
  clientId,
  clientSecret,
  correlationIdMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
  scopes,
} from './api-client-builder';
import { mockApiRoot } from './mocks/api-mock-client';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

let apiRoot;

if (useMock) {
  apiRoot = mockApiRoot;
} else {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export default apiRoot;
