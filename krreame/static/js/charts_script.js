var chart_status = 0;
var chart_slider_1;

$(document).ready(function(){
     chart_slider_1 = ChartSlider('#chart_container','#charts_left_arrow_container','#charts_right_arrow_container');
     var proyectos = [];
     var cantidad_alumnos = [];



     //chart_slider_1.addElement(<h2>InformaciÃ³n Universidad</h2>);
     //peticiâ€”n para la grafica de alumnos por proyecto
      $.ajax({
                 data:{csrfmiddlewaretoken:window.CSRF_TOKEN},
                 context: this,
                 url : "//"+location.host+"/perfiles/grafica_alumnos/", // the endpoint
                 type : "POST", // http method// data sent with the post request

        // handle a successful response
                success : function(response) {
                    if (response.code == "200") {
                            
                          console.log("succes")
                            
                            
                        }

                    console.log(JSON.stringify(response));
                    $.each(response, function(i,field){
                        //console.log(field.fields.nombre_proyecto);
                        proyectos[i] = String(field.nombre);
                        cantidad_alumnos[i] = Number(field.cantidad_alumnos);
                     });


                        var chart_1 = {
                                 chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Alumnos Proyectos'
                            },
                            xAxis: {
                                categories: proyectos
                            },
                            yAxis: {
                                title: {
                                    text: '# Alumnos'
                                }
                            },
                            series: [{
                                name: 'Alumnos',
                                data: cantidad_alumnos
                            }]
                        } //chart_1
                        chart_slider_1.addElement(chart_1);

                        $('#chart_container').highcharts(chart_1);

                    // console.log(response.proyectos);
                    
                },

        // handle a non-successful response
        error : function() {
                    console.log("error")
                    alert("Hubo un error al validar el alumno, Por favor intenta nuevamente")

              }
    });

    //peticiâ€”n para las grâ€¡ficas de las osc's
     $.ajax({
                 data:{csrfmiddlewaretoken:window.CSRF_TOKEN},
                 context: this,
                   url : "//"+location.host+"/perfiles/grafica_entidad/",  // the endpoint
                 type : "POST", // http method// data sent with the post request

        // handle a successful response
                success : function(response) {
                    //console.log(JSON.stringify(response));
                    var entidad = [];
                    var num_pro = [];
                    $.each(response, function(i,field){
                        //console.log(field.fields.nombre_proyecto);
                        entidad[i] = String(field.entidad);
                        num_pro[i] = Number(field.num);
                     });
                    //console.log(osc);
                    //console.log(num_pro);

                    var chart_2 = {
                                 chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Proyectos Entidad'
                            },
                            xAxis: {
                                categories: entidad
                            },
                            yAxis: {
                                title: {
                                    text: '# Proyectos'
                                }
                            },
                            series: [{
                                name: 'Proyectos',
                                data: num_pro
                            }]
                        } //chart2
                        
                        chart_slider_1.addElement(chart_2);

                },

        // handle a non-successful response
        error : function() {
                    console.log("error")
                    alert("Hubo un error al validar el alumno, Por favor intenta nuevamente")

              }
    });

        $.ajax({
                         data:{csrfmiddlewaretoken:window.CSRF_TOKEN},
                         context: this,
                           url : "//"+location.host+"/perfiles/grafica_alumnos_carrera/",  // the endpoint
                         type : "POST", // http method// data sent with the post request

                // handle a successful response
                        success : function(response) {
                            //console.log(JSON.stringify(response));
                            var carrera = [];
                            var alumnos = [];
                            $.each(response, function(i,field){
                                //console.log(field.fields.nombre_proyecto);
                                carrera[i] = String(field.carrera);
                                alumnos[i] = Number(field.num);
                            });
                            //console.log(carrera);
                            //console.log(alumnos);
                             var chart_3 = {
                                         chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'Total de Alumnos en la Universidad por carrera'
                                    },
                                    xAxis: {
                                        categories: carrera
                                    },
                                    yAxis: {
                                        title: {
                                            text: '# Alumnos'
                                        }
                                    },
                                    series: [{
                                        name: 'Alumnos',
                                        data: alumnos
                                    }]
                            } //chart3
                                
                        chart_slider_1.addElement(chart_3);

                        },

                // handle a non-successful response
                error : function() {
                            console.log("error")
                            alert("Hubo un error al validar el alumno, Por favor intenta nuevamente")

                      }
            });

             
         chart_slider_1.start();

});

/*Charts slider*/
function ChartSlider (container_id, left_arrow_id, right_arrow_id) {
    this.left_arrow = $(left_arrow_id);
    this.right_arrow = $(right_arrow_id);
    this.container = $(container_id);
    this.current_status = null;
    this.element_count = 0;
    this.chart_container = null;
    this.charts_container = [];
    this.parent = this;
    
    this.moveRight = function() {
      if(this.current_status != null)
      {
        this.current_status = this.current_status + 1;
        if(this.current_status >= this.element_count)
          this.current_status = 0;
        this.showChart(this.current_status);
      }
      else
      {
        alert("There are no charts available");
      }  
    };
    
    this.moveLeft = function() {
      if(this.current_status != null)
      {
        this.current_status = this.current_status - 1;
        if(this.current_status < 0)
          this.current_status = this.element_count - 1;
        this.showChart(this.current_status);
      }
      else
      {
        alert("There are no charts available");
      }  
    };
    
    this.addElement = function(chart_params)
    {
      this.charts_container[element_count] = chart_params;
      this.element_count =  this.element_count + 1;
    };
    
    this.showChart = function(chart_number)
    {
      if(chart_number < this.element_count)
      {
        this.chart_container = this.container.highcharts(charts_container[chart_number]);
      }
    };
    
    
    this.start = function()
    {
     
        this.showChart(0);
        this.current_status = 0;

    };
    
    /*Navigation*/
    $(this.right_arrow).click(function(){
      parent.moveRight();
    });
    
    $(this.left_arrow).click(function(){
      parent.moveLeft();
    });
    
    return this;
}


$(function() {

        $(function () {
                    $('#container').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '# de Alumnos por Carrera en las siguientes Categorias'
                        },
                        subtitle: {
                            text: 'Actualmente datos estaticos debido a que aÃºn no contamos con los datos suficientes'
                        },
                        xAxis: {
                            categories: [
                                'Salud',
                                'Social',
                                'Profesional',
                                'Individual'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Alumnos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'ITC',
                            data: [10,20,5,30]

                        }, {
                            name: 'INT',
                            data: [20,31,17,24]

                        }, {
                            name: 'LAD',
                            data: [15,24,21,16]

                        }, {
                            name: 'IIS',
                            data: [12,14,16,17]

                        }]
                    });//cierre chart
                });//cierre funcion

      
              
});

$(function () {         
       $( "#opcion" ).change(function() {
        var val = $( "#opcion" ).val();
        //alert(val);
            if(val=="Carrera"){
                $('#container').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '# de Alumnos por Carrera en las siguientes Categorias'
                        },
                        subtitle: {
                            text: 'Actualmente datos estaticos debido a que aÃºn no contamos con los datos suficientes'
                        },
                        xAxis: {
                            categories: [
                                'Salud',
                                'Social',
                                'Profesional',
                                'Individual'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Alumnos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'ITC',
                            data: [10,20,5,30]

                        }, {
                            name: 'INT',
                            data: [20,31,17,24]

                        }, {
                            name: 'LAD',
                            data: [15,24,21,16]

                        }, {
                            name: 'IIS',
                            data: [12,14,16,17]

                        }]
                    });//cierre chart
            }

            if(val=="Genero"){
                $('#container').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '# de Alumnos por Genero en las siguientes Categorias'
                        },
                        subtitle: {
                            text: 'Actualmente datos estaticos debido a que aÃºn no contamos con los datos suficientes'
                        },
                        xAxis: {
                            categories: [
                                'Salud',
                                'Social',
                                'Profesional',
                                'Individual'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Alumnos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Masculino',
                            data: [10,20,5,30]

                        }, {
                            name: 'Femenino',
                            data: [12,14,16,17]

                        }]
                    });//cierre chart
            }

             if(val=="Semestre"){
                $('#container').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '# de Alumnos por Semestre en las siguientes Categorias'
                        },
                        subtitle: {
                            text: 'Actualmente datos estaticos debido a que aÃºn no contamos con los datos suficientes'
                        },
                        xAxis: {
                            categories: [
                                'Salud',
                                'Social',
                                'Profesional',
                                'Individual'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Alumnos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: '4',
                            data: [10,20,5,30]

                        }, {
                            name: '5',
                            data: [20,31,17,24]

                        }, {
                            name: '6',
                            data: [15,24,21,16]

                        }, {
                            name: '7',
                            data: [12,14,16,17]

                        }]
                    });//cierre chart
            }

             if(val=="Edad"){
                $('#container').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '# de Alumnos por Edad en las siguientes Categorias'
                        },
                        subtitle: {
                            text: 'Actualmente datos estaticos debido a que aÃºn no contamos con los datos suficientes'
                        },
                        xAxis: {
                            categories: [
                                'Salud',
                                'Social',
                                'Profesional',
                                'Individual'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Alumnos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: '18',
                            data: [10,20,5,30]

                        }, {
                            name: '19',
                            data: [20,31,17,24]

                        }, {
                            name: '20',
                            data: [15,24,21,16]

                        }, {
                            name: '21',
                            data: [12,14,16,17]

                        },{
                            name: '22',
                            data: [12,14,16,17]

                        }
                        ]
                    });//cierre chart
            }


        });//Cierre on click
});