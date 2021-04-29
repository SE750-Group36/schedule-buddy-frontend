import { ICSImport } from './ICSImport'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store';
import { persistActiveIcs } from './redux/reducer'

const { Component } = require('ical.js')

const selectActiveICS = (state : RootState) => {

  if (state.icsSlice.activeIcs != null) {
    var cal = new Component(state.icsSlice.activeIcs);

    return cal;
  }
  
  return null;
}

function App() {
  const dispatch = useDispatch()
  const ics = useSelector(selectActiveICS)

  const persistIcsThunk = persistActiveIcs(ics);
  dispatch(persistIcsThunk);

  console.log("rerender");
  return (
    <div>
      {ics == null ? "Nothing" : ics.toString()}
      <ICSImport/>
    </div>
  );
}

export default App;
