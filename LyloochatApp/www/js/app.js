function App(e){function t(){this.model.options={},this.model.options.prefix=""}this.loaded=!1,this.views={},this.model={},this.deviceHandler=e,this.soundLibrary=void 0,Handlebars.registerPartial("widget_badge_button",Lyloochat.templates.widget_badge_button),Handlebars.registerPartial("widget_text_button",Lyloochat.templates.widget_text_button),Handlebars.registerPartial("widget_floating_button",Lyloochat.templates.widget_floating_button),this.initialisation=function(){console.log("initialisation"),$.event.special.tap.emitTapOnTaphold=!1;var n=this;showLoadingPanel("Chargement des cartes..."),this.model.listCards=new ListCards,e.loadCards(this.model.listCards,function(){t.call(n),n.views.menu=new AppMenu(n),n.views.grid=new AppGrid(n),n.loaded=!0,hideLoadingPanel()}),window.onerror=function(e,t,n,i,s){console.error(e),showErrorPanel(e)}},this.getSoundLibrary=function(t){if(void 0!==i)t(i);else{var n=this,i=new SoundLibrary(this);showLoadingPanel("Chargement des sons..."),e.loadSounds(i,function(){hideLoadingPanel(),n.soundLibrary=i,t(n.soundLibrary)})}}}function showMaskPanel(e){$.inner_showMaskPanel(this,!0,e)}function hideMaskPanel(){$.inner_hideMaskPanel(this)}function showErrorPanel(e){$.inner_showErrorPanel(this,e,hideErrorPanel)}function hideErrorPanel(){$.inner_hideErrorPanel(this)}function showLoadingPanel(e){$.inner_showLoadingPanel(this,e,hideLoadingPanel)}function hideLoadingPanel(){$.inner_hideLoadingPanel(this)}function Card(e,t){this.id=e,this.code=t}function Card_Drawing(e,t,n){this.svg=n,Card.apply(this,[e,t])}function Card_Sound(e,t,n){this.filepath=n,Card.apply(this,[e,t])}function Card_Text(e,t,n){this.label=n,Card.apply(this,[e,t])}function ListCards(){this.cards=[],this.addCard=function(e){this.cards.push(e)},this.length=function(){return this.cards.length},this.getCard=function(e){return this.cards[e]},this.replaceCard=function(e,t){this.cards[e]=t}}function Sound(e,t,n,i){function s(e,t){var n=t-e.toString().length+1;return Array(+(n>0&&n)).join("0")+e}this.library=void 0,this.name=e,this.author=t,this.filepath=n,this.duration=i,this.getDurationStr=function(){var e=new Date(1e3*i),t=e.getMinutes();t=s.call(this,t,2);var n=e.getSeconds();return n=s.call(this,n,2),t+":"+n}}function SoundLibrary(e){this.recents_played=new SoundList(this),this.all_sounds=new SoundList(this),this.ready=!1,this.deviceHandler=e,this.searchSounds=function(e,t){t=t.toLowerCase(),e=e.toLowerCase();for(var n=new SoundList(this),i=0;i<this.all_sounds.size();i++){var s=this.all_sounds.get(i);""!==e?0===s.name.indexOf(e)&&s.name.toLowerCase().indexOf(t)>=0&&n.add(s):s.name.toLowerCase().indexOf(t)>=0&&n.add(s)}return n},this.onSoundsLoaded=function(){this.ready=!0}}function SoundList(e){this.library=e,this.list=[],this.size=function(){return this.list.length},this.get=function(e){return this.list[e]},this.add=function(e){this.list.push(e),e.library=this.library}}function AppGrid(e){function t(){var t=document.getElementById("grid-cards");for(i=0;i<e.model.listCards.length();i++){var a,o=e.model.listCards.getCard(i);if(o instanceof Card_Text?a=new Widget_Card_Text(this,o):o instanceof Card_Drawing?a=new Widget_Card_Drawing(this,o):o instanceof Card_Sound&&(a=new Widget_Card_Sound(this,o)),"undefined"==typeof a)throw"Type de carte non supporté encore.";a.render(t)}n(),s()}function n(){var e,t,n,i,s;$(".ripple").on("tap",function(a){var o=phonegapHandler.app;o.loaded&&(e=$(this),0===e.find(".ink").length&&e.prepend("<span class='ink'></span>"),t=e.find(".ink"),t.removeClass("animate"),t.height()||t.width()||(n=Math.max(e.outerWidth(),e.outerHeight()),t.css({height:n,width:n})),i=a.pageX-e.offset().left-t.width()/2,s=a.pageY-e.offset().top-t.height()/2,t.css({top:s+"px",left:i+"px"}).addClass("animate"))})}function s(){$(".card-text").on("taphold",function(e){var t=phonegapHandler.app;if(t.loaded){void 0===t.views.cardConfigurator&&(t.views.cardConfigurator=new CardConfigurator);var n=$(this);t.views.cardConfigurator.onClick(n,e)}})}this.app=e,this.busy=!1,t()}function AppMenu(e){function t(){var e=document.getElementById("appmenu"),t={name:"Lyloochat",icon:"check",links:[{longCode:"Afficher un texte",code:"Texte",icon:"keyboard"},{longCode:"Jouer un son",code:"Son",icon:"sound"},{longCode:"Dessiner quelquechose",code:"Dessin",icon:"pen"},{longCode:"Changer les options",code:"Options",icon:"settings"}]};e.innerHTML=Lyloochat.templates.widget_menus(t)}function n(){var e=this,t=$(".app-menu-type-keyboard");t.on("tap",function(n){s.call(e,t)});var n=$(".app-menu-type-sound");n.on("tap",function(t){i.call(e,n)});var d=$("app-menu-type-pen");d.on("tap",function(t){a.call(e,d)});var r=$(".app-menu-type-settings");r.on("tap",function(t){o.call(e,r)})}function i(e){void 0===this.menu_sound&&(this.menu_sound=new AppMenu_Sound(this)),d.call(this,this.menu_sound,e)}function s(e){void 0===this.menu_text,d.call(this,this.menu_text,e)}function a(e){void 0===this.menu_drawing,d.call(this,this.menu_drawing,e)}function o(e){void 0===this.menu_options,d.call(this,this.menu_options,e)}function d(e,t){e===this.selected_menu?(e.hide(),t.removeClass("selected"),this.selected_menu=void 0,this.$selected_menu_elem=void 0,r.call(this)):(void 0!==this.selected_menu&&(this.selected_menu.hide(),this.$selected_menu_elem.removeClass("selected"),this.$selected_menu_elem=void 0,r.call(this)),this.selected_menu=e,e.show(),this.$selected_menu_elem=t,t.addClass("selected"),l.call(this))}function r(){var e=$(".app-content");e.removeClass("freeze-scroll"),e.scrollTop(this.old_scroll_position)}function l(){var e=$(".app-content");this.old_scroll_position=e.scrollTop(),e.addClass("freeze-scroll"),e.scrollTop(0)}this.app=e,this.menu_text=void 0,this.menu_sound=void 0,this.menu_drawing=void 0,this.menu_options=void 0,this.selected_menu=void 0,this.$selected_menu_elem=void 0,this.old_scroll_position=0,t.call(this),n.call(this)}function CardConfigurator(){function e(){this.busy=!1,this.elementSelect=void 0,hideMaskPanel()}function t(){var e=$(".mask");e.html("<div class='cardConfigurator-button-ctn'></div>");var t=e.find(".cardConfigurator-button-ctn"),s={"class":"butt-edit",title:"Editer l'item",icon:"edit",code:"Editer"};t.html(Lyloochat.templates.widget_badge_button(s));var a=$(".badge-button.butt-edit");a.on("click",i),s={"class":"butt-delete",title:"Supprimer l'item",icon:"delete",code:"Supprimer"},t.append(Lyloochat.templates.widget_badge_button(s));var o=$(".badge-button.butt-delete");o.on("click",n)}function n(e){console.log("_on_deleteItem"),e.stopPropagation()}function i(e){console.log("_on_editItem"),e.stopPropagation()}this.onClick=function(n,i){this.busy||(this.busy=!0,this.elementSelect=n,showMaskPanel.call(this,e),t.call(this))}}function Screen_Card(e){this.widget_card=e,this.display=function(){showErrorPanel("Shouldn't be there you naughty boy !")}}function Screen_Card_Drawing(e){Screen_Card.apply(this,[e])}function Screen_Card_Sound(e){Screen_Card.apply(this,[e])}function Screen_Card_Text(e){Screen_Card.apply(this,[e]),this.display=function(){var t=$("body"),n={label:e.card.label},i=Lyloochat.templates.screen_display_card_text(n);t.append(i);var s=t.children().last(),a=s.find(".container");a.boxfit(),$(window).resize(function(){s.attr("style",""),a.attr("style",""),a.boxfit()});var o=s.find(".card-fs-butt-ok");o.on("click",function(e){$(s).remove()})}}function Widget_Card(e,t){function n(){var t=this,n=$(this.elem_card).find(".container");n.on("tap",function(){e.busy||(e.busy=!0,setTimeout(function(){t.onCardThumbnailClick(),e.busy=!1},200))})}this.appGrid=e,this.card=t,this.elem_card=void 0,this.fullscreen_card=void 0,this.getCardThumbailContent=function(){return showErrorPanel("Shouldn't be there you naughty boy !"),""},this.onCardThumbnailClick=function(){showErrorPanel("Shouldn't be there you naughty boy !")},this.render=function(e){$(e).append(this.getCardThumbailContent.call(this));var t=e.lastElementChild;return this.elem_card=t,n.call(this),""}}function Widget_Card_Drawing(e,t){Widget_Card.apply(this,[e,t]),this.getCardThumbailContent=function(){var e={cardNumber:t.id,title:t.code};return Lyloochat.templates.widget_card_text(e)},this.onCardThumbnailClick=function(){showErrorPanel("Click Widget_Card_Drawing")}}function Widget_Card_Sound(e,t){Widget_Card.apply(this,[e,t]),this.getCardThumbailContent=function(){var e={cardNumber:t.id,title:t.code};return Lyloochat.templates.widget_card_text(e)},this.onCardThumbnailClick=function(){showErrorPanel("Click Widget_Card_Sound")}}function Widget_Card_Text(e,t){Widget_Card.apply(this,[e,t]),this.getCardThumbailContent=function(){var e={cardNumber:t.id,title:t.code};return Lyloochat.templates.widget_card_text(e)},this.onCardThumbnailClick=function(){this.displayed_screen_card=new Screen_Card_Text(this),this.displayed_screen_card.display()}}function AppMenu_Impl(e){this.appMenu=e,this.displayed=!1,this.show=function(){showErrorPanel("Shouldn't be there you naughty boy !")},this.hide=function(){showErrorPanel("Shouldn't be there you naughty boy !")}}function AppMenu_Sound(e){function t(e,t){var n=new Widget_Sound(this,e,t);n.insert()}function n(e){var n=$(".app-content");if(""!==e){var s=this.soundLibrary.searchSounds(this.appMenu.app.model.options.prefix,e),a=n.find(".results-list");for(a.empty(),i=0;i<s.size();i++){var o=s.get(i);t.call(this,a,o)}a.removeClass("hidden");var d=n.find(".results-rule");d.removeClass("hidden");var r=n.find(".results-title");r.removeClass("hidden");var l=n.find(".recents-list");l.addClass("hidden"),d=n.find(".recents-rule"),d.addClass("hidden"),r=n.find(".recents-title"),r.addClass("hidden")}else{var h=n.find(".recents-list");h.removeClass("hidden");var u=n.find(".recents-rule");u.removeClass("hidden");var c=n.find(".recents-title");c.removeClass("hidden"),h=n.find(".results-list"),h.addClass("hidden"),u=n.find(".results-rule"),u.addClass("hidden"),c=n.find(".results-title"),c.addClass("hidden")}}function s(){var e=$(".app-content"),s=e.find(".recents-list");for(i=0;i<this.soundLibrary.recents_played.size();i++){var a=this.soundLibrary.recents_played.get(i);t.call(this,s,a)}var o=this,d=e.find(".app-menu-expanded .search-input");d.on("keypress",function(e){var t=e.keyCode?e.keyCode:e.which;13==t&&(e.preventDefault(),console.log("Son cherché : "+d.val()),n.call(o,d.val()),d.blur())})}AppMenu_Impl.apply(this,[e]),this.soundLibrary=void 0;var a=this;this.termSearched="",e.app.getSoundLibrary(function(e){a.soundLibrary=e,a.displayed&&s.call(a)}),this.playingWidgetSound=void 0,this.show=function(){var e={},t=Lyloochat.templates.menu_sound(e),n=$(".app-content");n.append(t),this.displayed=!0,void 0!==this.soundLibrary&&s.call(this)},this.hide=function(){var e=$(".app-content .app-menu-expanded");e.remove(),this.displayed=!1},this.onPlay=function(e){void 0!==this.playingWidgetSound&&this.playingWidgetSound.playing&&this.playingWidgetSound.stop(),this.playingWidgetSound=e,this.playingWidgetSound.play()}}function Widget_Sound(e,t,n){function i(){this.playing=!1,this.$elem_sound.removeClass("selected");var e=this.$elem_sound.find(".sound-icon");e.removeClass("icon-pause"),e.addClass("icon-play")}function s(e){var t=this;void 0===this.soundHandler?this.appMenuSound.appMenu.app.deviceHandler.createSoundHandler(this.sound,function(){i.call(t)},function(n){t.soundHandler=n,e(t.soundHandler)}):e(this.soundHandler)}this.$elem_parent=t,this.$elem_sound=void 0,this.sound=n,this.appMenuSound=e,this.playing=!1,this.insert=function(){var e={name:this.sound.name,durationStr:this.sound.getDurationStr()},t=Lyloochat.templates.widget_sound(e);this.$elem_parent.append(t),this.$elem_sound=this.$elem_parent.children().last();var n=this;this.$elem_sound.on("tap",function(e){n.playing?n.stop():n.appMenuSound.onPlay(n)})},this.play=function(){var e=this;this.playing=!0,s.call(e,function(e){e.play()}),this.$elem_sound.addClass("selected");var t=this.$elem_sound.find(".sound-icon");t.removeClass("icon-play"),t.addClass("icon-pause")},this.stop=function(){var e=this;s.call(e,function(t){t.stop(),t.release(),i.call(e)})}}!function(e,t){t.inner_showMaskPanel=function(e,n,i){var s=t(".mask");s.html(""),s.addClass("visible"),n&&s.on("click",function(t){i.call(e)})},t.inner_hideMaskPanel=function(e){var n=t(".mask");n.html(""),n.removeClass("visible"),n.off("click")},t.inner_showErrorPanel=function(e,n){t.inner_showMaskPanel(this,!0,hideErrorPanel);var i=t(".mask"),s={type:"error",header:{icon:"sad",message:"Onoz !"},messages:[n],footer:{buttons:["ok"]}};i.html(Lyloochat.templates.widget_dialog(s))},t.inner_hideErrorPanel=function(e){t.inner_hideMaskPanel(e)},t.inner_showLoadingPanel=function(e,n){t.inner_showMaskPanel(this,!1,hideLoadingPanel);var i=t(".mask"),s={type:"loading",messages:[n]};i.html(Lyloochat.templates.widget_dialog(s))},t.inner_hideLoadingPanel=function(e){t.inner_hideMaskPanel(e)}}(window,jQuery),Handlebars.registerHelper("if_eq",function(e,t,n){return e===t?n.fn(this):n.inverse(this)});