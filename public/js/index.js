$(document).ready(() => {
    $("#btn-send").click(function(){
        let mess = $("#txtMess").val();
        socket.emit('client-send-mess', {mess: mess});
    });
    socket.on('server-send-mess', function(data){
        let mess = data.mess;
        let user = data.user;
        let row = '<div class="row p-1"> <div class="col-md-1 col-2"> <div class="text-center"> <img class="card-img-top rounded-circle" width="100%" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" /> <p class="small">'+user.user_name+'</p> </div> </div> <div class="col-md-11 col-10 card p-3" style="border-radius: 10px;">'+mess+'<p class="p-0 m-0 text-right"><small>11 mins ago</small></p> </div> </div>';
        $("#chatlog").append(row);
        $('#chatlog').animate({ scrollTop: 9999 }, 'slow'); 
        $("#txtMess").val('');
    });
});