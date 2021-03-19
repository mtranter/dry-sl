/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable security/detect-non-literal-require */
export const cli = (args: any[]) => {
  console.log(process.cwd());
  const pkg = require(`${process.cwd()}/package.json`) as any;
  const handlers = require(`${process.cwd()}/${pkg.main}`).default as [];
  console.log(`Deploying ${handlers.length} handlers`);
};
