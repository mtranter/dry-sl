import { left, right, Either } from 'fp-ts/lib/Either';
import matchAll from 'string.prototype.matchall';
import FP from 'fp-ts';
import { APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';

export type ParserError = { error: string };
export type PathParamParser<T> = {
  parse: (s: string) => Either<ParserError, T>;
};

export class PathParamParsers {
  int: PathParamParser<number> = {
    parse: s => {
      const result = parseInt(s);
      return result === NaN ? left({ error: `Invalid int in path param: ${s}` }) : right(result);
    },
  };
  float: PathParamParser<number> = {
    parse: s => {
      const result = parseFloat(s);
      return result === NaN ? left({ error: `Invalid float in path param: ${s}` }) : right(result);
    },
  };
  string: PathParamParser<string> = {
    parse: s => right(s),
  };
}

const PathParamRegex = /\{([^\}/]+)/g.compile();
export const parsePathParams = (
  pathParams: APIGatewayProxyEventPathParameters,
  pathSpec: string
): FP.either.Either<string, Record<string, unknown>> => {
  type Parsers = keyof PathParamParsers;
  const parsers = new PathParamParsers() as Record<Parsers, PathParamParser<unknown>>;

  return [...matchAll(pathSpec, PathParamRegex)].reduce((p, n) => {
    return FP.pipeable.pipe(
      p,
      FP.either.chain(p => {
        const param = n[1];
        if (param) {
          const key = param.split(':')[0];
          const originalParam = pathParams[key];
          if (!originalParam) {
            return FP.either.left(`Unknown path param: ${key}`);
          } else {
            const parserName = param.split(':')[1];
            const parser: PathParamParser<unknown> | undefined = parsers[(parserName as unknown) as Parsers];
            const value = parser ? parser.parse(originalParam) : originalParam;
            return FP.either.right({
              ...p,
              [key]: value,
            });
          }
        } else {
          return FP.either.right(p);
        }
      })
    );
  }, FP.either.right<string, Record<string, unknown>>(pathParams));
};

const QueryParamRegex = /\{([^\}\?/]+)/g.compile();
export const parseQueryParams = (
  pathParams: APIGatewayProxyEventQueryStringParameters,
  querySpec: string
): FP.either.Either<string, Record<string, unknown>> => {
  type Parsers = keyof PathParamParsers;
  const parsers = new PathParamParsers() as Record<Parsers, PathParamParser<unknown>>;

  return [...matchAll(querySpec, QueryParamRegex)].reduce((p, n) => {
    return FP.pipeable.pipe(
      p,
      FP.either.chain(p => {
        const param = n[1];
        if (param) {
          const keySpec = param.split(':')[0];
          const key = keySpec.split('?')[0];
          const isNullable = keySpec.endsWith('?');
          const originalParam = pathParams[key];
          if (!isNullable && !originalParam) {
            return FP.either.left(`Query param not found: ${key}`);
          } else {
            const parserName = param.split(':')[1];
            const parser: PathParamParser<unknown> | undefined = parsers[(parserName as unknown) as Parsers];
            const value = parser && originalParam ? parser.parse(originalParam) : originalParam;
            return FP.either.right({
              ...p,
              [key]: value,
            });
          }
        } else {
          return FP.either.right(p);
        }
      })
    );
  }, FP.either.right<string, Record<string, unknown>>(pathParams));
};
