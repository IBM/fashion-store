$(function () {

var $paymentstatus = $('#paymentstatus');

$paymentstatus.text("Payment Successful.");
/*
var code = GetURLParameter('code');

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.eu.apiconnect.ibmcloud.com/cmarcoliukibmcom-open-banking-aggregator/rw-sandbox-production/psuoauth2security/oauth2/token?6a102135-813f-4bf6-b94b-152cd63637c5=dM7nM6mI6uO0fM2vK5sO3oO8rF2dO3aH2qP0vW6tW4kA0lA6oQ",
  "method": "POST",
  "headers": {
    "authorization": "Basic NTA2ODJmNDItMzlkNC00ODAwLTk4Y2YtMWM0ZmRhYThlOGE2OnJDN3RFNHdONXhJNWNRNWFQNG5XNXhMN3NBM2NGMWdJOGNZM2lDMmlVNG9NN2VCN3NI",
    "cache-control": "no-cache",
    "postman-token": "00c528a4-f765-4039-237f-b9c69aae26fe",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "grant_type": "authorization_code",
    "redirect_uri": "http://localhost:8080/paymentcomplete.html",
    "code": code
  }
}

console.log(settings);

$.ajax(settings).done(function (response) {
  console.log("completed");
  console.log(response);
});
*/

});

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}