$(document).ready(function(){
    $.getJSON("data/data.json", function(data){
        var tags = [];
        $(data.repos).each(function(index){                        
            $(data.repos[index]).each(function(repoIndex, repoTags){
                // store unique tag names in tags
                $(repoTags.tags).each(function(tagIndex, tag){
                    if (!tags.includes(tag)) tags.push(tag);   
                });                          
                // Display repo details in implementations section
                $(repoTags).each(function(tagIndex, tag){
                    $(".implementations").append("<section class='col-6 pb-4' id='" + tag.title.replaceAll(" ","").replaceAll("/", "-").replace("#", "sharp").toLowerCase() + "'><h3 class='implementation-title'>" + tag.title + "</h3><p>"
                        + tag.description + "</p><div class='links'><a class='implementation-buttons' href='" 
                        + tag.sourceCodeUrl + "'>View on GitHub</a></div></section>");
                });
            });
        });
        // sanitise tag names to attach to id attribute and then add filter tags to page
        $(tags).each(function(index, tag){
            var id;
            !tag.indexOf("#") != -1 ? id = tag.replace("#", "sharp").toLowerCase() : id = tag.toLowerCase()
            $(".tags").append("<span class='filter-tag' id='" + id + "'>" + tag + "</span>");                   
        });
    }).fail(function(){
        console.log("An error has occurred.");
    });
    // filter tags
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".tags span").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });   
    // toggle select on tags
    $(".tags").click(function(event){
        if (event.target.id) {
            $("#" + event.target.id).toggleClass("selected");
            
            // for selected tag(s) display only the relevant repos
            var implementations = $(".implementation").length; 
            $(".implementation").each(function(index, implementation){
                if (implementation.getAttribute("id").indexOf(event.target.id) == -1) $(implementation).toggle();
            });
        }
    });             
});