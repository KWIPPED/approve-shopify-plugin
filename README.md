# approve-shopify-plugin
Shopify APPROVE Plugin
# Plugin Features

The APPROVE Shopify plugin provides a methodology for Shopify developers to add the APPROVE lender network finance rates, finance cart, and finance application functionality into the Shopify site. 

Each Shopify implementation is unique to each site, so instead of providing a single solution that may not work the way you desire, we addressed the crux of the problem, and created resources for Shopify developers. Users of the APPROVE Shopify plugin will be able to customize its look and location as needed in the site.


# TL;DR
For experienced programmers.
1. Retrieve your APPROVE id from KWIPPED
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

