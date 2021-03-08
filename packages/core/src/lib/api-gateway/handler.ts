import Ajv from 'ajv';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { parsePathParams, parseQueryParams } from './path-param-parser';
import { RouteHandlers } from './router';
import FP from 'fp-ts';

const ajv = new Ajv({});
export const APIEventHandler: (routes: RouteHandlers) => APIGatewayProxyHandler = ({ handlers }) => (event, ctx) => {
  const possibleRoutes = handlers.filter(
    h =>
      h.url.split('?')[0].toLowerCase() === event.resource.toLowerCase() &&
      event.httpMethod.toLowerCase() === h.method.toLowerCase()
  );
  if (possibleRoutes.length === 1) {
    const route = possibleRoutes[0];
    const path = route.url.split('?')[0];
    const query = route.url.split('?')[1];
    const pathParams = event.pathParameters ? parsePathParams(event.pathParameters, path) : FP.either.right({});
    const queryParams = event.queryStringParameters
      ? parseQueryParams(event.queryStringParameters, query)
      : FP.either.right({});
    const bodyObj = event.body ? JSON.parse(event.body) : null;
    const isValidBody = route.body ? ajv.validate(route.body, bodyObj) : true;
    if (isValidBody) {
      const tupled = FP.pipeable.pipe(
        pathParams,
        FP.either.chain(p => FP.either.map(qp => [p, qp] as const)(queryParams))
      );
      if (FP.either.isRight(tupled)) {
        return route.handler(
          {
            pathParams: tupled.right[0],
            queryParams: tupled.right[1],
            body: route.body,
          },
          {
            originalEvent: event,
            context: ctx,
          }
        );
      } else {
        return Promise.resolve({
          statusCode: 400,
          body: 'Bad Request',
        });
      }
    } else {
      return Promise.resolve({
        statusCode: 400,
        body: 'Bad Request',
      });
    }
  } else if (possibleRoutes.length > 1) {
    return Promise.resolve({
      statusCode: 500,
      body: 'Bad Request',
    });
  } else {
    return Promise.resolve({
      statusCode: 404,
      body: 'Bad Request',
    });
  }
};
