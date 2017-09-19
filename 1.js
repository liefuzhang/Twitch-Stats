$(document).ready(() => {
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
                    <span class="channel-name">${title}</span>
                    <span class="status"><i>${status}</i></span></li>`); 
            });
        });
        
    });
}

function constructUrl(type, user) {
    var baseUrl = 'https://wind-bow.gomix.me/twitch-api';
    return `${baseUrl}/${type}/${user}?callback=?`;
}