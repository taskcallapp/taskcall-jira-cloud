import React from 'react';
// import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ForgeUI, { Button, Cell, Fragment, Heading, IssueGlance, render, Row, Table, Text } from '@forge/ui';
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
          <Fragment>
            <Text> Title of the incident </Text>
          </Fragment>

          <Fragment>
          </Fragment>
        </Fragment>

        <Fragment>
          <Heading> { _lu.ttl_details } </Heading>

          <Table>
            <Row>
              <Cell> <Text> { _lu.det_service }: </Text> </Cell>
              <Cell> <Text></Text> </Cell>
            </Row>

            <Row>
              <Cell> <Text> { _lu.det_urgency }: </Text> </Cell>
              <Cell> <Text></Text> </Cell>
            </Row>

            <Row>
              <Cell> <Text> { _lu.det_assigned_to }: </Text> </Cell>
              <Cell> <Text></Text> </Cell>
            </Row>

            <Row>
              <Cell> <Text> { _lu.det_next_alert_in }: </Text> </Cell>
              <Cell> <Text></Text> </Cell>
            </Row>
          </Table>
        </Fragment>

        <Fragment>
          <Heading> { _lu.ttl_details } </Heading>


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
