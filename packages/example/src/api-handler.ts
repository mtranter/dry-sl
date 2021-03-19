import { DrySl, Router } from 'drysl';
import { APIGatewayProxyHandler } from 'aws-lambda';

const routes = <A>(r: Router<A>) =>
  r.get('/people/{personId:int}/children/{childName}')(req => {
    return Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(req.pathParams),
    });
  });

export const handler: APIGatewayProxyHandler = DrySl.api(routes, { name: 'ApiHandler' });
