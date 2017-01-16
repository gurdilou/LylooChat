import {AppMenu} from "./appMenu";
import {AppGrid} from "./appGrid";
import {LyloochatApp} from "../app";

export class AppViews {
	private grid: AppGrid = null;
	private menu: AppMenu = null;

	public initGrid(app: LyloochatApp) {
		this.grid = new AppGrid(app);
	}
	public getGrid(): AppGrid {
		return this.grid;
	}
    public initMenu(app: LyloochatApp) {
		this.menu = new ApMenu(app);
	}
	public getMenu(): AppMenu {
		return this.menu;
	}
}
