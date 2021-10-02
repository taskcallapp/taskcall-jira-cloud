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

          <div>
            <div style={{ width: "75%", float: "left", height: "100px" }}>
              <div id="divStatus" style={{ textTransform: "uppercase" }}> Acknowledged </div>
              <div style="margin-top: 2px;">
                  <a href="https://app.taskcallapp.com/incidents/{{ incident_id }}" target="_blank"> New issue has been found. Please check. </a>
              </div>
            </div>

            <div style={{ width: "20%", float: "left", paddingLeft: "3%", height: "100px" }}>
              <button id="btnGroupDrop1" type="button" class="btn btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span> <img src="../src/assets/images/menu.svg"> </span>
              </button>
              <div id="divActionsMenu" class="dropdown-menu app-text" aria-labelledby="btnGroupDrop1"></div>
            </div>
          </div>

          <div style={{ height: "200px" }}>
          </div>

          <div style={{ height: "300px" }}>
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
