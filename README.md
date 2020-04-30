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
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: "new_product" -%} 
```
IF you would like to add a dynamic option for the "approve_type" you can do so like this: 

```html
{%- assign product_tags = product.tags | join: '~~~' | downcase | split: '~~~' -%}
{%- assign approve_product_type = "new_product" -%}
{%- if product_tags contains 'used' -%}
	{%- assign approve_product_type = "used_product" -%}
{%- endif -%}
{%- include 'approve-plugin', approve_button: "single", approve_model: product.title, approve_price: product.price, approve_qty: product.quantity, approve_type: approve_product_type -%} 
```

9. Add a jquery or javascript trigger to change the qty, model, price and type for the finance button.

```html

```

10. Done.
<!--
# Detailed Installation Instructions

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