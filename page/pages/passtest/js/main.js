const firebaseConfig={apiKey:"AIzaSyCOIQr3REsBR9gTfPNo37uDiruxsLibrM8",authDomain:"testcontent-d38c2.firebaseapp.com",databaseURL:"https://testcontent-d38c2-default-rtdb.firebaseio.com",projectId:"testcontent-d38c2",storageBucket:"testcontent-d38c2.appspot.com",messagingSenderId:"958227719442",appId:"1:958227719442:web:bb8bd9dd4e8fde1a817fcb"};firebase.initializeApp(firebaseConfig);var Data,Task,Content=document.getElementById("id_main_content"),last_time="",CheckedInEnd=!1,_mixnum_question=101,_mixnum_variant=101,current_question_index=0,cmatrix=[],cmatrix_true=[],tasks=[],Configuration={TestName:"undefined",TestInTime:!1,TestTime:"00:00",RandomQuestions:!1,RandomVariants:!1},username=localStorage.getItem("ss47_webtest_user_i"),_u_n_=localStorage.getItem("ss47_webtest_user_n"),___question_id=localStorage.getItem("ss47_webtest_task_qi"),___user_q_id=localStorage.getItem("ss47_webtest_task_ui");function __Array(t){for(var n=parseInt(t),e=[],r=0;r<n;r++)e.push(-1);return e}function Rand(){return parseInt(1e4*Math.random())}function JsonToList(t){var n=t,e=[];for(var r in n)e.push([r,n[r]]);return e}function _NewArray(t){for(var n=[],e=0;e<t.length;e++)n.push(t[e]);return n}function ToInteger(t){return t.charCodeAt(0)}function ToChar(t){return String.fromCharCode(parseInt(t))}function Encrypt(t){var n="";n+=t;for(var e="",r=0;r<n.length;r++)e+="%"+ToInteger(n[r]);return e}function Decode(t){var n="",e="";t+="%";for(var r=1;r<t.length;r++)"%"==t[r]?(n+=ToChar(e),e=""):e+=t[r];return n}function FixedSpace(t){var n="";if(0==t.length)return"";n+=t[0];for(var e=1;e<t.length;e++)t[e]==t[e-1]&&" "==t[e]?n+="&nbsp":n+=t[e];return n}function Fixed(t){var n=FixedSpace(t);console.log(n);for(var e="",r=0;r<n.length;r++)"\n"==n[r]?e+="<br>":"<"==n[r]?e+="&lt;":">"==n[r]?e+="&gt;":e+=n[r];return e}function IsEmpty(t){for(var n=0;n<t.length;n++)if(" "!=t[n])return!1;return!0}function FixedQID(t){var n="";for(n+=t;n.length<5;)n="0"+n;return n}function FixedJsonStr(t){for(var n="",e=0;e<t.length;e++)"\n"!=t[e]&&" "!=t[e]&&"\t"!=t[e]&&(n+=t[e]);return n}function _FixedQuestionNumber(t){var n="";for(n+=t;n.length<10;)n="0"+n;return n}function _Str(t){var n="";return n+=t}function SetConfiguration(){var t=Data.users[___user_q_id][___question_id].config;Configuration.TestName=Decode(t.testname),"true"==_Str(Decode(t.intime))&&(Configuration.TestInTime=!0,Configuration.TestTime=Decode(t.time)),"true"==_Str(Decode(t.randquestion))&&(Configuration.RandomQuestions=!0),"true"==_Str(Decode(t.randvariant))&&(Configuration.RandomVariants=!0)}function MixQuestions(){var t=tasks.length;if(1!=t){var n=0;n+=_mixnum_question;for(var e=0;e<n;e++){for(var r=Rand()%t,s=Rand()%t;s==r;)s=Rand()%t;var a=_NewArray(tasks[r]),i=_NewArray(tasks[s]);tasks[r]=_NewArray(i),tasks[s]=_NewArray(a)}}}function MixVariants(){var t=0;tasks.length;t+=_mixnum_question;for(var n=0;n<tasks.length;n++){for(var e=tasks[n].length,r=e-2,s=tasks[n][e-1],a=0;a<t;a++){for(var i=Rand()%r,o=Rand()%r;o==i;)o=Rand()%r;i++,o++;var u=_Str(tasks[n][i]),_=_Str(tasks[n][o]);tasks[n][i]=_Str(_),tasks[n][o]=_Str(u),i==s?s=parseInt(o):o==s&&(s=parseInt(i))}tasks[n][e-1]=parseInt(s)}}function UpdateTaskVar(){tasks=[],SetConfiguration(),Task=JsonToList(Data.users[___user_q_id][___question_id].questions);for(var t=0;t<Task.length;t++){var n=-1,e=[],r=Decode(Task[t][1].value);e.push(r);for(var s=JsonToList(Task[t][1].variants),a=0;a<s.length;a++){var i=Decode(s[a][1].truevar),o=Decode(s[a][1].value);"1"==_Str(i)&&(n=a+1),e.push(_Str(o))}e.push(n),tasks.push(_NewArray(e))}Configuration.RandomQuestions&&MixQuestions(),Configuration.RandomVariants&&MixVariants()}async function CheckUser(){await firebase.database().ref().get().then(t=>{t.exists()?(Data=t.val(),UpdateTaskVar(),document.getElementById("id_test_info").innerHTML=Fixed(Data.users[___user_q_id].nick)+' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg> '+Fixed(Configuration.TestName),Content.innerHTML='\n\n\t\t\t<center>\n\t\t\t\t<button class="btn btn-primary" onclick="StartTesting()" style="width: 200px; height: 70px; font-size: 24px; font-weight: 900;">СТАРТ</button>\n\t\t\t</center>\n\n\t\t\t'):console.log("Server Error!")}).catch(t=>{alert("No Connection!"),console.error(t)})}function _MOD(t,n){var e=parseFloat(t),r=parseFloat(n);return e-=r*parseInt(e/r)}function StopTesting(){if(!CheckedInEnd){CheckedInEnd=!0,last_time="00:00:00",Content.innerHTML="",console.log("TEST END!"),alert("ТЕСТИРОВАНИЕ ЗАВЕРШЕНО!");for(var t=tasks.length,n=0,e=0;e<cmatrix.length;e++)cmatrix[e]+1==cmatrix_true[e]&&n++;var r=255,s=0,a=parseFloat(n)/parseFloat(t)*100;a<=50?s=2*a/100*255:(s=255,r=255-2*(a-50)/100*255);var i=parseInt(n);if(null==Data.users[___user_q_id][___question_id].results);else if(null==Data.users[___user_q_id][___question_id].results[username]);else{var o=parseInt(Data.users[___user_q_id][___question_id].results[username].maxscore);o>i&&(i=parseInt(o))}firebase.database().ref("users/"+___user_q_id+"/"+___question_id+"/results/"+username).set({maxscore:i}),Content.innerHTML='\n\t<center>\n  \n  <font class="css-result">Результат</font>\n  <br>\n  <font class="css-res-num" style="color: rgb('+r+", "+s+', 0);">'+n+"/"+t+'</font>\n  <br><br>\n  <button class="btn btn-primary" onclick="BackToMain()">В ГЛАВНОЕ МЕНЮ</button>\n\n</center>'}}function UpdateQuestionIndex(){document.getElementById("id_question_index").innerHTML="Question "+(current_question_index+1)+"/"+tasks.length}function NextQuestion(){document.getElementById("id_task_question_"+current_question_index).setAttribute("hidden","hidden"),current_question_index++,current_question_index%=tasks.length,document.getElementById("id_task_question_"+current_question_index).removeAttribute("hidden"),UpdateQuestionIndex()}function PreviousQuestion(){document.getElementById("id_task_question_"+current_question_index).setAttribute("hidden","hidden"),--current_question_index<0&&(current_question_index=tasks.length-1),document.getElementById("id_task_question_"+current_question_index).removeAttribute("hidden"),UpdateQuestionIndex()}function ChosenVariant(t,n){var e=parseInt(t),r=parseInt(n);-1!=cmatrix[e]&&(document.getElementById("_v_i_d_"+e+"_"+cmatrix[e]).checked=!1),cmatrix[e]=parseInt(r)}function SubStr(t,n,e){var r=_Str(t),s="",a=parseInt(n),i=parseInt(e);a<0&&(a=0),i>r.length&&(i=r.length);for(var o=a;o<i;o++)s+=r[o];return s}function Len2(t){var n="";for(n+=t;n.length<2;)n="0"+n;return n}function LowerTime(){var t=_Str(last_time),n=SubStr(t,0,2),e=SubStr(t,3,5),r=SubStr(t,6,8),s=parseInt(n),a=parseInt(e),i=parseInt(r);i+60*a+3600*s!=0?(i=i+60*a+3600*s-1,s=parseInt(i/3600),i%=3600,a=parseInt(i/60),i%=60,last_time=_Str(Len2(s)+":"+Len2(a)+":"+Len2(i)),document.getElementById("id_main_time").innerHTML=_Str(last_time)):StopTesting()}function StartTesting(){cmatrix=__Array(tasks.length),cmatrix_true=[],Content.innerHTML="";var t="";Configuration.TestInTime?t+='\n\n\t\t<center>\n\n\t\t<div class="btn-group">\n\n\t\t<button class="btn btn-secondary" onclick="PreviousQuestion()">Предыдущий вопрос</button>\n\n\t\t<button class="btn btn-dark" onclick="StopTesting()">ЗАВЕРШИТЬ ТЕСТИРОВАНИЕ</button><br><br>\n\t\t\n\t\t<button class="btn btn-secondary" onclick="NextQuestion()">Следующий вопрос</button>\n\n\t\t</div>\n\n\t\t<br><br>\n\n\t\t<button class="btn btn_dark">\n\t\t<font class="css-time-text" id="id_question_index">Question 1/'+tasks.length+'</font>\n\t\t</button>\n    \n    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-clock-history" viewBox="0 0 16 16">\n  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>\n  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>\n  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>\n</svg>\n\n  <font class="css-time-text" id="id_main_time">00:00:00</font>\n\n  </center>\n\n  <br>\n\n\t\t':t+='\n\n\t\t<center>\n\n\t\t<div class="btn-group">\n\n\t\t<button class="btn btn-secondary" onclick="PreviousQuestion()">Предыдущий вопрос</button>\n\n\t\t<button class="btn btn-dark" onclick="StopTesting()">ЗАВЕРШИТЬ ТЕСТИРОВАНИЕ</button><br><br>\n\t\t\n\t\t<button class="btn btn-secondary" onclick="NextQuestion()">Следующий вопрос</button>\n\n\t\t</div>\n\n\t\t<br><br>\n\n\t\t<button class="btn btn_dark">\n\t\t<font class="css-time-text" id="id_question_index">Question 1/'+tasks.length+"</font>\n\t\t</button>\n\n  </center>\n\n  <br>\n\n\t\t";for(var n=0;n<tasks.length;n++){var e=_NewArray(tasks[n]),r=e.length,s=_Str(e[0]),a=parseInt(e[r-1]);e.splice(r-1,1),e.splice(0,1),r-=2,cmatrix_true.push(a);for(var i="",o=0;o<r;o++){var u="_v_i_d_"+n+"_"+o;i+='<tr>\n      <td>\n        <div class="custom_radio">\n          <input type="radio" id="'+u+'" onchange="ChosenVariant(\''+n+"', '"+o+'\')"><label class="css-label" for="'+u+'">'+Fixed(e[o])+"</label>\n        </div>\n      </td>\n    </tr>"}t+='\n\n\t\t<div id="id_task_question_'+n+'" hidden="hidden">\n\n\t\t\t<div class="css-question">'+Fixed(s)+'</div>\n\n\t\t\t<br>\n\n\t\t\t<center>\n\n\t\t\t\t<table border="0" style="text-align: left;">'+i+"</table>\n\n\t\t\t</center>\n\n\t\t</div>\n\n\t\t"}Content.innerHTML=t,document.getElementById("id_task_question_0").removeAttribute("hidden"),Configuration.TestInTime&&(document.getElementById("id_main_time").innerHTML=Configuration.TestTime+":00",last_time=_Str(Configuration.TestTime+":00"),setInterval(LowerTime,1e3))}function BackToMain(){localStorage.setItem("ss47_webtest_user_i",username),localStorage.setItem("ss47_webtest_user_n",_u_n_),window.location="../../main.html"}CheckUser();
