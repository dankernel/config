
var APP_ID = 267128753314780;
var URL_TO_LIKE = "https://www.facebook.com/pages/Allow-Right-Click-Chrome-Extension/317208101708296";

var parent = document.getElementById("fb-like");
var src = "http://www.facebook.com/plugins/like.php?href=" + encodeURIComponent(URL_TO_LIKE) + 
          "&amp;send=false&amp;layout=box_count&amp;width=60&amp;show_faces=false&amp;font&amp;" + 
          "colorscheme=light&amp;action=like&amp;height=90&amp;appId=" + APP_ID;
parent.innerHTML = '<iframe src="'+ src +'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:60px; height:65px;" allowTransparency="true"><\/iframe>';
