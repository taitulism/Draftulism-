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
1. Create a new bookmark: right click on the bookmarks toolbar and choose "add page"(chrome) or "new bookmark" (firefox)
2. Give it a name: Draftulism
3. In the location/URL field enter the line of code below
4. Save the bookmark and you're done

* To select the whole code easily, select the first few letters with your mouse and press SHIFT+END with your keyboard.

```
javascript:(function(win,doc){'use%20strict';function%20log(arg){console.dir(arg);}function%20$id(str){return%20doc.getElementById(str);}function%20$cls(str,ctx){ctx=ctx%20||%20doc;return%20ctx.getElementsByClassName(str);}function%20$tag(str,ctx){ctx=ctx%20||%20doc;return%20ctx.getElementsByTagName(str);}function%20toArr(like){return%20Array.prototype.slice.call(like);}function%20css(elm,obj){for(var%20k%20in%20obj){if(obj.hasOwnProperty(k)){elm.style[k]=obj[k];}}}function%20createStyleTag(arr){var%20styleTag=doc.createElement('style');styleTag.id='draft_style';styleTag.innerHTML='';arr.forEach(function(obj,i){var%20value;var%20objStyle=obj.style;styleTag.innerHTML+='\n'+obj.selector+'{';for(var%20key%20in%20objStyle){if(objStyle.hasOwnProperty(key)){value=objStyle[key];styleTag.innerHTML+='\n\t'+key+':%20'+value+';';}}styleTag.innerHTML+='\r}\n';});return%20styleTag;}function%20getDrafts(){var%20drafts=locStor.get('Draftulism');return%20drafts%20||[];}function%20isDraftExist(draft){var%20drafts=getDrafts();if(drafts.indexOf(draft)%3E%20-1){return%20true;}return%20false;}function%20addDraft(draft){var%20li,ul;var%20drafts=getDrafts();if(!isDraftExist(draft)){ul=draftsDiv.children[1];drafts.push(draft);locStor.set('Draftulism',drafts);li=createLI(draft,ul.children.length);ul.insertBefore(li,ul.firstElementChild);}}function%20delDraft(i){var%20drafts=getDrafts();var%20ul=draftsDiv.children[1];var%20LIs=ul.children;drafts.splice(i,1);locStor.set('Draftulism',drafts);ul.removeChild(LIs[LIs.length-%201%20-%20i]);toArr(ul.children).forEach(function(li,j){li.dataset.index=LIs.length%20-%201%20-%20j;});}function%20createLI(draft,i){var%20li=doc.createElement('li');li.className='draft_li';li.innerHTML=draft;li.dataset.index=i;li.addEventListener('click',function(){if(overlay.style.display%20!=='block'){composeBtn.click();}textArea.innerHTML=this.innerHTML;},false);li.addEventListener('dblclick',function(){var%20deleteDraft=confirm('Are%20you%20sure%20you%20want%20to%20delete%20this%20draft%3F');if(deleteDraft){delDraft(this.dataset.index);}},false);return%20li;}function%20getTweet(){return%20textArea.innerHTML.replace(/%3C[^%3E]+%3E/g,'');}function%20handleDraftBtn(flag){if(flag){draftBtn.style.cursor='pointer';draftBtn.innerHTML='Save%20Draft';}else{draftBtn.style.cursor='default';draftBtn.innerHTML='Draft%20Saved';}}function%20createDraftsDiv(){var%20drafts=getDrafts();var%20draftsDiv=doc.createElement('div');var%20draftsUL=doc.createElement('ul');var%20title=doc.createElement('div');var%20taitulism=doc.createElement('div');var%20tempFrag=doc.createDocumentFragment();taitulism.innerHTML='%3Ca%20href=%22https://twitter.com/taitulism%22%3E%40taitulsm%3C/a%3E';if(drafts.length%20%3E%200){drafts.forEach(function(draftTxt,i){var%20li=createLI(draftTxt,i);if(tempFrag.length===0){tempFrag.appendChild(li);}else{tempFrag.insertBefore(li,tempFrag.firstElementChild);}});}css(draftsDiv,{'position':'fixed','top':'20px','right':'20px','color':'white','backgroundColor':'%23022330','zIndex':'99999','padding':'20px','borderRadius':'7px','maxHeight':(window.innerHeight%20-%2020)+'px','overflow':'auto','boxShadow':'2px%202px%202px%20rgb(141,%2059,%2092)'});title.innerHTML='Draftulism';css(title,{'color':'yellow','textAlign':'center','fontSize':'20px','marginBottom':'8px','cursor':'pointer'});title.addEventListener('dblclick',function(){close();});draftsUL.appendChild(tempFrag);draftsDiv.appendChild(title);draftsDiv.appendChild(draftsUL);draftsDiv.appendChild(taitulism);draftsDiv.id='draftulism';return%20draftsDiv;}function%20createDraftBtn(){var%20draftBtn=doc.createElement('button');draftBtn.id='saveDraft';draftBtn.innerHTML='Save%20Draft';draftBtn.addEventListener('click',function(e){var%20tweet;e.preventDefault();if(this.innerHTML==='Save%20Draft'){tweet=getTweet();addDraft(tweet);handleDraftBtn(false);}},false);return%20draftBtn;}function%20close(){draftsDiv.style.display='none';}var%20draftulism,locStor,winloc,path,geo,head,body,composeBtn,textArea,overlay,afterTweetBtn,draftsDiv,styleTag,draftBtn,tweetBtn;locStor=(function(){win.Storage.prototype.set=function(key,value){this.setItem(key,JSON.stringify(value));};win.Storage.prototype.get=function(key){var%20value=this.getItem(key);return%20value%20%26%26%20JSON.parse(value);};return{set:function(key,val){win.localStorage.set(key,val);},get:function(key){return%20win.localStorage.get(key);}};}());winloc=win.location;path=winloc.pathname;if(winloc.hostname%20!=='twitter.com'){alert('This%20Bookmarklet%20runs%20only%20in%20Twitter.com');return%20false;}draftulism=$id('draftulism');if(draftulism){draftulism.style.display='block';return;}geo=(path==='/')%3F$cls('geo-status')[1]:$cls('geo-status')[0];geo.style.width='100px';head=$tag('head')[0];body=$tag('body')[0];composeBtn=$id('global-new-tweet-button');textArea=$id('tweet-box-global');overlay=$id('global-tweet-dialog');draftsDiv=createDraftsDiv();styleTag=createStyleTag([{selector:'.draft_li',style:{'border-radius':'4px','padding':'2px%205px','cursor':'pointer','text-align':'right'}},{selector:'.draft_li:hover',style:{'background-color':'%23CC253E'}},{selector:'%23saveDraft',style:{'position':'relative','display':'inline-block','padding':'5px%2010px','font-size':'13px','font-weight':'bold','line-height':'18px','color':'%23317CB4','text-shadow':'0%201px%201px%20rgba(255,%20255,%20255,%200.5)','background-color':'%23EFE7E7','background-repeat':'no-repeat','border':'1px%20solid%20rgb(204,%20204,%20204)','cursor':'pointer','border-radius':'4px','-webkit-box-shadow':'0%201px%200%20rgba(255,%20255,%20255,%200.5)','box-shadow':'0%201px%200%20rgba(255,%20255,%20255,%200.5)'}}]);draftBtn=createDraftBtn();textArea.addEventListener('keyup',function(){var%20tweet=getTweet();if(!isDraftExist(tweet)){handleDraftBtn(true);}else{handleDraftBtn(false);}},false);head.appendChild(styleTag);body.appendChild(draftsDiv);tweetBtn=(path==='/')%3F$cls('tweet-button')[3]:$cls('tweet-button')[2];afterTweetBtn=tweetBtn.nextElementSibling%20||%20tweetBtn;tweetBtn.parentNode.insertBefore(draftBtn,afterTweetBtn);win.draftulism=win.draftulism%20||{};win.draftulism.loaded=true;})(this,this.document);
```




How To Use?
-----------
1. Go to [Twitter](https://twitter.com)
2. Click on your new "Dratulism" bookmark. You will see a floating element in the top right corner with the title "Draftulism".
3. Now compose a new tweet using Twitter's blue button on the top right corner (top menu). You will notice a new button "Save Draft".
4. Type in your tweet and click "Save Draft". Your new draft will then shown in the floating element and saved in your browser's local storage.

To publish a draft just click it (on the floating element)

To delete a draft double-click it

To close the floating element - click on the title
