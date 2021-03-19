import { Reflection } from './reflection';
import { Context, Handler } from 'aws-lambda';

export const LambdaSymbol = Symbol('LambdaFunction');
export type LambdaDefinitionRequest = {
  __Symbol__: typeof LambdaSymbol;
};

export type LambdaConfig = {
  name: string;
  description?: string;
  envVars?: Record<string, string>;
  memory?: number;
};

export type LambdaDefinition = {
  handler: string;
} & LambdaConfig;

export type DependentEventHandler<I1, I2, O1, O2> = <I extends I1 | I2>(i: I, c: Context) => I extends I1 ? O1 : O2;

const isFunctionDefinitionRequest = <I>(i: I | LambdaDefinitionRequest): i is LambdaDefinitionRequest =>
  (i as LambdaDefinitionRequest).__Symbol__ === LambdaSymbol;

export type LambdaDefinitionFunction = (i: LambdaDefinitionRequest, c: any) => Promise<LambdaDefinition>;

export const buildFunctionDefinition = (fdr: LambdaDefinitionRequest, cfg: LambdaConfig): LambdaDefinition => {
  const handler = Reflection.getMyCaller(2);
  const handlerFile = handler.getFileName();
  const handlerFnName = handler.getFunctionName();
  if (!handlerFnName) {
    throw new Error('Cannot locate Handler function name');
  }

  if (!handlerFile) {
    throw new Error('Cannot locate Handler file name');
  }
  return {
    name: cfg.name,
    envVars: cfg.envVars,
    handler: handlerFnName,
  };
};

export const lambdaDefinition = <In, Out>(
  handler: Handler<In, Out>,
  config: LambdaConfig
): DependentEventHandler<In, LambdaDefinitionRequest, Promise<Out> | void, LambdaDefinition> => <
  I2 extends In | LambdaDefinitionRequest
>(
  a: I2,
  c: Context
) =>
  (isFunctionDefinitionRequest(a)
    ? buildFunctionDefinition(a, config)
    : handler(a as In, c, null as any)) as I2 extends In ? Promise<Out> : LambdaDefinition;
