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

  function showAddNoteModal() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p id="pErrorAddNoteModal" style="padding: 10px; color: red; font-size: 12px; text-align: center;" hidden></p>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <Field label={ _lu.ttl_add_note }>
                {({ fieldProps }) => ( <Textfield name="txtNote" value={ note } onChange={(e) => {setNote(e.target.value);}} /> )}
              </Field>
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>

            <Button appearance="primary" autoFocus>
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
            <p id="pErrorReassignModal" style="padding: 10px; color: red; font-size: 12px; text-align: center;" hidden></p>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <label htmlFor="sltAssignees"> { _lu.ttl_add_responders } </label>
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
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>

            <Button appearance="primary" autoFocus>
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
            <p id="pErrorAddRespondersModal" style="padding: 10px; color: red; font-size: 12px; text-align: center;" hidden></p>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <label htmlFor="sltResponders"> { _lu.ttl_add_responders } </label>
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
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>

            <Button appearance="primary" autoFocus>
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
            <p id="pErrorRunResponseSetModal" style="padding: 10px; color: red; font-size: 12px; text-align: center;" hidden></p>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <label htmlFor="sltAssignees"> { _lu.ttl_run_response_set } </label>
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
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>

            <Button appearance="primary" autoFocus>
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
            <p id="pErrorStatusUpdateModal" style="padding: 10px; color: red; font-size: 12px; text-align: center;" hidden></p>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <Field label={ _lu.ttl_new_update }>
                {({ fieldProps }) => ( <Textfield name="txtNote" value={ statusUpdate } onChange={(e) => {setStatusUpdate(e.target.value);}} /> )}
              </Field>
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'absolute', bottom: 0, right: 0, margin: '1rem 1rem' }}>
          <div>
            <Button onClick={() => view.close()} appearance="subtle"> { _lu.ins_cancel } </Button>

            <Button appearance="primary" autoFocus>
              { _lu.ins_update }
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function getModalDisplay(){
    console.log('got here');
    console.log(modalType);
    if (modalType == 1){
      return showAddNoteModal();
    } else if (modalType == 2) {
      return showReassignModal();
    } else if (modalType == 3) {
      return showAddRespondersModal();
    } else if (modalType == 4) {
      return showRunResponseSetModal();
    } else if (modalType == 5){
      return showStatusUpdateModal();
    }
  }

  return (
    <div style={{ padding: '2rem', flex: 1, position: 'relative' }}>
      <span className="modal-header">{'Sample App'}</span>
      {
        modalType === null ?
	      (<Spinner size="large" />) :
        (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ marginTop: '2rem', width: '100%' }}>
                  <Field label="Summary" name="summary">
                    {({ fieldProps }) => (
                    <Textfield placeholder="Summary" name="summary" value={summary} onChange={(e) => {setSummary(e.target.value);}} />
                    )}
                  </Field>
                </div>
                <div style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}>
                  <Field label="Description" name="description">
                    {({ fieldProps }) => (
                      <TextArea placeholder="Description" name="description" value={description} onChange={(e) => {setDescription(e.target.value);}} minimumRows={10} />
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
                  // isDisabled={isAnnotating && isDisabled}
                  >
                  { _lu.ttl_add_note }
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
