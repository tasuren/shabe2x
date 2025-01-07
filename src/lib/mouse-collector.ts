type MousePosition = { x: number; y: number };

/**
 * マウスの場所を取得するためのクラス
 */
export class Mouse {
	private resolve: ((position: MousePosition) => void) | null;
	private before: MousePosition;
	private eventListener: (event: MouseEvent) => void;

	constructor() {
		this.resolve = null;
		this.before = { x: 0, y: 0 };

		this.eventListener = (e) => this.onMouseMove(this, e);
		addEventListener("mousemove", this.eventListener);
	}

	private onMouseMove(mouse: Mouse, event: MouseEvent) {
		if (!mouse.resolve) return;

		mouse.resolve({ x: event.pageX, y: event.pageY });
	}

	async getMousePosition(): Promise<MousePosition> {
		const position = await new Promise<MousePosition>((resolve) => {
			this.resolve = resolve;

			setTimeout(() => resolve(this.before), 100);
		});

		this.resolve = null;
		this.before = position;

		return position;
	}

	close() {
		removeEventListener("mousemove", this.eventListener);
	}
}
