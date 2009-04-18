      var pretty_names = {
        "words.txt": "Words",
        "parts.txt": "Parts"
      }
      
      var themes = {
        "gray": {bg: "DarkGray", text: "black", link: "#888", linksel: "black"},
        "black": {bg: "black", text: "white", link: "#A9A9A9", linksel: "white"},
        "white": {bg: "white", text: "black", link: "#A9A9A9", linksel: "black"}
      }
      
      function set_theme(name){
        theme = themes[name];
        $("body").css("background-color", theme.bg);
        $("body").css("color", theme.text);
        $("a").css("color", theme.link);
        $(".linksel").css("color", theme.linksel)
      }
      
      var theme = themes['gray'];
      
      function msg(content, color){
        $("#msg").fadeOut();
        if(content){
          $("#msg").queue(function(){
            $("#msg").text(content);
            $(this).dequeue();
            $("#msg").css("background-color", color);
            $("#msg").fadeIn();
          });
        }
      }
      
      function query(content){
        $("#query").text(content);
      }
      
      function hide_box(){
        msg();
        $("#query, #input").fadeOut("slow");
      }
      
      function show_box(){
        $("#input").val("");
        $("#query, #input").fadeIn("slow");
      }
      
      
      function create_sub(list){
        $("#sub")
        .fadeOut("slow")
        .queue(function(){
          $(this).css("display","none");
          $(this).html("")
          $.each(list, function(index, item){
            var prettyindex=pretty_names[index]?pretty_names[index]:index;
            $(document.createElement("a"))
              .text(prettyindex)
              .data("index",index)
              .attr("href","#")
              .css("color", "#888")
              .click(function(e){
                cfile = $(this).data("index")
                
                e.preventDefault();
                $("a")
                  .removeClass("linksel")
                  .animate({color: theme.link})
                $(this)
                  .addClass("linksel")
                  .animate({color: theme.linksel})
                hide_box();
                show_box();
                
                newlist();
            })
            .appendTo("#sub")
          })
          $("#sub")
            .children()
            .filter(":eq(0)")
            .click()
          
          $(this).dequeue()
        })
        .fadeIn('slow')
      }
      
      
      $(document).ready(function(){
        $("#initial_select").attr("disabled","true")
        $("#list_select").change(function(e){
          hide_box();
          cgroup = $("#list_select :selected").val();
          create_sub(lists[cgroup])
        })
      })
      
      function build_list(){
        $.each(lists, function(index, item){
          $(document.createElement("option"))
            .attr("id","whatever"+index)
            .val(index)
            .text("Word List #"+index)
            .appendTo("#list_select")
        })
      }
