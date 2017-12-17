var WeekCalendarView=function(e,t){function a(e){p=[Math.round(.2*e),Math.round(.4*e),Math.round(.6*e),Math.round(.8*e)],v.empty();(t=$("<div id='colorLegendValueMin'>")).html("<"+p[0]),v.append(t);var t;(t=$("<div id='colorLegendValueMax'>")).html(p[3]+"<"),v.append(t)}var n=new CalHeatMap,r=$("<div id='weekCalContainer'>"),o=$("<h2>");o.html("Week / Hour View"),e.append(o);var d=$("<button class='nextButton glyphicon glyphicon-chevron-right'>"),l=$("<button class='previousButton glyphicon glyphicon-chevron-left'>");e.append(d,l);var h=$("<ul id='dayLegend_y'>"),u=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];for(i=0;i<u.length;i++){var g=$("<li>");g.html(u[i]),h.append(g)}var s=$("<ul id='dayLegend_x'>");for(i=0;i<24;i++){var c=$("<li>");c.html(i+":00"),s.append(c)}var p=new Array,v=$("<div id='colorLegendValuesContainer'>");strDate=new Date(Date.now()),this.nextButton=d,this.previousButton=l,this.cal=n,t.addObserver(this),this.update=function(i){if("dataReady"==i)e.append(h,s),e.append(v),e.append(r),function(e){var r=t.getHourlyMax();n.init({data:e,itemSelector:"#weekCalContainer",domain:"week",subDomain:"x_hour",cellSize:27,cellPadding:2,tooltip:!0,itemName:"site",domainGutter:0,rowLimit:24,legendCellSize:10,range:1,start:strDate,displayLegend:!0,legendVerticalPosition:"top",legendHorizontalPosition:"left",legendCellSize:27,legendMargin:[-7,0,12,551],legend:[Math.round(.2*r),Math.round(.4*r),Math.round(.6*r),Math.round(.8*r)],onClick:function(e,a,n){$("#weekcal svg.graph rect").css("stroke","none"),$("#weekcal svg.graph rect").attr("height",27).attr("width",27),$("#cal svg.graph rect").attr("height",30).attr("width",30),$("#daycal svg.graph rect").attr("height",10).attr("width",10),$(n).css("stroke","rgba(0,255,0,1)"),$(n).attr("height",26).attr("width",26);var r=t.hours.filter(function(t){if(t[0].getMonth()==e.getMonth()&&t[0].getDate()==e.getDate()&&t[0].getHours()==e.getHours())return t});r.length>0&&t.setSelectedItem(r[0])}}),a(r)}(t.toJSON(t.hours));else if("weekCalendar"==t.getCurrentView()){var o=t.toJSON(t.getHoursSearch());n.update(o),n.options.data=o;var d=t.getHoursSearchMax();n.setLegend([Math.round(.2*d),Math.round(.4*d),Math.round(.6*d),Math.round(.8*d)]),a(d)}}};