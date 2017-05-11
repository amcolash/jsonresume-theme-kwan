function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var years = Math.floor(seconds / 31536000);
  var months = Math.floor(seconds / 2592000) - (years * 12);

  if (years >= 1) {
    years = years + (years > 1 ? " years " : " year ");
  } else {
    years = "";
  }

  if (months >= 1) {
    months = months + (months > 1 ? " months " : " month ");
  } else {
    months = "";
  }

  return years + months;
};

var items = document.getElementsByClassName('text-muted');
for (var i = 0; i < items.length; i++) {
	if (items[i].innerHTML.toLowerCase().includes('present')) {
		var start = new Date(items[i].getElementsByClassName('date')[0].innerHTML.replace(/\s*-\s*Present/, '').trim());
		var since = timeSince(start);
		items[i].getElementsByClassName('duration')[0].innerHTML = '<i class="fa fa-clock-o icon-left"></i> ' + since;
	}
}
