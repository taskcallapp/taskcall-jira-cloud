import Resolver from '@forge/resolver';
import * as VarNames from '../src/VarNames';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  var data = {
    "incident_title": "Test incident 5",
    "status": "Open",
    "toShowActionOptions": true
  }
  return data;
});

export const handler = resolver.getDefinitions();
