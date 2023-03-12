## セットアップ方法

- ` $ npm install `を行うこの際` npm audit fix `を行えと警告が出るが無視してok.
- ` .env `を作成し, 以下に記載されている` .env `の内容をコピーする.
- ` $ npm start `を行う.
- 新たにターミナルを開き, ` $ node src/server/index.js `を実行する.
- ` localhost:3000 `を開けばログイン画面又はチャット画面が表示されます.

## .env

```
REACT_APP_API_KEY="AIzaSyC7v_CRU-zXDjiKAKz5dMq3YMM2lfDLXu8"
REACT_APP_AUTH_DOMAIN="react-intern-5110b.firebaseapp.com"
REACT_APP_PROJECT_ID="react-intern-5110b"
REACT_APP_STORAGE_BUCKET="react-intern-5110b.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="929211242852"
REACT_APP_APP_ID="1:929211242852:web:657c650c45204840270271"
REACT_APP_MEASUREMENT_ID="G-4KNZ69M9R6"
```
