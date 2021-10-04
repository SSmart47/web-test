const firebaseConfig={apiKey:"AIzaSyCOIQr3REsBR9gTfPNo37uDiruxsLibrM8",authDomain:"testcontent-d38c2.firebaseapp.com",databaseURL:"https://testcontent-d38c2-default-rtdb.firebaseio.com",projectId:"testcontent-d38c2",storageBucket:"testcontent-d38c2.appspot.com",messagingSenderId:"958227719442",appId:"1:958227719442:web:bb8bd9dd4e8fde1a817fcb"};var Data;firebase.initializeApp(firebaseConfig);var username=localStorage.getItem("ss47_webtest_user_i"),_u_n_=localStorage.getItem("ss47_webtest_user_n");function JsonToList(e){var t=e,n=[];for(var r in t)n.push([r,t[r]]);return n}async function CheckUser(){await firebase.database().ref().get().then(e=>{e.exists()?(Data=e.val(),UpdateUsersTests()):console.log("Server Error!")}).catch(e=>{alert("No Connection!"),console.error(e)})}function _NewArray(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n]);return t}function ToInteger(e){return e.charCodeAt(0)}function ToChar(e){return String.fromCharCode(parseInt(e))}function Encrypt(e){var t="";t+=e;for(var n="",r=0;r<t.length;r++)n+="%"+ToInteger(t[r]);return n}function Decode(e){var t="",n="";e+="%";for(var r=1;r<e.length;r++)"%"==e[r]?(t+=ToChar(n),n=""):n+=e[r];return t}function FixedSpace(e){var t="";if(0==e.length)return"";t+=e[0];for(var n=1;n<e.length;n++)e[n]==e[n-1]&&" "==e[n]?t+="&nbsp":t+=e[n];return t}function Fixed(e){for(var t=FixedSpace(e),n="",r=0;r<t.length;r++)"<"==t[r]?n+="&lt;":">"==t[r]?n+="&gt;":n+=t[r];return n}function IsEmpty(e){for(var t=0;t<e.length;t++)if(" "!=e[t])return!1;return!0}function FixedQID(e){var t="";for(t+=e;t.length<5;)t="0"+t;return t}function FixedJsonStr(e){for(var t="",n=0;n<e.length;n++)"\n"!=e[n]&&" "!=e[n]&&"\t"!=e[n]&&(t+=e[n]);return t}function _FixedQuestionNumber(e){var t="";for(t+=e;t.length<10;)t="0"+t;return t}function _Str(e){var t="";return t+=e}function UpdateUsersTests(){for(var e=1,t="",n=Data.users[username],r=(parseInt(n.questionnum),JsonToList(n)),s=0;s<r.length;s++)if("cancreatetests"!=r[s][0]&&"questionnum"!=r[s][0]&&"nick"!=r[s][0]){var o=r[s][1],a=Decode(o.config.testname),i=JsonToList(o.questions).length,c=Decode(o.config.time);"false"==_Str(Decode(o.config.intime))&&(c="");var u=r[s][0];t+="<tr>",t+='<th scope="row">'+e+"</th>",t+="<td>"+Fixed(a)+"</td>",t+="<td>",t+='<div class="btn-group">',t+='<button class="btn btn-secondary" onclick="SetTaskProperties(\''+a+"', '"+i+"', '"+c+'\')" data-toggle="modal" data-target="#taskProperties">Свойства</button>',t+='<button class="btn btn-success" onclick="EditTask(\''+u+"')\">Изменить</button>",t+='<button class="btn btn-danger" onclick="RemoveTask(\''+u+"')\">Удалить</button>",t+="</div>",t+="</td>",t+="</tr>",e++}document.getElementById("id_question_list").innerHTML=t}function SetTaskProperties(e,t,n){document.getElementById("id_ct_testname").innerText=""+e,document.getElementById("id_ct_questionnum").innerText=""+t,document.getElementById("id_testtime").innerText=""==n?"нет":n+" (чч:мм)"}function RemoveTask(e){firebase.database().ref("users/"+username+"/"+e).remove(),CheckUser()}function EditTask(e){localStorage.setItem("ss47_webtest_user_i",username),localStorage.setItem("ss47_webtest_user_n",_u_n_),localStorage.setItem("ss47_webtest_task_i",e),window.location="newtest/newtest.html"}CheckUser(),document.getElementById("id_btn_new_test").onclick=function(){localStorage.setItem("ss47_webtest_user_i",username),localStorage.setItem("ss47_webtest_user_n",_u_n_),localStorage.setItem("ss47_webtest_task_i",""),window.location="newtest/newtest.html"},document.getElementById("id_btn_back").onclick=function(){localStorage.setItem("ss47_webtest_user_i",username),localStorage.setItem("ss47_webtest_user_n",_u_n_),window.location="../../main.html"};
