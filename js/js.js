$(document).ready(function(){
    loadContent('signup');
    $("input").hover(function(){alert("teste");});
});
function formSubmit(){
    signUp();
    loadContent('list');
    return false;
}
function loadContent(action){
    if(action==="signup"){
        $(".signup").addClass("active");
        $(".list").removeClass("active");
    }else if(action==="list"){
        $(".list a").html("Aguarde...");
        $(".list").addClass("active");
        $(".signup").removeClass("active");
    }
    $.ajax({
        data:{request:"htmlContent"},
        type:"post",
        url:"php/content/"+action+".php",
        success:function(data){
            if(!$(".panel").hasClass("panel-primary"))
                $(".panel").removeClass("panel-danger").addClass("panel-primary");
            $(".panel").html(data);
            if($(data).filter(".panel-heading").html()==="Lista de inscritos")
                $(".list a").html("Visualizar cadastros");
            fadeIn();
        },
        error:function(){
            if(!$(".panel").hasClass("panel-danger"))
                $(".panel").removeClass("panel-primary").addClass("panel-danger");
            $(".panel").html(erro[0]);
            if($(data).filter(".panel-heading").html()==="Lista de inscritos")
                $(".list a").html("Visualizar cadastros");
            fadeIn();
        }
    });
}
function signUp(){
    $.ajax({
        data:{
            request:"signUp",
            name:$(".name").val(),
            email:$(".email").val(),
            age:$(".age").val()
        },
        type:"post",
        url:"php/content/signup.php",
        success:function(data){
            var obj=JSON.parse(data);
            swal({title:obj.msg,type:obj.type});
        },
        error:function(){swal({title:erro[1],type:"error"});}
    });
}
function fadeIn(){$("body").fadeTo(600, 1,"swing");}
function loadFile(url){
    if(/css$/.test(url)&&$("link[href='"+url+"']").length===0) $("head").append("<link rel='stylesheet' href='"+url+"'>");
    else if(/js$/.test(url)&&$("script[src='"+url+"']").length===0) $("head").append("<script src='"+url+"'></script>");
}