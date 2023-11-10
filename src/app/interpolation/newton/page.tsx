"use client";

import { Card, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import "../../globals.css"
import Navbar from "../../../components/Navbar";

class Coordinate {
  x : number[];
  y : number;
  constructor(x : number[], y : number) {
    this.x = x;
    this.y = y;
  }
}

class InputData {
  data : Coordinate[];
  isChecked : boolean;
  constructor(data : Coordinate[], isChecked : boolean) {
    this.data = data;
    this.isChecked = isChecked;
  }
}

function calDivDiff(data : Coordinate[]) {
    const n = data.length;
    const divDiff = Array.from({length : n}, () => Array.from({length : n}, () => 0));
    for ( let i = 0; i < n; i++) {
        divDiff[i][0] = data[i].y;
    }
    
    for ( let i = 1; i < n; i++) {
        for ( let j = 0; j < n - i; j++) {
        divDiff[j][i] = (divDiff[j + 1][i - 1] - divDiff[j][i - 1]) / (data[j + i].x[0] - data[j].x[0]);
        }
    }
    
    return divDiff;
}

export default function Page() {
  const [numberOfPoint, setNumberOfPoint] = useState<number>(5);
  const [givenData, setGivenData] = useState<Coordinate[]>(Array.from({length : numberOfPoint}, () => new Coordinate([NaN], NaN) ));
  const [isChecked, setIsChecked] = useState<boolean[]>(Array.from({length : numberOfPoint}, () => false));
  const [chooseData, setChooseData] = useState<Coordinate[]>([]);
  const [x, setX] = useState("");
  const [result, setResult] = useState<number>(0);

  function onChangeHandle( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    if ( name.includes('x') ) {
      const i = Number(name[1]);
      setGivenData((prev) => {
        const next = [...prev];
        next[i].x[0] = Number(value);
        return next;
      });
    }

    if ( name.includes('y') ) {
      const i = Number(name[1]);

      setGivenData((prev) => {
        const next = [...prev];
        next[i].y = Number(value);
        return next;
    });
    }

    if ( name.includes('check') ) {
      const i = Number(name[0]);
      setIsChecked((prev) => {
        const next = [...prev];
        next[i] = !prev[i];
        return next;
      });
    }

    if ( name.includes('all') ) {
      setIsChecked((prev) => {
        const next = [...prev];
        next.forEach((_, i) => next[i] = !prev[i]);
        return next;
      });
    }
  }

  useEffect(() => {
    setChooseData(() => {
      const next = [];
      for ( let i = 0; i < numberOfPoint; i++) {
        if ( isChecked[i] ) {
          next.push(givenData[i]);
        }
      }
      console.log(next);
      return next;
    });
    // console.log(givenData);
    // console.log(isChecked);
  }, [givenData, isChecked])
  

  const cal = () => {
    const data = chooseData;
    const n = data.length;
    const divDiff = calDivDiff(data);
    let ans = 0;
    let mul = 1;
    for ( let i = 0; i < n; i++) {
        mul = 1;
        for ( let j = 0; j < i; j++) {
            mul *= (Number(x) - data[j].x[0]);
        }
        ans += mul * divDiff[0][i];
    }
    console.log(ans);
    setResult(ans);
  }
  
  return (
    <>
    <Navbar />
    <Card className="w-11/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mt-4 mb-4 text-center">Newton's Divide Difference</h1>
    <input
        type="number"
        placeholder="Target x"
        value={x}
        onChange={(e) => setX(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2 mt-2"
    />
    <input type="number"
              value={numberOfPoint}
              onChange={(e) => setNumberOfPoint(Number(e.target.value))}
              className="w-1/3 p-2 border border-gray-300 rounded mr-2 mt-2"
    />
      <TableContainer component={Paper} className="mt-4">
      <Table aria-label="simple table" className="min-w-full">
        <TableHead>

          <TableRow>
            <TableCell align="center"
                       className="w-16">
              <Checkbox name="all" onChange={(e) => onChangeHandle(e)}/>
            </TableCell>

            <TableCell align="center" className="font-bold">Point</TableCell>

            <TableCell align="center" className="font-bold">X</TableCell>

            <TableCell align="center" className="font-bold">Y</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>
          { Array.from({length : numberOfPoint}, (_, idx) => {
            return (
                <TableRow className={`${isChecked[idx] ? "bg-slate-200" : "" }`}>
                <TableCell align="center" className="w-10">
                  <Checkbox  name={`${idx}check`} onChange={(e) => onChangeHandle(e)}
                            checked={isChecked[idx]}/>
                </TableCell>

                <TableCell align="center">{`${idx + 1}`}</TableCell>

                <TableCell align="center">
                  <TextField className="w-36" id="outlined-basic" label={`x${idx}`} variant="outlined" 
                              name={`x${idx}`} 
                              required
                              type="number"                            
                             onChange={(e) => onChangeHandle(e)}/>
                </TableCell>

                <TableCell align="center">
                  <TextField className="w-36" id="outlined-basic" label={`y${idx}`} variant="outlined" 
                             name={`y${idx}`}
                             required
                             type="number"                            
                             onChange={(e) => onChangeHandle(e)}/>
                </TableCell>

              </TableRow>
                )
            })
          }

        </TableBody>
      </Table>
    </TableContainer>
    <button onClick={cal} className="btn btn-4 bg-blue-500 text-white p-2 rounded mt-4">
        Calculate
    </button>

    <div className="mx-auto text-center" >
        {result ? (
            <>
            <p className="text-xl mt-4">Result: {result.toFixed(6)} </p>
            </>
        ): null}
    </div>
    </Card>

    
    </>
  )
}