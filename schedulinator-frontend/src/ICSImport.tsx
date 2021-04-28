import { FunctionComponent, useState } from 'react'; 
import { InputBase } from '@material-ui/core';
import './App.css';

export const ICSImport: FunctionComponent = () => {
  const [icsString, setIcsString] = useState<string>();

  var readICS = (event: any) => {
    var icsFile = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      console.log(event.target?.result);
      var fileData = event.target?.result?.toString();
      setIcsString(fileData);
    });
    reader.readAsText(icsFile);
  }

  return (
    <div>
      <InputBase inputProps={{'accept' : '.ics'}} className='ICSImportButton' type='file' onChange={(event) => readICS(event)}></InputBase>
      {icsString}
    </div>
  );
}