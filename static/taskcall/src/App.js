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

        <div style="clear: both;">
          <div class="header-text" style="width: 75%; float: left;">
            <div id="divStatus" class="status-tag"> Open </div>
            <div style="margin-top: 2px;">
              <a href="https://app.taskcallapp.com/incidents/{{ data.incident_title }}" target="_blank"> Test Incident Cinco </a>
            </div>
          </div>
            {
              true ?
              <div style={{ width: "20%", float: "left", paddingLeft: "3%" }}>
                <button id="btnGroupDrop1" type="button">
                  <span> <img src="menu.svg"/> </span>
                </button>
                <div id="divActionsMenu" class="dropdown-menu app-text"></div>
              </div>
              : null
            }
        </div>

        <div style={{ clear: "both", height: "8px" }}></div>

        <div style={{ clear: "both", marginBottom: "8px" }}>
          <a class="btn btn-link header-text px-0">
            { _lu.ttl_details } <span>&#9660;</span>
          </a>

          <div class="collapse show" id="collapseDetails">
              <div class="app-text">
                  <table>
                      <tr class="table-row">
                          <td class="table-attribute-col"> { _lu.det_service }: </td>
                          <td id="tdService"></td>
                      </tr>
                      <tr class="table-row">
                          <td class="table-attribute-col"> { _lu.det_urgency }: </td>
                          <td id="tdUrgency"></td>
                      </tr>
                      <tr class="table-row">
                          <td class="table-attribute-col"> { _lu.det_assigned_to }: </td>
                          <td id="tdAssignedTo"></td>
                      </tr>
                      <tr class="table-row">
                          <td class="table-attribute-col"> { _lu.det_next_alert_in }: </td>
                          <td id="tdNextAlertIn"></td>
                      </tr>
                  </table>
              </div>
          </div>

          <div style={{ clear: "both", marginBottom: "8px", paddingBottom: "20px" }}>
              <a class="btn btn-link header-text px-0">
                  { _lu.ttl_timeline } <span>&#9660;</span>
              </a>
              <div class="collapse show" id="collapseTimeline">
                  <div id="timelineBody" class="app-text">
                  </div>
              </div>
          </div>
        </div>
      </div>
		  :
      <div>
        <Button appearance="primary" autoFocus>
          { _lu.ttl_create_incident }
        </Button>
      </div>
	  }
    </div>
  );
}

export default App;
