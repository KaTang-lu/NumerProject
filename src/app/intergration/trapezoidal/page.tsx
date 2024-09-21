"use client";

import axios from "axios";
import React from "react";
import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css";
import { Card, Table, TableRow, TextField } from "@mui/material";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function trapezoidal(
  fx: string,
  a: number,
  b: number,
  n: number
): { result: number; error: number } {
  let error: number = 0;

  let h: number = (b - a) / n;
  let _sum = 0;

  let x = a + h;
  for (let i = 1; i < n; i++) {
    _sum += evaluate(fx, { x });
    x = x + h;
  }

  const f0 = evaluate(fx, { x: a });
  const fn = evaluate(fx, { x: b });
  const result = (h / 2) * (f0 + fn + 2 * _sum);

  return { result, error };
}

export default function page() {
  const [fx, setFx] = useState("");
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [n, setN] = useState<number>(1);
  const [result, setResult] = useState<number>();
  const [graph, setGraph] = useState<{ x: number; y: number }[]>([]);

  const cal = () => {
    const value = trapezoidal(fx, Number(a), Number(b), Number(n));
    setResult(value.result);
    createGraph();
  };

  const createGraph = () => {
    setGraph(() => {
      const x: number[] = [];
      const y: number[] = [];

      const step = (b - a) / n;

      for (let i = a; i <= b; i += step) {
        x.push(i);
        y.push(evaluate(fx, { x: i }));
      }

      return Array.from({ length: x.length }, (_, i) => {
        return { x: x[i], y: y[i] };
      });
    });
  };

  const random = async () => {
    let { data } = await axios.get("/api/intergration");
    console.log(data);
    setA(data[0].from);
    setB(data[0].to);
    setFx(data[0].equation);
  };

  return (
    <>
      <div>
        <Card className="w-full max-w-2xl mx-auto p-6 mt-8 mb-6 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Trapezoidol calculator
          </h2>

          <div className="space-y-4">
            <TextField
              type="text"
              label="Function (f(x))"
              required
              value={fx}
              onChange={(e) => setFx(e.target.value)}
              className="w-full"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                type="number"
                required
                label="Value a"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full"
              />

              <TextField
                type="number"
                required
                label="Value b"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <TextField
              type="number"
              required
              label="Number of intervals (n)"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={cal}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Calculate
            </button>
            <button
              onClick={random}
              className="px-6 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400"
            >
              Random
            </button>
          </div>

          <h1 className="text-xl font-medium mt-8">Result: {result}</h1>

          <Plot
            data={[
              {
                x: graph.map((item) => item.x),
                y: graph.map((item) => item.y),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 500, height: 450, title: "Graph" }}
            className="mx-auto mt-6"
          />
        </Card>
      </div>
    </>
  );
}
