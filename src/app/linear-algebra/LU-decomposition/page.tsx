"use client";
import { useEffect, useState } from "react";
import "../../globals.css";

function LU(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];
  const A = matrix.map((matrix) => matrix.slice(0, n));
  const B = matrix.map((column) => column[n]);
  const L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const U: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    //Lower Triangular
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[j][k] * U[k][i];
      }
      L[j][i] = A[j][i] - sum;
    }

    //Upper Triangular
    for (let j = i; j < n; j++) {
      if (i == j) {
        U[i][i] = 1;
      } else {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += L[i][k] * U[k][j];
        }
        U[i][j] = (A[i][j] - sum) / L[i][i];
      }
    }
  }
  console.log("[L]: \n", L);
  console.log("[U]: \n", U);

  //Forward Substitution
  const Y: number[] = new Array(n).fill(0);
  Y[0] = A[0][0] / L[0][0];
  for(let i = 0; i < n; i++){
    let f_sum = 0;
    for(let j = 0; j < i; j++){
      f_sum += L[i][j] * Y[j];
    }
    Y[i] = (B[i] - f_sum) / L[i][i];
  }

  //Backward Substitution
  const X: number[] = new Array(n).fill(0);
  X[n-1] = Y[n-1] / U[n-1][n-1];
  for(let i = n-1; i >= 0; i--){
    let b_sum = 0;
    for(let j = i+1; j < n; j++){
      b_sum += U[i][j] * X[j];
    }
    X[i] = (Y[i] - b_sum) / U[i][i];
  }
  result.push(...X);

  return result;
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    setResult(LU(matrix));
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">LU Decomposition</h1>
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      <div>
        {result.length > 1 ? (
          <>
            <div className="mt-4">
              <table className="border-collapse border border-gray-300">
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">X{i}:</td>
                      <td className="border border-gray-300 p-2">{r}</td>
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
