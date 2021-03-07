import { LambdaConfig, lambdaDefinition, LambdaDefinitionFunction } from './lib/deploy/lambda';
// import { EventHandler } from './lib/common/events';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { APIEventHandler } from './lib/api-gateway/handler';
import { Router } from './lib/api-gateway/router';

const CallStackMarker = Symbol('CallStackMarker');

const CallbackCallstack = {
  [CallStackMarker]: <T>(cb: () => T): T => cb(),
};

export const PostSls = {
  api: (
    routes: <R>(router: Router<R>) => Router<R>,
    cfg?: LambdaConfig
  ): APIGatewayProxyHandler & LambdaDefinitionFunction => {
    const routeDef = routes(Router([]));
    return CallbackCallstack[CallStackMarker](() => lambdaDefinition(APIEventHandler(routeDef), cfg));
  },
};

// export const Infra = {
//   handlers: (handlers: Record<string, EventHandler<unknown, unknown>>)
// }))
