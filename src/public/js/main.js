$(function () {

var $otherbanks = $('#otherbanks');
var $banksA = $('#banksA');
var $banks = $('#banks');



    $.ajax({
        type: 'GET',
        url: '/gateway/open-banking/banks',
        accept: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('merchantID', 'amazondon'),xhr.setRequestHeader('content-type', 'application/json');},
        crossDomain: true,
        success: function(banks) {
            //? loop banks and create lovely bank selection stuff , maybe bootstrap stuff too... '+ bank.bankimageURL+ '
            console.log("Got banks back");
            $.each(banks.Banks, function(i, bank){
                $otherbanks.append('<li><a href="something"><img src="'+ bank.bankimageURL +'" style="width:50px;height:50px;border:0"></a></li>');
                $banksA.append('<input type="radio" name="colors" id="'+ bank.BankID +'"><img src="'+ bank.bankimageURL +'" style="width:50px;height:50px;border:0"></input>');
                $banks.append('<div class="col-md-6"><label class="banks"><input type="radio" name="banks" value="'+bank.BankName+'"><img src="'+ bank.bankimageURL +'" class="img-responsive img-radio center-block" style="width: 50%; height: 50%"></label></div>');
            });
        }
    });

    $("#paynow").click(function () {
        console.log("pay now clicked");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "/gateway/open-banking/payments",
          "method": "POST",
          "headers": {
            "authorization": "Bearer",
            "accept": "application/json",
            "content-type": "application/json",
            "x-fapi-customer-ip-address": "1",
            "x-fapi-customer-last-logged-time": "1",
            "x-fapi-financial-id": "1",
            "x-fapi-interaction-id": "1",
            "x-idempotency-key": "1",
            "x-jws-signature": "1",
            "bankid": "000001-CMA_Bank_1-GBR",
            "cache-control": "no-cache",
            "postman-token": "96be0b95-6275-d1d4-826e-8fa86f718cab"
          },
          "processData": false,
          "data": "{\"Data\":{\"Initiation\":{\"InstructionIdentification\":\"5791997839278080\",\"EndToEndIdentification\":\"8125371765489664\",\"InstructedAmount\":{\"Amount\":\"147.00\",\"Currency\":\"EUR\"},\"DebtorAgent\":{\"SchemeName\":\"BICFI\",\"Identification\":\"AAAAGB2L\"},\"DebtorAccount\":{\"SchemeName\":\"IBAN\",\"Identification\":\"IE29AIBK93115212345678\",\"Name\":\"Gary Kean\",\"SecondaryIdentification\":\"6686302651023360\"},\"CreditorAgent\":{\"SchemeName\":\"BICFI\",\"Identification\":\"AAAAGB2K\"},\"CreditorAccount\":{\"SchemeName\":\"IBAN\",\"Identification\":\"IE29AIBK93115212345676\",\"Name\":\"Carlo Marcoli\",\"SecondaryIdentification\":\"8380390651723776\"},\"RemittanceInformation\":{\"Unstructured\":\"emeherpakkaodafeofiu\",\"Reference\":\"ehoorepre\"}}},\"Risk\":{\"PaymentContextCode\":\"PersonToPerson\",\"MerchantCategoryCode\":\"nis\",\"MerchantCustomerIdentification\":\"1130294929260544\",\"DeliveryAddress\":{\"AddressLine\":[\"totbelsanagrusa\"],\"StreetName\":\"Morning Road\",\"BuildingNumber\":\"62\",\"PostCode\":\"G3 5HY\",\"TownName\":\"Glasgow\",\"CountrySubDivision\":[\"Scotland\"],\"Country\":\"GB\"}}}"
        
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
          console.log(response.Links.next);
          window.location.replace(response.Links.next);
        });
    });


});


