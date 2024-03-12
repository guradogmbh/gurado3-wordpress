import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './assets/i18n/locales/en.json';
import deTranslations from './assets/i18n/locales/de.json';
import itTranslations from './assets/i18n/locales/it.json';


  import Register from './helper/register'; 
    var API = new Register();
    var defaultLanguage = window.gurado_js_ajax.urls.language;
  //  console.log("Api is=>?",API.getSettings().then()
   // });
    
      API.getSettings().then((settings) => { 
        console.info("this.settings is=>",settings); 
        if(defaultLanguage == 'default') {
          defaultLanguage = settings.language;
        }
        else {
          defaultLanguage = defaultLanguage;

        }
        
        console.info("this.settings is=>",defaultLanguage);     
        setFallbackLanguage(defaultLanguage); 

      });

      setFallbackLanguage(defaultLanguage); 

   // };


   const languageCode = navigator.language;

   console.log("Current Language Code is as follow ",languageCode); 


    const languageLabel = {
      "en-US": "English",
      "es-ES": "Spanish",
      "fr-FR": "French",
    };

    const languageR = navigator.language;
    

    const language = languageLabel[languageCode];


   const apiResponse = {
    language: defaultLanguage // Assuming the API response contains the desired language
  };

   

  

  i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: defaultLanguage,  
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enTranslations 
      },
      de:{
        translation : deTranslations
      },
      it:{
        translation: itTranslations 
      }
    }
  });  

  function setFallbackLanguage(defaultLanguage) { 
    console.info("default language =>",defaultLanguage);
    i18next.options.fallbackLng = defaultLanguage; 
  }
  console.info("the default language is=>",apiResponse.language); 
  // Example usage
 




  export default i18n;
