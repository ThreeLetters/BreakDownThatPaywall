var site_data = [
 {
  url: "*wsj.com/*",
  header: "https://www.twitter.com/",
  remCookies: true
 },
 {
  url: "*hbr.org/*",
  header: "https://www.google.com/",
  remCookies: true
 },
 {
  url: "*nytimes.com/*",
  header: "https://www.google.com/",
  remCookies: false
 },
  {
  url: "*washingtonpost.com/*",
  header: "https://www.google.com/",
  remCookies: true
 }, 
 {
  url: "*telegraph.co.uk/*",
  header: "https://www.google.com/",
  remCookies: true
 }
 
 
 }



chrome.webRequest.onBeforeSendHeaders.addListener(function(data) { // change header
var url = window.location.href ;
 var site = false;
for (var i in site_data) if (compare(url,site_data[i].url)) site = site_data[i];

if (!site) return;
  var Headers = details.requestHeaders;
if (site.header) changeHeader(Headers,site.header);
if (site.remCookies) removeCookies(Header);

 return {
        requestHeaders: Headers
    };

});
function removeCookies(Header) {
 Header.every(function(h) {
      
        if (h.name === 'Cookie') {
            h.value = '';
         return false;
        }
       return true;
    });
}

function changeHeader(Header,value) {
 if (Header.every(function(h) {
        if (h.name === 'Referer') {
          h.value = value;
        return false;
        }
        return true;
    })) Header.push({
                name: 'Referer',
                value: value
            });
}
 function compare(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}
