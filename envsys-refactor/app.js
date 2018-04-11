
function populateBasemapMenu(menuId, layers) {
  var divLayersMenu = $('#' + menuId);
  var i = 0;
  $.each(layers, function(name, object) {
    var inputId = "basemap-" + i;
    // if the first item in the list, create the 'Basemap' heading label first
    if (i === 0) {
      divLayersMenu.append("<label class='ml-2'>Basemap</label>", "<br/>", "<div id='basemap-toggle' class='btn-group btn-group-toggle ml-4 mr-4' data-toggle='buttons'>");
      //add the input for current item
      $('#basemap-toggle').append("<label class='btn btn-secondary active'><input type='radio' name='basemap-options' id='basemap-" + i + "' autocomplete='off' checked>" + name + "</label>");
      //add this first layer to the baseLayerGroup
      baseLayerGroup.addLayer(object);
      baseLayerGroup.setZIndex(0);
    } else if (i > 0) {
      $('#basemap-toggle').append("<label class='btn btn-secondary'><input type='radio' name='basemap-options' id='" + inputId + "' autocomplete='off'>" + name + "</label>");
    }

    //add handler to radio inputs to clear baselayer group and add the selected one
    var selector = '#' + inputId;
    $(selector).change(function() {
      baseLayerGroup.clearLayers();
      baseLayerGroup.addLayer(object);
      baseLayerGroup.setZIndex(0);
    });
    i++;
  })
  divLayersMenu.append("<div class='dropdown-divider'></div>");
}

function createFeatureInfoFromQuery(query, id_numero, chartQuery, callback) {
  var harvest = 0;
  var start_seas = 0;
  $.getJSON(sqlApi + query, function(data) {
    $('#placeholderText').remove();
    $('#info_field_list').children().remove();
    let attribs = data.rows[0];
    $.each(attribs, function(key, value) {
      $('#info_field_list').append("<li class='list-group-item'><strong>" + key + ":  </strong>" + value + "</li>");
      if (key == "harvest") {
        harvest = Math.round(new Date(value).getTime() / 1000.0);
      }
      if (key == "start_seas") {
        start_seas = Math.round(new Date(value).getTime() / 1000.0);
      }
    })
    callback(chartQuery, id_numero, harvest, start_seas)
  })
}

function createChartFromQuery(query, id_numero, harvest, start_seas) {
  console.log('create chart called');
  $.getJSON(sqlApi + query, function(data) {
    var chart = new Highcharts.Chart('chartContainer', chartOptions);
    chart.addSeries({
      data: data.rows,
      name: 'ID Numero: ' + id_numero
    });
    if (harvest) {
      chart.xAxis[0].addPlotLine({
        value: harvest,
        color: 'red',
        width: 2,
        id: 'plot-line-1',
        label: {
          text: 'Harvest',
          align: 'left',
          y: 10
        }
      })
    }
    if (start_seas) {
      chart.xAxis[0].addPlotLine({
        value: start_seas,
        color: 'green',
        width: 2,
        id: 'plot-line-2',
        label: {
          text: 'Start Season',
          align: 'left',
          y: 10
        }
      })
    }
  });
}

function openPopup(featureEvent) {
  let content = '';
  content += `<div class="popup-container">`;
  if (featureEvent.data.id_numero) {
    content += `<h2>${featureEvent.data.id_numero}</h2>`;
  }
  content += `</div>`;
  popup.setContent(content);
  popup.setLatLng(featureEvent.latLng);
  if (!popup.isOpen()) {
    popup.openOn(map);
  }
}

function closePopup(featureEvent) {
  popup.removeFrom(map);
}

function setPopupsHover() {
  layer.on('featureOver', openPopup);
  layer.on('featureOut', closePopup);
}