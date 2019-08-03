(function () {
  'use strict'; /**
  HTMLのid要素からconst変数を作成する */
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  /**
  * 指定したHTML要素の子要素を全て削除する
  * @param {HTMLElement} element HTML HTMLの要素
  */
  function removeAllChildren(element) {
    while (element.firstChild) { // 子要素があるかぎり削除、while 回数を定めてないループ
      element.removeChild(element.firstChild);
    }
  }

  assessmentButton.onclick = () => { //アロー関数表記
    const userName = userNameInput.value;　// .value 値の意
    if (userName.length === 0) { // 名前が空の時は
      return; //直ちに処理を終了する、ガード句
    }

    // 診断結果表示エリアの作成1
    removeAllChildren(resultDivided); // resultDividedの中を空にする

    const result = assessment(userName); //診断結果取得

    // 診断結果表示エリアの作成2
    const header = document.createElement('h3');　//jsからhtmlタグを足す
    header.innerText = '診断結果';　//作ったタグの中に文章を表示
    resultDivided.appendChild(header);　//appendchild 子要素を足す

    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //  ツイートエリアの作成
    removeAllChildren(tweetDivided); //tweetDividedの中を空にする
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue); //Attribute アトリビュート　属性の意
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();　//出来上がったaタグをツイッターボタンに置き換える

  };

  const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心にのこります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気をひかれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救ってます。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    
  ];

  /**
  * 名前の文字列を渡すと診断結果を返す関数
  * @param {string} userName ユーザーの名前　string 文字列の意 @param 引数
  * @return {string} 診断結果　@return 返値
  */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) { //文字列自体が配列要素数を持ってる
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);　//sumOfcharcode += userName.charcodeAt(i);でもよい
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfcharCode % answers.length;
    let result = answers[index];　// index 配列の要素の添字　[]でくくるのを注意
    result = result.replace(/\{userName\}/g, userName);　//{uN}をuNに置き換えてresultに代入　正規表現
    return result;
  }

  userNameInput.onkeydown = (event) => { //event ユーザーの入力行動
    if (event.key === 'Enter') { 
      assessmentButton.onclick(); //ボタンのonclick()で関数を実行させる
    }
  };

  //console.log(assessment('太郎'));
  //テストコード
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
})();


