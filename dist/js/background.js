"use strict";function handleClientLoad(){gapi.load("client:auth2")}var bgMod=angular.module("UHistoryBg",[]);bgMod.config(["$compileProvider",function(e){e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):/)}]),bgMod.controller("BgCtrl",["$scope","$window","$filter","$interval",function(e,t,n,i){e.firstAuth=i(function(){e.refreshToken()},1e3,1),e.autoAuth=i(function(){e.refreshToken()},18e5),e.refreshToken=function(){"undefined"!=typeof gapi&&chrome.identity.getAuthToken({interactive:!1},function(t){null!=t&&(gapi.auth.setToken({access_token:t}),gapi.client.load("drive","v3").then(function(){e.checker(e.backupHelper)}))})},e.checker=function(t){if("undefined"!=typeof gapi){var n=new Date,i="UHB"+n.getFullYear()+n.getMonth()+".csv";gapi.client.drive.files.list({q:"trashed = false and name = '"+i+"'",fields:"nextPageToken, files(id, name)"}).then(function(n){var i=n.result.files;return!!(i&&i.length>0)||!!t&&(t(),setTimeout(e.progressChecker,6e3),!1)})}},e.progressChecker=function(){e.checker()},e.backupHelper=function(){gapi.client.drive.files.list({q:"mimeType = 'application/vnd.google-apps.folder' and name = 'UHistoryBackup'",fields:"nextPageToken, files(id, name)"}).then(function(t){var n=t.result.files;if(n&&n.length>0)e.historyReader(n[0].id,e.saveToFolder);else{var i={name:"UHistoryBackup",mimeType:"application/vnd.google-apps.folder"};gapi.client.drive.files.create({resource:i}).then(function(t){switch(t.status){case 200:var n=t.result;e.historyReader(n.id,e.saveToFolder);break;default:console.log("Error creating the folder, "+t)}})}})},e.saveToFolder=function(e,t,n){const i="\r\n--(/= _ =)/~\r\n";var a=new Date,o="UHB"+a.getFullYear()+a.getMonth()+".csv",r=new FileReader;r.readAsBinaryString(e),r.onload=function(a){var s=e.type,l={name:o,mimeType:s,parents:[t]},c=btoa(r.result),d=i+"Content-Type: application/json\r\n\r\n"+JSON.stringify(l)+i+"Content-Type: "+s+"\r\nContent-Transfer-Encoding: base64\r\n\r\n"+c+"\r\n--(/= _ =)/~--",u=gapi.client.request({path:"/upload/drive/v3/files",method:"POST",params:{uploadType:"multipart"},headers:{"Content-Type":'multipart/mixed; boundary="(/= _ =)/~"'},body:d});n||(n=function(e){console.log(e)}),u.execute(n)}},e.historyReader=function(n,i){var a=new Date,o=e.getLastMonthPeriod(a);chrome.history.search({text:"",maxResults:9999999,startTime:o[0].getTime(),endTime:o[1].getTime()},function(a){t.res=a;var o=Object.keys(a[0]);e.append(o.join(","));for(var r,s=0;s<a.length;s++){r="";for(var l=0;l<o.length;l++)r+=JSON.stringify(a[s][o[l]]),l!==o.length-1&&(r+=",");e.append("\n"+r)}var c=new Blob([data.innerText],{type:"application/octet-stream"});i(c,n)})},e.append=function(e){t.data.appendChild(document.createTextNode(e))},document.addEventListener("DOMContentLoaded",function(){t.data=document.getElementById("data")}),e.getLastMonthPeriod=function(e){var t=new Array,n=new Date(e.getTime());n.setMonth(n.getMonth()-1),n.setDate(1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0);var i=new Date(n.getTime());return i.setMonth(i.getMonth()+1),t.push(new Date(n.getTime())),t.push(new Date(i.getTime())),t}}]);