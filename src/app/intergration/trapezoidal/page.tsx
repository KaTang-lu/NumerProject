"use client";

import axios from "axios";
import React from 'react';
import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"
import { Card, Table, TableRow, TextField } from '@mui/material';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

function trapezoidal(fx: string, a: number, b: number, n: number) : {result:number, error:number} {
    let error: number = 0;

    let h: number = (b-a)/n;
    let _sum = 0;
    
    let x = a + h
    for(let i=1; i<n; i++){
        _sum += evaluate(fx, {x});
        x = x + h;
    }

    const f0 = evaluate(fx, {x: a});
    const fn = evaluate(fx, {x: b});
    const result = (h/2) * (f0 + fn + 2*_sum);

    return {result, error};
}

export default function page(){
    const[fx, setFx] = useState("");
    const[a, setA] = useState<number>(0);
    const[b, setB] = useState<number>(0);
    const[n, setN] = useState<number>(1);
    const[result, setResult] = useState<number>();
    const[graph, setGraph] = useState<{x:number, y : number}[]>([]);

    const cal = () => {
        const value = trapezoidal(fx, Number(a), Number(b), Number(n));
        setResult(value.result);
        createGraph();
    }

    const createGraph = () => {
        setGraph(() => {
          const x : number[] = [];
          const y : number[] = [];
        
          const step = (b-a)/n;

          for(let i = a; i <= b; i += step) {
            x.push(i);
            y.push(evaluate(fx, {x: i}));
          }
    
          return Array.from({length : x.length}, (_, i) => {return {x : x[i], y : y[i]}});
        });
      }

    const random = async() =>{
        let {data} = await axios.get("/api/intergration")
        console.log(data)
        setA(data[0].from)
        setB(data[0].to)
        setFx(data[0].equation)
    }

    return(
        <>
        <div>
            <Card className='w-6/12 max-w-xl mx-auto p-4 mt-6 mb-4 shadow-lg rounded-lg'>
                <TextField type="text"
                required
                value={fx}
                onChange={(e) => setFx(e.target.value)}
                className='w-full mt-2'
                />

                <TextField type="number"
                required
                label="a"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                />

                <TextField type="number"
                required
                label="b"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                />

                <TextField type="number"
                required
                label="n"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                />

                <button onClick={cal} className='ml-6 mt-4'>Calculate</button>
                <button onClick={random} className="ml-6">Random</button>

                <h1>Result: {result}</h1>

                
                
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
        </div>
        </>
    )
}
