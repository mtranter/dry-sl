import { Reflection } from './reflection';

describe('Reflection', () => {
  it('Should return parent caller', () => {
    const framework = () => Reflection.getMyCaller();
    const handler = () => framework();
    const callerFn = handler();
    expect(callerFn?.getFunctionName()).toEqual('handler');
  });
  it('Should return parent caller with depth 1', () => {
    const framework = () => Reflection.getMyCaller(1);
    const handler = () => framework();
    const callerFn = handler();
    expect(callerFn?.getFunctionName()).toEqual('handler');
  });
  it('Should return parent caller at depth 2', () => {
    const framework = () => Reflection.getMyCaller(2);
    const builder = () => framework();
    const handler = () => builder();
    const callerFn = handler();
    expect(callerFn?.getFunctionName()).toEqual('handler');
  });
});
