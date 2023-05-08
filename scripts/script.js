const registertabpath = "../components/register.html"
const logintabpath = "../components/login.html"
const navtabpath = "../components/navTab.html"
const addtabpath = "../components/addTab.html"
const revtabpath = "../components/revtab.html"
const decktabpath = "../components/decktab.html"
const profiletabpath = "../components/profiletab.html"
const settingstabpath = "../components/settingstab.html"
const path = false ? "http://localhost:3000": "https://weak-plum-skunk-shoe.cyclic.app/";
var currentcard;

$(document).ready(async function() {
    //handle navigation

    var session = await sessionCheck();
    console.log('session :>> ', session.loggedin);
    if(session.loggedin){//if user has logged in
        loadAddtab();
        loadNavTab();
    }else{ // if user is not logged in
        loadLoginTab();
    }
    //handle add card request
    $( "form" ).submit(function( event ) {
        event.preventDefault();
      });
})


//review card functions

async function showfront(){
    
    $("#cardFront").text("Loading...");  
    $("#difftab").hide();
    $(backbtn).hide();
    currentcard = await gettodaycookie();
    if(currentcard.length==0){
        $("#cardFront").text('Congrats!! You are done for today');
        $("#showtab").hide(); 
    }else{
        $("#cardFront").text(currentcard['front']);        
        $("#showtab").show();   
    }
}
function showBack(){

    $("#cardFront").text(currentcard['back']);
    $("#difftab").show();
    
    $(backbtn).show();
    $("#showtab").hide();
}
function diffhandler(){
    switch (this.id) {
        case "easy":
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
function custdate(box=0) {
    var arr = [0,1,2,3,5,10,30,60,90];
    var d = new Date(Date.now()+arr[box]*24*60*60*1000);
    var date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
    return date;
}
// add card function

function del_cookie(id){
    axios.post(path+'/deletecard', {id:id})
    .then(function(response){
            console.log('delete response :>> ', response);
        })
    getlist();
}






function reload(){
    document.location.reload();
}