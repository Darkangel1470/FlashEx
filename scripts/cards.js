// Add tab functions
async function addCard(){
    var front = $("#front").val().trim();
    var back = $("#back").val().trim();
    var box = 0;
    axios.post(path+'/addcard',{
        front: front,
        back: back,
        box: box,
        date: custdate()
    })
    .then(function (response) {})
    $("textarea").val("");  
    //algorithm for flashcard: https://www.skoumal.com/en/how-does-the-learning-algorithm-in-the-flashcard-app-vocabulary-miner-work/
}


// Deck tab functions
function getlist(){
    var cookielist;
    var imgsize = 34;
    // axios.post(path+'/getallcard')
    // .then(function(response){
    //         cookielist = response.data;
    //         $("#list").empty();
    //         $("#list").append(`<tr>
    //                     <th>Front</th>
    //                     <th>Back</th>
    //                     <th>Rev on</th>
    //                     <th>Del</th>
    //                 </tr>`)
    //         cookielist.forEach(function(cookie){
    //             $("#list").append(` <tr>
    //                     <td>${cookie.front}</td>
    //                     <td>${cookie.back}</td>
    //                     <td>${cookie.revdate}</td>
    //                     <td><img id="${cookie.id}" class="delbtn" width="${imgsize}" height="${imgsize}" src="../Assets/delete_icon.png"/></td>
    //                 </tr>`)
    //             });
    //         $(".delbtn").click(function(e){
    //             del_cookie(e.target.id);
    //         })
    //     });
}