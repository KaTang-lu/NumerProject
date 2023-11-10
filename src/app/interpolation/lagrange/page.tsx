"use client";

import { Card, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import Navbar from "../../../components/Navbar";
import "../../globals.css"


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

function lagange(data : Coordinate[], x : number) {
  let result = 0;
  for ( let i = 0; i < data.length; i++) {
    let temp = 1;
    for ( let j = 0; j < data.length; j++) {
      if ( i !== j ) {
        temp *= (x - data[j].x[0]) / (data[i].x[0] - data[j].x[0]);
      }
    }
    result += temp * data[i].y;
  }
  return result;
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
    const value = lagange(chooseData, Number(x));
    setResult(value);
  }
  
  return (
    <>
    <Navbar />
    <Card className="w-11/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mt-4 mb-4 text-center">Lagange Interpolation</h1>
    <div className="">
    <TextField id="outlined-basic" label='Target x' variant="outlined"
        type="number"
        required
        value={x}
        onChange={(e) => setX(e.target.value)}
        className="w-1/2 mr-4 mt-4"
    />
    <TextField id="outlined-basic" label='number of point' variant="outlined"
        type="number"
        value={numberOfPoint}
        onChange={(e) => setNumberOfPoint(Number(e.target.value))}
        className="w-1/1 mt-4"
    />
    </div>
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
    <button onClick={cal} className="btn btn-4 w-36 mt-4 bg-blue-500 text-white p-2 rounded">
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