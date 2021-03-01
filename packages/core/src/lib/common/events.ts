import { Context } from 'aws-lambda';

export type EventHandler<I, O> = (i: I, ctx: Context) => Promise<O>;
