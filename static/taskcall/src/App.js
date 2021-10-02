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
      {
        data ?
        <div>
          <label id="lblTcInc" hidden></label>
          <p id="pError" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>

          <div style={{ height: "100px" }}>
            <div style={{ flex: 4, backgroundColor: "yellow" }}></div>
            <div style={{ flex: 1, backgroundColor: "green" }}></div>
          </div>

          <div style={{ height: "200px", backgroundColor: "blue" }}>
          </div>

          <div style={{ height: "300px", backgroundColor: "black" }}>
          </div>
        </div>
        :
        <div>
          <Button> { _lu.ttl_create_incident } </Button>
        </div>
      }
    </div>
  );
}

export default App;
