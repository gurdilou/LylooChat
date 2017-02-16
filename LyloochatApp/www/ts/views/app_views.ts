import {AppMenu} from "./appMenu";
import {AppGrid} from "./appGrid";
import {LyloochatApp} from "../app";
import {CardConfigurator} from "./cardConfigurator";

export class AppViews {
	private grid: AppGrid = null;
	private menu: AppMenu = null;
	private cardConfigurator: CardConfigurator = null;

	constructor(private app: LyloochatApp) {
	}

	public getGrid(): AppGrid {
		if (!this.grid) {
			this.grid = new AppGrid(this.app);
		}
		return this.grid;
	}
	public getMenu(): AppMenu {
		if (!this.menu) {
			this.menu = new AppMenu(this.app);
		}
		return this.menu;
	}
	public getCardConfigurator(): CardConfigurator {
		if (!this.cardConfigurator) {
			this.cardConfigurator = new CardConfigurator(this.getGrid());
		}
		return this.cardConfigurator;
	}
}
