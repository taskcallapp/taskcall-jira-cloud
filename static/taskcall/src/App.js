import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import * as _lu from '..src/assets/files/label_universe.json';


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
        <button style="background-color: #4CBB17; color: white; border-radius: 3px;"> { _lu.ttl_create_incident } </button>
      </div>
		  :
		  <div>
        <button> { _lu.det_service } </button>
		  </div>
	  }
    </div>
  );
}

export default App;
