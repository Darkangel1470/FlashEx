const addtabpath = "../components/addTab.html"
const revtabpath = "../components/revtab.html"
const decktabpath = "../components/decktab.html"
const path = "http://localhost:3000"
var currentcard;

$(document).ready(async function() {
    //handle navigation
    loadDecktab();
    $(addtab).click(loadAddtab)
    $(reviewtab).click(loadRevtab);
    $(decktab).click(loadDecktab);
    //handle add card request
    $( "form" ).submit(function( event ) {
        event.preventDefault();
      });
})

function custdate(box=0) {
    var arr = [0,1,2,3,5,10,30,60,90];
    var d = new Date(Date.now()+arr[box]*24*60*60*1000);
    var date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
    return date;
}

//change date at which to read the card

//function to add days to card

//functions to check if the date has passed

//Loading tabs
function loadAddtab(){
    $(mainbody).load(addtabpath, addtabsetup);
    $("div>#reviewtab").parent().css({'border-radius':'0 0 0px 10px'}).addClass('bg-secondarypurple');
    $("div>#addtab").parent().css({'border-radius':'0 0 0px 0px'}).removeClass('bg-secondarypurple');
    $("div>#decktab").parent().css({'border-radius':'0 0 10px 0px'}).addClass('bg-secondarypurple');
    
}
function loadRevtab(){
    $("div>#reviewtab").parent().css({'border-radius':'0 0 0px 0px'}).removeClass('bg-secondarypurple');
    $("div>#addtab").parent().css({'border-radius':'0 0 10px 0px'}).addClass('bg-secondarypurple');
    $("div>#decktab").parent().css({'border-radius':'0 0 0px 10px'}).addClass('bg-secondarypurple');
    $(mainbody).load(revtabpath, revtabsetup);
}
function loadDecktab(){
    $("div>#reviewtab").parent().css({'border-radius':'0 0 10px 0px'}).addClass('bg-secondarypurple');
    $("div>#addtab").parent().css({'border-radius':'0 0 0px 0px'}).addClass('bg-secondarypurple');
    $("div>#decktab").parent().css({'border-radius':'0 0 0px 0px'}).removeClass('bg-secondarypurple');
    $(mainbody).load(decktabpath, decktabsetup);
}
// Setup functions
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
    if(cookieToArray()[0].length >1){
        showfront();
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

//review tab functions

async function showfront(){
    $("#difftab").hide();
    $(backbtn).hide();
    if(cookieToArray()[0].length >1){
        currentcard = await gettodaycookie();
        if(currentcard.length==0){
            $("#cardFront").text('Congrats!! You are done for today');
            $("#showtab").hide(); 
        }else{
            $("#cardFront").text(currentcard['front']);        
            $("#showtab").show();   
        }
    }else{
        $("#cardFront").text("You dont have any card yet");        
        $("#showtab").hide(); 
    }
}
function showBack(){
    if(cookieToArray()[0].length >1){
        $("#cardFront").text(currentcard['back']);
        $("#difftab").show();
    }else{
        $("#cardFront").text("You dont have any card yet");
    }
    $(backbtn).show();
    $("#showtab").hide();
}

function diffhandler(){
    switch (this.id) {
        case "easy":
            //'1=1&front=Whats your name&back=Nihar&box=1'
            var box = parseInt(currentcard['box'])>7 ? 8 : parseInt(currentcard['box'])+1;
            updateCard(currentcard['id'], currentcard['front'], currentcard['back'], box, custdate(box));
            showfront();
            break;
            
        case "notsure":
            var box =parseInt(currentcard['box']);
            updateCard(currentcard['id'], currentcard['front'], currentcard['back'], box, custdate(box));
            showfront();           
            break;
            
        case "hard":
            var box = parseInt(currentcard['box'])<3 ? 0 : parseInt(currentcard['box'])-3;
            updateCard(currentcard['id'], currentcard['front'], currentcard['back'], box, custdate(box));
            showfront();            
            break;

        default:
            break;
    }
}
function updateCard(id, front, back, box, date){
    axios.post(path+'/updatecard',{
        id:id,
        front:front,
        back:back,
        box:box,
        revdate:date
    }).then(function(response){
        console.log('response :>> ', response);
    })
}
async function gettodaycookie(){
    var response = await axios.post(path+'/gettodaycookie',{today: custdate()})
    currentcard = response.data;
    return response.data; 
}
function getminboxcard(){
    var cookie =cookieToArray(); 
    var todaycookie=[];
    cookie.forEach(function(c){
        if(c[5] == custdate()){
            todaycookie.push(c);
        }        
    })
    if(todaycookie.length>0){

        for (let box = 0; box <11; box++) {
            for (let index = 0; index < todaycookie.length; index++) {
                var cardbox = todaycookie[index][4];
                if(cardbox == box){
                    return todaycookie[index];
                }
            }        
        }   
    }else{
        return [];
    }
}
//Add tab functions:
function addCard(){
    var id = getnewid()!==NaN ? getnewid(): 1;
    var front = $("#front").val().trim();
    var back = $("#back").val().trim();
    var box = 0;
    axios.post(path+'/addcard',{
        // id: id,
        front: front,
        back: back,
        box: box,
        date: custdate()
    })
        .then(function (response) {
            
        })
    $("textarea").val("");  
    // every cookie represents a card
    //card has front, back, box and id
    //algorithm for flashcard: https://www.skoumal.com/en/how-does-the-learning-algorithm-in-the-flashcard-app-vocabulary-miner-work/
}
//Deck tab Functions
//function for getting list of cards:
function getlist(){
    var cookielist;
    var imgsize = 34;
    axios.post(path+'/getallcard')
    .then(function(response){
            cookielist = response.data;
            $("#list").empty();
            $("#list").append(`<tr>
            <th>Front</th>
                    <th>Back</th>
                    <th>Rev on</th>
                    <th>Del</th>
                    </tr>`)
            cookielist.forEach(function(cookie){
                $("#list").append(` <tr>
                    <td>${cookie.front}</td>
                    <td>${cookie.back}</td>
                    <td>${cookie.revdate}</td>
                    <td><img id="${cookie.id}" class="delbtn" width="${imgsize}" height="${imgsize}" src="../Assets/delete_icon.png"/></td>
                    </tr>`)
                });
            $(".delbtn").click(function(e){
                del_cookie(e.target.id);
            })
        });
}
function del_cookie(id){
    axios.post(path+'/deletecard', {id:id})
    .then(function(response){
            console.log('delete response :>> ', response);
        })
    getlist();
}
function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}


//converts cookie data into array format

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




//Legacy code:
// function addCard(){
//     var id = getnewid()!==NaN ? getnewid(): 1;
//     var front = $("#front").val().trim();
//     var back = $("#back").val().trim();
//     var box = 0;
//     document.cookie = `${id}=${id}&front=${front}&back=${back}&box=${box}&date=${custdate()}`;
//     $("textarea").val("");
//     // alert(document.cookie);
//     // every cookie represents a card
//     //card has front, back, box and id
//     //algorithm for flashcard: https://www.skoumal.com/en/how-does-the-learning-algorithm-in-the-flashcard-app-vocabulary-miner-work/
// }
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
function cookieToArray(){
    var cookielist = document.cookie;
    var myjson = '[["'+cookielist.replaceAll('&', '" , "').replaceAll('front=','').replaceAll('back=','').replaceAll(';','" ], [ "').replaceAll('box=','').replaceAll('date=','').replaceAll('=','", "')+ '"]]';
    var array = JSON.parse(myjson);
    return array;
}
function delete_cookie( name, path, domain ) {
    if( get_cookie( name ) ) {
      document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}