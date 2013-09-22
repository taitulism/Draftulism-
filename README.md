Draftulism - Twitter Drafts for NON-mobile
==========


What is it?
-----------
"Draftulism" is a little tool that will save your draft tweets on your computer, locally.
"Draftulism" let you save and delete your drafts and ofcourse, publish your saved drafts easily.


What is it NOT?
---------------
"Draftulism" is probably NOT the best way to do it but it works.
"Draftulism" is not syncronizing your different devices and does NOT loggs into your account.
No need for username or password.


Limitations
-----------
1.  "Draftulism" saves your drafts on the browser's local storage which its capacity is limited and this limitation varies by.
	The minimum that i'm aware of is 2.5 MB which is a LOTS OF TEXT.

2.  The local storage can be deleted by different softwares (e.g. ccleaner) or by the user, while deleting cookies or cache.
	Either way, keep that in mind and remember to exclude the local storage from cleaning.


How Does It Work?
-----------------
"Draftulism" is a simple bookmark (or bookmarklet).
A bookmarklet is a browser bookmark that instead of taking you to a certain web address, it runs a javascript code on the current page (on twitter in this case) and manipulates it.
So running "Draftulism" is as simple as clicking on a bookmark.


How To Install?
---------------
1. Create a bookmark
2. Give it a name: Draftulism
3. In the location/URL field enter the line of code below
4. Save the bookmark and you're done

```
javascript:(function(win,doc){function toArr(like){return Array.prototype.slice.call(like);}function css(elm,obj){for(var k in obj){if(obj.hasOwnProperty(k)){elm.style[k]=obj[k];}}}function createStyleTag(arr){var styleTag=doc.createElement('style');styleTag.id='draft_style';styleTag.innerHTML='';arr.forEach(function(obj,i){var value;var objStyle=obj.style;styleTag.innerHTML+='\n'+obj.selector+'{';for(var key in objStyle){if(objStyle.hasOwnProperty(key)){value=objStyle[key];styleTag.innerHTML+='\n\t'+key+': '+value+';';}}styleTag.innerHTML+='\r}\n';});return styleTag;}var locStor=(function(){win.Storage.prototype.set=function(key,value){this.setItem(key,JSON.stringify(value));};win.Storage.prototype.get=function(key){var value=this.getItem(key);return value %26%26 JSON.parse(value);};return{set:function(key,val){win.localStorage.set(key,val);},get:function(key){return win.localStorage.get(key);}};}());function getDrafts(){var drafts=locStor.get('drafts');return drafts ||[];}function isDraftExist(draft){var drafts=getDrafts();if(drafts.indexOf(draft)> -1){return true;}return false;}function addDraft(draft){var li,ul;var drafts=getDrafts();if(!isDraftExist(draft)){ul=draftsDiv.children[1];drafts.push(draft);locStor.set('drafts',drafts);li=createLI(draft,ul.children.length);ul.insertBefore(li,ul.firstElementChild);}}function delDraft(i){var drafts=getDrafts();var ul=draftsDiv.children[1];var LIs=ul.children;drafts.splice(i,1);locStor.set('drafts',drafts);ul.removeChild(LIs[LIs.length- 1 - i]);toArr(ul.children).forEach(function(li,j){li.dataset.index=LIs.length - 1 - j;});}function createLI(draft,i){var li=doc.createElement('li');li.className='draft_li';li.innerHTML=draft;li.dataset.index=i;li.addEventListener('click',function(){if(overlay.style.display !=='block'){composeBtn.click();}textArea.innerHTML=this.innerHTML;},false);li.addEventListener('dblclick',function(){var deleteDraft=confirm('Are you sure you want to delete this draft%3F');if(deleteDraft){delDraft(this.dataset.index);}},false);return li;}function getTweet(){return textArea.innerHTML.replace(/<[^>]+>/g,'');}function handleDraftBtn(flag){if(flag){draftBtn.style.cursor='pointer';draftBtn.innerHTML='Save Draft';}else{draftBtn.style.cursor='default';draftBtn.innerHTML='Draft Saved';}}function createDraftsDiv(){var drafts=getDrafts();var draftsDiv=doc.createElement('div');var draftsUL=doc.createElement('ul');var title=doc.createElement('div');var tempFrag=doc.createDocumentFragment();if(drafts.length > 0){drafts.forEach(function(draftTxt,i){var li=createLI(draftTxt,i);if(tempFrag.length===0){tempFrag.appendChild(li);}else{tempFrag.insertBefore(li,tempFrag.firstElementChild);}});}css(draftsDiv,{'position':'fixed','top':'20px','right':'20px','color':'white','backgroundColor':'black','zIndex':'99999','padding':'20px','borderRadius':'7px','maxHeight':(window.innerHeight - 20)+'px','overflow':'auto'});title.innerHTML='Draftulism';css(title,{'color':'yellow','textAlign':'center','fontSize':'20px','marginBottom':'8px','cursor':'pointer'});title.addEventListener('dblclick',function(){close();});draftsUL.appendChild(tempFrag);draftsDiv.appendChild(title);draftsDiv.appendChild(draftsUL);draftsDiv.id='draftulism';return draftsDiv;}function createDraftBtn(){var draftBtn=doc.createElement('button');draftBtn.id='saveDraft';draftBtn.innerHTML='Save Draft';draftBtn.addEventListener('click',function(e){var tweet;e.preventDefault();if(this.innerHTML==='Save Draft'){tweet=getTweet();addDraft(tweet);handleDraftBtn(false);}},false);return draftBtn;}function close(){draftsDiv.style.display='none';}var draftulism=doc.getElementById('draftulism');if(draftulism){draftulism.style.display='block';return;}var geo=document.getElementsByClassName('geo-status')[0];geo.style.width='100px';var head=doc.getElementsByTagName('head')[0];var body=doc.getElementsByTagName('body')[0];var composeBtn=doc.getElementById('global-new-tweet-button');var textArea=doc.getElementById('tweet-box-global');var overlay=doc.getElementById('global-tweet-dialog');var draftsDiv=createDraftsDiv();var styleTag=createStyleTag([{selector:'.draft_li',style:{'border-radius':'4px','padding':'2px 5px','cursor':'pointer','text-align':'right'}},{selector:'.draft_li:hover',style:{'background-color':'%23CC253E'}},{selector:'%23saveDraft',style:{'position':'relative','display':'inline-block','padding':'5px 10px','font-size':'13px','font-weight':'bold','line-height':'18px','color':'%23317CB4','text-shadow':'0 1px 1px rgba(255, 255, 255, 0.5)','background-color':'%23EFE7E7','background-repeat':'no-repeat','border':'1px solid rgb(204, 204, 204)','cursor':'pointer','border-radius':'4px','-webkit-box-shadow':'0 1px 0 rgba(255, 255, 255, 0.5)','box-shadow':'0 1px 0 rgba(255, 255, 255, 0.5)'}}]);var draftBtn=createDraftBtn();textArea.addEventListener('keyup',function(){var tweet=getTweet();if(!isDraftExist(tweet)){handleDraftBtn(true);}else{handleDraftBtn(false);}},false);head.appendChild(styleTag);body.appendChild(draftsDiv);var tweetBtn=document.getElementsByClassName('tweet-button')[2];tweetBtn.parentNode.insertBefore(draftBtn,tweetBtn.nextElementSibling);win.draftulism=win.draftulism ||{};win.draftulism.loaded=true;})(this,this.document);
```




How To Use?
-----------
1. Go to [Twitter](https://twitter.com)
2. Go to your profile by clicking "Me" (top menu).
3. Click on your new "Dratulism" bookmark. You will see a floating element in the top right corner with the title "Draftulism".
4. Now compose a new tweet using Twitter's blue button on the top right corner (top menu). You will notice a new button "Save Draft".
5. Type in your tweet and click "Save Draft". Your new draft will then shown in the floating element and saved in your browser's local storage.

To publish a draft just click it (on the floating element)

To delete a draft double-click it

To close the floating element - click on the title
