// By: Riasat Ullah
// This file contains helper functions.

import * as _en_lu from '../assets/files/label_universe_en.json';
import * as _es_lu from '../assets/files/label_universe_es.json';
import lnm from '../src/label_names';
import * as _lu from '../assets/files/label_universe.json';


export async function reloadLabels(lang){
  var lblKeys = Object.keys(lnm);
  for (i=0; i < lblKeys.length; i++){
    var lbl = lblKeys[i];
    if (lang == 'es'){
      _lu[lbl] = _es_lu[lbl];
    } else {
      _lu[lbl] = _en_lu[lbl];
    }
  }
}


export function createUrgencyMap(){
  // This function should be called after the varMap has been updated.
  return {
    1: _lu.opt_minor, 2: _lu.opt_low, 3: _lu.opt_medium,
    4: _lu.opt_high, 5: _lu.opt_critical
  };
}


export function createEventTypeMap(){
  // This function should be called after the varMap has been updated.
  return {
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
    'STATUS UPDATE': _lu.evn_status_update,
    'TRIGGER': _lu.evn_trigger,
    'UN-ACKNOWLEDGE': _lu.evn_un_acknowledge,
    'UN-MERGE': _lu.evn_un_merge,
    'URGENCY AMENDMENT': _lu.evn_urgency_amendment
  };
}
