var myApp = angular.module('myApp', []).

directive("barsChart", [
	function(){
		return {
			restrict: "E",
			scope: {
				data: "=chartData"
			},
			link: function(scope, element){
				var margin = {top: 20, right: 20, bottom: 20, left: 20};
				var w =  500;
				var h = 300;
		        var padding = 50;

		        var svg = d3.select(element[0])
			       				.append("svg")
			       				.attr("width", w + margin.left + margin.right)
			       				.attr("height", h + margin.top + margin.bottom)
			       				.attr("id", "canvas");
			    // x axis label
			    svg.append("text")
			    	.attr("x", (w/2)-padding+margin.left)
			    	.attr("y", h - margin.bottom)
			    	.style("text-anchor", "middle")
			    	.style("font-size", "10px")
			    	.text("Likes");
			    // y axis label
			    svg.append("text")
			    	.attr("transform", "rotate(-90)")
			    	.attr("y", 0)
			        .attr("x",0 - (h / 2))
			        .attr("dy", "1em")
			    	.style("text-anchor", "middle")
			    	.style("font-size", "10px")
			    	.text("Comments");
			    
		        scope.render = function(dataset){
		        	var xScale = d3.scale.linear()
								.domain([0, d3.max(dataset, function(d){
										return d.likes.count;
								})])
								.range([padding, w-padding * 2])
		       					.clamp(true);
					var yScale = d3.scale.linear()
									.domain([0, d3.max(dataset, function(d){
											return d.comments.count;
									})])
									.range([h-padding, padding])
						       		.clamp(true);
					var rScale = d3.scale.linear()
									.domain([0, d3.max(dataset, function(d){
											return d.likes.count;
									})])
									.range([2, 8]);
			       	var xAxis = d3.svg.axis()
			       					.scale(xScale)
			       					.orient("bottom")
			       					.ticks(5);
			       	var yAxis = d3.svg.axis()
			       					.scale(yScale)
			       					.orient("left")
			       					.ticks(5);
			       	svg.selectAll('circle')
			       		.data(dataset)
			       		.enter()
			       		.append('circle')
			       		.attr('cx', padding)
			       		.attr('cy', function(d){
			       			return yScale(d.comments.count);
			       		})
			       		.attr('r', function(d){
			       			return rScale(d.likes.count);
			       		});
			       	svg.selectAll("text.username")
						.data(dataset)
						.enter()
						.append("text")
						.text(function(d){
				    		return d.user.username;
				    	})
						.attr("y", function(d){
				        	return yScale(d.comments.count);
				        })
				        .attr("x", padding)
				    	.style("font-size", "10px")
				    	.attr('class', 'username')
				    	.attr("opacity", 0);
			       	svg.selectAll('g.axis').remove();

			       	svg.append("g")
			       		.attr("class", "axis")
			       		.attr("transform", "translate(0," + (h - padding) + ")")
			       		.call(xAxis);
					svg.append("g")
						.attr("class", "axis")
						.attr("transform", "translate(" + padding + ", 0)")
						.call(yAxis);

					
					d3.select("#click").on("click", function(){
						svg.selectAll('circle')
							.transition()
							.delay(500)
							.duration(2000)
							.attr('cx', function(d){
								return xScale(d.likes.count);
							})
							.attr('cy', function(d){
								return yScale(d.comments.count);
							})
							.attr('r', function(d){
								return rScale(d.likes.count);
							})
							.attr('fill', 'blue');
						svg.selectAll(".username")
							.text(function(d){
								return d.user.username;
							})
							.transition()
							.attr("x", function(d){
					        	return xScale(d.likes.count);
					        })
					        .attr("y", function(d){
					        	return yScale(d.comments.count);
					        })
					        .style('font-size', '20px')
					    	.attr("opacity", 1);
							
					})	
					d3.select("#reset").on("click", function(){
						svg.selectAll('circle')
							.transition()
							.attr('cx', padding)
							.attr('cy', 0)
							.attr('r', 0);
						svg.selectAll('.username')
							.transition()
							.attr('x', padding)
							.attr('y', 0)
							.text();
							
					})
		        }
		        scope.$watch('data', function(){
		          scope.render(scope.data);
		      	}, true);
			}
		};
	}
]);
var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
           