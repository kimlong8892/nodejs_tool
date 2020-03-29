$(document).ready(() => {
    $("#btn-send").click(function(){
        let mess = $("#txtMess").val();
        socket.emit('client-send-mess', {user: user, mess: mess});
    });
    socket.on('server-send-mess', function(data){
        console.table(data.user);
    });
});