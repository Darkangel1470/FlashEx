async function handleLogin(){
    var res = await axios.post(path+'/login',{
                    email: $(email).val(),
                    pass: $(pass).val()
                })
    console.log('res.data :>> ', res);
    if(res.data=='loggedin'){
        console.log('loading nav tab');
        loadAddtab();
        loadNavTab();
    }
}
async function handleRegister() {
    await axios.post(path+'/register', {
        email: $('input[name=pass]').val(),
        pass:  $('input[name=email]').val()
    }).then(function(res){
        console.log(res);
        if(res.data){
            loadLoginTab();
        }else{
            $('#warningalert').prop('hidden', false);
        }
    })
}

async function sessionCheck(){
    var session = await axios.post(path+'/sessionCheck')
    console.log('loggedin :>> ', session.data.loggedin);
    if(session.data.loggedin){

    }else{
        loadLoginTab();
    }
    return session.data;
}

function logout(){
    axios.post(path+'/logout')
        .then(function (res) {
            console.log('res :>> ', res);
        })
}