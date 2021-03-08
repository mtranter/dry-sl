import getCallstack, { CallSite } from 'callsites';

export const Reflection = {
  getMyCaller: (depth = 1): CallSite => {
    const callsite = getCallstack();
    return callsite[2 + depth - 1];
  },
};
