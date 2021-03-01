import { Context } from 'aws-lambda';
import { callerCallsite } from 'caller-callsite';
import { EventHandler } from './../common/events';

export const LambdaSymbol = Symbol('LambdaFunction');
type FunctionDefinitionRequest = {
  __Symbol__: typeof LambdaSymbol;
};
type FunctionDefinition = {
  name: string;
  description?: string;
  handler: string;
  envVars?: Record<string, string>;
  memory?: number;
};

export type LambdaConfiguration = {
  name?: string;
  description?: string;
  memory?: number;
  envVars?: Record<string, string>;
};

type DependentEventHandler<I1, I2, O1, O2> = <I extends I1 | I2>(
  i: I,
  c: Context
) => I extends I1 ? Promise<O1> : Promise<O2>;

const isFunctionDefinitionRequest = <I>(i: I | FunctionDefinitionRequest): i is FunctionDefinitionRequest =>
  (i as FunctionDefinitionRequest).__Symbol__ === LambdaSymbol;

export type LambdaDefinitionFunction = (i: FunctionDefinitionRequest, c: any) => Promise<FunctionDefinition>;
export const lambdaDefinition = <I, O>(
  handler: EventHandler<I, O>
): DependentEventHandler<I, FunctionDefinitionRequest, O, FunctionDefinition> => (
  a: I | FunctionDefinitionRequest,
  c: Context
) => (isFunctionDefinitionRequest(a) ? ({} as any) : handler(a, c));
