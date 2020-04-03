$(document).ready(function(){
    socket.on('server-send-list-user-online', function(data){
        $("#list-user-online").html('');
        let base_url = window.location.origin;
        data.list_user.forEach(function(user){
            if(user_id != user.user_id){
                $("#list-user-online").append(`<li class="list-group-item"><a href='${base_url}/user/profile/${user.user_id}'>${user.user_name}</a></li>`);
            }
        });
    });
});