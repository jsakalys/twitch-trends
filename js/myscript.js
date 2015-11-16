var getLiveStreams = function(){

	$.get('https://api.twitch.tv/kraken/streams').done(function(data){
		var allViewers=[];
		for (var i = 0; i < 5; i++) {
		 	allViewers.push(data.streams[i].viewers);
		 };
		var totalViewers = allViewers.reduce(function(a, b){
			return a + b
		}, 0);
		var viewerPercentages = allViewers.map(function(viewers){
			return Math.round(viewers/totalViewers * 100);
		});
		var liveStreamsData = [];
		for (var i = 0; i < 5; i++) {
			liveStreamsData[i] = {};
			liveStreamsData[i].name = data.streams[i].channel.display_name;
			liveStreamsData[i].viewers = data.streams[i].viewers;
			liveStreamsData[i].preview = data.streams[i].preview.large;
			liveStreamsData[i].percentage = viewerPercentages[i];
		};
		var firstFourSum = viewerPercentages.reduce(function(a, b) {
			return a + b;
		});
		firstFourSum -= viewerPercentages[4];
		liveStreamsData[4].percentage = 100 - (firstFourSum);
		d3.selectAll("#streams div")
		    .data(liveStreamsData)
		    .transition()
		    .duration(2000)
		    .style("width", function(d) { return  d.percentage + '%' })
		    .style("background-image", function(d) { return "url('" + d.preview + "')" })

		d3.selectAll('#streams a')
			.data(liveStreamsData)
			.attr('href', function(d) { return 'http://twitch.tv/' + d.name })

		d3.selectAll("#streams .title")
			.data(liveStreamsData)
			.html(function(d) { return d.name })

		d3.selectAll("#streams .viewers")
			.data(liveStreamsData)
			.html(function(d) { return d.viewers + ' viewers | ' + d.percentage + '%' })
	});
};

var getTopGames = function(){

	$.get('https://api.twitch.tv/kraken/games/top').done(function(data){
		var allViewers=[];
		for (var i = 0; i < 5; i++) {
			allViewers.push(data.top[i].viewers);
		};
		var totalViewers = allViewers.reduce(function(a, b){
			return a + b
		}, 0);
		var viewerPercentages = allViewers.map(function(viewers){
			return Math.round(viewers/totalViewers * 100);
		});
		var topGamesData = [];
		for (var i = 0; i < 5; i++) {
			topGamesData[i] = {};
			topGamesData[i].name = data.top[i].game.name;
			topGamesData[i].viewers = data.top[i].viewers;
			topGamesData[i].preview = data.top[i].game.box.large;
			topGamesData[i].percentage = viewerPercentages[i];
		};
		var firstFourSum = viewerPercentages.reduce(function(a, b) {
			return a + b;
		});
		firstFourSum -= viewerPercentages[4];
		topGamesData[4].percentage = 100 - (firstFourSum);
		d3.selectAll("#games div")
		    .data(topGamesData)
		    .transition()
		    .duration(2000)
		    .style("width", function(d) { return  d.percentage + '%' })
		    .style("background-image", function(d) { return "url('" + d.preview + "')" })
		
		d3.selectAll("#games a")
			.data(topGamesData)
			.attr('href', function(d) { return 'http://twitch.tv/directory/game/' + d.name })

		d3.selectAll("#games .title")
			.data(topGamesData)
			.html(function(d) { return d.name })

		d3.selectAll("#games .viewers")
			.data(topGamesData)
			.html(function(d) { return d.viewers + ' viewers | ' + d.percentage + '%' })

	});
};

var getMostViewed = function(){

	$.get('https://api.twitch.tv/kraken/videos/top').done(function(data){
		var allViewers=[];
		for (var i = 0; i < 5; i++) {
			allViewers.push(data.videos[i].views);
		};
		var totalViewers = allViewers.reduce(function(a, b){
			return a + b
		}, 0);
		var viewerPercentages = allViewers.map(function(viewers){
			return Math.round(viewers/totalViewers * 100);
		});
		var mostViewedData = [];
		for (var i = 0; i < 5; i++) {
			mostViewedData[i] = {};
			mostViewedData[i].name = data.videos[i].title;
			mostViewedData[i].viewers = data.videos[i].views;
			mostViewedData[i].preview = data.videos[i].preview;
			mostViewedData[i].url = data.videos[i].url;
			mostViewedData[i].percentage = viewerPercentages[i];
		};
		var firstFourSum = viewerPercentages.reduce(function(a, b) {
			return a + b;
		});
		firstFourSum -= viewerPercentages[4];
		mostViewedData[4].percentage = 100 - (firstFourSum);
		d3.selectAll("#viewed div")
		    .data(mostViewedData)
		    .transition()
		    .duration(2000)
		    .style("width", function(d) { return  d.percentage + '%' })
		    .style("background-image", function(d) { return "url('" + d.preview + "')" })
		
		d3.selectAll("#viewed a")
			.data(mostViewedData)
			.attr('href', function(d) { return d.url })

		d3.selectAll("#viewed .title")
			.data(mostViewedData)
			.html(function(d) { return d.name })
		d3.selectAll("#viewed .viewers")
			.data(mostViewedData)
			.html(function(d) { return d.viewers + ' views | ' + d.percentage + '%' })

	});
};

$(document).ready(function(){
	// var ls = setInterval(getLiveStreams, 2000);
	// var tg = setInterval(getTopGames, 2000);
	// var mv = setInterval(getMostViewed, 2000);
	getTopGames();
	getLiveStreams();
	getMostViewed();
});
