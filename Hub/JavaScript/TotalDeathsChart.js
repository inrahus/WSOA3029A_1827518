var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['13', '14', '15', '16', '17', '18', '19', '10', '21', '22', '23', '24', '25', '26', '27', '28',
        ],
        datasets: [{
            label: 'Total Number of Deaths',
            data: [25, 27, 27, 34, 48, 50, 52, 54, 58, 58, 65, 75, 79, 86, 87, 90],
            backgroundColor: [
                'rgba(0, 0, 0, 0.9)'],
            borderColor: [
                'rgba(0, 0, 0, 1)'],
            borderWidth: 1,
            hoverBorderWidth: 5,
            hoverBorderColor: 'white'
        }]
    },
    options: {
        title: {
            display: true,
            text:
                'Total Number of COVID Deaths from May 14th to May 28th in South Africa',
            fontSize: 35,
            fontColor: 'white'
        },

        legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: 'white'
            }
        },
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        },

        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date in May 2020',
                    fontSize: 20,
                    fontColor: 'white'
                },

                gridLines: {
                    display: true,
                    color: "white"
                },

                ticks: {
                    fontColor: "white",
                }
            }],

            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Total Number of Deaths',
                    fontSize: 20,
                    fontColor: 'white'
                },

                gridLines: {
                    display: true,
                    color: "white"
                },

                ticks: {
                    fontColor: "white",
                }
            }]
        }

    }

});