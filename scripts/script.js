
const addtabpath = "../components/addTab.html"
const revtabpath = "../components/revtab.html"
var currentcard;

$(document).ready(function() {
    //handle navigation
    loadRevtab();
    $(addtab).click(loadAddtab)
    $(reviewtab).click(loadRevtab);


    //handle add card request
    $( "form" ).submit(function( event ) {
        event.preventDefault();
        
        console.log('submit clicked');
      });
    console.log('object :>> ', $("#addcardbtn"));
    getminboxcard();

})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "setText") {
        alert( message.data);
    }
});


//functoins to handle navigation
function loadAddtab(){
    $(mainbody).load(addtabpath, addtabsetup);
}
function loadRevtab(){
    $(mainbody).load(revtabpath, revtabsetup);
}

// attach listerner to button
function addtabsetup(){
    $("#addcardbtn").click(addCard)
    $("form").submit(function(event){
        event.preventDefault();
    })
}
function revtabsetup(){
    // getlist();
    $("#difftab").hide();

    if(cookieToArray()[0].length >1){
        $("#cardFront").text(getminboxcard()[2]);
        currentcard = getminboxcard();
    }else{
        $("#cardFront").text("You dont have any card yet");
    }
    $(showback).click(showBack);
    $(backbtn).click(showfront).hide();
    $(".diffbtn").click(diffhandler);

    $("form").submit(function(event){
        event.preventDefault();
    })
}

function showBack(item){
    if(cookieToArray()[0].length >1){
        $("#cardFront").text(getminboxcard()[3]);
        $("#difftab").show();
    }else{
        $("#cardFront").text("You dont have any card yet");
    }
    $(backbtn).show();
    $("#showtab").hide();
    
    
}
function showfront(){
    if(cookieToArray()[0].length >1){
        $("#cardFront").text(getminboxcard()[2]);
        currentcard = getminboxcard();
    }else{
        $("#cardFront").text("You dont have any card yet");
    }
    $("#difftab").hide();
    $("#showtab").show();
    
    $(backbtn).hide();
}

function diffhandler(){
    switch (this.id) {
        case "easy":
            //'1=1&front=Whats your name&back=Nihar&box=1'
            var number = parseInt(currentcard[4])>8 ? 8 : parseInt(currentcard[4])
            cookie = `${currentcard[0].trim()}=${currentcard[0].trim()}&front=${currentcard[2].trim()}&back=${currentcard[3].trim()}&box=${parseInt(currentcard[4])+1}`
            document.cookie = cookie;
            showfront();
            break;
          
        case "notsure":
            cookie = `${currentcard[0].trim()}=${currentcard[0].trim()}&front=${currentcard[2].trim()}&back=${currentcard[3].trim()}&box=${parseInt(currentcard[4])}`
            document.cookie = cookie;
            showfront();           
            break;
      
        case "hard":
            var number = parseInt(currentcard[4])<4 ? 1 : parseInt(currentcard[4])-3;
            cookie = `${currentcard[0].trim()}=${currentcard[0].trim()}&front=${currentcard[2].trim()}&back=${currentcard[3].trim()}&box=${number}`
            document.cookie = cookie;
            showfront();            
            break;

        default:
            break;
    }
}

//handle add card:
function addCard(){
    var id = getnewid()!==NaN ? getnewid(): 1;
    var front = $("#front").val().trim();
    var back = $("#back").val().trim();
    var box = 1;
    document.cookie = `${id}=${id}&front=${front}&back=${back}&box=${box}`;
    // alert(document.cookie);
    // every cookie represents a card
    //card has front, back, box and id
    //algorithm for flashcard: https://www.skoumal.com/en/how-does-the-learning-algorithm-in-the-flashcard-app-vocabulary-miner-work/
}




function getnewid(){
    var cookielist = document.cookie.split(";");
    var idlist = cookielist.map(function(c){
        parameters = c.split("&");

        id = parseInt(parameters[0].split("=")[0].trim());
        return id;
    })
    var arraymax = Math.max.apply(Math, idlist);
    var newid = arraymax>0? arraymax+1 : 1;
    return newid;
}

function getminboxcard(){
    var cookie =cookieToArray();
    for (let box = 0; box < 9; box++) {
        for (let index = 0; index < cookie.length; index++) {
            var cardbox = cookie[index][4];
            if(cardbox == box){
                return cookie[index];
            }
        }        
    }
}
//function for getting list of cards:
function getlist(){
    $("#list").empty();
    var cookielist = document.cookie.split(";");
    cookielist.forEach(function(cookie){
        params = cookie.split("&");
        valuelist = params.map(function(item){
            keyval = item.split("=");
            return keyval[1];
        })
        if(valuelist.length>0){
            $("#list").append(` <tr>
            <td>${valuelist[0]}</td>
            <td>${valuelist[1]}</td>
            <td>${valuelist[2]}</td>
            <td>${valuelist[3]}</td>
            </tr>`)
        }
    });
}
function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function delete_cookie( name, path, domain ) {
    if( get_cookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function cookieToArray(){
    var cookielist = document.cookie;
    var myjson = '[["'+cookielist.replaceAll('&', '" , "').replaceAll('front=',' ').replaceAll('back=',' ').replaceAll(';','" ], [ "').replaceAll('box=',' ').replaceAll('=','", "')+ '"]]';
    var array = JSON.parse(myjson);
    return array;
}

// 1=1&front=fjdsoifj&back=jfoidj&box=1; 2=2&front=hellwo&back=iodj&box=1; 3=3&front=difjo&back=jfio&box=1; 4=4&front=idsjof&back=ijfod&box=1




// You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

// Sign in to Google
// firebase login
// Initiate your project
// Run this command from your app’s root directory:

// firebase init
// When you’re ready, deploy your web app
// Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:

// firebase deploy




