# approve-shopify-plugin
Shopify APPROVE Plugin
# Plugin Features

The APPROVE Shopify plugin provides a methodology for Shopify developers to add the APPROVE lender network finance rates, finance cart, and finance application functionality into the Shopify site. 

Each Shopify implementation is unique to each site, so instead of providing a single solution that may not work the way you desire, we addressed the crux of the problem, and created resources for Shopify developers. Users of the APPROVE Shopify plugin will be able to customize its look and location as needed in the site.


# TL;DR
For experienced programmers.
1. Retrieve your APPROVE `<approve-widget></approve-widget>` code snippet from KWIPPED
2. Download the approve-plugin from the dist folder in GitHub
3. Install the plugin into Shopify
4. Add the contents of approve-plugin.liquid into a snippet names approve-plugin in your shopify theme editor
5. Set your APPROVE id in the plugin settings
6. Set the appropriate jquery element tags needed
7. Place the following snippet in the Shopify cart where you want the APPROVE finance button to appear.

```html
{%- include "approve-plugin", approve_button: "cart", approve_cart: cart -%}
```
8. Place a button in the Shopify product page(s) where you want the APPROVE finance button to appear.

```html
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: "new_product", approve_hide: false -%} 
```
IF you would like to add a dynamic option for the "approve_type" you can do so like this: 

```html
{%- assign product_tags = product.tags | join: '~~~' | downcase | split: '~~~' -%}
{%- assign approve_product_type = "new_product" -%}
{%- if product_tags contains 'used' -%}
	{%- assign approve_product_type = "used_product" -%}
{%- endif -%}
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: approve_product_type, approve_hide: false -%} 
```

9. Add a jquery or javascript trigger to change the qty, model, price and type for the finance button.

```html

```

10. Done.

# Detailed Installation Instructions


### STEP 1: Download the `approve-plugin.js` file

Download the file <a href="https://github.com/KWIPPED/approve-shopify-plugin/tree/master/dist" target="_blank" >dist/approve-plugin.js</a> from our project on GitHub <larecipe-button target="_blank" tag="a" href="https://github.com/KWIPPED/approve-shopify-plugin" type="black" class="mx-2 px-4"><i class="fab fa-github"></i></larecipe-button>  and save it locally.

To do so:
	navigate to te dist folder, right click on the file `approve-plugin.js`


<hr />


### STEP 2: Install the `approve-plugin.js` file

In the Shopify theme editor, go to the section named `Assets`. 

Click on  `Add a new asset`



<hr />


### STEP 3: Add the contents of `approve-plugin.liquid` into Shopify
GoTo: Online Store -> Themes
In the active theme click on “Actions”  and select “Edit Code”

When the code editor loads go to the “Snippets” folder 
Create a new snippet file and name it “approve-plugin.liquid”

Click on the newly created file to edit it. 

Copy the contents of <a target="_blank" href="https://github.com/KWIPPED/approve-shopify-plugin/blob/master/dist/approve-plugin.liquid" >`approve-plugin.liquid`</a> from the dist folder in GitHub <larecipe-button target="_blank" tag="a" href="https://github.com/KWIPPED/approve-shopify-plugin" type="black" class="mx-2 px-4"><i class="fab fa-github"></i></larecipe-button> Or copy the code block below, and paste into the snippet you just created named `approve-plugin.liquid` in your shopify theme editor

<div id="load_approve_plugin_liquid" class="load_file_content" data-highlightlang="html" data-url="https://raw.githubusercontent.com/KWIPPED/approve-shopify-plugin/master/dist/approve-plugin.liquid"></div>


 <!-- <larecipe-button tag="a" href="shopify" type="blue" class="mx-2 px-4"><i class="fab fa-github"></i></larecipe-button> -->



<hr />


### STEP 4: Retrieve your APPROVE code snippet

Retrieve your APPROVE `<approve-widget></approve-widget>` code snippet from KWIPPED

1. Log into <a href="https://www.kwipped.com">KWIPPED</a> and go to `APPROVE Plugin Configurator` in `APPROVE > Settings`.

2. Locate the section `Copy Plugin Code`

3. In the box below the `Copy Plugin Code` header, select the entire section of code for `<approve-widget></approve-widget>` and copy it to your clipboard

4. Paste your APPROVE code snippet inside the `Snippets/approve-plugin.liquid` file in your Shopify theme editor


> IF you see in the browser console an error referencing `#/`, you will need to modify the `Assets/theme.js` 
>
> #### Go to: `Assets -> theme.js` 
>
> #### Search for: `$(window.location.hash)`
>
> #### Replace with: `$(window.location.hash.replace('#/', '#'))`



<hr />


### STEP 5: Retrieve your APPROVE button style snippet

1. Log into <a href="https://www.kwipped.com">KWIPPED</a> and go to `APPROVE Plugin Configurator` in `APPROVE > Settings`.

2. Locate the section `Copy Plugin Code`

3. In the box below the `Copy Plugin Code` header, look for the APPROVE button code whih will look like `<approve-button `. Find and copy everything inside the ` style='' ` tag. Be sure to only coppy what is inside the quotes and do not copy the quotes themselves. select the entire section of code for `<approve-widget></approve-widget>` and copy it to your clipboard

4. Paste your APPROVE code snippet inside the `Snippets/approve-plugin.liquid` file in your Shopify theme editor. Look for this `<!-- INSERT your APPROVE button style here -->` and completely replace it with your copied styles.



<hr />


### STEP 6: Edit the `approveOpt` settings as needed

Set the appropriate jquery element tags needed
Locate the following section in your `Sections/approve-plugin.liquid` file in the Shopify Theme Editor:

```javascript
var approveOpt = {
	buttonAmtThreshold: 2000,
	cartAmtThreshold: 2000,
	priceEleCart: '#CartSubtotal',
	priceEleSingle: '#ProductPrice-product-template',
	parentEleSingle: '.product-single__info-wrapper',
	priceEleMulti: '',
	parentEleMulti: ''
}
```

- `buttonAmtThreshold`: This should be set to the product price minimum to show the APPROVE finance button. 
- `cartAmtThreshold`: This should be set to the product price minimum to show the APPROVE finance button. 
- `priceEleCart`: Set to the cart subtotal jquery ID or class tag. 
- `priceEleSingle`: Set to the price element jquery ID or class tag to retrieve the base price on a single APPROVE finance button product page. 
- `parentEleSingle`: Set to the parent element jQuery class tag that contains the individual APPROVE finance button and quantity or other option elements for a page with a single APPROVE finance button. 
- `priceEleMulti`: Set to the price element jquery class tag to retrieve the base price on a multiple APPROVE finance button product/catalog page. 
- `parentEleMulti`: Set to the parent element jQuery class tag that contains the individual APPROVE finance button and quantity or other option elements for multiple APPROVE finance buttons. 



<hr />


### STEP 7: Place the APPROVE finance button code in the Shopify cart.

Place the APPROVE finance button snippet code in the Shopify cart theme file `Sections/cart-template.liquid` where you want the APPROVE finance button to appear.

```html
{%- include "approve-plugin", approve_button: "cart", approve_cart: cart -%}
```


<hr />


### STEP 8: Place the APPROVE finance button code in the Shopify product page(s).

Place the APPROVE finance button code in the Shopify product page(s) `i.e. Sections/produc-template.liquid OR Sections/collections-template.liquid ` where you want the button to appear.

The product price can appear in your theme in many different places. Using the default (at the time of writing) theme of “Debut” the sections and files below can be edited to show the approve button tied into the price. 

```html
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: "new_product" -%} 
```
##### IF you would like to add a dynamic option for the `approve_type` you can do so like this: 

```html
{%- assign product_tags = product.tags | join: '~~~' | downcase | split: '~~~' -%}
{%- assign approve_product_type = "new_product" -%}
{%- if product_tags contains 'used' -%}
	{%- assign approve_product_type = "used_product" -%}
{%- endif -%}
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: approve_product_type -%} 
```

> 
> #### IN the code remember to replace the variables:
> #### `product.title`, 
> #### `product.price`, 
> #### `product.quantity`, and 
> #### `"new_type"` or `approve_product_type` 
> #### with the correct variables for those data pieces. 


##### Example of places you can put the APPROVE finance button.

- `Sections/collections.liquid`
- `Sections/collection-template.liquid`
- `Sections/product-recommendations.liquid`
- `Sections/product-template.liquid`

<hr />


### STEP 9: Add a jquery or javascript trigger if needed.

If your Shopify theme utilizes a script to change the quantity of the item, you will need to update the functions that update the quantity and add the following:

```html
<!-- to change quantity -->
window.Approve.ChangeQty(qty, ele, index);
<!-- to change price -->
window.Approve.ChangePrice(price, ele, index);
<!-- to change model -->
window.Approve.ChangeModel(model, ele, index);
<!-- to change type -->
window.Approve.ChangeType(type, ele, index);
```
- `qty`: Set to the changed qty of the item
- `price`: Set to the changed price of the item. Should be US formatted with no currency symbol or comma.
- `model`: Set to the changed model of the item. This is what will be used as the name of the equipment.
- `type`: Set to the changed type of the item. this should be one of the following valid values  `new_product`, `used_product`, `refurbished_product`, `service`, `fee`, `shipping`, `discount`. 

- `ele`: Set to the jQuery element that is being triggered i.e. `$('.quantity')` OR the jQuery ID/class string i.e.  `'#ProductTotal'`

- `index`: (optional) IF you are on a multi APPROVE finance button page or on a cart, this should be set to the 0 based index of the changed quantity element that is being triggered.

If your Shopify theme does not utilize such a process and your input for any of the elements is exposed you can add the following (example only) to change the qty, model, price and type for the APPROVE finance button:

```javascript
var customSnippet = function customSnippet() {
	if ($("input[name='quantity']").length > 0) {
		$("input[name='quantity']").change(function () {
			<!-- to change quantity -->
			var qty = $(this).val(),
			    ele = $(this);
			window.Approve.ChangeQty(qty, ele);
		});
	}
	if ($("[data-product-option]").length > 0) {
		$("[data-product-option]").each(function () {
			var ele = $(this);
			ele.change(function (){ //
				var this_ele = $(this);
				setTimeout(function() {
					var price = $(this).closest(approveOpt.parentEleSingle).find(".ProductPrice").html().replace(/[^\d\.]+/g,""),
					    model = $(this).closest(approveOpt.parentEleSingle).find(".ProductName").val();
					Approve.ChangePrice(price, this_ele);
					Approve.ChangeModel(model, this_ele); 
				}, 100);
			});
		});
	}
	if ($("[data-product-type]").length > 0) {
		$("[data-product-type]").each(function () {
			var ele = $(this);
			ele.change(function (){ //
				var this_ele = $(this);
				setTimeout(function() {
					var type = this_ele.val(),
					    price = $(this).closest(approveOpt.parentEleSingle).find(".ProductPrice").html().replace(/[^\d\.]+/g,""),
					    model = $(this).closest(approveOpt.parentEleSingle).find(".ProductName").val();
					Approve.ChangeType(type, this_ele);
					Approve.ChangePrice(price, this_ele);
					Approve.ChangeModel(model, this_ele); 
				}, 100);
			});
		});
	}
};
// time out to verify that jQuery has been loaded
var jQueryRunningCheck = function (runCallback) {
	if (window.jQuery) { run_callback(); }
	else { setTimeout(function() { jQueryRunningCheck(runCallback) }, 50); }
};
if (window.jQuery) { customSnippet(); } 
else { setTimeout(function() { jQueryRunningCheck(customSnippet); }, 50); }

```



### STEP 10: Done.

<!--
## 1. Retrieve your APPROVE id from KWIPPED
In order to use the APPROVE woocommerce plugin you will need a subscription to the APPROVE lenger network at KWIPPED. For more information please visit www.kwipped.com
1. Log into KWIPPED
2. Visit the APPROVE settings page
3. Copy your APPROVE id

## 2. Download the wordpress plugin from the dist folder in GitHub
1. In the APPROVE Woocommerce plugin page in GitHub (https://github.com/KWIPPED/approve-woocommerce-plugin) navigate to the dist folder displayed close to the top of the page. Download the approve-woocommerce-plugin.zip to your computer.

## 3. Install the plugin into Wordpress
In Wordpress navigate to the plugins page. Click on "Add New", then "Upload Plugin"
1. Select the file you downloaded on Section #2
2. The APPROVE Woocommerce plugin is now installed.
 
## 4. Set your APPROVE id in the plugin settings
1. In Wordpress, under "Settings" click on "APPROVE Woocommerce Plugin"
2. Enter your Approve id retrieved in Section #1

## 5. Customize your Woocommerce Cart
Customization of the Woocommerce cart depends on the Wordpress and Woocommerce standards. For information on how to customize the Woocommerce cart, visit https://css-tricks.com/how-to-customize-the-woocommerce-cart-page-on-a-wordpress-site/.

Once the customization template is available, visit the Wordpress template editor. Point to the "Appearance menu" and select "Theme Editor". Select the theme you are currently using (e.g. TwentyTwenty) and navigate to the customizable Woocommerce cart page. This page will be located under woocommerce, cart in your theme, and it will be named cart.php.

Now add the following code anywhere you may type HTML in your page. Please follow HTML standards when placing the code on this page.
```
<script>
//***********************************
//* Added by KWIPPED
//***********************************
 	if(!window.approve_custom_code_initialized){
		window.approve_custom_code_initialized = true;
		function update_approve_button(){
			var data = {'action': 'get_approve_information'};
			jQuery.post('<?php echo admin_url('admin-ajax.php'); ?>' ,data, function(response) {
				jQuery('[custom-approve-button]').each(function(){
					jQuery(this).html(response.teaser);
					jQuery(this).attr('href',response.url);
				});
			});
	   }
	   jQuery(document).ready(function() {
		  update_approve_button();
	   });
	   jQuery(document.body).on( 'updated_cart_totals', function(){
		   update_approve_button();
	   });
	}
//******************************
//* End of added by KWIPPED
//*******************************
</script>
```
The code above looks for APPROVE buttons in the Woocommerce cart and updates them with information such as monthly rate and APPROVE cart URL information.

In the Woocommerce cart code, place the APPROVE button wherever it may be visible to your clients. In this example, I will place it next to the UPDATE CART button delivered in the standard woocart.
Here is the button code...
```
<a href="https://www.kwipped.com/approve/finance?approveid=<?php echo (get_option('awcp_options'))['approve_id']; ?>" class="gem-button gem-button-size-medium gem-button-style-flat gem-button-text-weight-normal checkout-button button alt wc-forward" target="_blank" custom-approve-button >Apply for Financing</a>
```
Here is the button code (as an example) in cotext withing the Woocommerce woocart...
```
<?php if ( wc_coupons_enabled() ) { ?>
						<div class="coupon">
							<label for="coupon_code"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label> <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" /> <button type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?></button>
							<?php do_action( 'woocommerce_cart_coupon' ); ?>
						</div>
					<?php } ?>

					<button type="submit" class="button" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>
					
<a href="https://www.kwipped.com/approve/finance?approveid=<?php echo (get_option('awcp_options'))['approve_id']; ?>" class="gem-button gem-button-size-medium gem-button-style-flat gem-button-text-weight-normal checkout-button button alt wc-forward" target="_blank" custom-approve-button >Apply for Financing</a>
	
	
					<?php do_action( 'woocommerce_cart_actions' ); ?>
```

# Updates
APPROVE Woocommerce plugin updates will be released periodically. You may update it by visiting the "Plugins" page in wordpress and following the provided instructions.

-->