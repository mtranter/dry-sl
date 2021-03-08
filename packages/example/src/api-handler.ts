import { APIGatewayProxyHandler } from 'aws-lambda';

const routes = <A>(r: Router<A>) =>
  r.get('/people/{personId:int}')(req =>
    Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(req.pathParams),
    })
  );

export const handler: APIGatewayProxyHandler = PostSls.api(routes, { name: 'ApiHandler' });
