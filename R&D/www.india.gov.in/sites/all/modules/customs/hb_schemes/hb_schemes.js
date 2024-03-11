function toggleHBSchemeSettings(unqid) {
  unqfrmid = jQuery("#" + unqid + " form").attr("id");

  if (jQuery("#" + unqfrmid + " .form-item-tname").css("display") == "none") {
    if (jQuery("#" + unqid + " .hbSchSettings").css("display") == "none") {
      jQuery("#" + unqid + " .hbSchSettings").show();
      jQuery("#" + unqid + " .hbSchListing").hide();
      jQuery("#" + unqfrmid + " .form-item-state").show();
      jQuery("#" + unqfrmid + " .form-item-order-by").show();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    } else {
      jQuery("#" + unqid + " .hbSchSettings").hide();
      jQuery("#" + unqid + " .hbSchListing").show();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    }
  } else {
    jQuery("#" + unqid + " .hbSchListing").hide();
    jQuery("#" + unqfrmid + " .form-item-state").show();
    jQuery("#" + unqfrmid + " .form-item-order-by").show();
    jQuery("#" + unqfrmid + " .form-item-tname").hide();
  }
}

function toggleHBSchemeSearch(unqid) {
  unqfrmid = jQuery("#" + unqid + " form").attr("id");
  if (jQuery("#" + unqfrmid + " .form-item-state").css("display") == "none") {
    if (jQuery("#" + unqid + " .hbSchSettings").css("display") == "none") {
      jQuery("#" + unqid + " .hbSchSettings").show();
      jQuery("#" + unqid + " .hbSchListing").hide();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").show();
    } else {
      jQuery("#" + unqid + " .hbSchSettings").hide();
      jQuery("#" + unqid + " .hbSchListing").show();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    }
  } else {
    jQuery("#" + unqid + " .hbSchListing").hide();
    jQuery("#" + unqfrmid + " .form-item-state").hide();
    jQuery("#" + unqfrmid + " .form-item-order-by").hide();
    jQuery("#" + unqfrmid + " .form-item-tname").show();
  }
}

jQuery(document).ready(function () {
  jQuery(".hbSchListing").show();
  jQuery(".hbSchSettings").hide();
  jQuery(".hbSchSettings .form-item-state").hide();
  jQuery(".hbSchSettings .form-item-order-by").hide();
  jQuery(".hbSchSettings .form-item-tname").hide();

  jQuery(".persHBSch").live("click", function (event) {
    event.preventDefault();
    unqid = jQuery(this).parents().eq(3).attr("id"); // find unique id of elcosing div, there may be multiple blocks of same type
    toggleHBSchemeSettings(unqid);
  });

  jQuery(".srchHBSch").live("click", function (event) {
    event.preventDefault();
    unqid = jQuery(this).parents().eq(3).attr("id"); // find unique id of elcosing div, there may be multiple blocks of same type
    toggleHBSchemeSearch(unqid);
  });
});

function toggleHBSchemesResult() {
  jQuery(".form-item-state").hide();
  jQuery(".form-item-order-by").hide();
  jQuery(".form-item-tname").hide();
  jQuery(".hbSchSettings").hide();
  jQuery(".hbSchListing").show();
  jQuery(".hbItemList").show(); // for all boxes show listing if their search form is opened
  jQuery(".hbFiltering").hide(); // for all boxes hide form if their search form is opened
}

(function ($) {
  Drupal.behaviors.hb_schemes = {
    attach: function (context, settings) {
      // Your Javascript code goes here
      $(document).ready(function () {
        $.fn.hbShowSchListing = function (data, state, order_by, title) {
          //alert(data);
          //alert(state);
          $(".hbSchListing").html(data);
          $(".hb-sch-state-bx").val(state); // set all box values to same in case of multiple boxes
          $(".hb-sch-order_by-bx").val(order_by);
          $(".hb-sch-tname-bx").val(title);
          toggleHBSchemesResult();
        };
      });
    },
  };
})(jQuery);
