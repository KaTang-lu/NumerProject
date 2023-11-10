"use client";

import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"
import Navbar from "../../../components/Navbar";
import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function onepoint(fx: string, start: number) : {result:number[], error:number[]} {
    let xnext: number = 0;
    let xstart: number = start;
    let error = [];
    let result = [];
    Number(fx);

    for(let i=0; i<100; i++){
        xnext = evaluate(fx, {x: xstart});
        
        error[i] = Math.abs((xnext-xstart)/xnext)*100;
        if(error[i] < 0.00001){
            break;
        }
        xstart = xnext;
        result.push(xnext);
    }

    return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [start, setStart] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    console.log(fx, start)
    const value = onepoint(fx, Number(start));
    setResult(value.result);
    setError(value.error);
  };

  return (
    <>
    <Navbar />
    <Card className="w-11/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">One-Point Iteration</h1>
      <div className="flex flex-wrap">
      <TextField id="outlined-basic" label='f(x)' variant="outlined"
        type="text"
        required
        value={fx}
        onChange={(e) => setFx(e.target.value)}
        className="w-full"
      />

      <TextField id="outlined-basic" label='x0' variant="outlined"
        type="number"
        required
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-36 mr-2 mt-4"
      />

      <button onClick={cal} className="btn btn-4 w-36 mt-4 bg-blue-500 text-white p-2 rounded">Calculate</button>
    </div>

      {result.length > 1 ? (
        <>
        <p className="text-xl font-bold mb-4 mt-4">Result: {(result.at(-1))?.toFixed(6)}</p>
        <div className="flex justify-center">
          <TableContainer component={Paper} className="mt-4">
            <Table aria-label="simple table" className="min-w-full">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold" align="center">Iteration</TableCell>
                  <TableCell className="font-bold" align="center">X Next</TableCell>
                  <TableCell className="font-bold" align="center">Error</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell align="center">{item.toFixed(6)}</TableCell>
                    <TableCell align="center">{error[index]?.toFixed(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </>
      ): null}

    </div>
    </Card>
    </>
  );
}
