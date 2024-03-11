(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $("#captcha_image").attr("tabindex", 0);
        $(".popup_btn").attr("tabindex", 0);
        $(
          ".pane-content .attachment .pane-content .view-content span:nth-child(2) a"
        ).text("All");
        $("form").attr("autocomplete", "off");
        var i = 1;
        $("#queries a").each(function () {
          var src = jQuery(this).text();
          jQuery(this).attr(
            "href",
            base_url + "/gsearch?s=" + src.replace(" ", "+") + "&op=Search"
          );
          if (
            jQuery(this).text() == "search - keyword, phrase" ||
            jQuery(this).text() ==
              "à¤–à¥‹à¤œà¥‡à¤‚ - à¤–à¥‹à¤œà¤¶à¤¬à¥à¤¦, à¤µà¤¾à¤•à¥à¤¯à¤¾à¤‚à¤¶"
          ) {
            jQuery(this).hide();
          } else {
            i++;
            if (i > 5) {
              jQuery(this).css("display", "none");
            }
          }
        });
        if (jQuery("#edit-jurisdiction").val() == "180283") {
          jQuery("#edit-ministry-wrapper").show();
          jQuery("#edit-field-st-dept-tid-wrapper").hide();
        } else if (jQuery("#edit-jurisdiction").val() == "180285") {
          jQuery("#edit-field-st-dept-tid-wrapper").show();
          jQuery("#edit-ministry-wrapper").hide();
        } else {
          jQuery("#edit-field-st-dept-tid-wrapper").hide();
          jQuery("#edit-ministry-wrapper").hide();
        }
        jQuery("#edit-jurisdiction").change(function () {
          if (jQuery(this).val() == "180283") {
            jQuery("#edit-ministry-wrapper").show();
            jQuery("#edit-field-st-dept-tid-wrapper").hide();
          } else if (jQuery(this).val() == "180285") {
            jQuery("#edit-field-st-dept-tid-wrapper").show();
            jQuery("#edit-ministry-wrapper").hide();
          } else {
            jQuery("#edit-field-st-dept-tid-wrapper").hide();
            jQuery("#edit-ministry-wrapper").hide();
          }
        });
      });
    },
  };
})(jQuery);

/********************** Function to submit the metadata filtering form ***************************/

$(document).ready(function () {
  $("#edit-submit-advance-metadata-search").attr(
    "name",
    "Advance search Submit Botton"
  );
  $("#views-exposed-form-metadata-block-3").attr("action", "");
  $("#views-exposed-form-metadata-block-3 #edit-sort-by").change(function () {
    $("#views-exposed-form-metadata-block-3").submit();
  });

  if (
    document.getElementById("quicktabs-_none_") ||
    document.getElementById("quicktabs-quicktabs-container-home_news_hindi")
  ) {
    refreshNews();
    var timer = setInterval(refreshNews, 900000);
  }
  var n_time;
  var lang;
  function refreshNews() {
    var d = new Date();
    n_time = d.getTime();
    if (lang == "hi") {
      var urlair = "/hi/news_feeds?rand=" + n_time;
    } else {
      var urlair = "/news_feeds?rand=" + n_time;
    }

    $.ajax({
      url: urlair,
      dataType: "html",
      success: function (res) {
        if (lang == "hi") {
          $("#quicktabs-tabpage-_none_-0").html(res);
        } else {
          $("#quicktabs-tabpage-_none_-0").html(res);
        }
      },
    });
  }
});

/* function for the homepage accorgion **/

$(document).ready(function () {
  /* Open the first section on load */

  $(".accordion_body").hide();
  $(".pane-metadata .pane-title.block-title").append(
    '<span class="plusminus">+</span>'
  );
  $("#mini-panel-most_view_for_home .pane-metadata:first").addClass("open");
  var openOnLoad = $(
    "#mini-panel-most_view_for_home .pane-metadata.open .collapsing-section"
  );
  $(openOnLoad).slideDown();
  $("#mini-panel-most_view_for_home .open h2 .plusminus").html("-");
  $("#mini-panel-most_view_for_home .pane-title").on("focus", function () {
    if (!$(this).data("mouseDown")) $(this).click();
  });

  $("#mini-panel-most_view_for_home .pane-title").on("mousedown", function () {
    $(this).data("mouseDown", true);
  });

  $("#mini-panel-most_view_for_home .pane-title").on("mouseup", function () {
    $(this).removeData("mouseDown");
  });

  $("#mini-panel-most_view_for_home h2.pane-title").live("click", function (e) {
    //close the prev section & open the newly click
    $("#mini-panel-most_view_for_home .pane-metadata").removeClass("open");
    $(".collapsing-section").slideUp(); //Side up all sections that are open & remove their open class
    if ($(".accordion_body").is(":visible")) {
      $(".pane-metadata .pane-title.block-title .plusminus").html("+");
    }
    //var sectionToOpen = $(this).next('.collapsing-section');
    $(this).parent().parent().addClass("open");
    $("#mini-panel-most_view_for_home .open .collapsing-section").slideDown();
    $(this).children(".pane-metadata.open .pane-title .plusminus").html("-");
  });
});

/*

* Cookies Set Get Delete Definations

*/

// JavaScript Document
//Style Sheet Switcher version 1.1 Oct 10th, 2006
//Author: Dynamic Drive: http://www.dynamicdrive.com
//Usage terms: http://www.dynamicdrive.com/notice.htm

var manual_or_random = "manual"; //"manual" or "random"
var randomsetting = "3 days"; //"eachtime", "sessiononly", or "x days (replace x with desired integer)". Only applicable if mode is random.

//////No need to edit beyond here//////////////

function getCookie(Name) {
  var re = new RegExp(Name + "=[^;]+", "i"); //construct RE to search for target name/value pair
  if (document.cookie.match(re))
    //if cookie found
    return document.cookie.match(re)[0].split("=")[1]; //return its value
  return null;
}

function setCookie(name, value, days) {
  var expireDate = new Date();
  //set "expstring" to either future or past date, to set or delete cookie, respectively
  var expstring =
    typeof days != "undefined"
      ? expireDate.setDate(expireDate.getDate() + parseInt(days))
      : expireDate.setDate(expireDate.getDate() - 5);
  document.cookie =
    name + "=" + value + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function deleteCookie(name) {
  setCookie(name, "moot");
}

function setStylesheet(title, randomize) {
  //Main stylesheet switcher function. Second parameter if defined causes a random alternate stylesheet (including none) to be enabled
  var i,
    cacheobj,
    altsheets = [""];
  for (i = 0; (cacheobj = document.getElementsByTagName("link")[i]); i++) {
    if (
      cacheobj.getAttribute("rel").toLowerCase() == "alternate stylesheet" &&
      cacheobj.getAttribute("title")
    ) {
      //if this is an alternate stylesheet with title

      cacheobj.disabled = true;
      altsheets.push(cacheobj); //store reference to alt stylesheets inside array
      if (cacheobj.getAttribute("title") == title)
        //enable alternate stylesheet with title that matches parameter
        cacheobj.disabled = false; //enable chosen style sheet
    }
  }
  if (typeof randomize != "undefined") {
    //if second paramter is defined, randomly enable an alt style sheet (includes non)
    var randomnumber = Math.floor(Math.random() * altsheets.length);
    altsheets[randomnumber].disabled = false;
  }
  jQuery.each(jQuery.browser, function (i, val) {
    // alert(i+"==="+val);
    if (i == "safari" && val == true) {
      // alert(i);
      if (title == "change") {
        $("link[title=change]").attr("rel", "stylesheet");
        $("link[title=change]").attr(
          "href",
          "/sites/all/themes/adaptivetheme/npi_adaptive/css/override.css"
        );
      } else {
        $("link[title=change]").attr("rel", "alternate stylesheet");
        $("link[title=change]").attr(
          "href",
          "/sites/all/themes/adaptivetheme/npi_adaptive/css/normal.css"
        );
      }
    }
  });
  return typeof randomize != "undefined" && altsheets[randomnumber] != ""
    ? altsheets[randomnumber].getAttribute("title")
    : ""; //if in "random" mode, return "title" of randomly enabled alt stylesheet
}

function chooseStyle(styletitle, days) {
  //Interface function to switch style sheets plus save "title" attr of selected stylesheet to cookie
  if (document.getElementById) {
    if (styletitle == "change") {
      if (getCookie("mysheet") != "change") {
        setCookie("theme", getCookie("mysheet"), days);
      }
      setCookie("mysheet", styletitle, days);
      setStylesheet(styletitle);
    } else {
      if (styletitle == "none") {
        if (getCookie("theme") != "none") {
          setCookie("mysheet", getCookie("theme"), days);
          setStylesheet(getCookie("theme"));
        } else {
          setCookie("mysheet", styletitle, -1);
          setCookie("theme", getCookie("mysheet"), -1);
        }
      } else {
        setCookie("mysheet", styletitle, days);
        setCookie("theme", getCookie("mysheet"), days);
        setStylesheet(styletitle);
      }
    }
  }
}
function getActiveStyleSheet() {
  var styleTag;
  var styleSwitch;
  var styleTitle = "";
  for (var i = 0; (styleTag = document.getElementsByTagName("link")[i]); i++) {
    if (styleTag.getAttribute("title") == "switch") {
      styleSwitch = styleTag;
    }
  }
  for (var i = 0; (styleTag = document.getElementsByTagName("link")[i]); i++) {
    if (
      styleTag.getAttribute("rel").indexOf("alternate stylesheet") != -1 &&
      styleTag.getAttribute("title")
    ) {
      if (styleTag.getAttribute("href") == styleSwitch.getAttribute("href ")) {
        styleTitle = styleTag.getAttribute("title");
      }
    }
  }
  return styleTitle;
}
function indicateSelected(element) {
  //Optional function that shows which style sheet is currently selected within group of radio buttons or select menu
  if (
    selectedtitle != null &&
    (element.type == undefined || element.type == "select-one")
  ) {
    //if element is a radio button or select menu
    var element = element.type == "select-one" ? element.options : element;
    for (var i = 0; i < element.length; i++) {
      if (element[i].value == selectedtitle) {
        //if match found between form element value and cookie value
        if (element[i].tagName == "OPTION")
          //if this is a select menu
          element[i].selected = true;
        //else if it's a radio button
        else element[i].checked = true;
        break;
      }
    }
  }
}

if (manual_or_random == "manual") {
  //IF MANUAL MODE
  var selectedtitle = getCookie("mysheet");
  if (document.getElementById && selectedtitle != null)
    //load user chosen style sheet from cookie if there is one stored
    setStylesheet(selectedtitle);
} else if (manual_or_random == "random") {
  //IF AUTO RANDOM MODE
  if (randomsetting == "eachtime") setStylesheet("", "random");
  else if (randomsetting == "sessiononly") {
    //if "sessiononly" setting
    if (getCookie("mysheet_s") == null)
      //if "mysheet_s" session cookie is empty
      document.cookie =
        "mysheet_s=" +
        setStylesheet("", "random") +
        "; path=/"; //activate random alt stylesheet while remembering its "title" value
    else setStylesheet(getCookie("mysheet_s")); //just activate random alt stylesheet stored in cookie
  } else if (randomsetting.search(/^[1-9]+ days/i) != -1) {
    //if "x days" setting
    if (
      getCookie("mysheet_r") == null ||
      parseInt(getCookie("mysheet_r_days")) != parseInt(randomsetting)
    ) {
      //if "mysheet_r" cookie is empty or admin has changed number of days to persist in "x days" variable
      setCookie(
        "mysheet_r",
        setStylesheet("", "random"),
        parseInt(randomsetting)
      ); //activate random alt stylesheet while remembering its "title" value
      setCookie("mysheet_r_days", randomsetting, parseInt(randomsetting)); //Also remember the number of days to persist per the "x days" variable
    } else setStylesheet(getCookie("mysheet_r")); //just activate random alt stylesheet stored in cookie
  }
}
/*Function for add to favourite starts here*/
function add_to_favourites() {
  if (document.all) window.external.AddFavorite(location.href, document.title);
  else if (window.sidebar)
    window.sidebar.addPanel(document.title, location.href, " ");
  else if (window.opera && window.print) {
    alert(
      "Please use your browser's bookmarking facility to create a bookmark"
    );
  } else if (window.chrome) {
    alert(
      "Please use your browser's bookmarking facility to create a bookmark"
    );
  }
}

var today = new Date();

var expiry = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);

function _getCookieVal(offset) {
  var endstr = document.cookie.indexOf(";", offset);

  if (endstr == -1) {
    endstr = document.cookie.length;
  }

  return unescape(document.cookie.substring(offset, endstr));
}

function _getCookie(name) {
  var arg = name + "=";

  var alen = arg.length;

  var clen = document.cookie.length;

  var i = 0;

  while (i < clen) {
    var j = i + alen;

    if (document.cookie.substring(i, j) == arg) {
      return _getCookieVal(j);
    }

    i = document.cookie.indexOf(" ", i) + 1;

    if (i == 0) break;
  }

  return null;
}

function deleteCookie(name, path, domain) {
  if (_getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? "; path=" + path : "") +
      (domain ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function _setCookie(name, value, expires, path, domain, secure) {
  document.cookie =
    name +
    "=" +
    escape(value) +
    (expires ? "; expires=" + expires.toGMTString() : "") +
    (path ? "; path=" + path : "") +
    (domain ? "; domain=" + domain : "") +
    (secure ? "; secure" : "");
}

/************** Set the metadata search cockies ****************/
function setSearchCookie(name, value, days) {
  var expireDate = new Date();
  //set "expstring" to either future or past date, to set or delete cookie, respectively
  var expstring =
    typeof days != "undefined"
      ? expireDate.setDate(expireDate.getDate() + parseInt(days))
      : expireDate.setDate(expireDate.getDate() - 5);
  document.cookie =
    name + "=" + value + "; expires=" + expireDate.toGMTString() + "; path=/";
}

/************** Get the metadata search cockies ****************/

function getSearchCookie(Name) {
  var re = new RegExp(Name + "=[^;]+", "i"); //construct RE to search for target name/value pair
  if (document.cookie.match(re))
    //if cookie found
    return document.cookie.match(re)[0].split("=")[1]; //return its value
  return null;
}

/********* Font size resize **********/
function set_font_size(fontType) {
  if (fontType == "increase") {
    if (fontSize < 116) {
      fontSize = parseInt(fontSize) + 8;
    }
  } else if (fontType == "decrease") {
    if (fontSize > 84) {
      fontSize = parseInt(fontSize) - 8;
    }
  } else {
    fontSize = 100;
  }
  _setCookie("fontSize", fontSize);
  $("#main").css("font-size", fontSize + "%");
  //$("#template_three_column").css("font-size",fontSize + "%");
}

/***** Switch Css ******/

// JavaScript Document
//Style Sheet Switcher version 1.1 Oct 10th, 2006
//Author: Dynamic Drive: http://www.dynamicdrive.com
//Usage terms: http://www.dynamicdrive.com/notice.htm

var manual_or_random = "manual"; //"manual" or "random"
var randomsetting = "3 days"; //"eachtime", "sessiononly", or "x days (replace x with desired integer)". Only applicable if mode is random.

//////No need to edit beyond here//////////////

function getCookie(Name) {
  var re = new RegExp(Name + "=[^;]+", "i"); //construct RE to search for target name/value pair
  if (document.cookie.match(re))
    //if cookie found
    return document.cookie.match(re)[0].split("=")[1]; //return its value
  return null;
}

function setCookie(name, value, days) {
  var expireDate = new Date();
  var expstring =
    typeof days != "undefined"
      ? expireDate.setDate(expireDate.getDate() + parseInt(days))
      : expireDate.setDate(expireDate.getDate() - 5);
  document.cookie =
    name + "=" + value + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function deleteCookie(name) {
  setCookie(name, "moot");
}

function setStylesheet(title, randomize) {
  //Main stylesheet switcher function. Second parameter if defined causes a random alternate stylesheet (including none) to be enabled
  var i,
    cacheobj,
    altsheets = [""];
  var k = document.getElementsByTagName("link");
  for (i = 0; (cacheobj = document.getElementsByTagName("link")[i]); i++) {
    if (
      cacheobj.getAttribute("rel").toLowerCase() == "alternate stylesheet" &&
      cacheobj.getAttribute("title")
    ) {
      //if this is an alternate stylesheet with title

      cacheobj.disabled = true;
      altsheets.push(cacheobj); //store reference to alt stylesheets inside array
      if (cacheobj.getAttribute("title") == title)
        //enable alternate stylesheet with title that matches parameter
        cacheobj.disabled = false; //enable chosen style sheet
    }
  }
  if (typeof randomize != "undefined") {
    //if second paramter is defined, randomly enable an alt style sheet (includes non)
    var randomnumber = Math.floor(Math.random() * altsheets.length);
    altsheets[randomnumber].disabled = false;
  }
  jQuery.each(jQuery.browser, function (i, val) {
    //alert(i+"==="+val);
    if (i == "safari" && val == true) {
      // alert(i);
      if (title == "change") {
        $("link[title=change]").attr("rel", "stylesheet");
        $("link[title=change]").attr(
          "href",
          "/sites/all/themes/adaptivethemem/npi_adaptive/css/override.css"
        );
      } else {
        $("link[title=change]").attr("rel", "alternate stylesheet");
        $("link[title=change]").attr(
          "href",
          "/sites/all/themes/adaptivethemem/npi_adaptive/css/normal.css"
        );
      }
    }
  });
  return typeof randomize != "undefined" && altsheets[randomnumber] != ""
    ? altsheets[randomnumber].getAttribute("title")
    : ""; //if in "random" mode, return "title" of randomly enabled alt stylesheet
}

function getActiveStyleSheet() {
  var styleTag;
  var styleSwitch;
  var styleTitle = "";
  for (var i = 0; (styleTag = document.getElementsByTagName("link")[i]); i++) {
    if (styleTag.getAttribute("title") == "switch") {
      styleSwitch = styleTag;
    }
  }
  for (var i = 0; (styleTag = document.getElementsByTagName("link")[i]); i++) {
    if (
      styleTag.getAttribute("rel").indexOf("alternate stylesheet") != -1 &&
      styleTag.getAttribute("title")
    ) {
      if (styleTag.getAttribute("href") == styleSwitch.getAttribute("href ")) {
        styleTitle = styleTag.getAttribute("title");
      }
    }
  }
  return styleTitle;
}
function indicateSelected(element) {
  //Optional function that shows which style sheet is currently selected within group of radio buttons or select menu
  if (
    selectedtitle != null &&
    (element.type == undefined || element.type == "select-one")
  ) {
    //if element is a radio button or select menu
    var element = element.type == "select-one" ? element.options : element;
    for (var i = 0; i < element.length; i++) {
      if (element[i].value == selectedtitle) {
        //if match found between form element value and cookie value
        if (element[i].tagName == "OPTION")
          //if this is a select menu
          element[i].selected = true;
        //else if it's a radio button
        else element[i].checked = true;
        break;
      }
    }
  }
}

if (manual_or_random == "manual") {
  //IF MANUAL MODE
  var selectedtitle = getCookie("mysheet");
  if (document.getElementById && selectedtitle != null)
    //load user chosen style sheet from cookie if there is one stored
    setStylesheet(selectedtitle);
} else if (manual_or_random == "random") {
  //IF AUTO RANDOM MODE
  if (randomsetting == "eachtime") setStylesheet("", "random");
  else if (randomsetting == "sessiononly") {
    //if "sessiononly" setting
    if (getCookie("mysheet_s") == null)
      //if "mysheet_s" session cookie is empty
      document.cookie =
        "mysheet_s=" +
        setStylesheet("", "random") +
        "; path=/"; //activate random alt stylesheet while remembering its "title" value
    else setStylesheet(getCookie("mysheet_s")); //just activate random alt stylesheet stored in cookie
  } else if (randomsetting.search(/^[1-9]+ days/i) != -1) {
    //if "x days" setting
    if (
      getCookie("mysheet_r") == null ||
      parseInt(getCookie("mysheet_r_days")) != parseInt(randomsetting)
    ) {
      //if "mysheet_r" cookie is empty or admin has changed number of days to persist in "x days" variable
      setCookie(
        "mysheet_r",
        setStylesheet("", "random"),
        parseInt(randomsetting)
      ); //activate random alt stylesheet while remembering its "title" value
      setCookie("mysheet_r_days", randomsetting, parseInt(randomsetting)); //Also remember the number of days to persist per the "x days" variable
    } else setStylesheet(getCookie("mysheet_r")); //just activate random alt stylesheet stored in cookie
  }
}

/********* Font size inslition **********/

$(document).ready(function () {
  if (_getCookie("fontSize") != null) {
    var fontSize = _getCookie("fontSize");
  } else {
    var fontSize = 100;
  }
  //alert(fontSize);
  $("#main").css("font-size", fontSize + "%");
});

function formclose(nid) {
  $("#metadata_tags_" + nid).html("");
}

function comment_formclose(nid) {
  $("#comments-wrapper-" + nid).html("");
}

/***************** Condition for the stricky section ********************/
$(document).ready(function () {
  if ($("#level3-leftside-bar").length) {
    var s = $(".not-front .region.region-two-33-66-first .topic");
    var pos = s.position();
    $(window).scroll(function () {
      var windowpos = $(window).scrollTop();
      if (windowpos > pos.top) {
        s.addClass("sticky");
      } else {
        s.removeClass("sticky");
      }
    });

    $(window).scroll(function () {
      if (
        $(document).scrollTop() +
          $(".region.region-two-33-66-first").height() +
          $(window).height() >=
        $(".nodes").position().top -
          $(".region.region-two-33-66-first").height()
      ) {
        $(".region.region-two-33-66-first .topic").addClass("stick_abs");
      } else {
        $(".region.region-two-33-66-first .topic").removeClass("stick_abs");
      }
    });
  }
});

$(document).ready(function () {
  $(".level3_buttons .tags_btn form input[type='submit']").click(function () {
    $(".comment_popup").each(function () {
      $(".comment_popup .metadata_feedback").html("");
      $(".comment_popup .metadata_tags").html("");
    });
  });
  $(".level3_buttons .comment_btn form input[type='submit']").click(
    function () {
      $(".comment_popup").each(function () {
        $(".comment_popup .metadata_feedback").html("");
        $(".comment_popup .metadata_tags").html("");
      });
    }
  );
});

$(document).ready(function () {
  $("#advsearchbtn").click(function () {
    $("#light").slideToggle();
    if ($("#advsearchbtn").attr("class") == "toggle_imga") {
      $("#advsearchbtn").removeClass("toggle_imga");
    } else {
      $("#advsearchbtn").addClass("toggle_imga");
    }
  });
  $(
    "#main,.sliderportion,#footer,.header_middle,.top_head,.heraderbtm_col2"
  ).click(function () {
    $("#light").hide();
  });
  $(".page-advance-search #light").slideToggle();
});

/*******JS to the menu toggle for the mobile *********/
$(document).ready(function () {
  $(".mobileNav").click(function () {
    if ($("#nav").hasClass("vb")) {
      $("#nav").slideUp();
      $("#nav").removeClass("vb");
    } else {
      $("#nav").slideDown();
      $("#nav").addClass("vb");
    }
  });
  $(".mobilebtmNav").click(function () {
    if ($("#footertop ul").hasClass("visible")) {
      $("#footertop ul").slideUp();
      $("#footertop ul").removeClass("visible");
    } else {
      $("#footertop ul").slideDown();
      $("#footertop ul").addClass("visible");
      if ($(".mobilebtmNav #menutext").attr("class") == "toggle_img") {
        $(".mobilebtmNav #menutext").removeClass("toggle_img");
      } else {
        $(".mobilebtmNav #menutext").addClass("toggle_img");
      }
    }
  });

  $(document).click(function (e) {
    if (
      $("#footertop ul").hasClass("visible") &&
      !$("#footertop ul").is(e.target) &&
      !$(".mobilebtmNav").is(e.target) &&
      !$("#menutext").is(e.target) &&
      !$(".spanoutetr").is(e.target)
    ) {
      e.stopPropagation();
      $("#footertop ul").slideUp();
      $("#footertop ul").removeClass("visible");
    }

    if (
      $("#nav").hasClass("vb") &&
      !$(".mobileNav").is(e.target) &&
      !$("#nav").is(e.target) &&
      !$(".mobileNav span ").is(e.target)
    ) {
      e.stopPropagation();
      $("#nav").slideUp();
      $("#nav").removeClass("vb");
    }
  });
});

$(document).ready(function () {
  /**************** Function to hide show schemes dropdown *******************/
  $(
    ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-jurisdiction"
  ).change(function () {
    var thisvalue = $(this).val();
    if (thisvalue == 6075) {
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-state-wrapper"
      ).hide();
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-ministry-wrapper"
      ).show();
    } else if (thisvalue == 6077) {
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-state-wrapper"
      ).show();
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-ministry-wrapper"
      ).hide();
    } else {
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-state-wrapper"
      ).hide();
      $(
        ".view-id-metadata_for_schemes #views-exposed-form-metadata-for-schemes-page-1 #edit-ministry-wrapper"
      ).hide();
    }
  });
});

(function ($) {
  Drupal.behaviors.npi_adaptive = {
    attach: function (context, settings) {
      jQuery(document).ready(function () {
        var option_serlect = jQuery(
          ".recommend-form-data .form-item-service-by .form-select option:selected"
        ).val();
        if (option_serlect == 159433) {
          jQuery(".recommend-form-data .form-item-service-state").css(
            "display",
            "none"
          );
          jQuery(".recommend-form-data .form-item-service-ministry").css(
            "display",
            "block"
          );
        } else if (option_serlect == 159434) {
          jQuery(".recommend-form-data .form-item-service-ministry").css(
            "display",
            "none"
          );
          jQuery(".recommend-form-data .form-item-service-state").css(
            "display",
            "block"
          );
        } else {
          jQuery(".recommend-form-data .form-item-service-ministry").css(
            "display",
            "none"
          );
          jQuery(".recommend-form-data .form-item-service-state").css(
            "display",
            "none"
          );
        }
        jQuery(
          ".recommend-form-data .form-item-service-by .form-select"
        ).change(function () {
          var option = jQuery(this).find("option:selected").val();
          if (option == 159433) {
            jQuery(".recommend-form-data .form-item-service-state").css(
              "display",
              "none"
            );
            jQuery(".recommend-form-data .form-item-district-list").css(
              "display",
              "none"
            );
            jQuery(".recommend-form-data .form-item-service-ministry").css(
              "display",
              "block"
            );
          } else if (option == 159434) {
            jQuery(".recommend-form-data .form-item-service-ministry").css(
              "display",
              "none"
            );
            jQuery(".recommend-form-data .form-item-service-state").css(
              "display",
              "block"
            );
          } else {
            jQuery(".recommend-form-data .form-item-service-ministry").css(
              "display",
              "none"
            );
            jQuery(".recommend-form-data .form-item-service-state").css(
              "display",
              "none"
            );
          }
        });
      });

      $(document).ready(function () {
        if ($(".page-calendar .pager .date-prev a").length) {
          var href = $(".page-calendar .pager .date-prev a").attr("href");
          var hrefArray = href.split("?");
          $(".page-calendar .pager .date-prev a").attr(
            "href",
            hrefArray[0] + "?date=" + prevMonth
          );
          $(".page-calendar .pager .date-next a").attr(
            "href",
            hrefArray[0] + "?date=" + nextMonth
          );
        }

        ////////////////////////////////////////
        $(".maincal .calendar-calendar table tbody tr .redCal").each(
          function () {
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("red");
            var Id = $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .attr("id");
            var newval = Id.slice(0, -2);
            var upper_cls = newval + "-date-box";
            $("#" + upper_cls).addClass("red");
          }
        );
        $(".maincal .calendar-calendar table tbody tr .greenCal").each(
          function () {
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("green");
            var Idg = $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .attr("id");
            var newvalg = Idg.slice(0, -2);
            var upper_clsg = newvalg + "-date-box";
            $("#" + upper_clsg).addClass("green");
          }
        );

        ///////////////

        $(".hbcalendar tr.single-day").hide();

        $(".hbcalendar .calendar-calendar table tbody tr .redCal").each(
          function () {
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("red");

            var Id = $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .attr("id");
            var newval = Id.slice(0, -2);

            var upper_cls = newval + "-date-box";

            $("#" + upper_cls + " div.inner").attr("title", $(this).text());

            $("#" + upper_cls).addClass("red");
          }
        );
        $(".hbcalendar .calendar-calendar table tbody tr .greenCal").each(
          function () {
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("green");
            var Idg = $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .attr("id");
            var newvalg = Idg.slice(0, -2);
            var upper_clsg = newvalg + "-date-box";

            $("#" + upper_clsg + " div.inner").attr("title", $(this).text());

            $("#" + upper_clsg).addClass("green");
          }
        );
        $(".signup_formouter #edit-name").bind("cut copy paste", function (e) {
          e.preventDefault();
        });

        $(".signup_formouter #edit-pass").bind("cut copy paste", function (e) {
          e.preventDefault();
        });
      });

      if ($("#contact-mail-page").length > 0) {
        var cat_id = $("#contact-mail-page #edit-cid-wrapper #edit-cid").attr(
          "id"
        );
        var cat_class = $(
          "#contact-mail-page #edit-cid-wrapper #edit-cid"
        ).attr("class");
        var cat_name = $("#contact-mail-page #edit-cid-wrapper #edit-cid").attr(
          "name"
        );
        var cat_html = $(
          "#contact-mail-page #edit-cid-wrapper #edit-cid"
        ).html();
        $("#contact-mail-page #edit-cid-wrapper #edit-cid").remove();
        $("#contact-mail-page #edit-cid-wrapper").append(
          '<div id="category-id"><select id=' +
            cat_id +
            " name=" +
            cat_name +
            ">" +
            cat_html +
            "</select></div>"
        );
        $("#test #edit-cid").addClass(cat_class);
      }
      if ($(".banner-right .quicktabs_tabs").length > 0) {
        $(".banner-right .quicktabs_tabs li a").each(function (index) {
          var a_text = $(this).html();
          $(this).html("<span>" + a_text + "</span>");
        });
      }
      $("#context-block-region-text_resize").hide();
      if (
        $("#contact-mail-page").length > 0 ||
        $("#forward-form").length > 0 ||
        $("#feedback-form").length > 0
      ) {
        $(".captcha").each(function (index) {
          $(this).prepend(
            '<label class="captcha-text">Verification<br><span>(Required)</span></label>'
          );
        });
      }

      $("#tag").click(function () {
        $(".tag_popup").show();
        $(".comment_popup").hide();
      });
      $("#comment").click(function () {
        $(".comment_popup").show();
        $(".tag_popup").hide();
      });
      $(".popup_btn").click(function () {
        $(".tag_popup").hide();
      });
      $(".popup_btn").click(function () {
        $(".comment_popup").hide();
      });
    },
  };
})(jQuery);

/**
 * Adds and removes classes to a list of links to allow keyboard accessibility
 *
 * @param string dropDownId
 * @param string hoverClass
 * @param int mouseOffDelay
 */

function dropdown(dropdownId, hoverClass, mouseOffDelay) {
  if ((dropdown = document.getElementById(dropdownId))) {
    var listItems = dropdown.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].onmouseover = function () {
        this.className = addClass(this);
        $(".header_middle .wrapper nav ul li ul").css("display", "block");
      };
      document.addEventListener("keydown", function (e) {
        if (e.keyCode === 9) {
          this.className = addClass(this);
          $(".header_middle .wrapper nav ul li ul").css("display", "block");
        }
      });
      listItems[i].onmouseout = function () {
        var that = this;
        setTimeout(function () {
          that.className = removeClass(that);
        }, mouseOffDelay);
        this.className = that.className;
      };

      var anchor = listItems[i].getElementsByTagName("a");
      anchor = anchor[0];
      anchor.onfocus = function () {
        tabOn(this.parentNode);
      };
      anchor.onblur = function () {
        tabOff(this.parentNode);
      };
    }
  }

  function tabOn(li) {
    if (li.nodeName == "LI") {
      li.className = addClass(li);
      tabOn(li.parentNode.parentNode);
    }
  }

  function tabOff(li) {
    if (li.nodeName == "LI") {
      li.className = removeClass(li);
      tabOff(li.parentNode.parentNode);
    }
  }

  function addClass(li) {
    return li.className + " " + hoverClass;
  }
  function removeClass(li) {
    return li.className.replace(hoverClass, "");
  }
}

function popupclose() {
  document.getElementById("outer-pop").innerHTML = "";
  document.getElementById("outer-pop").style.display = "none";
}

$(document).keyup(function (e) {
  if (e.keyCode == "27") {
    popupclose();
  }
});

$(document).ready(function () {
  dropdown("nav", "hover", 10);
});

$(document).ready(function () {
  $("#homebox-add .item-list a.used").each(function () {
    $(this).parent().hide();
  });

  $(".homebox-column .portlet-header a.portlet-close").live(
    "click",
    function () {
      var boxText = $(this).parent().find("span.portlet-title").text();

      $("#homebox-add .item-list a.used").each(function () {
        var tabText = $(this).text();

        if (tabText == boxText) {
          $(this).parent().show();
        }
      });
    }
  );
});

$(window).bind("resize", function () {
  if (window.innerWidth > 780) {
    $("#nav").show();
    $("#nav").removeClass("vb");

    $("#footertop ul").show();
    $("#footertop ul").removeClass("visible");
  } else {
    $("#nav").hide();
    $("#footertop ul").hide();
  }
});

$(window).bind("load resize", function () {
  if (window.innerWidth < 781) {
    $(".topic").find("div.sidebar_head").next("ul").attr("style", "");
    $(".topic").find("div.sidebar_head").next("ul").stop().hide();
    $(".topic").find("div.sidebar_head").next("ul").addClass("hidden");
    $(".topic").find("div.sidebar_head").addClass("close");
    $(".topic")
      .find("div.sidebar_head")
      .click(function () {
        if ($(this).hasClass("close")) {
          $(this).removeClass("close");
          $(this).addClass("open");
        } else {
          $(this).removeClass("open");
          $(this).addClass("close");
        }

        if ($(this).next("ul").hasClass("hidden")) {
          $(this).next("ul").stop().slideDown();
          $(this).next("ul").css("height", "auto");
          $(this).next("ul").removeClass("hidden");
        } else {
          $(this).next("ul").stop().slideUp();
          $(this).next("ul").addClass("hidden");
        }

        //alert('120');
      });
  } else {
    $(".topic").find("div.sidebar_head").next("ul").show();
    $(".topic").find("div.sidebar_head").next("ul").removeClass("hidden");
    $(".topic").find("div.sidebar_head").removeClass("close");
    $(".topic").find("div.sidebar_head").removeClass("open");
  }
});

// Use for to show the home page feedback fixed box */
function helpUsToggle() {
  if (jQuery("#home-bottom-floating-wrapper").hasClass("topen")) {
    jQuery("#home-bottom-floating-wrapper").animate({ bottom: "-55px" });
    jQuery("#home-bottom-floating-wrapper").removeClass("topen");
    jQuery("#home-bottom-floating-wrapper").addClass("tclose");
    jQuery("#home-bottom-floating-close").html("^");
  } else {
    jQuery("#home-bottom-floating-wrapper").animate({ bottom: "0px" });
    jQuery("#home-bottom-floating-wrapper").removeClass("tclose");
    jQuery("#home-bottom-floating-wrapper").addClass("topen");
    jQuery("#home-bottom-floating-close").html("X");
  }
  return false;
}

$(document).ready(function () {
  $(
    "#block-views-home-main-slider-block ul.flex-direction-nav .flex-prev"
  ).attr("title", "Previous");
  $(
    "#block-views-home-main-slider-block ul.flex-direction-nav .flex-prev"
  ).attr("aria-label", "Previous");
  $("#block-views-home-main-slider-block .flex-pauseplay .flex-pause").attr(
    "title",
    "pauseplay"
  );
  $("#block-views-home-main-slider-block .flex-pauseplay .flex-pause").attr(
    "aria-label",
    "pauseplay"
  );
  $(
    "#block-views-home-main-slider-block ul.flex-direction-nav .flex-next"
  ).attr("title", "Next");
  $(
    "#block-views-home-main-slider-block ul.flex-direction-nav .flex-next"
  ).attr("aria-label", "Next");
  $("#block-views-home-main-slider-block .flex-pauseplay .flex-play").attr(
    "title",
    "pauseplay"
  );
  $("#block-views-home-main-slider-block .flex-pauseplay .flex-play").attr(
    "aria-label",
    "pauseplay"
  );

  $("a[href^=http]").click(function (e) {
    e.preventDefault();

    var url = $(this).attr("href");
    var target = $(this).attr("target");

    var matches = url.match(/^https?\:\/\/(?:www\.)?([^\/:?#]+)(?:[\/:?#]|$)/i);

    var domain = matches && matches[1];
    var hostname = window.location.hostname;

    hostname = hostname.replace("www.", "");

    var curr_lang = $("meta[name=lang]").attr("content");

    if (domain) {
      if (domain != hostname) {
        if (
          domain == "india.gov.in" ||
          domain == "xn--i1bj3fqcyde.xn--11b7cb3a6a.xn--h2brj9c"
        ) {
          var id = $(this).attr("id");

          if (id == "switch-lang") {
            var lang_title = $(this).attr("rel");

            if (curr_lang == "English")
              var confirm_msg =
                "This will lead you to " +
                lang_title +
                " language. Are you sure to switch to this language?";
            else if (curr_lang == "Hindi")
              var confirm_msg =
                "यह आपको " +
                lang_title +
                " भाषा में ले जाएगा। क्या आप वाकई इस भाषा में स्विच करना चाहते हैं?";
            else confirm_msg = "Are you sure to switch to this language?";

            if (confirm(confirm_msg)) {
              if (target == "_blank" || target == "_BLANK")
                window.open(url, "_blank");
              else window.location.href = url;
            }
          } else {
            if (target == "_blank" || target == "_BLANK")
              window.open(url, "_blank");
            else window.location.href = url;
          }
        } else {
          if (curr_lang == "English")
            var alert_msg =
              "You are being redirected to an external website. Please note that National Portal is not responsible for external websites content & privacy policies.";
          else if (curr_lang == "Hindi")
            var alert_msg =
              "आपको एक बाहरी वेबसाइट पर रीडायरेक्ट किया जा रहा है। कृपया ध्यान दें कि राष्ट्रीय पोर्टल बाहरी वेबसाइट सामग्री और गोपनीयता नीतियों के लिए ज़िम्मेदार नहीं है।";
          else
            alert_msg =
              "You are being redirected to an external website. Please note that National Portal is not responsible for external websites content & privacy policies.";

          if (confirm(alert_msg)) {
            if (target == "_blank" || target == "_BLANK")
              window.open(url, "_blank");
            else window.location.href = url;
          }
        }
      } else {
        if (target == "_blank" || target == "_BLANK")
          window.open(url, "_blank");
        else window.location.href = url;
      }
    }
  });

  $(document).on("click", ".ext-link-ajax", function (e) {
    e.preventDefault();

    var url = $(this).attr("href");
    var target = $(this).attr("target");

    var curr_lang = $("meta[name=lang]").attr("content");

    if (curr_lang == "English")
      var alert_msg =
        "You are being redirected to an external website. Please note that National Portal is not responsible for external websites content & privacy policies.";
    else if (curr_lang == "Hindi")
      var alert_msg =
        "आपको एक बाहरी वेबसाइट पर रीडायरेक्ट किया जा रहा है। कृपया ध्यान दें कि राष्ट्रीय पोर्टल बाहरी वेबसाइट सामग्री और गोपनीयता नीतियों के लिए ज़िम्मेदार नहीं है।";
    else
      alert_msg =
        "You are being redirected to an external website. Please note that National Portal is not responsible for external websites content & privacy policies.";

    if (confirm(alert_msg)) {
      if (target == "_blank" || target == "_BLANK") window.open(url, "_blank");
      else window.location.href = url;
    }
  });
});

$(document).ready(function () {
  $(".skip-link").bind("click", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        800
      );
    e.preventDefault();
  });

  $(".skip-link").click(function (e) {
    e.preventDefault();
    $("#main-content").attr("tabindex", "-1");
    $("#main-content").focus();
  });

  $("ol.result-page li").each(function () {
    $(this)
      .find(".share_btn")
      .focus(function (e) {
        $(this)
          .parents(".share-icon")
          .addClass("mFocus")
          .siblings()
          .removeClass("mFocus");
      });
  });

  $("ol.result-page .share-icon .sharebtns li:last-child a").focusout(function (
    e
  ) {
    $(this).parents(".share-icon").removeClass("mFocus");
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 9) {
      jQuery("body").addClass("show-focus-outlines");
    }
  });

  document.addEventListener("mousedown", function (e) {
    jQuery("body").removeClass("show-focus-outlines");
  });

  $(".home-tab .pane-title.block-title").attr("tabindex", 0);
  $(".captcha .image-style-none").attr("tabindex", 0);
  $(".star").attr("tabindex", 0);

  $(".quicktabs-tabs").attr("role", "tablist");
  $(".quicktabs-tabs li a").attr("role", "tab");

  $(".quicktabs-tabs li a").each(function (index) {
    let viewId = $(this)
      .parents(".quicktabs-wrapper")
      .find(".quicktabs_main div.quicktabs-tabpage")
      .eq(index)
      .attr("id");
    $(this).attr("aria-controls", viewId);
    if ($(this).parent().hasClass("active")) {
      $(this).attr("aria-selected", true);
    } else {
      $(this).attr("aria-selected", false);
    }
  });

  $(".quicktabs-tabs li a").click(function () {
    $(this).parent().siblings().find("a").attr("aria-selected", false);
    $(this).attr("aria-selected", true);
  });

  let $tabAtags = null;
  let $thisTab = null;

  $(".quicktabs-tabs li a").on("keyup", function (event) {
    $thisTab = $(this);
    //$(this).parents('.quicktabs-wrapper').find('.quicktabs-tabpage.quicktabs-hide').attr("hidden",true);
    let $thisTabParent = $thisTab.parent();
    let $tabId = "#" + $thisTab.attr("aria-controls");
    $tabAtags = $($tabId).removeAttr("hidden").find(".block-content a");
    let $tabsListATags = $thisTab.parents(".quicktabs-tabs").find("a");

    $($tabId).find("a").removeAttr("tabindex");
    $thisTab.removeAttr("tabindex");
    $($tabId).find("a:last").off("focusout");
    $thisTabParent.nextAll().find("a").attr("tabindex", -1);
    $thisTabParent.prevAll().find("a").removeAttr("tabindex");

    if ($tabsListATags.length == $tabsListATags.index($thisTab) + 1) {
      let $activePrevSibling = $thisTabParent.siblings("li.active");
      if ($activePrevSibling.length > 0) {
        let $visibleTab = $activePrevSibling.find("a").attr("aria-controls");
        $($visibleTab).find("a").attr("tabindex", -1);
      }
    }

    if (
      $tabAtags.length == 0 ||
      !$($tabId).find(".block-content").is(":visible")
    ) {
      $thisTab.parent().next("li").find("a").removeAttr("tabindex");
    }
  });

  $(".quicktabs-tabpage ul li").on("keydown", "a", function (event) {
    let itemIndex = $tabAtags.index($(this)) + 1;
    if (
      $tabAtags.length === itemIndex &&
      event.key === "Tab" &&
      event.shiftKey === false
    ) {
      $(this).focusout(function () {
        $thisTab.parent().next("li").find("a").focus();
      });
    }
  });

  $(".signup_formouter .description, #account-pass-restrictions").attr(
    "tabindex",
    0
  );
  $(".password-strength").hide();
});
