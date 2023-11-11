"use client";

import React from 'react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"
import Navbar from "../../../components/Navbar";
import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function falseP(fx: string, xl: number, xr: number) : {result:number[], error:number[]} {
  let x1: number = 0;
  let xold: number = x1;
  let error: number[] = [];
  let result: number[] = [];
  Number(fx);   

  for (let i = 0; i < 100; i++) {
    xold = x1;

    const fxr: number = evaluate(fx, { x: xr });
    const fxl: number = evaluate(fx, { x: xl });
    const fx1: number = evaluate(fx, { x: x1 });

    x1 = ((xl*fxr)-(xr*fxl))/(fxr-fxl);

    if (fx1 * fxr > 0) {
      xr = x1;
    } else {
      xl = x1;
    }

    error[i] = Math.abs((x1 - xold) / x1) * 100;
    if (error[i] < 0.00001) {
      break;
    }
    result.push(x1);
  }

  return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [xl, setxl] = useState("");
  const [xr, setxr] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);
  const [graph, setGraph] = useState<{x:number, y : number}[]>([]);

  const cal = () => {
    console.log(fx, xl, xr)
    const value = falseP(fx, Number(xl), Number(xr));
    setResult(value.result);
    setError(value.error);
    createGraph();
  };

  const createGraph = () => {
    setGraph(() => {
      const x : number[] = [];
      const y : number[] = [];
    
      const step = Math.pow(10,Math.floor(Math.abs(Math.log(Number(xr) - Number(xl))) / Math.log(10)) - 1);
      
      for ( let i = Number(xl); i < Number(xr); i += step) {
        x.push(i);
        y.push(evaluate(fx, {x: i}));
      }

      return Array.from({length : x.length}, (_, i) => {return {x : x[i], y : y[i]}});
    });
  }

  return (
    <>
    <Navbar />
    <Card className="w-11/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">False Position</h1>
      <div className="flex flex-wrap">
      <TextField id="outlined-basic" label='f(x)' variant="outlined"
        type="text" 
        required
        value={fx}
        onChange={(e) => setFx(e.target.value)}
        className="w-full"
      />

      <TextField id="outlined-basic" label='xl' variant="outlined"
        type="number"
        required
        value={xl}
        onChange={(e) => setxl(e.target.value)}
        className="w-36 mr-2 mt-4"
      />

      <TextField id="outlined-basic" label='xr' variant="outlined"
        type="number"
        required
        value={xr}
        onChange={(e) => setxr(e.target.value)}
        className="w-36 ml-2 mr-4 mt-4"
      />

      <button onClick={cal} className="btn btn-4 w-36 mt-4 bg-blue-500 text-white p-2 rounded">Calculate</button>
      </div>

      {result.length > 1 ? (
        <>
          <p className="text-xl font-bold mb-4 mt-4">Result: {(result.at(-1)?.toFixed(6))} </p>

          <div className="flex justify-center">
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="simple table" className="min-w-full">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold" align="center">Iteration</TableCell>
                    <TableCell className="font-bold" align="center">X1</TableCell>
                    <TableCell className="font-bold" align="center">Error</TableCell>
                  </TableRow>

                </TableHead>
                <TableBody>
                  {result.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index+1}</TableCell>
                      <TableCell align="center">{item.toFixed(6)}</TableCell>
                      <TableCell align="center">{error[index].toFixed(6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </div>
        </>
      ) : null}
    </div>
    <Plot
        data={[
          {
            x: graph.map((item) => item.x),
            y: graph.map((item) => item.y),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 500, height: 450, title: 'Graph'} }
      />
    </Card>
    </>
  );
}
