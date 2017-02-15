export class Dialogs {
	public static showMaskPanel(onExit: Function) {
		Dialogs.inner_showMaskPanel(this, true, onExit);
	}
	public static showModalMaskPanel() {
		Dialogs.inner_showMaskPanel(this, false, null);
	}
	public static hideMaskPanel() {
		Dialogs.inner_hideMaskPanel(this);
	}
	public static showPopupPanel() {
		Dialogs.inner_showPopupPanel(this);
	}
	public static hidePopupPanel() {
		Dialogs.inner_hidePopupPanel(this);
	}
	public static showErrorPanel(msg: string) {
		Dialogs.inner_showErrorPanel(this, msg);
	}
	public static hideErrorPanel() {
		Dialogs.inner_hideErrorPanel(this);
	}
	public static showLoadingPanel(msg: string) {
		Dialogs.inner_showLoadingPanel(this, msg);
	}
	public static hideLoadingPanel() {
		Dialogs.inner_hideLoadingPanel(this);
	}

	// showMaskPanel : Affiche un masque sur l'application
	private static inner_showMaskPanel(caller: any, exitable: boolean, onExit: Function) {
		(function(window, $) {
			let maskPanel = $(".mask");
			maskPanel.html("");
			maskPanel.addClass("visible");


			if (exitable) {
				maskPanel.on("click", function(e) {
					onExit.call(caller);
				});
			}
		})(window, jQuery);
	};
	private static inner_hideMaskPanel(caller: any) {
		(function(window: Window, $: JQueryStatic) {
			let maskPanel = $(".mask");
			maskPanel.html("");
			maskPanel.removeClass("visible");
			maskPanel.off("click");
		})(window, jQuery);
	}

	// showPopupPanel : Affiche un masque pour une popup
	private static inner_showPopupPanel(caller: any) {
		(function(window: Window, $: JQueryStatic) {
			let maskPanel = $(".popup");
			maskPanel.html("");
			maskPanel.addClass("visible");
		})(window, jQuery);
	}
	private static inner_hidePopupPanel(caller: any) {
		(function(window: Window, $: JQueryStatic) {
			let maskPanel = $(".popup");
			maskPanel.html("");
			maskPanel.removeClass("visible");
		})(window, jQuery);
	}

	private static inner_showErrorPanel(caller: any, msg: string) {
		(function(window: Window, $: JQueryStatic) {
			Dialogs.inner_showMaskPanel(caller, true, Dialogs.hideErrorPanel);

			let maskPanel = $(".mask");
			let context = {
				type: "error",
				header: {
					icon: "sad",
					message: "Onoz !"
				},
				messages: [msg],
				footer: {
					buttons: ["ok"]
				}
			};
			maskPanel.html(Lyloochat.templates.widget_dialog(context));
		})(window, jQuery);
	}


	private static inner_hideErrorPanel(caller: any) {
		Dialogs.inner_hideMaskPanel(caller);
	}


	private static inner_showLoadingPanel(caller: any, msg: string) {
		(function(window, $) {
			Dialogs.inner_showMaskPanel(caller, false, Dialogs.hideLoadingPanel);

			let maskPanel = $(".mask");
			let context = {
				type: "loading",
				messages: [msg]
			};
			maskPanel.html(Lyloochat.templates.widget_dialog(context));
		})(window, jQuery);
	}


	private static inner_hideLoadingPanel(caller: any) {
		Dialogs.inner_hideMaskPanel(caller);
	}
}
