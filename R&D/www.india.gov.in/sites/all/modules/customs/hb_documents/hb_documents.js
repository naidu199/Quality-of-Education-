function toggleHBDocumentSettings(unqid) {
  unqfrmid = jQuery("#" + unqid + " form").attr("id");

  if (jQuery("#" + unqfrmid + " .form-item-tname").css("display") == "none") {
    if (jQuery("#" + unqid + " .hbDocSettings").css("display") == "none") {
      jQuery("#" + unqid + " .hbDocSettings").show();
      jQuery("#" + unqid + " .hbDocListing").hide();
      jQuery("#" + unqfrmid + " .form-item-state").show();
      jQuery("#" + unqfrmid + " .form-item-order-by").show();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    } else {
      jQuery("#" + unqid + " .hbDocSettings").hide();
      jQuery("#" + unqid + " .hbDocListing").show();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    }
  } else {
    jQuery("#" + unqid + " .hbDocListing").hide();
    jQuery("#" + unqfrmid + " .form-item-state").show();
    jQuery("#" + unqfrmid + " .form-item-order-by").show();
    jQuery("#" + unqfrmid + " .form-item-tname").hide();
  }
}

function toggleHBDocumentSearch(unqid) {
  unqfrmid = jQuery("#" + unqid + " form").attr("id");
  if (jQuery("#" + unqfrmid + " .form-item-state").css("display") == "none") {
    if (jQuery("#" + unqid + " .hbDocSettings").css("display") == "none") {
      jQuery("#" + unqid + " .hbDocSettings").show();
      jQuery("#" + unqid + " .hbDocListing").hide();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").show();
    } else {
      jQuery("#" + unqid + " .hbDocSettings").hide();
      jQuery("#" + unqid + " .hbDocListing").show();
      jQuery("#" + unqfrmid + " .form-item-state").hide();
      jQuery("#" + unqfrmid + " .form-item-order-by").hide();
      jQuery("#" + unqfrmid + " .form-item-tname").hide();
    }
  } else {
    jQuery("#" + unqid + " .hbDocListing").hide();
    jQuery("#" + unqfrmid + " .form-item-state").hide();
    jQuery("#" + unqfrmid + " .form-item-order-by").hide();
    jQuery("#" + unqfrmid + " .form-item-tname").show();
  }
}

jQuery(document).ready(function () {
  jQuery(".hbDocListing").show();
  jQuery(".hbDocSettings").hide();
  jQuery(".hbDocSettings .form-item-state").hide();
  jQuery(".hbDocSettings .form-item-order-by").hide();
  jQuery(".hbDocSettings .form-item-tname").hide();

  jQuery(".persHBDoc").live("click", function (event) {
    event.preventDefault();
    unqid = jQuery(this).parents().eq(3).attr("id"); // find unique id of elcosing div, there may be multiple blocks of same type
    toggleHBDocumentSettings(unqid);
  });

  jQuery(".srchHBDoc").live("click", function (event) {
    event.preventDefault();
    unqid = jQuery(this).parents().eq(3).attr("id"); // find unique id of elcosing div, there may be multiple blocks of same type
    toggleHBDocumentSearch(unqid);
  });
});

function toggleHBDocumentsResult() {
  jQuery(".form-item-state").hide();
  jQuery(".form-item-order-by").hide();
  jQuery(".form-item-tname").hide();
  jQuery(".hbDocSettings").hide();
  jQuery(".hbDocListing").show();
  jQuery(".hbItemList").show(); // for all boxes show listing if their search form is opened
  jQuery(".hbFiltering").hide();
}

(function ($) {
  Drupal.behaviors.hb_documents = {
    attach: function (context, settings) {
      // Your Javascript code goes here
      $(document).ready(function () {
        $.fn.hbShowDocListing = function (data, state, order_by, title) {
          //alert(data);
          //alert(state);
          $(".hbDocListing").html(data);
          $(".hb-doc-state-bx").val(state); // set all box values to same in case of multiple boxes
          $(".hb-doc-order_by-bx").val(order_by);
          $(".hb-doc-tname-bx").val(title);
          toggleHBDocumentsResult();
        };
      });
    },
  };
})(jQuery);
