import { APIGatewayProxyHandler } from 'aws-lambda';
import { PostSls } from '@mtranter/serverless-ts-core';
import { Router } from '@mtranter/serverless-ts-core/dist/lib/api-gateway/router';

const routes = <A>(r: Router<A>) =>
  r.get('/people/{personId:int}')(req =>
    Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(req.pathParams),
    })
  );

export const handler: APIGatewayProxyHandler = PostSls.api(routes, { name: 'ApiHandler' });
