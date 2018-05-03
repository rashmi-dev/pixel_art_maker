$(document).ready(function(){
  var colors =         ["#FF1493","#FF4500","#FF0000","#32CD32","#FF00FF","#000000","#7CFC00","#32CD32","#FF4500","#FF00FF","#fcd000","#00FFFF","#FF69B4","#7CFC00","#FF1493","#00FFFF","#FF0000"];
    var h1 = $('h1');
    var headline ="Pixel Art Maker";
    var letters = headline.split('');
    var n = letters.length;
    //h1.html("");
    var i=0;var x=0;
    var result ="";
    var color="";
  //changing the background color
    function change(){
      var colors = ["#FFC0CB","#FFE4B5","#B0E0E6","#D3D3D3","#E0FFFF","#E6E6FA"];
      if(x == colors.length){x=0;}
      var color = "linear-gradient(to right,#FFF,"+colors[x]+")";
      $("nav").css("background",color);
      x++;
      //FFC0CB
    }
    setInterval(change,5000);
   //changing the h1 char color
    $.each(letters, function(index,objValues) {
        var span = $("<span>"+objValues+"</span>").appendTo(h1);
        result+= span.css("color",colors[i]);
        i++;
    });
   //creating the grid
   $("#submit").click(function(e) {
       e.preventDefault();
       clear_grid();
     $(".game_tab").addClass("display_none");
      //value from the input height ,input width and input color
       var len= $("#input_height").val();
       var width = $("#input_width").val();
       var color = colorPicker();
       var grid_color = grid_color_picker();
        //checking condition so that the grid is rendered clearly.
       if(len<=0 || width<=0 ){
            alert("Grid Height and Grid width should be greater than zero");
        }
       if(len <= 100 && width <=100) {
            makeGrid(len,width,color,grid_color);
        }
        if(len > 100 || width > 100){
            alert("Grid Height and Grid width should be less than or equal to 100");
        }
    });
    $("#pixel_canvas").on("mouseup mousedown touchstart touchend", "td", function(e) {
        e.stopPropagation();
     if($("input[type='radio']#gradient_picker").is(':checked')){
         var base_gradient = $("#base_gradient").val();
         var right_gradient = $("#right_gradient").val();
        if($("input[type='radio']#linear").is(':checked')){
             color = "linear-gradient(to right,"+base_gradient+","+right_gradient+")";
             $( this ).css("background",color);
          }
         else if($("input[type='radio']#radial").is(':checked')){
             color = "radial-gradient("+base_gradient+","+right_gradient+")";
             $( this ).css("background",color);
         }
     }
     else{
        var color = colorPicker();
        $( this ).css("background-color",color);
       }
    });
     $("#pixel_canvas").on("dblclick", "td", function(e) {
        e.stopPropagation();
         $( this ).css("background","#fff");
     });
   $("#clear_color").on("click",function(e) {
        //e.stopPropagation();
         $("#pixel_canvas td").css("background","#fff");
    });
    //calls color picker function
    $("#color").on('click touch',function() {
        var color = colorPicker();
     });
    //calls clearing the table function
    $("#clear").click(function() {
        console.log("clear");
        clear_grid();
    
     $(".game_tab").addClass("display_none");
    });
    
    //function to draw the grid
    function makeGrid(len,width,color,grid_color){
        console.log("makeGrid"+grid_color);
      
        for(var i=0;i<len;i++){
            var tr_id = $("#pixel_canvas").append("<tr></tr>");
            var id ="id"+i;
            var tr = $("tr").eq(i).attr("id",id);
            for(var j=0;j<width;j++){
                var pixel_id = "pixel"+j;
                $('<td></td>', {
                    id: pixel_id,
                }).appendTo(tr);
            }
        }
      $("#pixel_canvas.table,tr,td").css("border","1px solid "+grid_color);
   }
    //function to pick color return
    function colorPicker(){
        var color_picked = $("#colorPicker").val();
        return color_picked;
    }
    function grid_color_picker(){
      var color_picked = $("#grid_color_picker").val();
      return color_picked;
    }
    //clearing the table function
    function clear_grid(){
        $("#pixel_canvas tr").remove();
    }
    $(".navbar-toggler-icon").click(function(){
       $("#side_navigation").addClass("width_nav");                     
    }); 
     $(".close_btn").click(function(){
     $("#side_navigation").removeClass("width_nav");      
    });
  
   
     $("#load_game").click(function(){
       clear_grid();
        clear_game();
      $(".game_tab").removeClass("display_none");
      load_game();
    });
     $("#clear_game").click(function(){
      clear_game();
      $(".game_tab h5").addClass("display_none");
 });
  
   function load_game(){
     var td_id ="";
     var tr_id =""; 
     var get_td_id="";
     var colored_array =[];
     var colored_array_tr =[];
     var graduation_icon = "";
     var graduation_icon_tr = "";
     var id="";
     $("h5").addClass("display_none");
     for(var i=0;i<10;i++){
            var tr_id = $("#game_canvas").append("<tr></tr>");
            var id ="id"+i;
            var tr = $("tr").eq(i).attr("id",id);
            for(var j=0;j<10;j++){
                var pixel_id = "pixel"+j;
                $('<td></td>', {
                    id: pixel_id,
                }).appendTo(tr);
            }
        }
    //}
    var x=0;
    while(x < 9 ){
      var colors = ["#FFC0CB","#e0b872","#D3D3D3","#E0FFFF","#ADADEC","#a0dcdc","#b9f","#adff99","#f76968"];
      var url;
      //if(x == colors.length){x=0;}
      var random_tr = Math.floor(Math.random() * 10);
      var random_td = Math.floor(Math.random() * 10);
      td_id = "#pixel"+random_td;
      tr_id ="#id" +random_tr;
      get_td_id ="td"+td_id;
      id = "#game_canvas "+tr_id;
      $(id).find(get_td_id).css("background",colors[x]);
      colored_array.push(td_id);
      colored_array_tr.push(tr_id);
      if(x == 7){ 
        if($(id).find(get_td_id).next().attr("id")!=null){
        console.log($(id).find(get_td_id).next().attr("id"));
           graduation_icon = $(id).find(get_td_id).next().attr("id");
            console.log("after!"+graduation_icon_tr+" "+graduation_icon);
           $("#"+graduation_icon).append("<button type='button' class='btn btn-primary icon' data-toggle='modal' data-target='#myModal'><a><span class='fa fa-graduation-cap fa-sm'></span></a></button>").addClass("grad");
           $("#"+graduation_icon).css("opacity","0");
        }
        else{
         console.log("prev"+$(id).find(get_td_id).prev()+""+id+""+get_td_id);
            graduation_icon = $(id).find(get_td_id).prev().attr("id");
            $("#"+graduation_icon).append("<button type='button' class='btn btn-primary icon' data-toggle='modal' data-target='#myModal'><a><span class='fa fa-graduation-cap fa-sm'></span></a></button>").addClass("grad");
           console.log("previous!"+graduation_icon);
     $("#"+graduation_icon).css("opacity","0");
        }
      }
     $(id).find(get_td_id).css("opacity","0");
    x++;
    }
    $("#game_canvas").on("mouseup mousedown touchstart touchend", "td", function(e) {
       if($(this).hasClass("grad")){
        $("#"+graduation_icon).css("opacity","1");
         $("h5").removeClass("display_none");
         console.log("winner!");
         $('#myModal').modal('show');
        }
        else{
           $(this).css("opacity","1");
        }
      });
    }
    function load_answers(){
         $("#game_canvas td").css("opacity","1");
     }
     function clear_game(){
        $("#game_canvas tr").remove();
   }
});
        