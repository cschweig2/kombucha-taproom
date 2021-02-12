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

  // create methods for adding keg, editing keg, removing keg, showing keg detail

  handleAddingKeg = (kegToAdd) => {
    const newMasterKegList = this.state.masterKegList.concat(kegToAdd);
    this.setState({ masterKegList: newMasterKegList,
                    formVisibleOnPage: false });
  }

  handleEditingKeg = (kegToEdit) => {
    const editedMasterKegList = this.state.masterKegList
      .filter(keg => keg.id !== this.state.selectedKeg.id)
      .concat(kegToEdit);
    this.setState({
      masterKegList: editedMasterKegList,
      editing: false,
      selectedKeg: null
    });
  }

  handleKegSelection = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    this.setState({ selectedKeg: selectedKeg });
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleAddKegClick() {

  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage)  {
      currentVisibleState = <AddKegForm onNewKegCreation={this.handleAddingKeg} />
      buttonText='Return to Keg List';
    } else if (this.state.selectedKeg != null) {
      currentVisibleState = <KegDetail />
      buttonText='Return to Keg List';
    } else if (this.state.editing) {
      currentVisibleState = <EditKegForm onEditKeg={this.handleEditingKeg} />
      buttonText='Return to Keg List';
    } else {
      currentVisibleState = <KegList kegList={this.state.masterKegList} onKegSelection={this.handleKegSelection} />
      buttonText='Add Keg';
    }

    return (
      <>
        {currentVisibleState}
        <button onClick={this.handleAddingKeg}>{buttonText}</button>
      </>
    );
  }

}

export default KombuchaControl;