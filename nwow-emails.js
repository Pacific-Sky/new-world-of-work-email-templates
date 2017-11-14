function SelectText(element) {
  var doc = document,
    text = doc.getElementById(element),
    range,
    selection;
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
function clearSelection() {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}
function updateMessage(event) {
  this[event.target.id] = event.target.value;
}

function copyMessage(event) {
  SelectText('output');
  try {
    var successful = document.execCommand('copy');
    var message = successful
      ? 'Paste the content into the body of a new email'
      : 'Unable to copy. Please select and copy on your own.';
    if (successful && document.getElementById('autoOpen').checked) {
      var link = 'mailto:';
      if (document.getElementById('autoOpen').dataset.subject) {
        link += '?subject=' + encodeURI(document.getElementById('autoOpen').dataset.subject);
      }
      window.location = link;
    }
    var DOMMessage = document.createElement('p');
    DOMMessage.innerText = message;
    document.getElementById('inputs').appendChild(DOMMessage);
    setTimeout(function() {
      document.getElementById('inputs').removeChild(DOMMessage);
    }, 2000);
    clearSelection();
  } catch (err) {
    console.log('Oops, unable to copy');
  }
}

(function immediatelyRenderMenu() {
  var menu = document.createElement('nav');
  menu.id = 'nwow-email-nav';
  var list = document.createElement('ul');
  menu.appendChild(list);
  [{ name: 'Email Index', link: '/' }].forEach(function(item) {
    var DOMItem = document.createElement('li');
    var link = document.createElement('a');
    link.href = item.link;
    link.innerText = item.name;
    DOMItem.appendChild(link);
    list.appendChild(DOMItem);
  });
  document.body.appendChild(menu);
})();
