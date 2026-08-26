import { Component } from "react";

class Modal extends Component {
  handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  }
  handleKeyDown = (e) => {
    if(e.key === "Escape"){
      this.props.closeModal()
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown)
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown)
  }
  render() {
    const { selectedImg } = this.props
    return (
      <>
        {selectedImg && (
          <div className="Overlay" onClick={this.handleOverlayClose}>
            <div className="Modal">
              <img src={selectedImg.largeImageURL} alt={selectedImg.name} />
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Modal;
