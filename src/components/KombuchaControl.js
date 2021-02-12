import React from 'react';
import KegDetail from './KegDetail';
import KegList from './KegList';
import AddKegForm from './AddKegForm';
import EditKegForm from './EditKegForm';

class KombuchaControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterKegList: [],
      selectedKeg: null,
      editing: false
    };
  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage)  {
      currentVisibleState = <AddKegForm />
    } else if (this.state.selectedKeg != null) {
      currentVisibleState = <KegDetail />
    } else if (this.state.editing) {
      currentVisibleState = <EditKegForm />
    }

    return (
      <>
        {currentVisibleState}
        <button onClick={this.methodTBD}>{buttonText}</button>
      </>
    );
  }

}

export default KombuchaControl;