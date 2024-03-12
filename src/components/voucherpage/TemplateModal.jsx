import React,{Component} from "react";
import Modal from 'react-modal';
import $ from 'jquery';
import ReactCustomModal from './ReactCustomModal';  
export default class TemplateModal extends Component{

	constructor() {
		super();
		this.state = {
		  showModal: false
		};
	  } 

	  onDeliveryTypeSave(){
		$('#designModal1').modal('hide'); 
		$('#designModal2').modal('show'); 	   
	}

  render() {
    let modelStyle = {
      display:'block',
      backgroundColor:'rgba(255,255,255,0.25)' 
    } 

    return (
		<div>
      <div className="gurado-storefront-modal" id="designModal1" style={modelStyle} tabIndex="-1">
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
            <div className="gurado-storefront-modal-body"> 
									<img src="https://cdn-int.gurado.de/fileadmin/images/testimage.jpg"  
										className="card-img-top" />
                    <div className="block-heading" style={{marginTop: '20px'}}>
										</div>
                    <ul className="row nav" id="voucherOptions" role="tablist"> 
											<li className="col-xl-6 col-lg-6 col-sm-6 col-md-6 nav-item"
												role="presentation" style={{display: 'grid'}}>
												<button className="btn btn-primary gr-button-active active" onClick={this.showModal} 
													id="emailTab" data-bs-toggle="tab"
													data-bs-target="#emailTabContents" type="button" role="tab"
													aria-controls="emailTabContents" aria-selected="true"
													data-toggle="tab" href="#emailTabContents"><span>E-Mailversand</span><br/><label className="mb-0 mt-1">zum Selbstausdruck</label></button> 
											</li>
                      <li className="col-xl-6 col-lg-6 col-sm-6 col-md-6 nav-item gr-only-mobile-post-btn" onClick={() => this.onDeliveryTypeSave('attribute3')} 
												role="presentation" style={{display: 'grid'}}> 
												<button className="btn btn-primary gr-button-active" id="perpostTab"
													data-bs-toggle="tab" data-bs-target="#perpostTabContents"
													type="button" role="tab" aria-controls="perpostTabContents"
													aria-selected="false" data-toggle="tab"
													href="#perpostTabContents">Postversand<span><label className="mb-0 mt-1">  
															
														 inkl.
															MwSt.</label></span>

															<span data-toggle="tooltip" data-placement="left" title="Nach erfolgreichem Zahlungseingang werden die bestellten Gutscheine am nächsten Werktag versendet.">
																<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
																	<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
																	<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
																  </svg>
															  </span> 
															
															
															</button>
											</li>
                      
                      
                      </ul>
                    
              </div>

          </div>
        </div>
      </div>

	  <div className="gurado-storefront-modal" id="designModal2" style={modelStyle} tabIndex="-1" role="dialog"
							aria-labelledby="designModalView2" aria-hidden="true" data-backdrop="static">
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
            <div className="gurado-storefront-modal-body"> 
									<img src="https://cdn-int.gurado.de/fileadmin/images/testimage.jpg"  
										className="card-img-top" />
                    <div className="block-heading" style={{marginTop: '20px'}}>
										</div>
                  
                    
              </div>

          </div>
        </div>
      </div>

	  <div className="gurado-storefront-modal" id="designModal3" style={modelStyle} tabIndex="-1" role="dialog"
							aria-labelledby="designModalView3" aria-hidden="true" data-backdrop="static">
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
            <div className="gurado-storefront-modal-body"> 
									<img src="https://cdn-int.gurado.de/fileadmin/images/testimage.jpg"   
										className="card-img-top" />
                    <div className="block-heading" style={{marginTop: '20px'}}> 
										</div>
                  
                    
              </div>

          </div>
        </div>
      </div>



</div> 



    );

   

  }


}


