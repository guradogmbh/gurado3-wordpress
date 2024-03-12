<?php
/**
 * Plugin Name: gurado3
 * Description: Das Gutschein & Ticketingsystem
 * Version: 0.1.9
 * Author: gurado GmbH
 * Author URI: https://site.gurado.de/
 */

 /*

*/

function register_my_session(){
  if( ! session_id() ) {
      session_start();
  }
}

add_action('init', 'register_my_session');

add_action( 'admin_menu', 'gurado_api_add_admin_menu' );
add_action( 'admin_init', 'gurado_api_settings_init' );
add_action('admin_init', 'gurado_general_settings_init');

add_action('wp_footer', 'header_script');


function header_script(){
  ?>
    <div id="gurado-cart"></div>
  <?php
}

function gurado_api_add_admin_menu(  ) {
    add_menu_page( 'gurado settings', 'gurado', '', 'gurado-settings-page', '' );
    add_submenu_page( 'gurado-settings-page', 'API Settings', 'API Settings', 'manage_options', 'gurado-settings-page-api', 'gurado_api_options_page' );
    add_submenu_page( 'gurado-settings-page' , 'General Settings', 'General Settings', 'manage_options', 'gurado-settings-page-styling', 'gurado_styling_page');
}

function gurado_api_settings_init(  ) {
    register_setting( 'guradoPlugin', 'gurado_api_settings' );
    add_settings_section(
        'gurado_api_guradoPlugin_section',
        __( 'API', 'wp_gurado_domain' ),
        'gurado_api_settings_section_callback',
        'guradoPlugin'
    );

    add_settings_field(
      'gurado_api_key',
      __( 'Consumer Key', 'wp_gurado_domain' ),
      'gurado_api_key_render',
      'guradoPlugin',
      'gurado_api_guradoPlugin_section'
    );
    add_settings_field(
      'gurado_api_secret',
      __( 'Access Token', 'wp_gurado_domain' ),
      'gurado_api_secret_render',
      'guradoPlugin',
      'gurado_api_guradoPlugin_section'
    );
}

function gurado_general_settings_init(){
  register_setting('gurado_general', 'gurado_general_settings');
  add_settings_section('gurado_general_section',
    __( 'General settings', 'wp_gurado_domain' ),
    'gurado_general_settings_section_callback',
    'gurado_general'
  );
   add_settings_field(
    'automatic_scrolling',
    __( 'Activate automatic scrolling', 'wp_gurado_domain' ),
    'automatic_scrolling_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'header_color',
    __( 'Heading color', 'wp_gurado_domain' ),
    'gh_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'btn_primary_color',
    __( 'Primary button color', 'wp_gurado_domain' ),
    'btn_primary_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'btn_primary_border_color',
    __( 'Primary button border color', 'wp_gurado_domain' ),
    'btn_primary_border_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'btn_secondary_color',
    __( 'Secondary button color', 'wp_gurado_domain' ),
    'btn_secondary_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'btn_secondary_border_color',
    __( 'Secondary button border color', 'wp_gurado_domain' ),
    'btn_secondary_border_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'btn_font_color',
    __( 'Button text color', 'wp_gurado_domain' ),
    'btn_font_color_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'checkout_step_color_primary',
    __( 'Active checkout step color', 'wp_gurado_domain' ),
    'checkout_step_color_primary_render',
    'gurado_general',
    'gurado_general_section'
  );
   add_settings_field(
    'checkout_step_color_secondary',
    __( 'Inactive checkout step color', 'wp_gurado_domain' ),
    'checkout_step_color_secondary_render',
    'gurado_general',
    'gurado_general_section'
  );
  add_settings_field(
    'checkout_step_color_text',
    __( 'Checkout steps font color', 'wp_gurado_domain' ),
    'checkout_step_color_text_render',
    'gurado_general',
    'gurado_general_section'
  );
}

function checkout_step_color_text_render(){
     $options = get_option('checkout_step_color_text');
  if(!$options["checkout_step_color_text"]){
    $options["checkout_step_color_text"] = "#ffffff";
  }
  ?>
    <input type="color" name='gurado_general_settings[checkout_step_color_text]' value='<?php echo $options["checkout_step_color_text"]?>'/>
  <?php 
}

function checkout_step_color_secondary_render(){
     $options = get_option('gurado_general_settings');
  if(!$options["checkout_step_color_secondary"]){
    $options["checkout_step_color_secondary"] = "#6c757d";
  }
  ?>
    <input type="color" name='gurado_general_settings[checkout_step_color_secondary]' value='<?php echo $options["checkout_step_color_secondary"]?>'/>
  <?php 
}
function checkout_step_color_primary_render(){
   $options = get_option('gurado_general_settings');
  if(!$options["checkout_step_color_primary"]){
    $options["checkout_step_color_primary"] = "#007bff";
  }
  ?>
    <input type="color" name='gurado_general_settings[checkout_step_color_primary]' value='<?php echo $options["checkout_step_color_primary"]?>'/>
  <?php 
}

function btn_font_color_render(){
   $options = get_option('gurado_general_settings');
  if(!$options["btn_font_color"]){
    $options["btn_font_color"] = "#ffffff";
  }
  ?>
    <input type="color" name='gurado_general_settings[btn_font_color]' value='<?php echo $options["btn_font_color"]?>'/>
  <?php 
}
function automatic_scrolling_render(){
  $options = get_option('gurado_general_settings');
  if(!$options["automatic_scrolling"]){
    $options["automatic_scrolling"] = "0";
  }
  ?>
        <input type="checkbox" name="gurado_general_settings[automatic_scrolling]" <?php if($options["automatic_scrolling"] === "on"){echo 'checked'; }?>/>
   <?php
}
function btn_secondary_border_render(){
  $options = get_option('gurado_general_settings');
  if(!$options["btn_secondary_border_color"]){
    $options["btn_secondary_border_color"] = "#6c757d";
  }
  ?>
    <input type="color" name='gurado_general_settings[btn_secondary_border_color]' value='<?php echo $options["btn_secondary_border_color"]?>'/>
  <?php 
}
function btn_primary_border_render(){
  $options = get_option('gurado_general_settings');
  if(!$options["btn_primary_border_color"]){
    $options["btn_primary_border_color"] = "#007bff";
  }
  ?>
    <input type="color" name='gurado_general_settings[btn_primary_border_color]' value='<?php echo $options["btn_primary_border_color"]?>'/>
  <?php 
}
function btn_secondary_render(){
  $options = get_option('gurado_general_settings');
  if(!$options["btn_secondary_color"]){
    $options["btn_secondary_color"] = "#6c757d";
  }
  ?>
    <input type="color" name='gurado_general_settings[btn_secondary_color]' value='<?php echo $options["btn_secondary_color"]?>'/>
  <?php 
}
function btn_primary_render(){
  $options = get_option('gurado_general_settings');
  if(!$options["btn_primary_color"]){
    $options["btn_primary_color"] = "#007bff";
  }
  ?>
    <input type="color" name='gurado_general_settings[btn_primary_color]' value='<?php echo $options["btn_primary_color"]?>'/>
  <?php 
}
function gh_render(){
  $options = get_option('gurado_general_settings');
  ?>
    <input type="color" name='gurado_general_settings[header_color]' value='<?php echo $options["header_color"]?>'/>
  <?php 
}

function gurado_api_key_render(  ) {
  $options = get_option( 'gurado_api_settings' );
  ?>
    <input type='text' name='gurado_api_settings[gurado_api_key]' value='<?php echo $options["gurado_api_key"]?>' />
  <?php
}
function gurado_api_secret_render(  ) {
  $options = get_option( 'gurado_api_settings' );
  ?>
    <input type='password' name='gurado_api_settings[gurado_api_secret]' value='<?php echo $options["gurado_api_secret"]?>' />
  <?php
}

function gurado_api_settings_section_callback(  ) {
}
function gurado_general_settings_section_callback(){}

function gurado_styling_page(){
  ?>
    <form action='options.php' method='post'>
      <div style="text-align:center; padding-top: 30px; padding-bottom: 30px; padding-right:20px;">
          <img src="https://cdn-int.gurado.de/fileadmin/images/gurado-logo.svg" /><br/>
          <hr style="border-color: lightgray; border-bottom: 0;"/>
      </div>

      <div style="padding-right:20px">
        <div style="background-color:#e5f3fe; padding-right: 20px; height:50px; font-size: 18px; display:flex; align-items:center; padding-left:20px; color:#007ace">
          General
        </div>
      </div>

      <?php
        settings_fields('gurado_general');
        do_settings_sections('gurado_general');
        submit_button();
      ?>

    </form>
  <?php
}

function gurado_api_options_page(  ) {
    ?>
    <form action='options.php' method='post'>

        <div style="text-align:center; padding-top: 30px; padding-bottom: 30px; padding-right:20px;">
          <img src="https://cdn-int.gurado.de/fileadmin/images/gurado-logo.svg" /><br/>
          <hr style="border-color: lightgray; border-bottom: 0;"/>
      </div>

      <div style="padding-right:20px">
        <div style="background-color:#e5f3fe; padding-right: 20px; height:50px; font-size: 18px; display:flex; align-items:center; padding-left:20px; color:#007ace">
          API-Settings
        </div>
      </div>

        <?php
        settings_fields( 'guradoPlugin' );
        do_settings_sections( 'guradoPlugin' );
        submit_button();
        ?>

    Diese Einstellungen finden Sie im gurado-Dashboard unter <b>Konfiguration</b> -> <b>Einlösegeräte</b>. Legen Sie ein Einlösegerät des Typs 'API for Extension' an.

    </form>
    <?php
}

function get_language_from_url() {
  $url = $_SERVER['REQUEST_URI']; // Get the current URL
  $url_parts = explode('/', trim($url, '/')); // Split the URL into parts

  // Check if the language code is present in the URL
  if (!empty($url_parts[0]) && preg_match('/^[a-z]{2}$/', $url_parts[0])) {
      return $url_parts[0]; // Return the language code
  }

  // Default language if not found
  return 'default';
}

add_action('wp_enqueue_scripts', function ($hook) {
    //$js_to_load = 'http://localhost:3000/static/js/bundle.js';
    //wp_enqueue_script('gurado_js', $js_to_load, '', mt_rand(10,1000), true);
    //PRODUCTION:
    define('MY_THEME_VERSION', '4.0.0');
    $dir =plugin_dir_url( __FILE__ );
    wp_enqueue_script('gurado_cart_js', $dir.'/cart/js/main.726055ca.js', '',MY_THEME_VERSION, true);
   // wp_enqueue_style( 'bootstrap4','https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css');  
    wp_enqueue_style( 'guradostyle',$dir.'/static/css/main.e8c51276.css');          
    wp_enqueue_style( 'guradostylecart',$dir.'/cart/css/main.7d121bf612.css');           
    
    wp_enqueue_script('gurado_js', $dir.'/static/js/main.709bd7d0.js', '',MY_THEME_VERSION, true);     
    
    $current_language = get_language_from_url();  

    wp_localize_script('gurado_js', 'gurado_js_ajax', array( 
      'urls'    => array(
        'proxy'    => rest_url('gurado-api/v1/proxy'),
        'proxy_site_url'=>get_site_url(),
        'language' => $current_language
      ),
      // if you are going to add forms to your widgets, you'll need this:
      'nonce'   => wp_create_nonce('wp_rest'),
    ));


      wp_localize_script('gurado_cart_js', 'gurado_js_ajax', array(
      'urls'    => array(
        'proxy'    => rest_url('gurado-api/v1/proxy'),
        'proxy_site_url'=>get_site_url(),
        'language' => $current_language
      ),
      // if you are going to add forms to your widgets, you'll need this:
      'nonce'   => wp_create_nonce('wp_rest'),
    ));

  });

  add_shortcode( 'gurado', 'show_gurado' ); 
    function show_gurado($atts) {
        $atts = shortcode_atts( array(
          'category' => '*',
          'display' => 'box',
          'product' => '*'
        ), $atts, 'gurado' );
        $ausgabe = '<span id="gurado-product" style="display:none">'.$atts['product'].'</span><span id="gurado-category" style="display:none">'.$atts['category'].'</span><span id="gurado-display" style="display:none">'.$atts['display'].'</span><div id="gurado-react"></div>';
        return $ausgabe;
    } 
    
    
    function render_my_react_register_component() { 
      ob_start();
      ?>
      <div id="my-react-container"></div>
      <?php
      return ob_get_clean();
  }
  add_shortcode( 'registerForm', 'render_my_react_register_component');



    function render_my_react_login_component() { 
      ob_start();
      ?>
      <div id="my-react-login-page-container"></div>
      <?php
      return ob_get_clean();
  }
  add_shortcode( 'loginForm', 'render_my_react_login_component' ); 

  function render_my_react_forget_password_component() { 
    ob_start();
    ?>
    <div id="my-react-forget-page-container"></div> 
    <?php
    return ob_get_clean();
}
add_shortcode( 'forgetPasswordForm', 'render_my_react_forget_password_component' ); 

  function render_my_react_verification_component() { 
    ob_start();
    ?>
    <div id="my-react-verification-container"></div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'verificationForm', 'render_my_react_verification_component' );

function render_my_react_my_account_component() {
  ob_start();
  ?>
  <div id="my-react-my-account-container"></div>
  <?php
  return ob_get_clean();
}

add_shortcode( 'myProfile', 'render_my_react_my_account_component' ); 

    add_action('rest_api_init', function () {
      register_rest_route('gurado-api/v1', '/proxy', array(
        // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
        'methods'  => WP_REST_Server::READABLE,
        // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
        'callback' => 'gurado_api_proxy',
      ));
    });

    add_action('rest_api_init', function () {
      register_rest_route('gurado-api/v1', '/cartUrl', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'gurado_api_cartUrl'
      ));
    });

    add_action('rest_api_init', function () {
      register_rest_route('gurado-api/v1', '/proxy', array(
        // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
        'methods'  =>'POST',
        // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
        'callback' => 'gurado_api_proxy_post',
      ));
    });

    
    function startsWith($haystack, $needle) {
      return substr_compare($haystack, $needle, 0, strlen($needle)) === 0;
  }
    function gurado_api_proxy($request) {
      $options = get_option( 'gurado_api_settings' );
      $client_id = $options["gurado_api_key"];
      $api_key = "Bearer ".$options['gurado_api_secret'];
      $options = get_option( 'gurado_api_settings' ); 
      // first we get the query parameters from the request
      $params = $request->get_query_params();
      // we add the API key to the params we'll send to the API
      // we get the endpoint since we'll use that to construct t+++++++
      $endpoint = $params['endpoint'];
      // delete the endpoint since we no longer need it in the params
      if(startsWith($endpoint, "/style")){
        $style = get_option('gurado_general_settings');
        $style['language'] = substr(get_locale(), 0, 2); 
        return $style;
      }
      if(startsWith($endpoint, "/urlKey")){
        $key = $params["key"];
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/products?url_key=$key", array( 
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/clientId")){
        return $client_id;
      }
      if(startsWith($endpoint, "/patchCart")){
        $cartId = $params["cartId"];
        $item = $params["item"];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId",array(
          'method' => 'PATCH',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $item
        ));
        $body = wp_remote_retrieve_body($response);
        return $body;
      }
      if(startsWith($endpoint, "/priceEstimate")){
        $pOptions = $params['options'];
        $sku = $params['sku'];
         $response = wp_remote_post("https://storefront.gurado.de/api/v1/products/$sku/price-estimations", array(
          'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ),
        'body' => $pOptions
      ));
      $body = wp_remote_retrieve_body($response);
      return $body;
      }
      if(startsWith($endpoint, "/invoiceOrder")){
        $order = $params['order'];
        $response = wp_remote_post("https://storefront.gurado.de/api/v1/orders", array(
          'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ),
        'body' => $order
      ));
      $body = wp_remote_retrieve_body($response);
      return $body;
      }
      if(startsWith($endpoint, "/countries")){
        $current_language = $params['defaultLanguage'];
        if($current_language == 'it') {
          $language = 'it-IT';


        }else if ($current_language == 'de') {
          $language = 'de-DE';

        } else {
          $language = 'en-GB';
        }
        
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/countries", array(
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Accept-Language'=>$language  
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/updateQty")){
        $cartId = $params['cartId'];
        $itemId = $params['itemId'];
        $item = $params['item'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId/items/$itemId", array(
          'method' => 'PATCH',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $item
        ));
        $body = wp_remote_retrieve_body($response);
        return $body;
      }

      if(startsWith($endpoint, "/cartRedemption")){
        $cartId = $params['cartId'];
        $couponCode = $params['couponCode']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId/redemptions", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $couponCode  
        ));
        $body = wp_remote_retrieve_body($response); 
        return $body;
      }

      if(startsWith($endpoint, "/deleteCartRedemption")){
        $cartId = $params['cartId'];
        $redemptionId = $params['redemptionId'];
       
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId/redemptions/$redemptionId", array( 
          'method' => 'DELETE',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => ''  
        ));
        $body = wp_remote_retrieve_body($response); 
        return $body;
      }
      
      if(startsWith($endpoint, "/getCart")){
        $cartId = $params['cartId'];
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/carts/$cartId", array(
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/setAgreements")){
        $item = $params['item'];
        $cartId = $params['cartId'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId", array(
          'method' => 'PATCH',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $item
        ));
        $body = wp_remote_retrieve_body($response);
        return $body;
      }
      if(startsWith($endpoint, "/getAgreement")){
        $agreementId = $params['agreementId'];
        $current_language = $params['defaultLanguage'];
        if($current_language == 'it') {
          $language = 'it-IT';
        }else if ($current_language == 'de') {
          $language = 'de-DE';
        } else {
          $language = 'en-GB'; 
        }
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/agreements/$agreementId", array(
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Accept-Language'=>$language  

          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/getAgreements")){
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/agreements", array(
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
        $body = wp_remote_retrieve_body($response);
        return $body;
      }
      if(startsWith($endpoint, "/createCart")){
        $response = wp_remote_post("https://storefront.gurado.de/api/v1/carts", array(
          'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/deleteItem")){
        $cartId = $params['cartId'];
        $item_id = $params["item_id"];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/carts/$cartId/items/$item_id", array(
          'method' => 'DELETE',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/addCartItem")){
        $cartId = $params['cartId'];
        $item = $params['item'];
        $response = wp_remote_post("https://storefront.gurado.de/api/v1/carts/$cartId/items", array(
          'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ),
        'body' => $item
      ));
      $body = wp_remote_retrieve_body($response);
      return $body;
      }
      if(startsWith($endpoint, "/products")){
        $page = $params['page'];
        $page_size = $params['page_size'];
        $collection_id = $params["collection_id"];
        $query_url = "https://storefront.gurado.de/api/v1/products?page_size=$page_size&page=$page";
        if($collection_id !== "*"){
          $query_url = $query_url."&collection_id=$collection_id";
        }
        // build the URL using the endpoint and any params and make a remote GET request
          $response = wp_remote_get( $query_url ,
          array( 'timeout' => 10,
         'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
         )
          ));
          // get the body from the response and return it as a JSON object
          $body = wp_remote_retrieve_body( $response );
          return $body;
      }
      if(startsWith($endpoint, "/product")){
        $sku = $params['sku'];
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/products/$sku", array( 
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body;
      }
      if(startsWith($endpoint, "/price")){
        $sku = $params["sku"];
        $template = json_decode($params["template"]);
        $response = wp_remote_post ( "https://api.gurado.de/v1.0/articles/$sku/prices/calculate" , array(
          'headers' => array( 
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ),
          'body' => $template
        ));
        $body = wp_remote_retrieve_body( $response );
        return json_decode($body);
      }
      if(startsWith($endpoint, "/systemConfiguration")){
        $response = wp_remote_get( "https://api.gurado.de/v1.0/system-configuration" , array(
          'headers' => array( 'X-GURADO-CONSUMER-KEY' => $options["gurado_api_key"],
                            'X-GURADO-CONSUMER-SECRET'=> $options["gurado_api_secret"] )
        ));
        $body = wp_remote_retrieve_body( $response );
        return json_decode($body);
      }
      if(startsWith($endpoint, "/updateCount")){
        $count = $params["count"];
        $_SESSION["cart_count"] = $count;
        return "UPDATE_SUCCESS: ".$_SESSION["cart_count"];
      }


      if(startsWith($endpoint, "/previewTemplate")){
        $cartId = $params['cartId'];
        $couponCode = $params['couponCode']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/voucher-previews", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $couponCode  
        ));
        $body = wp_remote_retrieve_body($response);  
        return $body;
      }

      if(startsWith($endpoint, "/registerForm")){
        $registerFormData = $params['registerData'];  
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $registerFormData  
        ));
        $body = wp_remote_retrieve_body($response);  
        if($body == '{}')
        {
          return true;
        }else{
          return $body;
        }
      }

      if(startsWith($endpoint, "/getCustomerAgreements")){
        $response = wp_remote_get("https://storefront.gurado.de/api/v1/customer-registration-agreements", array(  
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ) 
          ));
        $body = wp_remote_retrieve_body($response);
        return $body;
      }


      //saveMyProfile

      if(startsWith($endpoint, "/saveMyProfile")){
        $registerFormData = $params['registerData'];
        $token =   $params['token'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/me", array( 
          'method' => 'PUT',
          'headers' => array(
            'Authorization' => $api_key,
            'Customer-Authorization' => 'Bearer '.$token,

            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $registerFormData  
        ));
        $body = wp_remote_retrieve_body($response);  

        $response_code = wp_remote_retrieve_response_code( $response );

        if($response_code == 204) 
        {
          return true;
        }else{
          return $body;
        }
      }

      if(startsWith($endpoint,"/voucherCode")) {
        $voucherData = $params['data']; 
        $token = $params['token'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/me/wallet/vouchers", array(  
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Customer-Authorization' => 'Bearer '.$token 
          ),
          'body' => $voucherData  
        ));
        $body = wp_remote_retrieve_body($response);  
        $response_code = wp_remote_retrieve_response_code($response); 

        if($response_code == 201) 
        {
          return true;
        }else{
          return $body;
        }
      }

      //getVouchers

      if(startsWith($endpoint, "/getVouchers")){
        $token = $params['token'];

        $response = wp_remote_get("https://storefront.gurado.de/api/v1/customers/me/wallet/vouchers", array( 
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Customer-Authorization' => 'Bearer '.$token
          )
          ));
          $body = wp_remote_retrieve_body($response);

        
          return $body; 
      }


      if(startsWith($endpoint, "/verifyForm")){
        $verifyFormData = $params['verifyData']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/confirm-account", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $verifyFormData   
        ));
        $body = wp_remote_retrieve_body($response);  
        if($body == "")
        {
          return true;
        }else{
          return $body;
        }
      }

      if(startsWith($endpoint, "/resendVerificationCode")){ 
        $verifyFormData = $params['verifyData']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/send-account-confirmation-code", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $verifyFormData   
        ));
        $body = wp_remote_retrieve_body($response);    
        if($body == "")
        {
          return true;
        }else{
          return $body;
        }
      }


      //

      
      if(startsWith($endpoint, "/logout")){
        $token =   $params['token'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/logout", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'Customer-Authorization' => 'Bearer '.$token,

            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
        ));
        $body = wp_remote_retrieve_body($response);  

        $response_code = wp_remote_retrieve_response_code($response);

        if($response_code == 204) 
        {
          return true;
        }else{
          return $body;
        }
      } 

      if(startsWith($endpoint, "/loginForm")){
        $loginFormData = $params['loginData']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/login", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $loginFormData  
        ));
        $body = wp_remote_retrieve_body($response);  
        $loginData = json_decode($body,true);
        if($loginData && $loginData['token'])
        {
          $response = ['status'=>true,'token'=>$loginData['token']];
          return json_encode($response);  
        }else{
          return $body; 
        }
      }

      if(startsWith($endpoint,"/forgetPasswordForm")){  
        $forgetFormData = $params['forgetPasswordData'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/reset-password", array(  
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => $forgetFormData  
        ));
        $body = wp_remote_retrieve_body($response);  
        $response_code = wp_remote_retrieve_response_code($response); 

        if($response_code == 204) 
        {
          return true;
        }else{
          return $body;
        }
      }


      if(startsWith($endpoint, "/getMyProfile")){
        $token = $params['token'];

        $response = wp_remote_get("https://storefront.gurado.de/api/v1/customers/me", array(
          'timeout' => 10,
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Customer-Authorization' => 'Bearer '.$token
          )
          ));
          $body = wp_remote_retrieve_body($response);
          return $body; 
      }
      // convert the params back to a string

      if(startsWith($endpoint,"/sendAccountDeletionCode")) {
        $token =   $params['token'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/me/send-account-deletion-code", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Customer-Authorization' => 'Bearer '.$token

          ),
          'body' => json_encode($data) 
        ));
        $response_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);  
        if($response_code == 204)  
        {
          return true;
        }else{
          return $body;
        }
      }

      //deletionCode

      if(startsWith($endpoint,"/deletionCode")) { 
        $token =   $params['token'];
        $deletionData = $params['deletionData'];
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/me", array( 
          'method' => 'DELETE',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Customer-Authorization' => 'Bearer '.$token 

          ),
          'body' => $deletionData
        ));
        $response_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);  
        if($response_code == 204)  
        {
          return true;
        }else{
          return $body;
        }
      }
      
    }
      

    function gurado_api_proxy_post($request) {
      $options = get_option( 'gurado_api_settings' );
      $client_id = $options["gurado_api_key"];
      $api_key = "Bearer ".$options['gurado_api_secret'];
      $params = $request->get_query_params();
      $options = get_option( 'gurado_api_settings' );
      $data = $request->get_json_params();
      
      $endpoint = $params['endpoint'];

      if(startsWith($endpoint, "/registerForm")){
       
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers", array(  
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => json_encode($data)
        ));
        $body = wp_remote_retrieve_body($response);  
        if($body == '{}') 
        {
          return true;
        }else{
          return $body;
        }
      }


      if(startsWith($endpoint, "/loginForm")){
        $loginFormData = $params['loginData']; 
        $response = wp_remote_request("https://storefront.gurado.de/api/v1/customers/login", array(  
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
          'body' => json_encode($data) 
        ));
        $body = wp_remote_retrieve_body($response);  
        $loginData = json_decode($body,true);
        if($loginData && $loginData['token'])
        {
          $response = ['status'=>true,'token'=>$loginData['token']];
          return json_encode($response);  
        }else{
          return $body; 
        }
      }

      if(startsWith($endpoint, "/changePassword")){
        $changePasswordFormData = $params['data'];  
        $token = $params['token'];
        $response = wp_remote_request("https://storefront-vahuja.dev.gurado.de/api/v1/customers/me/change-password", array( 
          'method' => 'POST',
          'headers' => array(
            'Authorization' => $api_key,
            'Customer-Authorization' => 'Bearer '.$token, 

            'accept' => 'application/json',
            'content-type' => 'application/json'
          ),
           'body' => json_encode($data)   
        ));
        $body = wp_remote_retrieve_body($response);   

        $response_code = wp_remote_retrieve_response_code( $response ); 

        if($response_code == 204) 
        {
          return true;
        }else{
          return $body;
        }
      }


    }
?>
