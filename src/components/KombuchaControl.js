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
      editing: false,
      buying: false
    };
  }

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

  handleKegDelete = (id) => {
    const newMasterKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: newMasterKegList,
      selectedKeg: null
    });
  }

  handleBuyPint = () => {
    const selectedKeg = this.state.selectedKeg;
    if (selectedKeg.pintsLeft > 1) {
      const newPintCount = Object.assign({}, selectedKeg, { pintsLeft: selectedKeg.pintsLeft - 1});
      const newMasterKegList = this.state.masterKegList
        .filter(keg => keg.id !== this.state.selectedKeg.id)
        .concat(newPintCount);
      this.setState({
        masterKegList: newMasterKegList,
        selectedKeg: null
      });
    } else if (selectedKeg.pintsLeft === 1) {
      const newPintCount = Object.assign({}, selectedKeg, { pintsLeft: selectedKeg.pintsLeft = 'Out of Stock'});
      const newMasterKegList = this.state.masterKegList
        .filter(keg => keg.id !== this.state.selectedKeg.id)
        .concat(newPintCount);
      this.setState({
        masterKegList: newMasterKegList,
        selectedKeg: null
      });
    }
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

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentVisibleState = <EditKegForm keg={this.state.selectedKeg} onEditKeg={this.handleEditingKeg} />
      buttonText='Return to Keg List';
    } else if (this.state.formVisibleOnPage)  {
      currentVisibleState = <AddKegForm onNewKegCreation={this.handleAddingKeg} />
      buttonText='Return to Keg List';
    } else if (this.state.selectedKeg != null) {
      currentVisibleState = <KegDetail keg={this.state.selectedKeg} onClickingDelete={this.handleKegDelete} onClickingEdit={this.handleEditClick} onClickingBuy={this.handleBuyPint} />
      buttonText='Return to Keg List';
    } else {
      currentVisibleState = <KegList kegList={this.state.masterKegList} onKegSelection={this.handleKegSelection} />
      buttonText='Add Keg';
    }

    return (
      <>
        {currentVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    );
  }

}

export default KombuchaControl;