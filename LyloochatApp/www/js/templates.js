this["Lyloochat"] = this["Lyloochat"] || {};
this["Lyloochat"]["templates"] = this["Lyloochat"]["templates"] || {};
this["Lyloochat"]["templates"]["menu_card_config"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"material-context menu-card-config\">\r\n  <div class=\"row\">\r\n    <div class=\"col s12 m10 offset-m1 l8 offset-l2\"> \r\n      <div class=\"card\">\r\n        <div class=\"card-content\">\r\n          <span class=\"card-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"card-type-select col s12\">\r\n              <ul class=\"tabs\">\r\n                <li class=\"tab col s3\"><a class=\"menu-text\" href=\"#card_text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_text : stack1), depth0))
    + "</a></li>\r\n                <li class=\"tab col s3\"><a class=\"menu-sound\" href=\"#card_sound\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_sound : stack1), depth0))
    + "</a></li>\r\n                <li class=\"tab col s3\"><a class=\"menu-drawing\" href=\"#card_drawing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_drawing : stack1), depth0))
    + "</a></li>\r\n              </ul>\r\n            </div>\r\n            \r\n            <div id=\"card_text\" class=\"col s12\">\r\n              <div class=\"row\">\r\n                <form class=\"card-form col s12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"card-input input-field col s12\">\r\n                      <i class=\"material-icons prefix\">create</i>\r\n                      <input  id=\"card_text_content\" type=\"text\">\r\n                      <label for=\"card_text_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label> \r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n            </div>\r\n            \r\n            <div id=\"card_sound\" class=\"col s12\">\r\n              <div class=\"row\">\r\n                <form class=\"card-form col s12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"card-input input-field col s12\">\r\n                      <i class=\"material-icons prefix\">create</i>\r\n                      <input  id=\"card_content\" type=\"text\">\r\n                      <label for=\"card_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label> \r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"card-input input-field col s10\"> \r\n                      <i class=\"material-icons prefix\">audiotrack</i>\r\n                      <input  id=\"card-soundpath\" type=\"text\">\r\n                      <label for=\"card-soundpath\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.played_sound : stack1), depth0))
    + "</label> \r\n                    </div>\r\n                    <div class=\"col s2\">\r\n                      <a class=\"btn-floating btn-sound-search\"><i class=\"material-icons\">search</i></a>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"sound-list hidden\">\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n            </div>\r\n            \r\n            <div id=\"card_drawing\" class=\"col s12\">\r\n              <div class=\"row\">\r\n                <form class=\"card-form col s12\">\r\n                  <div class=\"row\">\r\n                    <div class=\"card-input input-field col s12\">\r\n                      <i class=\"material-icons prefix\">create</i>\r\n                      <input  id=\"card_content\" type=\"text\">\r\n                      <label for=\"card_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label> \r\n                    </div>\r\n                  </div> \r\n                  <div class=\"row\">\r\n                    <div class=\"card-input input-field col s12 m6 l6\">\r\n                      <a class=\"waves-effect waves-light btn\"><i class=\"material-icons left\">gesture</i>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_draw : stack1), depth0))
    + "</a>\r\n                    </div>\r\n                  </div>\r\n                </form> \r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"card-action\">\r\n          <a href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.ok : stack1), depth0))
    + "</a>\r\n          <a href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.cancel : stack1), depth0))
    + "</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>  \r\n</div>";
},"useData":true});
this["Lyloochat"]["templates"]["menu_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"app-menu-expanded app-menu-sound\">\r\n  <div class=\"search-bar\">\r\n	<i class=\"icon ic ic-lg icon-search\"></i>\r\n    <input class=\"search-input\" contenteditable=\"true\" type=\"search\" autocomplete=\"on\" placeholder=\"Chercher un son...\"></input>\r\n  </div>\r\n  <div class=\"title recents-title\">Récents</div> \r\n  <hr class=\"rule recents-rule\"/>\r\n  <div class=\"list recents-list\">\r\n\r\n  </div>\r\n  <div class=\"title results-title hidden\">Résultats</div>\r\n  <hr class=\"rule results-rule hidden\"/>\r\n  <div class=\"list results-list hidden\"> \r\n\r\n  </div>\r\n</div>\r\n";
},"useData":true});
this["Lyloochat"]["templates"]["screen_display_card_text"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"card-fullscreen card-text\">\r\n    <div class=\"container\">\r\n        "
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"container-floating\">\r\n"
    + ((stack1 = container.invokePartial(partials.widget_floating_button,depth0,{"name":"widget_floating_button","hash":{"icon":"check","title":"OK","class":"card-fs-butt-ok"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"usePartial":true,"useData":true});
this["Lyloochat"]["templates"]["widget_badge_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"class","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <i class=\"icon ic ic-lg icon-"
    + container.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a target=\"#\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" class=\"badge-button"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <span class=\"code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\r\n</a>\r\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_card_text"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card-text pure-u-1 pure-u-md-1-2 pure-u-sm-1-2 pure-u-lg-1-4 l-box\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\r\n  <a class=\"container ripple\" href=\"#\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"card-title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n  </a>\r\n</div>\r\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_dialog"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "    <div class=\"dialog-header "
    + alias1(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "-header\"><i class=\"dialog-header-img ic ic-lg icon-"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.header : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\"></i>"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.header : depth0)) != null ? stack1.message : stack1), depth0))
    + "</div>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"dialog-msg "
    + alias2(alias1((depths[1] != null ? depths[1].type : depths[1]), depth0))
    + "-msg\">"
    + alias2(alias1(depth0, depth0))
    + "</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"dialog-footer\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.footer : depth0)) != null ? stack1.buttons : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,depth0,"ok",{"name":"if_eq","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,depth0,"cancel",{"name":"if_eq","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.widget_text_button,depth0,{"name":"widget_text_button","hash":{"code":"OK","class":"dialog-btn ok-btn"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.widget_text_button,depth0,{"name":"widget_text_button","hash":{"code":"Annuler","class":"dialog-btn cancel-btn"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"dialog-ctn "
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "-ctn\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.header : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.footer : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true,"useDepths":true});
this["Lyloochat"]["templates"]["widget_floating_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"class","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"floating-button"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n    <i class=\"icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n</div>";
},"useData":true});
this["Lyloochat"]["templates"]["widget_menus"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" title=\""
    + alias4(((helper = (helper = helpers.longCode || (depth0 != null ? depth0.longCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longCode","hash":{},"data":data}) : helper)))
    + "\" class=\"app-menu-ctn app-menu-type-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\">\r\n  <i class=\"menu-icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n  <span class=\"menu-code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\r\n</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n<div class=\"app-name-ctn\">\r\n  <i class=\"app-logo ic ic-xl icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n  <span class=\"app-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n</div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["Lyloochat"]["templates"]["widget_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"sound\">\r\n	<i class=\"sound-icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n	<div class=\"name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n	<div class=\"duration\">"
    + alias4(((helper = (helper = helpers.durationStr || (depth0 != null ? depth0.durationStr : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"durationStr","hash":{},"data":data}) : helper)))
    + "</div> \r\n</a>";
},"useData":true});
this["Lyloochat"]["templates"]["widget_text_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"class","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "        <hr class=\"withLine\"/>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a target=\"#\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" class=\"text-button"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \">\r\n    <span class=\"code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\r\n"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.withLine : depth0),true,{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a>\r\n";
},"useData":true});