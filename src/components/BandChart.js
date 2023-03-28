import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: '# of Votes'
    }
  }
};

export const BandChart = () => {
  const [ bands, setBands ] = useState( [] );
  const { socket } = useContext( SocketContext );
  
  const labels = bands.map( band => band.name );

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: bands.map( band => band.votes ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };


  useEffect(() => {
    socket.on('current-bands', ( bands ) => {
      setBands( bands );
    })
    return () => socket.off( 'current-bands' )
  }, [ socket ])

  /* const crearGrafica = ( bands = [] ) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map( band => band.name ),
        datasets: [{
          label: '# of Votes',
          data: bands.map( band => band.votes ),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        animation: false,
        indexAxis: 'y',
        x: {
          beginAtZero: true
        }
      }
    });
  } */

  return (
    <Bar options={options} data={data} />
  )
}
