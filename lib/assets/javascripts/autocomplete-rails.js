/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
(function(a){var b=null,c={};a.fn.railsAutocomplete=function(){var b=function(){this.railsAutoCompleter||(this.railsAutoCompleter=new a.railsAutocomplete(this))};return c[this.selector.replace("#","")]=arguments[0],a.fn.on!==undefined?$(document).on("focus",this.selector,b):this.live("focus",b)},a.railsAutocomplete=function(a){_e=a,this.init(_e)},a.railsAutocomplete.fn=a.railsAutocomplete.prototype={railsAutocomplete:"0.0.2"},a.railsAutocomplete.fn.extend=a.railsAutocomplete.extend=a.extend,a.railsAutocomplete.fn.extend({init:function(b){function d(a){return a.split(b.delimiter)}function e(a){return d(a).pop().replace(/^\s+/,"")}b.delimiter=a(b).attr("data-delimiter")||null,a(b).autocomplete($.extend({source:function(c,d){a.getJSON(a(b).attr("data-autocomplete"),{term:e(c.term)},function(){if(arguments[0].length==0){var c="No existing matches";a(b).attr("data-autocomplete-label")!==undefined&&(c=a(b).attr("data-autocomplete-label")),arguments[0]=[],arguments[0][0]={id:"",label:c}}a(arguments[0]).each(function(c,d){var e={};e[d.id]=d,a(b).data(e)}),d.apply(null,arguments)})},change:function(b,c){if(a(a(this).attr("data-id-element")).val()=="")return;a(a(this).attr("data-id-element")).val(c.item?c.item.id:"");var d=!1;a(this).attr("data-update-elements")&&(d=a.parseJSON(a(this).attr("data-update-elements")));var e=c.item?a(this).data(c.item.id.toString()):{};if(d&&a(d["id"]).val()=="")return;for(var f in d)a(d[f]).val(c.item?e[f]:"")},search:function(){var a=e(this.value);if(a.length<2)return!1},focus:function(){return!1},select:function(c,e){var f=d(this.value);f.pop(),e.item.id!=""&&f.push(e.item.value);if(b.delimiter!=null)f.push(""),this.value=f.join(b.delimiter);else{this.value=f.join(""),a(this).attr("data-id-element")&&a(a(this).attr("data-id-element")).val(e.item.id);if(a(this).attr("data-update-elements")){var g=a(this).data(e.item.id.toString()),h=a.parseJSON(a(this).attr("data-update-elements"));for(var i in h)a(h[i]).val(g[i])}}var j=this.value;return a(this).bind("keyup.clearId",function(){a(this).val().trim()!=j.trim()&&(a(a(this).attr("data-id-element")).val(""),a(this).unbind("keyup.clearId"))}),a(b).trigger("railsAutocomplete.select",e),!1}},c[b.id]))}}),a(document).ready(function(){a("input[data-autocomplete]").railsAutocomplete()})})(jQuery)