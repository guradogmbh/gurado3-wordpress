import React,{Component} from "react";
import Modal from 'react-modal';
//import './../../../node_modules/bootstrap5/src/css/bootstrap.min.css';
//import '../../App.css'
//const [modalIsOpen, setIsOpen] = React.useState(false);





export default class AgreementModal extends Component{

  render() {
    let modelStyle = {
      display:'block',
      backgroundColor:'rgba(255,255,255,0.25)'
    }


    console.info("hii");

    return (
      <div className="gurado-storefront-modal" style={modelStyle} tabIndex="-1">
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
            <div className="gurado-storefront-modal-header">
              <h5 className="gurado-storefront-modal-title">{this.props.title}</h5>
              <button type="button" className="btn-close modal-close" data-bs-dismiss="modal" onClick={this.props.hide} aria-label="Close"></button>
            </div>
            <div className="gurado-storefront-modal-body">
              <p dangerouslySetInnerHTML={{ __html: this.props.content }}></p> 
            </div>

          </div>
        </div>
      </div>
    );

  }
}