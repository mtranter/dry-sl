import { PostSls } from '@mtranter/serverless-ts-core';

export const handler = PostSls.api(router =>
  router.get('/people/{personId:int}')(req =>
    Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(req.pathParams),
    })
  )
);
