import {LyloochatApp} from "../app";
import {WidgetCard} from "./cards/widget_card";
import {CardText} from "../model/card_text";
import {CardSound} from "../model/card_sound";
import {WidgetCardText} from "./cards/widget_card_text";
import {WidgetCardSound} from "./cards/widget_card_sound";
import {WidgetCardDrawing} from "./cards/widget_card_drawing";
import {CardDrawing} from "../model/card_drawing";
import {Dialogs} from "../commons/common";

export class AppGrid {
	// ========================================== VARIABLES =================================
	private static TAP_HOLD_DURATION = 100;
	private static CONFIG_HOLD_DURATION = 750;

	public card_widgets: WidgetCard[] = [];
	private busy = false;
	private isTapHolding = false;


	constructor(public app: LyloochatApp) {
		this.fill();
	}

	// ========================================== PRIVATE ===================================
	// fill : Remplit la grille
	private fill() {
		//Création/RAZ grille
		let gridSource = document.getElementById("grid-cards");
		gridSource.innerHTML = '';
		this.card_widgets = [];
		for (let i = 0; i < this.app.listCards.length(); i++) {
			let card = this.app.listCards.getCard(i);
			let card_widget: WidgetCard = null;

			if (card instanceof CardText) {
				card_widget = new WidgetCardText(this, card);
			} else if (card instanceof CardDrawing) {
				card_widget = new WidgetCardDrawing(this, card);
			} else if (card instanceof CardSound) {
				card_widget = new WidgetCardSound(this, card);
			}

			if (card_widget) {
				this.card_widgets.push(card_widget);
				card_widget.render(gridSource);
			} else {
				Dialogs.showErrorPanel("Card type not supported yet.");
			}
		}

		this.addEvents_RippleEffects();
		this.addEvents_CardConfigurations();
	}
	//_addEvents_RippleEffects : Colle un écouteur pour faire un petit effet su chaque carte
	private addEvents_RippleEffects() {
		let self = this;

		//gestion du tap
		$(".ripple").on('click', function(e: JQueryMouseEventObject, ...args: any[]) {
			if (!self.isTapHolding) { //si on n'est pas pendant un appui
				//On récupère la div de la carte cliqué
				let target = $(e.target);
				while (!target.attr("cardNumber") && target.parent()) {
					target = target.parent();
				}
				let index = target.attr("cardNumber");

				if (index) {
					let widget = self.card_widgets[index];
					if (!self.busy) {
						self.busy = true;

						self.addAnimation(e.pageX, e.pageY, $(e.target), "ink");
						setTimeout(function() {
							widget.onCardThumbnailClick();
							self.busy = false;
						}, (AppGrid.TAP_HOLD_DURATION));
					}
				}
			}
		});
	}

	// _addAnimation : Ajoute un effet localisé à une tuile
	// code is src elem child seeked
	private addAnimation(posX: number, posY: number, target: JQuery, code: string) {
		let x, y, ink, d;

		if (this.app.loaded) {
			while (!target.attr("cardNumber") && target.parent()) {
				target = target.parent();
			}

			//create .ink element if it doesn't exist
			if (target.find("." + code).length === 0) {
				target.prepend("<span class='" + code + "'></span>");
			}

			ink = target.find("." + code + "");
			//incase of quick double clicks stop the previous animation
			ink.removeClass("animate");

			//set size of .ink
			if (!ink.height() && !ink.width()) {
				//use self's width or height whichever is larger for the diameter to make a circle
				//which can cover the entire element.
				d = Math.max(target.outerWidth(), target.outerHeight());
				ink.css({
					height: d,
					width: d
				});
			}

			//get click coordinates
			//logic = click coordinates relative to page - self's position relative
			//to page - half of self height/width to make it controllable from the center;
			x = posX - target.offset().left - ink.width() / 2;
			y = posY - target.offset().top - ink.height() / 2;

			//set the position and add class .animate
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).addClass("animate");
		}
	}

	//_addEvents_CardConfigurations : Ajoute un écouteur pour éditer les cartes
	private addEvents_CardConfigurations() {
		let self = this;
		let timerConfigRipple: number;
		let timerFireConfig: number;
		let target: JQuery;
		let posX: number;
		let posY: number;

		//gestion du touch hold
		//Lors du début d'un appui long, on ajoute une onde
		let _onStartTapHolding = function() {
			// console.debug("_onStartTapHolding");
			self.addAnimation(posX, posY, target, "ink-slow");
			self.isTapHolding = true;
		};
		//Lors d'un appui long on affiche la configuration d'une carte
		let _onlongtouch = function() {
			self.clearTouchHoldRipple(timerConfigRipple, timerFireConfig);
			if (self.app.loaded) {
				//On donne l'élément configuré
				while (!target.attr("cardNumber") && target.parent()) {
					target = target.parent();
				}
				let index = target.attr("cardNumber");
				if (index) {
					// let widget = self.card_widgets[index];
					self.app.views.getCardConfigurator().onClick(+index);
				}

			}
			self.isTapHolding = false;
		};


		$(".ripple").on('touchstart', function(e: JQueryEventObject, ...args: any[]) {
			target = $(e.target);
			let touchEvent = <TouchEvent>e.originalEvent;
			posX = touchEvent.touches[0].pageX;
			posY = touchEvent.touches[0].pageY;
			timerConfigRipple = setTimeout(_onStartTapHolding, AppGrid.TAP_HOLD_DURATION);
			timerFireConfig = setTimeout(_onlongtouch, AppGrid.CONFIG_HOLD_DURATION);
		});
		$(".ripple").on('mousedown', function(e: JQueryEventObject, ...args: any[]) {
			target = $(e.target);
			let mouseEvent = <MouseEvent>e.originalEvent;
			posX = mouseEvent.pageX;
			posY = mouseEvent.pageY;
			timerConfigRipple = setTimeout(_onStartTapHolding, AppGrid.TAP_HOLD_DURATION);
			timerFireConfig = setTimeout(_onlongtouch, AppGrid.CONFIG_HOLD_DURATION);
		});

		$(".ripple").on('touchend', function(e) {
			self.clearTouchHoldRipple(timerConfigRipple, timerFireConfig);
		});
		$(".ripple").on('mouseup', function(e) {
			self.clearTouchHoldRipple(timerConfigRipple, timerFireConfig);
		});
	}
	// _clearTouchHoldRipple : Supprime les effets de ripples longs
	private clearTouchHoldRipple(timerConfigRipple: number, timerFireConfig: number) {
		if (timerConfigRipple) {
			clearTimeout(timerConfigRipple);
		}
		if (timerFireConfig) {
			clearTimeout(timerFireConfig);
		}
		$(".ink-slow").remove();
		this.isTapHolding = false;
	}
	// ========================================== PRIVILEGED ================================
	/**
	 * When a card has been manually edited
	 * @param  {int} index	  index of card
	 * @param  {Widget_Card} cardEdited the new widget selected
	 */
	public onCardEdit(index: number, cardEdited: WidgetCard) {
		this.app.listCards.replaceCard(index, cardEdited.card);
		this.fill();
	}
}
