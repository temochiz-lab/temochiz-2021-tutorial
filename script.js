// 保存用のファイル名を生成
function yyyymmddhhmise() {
  // 日付時間秒を文字列で返す	
    const dt = new Date();
    var yyyy = dt.getFullYear();
    var mm = ('00' + (dt.getMonth()+1)).slice(-2);
    var dd = ('00' + dt.getDate()).slice(-2);
    var hh = ('00' + dt.getHours()).slice(-2);
    var mi = ('00' + dt.getMinutes()).slice(-2);
    var se = ('00' + dt.getSeconds()).slice(-2);
  
    var answer = yyyy + mm + dd + "-" + hh + mm + se ;
    return (answer);
  }
var filename = "temochiz-" + yyyymmddhhmise() + ".csv" ;
// 

var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', filename);
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 固定の実験パーツ
// ------------------------------------------------------------------------

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから大学生における魚の認知度についての実験を始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 5, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 5, required: true, name: 'age'},
  ],
  button_label: '次へ',
};

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験を始めます。 写真の前には1秒凝視点が出ます。<br><br>何かキーを押すと始まります。',
};

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};

// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで実験は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// 画像問題の作成
// ------------------------------------------------------------------------

// 画像ファイルの用意
var baseURL = './' ;
var examPictures = [
  { label: 'No.01 egi'           , filename: '1.jpg' },
  { label: 'No.02 akoudai'       , filename: '2.jpg' },
  { label: 'No.03 chikamekintoki', filename: '3.jpg' },
  { label: 'No.04 madako'        , filename: '4.jpg' },
];

// 選択肢
var myScale = '\
<font size=2>\
<center>\
これはどのくらい魚だと思いますか。\
<TABLE style=”border:none;border-collapse:collapse;">\
<TR>\
  <TD align="center">┣━━━━━━ 1 ━━━━━━<BR>魚</TD>\
  <TD align="center">┣━━━━━━ 2 ━━━━━━<BR>やや魚</TD>\
  <TD align="center">┣━━━━━━ 3 ━━━━━━<BR>どちらでもない</TD>\
  <TD align="center">┣━━━━━━ 4 ━━━━━━<BR>やや魚以外</TD>\
  <TD align="center">┣━━━━━━ 5 ━━━━━━┫<BR>魚以外</TD>\
</TR>\
</TABLE>\
</center>\
</font>\
' ;

// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examPictures,
  randomize_order: true,
};

// 画像問題の本体
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  '<img src="'+ baseURL + jsPsych.timelineVariable('filename') + '" height=350><br><br>'; },
    prompt: function () {return myScale; },
    choices: ["1","2","3","4","5"],
    data: {
      label: jsPsych.timelineVariable('label'),
    },
};

trials.timeline.push(eyepoint) ;
trials.timeline.push(exam) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([par_id,hello,trials,bye]);
