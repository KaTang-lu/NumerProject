"use client";

import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"
import Navbar from "../../../components/Navbar";
import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";


function bisection(fx: string, xl: number, xr: number) : {result:number[], error:number[]} {
  let xm: number = 0;
  let xold: number = xm;
  let error: number [] = [];
  let result: number [] = [];
  Number(fx);

  for (let i = 0; i < 100; i++) {
    xold = xm;
    xm = (xl + xr) / 2;

    const fxr: number = evaluate(fx, { x: xr });
    const fxl: number = evaluate(fx, { x: xl });
    const fxm: number = evaluate(fx, { x: xm });

    if (fxm * fxr > 0) {
      xr = xm;
    } else {
      xl = xm;
    }

    error[i] = Math.abs((xm - xold) / xm) * 100;
    if (error[i] < 0.00001) {
      break;
    }
    result.push(xm);
  }

  return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [xl, setxl] = useState("");
  const [xr, setxr] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    console.log(fx, xl, xr)
    const value = bisection(fx, Number(xl), Number(xr));
    setResult(value.result);
    setError(value.error);
  };

  return (
    <>
    <Navbar />
    <Card className="w-11/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bisection Method</h1>
      <div className="flex flex-wrap">
      <TextField id="outlined-basic" label='f(x)' variant="outlined" 
        type="text"
        value={fx}
        required
        onChange={(e) => setFx(e.target.value)}
        className="w-full"
      />

      <TextField id="outlined-basic" label='xl' variant="outlined" 
        type="number"
        value={xl}
        required
        onChange={(e) => setxl(e.target.value)}
        className="w-36 mr-2 mt-4"
      />

      <TextField id="outlined-basic" label='xr' variant="outlined" 
        type="number"
        value={xr}
        required
        onChange={(e) => setxr(e.target.value)}
        className="w-36 ml-2 mr-4 mt-4"
      />

      <button onClick={cal} className="btn btn-4 w-36 mt-4 bg-blue-500 text-white p-2 rounded" >
        Calculate
      </button>
      </div>

      {result.length > 1 ? (
        <>
          <p className="text-xl font-bold mb-4 mt-4">Result: {(result.at(-1))?.toFixed(6)} </p>
          
          <div className="flex justify-center">
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="simple table" className="min-w-full">
                <TableHead>

                <TableRow>
                  <TableCell align="center" className="font-bold">Iteration</TableCell>
                  <TableCell align="center" className="font-bold">XM</TableCell>
                  <TableCell align="center" className="font-bold">Error</TableCell>
                </TableRow>

                </TableHead>

                <TableBody>
                  {result.map((item, index) => (
                    <TableRow>
                      <TableCell align="center">{index+1}</TableCell>
                      <TableCell align="center">{item.toFixed(9)}</TableCell>
                      <TableCell align="center">{error[index].toFixed(6)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </TableContainer>
          </div>
        </>
      ) : null}
    </div>
    </Card>
    </>
  );
}
