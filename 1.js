$(document).ready(() => {
    $('#buttons div').click(function(e){
        var $this =$(this);
        $('#buttons div').removeClass('active');
        $this.addClass('active');
        var id = $this.attr('id');
        if(id ==='all'){
            $('.offline').show();
            $('.online').show();
        } else if (id === 'online') {
            $('.offline').hide();
            $('.online').show();
        } else if (id === 'offline') {
            $('.offline').show();
            $('.online').hide();
        }
    });
    buildStreamStats();
});

function buildStreamStats() {
    var users = ["ESL_SC2", "OgamingSC2", "freecodecamp"];
    
    users.forEach(function(item){
        var url = constructUrl("streams", item);
        var title;
        var logoUrl;
        $.getJSON(url, function(json) {
            var status;
            if (json.stream == null) {
                status = "offline"
            } else {
                status = json.stream.channel.status;
            }

            var channelUrl = constructUrl("channels", item);
            $.getJSON(channelUrl, function(json){
                title = json.display_name;
                logoUrl = json.logo;
                var className = status === 'offline' ? 'offline' : 'online';
                $('#streams').append(`<li class="${className}">
                    <img src="${logoUrl}">
                    <span class="channel-name"><a target="_blank" href="https://www.twitch.tv/${title}">${title}</a></span>
                    <span class="status"><i>${status}</i></span></li>`); 
            });
        });
        
    });
}

function constructUrl(type, user) {
    var baseUrl = 'https://wind-bow.gomix.me/twitch-api';
    return `${baseUrl}/${type}/${user}?callback=?`;
}