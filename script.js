$(document).ready(function() {
  var twitchStreamers = [
    "DisguisedToastHS",
    "imaqtpie",
    "freecodecamp",
    "lirik",
    "nl_Kripp",
    "DansGaming",
    "CapcomFighters",
    "kronovi",
    "teamsp00ky",
    "summit1g",
    "Maximilian_DOOD",
    "brunofin",
    "comster404"
  ];

  var onlineStreamers = [];

  var offlineStreamers = [];

  function getData(streamer) {
    $.ajax({
      type: "GET",
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamer,
      dataType: "jsonp",
      success: function(response) {
        if (response.stream == null) {
          $.ajax({
            type: "GET",
            url: "https://wind-bow.glitch.me/twitch-api/channels/" + streamer,
            dataType: "jsonp",
            success: function(channelResponse) {
              if (channelResponse.hasOwnProperty("error")) {
                //Streamer does not exist
                $("#output").append(
                  "<div id='notFound'><div id='item'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src='http://via.placeholder.com/150x150'></div><div class='col-xs-8 col-lg-8'><h3>" +
                    streamer +
                    "</h3><h4>STREAMER NOT FOUND</h4></div></div></div>"
                );
              } else {
                //Streamers are offline
                $("#output").append(
                  "<div id='offline'><div id='item'><a href=" +
                    channelResponse.url +
                    " target='_blank'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src=" +
                    channelResponse.logo +
                    "></div><div class='col-xs-8 col-lg-8'><h3>" +
                    channelResponse.display_name +
                    "</h3><h4>OFFLINE</h4></div></div></a></div></div>"
                );
                offlineStreamers.push(streamer);
              }
            }
          });
        }
        //Streamers are online
        $("#output").append(
          "<div id='online'><div id='item'><a href=" +
            response.stream.channel.url +
            " target='_blank'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src=" +
            response.stream.channel.logo +
            "></div><div class='col-xs-8 col-lg-8'><h3>" +
            response.stream.channel.display_name +
            "</h3><h4>Playing: " +
            response.stream.game +
            "</h4><p>Status: " +
            response.stream.channel.status +
            "</p></div></div></a></div></div>"
        );
        onlineStreamers.push(streamer);
      }
    });
  }

  function getSingleData(streamer) {
    $.ajax({
      type: "GET",
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamer,
      dataType: "jsonp",
      success: function(response) {
        if (response.stream == null) {
          $.ajax({
            type: "GET",
            url: "https://wind-bow.glitch.me/twitch-api/channels/" + streamer,
            dataType: "jsonp",
            success: function(channelResponse) {
              if (channelResponse.hasOwnProperty("error")) {
                //Streamer does not exist
                $("#output").append(
                  "<div id='notFound'><div id='item'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src='http://via.placeholder.com/150x150'></div><div class='col-xs-8 col-lg-8'><h3>" +
                    streamer +
                    "</h3><h4>STREAMER NOT FOUND</h4></div></div></div>"
                );
              } else {
                //Streamers are offline
                $("#output").append(
                  "<div id='offline'><div id='item'><a href=" +
                    channelResponse.url +
                    " target='_blank'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src=" +
                    channelResponse.logo +
                    "></div><div class='col-xs-8 col-lg-8'><h3>" +
                    channelResponse.display_name +
                    "</h3><h4>OFFLINE</h4></div></div></a></div></div>"
                );
              }
            }
          });
        }
        //Streamers are online
        $("#output").append(
          "<div id='online'><div id='item'><a href=" +
            response.stream.channel.url +
            " target='_blank'><div class='row'><div class='col-xs-4 col-lg-2'><img id='logo' src=" +
            response.stream.channel.logo +
            "></div><div class='col-xs-8 col-lg-8'><h3>" +
            response.stream.channel.display_name +
            "</h3><h4>Playing: " +
            response.stream.game +
            "</h4><p>Status: " +
            response.stream.channel.status +
            "</p></div></div></a></div></div>"
        );
      }
    });
  }

  twitchStreamers.map(getData);

  $("#allBtn").on("click", function() {
    $("#output").html("");
    twitchStreamers.map(getData);
    onlineStreamers = [];
    offlineStreamers = [];
  });

  $("#onlineBtn").on("click", function() {
    $("#output").html("");
    onlineStreamers.map(getData);
    onlineStreamers = [];
  });

  $("#offlineBtn").on("click", function() {
    $("#output").html("");
    offlineStreamers.map(getData);
    offlineStreamers = [];
  });

  $("#searchText").autocomplete({ source: twitchStreamers });

  $("#searchButton").on("click", function() {
    $("#output").html("");
    getSingleData($("#searchText").val());
    $("#searchText").val("");
  });

  $("#searchText").keypress(function(e) {
    if (e.keyCode === 13) {
      $("#output").html("");
      getSingleData($("#searchText").val());
      $("#searchText").val("");
    }
  });
});