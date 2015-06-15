var App = function () {

  var config = {//Basic Config
    tooltip: true,
    popover: true,
    nanoScroller: true,
    nestableLists: true,
    hiddenElements: true,
    bootstrapSwitch:true,
    dateTime:true,
    select2:true,
    tags:true,
    slider:true
  };

  var voice_methods = [];

  /*DASHBOARD*/
  var dashboard = function(){
    var skycons = new Skycons({"color": "#FFFFFF"});
    skycons.add($("#sun-icon")[0], Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();


    /*Sparklines*/
    $(".spk1").sparkline([2,4,3,6,7,5,8,9,4,2,6,8,8,9,10], { type: 'bar', width: '80px', barColor: '#4A8CF7'});
    $(".spk2").sparkline([4,6,7,7,4,3,2,1,4,4 ,5,6,5], { type: 'discrete', width: '80', lineColor: '#4A8CF7',thresholdValue: 4,thresholdColor: '#ff0000'});

    $(".spk3").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
    type: 'line',
    lineColor: '#258FEC',
    fillColor: '#4A8CF7',
    spotColor: false,
    width: '80px',
    minSpotColor: false,
    maxSpotColor: false,
    highlightSpotColor: '#1e7ac6',
    highlightLineColor: '#1e7ac6'});

    /*Dashboard Charts*/
    if (!jQuery.plot) {
      return;
    }
    var data = [];
    var totalPoints = 250;
    // random data generator for plot charts

    function getRandomData() {
      if (data.length > 0) data = data.slice(1);
      // do a random walk
      while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50;
      var y = prev + Math.random() * 10 - 5;
      if (y < 0) y = 0;
      if (y > 100) y = 100;
      data.push(y);
      }
      // zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
      return res;
    }

    function showTooltip(x, y, contents) {
      $("<div id='tooltip'>" + contents + "</div>").css({
        position: "absolute",
        display: "none",
        top: y + 5,
        left: x + 5,
        border: "1px solid #000",
        padding: "5px",
        'color':'#fff',
        'border-radius':'2px',
        'font-size':'11px',
        "background-color": "#000",
        opacity: 0.80
      }).appendTo("body").fadeIn(200);
    }

    function randValue() {
      return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
    }

    var pageviews = [
    [1, randValue()],
    [2, randValue()],
    [3, 2 + randValue()],
    [4, 3 + randValue()],
    [5, 5 + randValue()],
    [6, 10 + randValue()],
    [7, 15 + randValue()],
    [8, 20 + randValue()],
    [9, 25 + randValue()],
    [10, 30 + randValue()],
    [11, 35 + randValue()],
    [12, 25 + randValue()],
    [13, 15 + randValue()],
    [14, 20 + randValue()],
    [15, 45 + randValue()],
    [16, 50 + randValue()],
    [17, 65 + randValue()],
    [18, 70 + randValue()],
    [19, 85 + randValue()],
    [20, 80 + randValue()],
    [21, 75 + randValue()],
    [22, 80 + randValue()],
    [23, 75 + randValue()]
    ];
    var visitors = [
    [1, randValue() - 5],
    [2, randValue() - 5],
    [3, randValue() - 5],
    [4, 6 + randValue()],
    [5, 5 + randValue()],
    [6, 20 + randValue()],
    [7, 25 + randValue()],
    [8, 36 + randValue()],
    [9, 26 + randValue()],
    [10, 38 + randValue()],
    [11, 39 + randValue()],
    [12, 50 + randValue()],
    [13, 51 + randValue()],
    [14, 12 + randValue()],
    [15, 13 + randValue()],
    [16, 14 + randValue()],
    [17, 15 + randValue()],
    [18, 15 + randValue()],
    [19, 16 + randValue()],
    [20, 17 + randValue()],
    [21, 18 + randValue()],
    [22, 19 + randValue()],
    [23, 20 + randValue()],
    [24, 21 + randValue()],
    [25, 14 + randValue()],
    [26, 24 + randValue()],
    [27, 25 + randValue()],
    [28, 26 + randValue()],
    [29, 27 + randValue()],
    [30, 31 + randValue()]
    ];

    if ($('#site_statistics').size() != 0) {
      $('#site_statistics_loading').hide();
      $('#site_statistics_content').show();
      var plot_statistics = $.plot($("#site_statistics"), [{
        data: pageviews,
        label: "Sales"
      }
      ], {
        series: {
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.2
              }, {
                opacity: 0.01
              }
              ]
            }
          },
          points: {
            show: true
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
        labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(255,255,255,0.22)",
          borderWidth: 0
        },
        colors: ["#FFFFFF", "#4A8CF7", "#52e136"],
        xaxis: {
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          ticks: 5,
          tickDecimals: 0
        }
      });

      var plot_statistics2 = $.plot($("#site_statistics2"), [{
        data: pageviews,
        label: "Unique Visits"
      }, {
        data: visitors,
        label: "Page Views"
      }
      ], {
        series: {
          bars: {
            show: true,
            barWidth: 0.7,
            lineWidth: 1,
            fill: true,
            hoverable: true,
            fillColor: {
              colors: [{
                opacity: 0.85
              }, {
                opacity: 0.85
              }
              ]
            }
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
        labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(255,255,255,0.22)",
          borderWidth: 0
        },
        colors: ["#e67653", "#FFFFFF", "#52e136"],
        xaxis: {
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          ticks: 6,
          tickDecimals: 0
        }
      });

      /*Pie Chart*/
      var data = [
      { label: "Google", data: 50},
      { label: "Dribbble", data: 7},
      { label: "Twitter", data: 8},
      { label: "Youtube", data: 9},
      { label: "Microsoft", data: 14},
      { label: "Apple", data: 13},
      { label: "Amazon", data: 10},
      { label: "Facebook", data: 5}
      ];

      $.plot('#piec', data, {
        series: {
          pie: {
            show: true,
            innerRadius: 0.27,
            shadow:{
              top: 5,
              left: 15,
              alpha:0.3
            },
            stroke:{
              width:0
            },
            label: {
                        show: true,
                        formatter: function (label, series) {
                            return '<div style="font-size:12px;text-align:center;padding:2px;color:#333;">' + label + '</div>';

                        }
                    },
            highlight:{
              opacity: 0.08
            }
          }
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#5793f3", "#dd4d79", "#bd3b47","#dd4444","#fd9c35","#fec42c","#d4df5a","#5578c2"],
        legend: {
          show: false
        }
      });

      /*COM Chart*/
      var data_com = [
        [1, randValue() - 5],
        [2, randValue() - 5],
        [3, randValue() - 5],
        [4, 6 + randValue()],
        [5, 6 + randValue()],
        [6, 6 + randValue()],
        [7, 5 + randValue()],
        [8, 3 + randValue()],
        [9, 2 + randValue()]
      ];
       var names = [
                    "Alpha",
                    "Beta",
                    "Gamma",
                    "Delta",
                    "Epsilon",
                    "Zeta",
                    "Eta",
                    "Theta"
                ];

      var plot_statistics = $.plot($("#com_stats"), [{
        data: data_com, showLabels: true, labels: data_com, labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
      }
      ], {
        series: {
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.25
              }, {
                opacity: 0.25
              }
              ]
            }
          },
          points: {
            show: true
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
          show:false,
          margin: 5,
          labelMargin: 10,
           axisMargin: 10,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(255,255,255,0.22)",
          borderWidth: 0
        },
        colors: ["#50ACFE"],
        xaxis: {
          autoscaleMargin: 0.04,
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          autoscaleMargin: 0.2,
          ticks: 5,
          tickDecimals: 0
        }
      });

      /*Bar charts widget*/
        var data3 = [
        [1, randValue()],
        [2, randValue()],
        [3, 2 + randValue()],
        [4, 3 + randValue()],
        [5, 5 + randValue()],
        [6, 10 + randValue()],
        [7, 15 + randValue()],
        [8, 20 + randValue()],
        [9, 20 + randValue()],
        [10, 20 + randValue()],
        [11, 20 + randValue()],
        [12, 20 + randValue()],
        [13, 20 + randValue()],
        [14, 20 + randValue()],
        [15, 20 + randValue()],
        [16, 75 + randValue()]
        ];

      var plot_statistics2 = $.plot($("#com2_stats"), [{
        data: data3,
        label: "Unique Visits"
      }
      ], {
        series: {
          bars: {
            show: true,
            barWidth: 0.7,
            lineWidth: 0,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.8
              }, {
                opacity: 0.8
              }
              ]
            },
            hoverable: true
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
          show: true,
          labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(0,0,0,0.1)",
          borderWidth: 0,
          margin: {
            left: -20
          }
        },
        colors: ["#FD6A5E", "#FFFFFF", "#52e136"],
        xaxis: {
          font:{
            color: "rgba(0,0,0,0.6)",
            lineHeight: '0',
            size: '5px'
          },
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          font:{
            lineHeight: '0',
            size: '5px',
            color: "rgba(255,255,255,0)"
          },
          ticks: 6,
          tickDecimals: 0
        }
      });


      var previousPoint = null;
      $("#site_statistics").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";

        if (item) {
          if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            $("#tooltip").remove();
            var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
            showTooltip(item.pageX, item.pageY,
            item.series.label + " of " + x + " = " + y);
          }
        } else {
          $("#tooltip").remove();
          previousPoint = null;
        }
      });

      $("#site_statistics2").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";

        if (item) {
          if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            $("#tooltip").remove();
            var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
            showTooltip(item.pageX, item.pageY,
            item.series.label + " of " + x + " = " + y);
          }
        } else {
          $("#tooltip").remove();
          previousPoint = null;
        }
      });
    }

    /*Jquery Easy Pie Chart*/
      $('.epie-chart').easyPieChart({
        barColor: '#FD9C35',
        trackColor: '#EFEFEF',
        lineWidth: 7,
        animate: 600,
        size: 103,
        onStep: function(val){//Update current value while animation
          $("span", this.$el).html(parseInt(val) + "%");
        }
        });

    /*Chat Comments*/
    $(".chat-in form").submit(function(e){

      var d = new Date();
      var time = d.getHours() + ":" + d.getMinutes();
      var inp = $("input[type='text']", this);
      var msg = inp.val();
      var img = 'images/avatar1_50.jpg';

      inp.val("");

      var tpl = $('<div class="chat-conv" style="display:none;">' +
              '<img title="" data-toggle="tooltip" src="'+ img +'" class="c-avatar ttip" data-original-title="">' +
              '<div class="c-bubble">' +
                '<div class="msg">'+ msg +'</div>' +
                '<div><small class="date">'+ time +'</small></div>' +
                '<span></span>' +
              '</div>' +
            '</div>');

      $(this).parents(".chat-wi").find(".chat-content").css("transition", "all 1s ease");
      $(this).parents(".chat-wi").find(".chat-content").append(tpl);

      tpl.slideDown();
      e.preventDefault();
    });
  };
  /*END OF DASHBOARD*/

  /*Nestable Lists*/
  var nestable = function(){
    $('.dd').nestable();
    //Watch for list changes and show serialized output
    function update_out(selector, sel2){
      var out = $(selector).nestable('serialize');
      $(sel2).html(window.JSON.stringify(out));
    }

    update_out('#list1',"#out1");
    update_out('#list2',"#out2");

    $('#list1').on('change', function() {
      update_out('#list1',"#out1");
    });

    $('#list2').on('change', function() {
      update_out('#list2',"#out2");
    });
  };//End of Nestable Lists


  /*Form Wizard*/
  var wizard = function(){
    //Fuel UX
    $('.wizard-ux').wizard();

    $('.wizard-ux').on('changed',function(){
      //delete $.fn.slider;
      $('.bslider').slider();
    });

    $(".wizard-next").click(function(e){
      var id = $(this).data("wizard");
      $(id).wizard('next');
      e.preventDefault();
    });

    $(".wizard-previous").click(function(e){
      var id = $(this).data("wizard");
      $(id).wizard('previous');
      e.preventDefault();
    });
  };//End of wizard

  /*Form Masks*/
  var masks = function(){
    $("[data-mask='date']").mask("99/99/9999");
    $("[data-mask='phone']").mask("(999) 999-9999");
    $("[data-mask='phone-ext']").mask("(999) 999-9999? x99999");
    $("[data-mask='phone-int']").mask("+33 999 999 999");
    $("[data-mask='taxid']").mask("99-9999999");
    $("[data-mask='ssn']").mask("999-99-9999");
    $("[data-mask='product-key']").mask("a*-999-a999");
    $("[data-mask='percent']").mask("99%");
    $("[data-mask='currency']").mask("$999,999,999.99");
  };//End of masks

  /*Text Editors*/
  var textEditor = function(){
  	//Ckeditor
    $('textarea.ckeditor').ckeditor();
    CKEDITOR.disableAutoInline = true;
    $(".inline-editable").each(function(){
      CKEDITOR.inline($(this)[0]);
    });
  };//End of textEditor

  /*Data Tables*/
  var dataTables = function(){
  	//Basic Instance
    $("#datatable").dataTable();

    //Search input style
    $('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
    $('.dataTables_length select').addClass('form-control');
  };//End of dataTables

  /*Maps*/
  var maps = function(){
    //Basic Map
    var map;

    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(-33.877827, 151.188598),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_one'), mapOptions);

  //Hybrid Map
    var map2;

    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(-33.877827, 151.188598),
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map2 = new google.maps.Map(document.getElementById('map_two'), mapOptions);


   //Terrain Map
    var map3;

    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(-33.877827, 151.188598),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map3 = new google.maps.Map(document.getElementById('map_three'), mapOptions);

  };//End of maps


  /*Charts*/
  var charts = function(){
    if (!jQuery.plot) {
      return;
    }
    var data = [];
    var totalPoints = 250;
    // random data generator for plot charts

    function getRandomData() {
      if (data.length > 0) data = data.slice(1);
      // do a random walk
      while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50;
      var y = prev + Math.random() * 10 - 5;
      if (y < 0) y = 0;
      if (y > 100) y = 100;
      data.push(y);
      }
      // zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
      return res;
    }

    function showTooltip(x, y, contents) {
      $("<div id='tooltip'>" + contents + "</div>").css({
        position: "absolute",
        display: "none",
        top: y + 5,
        left: x + 5,
        border: "1px solid #000",
        padding: "5px",
        'color':'#fff',
        'border-radius':'2px',
        'font-size':'11px',
        "background-color": "#000",
        opacity: 0.80
      }).appendTo("body").fadeIn(200);
    }

    function randValue() {
      return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
    }

    var pageviews = [
    [1, randValue()],
    [2, randValue()],
    [3, 2 + randValue()],
    [4, 3 + randValue()],
    [5, 5 + randValue()],
    [6, 10 + randValue()],
    [7, 15 + randValue()],
    [8, 20 + randValue()],
    [9, 25 + randValue()],
    [10, 30 + randValue()],
    [11, 35 + randValue()],
    [12, 25 + randValue()],
    [13, 15 + randValue()],
    [14, 20 + randValue()],
    [15, 45 + randValue()],
    [16, 50 + randValue()],
    [17, 65 + randValue()],
    [18, 70 + randValue()],
    [19, 85 + randValue()],
    [20, 80 + randValue()],
    [21, 75 + randValue()],
    [22, 80 + randValue()],
    [23, 75 + randValue()]
    ];
    var visitors = [
    [1, randValue() - 5],
    [2, randValue() - 5],
    [3, randValue() - 5],
    [4, 6 + randValue()],
    [5, 5 + randValue()],
    [6, 20 + randValue()],
    [7, 25 + randValue()],
    [8, 36 + randValue()],
    [9, 26 + randValue()],
    [10, 38 + randValue()],
    [11, 39 + randValue()],
    [12, 50 + randValue()],
    [13, 51 + randValue()],
    [14, 12 + randValue()],
    [15, 13 + randValue()],
    [16, 14 + randValue()],
    [17, 15 + randValue()],
    [18, 15 + randValue()],
    [19, 16 + randValue()],
    [20, 17 + randValue()],
    [21, 18 + randValue()],
    [22, 19 + randValue()],
    [23, 20 + randValue()],
    [24, 21 + randValue()],
    [25, 14 + randValue()],
    [26, 24 + randValue()],
    [27, 25 + randValue()],
    [28, 26 + randValue()],
    [29, 27 + randValue()],
    [30, 31 + randValue()]
    ];

    if ($('#site_statistics').size() != 0) {

      $('#site_statistics_loading').hide();
      $('#site_statistics_content').show();

      var plot_statistics = $.plot($("#site_statistics"), [{
        data: pageviews,
        label: "Sales"
      }
      ], {
        series: {
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.25
              }, {
                opacity: 0.25
              }
              ]
            }
          },
          points: {
            show: true
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
        labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(0,0,0,0.15)",
          borderWidth: 0
        },
        colors: ["#50ACFE", "#4A8CF7", "#52e136"],
        xaxis: {
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          ticks: 5,
          tickDecimals: 0
        }
      });

      var plot_statistics2 = $.plot($("#site_statistics2"), [{
        data: pageviews,
        label: "Unique Visits"
      }
      ], {
        series: {
          bars: {
            show: true,
            barWidth: 0.6,
            lineWidth: 0,
            fill: true,
            hoverable: true,
            fillColor: {
              colors: [{
                opacity: 1
              }, {
                opacity: 1
              }
              ]
            }
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
        labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(0,0,0,0.15)",
          borderWidth: 0
        },
        colors: ["#FD6A5E", "#FFFFFF", "#52e136"],
        xaxis: {
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          ticks: 6,
          tickDecimals: 0
        }
      });

      /*Pie Chart*/
      var data = [
      { label: "Google", data: 50},
      { label: "Dribbble", data: 7},
      { label: "Twitter", data: 8},
      { label: "Youtube", data: 9},
      { label: "Microsoft", data: 14},
      { label: "Apple", data: 13},
      { label: "Amazon", data: 10},
      { label: "Facebook", data: 5}
      ];

      $.plot('#piec', data, {
        series: {
          pie: {
            show: true,
            innerRadius: 0.27,
            shadow:{
              top: 5,
              left: 15,
              alpha:0.3
            },
            stroke:{
              width:0
            },
            label: {
                        show: true,
                        formatter: function (label, series) {
                            return '<div style="font-size:12px;text-align:center;padding:2px;color:#333;">' + label + '</div>';

                        }
                    },
            highlight:{
              opacity: 0.08
            }
          }
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#5793f3", "#dd4d79", "#bd3b47","#dd4444","#fd9c35","#fec42c","#d4df5a","#5578c2"],
        legend: {
          show: false
        }
      });

      /*COM Chart*/
      var data_com2 = [
        [1, randValue()],
        [2, randValue()],
        [3, 2 + randValue()],
        [4, 3 + randValue()],
        [5, 5 + randValue()],
        [6, 10 + randValue()],
        [7, 15 + randValue()],
        [8, 20 + randValue()],
        [9, 25 + randValue()],
        [10, 30 + randValue()],
        [11, 35 + randValue()],
        [12, 25 + randValue()],
        [13, 15 + randValue()],
        [14, 20 + randValue()],
        [15, 45 + randValue()],
        [16, 50 + randValue()],
        [17, 65 + randValue()],
        [18, 70 + randValue()],
        [19, 85 + randValue()],
        [20, 80 + randValue()],
        [21, 75 + randValue()],
        [22, 80 + randValue()],
        [23, 75 + randValue()]
      ];
      var data_com = [
        [1, randValue()],
        [2, randValue()],
        [3, 10 + randValue()],
        [4, 15 + randValue()],
        [5, 20 + randValue()],
        [6, 25 + randValue()],
        [7, 30 + randValue()],
        [8, 35 + randValue()],
        [9, 40 + randValue()],
        [10, 45 + randValue()],
        [11, 50 + randValue()],
        [12, 55 + randValue()],
        [13, 60 + randValue()],
        [14, 70 + randValue()],
        [15, 75 + randValue()],
        [16, 80 + randValue()],
        [17, 85 + randValue()],
        [18, 90 + randValue()],
        [19, 95 + randValue()],
        [20, 100 + randValue()],
        [21, 110 + randValue()],
        [22, 120 + randValue()],
        [23, 130 + randValue()]
      ];
       var names = [
                    "Alpha",
                    "Beta",
                    "Gamma",
                    "Delta",
                    "Epsilon",
                    "Zeta",
                    "Eta",
                    "Theta"
                ];

      var plot_statistics = $.plot($("#chart3"), [{
        data: data_com, showLabels: true, label: "New Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
      },{
        data: data_com2, showLabels: true, label: "Old Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
      }
      ], {
        series: {
          lines: {
            show: true,
            lineWidth: 1,
            fill: true,
             fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.5}] }
          },
          fillColor: "rgba(0, 0, 0, 1)",
          points: {
            show: false,
            fill: true
          },
          shadowSize: 2
        },
        legend:{
          show: true,
           position:"nw",
           backgroundColor: "green",
           container: $("#chart3-legend")
        },
        grid: {
          show:false,
          margin: 0,
          labelMargin: 0,
           axisMargin: 0,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(255,255,255,1)",
          borderWidth: 0
        },
        colors: ["#E3E6E8","#1fb594"],
        xaxis: {
          autoscaleMargin: 0,
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          autoscaleMargin: 0.2,
          ticks: 5,
          tickDecimals: 0
        }
      });

      /*LIVE DATA CHART*/

      var data = [],totalPoints = 200;

      function getRandomData() {
        if (data.length > 0)
        data = data.slice(1);
        // Do a random walk
        while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;
        if (y < 0) {
        y = 0;
        } else if (y > 100) {
        y = 100;
        }
        data.push(y);
        }
        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
        }
        return res;
      }

      function update() {
        chart4.setData([getRandomData()]);
        // Since the axes don't change, we don't need to call plot.setupGrid()
        chart4.draw();
        setTimeout(update, 500);
      }

      var chart4 = $.plot($("#chart4"), [{
        data:  getRandomData() ,
        label: "Sales"
      }
      ], {
        series: {
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.25
              }, {
                opacity: 0.25
              }
              ]
            }
          },
          points: {
            show: false
          },
          shadowSize: 2
        },
        legend:{
          show: false
        },
        grid: {
        labelMargin: 10,
           axisMargin: 500,
          hoverable: true,
          clickable: true,
          tickColor: "rgba(0,0,0,0.15)",
          borderWidth: 0
        },
        colors: ["#B450B2", "#4A8CF7", "#52e136"],
        xaxis: {
          ticks: 11,
          tickDecimals: 0
        },
        yaxis: {
          ticks: 5,
          tickDecimals: 0
        }
      });

      update();

      /*Tooltips*/

      var previousPoint = null;
      $("#site_statistics").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";

        if (item) {
          if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            $("#tooltip").remove();
            var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
            showTooltip(item.pageX, item.pageY,
            item.series.label + " of " + x + " = " + y);
          }
        } else {
          $("#tooltip").remove();
          previousPoint = null;
        }
      });

      $("#site_statistics2").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";

        if (item) {
          if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            $("#tooltip").remove();
            var x = item.datapoint[0],
            y = item.datapoint[1];
            showTooltip(item.pageX, item.pageY,
            item.series.label + "" + x + " = " + y + "%");
          }
        } else {
          $("#tooltip").remove();
          previousPoint = null;
        }
      });

      $("#chart3").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";

        if (item) {
          if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            $("#tooltip").remove();
            var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
            showTooltip(item.pageX, item.pageY,
            item.series.label + " of " + x + " = " + y);
          }
        } else {
          $("#tooltip").remove();
          previousPoint = null;
        }
      });
    }

    /*Jquery Easy Pie Chart*/
      $('.epie-chart').easyPieChart({
        lineWidth: 8,
        animate: 600,
        size: 150,
        onStep: function(val){//Update current value while animation
          $("span", this.$el).html(parseInt(val) + "%");
        }
        });

  };//End of charts

  /*Widgets*/
  var widgets = function(){
    var skycons = new Skycons({"color": "#FFFFFF"});
    skycons.add($("#sun-icon")[0], Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();

  };//End of widgets


  /*Speech Recognition*/
  var speech_commands = [];
  if(('webkitSpeechRecognition' in window)){
    var rec = new webkitSpeechRecognition();
  }

  var speech = function(options){

    if(('webkitSpeechRecognition' in window)){

      if(options=="start"){
        rec.start();
      }else if(options=="stop"){
        rec.stop();
      }else{
        var config = {
          continuous: true,
          interim: true,
          lang: false,
          onEnd: false,
          onResult: false,
          onNoMatch: false,
          onSpeechStart: false,
          onSpeechEnd: false
        };
        $.extend( config, options );

        if(config.continuous){rec.continuous = true;}
        if(config.interim){rec.interimResults = true;}
        if(config.lang){rec.lang = config.lang;}
        var values = false;
        var val_command = "";

        rec.onresult = function(event){
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              var command = event.results[i][0].transcript;//Return the voice command
              command = command.toLowerCase();//Lowercase
              command = command.replace(/^\s+|\s+$/g,'');//Trim spaces
              console.log(command);
              if(config.onResult){
                config.onResult(command);
              }

              $.each(speech_commands,function(i, v){
                if(values){//Second command
                  if(val_command == v.command){
                    if(v.dictation){
                      if(command == v.dictationEndCommand){
                        values = false;
                        v.dictationEnd(command);
                      }else{
                        v.listen(command);
                      }
                    }else{
                      values = false;
                      v.listen(command);
                    }
                  }
                }else{//Primary command
                  if(v.command == command){
                    v.action(command);
                    if(v.listen){
                      values = true;
                      val_command = v.command;
                    }
                  }
                }
              });
            }else{
              var res = event.results[i][0].transcript;//Return the interim results
              $.each(speech_commands,function(i, v){
                if(v.interim !== false){
                  if(values){
                    if(val_command == v.command){
                      v.interim(res);
                    }
                  }
                }
              });
            }
          }
        };


        if(config.onNoMatch){rec.onnomatch = function(){config.onNoMatch();};}
        if(config.onSpeechStart){rec.onspeechstart = function(){config.onSpeechStart();};}
        if(config.onSpeechEnd){rec.onspeechend = function(){config.onSpeechEnd();};}
        rec.onaudiostart = function(){ $(".speech-button i").addClass("blur"); }
        rec.onend = function(){
          $(".speech-button i").removeClass("blur");
          if(config.onEnd){config.onEnd();}
        };
      }

    }else{
      alert("Only Chrome25+ browser support voice recognition.");
    }


  };

  var speechCommand = function(command, options){
    var config = {
      action: false,
      dictation: false,
      interim: false,
      dictationEnd: false,
      dictationEndCommand: 'final.',
      listen: false
    };

    $.extend( config, options );
    if(command){
      if(config.action){
        speech_commands.push({
          command: command,
          dictation: config.dictation,
          dictationEnd: config.dictationEnd,
          dictationEndCommand: config.dictationEndCommand,
          interim: config.interim,
          action: config.action,
          listen: config.listen
        });
      }else{
        alert("Must have an action function");
      }
    }else{
      alert("Must have a command text");
    }
  };

      function toggleSideBar(_this){
        var b = $("#sidebar-collapse")[0];
        var w = $("#cl-wrapper");
        var s = $(".cl-sidebar");

        if(w.hasClass("sb-collapsed")){

          $(".fa",b).addClass("fa-angle-left").removeClass("fa-angle-right");
          w.removeClass("sb-collapsed");

        }else{

          $(".fa",b).removeClass("fa-angle-left").addClass("fa-angle-right");
          w.addClass("sb-collapsed");

        }
      }

      function updateHeight(){
        if(!$("#cl-wrapper").hasClass("fixed-menu")){
          var button = $("#cl-wrapper .collapse-button").outerHeight();
          var navH = $("#head-nav").height();
          var cont = $("#pcont").height();
          var sidebar = ($(window).width() > 755 && $(window).width() < 963)?0:$("#cl-wrapper .menu-space .content").height();
          var windowH = $(window).height();

          if(sidebar < windowH && cont < windowH){
            if(($(window).width() > 755 && $(window).width() < 963)){
              var height = windowH;
            }else{
              var height = windowH - button - navH;
            }
          }else if((sidebar < cont && sidebar > windowH) || (sidebar < windowH && sidebar < cont)){
            var height = cont + button + navH;
          }else if(sidebar > windowH && sidebar > cont){
            var height = sidebar + button;
          }

          $("#cl-wrapper .menu-space").css("min-height",height);

        }else{

          $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });

        }
      }

  return {

    init: function (options) {
      //Extends basic config with options
      $.extend( config, options );

      /*VERTICAL MENU*/
      $(".cl-vnavigation li ul").each(function(){
        $(this).parent().addClass("parent");
      });

      $(".cl-vnavigation li ul li.active").each(function(){
        $(this).parent().show().parent().addClass("open");
      });

      $(".cl-vnavigation").delegate(".parent > a","click",function(e){

        $(".cl-vnavigation .parent.open > ul").not($(this).parent().find("ul")).slideUp(300, 'swing',function(){
           $(this).parent().removeClass("open");
        });

        var ul = $(this).parent().find("ul");
        ul.slideToggle(300, 'swing', function () {
          var p = $(this).parent();

          if(p.hasClass("open")){
            p.removeClass("open");
          }else{
            p.addClass("open");
          }

         $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });

        });

        e.preventDefault();
      });

      /*Small devices toggle*/
      $(".cl-toggle").click(function(e){
        var ul = $(".cl-vnavigation");
          ul.slideToggle(300, 'swing', function () {
        });

        e.preventDefault();
      });

      /*Collapse sidebar*/
      $("#sidebar-collapse").click(function(){
          toggleSideBar();
          // update_width();
      });


      if($("#cl-wrapper").hasClass("fixed-menu")){
        var scroll;
        if($("#cl-wrapper").hasClass("aside")){
            scroll = $("#cl-wrapper #aside-items");
          } else {
            scroll = $("#cl-wrapper .menu-space");
          }
        scroll.addClass("nano nscroller");

        function update_height(){
          var navH = $("#head-nav").height();
          var asideH;
          var asideScrollH;
          var button;
          var collapseH;
          var height;

          if($("#cl-wrapper").hasClass("aside")){
            asideH = $("#aside-header").outerHeight();
            asideScrollH = $(".aside-scroll-header").height();
            height = $(window).height() - navH - asideH - asideScrollH;
          } else {
            button = $("#cl-wrapper .collapse-button");
            collapseH = button.outerHeight();
            height = $(window).height() - ((button.is(":visible"))?collapseH:0) - navH;
          }
          scroll.css("height",height);
          $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });
        }

        function update_width(){
          var navW = $(".cl-sidebar").width();
          var asideW = $("#page-aside").width();

          $("#fixed-action-header").css("left", navW + asideW);
          $("#fixed-action-header2").css("left", navW + asideW);
        }

        $(window).resize(function() {
          update_height();
          // update_width();
        });

        update_height();
        // update_width();
        $("#cl-wrapper .nscroller").nanoScroller({ preventPageScrolling: true });

      }

      /*SubMenu hover */
        var tool = $("<div id='sub-menu-nav' style='position:fixed;z-index:9999;'></div>");

        function showMenu(_this, e){
          if(($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul",_this).length > 0){
            $(_this).removeClass("ocult");
            var menu = $("ul",_this);
            if(!$(".dropdown-header",_this).length){
              var head = '<li class="dropdown-header">' +  $(_this).children().html()  + "</li>" ;
              menu.prepend(head);
            }

            tool.appendTo("body");
            var top = ($(_this).offset().top + 8) - $(window).scrollTop();
            var left = $(_this).width();

            tool.css({
              'top': top,
              'left': left + 8
            });
            tool.html('<ul class="sub-menu">' + menu.html() + '</ul>');
            tool.show();

            menu.css('top', top);
          }else{
            tool.hide();
          }
        }

        $(".cl-vnavigation li").hover(function(e){
          showMenu(this, e);
        },function(e){

          tool.removeClass("over");
          setTimeout(function(){
            if(!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0){
              tool.hide();
            }
          },500);
        });

        tool.hover(function(e){
          $(this).addClass("over");
        },function(){
          $(this).removeClass("over");
          setTimeout(function(){
            if(!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0){
              tool.fadeOut("fast");
            }
          },500);
        });


        $(document).click(function(){
          tool.hide();
        });
        $(document).on('touchstart click', function(e){
          tool.fadeOut("fast");
        });

        tool.click(function(e){
          e.stopPropagation();
        });

        $(".cl-vnavigation li").click(function(e){
          if((($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul",this).length > 0) && !($(window).width() < 755)){
            showMenu(this, e);
            e.stopPropagation();
          }
        });

      /*Return to top*/
      var offset = 220;
      var duration = 500;
      var button = $('<a href="#" class="back-to-top"><i class="fa fa-angle-up"></i></a>');
      button.appendTo("body");

      jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
      });

      jQuery('.back-to-top').click(function(event) {
          event.preventDefault();
          jQuery('html, body').animate({scrollTop: 0}, duration);
          return false;
      });

      /*Tooltips*/
      if(config.tooltip){
        $('.ttip, [data-toggle="tooltip"]').tooltip();
      }

      /*Popover*/
      if(config.popover){
        $('[data-popover="popover"]').popover();
      }

      /*NanoScroller*/
      if(config.nanoScroller){
        $(".nscroller").nanoScroller();
      }

      /*Input & Radio Buttons*/
      if(jQuery().iCheck){
        $('.icheck').iCheck({
          checkboxClass: 'icheckbox_square-blue checkbox',
          radioClass: 'iradio_square-blue'
        });
      }

      /*Bind plugins on hidden elements*/
      if(config.hiddenElements){
      	/*Dropdown shown event*/
        $('.dropdown').on('shown.bs.dropdown', function () {
          $(".nscroller").nanoScroller();
        });

        /*Tabs refresh hidden elements*/
        $('.nav-tabs').on('shown.bs.tab', function (e) {
          $(".nscroller").nanoScroller();
        });
      }

    },

    /*Pages Javascript Methods*/
    dashBoard: function (){
      dashboard();
    },

    speech: function(options){
      speech(options);
    },

    speechCommand: function(com, options){
      speechCommand(com, options);
    },

    toggleSideBar: function(){
      toggleSideBar();
    },

    nestableLists: function(){
      nestable();
    },

    wizard: function(){
      wizard();
    },

    masks: function(){
      masks();
    },

    textEditor: function(){
      textEditor();
    },

    dataTables: function(){
      dataTables();
    },

    maps: function(){
      maps();
    },

    charts: function(){
      charts();
    },

    widgets: function(){
      widgets();
    }

  };

}();

$(function(){
  $("body").css({opacity:1,'margin-left':0});
});
