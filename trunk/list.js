/*This is the command that handles all the words*/

var list_queue = [];
var citem = []; //wha? I dont cite anything. if i didn't dispise camelcase, it should be cItem

function newlist(){
  list_queue = [];
  next_word();
  $("#input").focus();
}

function next_word(){
  if(!lists[cgroup][cfile].list){
    $.get("list/"+cgroup+"/"+cfile, {}, function(e){
      parse_list(cgroup, cfile, e);
      next_word();
    })
    return;
  }
  if(!lists || !lists[cgroup] || !lists[cgroup][cfile] || !lists[cgroup][cfile].list){
    query("Use recovery commands on input box.");
    return msg("System Loading Error! List data not available.","red");
  }
  var list = lists[cgroup][cfile].list;
  if(list_queue.length == 0){
    list_queue = list.slice(0)
    var item = list_queue.splice(0, 1)[0];
  }else{
    var item = list_queue.splice(Math.floor(list_queue.length*Math.random()),1)[0];
  }
  citem = item;
  query("What does "+citem[2]+" ("+citem[0]+") mean?")
}

commands._default = function(args){
  if(citem.length > 0){
    if(args == citem[1]){
      msg("Correct! "+citem[0]+" means "+args+"!","green")
    }else if(damlev(args, citem[1]) <= 1){
      msg("Oops! You made a typo. You said "+args+" but it should have been "+citem[1],"orange")
    }else{
      msg("Wrong! "+citem[0]+" means "+citem[1],"red");
    }
  }
  next_word();

 
}
