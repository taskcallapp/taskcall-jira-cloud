import React, { useEffect, useState } from 'react';
import Button from '@atlaskit/button';
import { invoke } from '@forge/bridge';
import * as _lu from '../src/assets/files/label_universe.json';
import TextArea from '@atlaskit/textarea';
import * as VarNames from '../src/VarNames';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <div>
      <Button> { _lu.ttl_create_incident } </Button>
    </div>
  );
}

export default App;
