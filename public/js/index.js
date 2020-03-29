$(document).ready(() => {
    scollChatlog();
    $.ajax({
        url: window.location.origin + "/chatlog",
        type: 'GET',
        success: function(data){
            data[0].forEach(function(data){
                appendChat(data.user_name, data.mess);
            });
        }
    });
    function sendMess(mess){
        if(mess == '')
            return false;
        socket.emit('client-send-mess', {mess: mess});  
    }
    $("#btn-send").click(function(){
        let mess = $("#txtMess").val();
        sendMess(mess);
        let url = window.location.origin + "/chatlog/add";
        $.ajax({
            url: url,
            type: 'POST',
            data: {mess: mess},
            success: function(){
            }
        });
        return false;
    });
    socket.on('server-send-mess', function(data){
        let mess = data.mess;
        let user = data.user;
        appendChat(user.user_name, mess);
        scollChatlog();
        $("#txtMess").val('');
    });
    function scollChatlog(){
        $('#chatlog').animate({ scrollTop: 9999 }, 'slow');
    }
    function appendChat(user_name, mess)
    {
        let row = '<div class="row p-1"> <div class="col-md-1 col-2"> <div class="text-center"> <img class="card-img-top rounded-circle" width="100%" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" /> <p class="small">'+user_name+'</p> </div> </div> <div class="col-md-11 col-10 card p-3" style="border-radius: 10px;">'+mess+'<p class="p-0 m-0 text-right"><small>11 mins ago</small></p> </div> </div>';
        $("#chatlog").append(row);
    }
});