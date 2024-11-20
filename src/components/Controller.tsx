function Controller() {
	return (
		<div class="flex justify-evenly py-2">
			<div>
				<label for="voice">声：</label>
				<select name="voice">
					<option value="">選択してください</option>
				</select>
			</div>
			<div>
				<label for="volume">音量：</label>
				<input type="range" name="volume" min="0" max="1" />
			</div>

			<div class="space-x-2">
				<button type="button">ゆっくり再生</button>
				<button type="button">普通に再生</button>
				<button type="button">停止</button>
				<button type="button">消去</button>
			</div>
		</div>
	);
}

export default Controller;
