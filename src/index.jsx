import React from 'react';
// import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ForgeUI, { Button, Fragment, IssueGlance, render, Text } from '@forge/ui';
import MoreIcon from '@atlaskit/icon/glyph/more';
import * as helpers from '../src/helpers';
import * as _lu from '../assets/files/label_universe.json';


const App = () => {

  helpers.reloadLabels('en');
  const urgencyMap = helpers.createUrgencyMap();
  const eventTypeMap = helpers.createEventTypeMap();

  return (
    <Fragment>
      <Fragment>
        <Button text={ _lu.ttl_create_incident } onclick={()=> showCreateIncidentModal()} />
      </Fragment>

      <Fragment>
        <Fragment>
          <Fragment> Title of the incident </Fragment>

          <Fragment>
          </Fragment>
        </Fragment>

      </Fragment>
    </Fragment>
  );
}


export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);
