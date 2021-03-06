import React, { useState, useEffect } from 'react';
import Filters from '../../Filters'
import './style.css'
import { barOptions, pieOptions } from './chart-options'
import Chart from 'react-apexcharts'
import axios from 'axios'
import { buildBarSeries, getPlatformChartData, getGenderChartData} from './helpers'

type PieChartData = {
  labels: string[];
  series: number[];
}

type BarChartData = {
  x: string;
  y: number;
}

const initialPieData = {
  labels: [],
  series: []
}

const BASE_URL = ' https://sds-pesqui.herokuapp.com';

const Charts = () => {

  const [barChartData, setBarChart] = useState<BarChartData[]>([])
  const [platformData, setplatformData] = useState<PieChartData>(initialPieData);
  const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

  useEffect(() => {
    async function getData(){
      const recordResponse = await axios.get(`${BASE_URL}/records`);
      const gamesResponse = await axios.get(`${BASE_URL}/games`);
      
      const barData = buildBarSeries(gamesResponse.data, recordResponse.data.content);
      setBarChart(barData);

      const platformData = getPlatformChartData(recordResponse.data.content)
      setplatformData(platformData)

      const genderData = getGenderChartData(recordResponse.data.content)
      setGenderData(genderData)
    }
     
    getData();
  }, [])

  return (
    <div className="page-container">
      <Filters link="/records" linkText="VER TABELA" />
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">
            Jogos mais votados
            </h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="900"
              height="350"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title">Plataformas</h2>
            <Chart
              options={{ ...pieOptions, labels: platformData?.labels }}
              type="donut"
              series={platformData?.series}
              width="350"
            />
          </div>
          <div className="platform-chart">
            <h2 className="chart-title">Gêneros</h2>
            <Chart
              options={{ ...pieOptions, labels: genderData?.labels }}
              type="donut"
              series={genderData.series}
              width="350"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts;