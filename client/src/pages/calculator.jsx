import React, { useState } from "react";
import { NAVBAR_HEIGHT } from "../constants/constant";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import carImg from '../assets/car.jpg';
import truckImg from '../assets/truck.jpg';
import airConditionerImg from '../assets/airConditioner.jpg';
import refrigeratorImg from '../assets/refrigerator.jpg';

const EMISSION_OPTIONS = [
  { value: "car", label: "Car", image: carImg },
  { value: "truck", label: "Truck", image: truckImg },
  { value: "ac", label: "Air Conditioner", image: airConditionerImg },
  { value: "refrigerator", label: "Refrigerator", image: refrigeratorImg },
];

function calculateEmission(method, data) {
  if (!data || !data.amount) return 0;

  const emissionRates = {
    car: 12,
    truck: 25,
    ac: 5,
    refrigerator: 8,
  };

  const rate = emissionRates[method] || 10;

  return Number(data.amount) * rate;
}

export default function Calculator() {
  const [selectedMethod, setSelectedMethod] = useState(EMISSION_OPTIONS[0].value);
  const [inputData, setInputData] = useState({ date: "", amount: "" });
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const methodData = EMISSION_OPTIONS.find((m) => m.value === selectedMethod);

  const handleDropdownChange = (e) => {
    setSelectedMethod(e.target.value);
    setInputData({ date: "", amount: "" });
    setResult(0);
  };

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleCalculate = () => {
    if (!inputData.date || !inputData.amount) {
      alert("Please enter a valid date and amount.");
      return;
    }

    const calculated = calculateEmission(selectedMethod, inputData);
    setResult(calculated);

    const newEntry = {
      date: inputData.date,
      amount: inputData.amount,
      method: selectedMethod,
      result: calculated,
    };

    // Add new entry and sort by date ascending
    const updatedHistory = [newEntry, ...history].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setHistory(updatedHistory);
    setInputData({ date: "", amount: "" });
  };

  // Aggregate history data by date: sum emissions per unique date
  const aggregatedDataMap = history.reduce((acc, entry) => {
    if (!entry.date) return acc;
    if (!acc[entry.date]) {
      acc[entry.date] = { date: entry.date, emission: 0 };
    }
    acc[entry.date].emission += Number(entry.result);
    return acc;
  }, {});

  // Convert aggregation map to sorted array for chart
  const chartData = Object.values(aggregatedDataMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div
      className="flex gap-4"
      style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})`, padding: 20 }}
    >
      {/* Left Side */}
      <div className="basis-[750px] flex flex-col p-8 border-r border-gray-200 bg-gray-100 rounded-xl">
        <div className="rounded-lg w-full mb-6 overflow-clip">
          <img
            src={methodData.image}
            alt={methodData.label}
            className="w-full object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {methodData.label} Emission Input
        </h2>

        <label className="block mb-2 font-medium">
          Date:
          <input
            type="date"
            name="date"
            value={inputData.date}
            onChange={handleInputChange}
            className="ml-2 mb-2 border rounded px-2 py-1 w-2/3"
          />
        </label>

        <div className="w-full max-w-sm mb-6">
          <label className="block mb-2 font-medium">
            Data Amount ({methodData.label} usage):
            <input
              type="number"
              name="amount"
              min="0"
              value={inputData.amount}
              onChange={handleInputChange}
              className="mb-2 border rounded px-2 py-1 w-2/3"
            />
          </label>
          <button
            onClick={handleCalculate}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            disabled={!inputData.date || !inputData.amount}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4">
          <span className="font-bold">Result:</span>{" "}
          <span className="text-gray-800">{result ? `${result} kg CO₂` : "--"}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 gap-4">
        {/* Dropdown */}
        <div className="p-8 border-b border-gray-200 bg-gray-100 rounded-xl">
          <label className="font-semibold block mb-2">
            Select Emission Method:
          </label>
          <select
            value={selectedMethod}
            onChange={handleDropdownChange}
            className="w-2/3 p-2 rounded border"
          >
            {EMISSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* History */}
        <div className="p-8 overflow-auto flex-1 bg-gray-100 rounded-xl mb-4">
          <h3 className="text-xl font-semibold mb-4">Recent Inputs</h3>
          {history.length === 0 ? (
            <p className="text-gray-500">No recent inputs yet.</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-auto">
              {history
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded border bg-white shadow-sm"
                  >
                    <strong>
                      {EMISSION_OPTIONS.find((e) => e.value === item.method).label}
                    </strong>{" "}
                    | {item.date} | {item.amount} units |{" "}
                    <span className="font-bold text-green-700">
                      {item.result} kg CO₂
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Chart */}
        <div className="p-8 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Emission Over Time</h3>
          {chartData.length === 0 ? (
            <p className="text-gray-500">No data to display chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => {
                    const date = new Date(str);
                    return date.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  minTickGap={15}
                />
                <YAxis
                  label={{ value: "kg CO₂", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="emission"
                  stroke="#4ade80"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
