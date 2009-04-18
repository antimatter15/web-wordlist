var commands = {};

$(document).ready(function(){
  $("#inputform").submit(function(e){
    e.preventDefault();
    var input = $("#input").val()
    $("#input").val("")
    
    handle_input(input);
  })
})

function handle_input(args){
  if(args.substr(0,3) == "js:"){
    try{
      msg(eval(args.substr(3)),"gray");
    }catch(err){
      msg("Execution Error:","red");
    }
  }else if("<?!:".indexOf(args.substr(0,1)) != -1){
    var parts = args.substr(1).split(/\s|;|:/)
    if(commands[parts[0]]){
      try{
        msg(commands[parts[0]](parts[1]),"gray");
      }catch(err){
        msg("Command Execution Error:","red");
      }
    }else{
      msg("Command Not Found", "red");
    }
    //find command
    
  }else{
    commands._default(args);
  }
}
