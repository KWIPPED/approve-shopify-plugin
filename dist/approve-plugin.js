window.Approve = window.Approve || {};

/* ================ APPROVE ================ */
/* ================ Approve.Init ================ */
Approve.Init = function () {
	if ($(".approve_button").length > 0
		&& ($("input[name='quantity']").length > 0
			|| $(".js-qty").length > 0
		 )
	) {
		$("button.approve_button").click(function(e) {
			e.preventDefault();
			return false;
		});
		if ($(".approve_button_single").length == 1) {
			if($(approveOpt.priceEleSingle).html().replace(/[^\d\.]+/g,"") >= approveOpt.buttonAmtThreshold) {
				$(".approve_button_single").show();
			} else {
				$(".approve_button_single").hide();
			}
		} else if ($(".approve_button_multi").length > 0) {
			// setup for collections page
			$(".approve_button_multi").each(function(){
				if ($(this).closest(approveOpt.parentEleMulti).find(approveOpt.priceEleMulti).html().repace() >= approveOpt.buttonAmtThreshold) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});
		} else if ($(".approve_button_cart").length > 0) {
			var price_amt = $(approveOpt.priceEleCart).html().replace(/[^\d\.]+/g,"");
			if (price_amt >= approveOpt.cartAmtThreshold) {
				$(".approve_button_cart").show();
			} else {
				$(".approve_button_cart").hide();
			}
		}

	}
};

var button,
	parentEle,
	priceEle,
	items;

/* ================ Approve.ChangeQty ================ */
Approve.ChangeQty = function ChangeQty(qty, ele, lineIndex) {
	// lineIndex needs to be 0 based index based on number of matching buttons and index of the buttons
	var qty = qty || null,
		ele = ele || null,
		lineIndex = (lineIndex !== "" && lineIndex !== -1 && lineIndex !== undefined) ? lineIndex : null;
	if (qty 
		&& ele
	 ) {
		ele = (typeof ele == "string") ? $(ele) : ele;
		if ($(".approve_button_cart:first").length > 0) {
			if (!lineIndex) {
				lineIndex = 0;
			}			priceEle = $(approveOpt.priceEleCart);
			button = $(".approve_button_cart:first"); // this is a cart button
			items = button.attr("items");
			if (items != "") {
				items = JSON.parse(items); // make json obj 
				items[lineIndex].quantity = qty;
				button.attr("items", JSON.stringify(items));
				if ((items[lineIndex].price * qty) >= approveOpt.buttonAmtThreshold) {
					button.show();
				}	else {
					button.hide();
				}
			}

		} else {
			if ($(".approve_button_multi").length > 0) {
				parentEle = ele.closest(approveOpt.parentEleMulti);
				button = parentEle.find(".approve_button_multi:first");
			} else {
				parentEle = ele.closest(approveOpt.parentEleSingle);
				button = parentEle.find(".approve_button_single:first");
			}
			priceEle = $(approveOpt.priceEleSingle);
			if (button[0].hasAttribute("items")) {
				if (!lineIndex) {
					lineIndex = 0;
				}
				items = button.attr("items");
				if (items != "") {
					items = JSON.parse(items); // make json obj 
					items[lineIndex].quantity = qty;
					button.attr("items", JSON.stringify(items));
					if ((items[lineIndex].price * qty) >= approveOpt.buttonAmtThreshold) {
						button.show();
					}	else {
						button.hide();
					}
				}
			} else {
				button.attr("quantity", qty);
				if ((priceEle.html().replace(/[^\d\.]+/g,"") * qty) >= approveOpt.buttonAmtThreshold) {
					button.show();
				} else {
					button.hide();
				}
			}
		}
	}
};

/* ================ Approve.ChangePrice ================ */
Approve.ChangePrice = function ChangePrice(price, ele, lineIndex) {
	// lineIndex needs to be 0 based index based on number of matching buttons and index of the buttons
	var ele = ele || null,
		lineIndex = (lineIndex !== "" && lineIndex !== -1 && lineIndex !== undefined) ? lineIndex : null,
		price = (price !== "" && price !== -1 && price !== undefined) ? price : null;
	if (price 
		&& ele
	) {
		ele = (typeof ele == "string") ? $(ele) : ele;
		if (lineIndex !== null 
			&& lineIndex !== ""
			&& lineIndex !== -1
			&& $(".approve_button_cart:first").length > 0
			) {
			// this is a cart button - need to Change accordingly
			priceEle = $(approveOpt.priceEleCart);
			button = $(".approve_button_cart:first"); // this is a cart button
			items = button.attr("items");
			if (items != "") {
				items = JSON.parse(items); // make json obj 
				items[lineIndex].price = price;
				button.attr("items", JSON.stringify(items));
				if ((price * items[lineIndex].qty) >= approveOpt.buttonAmtThreshold) {
					button.show();
				}	else {
					button.hide();
				}
			}
		} else {
			if ($(".approve_button_multi").length > 0) {
				parentEle = ele.closest(approveOpt.parentEleMulti);
				button = parentEle.find(".approve_button_multi:first");
			} else {
				parentEle = ele.closest(approveOpt.parentEleSingle);
				button = parentEle.find(".approve_button_single:first");
			}
			priceEle = $(approveOpt.priceEleSingle);
			if (button[0].hasAttribute("items")) {
				if (!lineIndex) {
					lineIndex = 0;
				}
				items = button.attr("items");
				if (items != "") {
					items = JSON.parse(items); // make json obj 
					items[lineIndex].price = price;
					button.attr("items", JSON.stringify(items));
					if ((price * items[lineIndex].qty) >= approveOpt.buttonAmtThreshold) {
						button.show();
					}	else {
						button.hide();
					}
				}
			} else {
				button.attr("price", price);
				if ((price * button.attr("quantity")) >= approveOpt.buttonAmtThreshold) {
					button.show();
				}	else {
					button.hide();
				}
			}
		}
	}
};

/* ================ Approve.ChangeModel ================ */
Approve.ChangeModel = function ChangeModel(model, ele, lineIndex) {
	// lineIndex needs to be 0 based index based on number of matching buttons and index of the buttons
	var ele = ele || null,
		lineIndex = (lineIndex !== "" && lineIndex !== -1 && lineIndex !== undefined) ? lineIndex : null,
		model = (model !== "" && model !== -1 && model !== undefined) ? model : null;
	if (model 
		&& ele
	) {
		ele = (typeof ele == "string") ? $(ele) : ele;
		if (lineIndex !== null 
			&& lineIndex !== ""
			&& lineIndex !== -1
			&& $(".approve_button_cart:first").length > 0
		) {
			if (!lineIndex) {
				lineIndex = 0;
			}
			priceEle = $(approveOpt.priceEleCart);
			button = $(".approve_button_cart:first"); // this is a cart button
			items = button.attr("items");
			if (items != "") {
				items = JSON.parse(items); // make json obj 
				items[lineIndex].model = model;
				button.attr("items", JSON.stringify(items));
			}
		} else {
			if ($(".approve_button_multi").length > 0) {
				parentEle = ele.closest(approveOpt.parentEleMulti);
				button = parentEle.find(".approve_button_multi:first");
			} else {
				parentEle = ele.closest(approveOpt.parentEleSingle);
				button = parentEle.find(".approve_button_single:first");
			}
			priceEle = $(approveOpt.priceEleSingle);
			if (button[0].hasAttribute("items")) {
				items = button.attr("items");
				if (items != "") {
					items = JSON.parse(items); // make json obj 
					items[lineIndex].model = model;
					button.attr("items", JSON.stringify(items));
				}
			} else {
				button.attr("model", model);
			}
		}
	}
};

/* ================ Approve.ChangeType ================ */
Approve.ChangeType = function ChangeType(type, ele, lineIndex) {
	// lineIndex needs to be 0 based index based on number of matching buttons and index of the buttons
	var ele = ele || null,
		lineIndex = (lineIndex !== "" && lineIndex !== -1 && lineIndex !== undefined) ? lineIndex : null,
		type = (type !== "" && type !== -1 && type !== undefined) ? type : null;
	if (type 
		&& ele
	 ) {
		ele = (typeof ele == "string") ? $(ele) : ele;
		if (lineIndex !== null 
			&& lineIndex !== ""
			&& lineIndex !== -1
			&& $(".approve_button_cart:first").length > 0
		) {
			// this is a cart button - need to Change accordingly
			priceEle = $(approveOpt.priceEleCart);
			button = $(".approve_button_cart:first"); // this is a cart button
			items = button.attr("items");
			if (items != "") {
				items = JSON.parse(items); // make json obj 
				items[lineIndex].type = type;
				button.attr("items", JSON.stringify(items));
			}
		} else {
			if ($(".approve_button_multi").length > 0) {
				parentEle = ele.closest(approveOpt.parentEleMulti);
				button = parentEle.find(".approve_button_multi:first");
			} else {
				parentEle = ele.closest(approveOpt.parentEleSingle);
				button = parentEle.find(".approve_button_single:first");
			}
			priceEle = $(approveOpt.priceEleSingle);
			if (button[0].hasAttribute("items")) {
				if (!lineIndex) {
					lineIndex = 0;
				}
				items = button.attr("items");
				if (items != "") {
					items = JSON.parse(items); // make json obj 
					items[lineIndex].type = type;
					button.attr("items", JSON.stringify(items));	
				}
			} else {
				button.attr("type", type);
			}
		}
	}
};

var jqcheck = function (run_callback) {
	if (window.jQuery) { run_callback(); }
	else { setTimeout(function() { jqcheck(run_callback) }, 50); }
};
if (window.jQuery) { Approve.Init(); } 
else { setTimeout(function() { jqcheck(Approve.Init); }, 50); }
