this["Lyloochat"] = this["Lyloochat"] || {};
this["Lyloochat"]["templates"] = this["Lyloochat"]["templates"] || {};
this["Lyloochat"]["templates"]["card_config_whiteboard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"card-config-whiteboard\" class=\"card-fullscreen card-config-drawing\">\n    <canvas class=\"whiteboard\">\n        Sorry, your browser doesn't support canvas technology.\n    </canvas>\n    <div class=\"whiteboard-toolbar\">\n        <div class=\"floating-button menu-brush\" title=\""
    + alias4(((helper = (helper = helpers.titleBrush || (depth0 != null ? depth0.titleBrush : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleBrush","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon ic ic-lg\"></i>\n        </div>\n        <div class=\"floating-button menu-color\" title=\""
    + alias4(((helper = (helper = helpers.titleColor || (depth0 != null ? depth0.titleColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleColor","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon ic ic-lg icon-palette\"></i>\n        </div>\n        <div class=\"floating-button menu-size\" title=\""
    + alias4(((helper = (helper = helpers.titleSize || (depth0 != null ? depth0.titleSize : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleSize","hash":{},"data":data}) : helper)))
    + "\">\n            <span class=\"size-label\"></span>\n        </div>\n        <div class=\"container-floating\">\n"
    + ((stack1 = container.invokePartial(partials.widget_floating_button,depth0,{"name":"widget_floating_button","hash":{"icon":"check","title":"OK","class":"card-fs-butt-ok"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>";
},"usePartial":true,"useData":true});
this["Lyloochat"]["templates"]["menu_card_config"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"material-context menu-card-config\">\n  <div class=\"row\">\n    <div class=\"col s12 m10 offset-m1 l8 offset-l2\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n\n            <span class=\"card-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n          <div class=\"row\">\n            <div class=\"card-type-select col s12\">\n              <ul class=\"tabs\">\n                <li class=\"tab col s3\"><a class=\"menu-text\" href=\"#card_text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_text : stack1), depth0))
    + "</a></li>\n                <li class=\"tab col s3\"><a class=\"menu-sound\" href=\"#card_sound\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_sound : stack1), depth0))
    + "</a></li>\n                <li class=\"tab col s3\"><a class=\"menu-drawing\" href=\"#card_drawing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.card_drawing : stack1), depth0))
    + "</a></li>\n              </ul>\n            </div>\n\n            <div id=\"card_text\" class=\"col s12\">\n              <div class=\"row\">\n                <form class=\"card-form col s12\">\n                  <div class=\"row\">\n                    <div class=\"card-input input-field col s12\">\n                      <i class=\"material-icons prefix\">create</i>\n                      <input  id=\"card_text_content\" type=\"text\">\n                      <label for=\"card_text_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n\n            <div id=\"card_sound\" class=\"col s12\">\n              <div class=\"row\">\n                <form class=\"card-form col s12\">\n                  <div class=\"row\">\n                    <div class=\"card-input input-field col s12\">\n                      <i class=\"material-icons prefix\">create</i>\n                      <input  id=\"card_sound_content\" type=\"text\">\n                      <label for=\"card_sound_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"card-input input-field col s10\">\n                      <i class=\"material-icons prefix\">audiotrack</i>\n                      <input  id=\"card-soundpath\" type=\"text\">\n                      <label for=\"card-soundpath\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.played_sound : stack1), depth0))
    + "</label>\n                    </div>\n                    <div class=\"col s2\">\n                      <a class=\"btn-floating btn-sound-search\"><i class=\"material-icons\">search</i></a>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"sound-list hidden\">\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n\n            <div id=\"card_drawing\" class=\"col s12\">\n              <div class=\"row\">\n                <form class=\"card-form col s12\">\n                  <div class=\"row\">\n                    <div class=\"card-input input-field col s12\">\n                      <i class=\"material-icons prefix\">create</i>\n                      <input  id=\"card_drawing_content\" type=\"text\">\n                      <label for=\"card_drawing_content\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_text : stack1), depth0))
    + "</label>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"card-input input-field col s12 m6 l6\">\n                        <i class=\"material-icons left\">gesture</i> <a class=\"btn-draw-something waves-effect waves-light btn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.displayed_draw : stack1), depth0))
    + "</a>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n\n\n          </div>\n        </div>\n\n\n        <div class=\"card-action\">\n		  <a class=\"waves-effect waves-teal btn btn-validate\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.ok : stack1), depth0))
    + "</a>\n		  <a class=\"waves-effect waves-teal btn-flat btn-cancel\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.cancel : stack1), depth0))
    + "</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["menu_drawing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"menu-draw-canvas\" class=\"app-menu-expanded app-menu-drawing\">\n	<canvas class=\"whiteboard\">\n	        Sorry, your browser doesn't support canvas technology.\n	</canvas>\n	<div class=\"whiteboard-toolbar\">\n        <div class=\"floating-button menu-brush\" title=\""
    + alias4(((helper = (helper = helpers.titleBrush || (depth0 != null ? depth0.titleBrush : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleBrush","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon ic ic-lg\"></i>\n        </div>\n        <div class=\"floating-button menu-color\" title=\""
    + alias4(((helper = (helper = helpers.titleColor || (depth0 != null ? depth0.titleColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleColor","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon ic ic-lg icon-palette\"></i>\n        </div>\n        <div class=\"floating-button menu-size\" title=\""
    + alias4(((helper = (helper = helpers.titleSize || (depth0 != null ? depth0.titleSize : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleSize","hash":{},"data":data}) : helper)))
    + "\">\n            <span class=\"size-label\"></span>\n        </div>\n	</div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["menu_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"app-menu-expanded app-menu-sound\">\n  <div class=\"menu-bar search-bar\">\n	<i class=\"icon ic ic-lg icon-search\"></i>\n    <input class=\"menu-bar-input search-input\" contenteditable=\"true\" type=\"search\" autocomplete=\"on\" placeholder=\"Chercher un son...\"></input>\n  </div>\n  <div class=\"title recents-title\">Récents</div>\n  <hr class=\"rule recents-rule\"/>\n  <div class=\"list recents-list\">\n\n  </div>\n  <div class=\"title results-title hidden\">Résultats</div>\n  <hr class=\"rule results-rule hidden\"/>\n  <div class=\"list results-list hidden\">\n\n  </div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["menu_text"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"app-menu-expanded app-menu-text\">\n  <div class=\"menu-bar text-bar\">\n	<i class=\"icon ic ic-lg icon-edit\"></i>\n    <input class=\"menu-bar-input text-input\" contenteditable=\"true\" type=\"text\" autocomplete=\"on\" placeholder=\"Afficher un texte...\"></input>\n  </div>\n  <hr class=\"rule\"/>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["screen_display_card_drawing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"fullscreen-drawing\" class=\"card-fullscreen card-drawing\">\n    <canvas class=\"whiteboard\">\n        Sorry, your browser doesn't support canvas technology.\n    </canvas>\n    <div class=\"container-floating\">\n"
    + ((stack1 = container.invokePartial(partials.widget_floating_button,depth0,{"name":"widget_floating_button","hash":{"icon":"check","title":"OK","class":"card-fs-butt-ok"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});
this["Lyloochat"]["templates"]["screen_display_card_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda;

  return "<div class=\"card-fullscreen card-sound\">\n	<div class=\"container\">\n		<div class=\"text-container\">\n			<div class=\"sound-text\">\n				"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n		</div>\n		<div class=\"player-button material-context\">\n			<div class=\"row-progress\">\n				<i class=\"icon player-status ic ic-xl icon-pause\"></i>\n				<div class=\"progress\">\n					<div class=\"determinate\" style=\"width: 0px\"></div>\n				</div>\n			</div>\n			<div class=\"row-infos\">\n				<span class=\"infos\">\n					"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.sound : depth0)) != null ? stack1.author : stack1), depth0)) != null ? stack1 : "")
    + " - "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.sound : depth0)) != null ? stack1.name : stack1), depth0)) != null ? stack1 : "")
    + "\n				</span>\n			</div>\n		</div>\n	</div>\n    <div class=\"container-floating\">\n"
    + ((stack1 = container.invokePartial(partials.widget_floating_button,depth0,{"name":"widget_floating_button","hash":{"icon":"check","title":"OK","class":"card-fs-butt-ok"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"usePartial":true,"useData":true});
this["Lyloochat"]["templates"]["screen_display_card_text"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"card-fullscreen card-text\">\n    <div class=\"container\">\n        "
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"container-floating\">\n"
    + ((stack1 = container.invokePartial(partials.widget_floating_button,depth0,{"name":"widget_floating_button","hash":{"icon":"check","title":"OK","class":"card-fs-butt-ok"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});
this["Lyloochat"]["templates"]["whiteboard_menu_brush"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <li class=\"collection-item pick-"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n                                value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                                <span value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n                            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"material-context whiteboard-menu-brush\">\n    <div class=\"row\">\n        <div class=\"col s12 m10 offset-m2 l8 offset-l2\">\n            <div class=\"card\">\n                <div class=\"card-content\">\n                    <span class=\"card-title menu-brush-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n                    <ul class=\"collection\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.brushes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["whiteboard_menu_color"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <div class=\"pure-u-1-3 color-pick-cell\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                                <div class=\"color-pick l-box\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\">\n                                </div>\n                            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"material-context whiteboard-menu-color\">\n    <div class=\"row\">\n        <div class=\"col s12 m10 offset-m2 l8 offset-l2\">\n            <div class=\"card\">\n                <div class=\"card-content\">\n                    <span class=\"card-title menu-color-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n                    <div class=\"pure-g\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["whiteboard_menu_size"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <li class=\"collection-item "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                                <span index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n                                <div class=\"brush-size-preview\" style=\"height:"
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "px; width:"
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "px\" index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></div>\n                            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"material-context whiteboard-menu-size\">\n    <div class=\"row\">\n        <div class=\"col s12 m10 offset-m2 l8 offset-l2\">\n            <div class=\"card\">\n                <div class=\"card-content\">\n                    <span class=\"card-title menu-size-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.loc : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n                    <ul class=\"collection\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.sizes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_badge_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"class","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <i class=\"icon ic ic-lg icon-"
    + container.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a target=\"#\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" class=\"badge-button"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <span class=\"code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_card_drawing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card card-drawing pure-u-1 pure-u-md-1-2 pure-u-sm-1-2 pure-u-lg-1-4 l-box\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n    <a class=\"container ripple\" href=\"#\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n        <i class=\"material-icons card-icon\">gesture</i>\n        <div class=\"card-title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n    </a>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_card_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card card-sound pure-u-1 pure-u-md-1-2 pure-u-sm-1-2 pure-u-lg-1-4 l-box\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n    <a class=\"container ripple\" href=\"#\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n        <i class=\"card-icon sound-icon ic ic-lg icon-sound\"></i>\n        <div class=\"card-title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n    </a>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_card_text"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card card-text pure-u-1 pure-u-md-1-2 pure-u-sm-1-2 pure-u-lg-1-4 l-box\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n  <a class=\"container ripple\" href=\"#\" cardNumber=\""
    + alias4(((helper = (helper = helpers.cardNumber || (depth0 != null ? depth0.cardNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardNumber","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"card-title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n  </a>\n</div>\n";
},"useData":true});
this["Lyloochat"]["templates"]["widget_dialog"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "    <div class=\"dialog-header "
    + alias1(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "-header\"><i class=\"dialog-header-img ic ic-lg icon-"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.header : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\"></i>"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.header : depth0)) != null ? stack1.message : stack1), depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"dialog-msg "
    + alias2(alias1((depths[1] != null ? depths[1].type : depths[1]), depth0))
    + "-msg\">"
    + alias2(alias1(depth0, depth0))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"dialog-footer\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.footer : depth0)) != null ? stack1.buttons : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,depth0,"ok",{"name":"if_eq","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,depth0,"cancel",{"name":"if_eq","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
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
    + "-ctn\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.header : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.footer : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
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
    + "\">\n    <i class=\"icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\n</div>";
},"useData":true});
this["Lyloochat"]["templates"]["widget_menus"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" title=\""
    + alias4(((helper = (helper = helpers.longCode || (depth0 != null ? depth0.longCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longCode","hash":{},"data":data}) : helper)))
    + "\" class=\"app-menu-ctn app-menu-type-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\">\n  <i class=\"menu-icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\n  <span class=\"menu-code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "\n<div class=\"app-name-ctn\">\n  <span class=\"app-name\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["Lyloochat"]["templates"]["widget_sound"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"sound\">\n	<i class=\"sound-icon ic ic-lg icon-"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\n	<div class=\"name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"duration\">"
    + alias4(((helper = (helper = helpers.durationStr || (depth0 != null ? depth0.durationStr : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"durationStr","hash":{},"data":data}) : helper)))
    + "</div> \n</a>";
},"useData":true});
this["Lyloochat"]["templates"]["widget_text_button"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"class","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "        <hr class=\"withLine\"/>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a target=\"#\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" class=\"text-button"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \">\n    <span class=\"code\">"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>\n"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.withLine : depth0),true,{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a>\n";
},"useData":true});