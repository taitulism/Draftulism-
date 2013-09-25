;(function(win, doc) {
	'use strict';
	function log (arg) {
		console.dir(arg);
	}

	function $id (str) {
		return doc.getElementById(str);
	}

	function $cls (str, ctx) {
		ctx = ctx || doc;
		return ctx.getElementsByClassName(str);
	}

	function $tag (str, ctx) {
		ctx = ctx || doc;
		return ctx.getElementsByTagName(str);
	}

	function toArr (like) {
		return Array.prototype.slice.call(like);
	}

	function css (elm, obj) {
		for (var k in obj) {if (obj.hasOwnProperty(k)) {
			elm.style[k] = obj[k];
		}}
	}

	function createStyleTag (arr) {
		var styleTag       = doc.createElement('style');
		styleTag.id        = 'draft_style';
		styleTag.innerHTML = '';

		arr.forEach(function (obj, i) {
			var value;
			var objStyle = obj.style;
			styleTag.innerHTML += '\n' + obj.selector + '{';

			for (var key in objStyle) {if (objStyle.hasOwnProperty(key)) {
				value = objStyle[key];
				styleTag.innerHTML += '\n\t' + key + ': ' + value + ';';
			}}

			// styleTag.innerHTML 
			styleTag.innerHTML += '\r}\n';
		});

		return styleTag;
	}

	function getDrafts () {
		var drafts = locStor.get('Draftulism');
		return drafts || [];
	}

	function isDraftExist (draft) {
		var drafts = getDrafts();
		if (drafts.indexOf(draft) > -1) {
			return true;
		}
		return false;
	}

	function addDraft (draft) {
		var li, ul;
		var drafts = getDrafts();

		if (!isDraftExist(draft)) {
			ul = draftsDiv.children[1];
			drafts.push(draft);
			locStor.set('Draftulism', drafts);
			li = createLI(draft, ul.children.length);
			ul.insertBefore(li, ul.firstElementChild);
		}
	}

	function delDraft (i) {
		var drafts = getDrafts();
		var ul     = draftsDiv.children[1];
		var LIs    = ul.children;

		drafts.splice(i, 1);
		locStor.set('Draftulism', drafts);
	
		ul.removeChild(LIs[LIs.length- 1 - i]);

		toArr(ul.children).forEach(function (li, j) {
			li.dataset.index = LIs.length - 1 - j;
		});
	}

	function createLI (draft, i) {
		var li = doc.createElement('li');
		
		li.className     = 'draft_li';
		li.innerHTML     = draft;
		li.dataset.index = i;

		li.addEventListener('click', function(){
			if (overlay.style.display !== 'block') {
				composeBtn.click();
			}

			textArea.innerHTML = this.innerHTML;

		}, false);

		li.addEventListener('dblclick', function(){
			var deleteDraft = confirm('Are you sure you want to delete this draft?');
			if (deleteDraft) {
				delDraft(this.dataset.index);
			}

		}, false);

		return li;
	}

	function getTweet () {
		return textArea.innerHTML.replace(/<[^>]+>/g, '');
	}

	function handleDraftBtn (flag) {
		if (flag) {
			draftBtn.style.cursor = 'pointer';
			draftBtn.innerHTML = 'Save Draft';
		}
		else {
			draftBtn.style.cursor = 'default';
			draftBtn.innerHTML = 'Draft Saved';
		}
	}

	function createDraftsDiv () {
		var drafts    = getDrafts();
		var draftsDiv = doc.createElement('div');
		var draftsUL  = doc.createElement('ul');
		var title     = doc.createElement('div');
		var taitulism = doc.createElement('div') ;
		var tempFrag  = doc.createDocumentFragment();

		taitulism.innerHTML = '<a href="https://twitter.com/taitulism">@taitulsm</a>';

		if (drafts.length > 0) {
			drafts.forEach(function(draftTxt, i){
				var li = createLI(draftTxt, i);

				if (tempFrag.length === 0) {
					tempFrag.appendChild(li);
				}
				else {
					tempFrag.insertBefore(li, tempFrag.firstElementChild);
				}
			});
		}
	
		css(draftsDiv, {
			'position'       : 'fixed',
			'top'            : '20px',
			'right'          : '20px',
			'color'          : 'white',
			'backgroundColor': '#022330',
			'zIndex'         : '99999',
			'padding'        : '20px',
			'borderRadius'   : '7px',
			'maxHeight'      : (window.innerHeight - 200) + 'px',
			'overflow'       : 'auto',
			'boxShadow'      : '2px 2px 2px rgb(141, 59, 92)'
		});

		title.innerHTML = 'Draftulism';

		css(title, {
			'color'       : 'yellow',
			'textAlign'   : 'center',
			'fontSize'    : '20px',
			'marginBottom': '8px',
			'cursor'      : 'pointer'
		});

		title.addEventListener('dblclick', function () {
			close();
		});
		
		draftsUL.appendChild(tempFrag);
		draftsDiv.appendChild(title);
		draftsDiv.appendChild(draftsUL);
		draftsDiv.appendChild(taitulism);
		draftsDiv.id = 'draftulism';

		return draftsDiv;
	}

	function createDraftBtn () {
		var draftBtn       = doc.createElement('button');
		draftBtn.id        = 'saveDraft';
		draftBtn.innerHTML = 'Save Draft';

		draftBtn.addEventListener('click', function(e){
			var tweet;
			e.preventDefault();
			
			if (this.innerHTML === 'Save Draft') {
				tweet = getTweet();
				addDraft(tweet);
				handleDraftBtn(false);
			}

		}, false);

		return draftBtn;
	}

	function close () {
		draftsDiv.style.display = 'none';
	}

	var draftulism, locStor, winloc, path, geo, head, body, composeBtn, textArea, overlay, afterTweetBtn, draftsDiv, styleTag, draftBtn, tweetBtn;

	locStor = (function() {
		win.Storage.prototype.set = function(key, value) {
			this.setItem(key, JSON.stringify(value));
		};

		win.Storage.prototype.get = function(key) {
			var value = this.getItem(key);
			return value && JSON.parse(value);
		};

		return {
			set: function(key, val) {
				win.localStorage.set(key, val);
			},

			get: function(key) {
				return win.localStorage.get(key);
			}
		};
	}());

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

	winloc = win.location;
	path   = winloc.pathname;

	if (winloc.hostname !== 'twitter.com') {
		alert('This Bookmarklet runs only in Twitter.com');
		return false;
	}
	
	draftulism = $id('draftulism');

	if (draftulism) {
		draftulism.style.display = 'block';
		return;
	}


	// shrink geo button width
	geo = (path === '/') ? $cls('geo-status')[1] : $cls('geo-status')[0];
	geo.style.width = '100px';

	head       = $tag('head')[0];
	body       = $tag('body')[0];
	composeBtn = $id('global-new-tweet-button');
	textArea   = $id('tweet-box-global');
	overlay    = $id('global-tweet-dialog');

	draftsDiv  = createDraftsDiv();

	styleTag   = createStyleTag([
		{
			selector: '.draft_li',
			style: {
				'border-radius': '4px',
				'padding'      : '2px 5px',
				'cursor'       : 'pointer',
				'text-align'   : 'right'
			}
		},
		{
			selector: '.draft_li:hover',
			style: {
				'background-color': '#CC253E'
			}
		},
		{
			selector: '#saveDraft',
			style: {
				'position'          : 'relative',
				'display'           : 'inline-block',
				'padding'           : '5px 10px',
				'font-size'         : '13px',
				'font-weight'       : 'bold',
				'line-height'       : '18px',
				'color'             : '#317CB4',
				'text-shadow'       : '0 1px 1px rgba(255, 255, 255, 0.5)',
				'background-color'  : '#EFE7E7',
				'background-repeat' : 'no-repeat',
				'border'            : '1px solid rgb(204, 204, 204)',
				'cursor'            : 'pointer',
				'border-radius'     : '4px',
				'-webkit-box-shadow': '0 1px 0 rgba(255, 255, 255, 0.5)',
				'box-shadow'        : '0 1px 0 rgba(255, 255, 255, 0.5)'
			}
		}
	]);

	draftBtn = createDraftBtn();

	textArea.addEventListener('keyup', function(){
		var tweet = getTweet();

		if (!isDraftExist(tweet)) {
			handleDraftBtn(true);
		}
		else {
			handleDraftBtn(false);
		}
	}, false);

	head.appendChild(styleTag);

	body.appendChild(draftsDiv);

	tweetBtn = (path === '/') ? $cls('tweet-button')[3] : $cls('tweet-button')[2];

	afterTweetBtn = tweetBtn.nextElementSibling || tweetBtn;

	tweetBtn.parentNode.insertBefore(draftBtn, afterTweetBtn);

	win.draftulism = win.draftulism || {};
	win.draftulism.loaded = true;

})(this, this.document);