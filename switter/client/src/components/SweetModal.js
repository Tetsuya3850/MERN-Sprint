import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { addSweetThunk } from "../redux/sweet";

class SweetModal extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const sweet = {
      text: this.text.value,
      created: Date.now(),
      like: 0,
      author: this.props.userInfo._id,
      replies: []
    };
    this.props.dispatch(addSweetThunk(sweet, this.props.userInfo._id));
  };

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Sweet</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={styles}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <h4
              style={{
                marginTop: "5px"
              }}
            >
              New Sweet
            </h4>
            <h4
              onClick={this.closeModal}
              style={{
                marginTop: "5px",
                cursor: "pointer"
              }}
            >
              X
            </h4>
          </div>

          <form onSubmit={this.handleFormSubmit}>
            <textarea
              rows="8"
              ref={node => {
                this.text = node;
              }}
              required
              placeholder="What's Up Dood?"
              maxLength="1000"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="submit"
              value="Sweet!"
              style={{ display: "block", margin: "auto" }}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

Modal.setAppElement("#root");

const styles = {
  content: {
    top: "10%",
    left: "50%",
    right: "80%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%)"
  }
};

const mapStateToProps = ({ user }) => {
  return user;
};

SweetModal = connect(mapStateToProps, null)(SweetModal);

export default SweetModal;