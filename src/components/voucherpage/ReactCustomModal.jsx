import React, { useState,useRef  } from 'react';
import MotiveSelection from './motiveSelection';
import ConfigurationSelection from './configurationSelection';
import VoucherConfigurationStore from '../../store/VoucherConfigurationStore';
import Api from '../../helper/api';
import HTMLFlipBook from 'react-pageflip';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import $ from "jquery";
import { useEffect } from 'react';
import CartItem from '../../helper/cartItem';
import GuradoLoader from '../Loader';
//import { useTranslation } from 'react-i18next';



const settingsStore = JSON.parse(localStorage.getItem('settings'));   


const options = {
  width: 800,
  height: 600,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function(e, page) {
      console.log("Current view: ", $(this).turn("view"));
    }
  }
};

const pages = [
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
  "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg"
];

const { observer } = require('mobx-react-lite');

const FirstModal = observer(
  ({ voucherStore,settingsStore,configStore,showModal }) => { 

    console.info('voucherStore',voucherStore);

  
  
  var { t } = useTranslation();

  console.info("props are as follow1=>",voucherStore);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showMobileViewWebToPrintModal,setShowMobileViewWebToPrintModal] = useState(false);
  const [showMobileViewModal,setShowMobileViewModal] = useState(false);

  const [showMobilePreviewModal,setShowMobilePreviewModal] = useState(false);
  const [showMobilePreviewWebtoprintModal,setShowMobilePreviewWebtoprintModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);  

  //openMobileViewWebToPrintPreviewModal


  const [isModalOpen, setIsModalOpen] = useState(true);

  const modalRef = useRef(null);

  const API = new Api(); 





useEffect(() => {
  console.info("props");

  console.info("voucherStore.previewLoading",voucherStore.previewLoading);
  if(voucherStore && voucherStore.previewLoading) {
    setPreviewLoading(true);
    console.info("in loading true");
  }else {
    console.info("in loading false");
    setPreviewLoading(false);  
  } 
},[voucherStore.previewLoading]);  


 
  useEffect(() => { 

    console.info("in use effect111 virtual design templates length",voucherStore.voucher.virtual_voucher_design_templates.length);
    if (voucherStore.shippingMethod === 'virtual') {
     console.log("hi");
     console.info("close second modal",window.innerWidth); 

     if(showModal && voucherStore.voucher.can_deliver_voucher_physically != 'YES' && voucherStore.voucher.virtual_voucher_design_templates.length > 1)  {
      console.info("close second modal 1",window.innerWidth); 

      if(window.innerWidth > 998) {
        setShowSecondModal(true);
      } else {
        console.info("close second modal 1 else",window.innerWidth);  

        setShowMobileViewModal(true); 
      }
     } 
     else if(showModal && voucherStore.voucher.can_deliver_voucher_physically != 'YES' && voucherStore.voucher.virtual_voucher_design_templates.length == 1) {
      console.info("close second modal 2",window.innerWidth); 

      if(window.innerWidth > 998) {
        setShowSecondModal(true);
      } else {
        console.info("close second modal 2 else",window.innerWidth);  
        setShowMobilePreviewModal(true);   
      }
    } 
    } 

    else if (voucherStore.shippingMethod === 'physical') {
      console.info("in physical block 123",voucherStore.voucher.physical_voucher_design_templates.length); 
      if(voucherStore.voucher && voucherStore.voucher.physical_voucher_design_templates.length == 1) {
        console.info("in physical block 12345");
        if(window.innerWidth > 998) {
          setShowThirdModal(true);
        } else {
          console.info("close second modal 2 web to print else",window.innerWidth);  
          setShowMobilePreviewWebtoprintModal(true);    
        }

      }else {
        if(window.innerWidth > 998) {
          setShowThirdModal(true);
        } else {
          console.info("close second modal 2 web to print else",window.innerWidth);  
          setShowMobileViewWebToPrintModal(true);   
        }
      }
    } 

  }, [voucherStore.shippingMethod]); 

  const openFirstModal = () => { 
   // setShowFirstModal(true);
    setShowSecondModal(false);
    setShowThirdModal(false); 
    setShowMobilePreviewModal(false);
    setShowMobileViewModal(false); 
    setShowMobileViewWebToPrintModal(false);  
    setIsModalOpen(true);

  };

  const addToCart = () => {
    console.info("configStorre=>",configStore);
    console.info("Add to Cart");
    setLoading(true);
    let cartItem = new CartItem();
    cartItem.setAmount(configStore);
    cartItem.setSku(voucherStore.voucher.sku); 
    cartItem.setDeliveryType(voucherStore.shippingMethod);
    cartItem.setDesignTemplate(voucherStore.templateId);
    cartItem.setRecipient('self');
    cartItem.setEmail(configStore.recipientMail);
    cartItem.setRecipientName(configStore.recipientName);
    cartItem.setMessage(configStore.customText);
    cartItem.setSenderName(configStore.senderName); 
    cartItem.setOptions(voucherStore.chosenOptions.options);
    console.log("cartItem is as follow=>",cartItem);

    API.addToCart(cartItem).then((res) => { 
      console.info("ressss is=>",res);
      if(res) {
        window.location = sessionStorage.getItem('cart_url'); 
       // console.info("in true block11 register successful");
       // setIsLoading(false);
         // Navigate to the desired route
     // history.push(`/verify?email=${encodeURIComponent(register_email)}`);  
    //  return <VerifyForm email={register_email} />;  
         // Using Link component 
      }
      if (res.sku === undefined || res === null) {
        //setShowErrorMessage(res.message);
       // setIsLoading(false);

      } else {
       // setShowErrorMessage('');  
       // setIsLoading(false);
      }
     // setLoading(false);
    });


  };

  const openMobileViewPreviewModal = () => { 
    setShowMobilePreviewModal(true);
    setShowMobileViewModal(false); 
    setIsModalOpen(false); 
  };

  const openMobileViewWebToPrintPreviewModal = () => { 
    setShowMobilePreviewWebtoprintModal(true);
    setIsModalOpen(false); 
  }

  const openMobileViewModal = () => {
    if(showModal && voucherStore.voucher.virtual_voucher_design_templates.length == 1) {
      console.info("in open mobile view close 1 if");
      setShowMobilePreviewModal(false); 
      setShowMobileViewModal(false); 
      setIsModalOpen(true); 
    }
    
    else {
      console.info("in open mobile view close 1 else");
      setShowMobilePreviewModal(false); 
      setShowMobileViewModal(true); 
      setIsModalOpen(false);

    }
  }

  const openMobileWebToPrintViewModal = () => {
    setShowMobilePreviewWebtoprintModal(false); 
    setShowMobileViewWebToPrintModal(true); 
    setIsModalOpen(false);
  } 

  const closeModal = () => {
    console.info("modalRef.current",modalRef.current);
    modalRef.current.style.visibility  = 'hidden'; 
    const divElement = document.getElementById('designModal1'); 
    if (divElement) {
      divElement.remove();
    }
    setIsModalOpen(false);


  };

  const handleSecondModalToggle = () => {
    voucherStore.setShippingMethod('virtual');
    console.info("handle second modal");
    if(window && window.innerWidth > 998) {
      console.info("in if inner modal");
      setShowSecondModal(!showSecondModal);
    } 
    
    
    else {
      console.info("in else inner modal");
       if(showModal && voucherStore.voucher.virtual_voucher_design_templates.length == 1) {
        setShowMobilePreviewModal(true);
      }else {
        setShowMobileViewModal(true); 
      }
      // setShowMobilePreviewWebtoprintModal(false);
      // setShowMobileViewWebToPrintModal(false);

    }

    setIsModalOpen(false);

  };

const handleMobileViewModalToggle = () => {
  voucherStore.setShippingMethod('virtual');
  setShowMobileViewModal(!showMobileViewModal);
  setIsModalOpen(false);
};

const handlePreviewMobileViewModalToggle = () => {
  voucherStore.setShippingMethod('virtual');
  setShowMobilePreviewModal(!showMobilePreviewModal);
  setIsModalOpen(false);
};

  const handleThirdModalToggle = () => {
    voucherStore.setShippingMethod('physical'); 

    if(window && window.innerWidth > 998) {
      setShowThirdModal(!showThirdModal); 
    } else {
      setShowMobileViewWebToPrintModal(!showMobileViewWebToPrintModal); 
    }
    setIsModalOpen(false);

  };
  return (
    <div>
      {showModal && isModalOpen && voucherStore.voucher.can_deliver_voucher_physically == 'YES' && ( 
        <div className="first-modal">
       <div className="gurado-storefront-modal" ref={modalRef} id="designModal1" tabIndex="-1" style={{display:'block'}}> 
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
          <span type="button" className="gurado-storefront-close-button" onClick={closeModal}>×</span>  
            <div className="gurado-storefront-modal-body"> 
									<img src="https://cdn-int.gurado.de/fileadmin/images/testimage.jpg"  
										className="card-img-top" />
                    <div className="block-heading" style={{marginTop: '20px'}}>
										</div>
                    <ul className="gurado-storefront-row nav" id="voucherOptions" role="tablist"> 
											<li className="gurado-storefront-col-xl-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12 gurado-storefront-col-md-12 nav-item"
												role="presentation" style={{display: 'grid'}}>

												<button style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '20px' }
                      : {
                        width: '100%',
                        marginTop: '20px',
                        // backgroundColor:
                        // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                      }
                  } onClick={handleSecondModalToggle} 
													id="emailTab" data-bs-toggle="tab"
													data-bs-target="#emailTabContents" type="button" role="tab"
													aria-controls="emailTabContents" aria-selected="true"
													data-toggle="tab" href="#emailTabContents"><span>{t("EMAIL_DELIVERY")}</span><br/><label className="mb-0 mt-1">
                            {t("EMAIL_DELIVERY_INFO")}</label></button> 
											</li>
                      <li className="gurado-storefront-col-xl-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12 gurado-storefront-col-md-12 nav-item"
												role="presentation" style={{display: 'grid'}}>
                      <button style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '20px' }
                      : {
                        width: '100%',
                        marginTop: '20px',
                        // backgroundColor:
                        // settingsStore.btn_primary_color,
                        textTransform:'uppercase', 
                      }
                  } onClick={handleThirdModalToggle} 
													id="emailTab" data-bs-toggle="tab"
													data-bs-target="#emailTabContents" type="button" role="tab"
													aria-controls="emailTabContents" aria-selected="true"
													data-toggle="tab" href="#emailTabContents"><span>{t("POSTAL_DELIVERY")}</span><br/></button></li> 
                      </ul> 
                    
              </div>

          </div>
        </div>
      </div>         
        </div>
      )}
      {showSecondModal && (
        <div className="second-modal">
         <div className="gurado-storefront-modal" id="designModal3" tabIndex="-1" style={{display:'block'}}> 
        <div className={(voucherStore.voucher.virtual_voucher_design_templates.length == 1 && voucherStore.voucher.allow_personalized_message != 'YES')?'gurado-storefront-modal-dialog gurado-storefront-modal-lg gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable':'gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable'} style = {
           (voucherStore.voucher.virtual_voucher_design_templates.length == 1 && voucherStore.voucher.allow_personalized_message != 'YES')
              ? { 
                overflow: 'hidden', 
                width:'660px' } 
              : {
                  
                }
          } > 
          <div className="gurado-storefront-modal-content">
          <span className="gurado-storefront-close-button" type="button" onClick={handleSecondModalToggle}> × </span>       
            <div className="gurado-storefront-modal-body"> 
            {(voucherStore.voucher.virtual_voucher_design_templates.length > 1 || voucherStore.voucher.allow_personalized_message == 'YES' ) &&  (
               <div className = "gurado-storefront-row"> 
               <div style={{position:'absolute',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>  
                {previewLoading && (
                  <GuradoLoader /> 
                )}
                </div>
            
               <div className='gurado-storefront-col-lg-6'>
               <MotiveSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore}
                   configStore={configStore}
                 /> 
                  <ConfigurationSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore}  
                   amount={configStore}
                 />
 
             
                 {voucherStore && voucherStore.voucher.can_deliver_voucher_physically &&  voucherStore.voucher.can_deliver_voucher_physically == 'YES' ? (
          <button
          style={
            settingsStore.settings
              .btn_primary_color === undefined
              ? { width: '100%' }
              : {
                  width: '100%',
                 // backgroundColor:
                  //  settingsStore.settings
                 //     .btn_primary_color,
                }
          }
 
          onClick={openFirstModal}
        
        >
 
         <>{t("CHANGE_SHIPPING_METHOD")}</>  
          
        </button>
         ) : (
 <></>        )}
                 </div> 
                



 
 
                 <div className='gurado-storefront-col-lg-6'>
                   <img id="updateImage" src={voucherStore.previewImage} style={{borderLeft:'3px solid',paddingLeft:'20px',borderColor:'inherit'}} height="90px" /> 
                   <div id="updateImage1" style = {{display:'none'}}></div>
                 </div>
               </div>
            )}

            {(voucherStore.voucher.virtual_voucher_design_templates.length == 1 && voucherStore.voucher.allow_personalized_message != 'YES') && ( 
               <div className = "gurado-storefront-row"> 
               <div className='gurado-storefront-col-lg-12'> 
               <MotiveSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore}
                   configStore={configStore}
                 /> 
                  <ConfigurationSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore} 
                   amount={configStore}
                 />

                  <img id="updateImage" src={voucherStore.previewImage} style={{maxWidth:'100vh',maxHeight:'100vh',width: '600px',height: 'fit-content',marginTop:'-36px'}} height="90px" />  
 
             
                 {voucherStore && voucherStore.voucher.can_deliver_voucher_physically &&  voucherStore.voucher.can_deliver_voucher_physically == 'YES' ? (
          <button
          style={
            settingsStore.settings
              .btn_primary_color === undefined
              ? { width: '100%' }
              : {
                  width: '100%',
                //  backgroundColor:
                 //   settingsStore.settings
                 //     .btn_primary_color,
                }
          }
 
          onClick={openFirstModal}
        
        >
 
         <>{t("CHANGE_SHIPPING_METHOD")}</>  
          
        </button>
         ) : (
 <></>        )}
                 </div>
 
 
                 
               </div>
              )}
              </div>
          </div>
        </div>
      </div>   
          
        </div>
      )}

      {showMobileViewModal && ( 
              <div className="second-modal">
              <div className="gurado-storefront-modal" id="designModal2" tabIndex="-1" style={{display:'block'}}>
              <div className="gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
                <div className="gurado-storefront-modal-content">
                <span type="button" className="gurado-storefront-close-button" onClick={handleMobileViewModalToggle}>×</span>  
                  <div className="gurado-storefront-modal-body"> 
                  <div className = "gurado-storefront-row">
                    <div className='gurado-storefront-col-lg-12'>
                    <MotiveSelection
                        voucherStore={voucherStore}
                        settingsStore={settingsStore}
                        configStore={configStore}
                      /> 
                      <ConfigurationSelection
                        voucherStore={voucherStore}
                        settingsStore={settingsStore}
                        amount={configStore}
                      />

                          <button
                            style={
                              settingsStore.settings
                                .btn_primary_color === undefined
                                ? { width: '100%',height:'50px',marginBottom:'20px'}
                                : {
                                    width: '100%',height:'50px',marginBottom:'20px' 
                                   // backgroundColor:
                                    //  settingsStore.settings
                                    //    .btn_primary_color,
                                  }
                            }

                            onClick={openMobileViewPreviewModal}  
                          
                          >

                            <>{t("PREVIEW")}</>  
                            
                          </button>                
                      
                      {voucherStore && voucherStore.voucher.can_deliver_voucher_physically &&  voucherStore.voucher.can_deliver_voucher_physically == 'YES' ? (
              <button
              style={
                settingsStore.settings
                  .btn_primary_color === undefined
                  ? { width: '100%' }
                  : {
                      width: '100%',
                      // backgroundColor:
                      //   settingsStore.settings
                      //     .btn_primary_color,
                    }
              }

              onClick={openFirstModal}
            
            >

              <>{t("CHANGE_SHIPPING_METHOD")}</>  
              
            </button>
              ) : (
      <></>        )}
                      </div>
                    </div> 
                    
                    
          
                          <div className="block-heading" style={{marginTop: '20px'}}>
                          </div>
                    </div>
                </div>
              </div>
            </div>   
                
              </div>
            )}


      {showMobilePreviewModal && (
         <div className="second-modal">
         <div className="gurado-storefront-modal" id="designModal6" tabIndex="-1" style={{display:'block'}}>
        <div className="gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
          <div className="gurado-storefront-modal-content">
          <span type="button" className="gurado-storefront-close-button" onClick={handlePreviewMobileViewModalToggle}>×</span>
            <div className="gurado-storefront-modal-body"> 
            <div className = "gurado-storefront-row">
            <div className="gurado-storefront-col-lg-12"> 
            {(voucherStore.voucher.virtual_voucher_design_templates.length == 1 && voucherStore.voucher.allow_personalized_message != 'YES') && 
            <>
                  <MotiveSelection
                    voucherStore={voucherStore}
                    settingsStore={settingsStore}
                    configStore={configStore}
                  />  
                  <ConfigurationSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore} 
                   amount={configStore}
                 />
                 </>
}
            <img id="updateImage" style={{padding:'10px',border:'1px solid black'}}src={voucherStore.previewImage} height="90px" />    
            <button
              style={
                settingsStore.settings
                  .btn_primary_color === undefined
                  ? { width: '100%',marginBottom:'20px',}
                  : {
                      width: '100%',
                      // backgroundColor:
                      //   settingsStore.settings
                      //     .btn_primary_color,
                          marginBottom:'20px',marginTop:'20px'  
                    }
              }
              onClick={addToCart}  
              disabled={
                loading ||
                voucherStore.requiredOptions >
                  voucherStore.chosenOptions.options.length ||
                voucherStore.estimationLoading
              }
            >
              {!loading && !voucherStore.estimationLoading ? (
        <>
          {voucherStore.requiredOptions >
          voucherStore.chosenOptions.options.length ? ( 
            <>{t("TO_CHECKOUT")}</>
          ) : (
            <>{t("ADD_TO_CART")} 
            </>
          )}
        </>
      ) : (
        <>
          <Loader
            type="ThreeDots"
            color="blue"
            width="30"
            height="20"
          />
        </>
      )}
              
            </button>  
        

       <button
         style={
           settingsStore.settings
             .btn_primary_color === undefined
             ? { width: '100%',marginBottom:"20px" }
             : {
                 width: '100%',
                 marginBottom:"20px"
                // backgroundColor:
                //   settingsStore.settings
                 //    .btn_primary_color,marginBottom:"20px"
               }
         }

         onClick={openMobileViewModal} 
       
       >

        <>{t("BACK")}</>  
         
       </button>

              </div> 
                    <div className="block-heading" style={{marginTop: '20px'}}>
										</div>
              </div>
          </div>
        </div>
      </div>   
          
        </div>
        </div> 

      )}

      {showThirdModal && (
              <div className="second-modal">
              <div className="gurado-storefront-modal" id="designModal5" tabIndex="-1" style={{display:'block'}}>
              <div className="gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable" style={{maxWidth:'calc(100% - 20px)',width: '100%',display: 'flex',padding: '0px 10px',marginTop: '10px',left: '50%',top:'50%', transform: 'translate(-50%, -50%)',position:'absolute'
 }}>
                <div className="gurado-storefront-modal-content">
                <span type="button" className="gurado-storefront-close-button" onClick={handleThirdModalToggle}>×</span> 
                  <div className="gurado-storefront-modal-body"> 
                  <div className = "gurado-storefront-row">
                  <div style={{position:'absolute',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>  
                      {previewLoading && (
                        <GuradoLoader /> 
                      )}
                      </div>
                    <div className = "gurado-storefront-col-lg-4 gurado-storefront-col-xl-5" style ={{borderRight:'3px solid #23bade'}}> 
                    <MotiveSelection
                  voucherStore={voucherStore}
                  settingsStore={settingsStore}
                  configStore={configStore}
                    /> 

                  <ConfigurationSelection
                  voucherStore={voucherStore}
                  settingsStore={settingsStore}
                  amount={configStore}
                />
    {voucherStore && voucherStore.voucher.can_deliver_voucher_physically &&  voucherStore.voucher.can_deliver_voucher_physically == 'YES' ? (
         <button
         style={
           settingsStore.settings
             .btn_primary_color === undefined
             ? { width: '100%',maxWidth: 'calc(33.3333% + 400px)',
            }
             : {
                 width: '100%',
                 maxWidth: 'calc(33.3333% + 400px)',
               //  backgroundColor:
                //   settingsStore.settings
                //     .btn_primary_color,
               }
         }

         onClick={openFirstModal}
       
       >

        <>{t("CHANGE_SHIPPING_METHOD")}</>  
         
       </button>
        ) : (
<></>        )}

                </div>
                <div className = "gurado-storefront-col-lg-7 gurado-storefront-col-xl-7"> 

                <div id="updateImages" style={{width: '562px',height:'270px',left: '28%',top:'12%',position:'relative'}}></div>   
      {/* <HTMLFlipBook showCover={true} width={561.5} height={270}> 

            <div className="demoPage"><img id="updateImage1" src={pages[3]} /> </div>
            <div className="demoPage"><img id="updateImage2" src={pages[2]} /> </div>
            <div className="demoPage"><img id="updateImage3" src={pages[1]} /> </div> 
            <div className="demoPage"><img id="updateImage4" src={pages[0]} /> </div>  
    </HTMLFlipBook> */}
    </div> 
                    </div>
                    
                    
          
                        
                    </div>
                </div>
              </div>
            </div>   
                
              </div>
            )
            } 


      {showMobileViewWebToPrintModal && ( 
                    <div className="second-modal">
                    <div className="gurado-storefront-modal" id="designModal4" tabIndex="-1" style={{display:'block'}}>
                    <div className="gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable" style={{maxWidth:'calc(100% - 20px)',width: '100%',display: 'flex',padding: '0px 10px',marginTop: '10px',left: '50%',top:'50%', transform: 'translate(-50%, -50%)',position:'absolute'
      }}>
                      <div className="gurado-storefront-modal-content">
                      <span type="button" className="gurado-storefront-close-button" onClick={handleThirdModalToggle}>×</span>
                        <div className="gurado-storefront-modal-body"> 
                        <div className = "gurado-storefront-row">
                          <div className = "gurado-storefront-col-lg-12 gurado-storefront-col-xl-12">  
                          <MotiveSelection
                        voucherStore={voucherStore}
                        settingsStore={settingsStore}
                        configStore={configStore}
                          /> 

                        <ConfigurationSelection
                        voucherStore={voucherStore}
                        settingsStore={settingsStore}
                        amount={configStore}
                      />

<button
                            style={
                              settingsStore.settings
                                .btn_primary_color === undefined
                                ? { width: '100%',marginBottom:'20px' }
                                : {
                                    width: '100%',marginBottom:'20px'
                                    //backgroundColor:
                                    //  settingsStore.settings
                                     //   .btn_primary_color,
                                  }
                            }

                            onClick={openMobileViewWebToPrintPreviewModal} 
                          
                          >

                            <>{t("PREVIEW")}</>  
                            
                          </button>       
          {voucherStore && voucherStore.voucher.can_deliver_voucher_physically &&  voucherStore.voucher.can_deliver_voucher_physically == 'YES' ? (
              
              <button
              style={
                settingsStore.settings
                  .btn_primary_color === undefined
                  ? { width: '100%',maxWidth: 'calc(33.3333% + 400px)',
                  }
                  : {
                      width: '100%',
                      maxWidth: 'calc(33.3333% + 400px)',
                    //  backgroundColor:
                    //    settingsStore.settings
                    //      .btn_primary_color,
                    }
              }

              onClick={openFirstModal}
            
            >

              <>{t("CHANGE_SHIPPING_METHOD")}</>   
              
            </button>
              ) : (
      <></>        )}

                      </div>
                          </div>
                          </div>
                      </div>
                    </div>
                  </div>   
                      
                    </div>
                  )
                  } 

        {showMobilePreviewWebtoprintModal && (
            <div className="second-modal">
            <div className="gurado-storefront-modal" id="designModal8" tabIndex="-1" style={{display:'block'}}>
           <div className="gurado-storefront-modal-dialog gurado-storefront-modal-xl gurado-storefront-modal-dialog-centered gurado-storefront-modal-dialog-scrollable">
             <div className="gurado-storefront-modal-content">
             <span type="button" className="gurado-storefront-close-button" onClick={handleSecondModalToggle}>×</span>
               <div className="gurado-storefront-modal-body"> 
               <div className = "gurado-storefront-row">
               <div className="gurado-storefront-col-lg-12"> 

               {(voucherStore.voucher.physical_voucher_design_templates.length == 1) && 
            <>
                  <MotiveSelection
                    voucherStore={voucherStore}
                    settingsStore={settingsStore}
                    configStore={configStore}
                  />  
                  <ConfigurationSelection
                   voucherStore={voucherStore}
                   settingsStore={settingsStore} 
                   amount={configStore}
                 />
                 </>
                }
   
               <div id="updateImages"></div> 
   
               <Link
               to={'/checkout'}
               style={{ textDecoration: 'none' }}   
             >
               <button
                 style={
                   settingsStore.settings
                     .btn_primary_color === undefined 
                     ? { width: '100%',marginBottom:'20px',marginTop:'20px' }
                     : {
                         width: '100%',
                        //  backgroundColor:
                        //    settingsStore.settings 
                        //      .btn_primary_color,
                             marginBottom:'20px'
                       }
                 }
                 disabled={
                   loading ||
                   voucherStore.requiredOptions >
                     voucherStore.chosenOptions.options.length ||
                   voucherStore.estimationLoading
                 }
               >
                 {!loading && !voucherStore.estimationLoading ? (
           <>
             {voucherStore.requiredOptions >
             voucherStore.chosenOptions.options.length ? ( 
               <>{t("TO_CHECKOUT")}</>
             ) : (
               <>{t("ADD_TO_CART")} 
               </>
             )}
           </>
         ) : (
           <>
             <Loader
               type="ThreeDots"
               color="blue"
               width="30"
               height="20"
             />
           </>
         )}
                 
               </button> 
             </Link>
   
          <button
            style={
              settingsStore.settings
                .btn_primary_color === undefined
                ? { width: '100%',marginBottom:'20px' }
                : {
                    width: '100%',
                   // backgroundColor:
                    //  settingsStore.settings
                    //    .btn_primary_color,
                        marginBottom:'20px'
                  }
            }
   
            onClick={openMobileWebToPrintViewModal}
          
          >
   
           <>{t("BACK")}</>  
            
          </button>
   
                 </div> 
                       <div className="block-heading" style={{marginTop: '20px'}}>
                       </div>
                 </div>
             </div>
           </div>
         </div>   
             
           </div>
           </div> 

        )}

              
    </div>
  );
});

export default FirstModal;  