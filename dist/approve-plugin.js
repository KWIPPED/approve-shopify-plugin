/**
 * Startup Variables:
 *	 Set applicible values needed to connect the plugin to your KWIPPED APPROVE account
	*	 If you do not have your account setup yet goto www.kwipped.com to get started
	* 
	* 
	* The way the platform is there is a lack of consistency to naming of variables and data access as well as layout and structure. You will have to have some experience with javascript/jquery/handlebars to be able to implement this code. 
	* Everything below are examples of potential ways to integrate the code to get the approve finance buttons working how you would like. 
	*/
	window.kwipped_approve = window.kwipped_approve || {};
	/**
	 * Set: 
	 * 	@param {kwipped_approve.url} string set to the base kwipped url 
	 *	  found in the plugin configurator in your KWIPPED APPROVE account
	 * 	@param {kwipped_approve.approve_id} string set to the value found
	 *	  in the plugin configurator in your KWIPPED APPROVE account
	 */
	window.kwipped_approve.url = window.kwipped_approve.url || "https://www.kwipped.com";
	window.kwipped_approve.approve_id = window.kwipped_approve.approve_id || "your+approve+id+goes+here";
	
	// setup sh_app object
	window.kwipped_approve.sh_app = window.kwipped_approve.sh_app || {};
	
	/**
	 * CONFIG OPTIONS:
	 * Set these values to the appropriate settings to interact between your page(s) and the finance button
	 */
	window.kwipped_approve.sh_app.config = window.kwipped_approve.sh_app.config || {
		
		// the product_info_wrap is to be set to product view wrapping element that contians both the APPROVE finance button as well as the qty and price elements. 
		product_info_wrap: ".product-single__meta",
			
		// the cart_info_wrap is to be set to vart view wrapping element that contians both the APPROVE finance button as well as the qty and price elements. 
		cart_info_wrap: ".main-content",
		
		// the simple_product_price_ele is to be set to the price element jquery ID or class tag to retrieve the base price on a single simple APPROVE finance button product page. 
		simple_product_price_ele: ".productView [data-product-price-without-tax]:first",
	
		// the variable_product_price_ele is to be set to the price element jquery ID or class tag to retrieve the base price on a single variable APPROVE finance button product page. 
		variable_product_price_ele: ".productView [data-product-price-without-tax]:first",
		
		// qty_ele Set to the quantity element jQuery class or ID tag that contains the qty increase/decrease selectors. 
		qty_ele: 'input[data-quantity-input]',
		
		// qty_down_ele Set to quantity down click element jquery class tag to set the current quantity for the APPROVE finance button. 
		qty_down_ele: 'button[data-action="dec"]',
		
		// qty_up_ele  Set to quantity up click element jquery class tag to set the current quantity for the APPROVE finance button.  
		qty_up_ele: 'button[data-action="inc"]',
		
	};
	
	// REQUIRED APPROVE ELEMENT VARIABLES: DO NOT DELETE OR MODIFY!!! 
	window.kwipped_approve.sh_app.config.approve_action_ele = '[approve-function="embedded_app"][approve-action="add_to_app"]';
	window.kwipped_approve.sh_app.config.approve_simple_ele = '[approve-function="embedded_app"][approve-action="add_to_app"][approve-price]';
	window.kwipped_approve.sh_app.config.approve_variable_ele = '[approve-function="embedded_app"][approve-action="add_to_app"][approve-items]';
	window.kwipped_approve.sh_app.config.approve_teaser_ele = '[approve-function="teaser_rate"]';
	
	/* ================ APPROVE BigCommerce Helper Functions ================ */
	/* ================ kwipped_approve.sh_app.init ================ */
	window.kwipped_approve.sh_app.init = function () {
		var sh_app = window.kwipped_approve.sh_app,
			config = sh_app.config;
		setTimeout(function () {
		  
	
			// check for qty_ele and product_info_wrap as this will be the main product info page
			if ($(config.product_info_wrap).length > 0
				&& $(config.qty_ele).length > 0 
			) {
	
				// set basic variables for use
				var cur_qty_count = $(config.qty_ele).val(),
					approve_button_parent_ele = $(config.qty_ele).closest(config.product_info_wrap),
					approve_cart_button_parent_ele = $(config.qty_ele).closest(config.cart_info_wrap),
					approve_button_price = 0;
			  
				if (approve_button_parent_ele.length > 0) {
					var product_approve_single_button = approve_button_parent_ele.find(config.approve_simple_ele),
						product_approve_items_button = approve_button_parent_ele.find(config.approve_variable_ele),
						approve_button_price_ele = approve_button_parent_ele.find(config.simple_product_price_ele);
				}
				else if (approve_cart_button_parent_ele.length > 0) {
					var product_approve_single_button = approve_cart_button_parent_ele.find(config.approve_simple_ele),
						product_approve_items_button = approve_cart_button_parent_ele.find(config.approve_variable_ele),
						approve_button_price_ele = approve_cart_button_parent_ele.find(config.simple_product_price_ele);
				}
				$("body").on("change", config.qty_ele, function () {
				  // console.log("CUR QTY => ", $(this).val());
				  // console.log("CUR LENGTH => ",product_approve_single_button.length); 
				   cur_qty_count = $(this).val();
				   if (product_approve_single_button.length == 1) {
						// IF product_approve_single_button is on page, change qty to match
						product_approve_single_button.attr("approve-qty", cur_qty_count);
						// check and set if button should be shown or hidden
						sh_app.approve_update_child_teaser_total(product_approve_single_button);
					}
					  if (product_approve_items_button.length == 1) {
						var this_button_items = JSON.parse(decodeURIComponent(product_approve_items_button.attr("approve-items")));
						for (var i in this_button_items) {
							this_button_items[i].quantity = cur_qty_count;   
							sh_app.approve_button_update_items(product_approve_items_button, this_button_items[i], i);
						}
						sh_app.approve_update_child_teaser_total(product_approve_items_button);
						// product_approve_items_button
					}
				});
				// register click handler for the qty down button IF NEEDED
				$(config.qty_down_ele).click(function () {
				  
					cur_qty_count = (cur_qty_count > 1) ? Number(cur_qty_count) - 1 : 1;
					if (product_approve_single_button.length > 0) {
						// IF product_approve_single_button is on page, change qty to match
						product_approve_single_button.attr("approve-qty", cur_qty_count);
						// check and set if button should be shown or hidden
						sh_app.approve_update_child_teaser_total(product_approve_single_button);
					}
					if (product_approve_items_button.length > 0) {
						var this_button_items = JSON.parse(decodeURIComponent(product_approve_items_button.attr("approve-items")));
						for (var i in this_button_items) {
							this_button_items[i].quantity = cur_qty_count;   
							sh_app.approve_button_update_items(product_approve_items_button, this_button_items[i], i);
						}
						sh_app.approve_update_child_teaser_total(product_approve_items_button);
						// product_approve_items_button
					}
					});
	
				// register click handler for the qty up button
				$(sh_app.config.qty_up_ele).click(function () {
					cur_qty_count = Number(cur_qty_count) + 1;
					if (product_approve_single_button.length > 0) {
						// IF product_approve_single_button is on page, change qty to match
						product_approve_single_button.attr("approve-qty", cur_qty_count);
						// check and set if button should be shown or hidden
						sh_app.approve_update_child_teaser_total(product_approve_single_button);
					}
					if (product_approve_items_button.length > 0) {
						var this_button_items = JSON.parse(decodeURIComponent(product_approve_items_button.attr("approve-items")));
						for (var i in this_button_items) {
							this_button_items[i].quantity = cur_qty_count;   
							sh_app.approve_button_update_items(product_approve_items_button, this_button_items[i], i);
						}
						sh_app.approve_update_child_teaser_total(product_approve_items_button);
						// product_approve_items_button
					}
	
				});
	
				// register a 'content modified' handler for the price element IF the price changes due to option selection. 
				// THIS is similar to a MutationObserver, but is a bit more streamlined for use with the jQuery processes.
				$("body").on('DOMSubtreeModified', config.product_price_ele, function() {
					// clean price to not contain any $ or ',' 
					approve_button_price = approve_button_price_ele.text().replace(/[^\d\.]+/g,"");
					// IF price != "" then set the button price. 
					if (approve_button_price != ""
						&& product_approve_single_button.length > 0
					) {
						// IF product_approve_single_button is on page, change approve-price to match
						product_approve_single_button.attr("approve-price", approve_button_price);
						// check for and update any child teaser approve-total contained in this element
						product_approve_single_button.find('[approve-function="teaser_rate"]').attr("approve-total", approve_button_price);
						// check and set if button should be shown or hidden
						sh_app.approve_update_child_teaser_total(product_approve_single_button);
					}
				});
			}
	
			// approve_update_child_teaser_total() will show or hide any APPROVE finance buttons based on the threshold set
			  if (window.init_cart_price) {
				window.init_cart_price();
			}
			window.kwipped_approve.sh_app.approve_update_child_teaser_total();
		}, 100);
	
	};
	
	/* ================ kwipped_approve.sh_app.approve_update_child_teaser_total ================ */
	// this function will check to see if the button should be shown/hidden based on the threshold amount(s) 
	// IF run without specifying element it will check all APPROVE finance buttons on the page
	window.kwipped_approve.sh_app.approve_update_child_teaser_total = function (ele) {
		var sh_app = window.kwipped_approve.sh_app,
			config = sh_app.config,
			ele = ele || $(config.approve_action_ele);
		// console.log("WINDOW LOCATION ",window.location);
		ele.each(function (){
			var this_ele = $(this),
				this_grand_total = 0,
				approve_teaser_ele = this_ele.find(config.approve_teaser_ele);
			// console.log("CURRENT LOCATION INDEXOF ", current_location.indexOf("/search.php"));
			if (approve_teaser_ele.length > 0) {
				if (this_ele[0].hasAttribute("approve-items")) {
					var items = JSON.parse(decodeURIComponent(this_ele.attr("approve-items")));
					for (var i in items) {
						var this_item = items[i];
						this_grand_total += Number(this_item.price) * Number(this_item.quantity);
					}
				} else if (this_ele[0].hasAttribute("approve-price")) {
					this_grand_total += Number(this_ele.attr("approve-price")) * Number(this_ele.attr("approve-qty"));
	
				} 
				approve_teaser_ele.attr("approve-total", this_grand_total);
			}
		});
	};
	
	/* ================ kwipped_approve.sh_app.approve_button_add_items ================ */
	// this function will allow you to add or replace a full json object of items to a button that uses the attrib approve-items
	window.kwipped_approve.sh_app.approve_button_add_items = function (ele, items) {
		var sh_app = window.kwipped_approve.sh_app;
		for (var e in items) {
			items[e].model = encodeURIComponent(items[e].model);
		}
		ele.attr("approve-items", JSON.stringify(items));
		sh_app.approve_update_child_teaser_total(ele);
	};
	
	/* ================ kwipped_approve.sh_app.approve_button_add_item ================ */
	// this function will allow you to add a single json object item to a button that uses the attrib approve-items
	window.kwipped_approve.sh_app.approve_button_add_item = function (ele, item) {
		var sh_app = window.kwipped_approve.sh_app,
			items = JSON.parse(decodeURIComponent(ele.attr("approve-items")));
		items.push(item);
		for (var e in items) {
			items[e].model = encodeURIComponent(items[e].model);
		}
		ele.attr("approve-items", JSON.stringify(items));
		sh_app.approve_update_child_teaser_total(ele);
	};
	
	/* ================ kwipped_approve.sh_app.approve_button_update_items ================ */
	// this function will allow you to update item(s) on a button that uses the attrib approve-items
	window.kwipped_approve.sh_app.approve_button_update_items = function (ele, item, index) {
		var sh_app = window.kwipped_approve.sh_app,
			index = index | 0,
			items = JSON.parse(decodeURIComponent(ele.attr("approve-items")));
		items[index] = item;
		for (var e in items) {
			items[e].model = encodeURIComponent(items[e].model);
		}
		ele.attr("approve-items", JSON.stringify(items));
		sh_app.approve_update_child_teaser_total(ele);
	};
	
	window.kwipped_approve.load_with_core = function () {
		var sh_app = window.kwipped_approve.sh_app;
		if (window.kwipped_approve.core) {
			sh_app.init();
		} else {
			setTimeout(function () {
				window.kwipped_approve.load_with_core();
			}, 500);
		}
	};
	/* ================ kwipped_approve_jqcheck ================ */
	// this function will check to see if the button should be shown/hidden based on the threshold amount(s) 
	var kwipped_approve_jqcheck = function (){
		var sh_app = window.kwipped_approve.sh_app;
		if(window.jQuery && window.kwipped_approve.core)  {
			sh_app.init();
		} else {   
			var script = document.createElement('script'); 
			document.body.appendChild(script);  
			script.type = 'text/javascript';
			script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
			script.onload = function () {
				window.kwipped_approve.load_with_core();
			}
		}
	};
	kwipped_approve_jqcheck();
	