import React, { useEffect, useState } from 'react';
import './css/AppStyles.css';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { invoke } from '@forge/bridge';
import * as _lu from '../src/assets/files/label_universe.json';
import MenuIcon from '@atlaskit/icon/glyph/menu';
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
            <div className="header-text" style={{ width: "75%", float: "left" }}>
              <div id="divStatus" className="status-tag" style={{ backgroundColor: "yellow" }}> Acknowledged </div>
              <div style={{ marginTop: "2px" }}>
                  <a href="https://app.taskcallapp.com/incidents/{{ incident_id }}" target="_blank"> New issue has been found. Please check. </a>
              </div>
            </div>
	          <div style={{ width: "20%", float: "left", paddingLeft: "3%" }}>
              <DropdownMenu triggerButtonProps={{ iconBefore: <MenuIcon label="menu" size="medium" /> }} triggerType="button" position="bottom right" boundariesElement="viewport">
                <DropdownItemGroup>
                  <DropdownItem> { _lu.ttl_acknowledge } </DropdownItem>
                  <DropdownItem> { _lu.ttl_resolve } </DropdownItem>
                  <DropdownItem> { _lu.ttl_add_note } </DropdownItem>
                  <DropdownItem> { _lu.ttl_reassign } </DropdownItem>
                  <DropdownItem> { _lu.ttl_add_responders } </DropdownItem>
                  <DropdownItem> { _lu.ttl_run_response_set } </DropdownItem>
                  <DropdownItem> { _lu.ttl_status_update } </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            </div>
          </div>

          <div style={{ clear: "both", height: "8px" }}></div>

          <div style={{ clear: "both", marginBottom: "8px" }}>
            <a data-toggle="collapse" href="#collapseDetails" role="button" aria-expanded="true" aria-controls="collapseDetails">
              { _lu.ttl_details }
            </a>
          </div>
          <div className="collapse show" id="collapseDetails">
              <div className="app-text">
                  <table>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_service }: </td>
                          <td id="tdService"></td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_urgency }: </td>
                          <td id="tdUrgency"></td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_assigned_to }: </td>
                          <td id="tdAssignedTo"></td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_next_alert_in }: </td>
                          <td id="tdNextAlertIn"></td>
                      </tr>
                  </table>
              </div>
          </div>
          <div style={{ clear: "both", marginBottom: "8px", paddingBottom: "20px" }}>
            <a className="btn btn-link header-text px-0" data-toggle="collapse" href="#collapseTimeline" role="button" aria-expanded="true" aria-controls="collapseTimeline">
                { _lu.ttl_timeline }
            </a>
            <div className="collapse show" id="collapseTimeline">
                <div id="timelineBody" className="app-text">
                </div>
            </div>
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
