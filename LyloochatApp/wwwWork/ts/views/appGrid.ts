import {LyloochatApp} from "../app";

export class AppGrid {
    // ========================================== VARIABLES =================================
	private const TAP_HOLD_DURATION = 100;
	private const CONFIG_HOLD_DURATION = 750;

    private busy = false;
    private isTapHolding = false;
    private card_widgets = [];

	constructor(private app: LyloochatApp) {
		this.fill();
	}

    // ========================================== PRIVATE ===================================
    // fill : Remplit la grille
    private fill() {
        //Création/RAZ grille
        let gridSource = document.getElementById("grid-cards");
		gridSource.innerHTML = '';
		this.card_widgets = [];
        for (let i = 0; i < this.app.model.listCards.length(); i++) {
            let card = app.model.listCards.getCard(i);

            let card_widget;
            if (card instanceof Card_Text) {
                card_widget = new Widget_Card_Text(this, card);
            }
            else if (card instanceof Card_Drawing) {
                card_widget = new Widget_Card_Drawing(this, card);
            }
            else if (card instanceof Card_Sound) {
                card_widget = new Widget_Card_Sound(this, card);
            }

            if (typeof card_widget !== 'undefined') {
				this.card_widgets.push(card_widget);
				card_widget.render(gridSource);
            } else {
                throw "Type de carte non supporté encore.";
            }

        }

        this.addEvents_RippleEffects();
        this._addEvents_CardConfigurations();
    }
    //_addEvents_RippleEffects : Colle un écouteur pour faire un petit effet su chaque carte
    private addEvents_RippleEffects() {
		let self = this;

		//gestion du tap
		$(".ripple").on('click', function(e) {
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

						_addAnimation.call(self, e, "ink");
						setTimeout(function() {
							widget.onCardThumbnailClick();
							self.busy = false;
						}, (TAP_HOLD_DURATION));
					}
				}
			} else {
				console.log("tap canceled");
			}
		});
    }

    // _addAnimation : Ajoute un effet localisé à une tuile
    private addAnimation(e, code) {
		let self, ink, d, x, y;

        let app = phonegapHandler.app;
        if (app.loaded) {
			self = $(e.target);
			while (!self.attr("cardNumber") && self.parent()) {
				self = self.parent();
			}

			//create .ink element if it doesn't exist
			if (self.find("." + code).length === 0)
				self.prepend("<span class='" + code + "'></span>");

			ink = self.find("." + code + "");
			//incase of quick double clicks stop the previous animation
			ink.removeClass("animate");

			//set size of .ink
			if (!ink.height() && !ink.width()) {
				//use self's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
				d = Math.max(self.outerWidth(), self.outerHeight());
				ink.css({
					height: d,
					width: d
				});
			}

			//get click coordinates
			//logic = click coordinates relative to page - self's position relative to page - half of self height/width to make it controllable from the center;
			x = e.pageX - self.offset().left - ink.width() / 2;
			y = e.pageY - self.offset().top - ink.height() / 2;

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
		let timerConfigRipple;
		let timerFireConfig;
		let event_start;

		//gestion du touch hold
		//Lors du début d'un appui long, on ajoute une onde
		let _onStartTapHolding = function() {
			// console.debug("_onStartTapHolding");
			_addAnimation.call(this, event_start, "ink-slow");
			self.isTapHolding = true;
		};
		//Lors d'un appui long on affiche la configuration d'une carte
		let _onlongtouch = function() {
			_clearTouchHoldRipple.call(this, timerConfigRipple, timerFireConfig);
			let app = phonegapHandler.app;
			if (app.loaded) {
				if (app.views.cardConfigurator === undefined) {
					app.views.cardConfigurator = new CardConfigurator(self);
				}

				//On donne l'élément configuré
				let elemCard = $(event_start.target);
				while (!elemCard.attr("cardNumber") && elemCard.parent()) {
					elemCard = elemCard.parent();
				}
				let index = elemCard.attr("cardNumber");
				if (index) {
					// let widget = self.card_widgets[index];
					app.views.cardConfigurator.onClick(index);
				}

			}
			self.isTapHolding = false;
		};


		$(".ripple").on('mousedown', function(e) {
			event_start = e;
			timerConfigRipple = setTimeout(_onStartTapHolding, TAP_HOLD_DURATION);
			timerFireConfig = setTimeout(_onlongtouch, CONFIG_HOLD_DURATION);


		});

		$(".ripple").on('mouseup', function(e) {
			_clearTouchHoldRipple.call(self, timerConfigRipple, timerFireConfig);
		});
    }
    // _clearTouchHoldRipple : Supprime les effets de ripples longs
    private clearTouchHoldRipple(timerConfigRipple, timerFireConfig) {
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
	 * @param  {int} index      index of card
	 * @param  {Widget_Card} cardEdited the new widget selected
	 */
	public onCardEdit(index, cardEdited) {
		app.model.listCards.replaceCard(index, cardEdited.card);
		_fill.call(this);
	}
}