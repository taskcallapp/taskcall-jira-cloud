import React, { useEffect, useState } from 'react';
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
            <div style={{ width: "75%", float: "left", height: "100px" }}>
              <div id="divStatus" style={{ textTransform: "uppercase" }}> Acknowledged </div>
              <div style={{ marginTop: "2px" }}>
                  <a href="https://app.taskcallapp.com/incidents/{{ incident_id }}" target="_blank"> New issue has been found. Please check. </a>
              </div>
            </div>

            <div style={{ width: "20%", float: "left", paddingLeft: "3%", height: "100px" }}>
              <DropdownMenu triggerButtonProps={{ iconBefore: <MenuIcon label="menu" size="medium" /> }} triggerType="button">
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
