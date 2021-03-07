import callerCallsite, { CallSite } from 'caller-callsite';

const CallStackMarker = Symbol('CallStackMarker');

const mapStack = (cs: CallSite) => ({
  functionName: cs.getFunctionName(),
  fileName: cs.getFileName(),
  methodName: cs.getMethodName(),
  lineNo: cs.getLineNumber(),
})

const getCallstack = () => {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack: CallSite[] = (new Error().stack!.slice(1) as unknown) as CallSite[];
  Error.prepareStackTrace = _prepareStackTrace;
  console.dir(stack.map(mapStack));
  return stack;
};

const CallbackCallstack = {
  [CallStackMarker]: <T>(cb: () => T): T => cb(),
  getMyCaller: (): CallSite | null => {
    const callsite = getCallstack()
    return callsite[2]
  },
};

describe('CallbackCallstack', () => {
  it('Should return its depth in the stack', () => {
    const framework = () => CallbackCallstack.getMyCaller();
    const handler = () => framework();
    const callerFn = handler();
    expect(callerFn?.getFunctionName()).toEqual('handler');
  });
});
