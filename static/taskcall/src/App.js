import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import * as _lu from '../src/assets/files/label_universe.json';
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

        <div style="clear: both;">
          <div class="header-text" style="width: 75%; float: left;">
            <div id="divStatus" class="status-tag"> {{ data.status }} </div>
            <div style="margin-top: 2px;">
              <a href="https://app.taskcallapp.com/incidents/{{ data.incident_title }}" target="_blank"> {{ data['incident_title'] }} </a>
            </div>
          </div>
            {
              data.toShowOptions ?
              <div style={{ width: "20%", float: "left", paddingLeft: "3%" }}>
                <button id="btnGroupDrop1" type="button">
                  <span> <img src="menu.svg"/> </span>
                </button>
                <div id="divActionsMenu" class="dropdown-menu app-text"></div>
              </div>
              : null
            }
        </div>

      </div>
		  :
      <div>
        <button style={{ backgroundColor: "#4CBB17"; color: "white", borderWidth: "0px", borderRadius: "3px" }}> { _lu.ttl_create_incident } </button>
      </div>
	  }
    </div>
  );
}

export default App;
