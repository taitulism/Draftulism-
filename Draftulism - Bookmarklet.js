javascript:(function(){;(function(win,doc){function%20toArr(like){return%20Array.prototype.slice.call(like);}function%20css(elm,obj){for(var%20k%20in%20obj){if(obj.hasOwnProperty(k)){elm.style[k]=obj[k];}}}function%20createStyleTag(arr){var%20styleTag=doc.createElement('style');styleTag.id='draft_style';styleTag.innerHTML='';arr.forEach(function(obj,i){var%20value;var%20objStyle=obj.style;styleTag.innerHTML+='\n'+obj.selector+'{';for(var%20key%20in%20objStyle){if(objStyle.hasOwnProperty(key)){value=objStyle[key];styleTag.innerHTML+='\n\t'+key+':%20'+value+';';}}styleTag.innerHTML+='\r}\n';});return%20styleTag;}var%20locStor=(function(){win.Storage.prototype.set=function(key,value){this.setItem(key,JSON.stringify(value));};win.Storage.prototype.get=function(key){var%20value=this.getItem(key);return%20value%20%26%26%20JSON.parse(value);};return{set:function(key,val){win.localStorage.set(key,val);},get:function(key){return%20win.localStorage.get(key);}};}());function%20getDrafts(){var%20drafts=locStor.get('drafts');return%20drafts%20||[];}function%20isDraftExist(draft){var%20drafts=getDrafts();if(drafts.indexOf(draft)%3E%20-1){return%20true;}return%20false;}function%20addDraft(draft){var%20li,ul;var%20drafts=getDrafts();if(!isDraftExist(draft)){ul=draftsDiv.children[1];drafts.push(draft);locStor.set('drafts',drafts);li=createLI(draft,ul.children.length);ul.insertBefore(li,ul.firstElementChild);}}function%20delDraft(i){var%20drafts=getDrafts();var%20ul=draftsDiv.children[1];var%20LIs=ul.children;drafts.splice(i,1);locStor.set('drafts',drafts);ul.removeChild(LIs[LIs.length-%201%20-%20i]);toArr(ul.children).forEach(function(li,j){li.dataset.index=LIs.length%20-%201%20-%20j;});}function%20createLI(draft,i){var%20li=doc.createElement('li');li.className='draft_li';li.innerHTML=draft;li.dataset.index=i;li.addEventListener('click',function(){if(overlay.style.display%20!=='block'){composeBtn.click();}textArea.innerHTML=this.innerHTML;},false);li.addEventListener('dblclick',function(){var%20deleteDraft=confirm('Are%20you%20sure%20you%20want%20to%20delete%20this%20draft%3F');if(deleteDraft){delDraft(this.dataset.index);}},false);return%20li;}function%20getTweet(){return%20textArea.innerHTML.replace(/%3C[^%3E]+%3E/g,'');}function%20handleDraftBtn(flag){if(flag){draftBtn.style.cursor='pointer';draftBtn.innerHTML='Save%20Draft';}else{draftBtn.style.cursor='default';draftBtn.innerHTML='Draft%20Saved';}}function%20createDraftsDiv(){var%20drafts=getDrafts();var%20draftsDiv=doc.createElement('div');var%20draftsUL=doc.createElement('ul');var%20title=doc.createElement('div');var%20tempFrag=doc.createDocumentFragment();if(drafts.length%20%3E%200){drafts.forEach(function(draftTxt,i){var%20li=createLI(draftTxt,i);if(tempFrag.length===0){tempFrag.appendChild(li);}else{tempFrag.insertBefore(li,tempFrag.firstElementChild);}});}css(draftsDiv,{'position':'fixed','top':'20px','right':'20px','color':'white','backgroundColor':'black','zIndex':'99999','padding':'20px','borderRadius':'7px','maxHeight':(window.innerHeight%20-%2020)+'px','overflow':'auto'});title.innerHTML='Draftulism';css(title,{'color':'yellow','textAlign':'center','fontSize':'20px','marginBottom':'8px','cursor':'pointer'});title.addEventListener('dblclick',function(){close();});draftsUL.appendChild(tempFrag);draftsDiv.appendChild(title);draftsDiv.appendChild(draftsUL);draftsDiv.id='draftulism';return%20draftsDiv;}function%20createDraftBtn(){var%20draftBtn=doc.createElement('button');draftBtn.id='saveDraft';draftBtn.innerHTML='Save%20Draft';draftBtn.addEventListener('click',function(e){var%20tweet;e.preventDefault();if(this.innerHTML==='Save%20Draft'){tweet=getTweet();addDraft(tweet);handleDraftBtn(false);}},false);return%20draftBtn;}function%20close(){draftsDiv.style.display='none';}var%20draftulism=doc.getElementById('draftulism');if(draftulism){draftulism.style.display='block';return;}var%20geo=document.getElementsByClassName('geo-status')[0];geo.style.width='100px';var%20head=doc.getElementsByTagName('head')[0];var%20body=doc.getElementsByTagName('body')[0];var%20composeBtn=doc.getElementById('global-new-tweet-button');var%20textArea=doc.getElementById('tweet-box-global');var%20overlay=doc.getElementById('global-tweet-dialog');var%20draftsDiv=createDraftsDiv();var%20styleTag=createStyleTag([{selector:'.draft_li',style:{'border-radius':'4px','padding':'2px%205px','cursor':'pointer','text-align':'right'}},{selector:'.draft_li:hover',style:{'background-color':'%23CC253E'}},{selector:'%23saveDraft',style:{'position':'relative','display':'inline-block','padding':'5px%2010px','font-size':'13px','font-weight':'bold','line-height':'18px','color':'%23317CB4','text-shadow':'0%201px%201px%20rgba(255,%20255,%20255,%200.5)','background-color':'%23EFE7E7','background-repeat':'no-repeat','border':'1px%20solid%20rgb(204,%20204,%20204)','cursor':'pointer','border-radius':'4px','-webkit-box-shadow':'0%201px%200%20rgba(255,%20255,%20255,%200.5)','box-shadow':'0%201px%200%20rgba(255,%20255,%20255,%200.5)'}}]);var%20draftBtn=createDraftBtn();textArea.addEventListener('keyup',function(){var%20tweet=getTweet();if(!isDraftExist(tweet)){handleDraftBtn(true);}else{handleDraftBtn(false);}},false);head.appendChild(styleTag);body.appendChild(draftsDiv);var%20tweetBtn=document.getElementsByClassName('tweet-button')[2];tweetBtn.parentNode.insertBefore(draftBtn,tweetBtn.nextElementSibling);win.draftulism=win.draftulism%20||{};win.draftulism.loaded=true;})(this,this.document);})();