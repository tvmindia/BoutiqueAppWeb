/// <reference path="E:\Appln\BoutiqiueTeq\Boutique\AdminPanel/Login.aspx" />
$("document").ready(function (e) {




    //$(".loginbtn").live({
    //    click: function (e) {// Clear controls

    //     debugger;

    //      //  ClearCategoryControls();
    //     return true;
    //    }
    //})
});//end of document.ready





//function getboutiques(boutiqueid) {
//    var ds = {};
//    var table = {};
//    var data = "{'boutiqueid':" + json.stringify(boutiqueid) + "}";
//    ds = getjsondata(data, "../adminpanel/sadashboard.aspx/bindboutiquedetails");
//    table = json.parse(ds.d);
//    return table;
//}

function ForgotPassword() {
    $('#LoginBoxDiv').remove();
    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="login-box" id="EmailBox">'
        + '<h2>Enter your Email</h2>'
        + '<div class="input-prepend" title="Email">'
        + '<span class="add-on"><i class="halflings-icon envelope"></i></span>'
        + '<input class="input-large span10" name="Email" id="txtEmail" type="Email" placeholder="Email"/>'
        + '</div>'
        + '<div class="button-login">'
        + '<button type="submit" id="btnlogin" onclick="SendVerificationCode()" class="btn btn-primary loginbtn">Continue</button>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);

}
function SendVerificationCode() {
    debugger;
    
    var Email = $('#txtEmail');
    var EmailAddress = Email[0].value;
    var ds = {};
    var table = {};
    var Security = new Object();
    Security.Email = EmailAddress;
    var data = "{'LoginObj':" + JSON.stringify(Security) + "}";
    table = getJsonData(data, "../AdminPanel/Login.aspx/VerificationCodeEmit");
    debugger;
    if (table.d == "True")
    {
       
       
        $('#EmailBox').remove();
        MatchVetification(EmailAddress);
    }
    if (table.d == "false")
    {
        var ptag = document.getElementById('lblerror');
        ptag.style.color = 'red';
        ptag.innerHTML = 'The Email You Entered Is  InValid !';
    }
    //table = JSON.parse(ds.d);
    return table;
}

function MatchVetification(EmailAddr)
{
    debugger;
    var HdnMail = document.createElement('input');
    HdnMail.setAttribute("type", "hidden");
    HdnMail.setAttribute("id", "HdnEmail")
    
    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="login-box" id="VerifyBox">'
        + '<h2>Enter Verification Code</h2>'
        + '<div class="input-prepend" title="Verification">'
        + '<span class="add-on"><i class="halflings-icon lock"></i></span>'
        + '<input class="input-large span10" name="VerificationCode" id="txtVerifyCode" type="password" placeholder="Verification Code"/>'
        + '</div>Check Your Email Id For the Verification Code and Fill'
        + '<div class="button-login">'
        + '<button type="submit" id="btnlogin" onclick="VerifyCodeNow()" class="btn btn-primary loginbtn">Verify</button>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);
    LoginDIv.append(HdnMail);
    $('#HdnEmail').val(EmailAddr);
}

function VerifyCodeNow()
{
    debugger;
    var Email=$('#HdnEmail').val();
    var VerifCode = $('#txtVerifyCode');
    var VerificationCod = VerifCode[0].value;
    var ds = {};
    var table = {};
    var Security = new Object();
    Security.Email = Email;
    Security.VerifyCode = VerificationCod;
    var data = "{'LoginObj':" + JSON.stringify(Security) + "}";
    table = getJsonData(data, "../AdminPanel/Login.aspx/VerifyCode");
    debugger;
    if (table.d == "True") {
        $('#VerifyBox').remove();
        EnterPassword();
    }
    else {
        var ptag = document.getElementById('lblerror');
        ptag.style.color = 'red';
        ptag.innerHTML = 'The Verification Code Missmatch !';
    }
}
function EnterPassword() {
    debugger;
    

    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="login-box" id="NewPassword">'
        + '<h2>Enter New Password</h2>'
        + '<div class="input-prepend" title="NewPassword">'
        + '<span class="add-on"><i class="halflings-icon lock"></i></span>'
        + '<input class="input-large span10" name="NPAss" id="txtPassword" type="password" placeholder="New Password"/>'
        + '</div>'
        + '<div class="input-prepend" title="NewPassword">'
        + '<span class="add-on"><i class="halflings-icon lock"></i></span>'
        + '<input class="input-large span10" name="CPass" id="txtConfirmPassword" type="password" placeholder="Confirm Password"/>'
        + '</div>'
        + '<div class="button-login">'
        + '<button type="submit" id="btnlogin" onclick="UpdatePassword()" class="btn btn-primary loginbtn">Verify</button>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);
}
function UpdatePassword()
{ 
    window.location("../AdminPanel/Login.aspx");
}