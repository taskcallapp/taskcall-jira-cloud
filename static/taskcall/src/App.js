import React, { useCallback, useEffect, useState } from 'react';
import './css/AppStyles.css';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { invoke, Modal } from '@forge/bridge';
import * as _lu from '../src/assets/files/label_universe.json';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import { testIncidentData } from '../src/TestData';
import TextArea from '@atlaskit/textarea';
import { VarNames } from '../src/VarNames';


function App() {
  const [data, setData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);

  // Internal constants
  const urgencyMap = {
      1: _lu.opt_minor, 2: _lu.opt_low, 3: _lu.opt_medium,
      4: _lu.opt_high, 5: _lu.opt_critical
  };
  const eventTypeMap = {
    'ACKNOWLEDGE': _lu.evn_acknowledge,
    'ADD CONFERENCE BRIDGE': _lu.evn_add_conference_bridge,
    'ADD IMPACTED BUSINESS SERVICE': _lu.evn_add_impacted_business_service,
    'ADD RESPONDERS': _lu.evn_add_responders,
    'ADD SUBSCRIBERS': _lu.evn_add_subscribers,
    'CANCEL': _lu.evn_cancel,
    'DISPATCH': _lu.evn_dispatch,
    'ESCALATE': _lu.evn_escalate,
    'MERGE': _lu.evn_merge,
    'NOTATE': _lu.evn_notate,
    'REASSIGN': _lu.evn_reassign,
    'RESOLVE': _lu.evn_resolve,
    'RUN RESPONSE SET': _lu.evn_run_response_set,
    'SNOOZE': _lu.evn_snooze,
    'TRIGGER': _lu.evn_trigger,
    'STATUS UPDATE': _lu.evn_status_update,
    'UN-ACKNOWLEDGE': _lu.evn_un_acknowledge,
    'UN-MERGE': _lu.evn_un_merge,
    'URGENCY AMENDMENT': _lu.evn_urgency_amendment
  };
  const const_acknowledged = 'ACKNOWLEDGED'
  const const_resolved = 'RESOLVED'

  // useEffect(() => {
  //   invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  // }, []);

  useEffect(() => {
    (async () => {
      // Can be done using resolvers
      // TO get the issue details, i.e. summary and description
      const data = await invoke('getIssue');

      const { summary: issueSummary, description: issueDescription } =
        data.fields;

      // checking if summary exists and setting it
      setSummary(issueSummary ? issueSummary : null);
      // checking if description exists and setting it
      setDescription(
        issueDescription && issueDescription.content[0].content[0].text
          ? issueDescription.content[0].content[0].text
          : null
      );
    })();
    return () => {};
  }, []);

  const openCreateIncidentModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => createIncident(payload),
      size: 'medium',
      context: {
          modalType: 1,
          description: description,
          summary: summary
      },
    });
    modal.open();
  };

  async function createIncident(payload) {
    console.log(payload);
    if (payload !== null) {
      await invoke('createIncident', {});
      setData(testIncidentData);
    }
  }

  const openAddNoteModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => addNote(payload),
      size: 'small',
      context: {
          modalType: 2,
          description: description,
          summary: summary
      },
    });
    modal.open();
  };

  async function addNote(payload) {
    if (payload !== null) {
    }
  }

  const openReassignModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => reassign(payload),
      size: 'small',
      context: {
          modalType: 3,
	  description: description,
	  summary: summary
      },
    });
    modal.open();
  };

  async function reassign(payload) {
    if (payload !== null) {
    }
  }

  const openAddRespondersModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => addResponders(payload),
      size: 'small',
      context: {
          modalType: 4,
          description: description,
          summary: summary
      },
    });
    modal.open();
  };

  async function addResponders(payload) {
    if (payload !== null) {
    }
  }

  const openRunResponseSetModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => runResponseSet(payload),
      size: 'small',
      context: {
          modalType: 5,
          description: description,
          summary: summary
      },
    });
    modal.open();
  };

  async function runResponseSet(payload) {
    if (payload !== null) {
    }
  }

  const openStatusUpdateModal = () => {
    const modal = new Modal({
      resource: 'center-modal',
      onClose: (payload) => updateStatus(payload),
      size: 'small',
      context: {
          modalType: 6,
          description: description,
          summary: summary
      },
    });
    modal.open();
  };

  async function updateStatus(payload) {
    if (payload !== null) {
    }
  }

  function decorateIncidentStatus(status){
    if (status == const_acknowledged){
      return (
        <div id="divStatus" className="status-tag" style={{ backgroundColor: "yellow", color: "black" }}> { _lu.sts_acknowledged } </div>
      );
    } else if (status == const_resolved) {
      return (
        <div id="divStatus" className="status-tag" style={{ backgroundColor: "#4CBB17", color: "white" }}> { _lu.sts_resolved } </div>
      );
    } else {
      return (
        <div id="divStatus" className="status-tag" style={{ backgroundColor: "red", color: "white" }}> { _lu.sts_open } </div>
      );
    }
  }

  function populateTimeline(timelineDivName, allEvents){
      timelineBody = document.getElementById(timelineDivName);
      timelineBody.innerHTML = '';
      for (i=allEvents.length - 1; i >= 0; i=i-1){
          event = allEvents[i];
          timelineBody.appendChild(createEvent(event[str_eventTimestamp], event[str_eventType], event[str_eventBy], JSON.parse(event[str_eventLog])));
      }
  }


  function timestampToString(tmsp){
    var d = new Date(tmsp);

    var dateObj = new Date(d);
    var yearStr = dateObj.getFullYear().toString();
    var monthStr = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    var dayStr = dateObj.getDate().toString().padStart(2, '0');
    var datePortion = yearStr + "-" + monthStr + "-" + dayStr;

    var timeItems = convertToTwelveHourClock(d.getHours(), d.getMinutes());
    var timePortion = timeItems[0].toString().padStart(2, '0') + ':' + timeItems[1].toString().padStart(2, 0) + ' ' + timeItems[2];

    return datePortion + '  ' + timePortion;
  }


  function convertToTwelveHourClock(hour, minute){
    if (hour == 0 || hour == 24){
      return [12, minute, "AM"];
    } else if (hour >= 1 && hour <= 11){
      return [hour, minute, "AM"];
    } else if (hour == 12){
      return [hour, minute, "PM"];
    } else {
      return [hour % 12, minute, "PM"];
    }
  }

  // Gets the difference in minutes between two dates.
  function minutesDelta(date1, date2){
    var delta = Math.floor((date2 - date1)/(1000*60));
    if (delta < 0){
      return '0 mins';
    } else if (delta == 1){
      return '1 min';
    } else {
      return delta.toString() + ' mins';
    }
  }

  function utcToLocalTimestamp(dateObj){
      var dateObj = new Date(dateObj);

      var dateYear = dateObj.getFullYear();
      var dateMonth = dateObj.getMonth();
      var dateDay = dateObj.getDate();
      var dateHour = dateObj.getHours();
      var dateMinutes = dateObj.getMinutes();
      var dateSeconds = dateObj.getSeconds();
      var dateObj = new Date(Date.UTC(dateYear, dateMonth, dateDay, dateHour, dateMinutes, dateSeconds));

      var localYear = dateObj.getFullYear();
      var localMonth = dateObj.getMonth();
      var localDay = dateObj.getDate();
      var localHour = dateObj.getHours();
      var localMinute = dateObj.getMinutes();
      var localSeconds = dateObj.getSeconds();

      var newDateObj = new Date(localYear, localMonth, localDay, localHour, localMinute, localSeconds);
      return newDateObj;
  }

  return (
    <div>
      {
        data ?
        <div>
          <label id="lblTcInc" hidden></label>
          <p id="pError" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>

          <div>
            <div className="header-text" style={{ width: "75%", float: "left" }}>
              { decorateIncidentStatus(data[VarNames.str_status]) }

              <div style={{ marginTop: "2px" }}>
                  <a href="https://app.taskcallapp.com/incidents/{{ incident_id }}" target="_blank"> { data[VarNames.str_task][VarNames.str_taskTitle] } </a>
              </div>
            </div>
	          <div style={{ width: "20%", float: "left", paddingLeft: "3%" }}>
              <DropdownMenu triggerButtonProps={{ iconBefore: <MenuIcon label="menu" size="medium" /> }} triggerType="button" position="bottom right" boundariesElement="viewport">
                <DropdownItemGroup>
                  <DropdownItem> { _lu.ttl_acknowledge } </DropdownItem>
                  <DropdownItem> { _lu.ttl_resolve } </DropdownItem>
                  <DropdownItem onClick={openAddNoteModal}> { _lu.ttl_add_note } </DropdownItem>
                  <DropdownItem onClick={openReassignModal}> { _lu.ttl_reassign } </DropdownItem>
                  <DropdownItem onClick={openAddRespondersModal}> { _lu.ttl_add_responders } </DropdownItem>
                  <DropdownItem onClick={openRunResponseSetModal}> { _lu.ttl_run_response_set } </DropdownItem>
                  <DropdownItem onClick={openStatusUpdateModal}> { _lu.ttl_status_update } </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            </div>
          </div>

          <div style={{ clear: "both", marginTop: "5px", marginBottom: "8px" }}>
              <div className="app-text">
                  <table>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_service }: </td>
                          <td id="tdService"> { data[VarNames.str_task][VarNames.str_services][0] } </td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_urgency }: </td>
                          <td id="tdUrgency"> { urgencyMap[data[VarNames.str_task][VarNames.str_urgencyLevel]] } </td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_assigned_to }: </td>
                          <td id="tdAssignedTo"> { data[VarNames.str_assignees].map(x => x[0]).join(', ') } </td>
                      </tr>
                      <tr className="table-row">
                          <td className="table-attribute-col"> { _lu.det_next_alert_in }: </td>
                          <td id="tdNextAlertIn"> { minutesDelta(new Date(), new Date(utcToLocalTimestamp(data[VarNames.str_nextAlertTimestamp]))) } </td>
                      </tr>
                  </table>
              </div>
          </div>
          <div style={{ clear: "both", marginBottom: "8px", paddingBottom: "20px" }}>
            <p className="header-text px-0">
                { _lu.ttl_timeline }
            </p>
            <div id="timelineBody" className="app-text">
              { data[VarNames.str_events].map((item, index) =>
                <div style={{ borderLeft: "5px", borderColor: "#909090", paddingLeft: "10px", marginBottom: "5px", paddingRight: "3px", fontSize: "10px", color: "#606060" }}>
                  <label style={{ paddingRight: "10px" }}> { timestampToString(convertUtcTimestamp(item[VarNames.str_eventTimestamp])) } </label>
                  <label> { eventTypeMap[item[VarNames.str_eventType]] } </label>
                  <br/>
                  <label> { item[VarNames.str_eventBy] } </label>
                  {
                    item[VarNames.str_eventType] == 'NOTATE' ?
                    <label> { JSON.parse(item[VarNames.str_eventLog])[VarNames.str_notes] } </label>
                    : null
                  }
                  {
                    item[VarNames.str_eventType] == 'STATUS_UPDATE' ?
                    <label> { JSON.parse(item[VarNames.str_eventLog])[VarNames.str_statusUpdate] } </label>
                    : null
                  }
                </div>
              )}
              }
            </div>
          </div>
        </div>
        :
        <div>
          <Button appearance="primary" onClick={openCreateIncidentModal}> { _lu.ttl_create_incident } </Button>
        </div>
      }
    </div>
  );
}

export default App;
