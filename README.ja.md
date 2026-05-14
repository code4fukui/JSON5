# JSON5

JSON5 は、人気のある JSON ファイル形式の拡張であり、**手作業で記述しやすく、保守しやすい（例：設定ファイルなど）**ことを目指しています。マシン間通信での使用は*意図されていません*。

## 機能
JSON ではサポートされていない、以下の ECMAScript 5.1 の機能が JSON5 に拡張されています。

- オブジェクトのキーに ECMAScript 5.1 の _[IdentifierName]_ を使用できます。
- オブジェクトの末尾に単一のカンマを付けることができます。
- 配列の末尾に単一のカンマを付けることができます。
- 文字列をシングルクォートで囲むことができます。
- 改行文字をエスケープすることで、文字列を複数行に記述できます。
- 文字列に文字エスケープを含めることができます。
- 数値を16進数で記述できます。
- 数値の先頭または末尾に小数点を付けることができます。
- 数値として [IEEE 754] の正の無限大、負の無限大、および NaN を使用できます。
- 数値の先頭に明示的なプラス記号を付けることができます。
- 単一行および複数行コメントを使用できます。
- 追加の空白文字が許可されています。

## 仕様
JSON5 形式の詳細な説明については、[公式仕様](https://json5.github.io/json5-spec/)をご覧ください。

## 使用方法

```js
import { JSON5 } from "https://code4fukui.github.io/JSON5/JSON5.js";

const s = `{
  a: "abc", // comment
  b: 123, /* comment */
}`;

const obj = JSON5.parse(s);
console.log(obj);
const s2 = JSON5.stringify(obj);
console.log(s2);
```

## CLI
このパッケージには、JSON5 を JSON に変換したり、JSON5 ドキュメントの構文を検証したりするための CLI が含まれています。

## 貢献
コードをコントリビュートする際は、関連するテストを記述し、プルリクエストを送信する前に `npm test` と `npm run lint` を実行してください。

## セキュリティ脆弱性と開示
セキュリティ脆弱性を報告する場合は、メンテナに直接連絡してください。

[IdentifierName]: https://www.ecma-international.org/ecma-262/5.1/#sec-7.6
[IEEE 754]: http://ieeexplore.ieee.org/servlet/opac?punumber=4610933
