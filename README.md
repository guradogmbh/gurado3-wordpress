![gurado](https://cdn-int.gurado.de/fileadmin/images/gurado-logo.svg)
Welcome to the official [gurado 3](https://site.gurado.de/) WordPress-Plugin.

# Usage

To download and use the Plugin, download the latest zip from the **release** folder and follow the instructions explained [here](https://support.gurado.de/de/articles/5573647-benutzerhandbuch-gurado-wordpress-plugin)

# Developers

This Plugin was created with ReactJS@17 and the non-modified version of Bootstrap 4 (react-bootstrap). If you intend to change the source code simply clone this repository instead of downloading the compiled zip. Feedback and pull requests are greatly appreciated.

## Live compiling / Production build

To start and debug this plugin, add the shortcode [gurado] to one of your WordPress pages and open the **gurado.php** file. It contains the modules that should be loaded. In development mode, the whole React Plugin will be bundled to one JS and CSS file to make it compatible to WordPress. Edit the file as required:

**Development mode**:
Install all required modules with **npm i** and uncomment the following lines to load the live-bundle:

    $js_to_load  =  'http://localhost:3000/static/js/bundle.js';
    wp_enqueue_script('gurado_js', $js_to_load, '', mt_rand(10,1000), true);

After doing so, the development mode can be started with the command **npm start**.

**Production build**
To build the project into a usable plugin, install all required modules with **npm i** and run the build process afterwards by executing **npm run build**. After the building process, the bundled and compiled code can be found in the _build_ folder. Go to the root folder of the WordPress-Plugin (wp-content/plugins/gurado) and delete the _static_ folder if existant. Copy the new static folder from _build_ to the root folder of the Plugin. Note down the names of the JS and CSS files under _static/js/_ and _static/css_ and update the **gurado.php** file accordingly. These lines are to be uncommented and updated with the new file names:

    wp_enqueue_style( 'guradostyle',$dir.'/static/css/main.CSS_FILE_NAME.css' );
    wp_enqueue_script('gurado_js', $dir.'/static/js/main.JS_FILE_NAME.js', '', mt_rand(10,1000), true);

The plugin should now work with your changes.

# Changelog

## 0.1.3 (release)

- fixed a loading issue with the payment wall for shops with agreement acceptance requirement
- removed font imports from css file (now using wordpress standard)

## 0.1.2

- fixed width issues with the voucher boxes in product listing
- added 10px height to voucher box in product listing to make two-liners fit
- fixed an error which led to shipping costs being shown despite virtual shipment
- fixed price formatting in product listing
- fixed a loading bug for stores with more than 20 vouchers
- added customizable css classes to wrapper objects
- **added support of showing only a specific voucher category. To do this, add a category-ID to the shortcode, for example [gurado category="3"]**

## 0.1.0

- Initial release version
