// Loading functions
function loadNavTab(){
    $(navtab).show();
    $(navtab).load(navtabpath,navtabsetup);
}
function loadLoginTab(){
    $(mainbody).load(logintabpath, logintabsetup);
}
function loadRegisterTab(){
    $(mainbody).load(registertabpath, registertabsetup);
}
function loadAddtab(){
    $(mainbody).load(addtabpath, addtabsetup);
    
}
function loadRevtab(){
    $(mainbody).load(revtabpath, revtabsetup);
}
function loadDecktab(){
    $(mainbody).load(decktabpath, decktabsetup);
}
function loadProfiletab(){
    $(mainbody).load(profiletabpath, profiletabsetup);
}
function loadSettingtab(){

}

// Setup functions
function logintabsetup(){
    
    $(navtab).hide();
    $(signup).click(loadRegisterTab);
    
    var btn = $(loginbtn);
    btn.prop('disabled', true);
    $('input[name=pass],input[name=email]').on('change', function(){

        btn.prop('disabled', true);
        var pass = $(pass).val();
        var email = $(email).val();
        btn.prop('disabled', false);
    })
    $(loginbtn).click(handleLogin);
}
function registertabsetup(){
    
    $(navtab).hide();
	var pass;
	var cpass;
	var email;

    
    $(login).click(loadLoginTab);
    
    var btn = $('input[type=button]');
    var passinp = $('input[name=pass]')
    var cpassinp = $('input[name=cpass]')
    var emailinp = $('input[name=email]')
    btn.prop('disabled', true);
    $('input[name=cpass],input[name=pass],input[name=email]').on('change', function(){
        btn.prop('disabled', true);
        pass = passinp.val();
        cpass = cpassinp.val();
        email = emailinp.val();
        if(pass==cpass && email.trim()!== ""){
            console.log('Matched')
            btn.prop('disabled', false);
        }
        console.log(`${pass} == ${cpass}`);
    })
    btn.click(handleRegister);
}
function navtabsetup() {
    $(addtab).click(loadAddtab)
    $(revtab).click(loadRevtab);
    $(decktab).click(loadDecktab);
    $(settingstab).click(loadSettingtab);
    $(profiletab).click(loadProfiletab);
}
function addtabsetup(){
    $("#addcardbtn").click(addCard)
    $("form").submit(function(event){
        event.preventDefault();
    })
}
function decktabsetup(){
    getlist();
}
function revtabsetup(){
    // getlist();
    $("#difftab").hide();
    showfront();
    $(showback).click(showBack);
    $(backbtn).click(showfront).hide();
    $(".diffbtn").click(diffhandler);
    $("form").submit(function(event){
        event.preventDefault();
    })
}
async function profiletabsetup(){
    var session = await sessionCheck();

    $(email).text(session.profile);
    $(total)
    $(reviewed)
    $(logoutbtn).click(logout);
}