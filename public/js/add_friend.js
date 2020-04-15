$(document).ready(function(){
    $("#btn-add-friend").click(function(){
        let id_friend = $("#id_friend").val();
        $.ajax({
            url: window.location.origin + "/user/add-friend",
            method: "POST",
            data: {id_friend:id_friend},
            success:function(data){
                $(this).html('Đã gửi yêu cầu');
            },
        });
    });  
});