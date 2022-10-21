import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFacetsSelect } from "../../redux/facet/facetActions";
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = ({ chartData, facetId, setShowUpdate }) => {
  const dispatch = useDispatch();
  const pieChartFacets = useSelector((state) => {
    return state.facet.facets;
  });
  const legendClick = (event, legendItem, legend) => {
    setShowUpdate(false);
    const legendObject = pieChartFacets.facets[facetId].values[legendItem.text];
    if (!legendObject.selected && !legendObject.deselected) {
      legendObject.selected = !legendObject.selected;
    } else {
      if (legendObject.selected && !legendObject.deselected) {
        legendObject.selected = false;
        legendObject.deselected = true;
      } else {
        legendObject.selected = true;
        legendObject.deselected = false;
      }
    }
    dispatch(
      toggleFacetsSelect(pieChartFacets, legendItem.text, legendObject, facetId)
    );
  };

  const chartRef = useRef();
  const options = {
    plugins: {
      legend: {
        onClick: (event, legendItem, legend) =>
          legendClick(event, legendItem, legend),
        labels: {
          usePointStyle: true,
          boxWidth: 400,
          boxHeight: 400,
        },
        position: "right",
        align: "start",
      },
    },
    responsive: true,
  };
  return (
    <>
      {/* <ul>
        {
          chartData.labels.map((label, index) => (
            <li key={index}>{label}</li>
          ))
        }
      </ul> */}
      <Doughnut
        data={chartData}
        className="pie-chart"
        options={options}
        // onClick={(event) => handleClick(event)}
        ref={chartRef}
      />
    </>
  );
};

export default PieChart;
