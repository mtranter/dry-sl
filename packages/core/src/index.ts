import { lambdaDefinition, LambdaDefinitionFunction } from './lib/deploy/lambda';
import { EventHandler } from './lib/common/events';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { APIEventHandler } from './lib/api-gateway/handler';
import { Router } from './lib/api-gateway/router';

export const PostSls = {
  api: (routes: <R>(router: Router<R>) => Router<R>): APIGatewayProxyHandler & LambdaDefinitionFunction=> {
    const routeDef = routes(Router([]));
    return lambdaDefinition(APIEventHandler(routeDef));
  },
};

export const Infra = {
  handlers: (handlers: Record<string, EventHandler<unknown, unknown>>)
}