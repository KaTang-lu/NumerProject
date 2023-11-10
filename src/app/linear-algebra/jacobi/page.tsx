"use client";
import { useEffect, useState } from "react";
import "../../globals.css";

function jacobi(matrix: number[][], es: number): {result:number[], error:number[]} {
  const n = matrix.length;
  const result: number[] = [];
  const error: number[] = [];
  const B = matrix.map((column) => column[n]);
  const A = matrix.map((matrix) => matrix.slice(0, n));
  
  let xOld = Array.from({ length: n }, () => 0);
  let x = Array.from({ length: n }, () => 0);

  let ea = 1;
  while(ea > es) {
    ea = 0;
    for(let i = 0; i < n; i++) {
      let _sum = B[i];
      for(let j = 0; j < n; j++) {
        if(i !== j) {
          _sum -= A[i][j] * xOld[j];
        }
      }
      x[i] = _sum / A[i][i];
      const ea_t = Math.abs((x[i] - xOld[i]) / x[i]) * 100;
      error.push(ea_t);

      if(ea_t > ea) {
        ea = ea_t;
      }
    }
    
    for(let i = 0; i < n; i++) {
      xOld[i] = x[i];
    }
    result.push(...x);
  }

  return {result, error};
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [es, setEs] = useState<number>(0.001);
  const [error, setError] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    const value = jacobi(matrix, es);
    setResult(value.result);
    setError(value.error);
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Jacobi Iteration Method</h1>
        <h2 className="text-2xl mb-4">Error </h2>
        <input
          type="number"
          value={es}
          onChange={(e) => {
            setEs(Number(e.target.value));
          }}
          className="p-2 rounded border border-gray-300 mr-2"
        />
        
        <h2 className="text-2xl mb-4">Dimension</h2>
        <input
          type="number"
          value={dimension}
          onChange={(e) => {
            setDimension(Number(e.target.value));
          }}
          className="p-2 rounded border border-gray-300 mr-2"
        />

        <h2 className="text-2xl mb-4">Matrix</h2>
        {Array.from({ length: dimension }, (_, i) => (
          <div key={i} className="mb-4">
            {Array.from({ length: dimension + 1 }, (_, j) => (
              <input
                type="number"
                key={j}
                onChange={(e) => {
                  const temp = [...matrix];
                  temp[i][j] = Number(e.target.value);
                  setMatrix(temp);
                }}
                className="p-2 rounded border border-gray-300 mr-2"
              />
            ))}
          </div>
        ))}
        <button
          onClick={cal}
          className="btn btn-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      <div>
        {result.length > 1 ? (
          <>
            <div className="mt-4">
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Iteration</th>
                    <th className="px-4 py-2">X</th>
                    <th className="px-4 py-2">Value</th>
                    <th className="px-4 py-2">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => ( 
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{Math.floor(index / dimension) + 1}</td>
                      <td className="border border-gray-300 p-2">x{index % dimension + 1}</td>
                      <td className="border border-gray-300 p-2">{item.toFixed(6)}</td>
                      <td className="border border-gray-300 p-2">{error[index].toFixed(6)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
