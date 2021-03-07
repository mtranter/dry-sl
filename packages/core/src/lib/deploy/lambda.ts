import { Context } from 'aws-lambda';
import { EventHandler } from './../common/events';

export const LambdaSymbol = Symbol('LambdaFunction');
type LambdaDefinitionRequest = {
  __Symbol__: typeof LambdaSymbol;
};

export type LambdaConfig = {
  name?: string;
  description?: string;
  envVars?: Record<string, string>;
  memory?: number;
};

type LambdaDefinition = {
  name: string;
  handler: string;
} & LambdaConfig;



type DependentEventHandler<I1, I2, O1, O2> = <I extends I1 | I2>(i: I, c: Context) => I extends I1 ? O1 : O2;

const isFunctionDefinitionRequest = <I>(i: I | LambdaDefinitionRequest): i is LambdaDefinitionRequest =>
  (i as LambdaDefinitionRequest).__Symbol__ === LambdaSymbol;

// export type LambdaDefinitionFunction = (i: LambdaDefinitionRequest, c: any) => Promise<LambdaDefinition>;

export const buildFunctionDefinition = (fdr: LambdaDefinitionRequest, cfg: LambdaConfig): LambdaDefinition => {
  throw new Error('fds');
};

export const lambdaDefinition = <In, Out>(
  handler: EventHandler<In, Out>,
  config?: LambdaConfig
): DependentEventHandler<In, LambdaDefinitionRequest, Promise<Out>, LambdaDefinition> => <
  I2 extends In | LambdaDefinitionRequest
>(
  a: I2,
  c: Context
) =>
  (isFunctionDefinitionRequest(a) ? buildFunctionDefinition(a, config || {}) : handler(a as In, c)) as I2 extends In
    ? Promise<Out>
    : LambdaDefinition;
