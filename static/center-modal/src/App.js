import React, { useEffect, useState } from 'react';
import { view, invoke, requestJira } from '@forge/bridge';
import Textfield from '@atlaskit/textfield';
import Spinner from '@atlaskit/spinner';
import { checkResponse } from './utils/checkResponse';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import TextArea from '@atlaskit/textarea';
import * as _lu from '../src/assets/files/label_universe.json';


function App() {
  const [context, setContext] = useState({});
  const [modalType, setModalType] = useState(null);
  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);
  const [note, setNote] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState(null);

  const [title, setTitle] = useState(null);

  useEffect(() => {
    (async () => {
      const context = await view.getContext();
      setContext(context);
      const modalType = context.extension.modal.modalType;
      const description = context.extension.modal.description;
      const summary = context.extension.modal.summary;
//      const { modalType, description, summary } = context.extension.modal;
      setModalType(modalType);
      setDescription(description);
      setSummary(summary);

      setTimeout(() => {
        getRandomData();
      }, 3000);
    })();
  }, []);

  // getRandomData from api
  const getRandomData = async () => {
    const { title, body } = await invoke('getPostData', {
      postId: Math.floor(Math.random() * 4 + 1),
    });
    // replace the title
    setSummary(title);
    // replace the description
    setDescription(body.replace(/(\r\n|\n|\r)/gm, '. '));
  };

  // const getIssueDetails = async (currentIssueKey) => {
  //   const issueResponse = await requestJira(
  //     `/rest/api/3/issue/${currentIssueKey}?fields=summary,description`
  //   );

  //   await checkResponse('Jira API', issueResponse);
  //   const data = issueResponse.body;

  //   const { summary, description } = data.fields;

  //   setSummary(summary ? summary : null);

  //   setDescription(
  //     description.content[0].content[0].text
  //       ? description.content[0].content[0].text
  //       : null
  //   );
  // };

  function showCreateIncidentModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorCreateIncidentModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={ _lu.det_title } name="lblTitle">
                {({ fieldProps }) => (
                  <Textfield name="txtTitle" value={ title } onChange={(e) => { setTitle(e.target.value); }}/>
                )}
              </Field>

              <Field label={ _lu.det_service } name="lblServices">
                {({ fieldProps }) => (
                  <Select
                    inputId="sltServices"
                    className="single-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: 'Adelaide', value: 'adelaide' },
                      { label: 'Brisbane', value: 'brisbane' },
                      { label: 'Canberra', value: 'canberra' },
                      { label: 'Darwin', value: 'darwin' },
                      { label: 'Hobart', value: 'hobart' },
                      { label: 'Melbourne', value: 'melbourne' },
                      { label: 'Perth', value: 'perth' },
                      { label: 'Sydney', value: 'sydney' },
                    ]}
                    isMulti
                    isSearchable={ false }
                  />
                )}
              </Field>

              <Field label={ _lu.det_service } name="lblUrgency">
                {({ fieldProps }) => (
                  <Select
                    inputId="sltUrgency"
                    className="single-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: { _lu.opt_minor }, value: 1 },
                      { label: { _lu.opt_low }, value: 2 },
                      { label: { _lu.opt_medium }, value: 3 },
                      { label: { _lu.opt_high }, value: 4 },
                      { label: { _lu.opt_critical }, value: 5 },
                    ]}
                    isMulti
                    isSearchable={ false }
                  />
                )}
              </Field>

              <Field label={  _lu.det_description } name="lblDescription">
                {({ fieldProps }) => (
                  <TextArea name="txtDescription" value={ description } onChange={(e) => {setDescription(e.target.value);}} minimumRows={5} />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ins_create }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function showAddNoteModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorAddNoteModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={ _lu.ttl_add_note } name="note">
                {({ fieldProps }) => (
                  <TextArea name="note" value={ note } onChange={(e) => {setNote(e.target.value);}} minimumRows={10} />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ttl_add_note }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function showReassignModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorReassignModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={ _lu.ttl_reassign } name="sltAssignees">
                {({ fieldProps }) => (
                  <Select
                    inputId="sltAssignees"
                    className="multi-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: 'Adelaide', value: 'adelaide' },
                      { label: 'Brisbane', value: 'brisbane' },
                      { label: 'Canberra', value: 'canberra' },
                      { label: 'Darwin', value: 'darwin' },
                      { label: 'Hobart', value: 'hobart' },
                      { label: 'Melbourne', value: 'melbourne' },
                      { label: 'Perth', value: 'perth' },
                      { label: 'Sydney', value: 'sydney' },
                    ]}
                    isMulti
                    isSearchable={ false }
                  />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ttl_reassign }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function showAddRespondersModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorAddRespondersModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={ _lu.ttl_add_responders } name="sltResponders">
                {({ fieldProps }) => (
                  <Select
                    inputId="sltResponders"
                    className="multi-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: 'Adelaide', value: 'adelaide' },
                      { label: 'Brisbane', value: 'brisbane' },
                      { label: 'Canberra', value: 'canberra' },
                      { label: 'Darwin', value: 'darwin' },
                      { label: 'Hobart', value: 'hobart' },
                      { label: 'Melbourne', value: 'melbourne' },
                      { label: 'Perth', value: 'perth' },
                      { label: 'Sydney', value: 'sydney' },
                    ]}
                    isMulti
                    isSearchable={ false }
                  />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ttl_add_responders }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function showRunResponseSetModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorRunResponseSetModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={ _lu.ttl_run_response_set } name="sltResponseSets">
                {({ fieldProps }) => (
                  <Select
                    inputId="sltResponseSets"
                    className="multi-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: 'Adelaide', value: 'adelaide' },
                      { label: 'Brisbane', value: 'brisbane' },
                      { label: 'Canberra', value: 'canberra' },
                      { label: 'Darwin', value: 'darwin' },
                      { label: 'Hobart', value: 'hobart' },
                      { label: 'Melbourne', value: 'melbourne' },
                      { label: 'Perth', value: 'perth' },
                      { label: 'Sydney', value: 'sydney' },
                    ]}
                    isMulti
                    isSearchable={ false }
                  />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ins_run }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function showStatusUpdateModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
              <p id="pErrorStatusUpdateModal" style={{ padding: "10px", color: "red", fontSize: "12px", textAlign: "center" }} hidden></p>
              <Field label={  _lu.ttl_new_update } name="statusUpdate">
                {({ fieldProps }) => (
                  <TextArea name="statusUpdate" value={ statusUpdate } onChange={(e) => {setStatusUpdate(e.target.value);}} minimumRows={10} />
                )}
              </Field>
            </div>
          </div>

        </div>

        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>
            <Button
              onClick={async () => {
                  await invoke('updateIssue', { description, summary });
                  view.close();
                }}
              appearance="primary"
              autoFocus
              >
              { _lu.ins_update }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function getModalDisplay(){
    if (modalType == 1){
      return showCreateIncidentModal();
    } else if (modalType == 2){
      return showAddNoteModal();
    } else if (modalType == 3) {
      return showReassignModal();
    } else if (modalType == 4) {
      return showAddRespondersModal();
    } else if (modalType == 5) {
      return showRunResponseSetModal();
    } else if (modalType == 6){
      return showStatusUpdateModal();
    }
  }

  return (
    <div style={{ padding: '2rem', flex: 1, position: 'relative' }}>
      <span className="modal-header"> { 'TaskCall' } </span>
      {
        modalType === null ?
	      ( <Spinner size="large" /> ) :
        ( getModalDisplay() )
      }
    </div>
  );
}

export default App;
