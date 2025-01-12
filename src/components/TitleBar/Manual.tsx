import { cl } from "@/lib/ui";

function Image(props: { src: string; alt: string }) {
    return (
        <img
            src={props.src}
            alt={props.alt}
            class="block mx-auto py-2 max-w-full h-auto"
        />
    );
}

function Manual(props: { class: string }) {
    return (
        <div class={cl(props.class, "p-2")}>
            <h1>説明書</h1>
            <p>
                しゃべしゃべはブラウザ標準の音声合成機能を使用したシャドーイング支援アプリです。
                <br />
                HTML文書のコピー＆ペーストに対応しているため、
                ニュース記事などの文章をシャドーイングに使うこともできます。
            </p>

            <h2>各操作方法</h2>
            <Image src="main-controller.webp" alt="画面上部にある操作パネル" />
            <p>基本的な操作は画面上部にあるこのパネルで行えます。</p>
            <ul>
                <li>声: 読み上げる際に使う声の種類</li>
                <li>音量: 読み上げる際の音量</li>
                <li>ゆっくり再生: 文章をゆっくり読み上げ</li>
                <li>再生: 文章を通常通り読み上げる</li>
                <li>消去: 文章を消去する</li>
            </ul>
            <p>
                なお、文章を選択している状態で再生ボタンを押すと、選択範囲のみを読み上げることができます。
            </p>

            <h2>PC／タブレットのみの機能</h2>
            <Image
                src="quick-controller.webp"
                alt="大きい画面で文章を選択した際に表示される小さい操作パネル"
            />
            <p>
                PC／タブレットのような広い画面が使える場合、文章選択時に上記のようなポップアップが表示されます。
                <br />
                これを使うことで、いちいち画面上部にあるパネルを操作することなく、すぐ読み上げなどを行えます。
            </p>

            <h2>対応ブラウザ</h2>
            <p>
                このアプリは読み上げにウェブ音声 APIを使っており、
                このAPIは最新のため古いブラウザでは動きません。
                <br />
                少なくとも以下のブラウザの動作を確認しています。
            </p>

            <ul>
                <li>Windows: Edge</li>
                <li>Android: Chrome、FireFox</li>
                <li>macOS: Safari、Chrome</li>
                <li>iOS: Safari</li>
            </ul>

            <h2>その他</h2>
            <ul>
                <li>
                    ソースコード：
                    <a href="https://github.com/tasuren/shabe2x">GitHub</a>
                </li>
                <li>
                    開発者のホームページ：
                    <a href="https://tasuren.jp">tasuren.jp</a>
                </li>
            </ul>
        </div>
    );
}

export default Manual;
