function App(t){function n(){for(this.model.listCards=new ListCards,i=0;i<16;i++){var n=t.loadCard(i);this.model.listCards.addCard(n)}}function e(){this.model.options={},this.model.options.prefix=""}this.loaded=!1,this.views={},this.model={},this.deviceHandler=t,Handlebars.registerPartial("widget_badge_button",Lyloochat.templates.widget_badge_button),Handlebars.registerPartial("widget_text_button",Lyloochat.templates.widget_text_button),Handlebars.registerPartial("widget_floating_button",Lyloochat.templates.widget_floating_button),this.initialisation=function(){console.log("initialisation"),$.event.special.tap.emitTapOnTaphold=!1,n.call(this),e.call(this),this.views.menu=new AppMenu(this),this.views.grid=new AppGrid(this),this.loaded=!0,window.onerror=function(t,n,e,i,o){console.error(t),showErrorPanel(t)}},this.initSoundLibrary=function(){return t.initSoundLibrary()}}function showMaskPanel(t){$.inner_showMaskPanel(this,t)}function hideMaskPanel(){$.inner_hideMaskPanel(this)}function showErrorPanel(t){$.inner_showErrorPanel(this,t,hideErrorPanel)}function hideErrorPanel(){$.inner_hideErrorPanel(this)}function Card(t,n){this.id=t,this.code=n}function Card_Drawing(t,n,e){this.svg=e,Card.apply(this,[t,n])}function Card_Sound(t,n,e){this.filepath=e,Card.apply(this,[t,n])}function Card_Text(t,n,e){this.label=e,Card.apply(this,[t,n])}function ListCards(){this.cards=[],this.addCard=function(t){this.cards.push(t)},this.length=function(){return this.cards.length},this.getCard=function(t){return this.cards[t]}}function Sound(t,n,e,i){function o(t,n){var e=n-t.toString().length+1;return Array(+(e>0&&e)).join("0")+t}this.library=void 0,this.name=t,this.author=n,this.filepath=e,this.duration=i,this.getDurationStr=function(){var t=new Date(1e3*i),n=t.getMinutes();n=o.call(this,n,2);var e=t.getSeconds();return e=o.call(this,e,2),n+":"+e},this.play=function(t){this.library.playSound(this,t)},this.stop=function(t){this.library.stopSound(this,t)}}function SoundLibrary(t){function n(){}this.deviceHandler=t,this.recentsPlayed=new SoundList(this),n(),this.searchSounds=function(t,n){return new SoundList(this)},this.playSound=function(t,n){},this.stopSound=function(t,n){n()}}function SoundList(t){this.library=t,this.list=[],this.size=function(){return this.list.length},this.get=function(t){return this.list[t]},this.add=function(t){this.list.push(t),t.library=this.library}}function AppGrid(t){function n(){var n=document.getElementById("grid-cards");for(i=0;i<t.model.listCards.length();i++){var s,a=t.model.listCards.getCard(i);if(a instanceof Card_Text?s=new Widget_Card_Text(this,a):a instanceof Card_Drawing?s=new Widget_Card_Drawing(this,a):a instanceof Card_Sound&&(s=new Widget_Card_Sound(this,a)),"undefined"==typeof s)throw"Type de carte non supporté encore.";s.render(n)}e(),o()}function e(){var t,n,e,i,o;$(".ripple").on("tap",function(s){var a=phonegapHandler.app;a.loaded&&(t=$(this),0===t.find(".ink").length&&t.prepend("<span class='ink'></span>"),n=t.find(".ink"),n.removeClass("animate"),n.height()||n.width()||(e=Math.max(t.outerWidth(),t.outerHeight()),n.css({height:e,width:e})),i=s.pageX-t.offset().left-n.width()/2,o=s.pageY-t.offset().top-n.height()/2,n.css({top:o+"px",left:i+"px"}).addClass("animate"))})}function o(){$(".card-text").on("taphold",function(t){var n=phonegapHandler.app;if(n.loaded){void 0===n.views.cardConfigurator&&(n.views.cardConfigurator=new CardConfigurator);var e=$(this);n.views.cardConfigurator.onClick(e,t)}})}this.app=t,this.busy=!1,n()}function AppMenu(t){function n(){var t=document.getElementById("appmenu"),n={name:"Lyloochat",icon:"check",links:[{longCode:"Afficher un texte",code:"Texte",icon:"keyboard"},{longCode:"Jouer un son",code:"Son",icon:"sound"},{longCode:"Dessiner quelquechose",code:"Dessin",icon:"pen"},{longCode:"Changer les options",code:"Options",icon:"settings"}]};t.innerHTML=Lyloochat.templates.widget_menus(n)}function e(){var t=this,n=$(".app-menu-type-keyboard");n.on("tap",function(e){o.call(t,n)});var e=$(".app-menu-type-sound");e.on("tap",function(n){i.call(t,e)});var r=$("app-menu-type-pen");r.on("tap",function(n){s.call(t,r)});var d=$(".app-menu-type-settings");d.on("tap",function(n){a.call(t,d)})}function i(t){void 0===this.menu_sound&&(this.menu_sound=new AppMenu_Sound(this)),r.call(this,this.menu_sound,t)}function o(t){void 0===this.menu_text,r.call(this,this.menu_text,t)}function s(t){void 0===this.menu_drawing,r.call(this,this.menu_drawing,t)}function a(t){void 0===this.menu_options,r.call(this,this.menu_options,t)}function r(t,n){t===this.selected_menu?(t.hide(),n.removeClass("selected"),this.selected_menu=void 0,this.$selected_menu_elem=void 0,d.call(this)):(void 0!==this.selected_menu&&(this.selected_menu.hide(),this.$selected_menu_elem.removeClass("selected"),this.$selected_menu_elem=void 0,d.call(this)),this.selected_menu=t,t.show(),this.$selected_menu_elem=n,n.addClass("selected"),l.call(this))}function d(){var t=$(".app-content");t.removeClass("freeze-scroll")}function l(){var t=$(".app-content");t.addClass("freeze-scroll")}this.app=t,this.menu_text=void 0,this.menu_sound=void 0,this.menu_drawing=void 0,this.menu_options=void 0,this.selected_menu=void 0,this.$selected_menu_elem=void 0,n.call(this),e.call(this)}function CardConfigurator(){function t(){this.busy=!1,this.elementSelect=void 0,hideMaskPanel()}function n(){var t=$(".mask");t.html("<div class='cardConfigurator-button-ctn'></div>");var n=t.find(".cardConfigurator-button-ctn"),o={"class":"butt-edit",title:"Editer l'item",icon:"edit",code:"Editer"};n.html(Lyloochat.templates.widget_badge_button(o));var s=$(".badge-button.butt-edit");s.on("click",i),o={"class":"butt-delete",title:"Supprimer l'item",icon:"delete",code:"Supprimer"},n.append(Lyloochat.templates.widget_badge_button(o));var a=$(".badge-button.butt-delete");a.on("click",e)}function e(t){console.log("_on_deleteItem"),t.stopPropagation()}function i(t){console.log("_on_editItem"),t.stopPropagation()}this.onClick=function(e,i){if(!this.busy){this.busy=!0,this.elementSelect=e,showMaskPanel.call(this,t);$(window).width();n.call(this)}}}function AppMenu_Impl(t){this.appMenu=t,this.show=function(){showErrorPanel("Shouldn't be there you naughty boy !")},this.hide=function(){showErrorPanel("Shouldn't be there you naughty boy !")}}function AppMenu_Sound(t){function n(t,n){var e=new Widget_Sound(t,n);e.insert()}function e(t){this.soundLibrary.searchSounds(this.appMenu.app.options.prefix,t)}AppMenu_Impl.apply(this,[t]),this.termSearched="",this.soundLibrary=t.app.initSoundLibrary(),this.show=function(){var t={},o=Lyloochat.templates.menu_sound(t),s=$(".app-content");s.append(o);var a=s.find(".recents-list");for(i=0;i<this.soundLibrary.recentsPlayed.size();i++){var r=this.soundLibrary.recentsPlayed.get(i);n.call(this,a,r)}var d=this,l=s.find(".app-menu-expanded .search-input").on("search",function(t){e.call(d,l.text())})},this.hide=function(){var t=$(".app-content .app-menu-expanded");t.remove()}}function Screen_Card(t){this.widget_card=t,this.display=function(){showErrorPanel("Shouldn't be there you naughty boy !")}}function Screen_Card_Drawing(t){Screen_Card.apply(this,[t])}function Screen_Card_Sound(t){Screen_Card.apply(this,[t])}function Screen_Card_Text(t){Screen_Card.apply(this,[t]),this.display=function(){var n=$("body"),e={label:t.card.label},i=Lyloochat.templates.screen_display_card_text(e);n.append(i);var o=n.children().last(),s=o.find(".container");s.boxfit(),$(window).resize(function(){o.attr("style",""),s.attr("style",""),s.boxfit()});var a=o.find(".card-fs-butt-ok");a.on("click",function(t){$(o).remove()})}}function Widget_Card(t,n){function e(){var n=this,e=$(this.elem_card).find(".container");e.on("tap",function(){t.busy||(t.busy=!0,setTimeout(function(){n.onCardThumbnailClick(),t.busy=!1},200))})}this.appGrid=t,this.card=n,this.elem_card=void 0,this.fullscreen_card=void 0,this.getCardThumbailContent=function(){return showErrorPanel("Shouldn't be there you naughty boy !"),""},this.onCardThumbnailClick=function(){showErrorPanel("Shouldn't be there you naughty boy !")},this.render=function(t){$(t).append(this.getCardThumbailContent.call(this));var n=t.lastElementChild;return this.elem_card=n,e.call(this),""}}function Widget_Card_Drawing(t,n){Widget_Card.apply(this,[t,n]),this.getCardThumbailContent=function(){var t={cardNumber:n.id,title:n.code};return Lyloochat.templates.widget_card_text(t)},this.onCardThumbnailClick=function(){showErrorPanel("Click Widget_Card_Drawing")}}function Widget_Card_Sound(t,n){Widget_Card.apply(this,[t,n]),this.getCardThumbailContent=function(){var t={cardNumber:n.id,title:n.code};return Lyloochat.templates.widget_card_text(t)},this.onCardThumbnailClick=function(){showErrorPanel("Click Widget_Card_Sound")}}function Widget_Card_Text(t,n){Widget_Card.apply(this,[t,n]),this.getCardThumbailContent=function(){var t={cardNumber:n.id,title:n.code};return Lyloochat.templates.widget_card_text(t)},this.onCardThumbnailClick=function(){this.displayed_screen_card=new Screen_Card_Text(this),this.displayed_screen_card.display()}}function Widget_Sound(t,n){function e(){this.playing=!1,this.$elem_sound.removeClass("selected");var t=this.$elem_sound.find(".sound-icon");t.removeClass("icon-pause"),t.addClass("icon-play")}this.$elem_parent=t,this.$elem_sound=void 0,this.sound=n,this.playing=!1,this.insert=function(){var t={name:this.sound.name,durationStr:this.sound.getDurationStr()},n=Lyloochat.templates.widget_sound(t);this.$elem_parent.append(n),this.$elem_sound=this.$elem_parent.children().last();var e=this;this.$elem_sound.on("tap",function(t){e.playing?e.stop():e.play()})},this.play=function(){this.playing=!0;var t=this;this.sound.play(function(){e.call(t)}),this.$elem_sound.addClass("selected");var n=this.$elem_sound.find(".sound-icon");n.removeClass("icon-play"),n.addClass("icon-pause")},this.stop=function(){var t=this;this.sound.stop(function(){e.call(t)})}}!function(t,n){n.inner_showMaskPanel=function(t,e){var i=n(".mask");i.html(""),i.addClass("visible"),i.on("click",function(n){e.call(t)})},n.inner_hideMaskPanel=function(t){var e=n(".mask");e.html(""),e.removeClass("visible"),e.off("click")},n.inner_showErrorPanel=function(t,e){n.inner_showMaskPanel(this,hideErrorPanel);var i=n(".mask"),o={type:"error",header:{icon:"sad",message:"Onoz !"},messages:[e],footer:{buttons:["ok"]}};i.html(Lyloochat.templates.widget_dialog(o))},n.inner_hideErrorPanel=function(t){n.inner_hideMaskPanel(t)}}(window,jQuery),Handlebars.registerHelper("if_eq",function(t,n,e){return t===n?e.fn(this):e.inverse(this)});