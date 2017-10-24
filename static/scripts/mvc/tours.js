"use strict";define(["libs/bootstrap-tour"],function(t){var e="undefined"==typeof Galaxy?"/":Galaxy.root,o={storage:window.sessionStorage,onEnd:function(){sessionStorage.removeItem("activeGalaxyTour")},delay:150,orphan:!0},n=function(t){return _.each(t.steps,function(t){t.preclick&&(t.onShow=function(){_.each(t.preclick,function(t){$(t).click()})}),t.postclick&&(t.onHide=function(){_.each(t.postclick,function(t){$(t).click()})}),t.textinsert&&(t.onShown=function(){$(t.element).val(t.textinsert).trigger("change")})}),t},a=Backbone.Model.extend({urlRoot:e+"api/tours"}),r=Backbone.Collection.extend({url:e+"api/tours",model:a}),s=function(t){var a=e+"api/tours/"+t;$.getJSON(a,function(t){var e=n(t);sessionStorage.setItem("activeGalaxyTour",JSON.stringify(t));var a=new Tour(_.extend({steps:e.steps},o));a.init(),a.goTo(0),a.restart()})};return{ToursView:Backbone.View.extend({title:"Tours",initialize:function(){var t=this;this.setElement("<div/>"),this.model=new r,this.model.fetch({success:function(){t.render()},error:function(){console.error("Failed to fetch tours.")}})},render:function(){var t=_.template('<h2>Galaxy Tours</h2>\n<p>This page presents a list of interactive tours available on this Galaxy server.\nSelect any tour to get started (and remember, you can click \'End Tour\' at any time).</p>\n\n<div class="col-12 btn-group" role="group" aria-label="Tag selector">\n    <% _.each(tourtagorder, function(tag) { %>\n    <button class="btn btn-primary tag-selector-button" tag-selector-button="<%- tag %>">\n        <%- tag %>\n    </button>\n    <% }); %>\n</div>\n\n<% _.each(tourtagorder, function(tourtagkey) { %>\n<div tag="<%- tourtagkey %>" style="display: block;">\n    <% var tourtag = tourtags[tourtagkey]; %>\n    <h4>\n        <%- tourtag.name %>\n    </h4>\n    <ul class="list-group">\n    <% _.each(tourtag.tours, function(tour) { %>\n        <li class="list-group-item">\n            <a href="/tours/<%- tour.id %>" class="tourItem" data-tour.id=<%- tour.id %>>\n                <%- tour.name || tour.id %>\n            </a>\n             - <%- tour.attributes.description || "No description given." %>\n             <% _.each(tour.attributes.tags, function(tag) { %>\n                <span class="label label-primary">\n                    <%- tag.charAt(0).toUpperCase() + tag.slice(1) %>\n                </span>\n             <% }); %>\n        </li>\n    <% }); %>\n    </ul>\n</div>\n<% }); %>'),e={};_.each(this.model.models,function(t){null===t.attributes.tags?(void 0===e.Untagged&&(e.Untagged={name:"Untagged",tours:[]}),e.Untagged.tours.push(t)):_.each(t.attributes.tags,function(o){o=o.charAt(0).toUpperCase()+o.slice(1),void 0===e[o]&&(e[o]={name:o,tours:[]}),e[o].tours.push(t)})});var o=Object.keys(e).sort();this.$el.html(t({tours:this.model.models,tourtags:e,tourtagorder:o})).on("click",".tourItem",function(t){t.preventDefault(),s($(this).data("tour.id"))}).on("click",".tag-selector-button",function(t){var e=$(t.target),o="block",n=e.attr("tag-selector-button");e.toggleClass("btn-primary"),e.toggleClass("btn-secondary"),e.hasClass("btn-secondary")&&(o="none"),$("div[tag='"+n+"']").css({display:o})})}}),hooked_tour_from_data:n,tour_opts:o,giveTour:s}});
//# sourceMappingURL=../../maps/mvc/tours.js.map
