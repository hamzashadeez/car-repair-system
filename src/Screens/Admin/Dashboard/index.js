import "./styles.css";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { db } from "../../../firebase";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Box = ({ label, num }) => {
  return (
    <div className="box">
      <div>
        <h3>{num}</h3>
      </div>
      <p>{label}</p>
    </div>
  );
};

const Chart = () => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    let data = [];
    let visits = 10;

    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date(2018, 0, i),
        name: "name" + i,
        value: visits,
      });
    }

    x.data = data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "340px" }}></div>;
};

const DashBoard = () => {
  const [total, setTotal] = useState(1);
  const [mechanics, setMechanics] = useState([])
  const [order, setOrder] = useState([])
  const [customers, setCustomers] = useState([])
  
  useEffect(() => {
    (async () => {
      db.collection("money").onSnapshot((snapshot) => {
        setTotal(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await db.collection("mechanics")
        .onSnapshot((snapshot) => {
          setMechanics(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
        
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await db.collection("customers")
        .onSnapshot((snapshot) => {
          setCustomers(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
        
    })();
  }, []);

  useEffect(() => {
    (async () => {
      db.collection("orders").onSnapshot((snapshot) => {
        setOrder(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);
  

  return (
    <div className="dashboard">
      <h3 style={{ color: "black", marginBottom: "2px", fontWeight: "500" }}>
        Dashboard
      </h3>
      <div className="boxContainer">
        <Box num={order.length} label={"Number Of Orders"} />
        <Box num={`$${total[0]?.data.data}`} label={"Income Generated"} />
        <Box num={mechanics.length} label={"Number of Mechanics"} />
        <Box num={customers.length} label={"Customers"} />
      </div>
      <div>
        <div className="chart__container">
          {/* Chart container */}
          {/* <Chart /> */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
