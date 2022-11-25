import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { toggleRuntimeSelect } from "../../redux/runtime/runtimeActions";
import { addCols, updateCols } from "../../redux/column/columnAction";
// import { UpdateCols } from "../../redux/column/columnAction";
const PieChart = ({ chartData, facetId, setShowUpdate, hiddenIndices }) => {
  const dispatch = useDispatch();

  const runTimeResults = useSelector((state) => {
    return state.runtime.results;
  });

  const colResults = useSelector((state) => {
    return state.column;
  });

  const legendClick = (event, legendItem, legend) => {
    if (colResults.columns.filter((col) => col.id === facetId).length === 0) {
      dispatch(addCols({ id: facetId, changes: [legendItem.text] }));
    } else if (
      colResults.columns.filter((col) => col.id === facetId).length === 1
    ) {
      colResults.columns.forEach((cols) => {
        if (cols.id === facetId) {
          const newlegendObj =
            runTimeResults.facets[facetId].values[legendItem.text];
          if (!newlegendObj.selected) {
            dispatch(
              updateCols({
                id: cols.id,
                changes: [...cols.changes, legendItem.text],
              })
            );
          } else {
            dispatch(
              updateCols({
                id: cols.id,
                changes: cols.changes.filter(
                  (item) => item !== legendItem.text
                ),
              })
            );
          }
        }
      });
    }
    const index = legendItem.index;
    if (legend.chart.getDataVisibility(index)) {
      legend.chart.legend.legendItems.forEach((finalItem) => {
        if (finalItem.index !== index) {
          legend.chart.toggleDataVisibility(finalItem.index);
        }
      });
    } else {
      legend.chart.toggleDataVisibility(index);
      legendItem.hidden = !legend.chart._hiddenIndices[index];
    }

    legend.chart.update();
    setShowUpdate(false);
    const legendObject = runTimeResults.facets[facetId].values[legendItem.text];
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
      toggleRuntimeSelect(
        runTimeResults,
        legendItem.text,
        legendObject,
        facetId
      )
    );
  };
  const chartRef = useRef();
  const options = {
    plugins: {
      legend: {
        onClick: legendClick,
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
  if (chartRef.current) {
    // let keys = Object.keys(hiddenIndices);
    // if (keys > 0) {
    //   keys.forEach((key) => {
    //     chartRef.current._hiddenIndices = hiddenIndices
    //   });
    // }
    chartRef.current._hiddenIndices = hiddenIndices;
  }

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
