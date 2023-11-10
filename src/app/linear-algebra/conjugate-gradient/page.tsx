"use client";
import { useEffect, useState } from "react";
import "../../globals.css";

function conjugate(matrix: number[][], x: number[], es: number): { result: number[]; error: number[] } {
  const n = matrix.length;
  const result: number[] = [];
  const error: number[] = [];
  const B = matrix.map((column) => column[n]);
  const A = matrix.map((matrix) => matrix.slice(0, n));

  let R = Array.from({ length: n }, () => 0);
  let D = Array.from({ length: n }, () => 0);
  let X = x.slice();

  //Initial R0 & D0
  for(let i = 0; i < n; i++){
    let _sum = 0;
    for(let j = 0; j < n; j++){
      _sum += A[i][j] * X[j];
    }
    R[i] = _sum - B[i] ;
    D[i] = R[i] * -1;
  }

  //Loop
  let i = 1;
  let lambda = 0; 
  // Lambda = - ([D]k * {R}k) /[D]k * [A] * [D]k
  while(i < 10){
    for ( let k = 0; k < D.length; k++ ) {
        lambda += D[k] * R[k];
    }

    // tempSum = [D]k * [A] * [D]k
    let tempSum = 0;
    for(let k = 0; k < n ; k++) {
        let sum = 0;

        for(let j = 0; j < A[k].length; j++) {
            sum += A[j][k] * D[j];
        }
        sum *= D[k];
        tempSum += sum;
    }
    lambda /= (-1 * tempSum);

    // {x}k+1 = {x}k + lambda * [D]k
    for(let k = 0; k < X.length; k++) {
        X[k] += lambda * D[k];
    }

    // {R}k+1 = [A]{X}k+1 - [B]
    for(let k = 0; k < n; k++) {
        let sum = 0;
        for(let j = 0; j < A[k].length; j++) {
            sum += A[j][k] * X[j];
        }
        R[k] = sum - B[k];
    }

    //find error
    let ea = 0;
    for(let k = 0; k < R.length; k++) {
        ea += R[k] * R[k];
    }
    ea = Math.sqrt(ea);
    error.push(ea);

    //check error
    if(ea < es) {
        break;
    }

    //find alpha
    let alpha = 0; // alpha = [R]k+1 * [A] * [D]k / [D]k * [A] * [D]k
    for(let k = 0; k < n; k++) {
        let sum = 0;
        for(let j = 0; j < A[k].length; j++) {
            sum += A[k][j] * D[j];
        }
        sum *= R[k];
        alpha += sum;
    }
    alpha /= tempSum;

    //find [D]k+1
    for(let k = 0; k < D.length; k++) {
        D[k] = (-1 * R[k]) + alpha * D[k];
    }

    i++;
  }
  result.push(...X);
  
  return { result, error };
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [es, setEs] = useState<number>(0.001);
  const [x, setX] = useState<number[]>([]);
  const [error, setError] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    const value = conjugate(matrix, x, es);
    setResult(value.result);
    setError(value.error);
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
    setX(Array.from({ length: dimension }, () => 0));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4"> Conjugate Gradient Method </h1>
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

        <h2 className="text-2xl mb-4">Initial</h2>
        {Array.from({ length: dimension }, (_, i) => (
          <input
            type="number"
            key={i}
            onChange={(e) => {
              const temp = [...x];
              temp[i] = Number(e.target.value);
              setX(temp);
            }}
            className="p-2 rounded border border-gray-300 mr-2"
          />
        ))}

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
                      <td className="border border-gray-300 p-2">
                        {Math.floor(index / dimension) + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        x{(index % dimension) + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.toFixed(6)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {error[index].toFixed(6)}%
                      </td>
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
