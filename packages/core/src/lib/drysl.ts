import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  DependentEventHandler,
  LambdaConfig,
  LambdaDefinition,
  lambdaDefinition,
  LambdaDefinitionRequest,
} from './deploy/lambda';
import { APIEventHandler } from './api-gateway/handler';
import { Router } from './api-gateway/router';

export const DrySl = {
  api: (
    routes: <R>(router: Router<R>) => Router<R>,
    cfg: LambdaConfig
  ): DependentEventHandler<
    APIGatewayProxyEvent,
    LambdaDefinitionRequest,
    Promise<APIGatewayProxyResult> | void,
    LambdaDefinition
  > => {
    const routeDef = routes(Router([]));
    return lambdaDefinition(APIEventHandler(routeDef), cfg);
  },
};
