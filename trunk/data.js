var default_config = {
  "parts.txt": {query: "What does {word} ({blah}) mean?"}
}
var lists = {};
var cgroup = "";
var cfile = "";


function parse_index(text){
  $.each(text.split("\n"), function(index, item){
    if(item != ""){
      var parts = item.split(":");
      if(parts[0] == ""){
        lists[parts[1]] = {}
      }else if(lists[parts[0]]){
        lists[parts[0]][parts[1]] = {};
      }
    }
  })
  $(document).ready(build_list);
}

function parse_list(group, file, text){
  lists[group][file].config = default_config[file]?default_config[file]:{}
  $.each(text.split("\n"), function(index, item){
    if(item.substr(0,7) == "#!type:"){
      lists[group][file].config = _.extend(lists[group][file].config,
        default_config[item.substr(7)]);
    }
    if(item.substr(0,7) == "#!conf:"){
      lists[group][file].config = _.extend(lists[group][file].config,
        eval("("+item.substr(7)+")"));
    }
    if(!lists[group][file].list) lists[group][file].list = [];
    var parts = item.split(",");
    lists[group][file].list.push(parts);
  })
}

$.get("list.php",{},function(e){
  parse_index(e);
})

