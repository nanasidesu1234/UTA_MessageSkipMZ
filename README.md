# RPGツクールMZ用プラグインテンプレート
RPGツクールMZ用プラグインの開発に利用する設定ファイル等をテンプレートにしたもの。  
毎回新規作成は流石に手間なので、githubのテンプレートリポジトリで利用できるようにする。

## ファイル/ディレクトリ構成

| ファイル/ディレクトリ | 説明 |
|:---:|:---|
| .vscode | VSCodeでのデバッグ実行等の設定ファイルを配置。 |
| src | ソースファイル用ディレクトリ。 |
| src/plugin/ts | TypeScriptソースファイルの配置場所。 |
| src/plugin/d.ts | TypeScript用型定義ファイルの配置場所。 |
| src/plugin/README_JP.txt | 日本語READMEファイル。 |
| src/plugin/README_EN.txt | 英語READMEファイル。 |
| test | テストプレイ用のディレクトリ。<br>この直下にツクールMZプロジェクトファイルを展開すると、ビルド時に自動的にプラグインをコピーして配置する。 |
| dest | ビルド結果配置ディレクトリ。 |
| deploy | パッケージング結果の配置ディレクトリ。 |
| package.json | npm用設定ファイル。 |
| package-lock.json | npm用依存関係記録ファイル。 |
| .eslintrc.json | ESLint用設定ファイル。 |
| .eslintignore | ESLintの除外定義ファイル。 |
| .gitattributes | Git用の設定ファイル。 |
| .gitignore | Git用除外定義ファイル。 |
| tsconfig.json | TypeScript用設定ファイル。 |
| README.md | GitHub用のREADMEファイル。<br>デプロイ時には含めない。 |
| LICENSE | ライセンスファイル。デプロイ時に同梱される。 |

## 書き換えが必要な箇所
### package.json
npmパッケージとする訳では無いので必須では無い。

- `name`にプラグイン名を記述する。
- `description`にプラグインの概要を記述する。
- `version`は作成するプラグインの内容に合わせて調整。
- `config`に定義した各種変数を調整。
- `repository`に記載する`url`情報を当該git repositoryのものにする。
- `bugs`に記載する`url`情報を当該git repositoryのものにする。
- `homepage`に記載するreadmeファイルのアドレスを当該git repositoryのものにする。

### package-lock.json
こちらもnpmパッケージとする訳では無いので必須では無い。

- `name`にプラグイン名を記述する。
- `description`にプラグインの概要を記述する。

### tsconfig.json
- `compilerOptions`の`outFile`にて出力先ファイルを指定。

## 環境構築手順
`npm`が利用できる環境である事を前提とする。  
ビルドに必要なパッケージなどをインストールを行う為、`npm install`を実行する。

```shell
$ npm install
```

## ビルド手順
ビルド用にnpmスクリプトを用意している。

```shell
# デバッグビルドを実行
$ npm run build:debug
```

ビルドして`dest`ディレクトリに成果物を配置するのと同時に、`test`ディレクトリ以下のプラグイン配置ディレクトリにコピーする。  
ビルド後すぐにRPGツクールMZでテストプレイが可能な様にしている。

## 試験手順
RPGツクールMZプロジェクトでビルドプラグインを設定して、実際に動作させての試験とする。  
場合によってはテストコードを書いて単体テストしても良いが、実際に動く事や競合を確認した方が現実的。

VSCodeを利用している場合は、デバッガーが利用できる。  
ブラウザ版での動作確認はこちらで行う。

| デバッグ設定 | 説明 |
|:---:|:---|
| chrome debug | chrome向けのデバッグ設定。 |
| nw.js debug | NW.js向けのデバッグ設定。<br>RPGツクールMVで利用しているNW.jsのバージョンに合わせてある。 |

## デプロイ手順
デプロイ対象となるファイルを用意した状態で、以下のコマンドを実行する。

```shell
# リリースビルドや各種ドキュメントを収集
$ npm run preparation
# deployディレクトリにzip化したデプロイ対象を出力
$ npm run deploy
```

デプロイ対象とするファイルは以下の通り。

- リリースビルドしたプラグインファイル
- 日本語、英語のREADME.txtファイル
- LICENSEファイル
- マニュアルファイル
