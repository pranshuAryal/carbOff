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

import carImg from "../assets/car.jpg";
import truckImg from "../assets/truck.jpg";
import airConditionerImg from "../assets/airConditioner.jpg";
import refrigeratorImg from "../assets/refrigerator.jpg";
import Cat from "../components/cat/cat";



const EMISSION_OPTIONS = [
  { value: "car", label: "Car", image: carImg },
  { value: "truck", label: "Truck", image: truckImg },
  { value: "ac", label: "Air Conditioner", image: airConditionerImg },
  { value: "refrigerator", label: "Refrigerator", image: refrigeratorImg },
];

function calculateEmission(method, data) {
  if (!data || !data.amount) return 0;

  const emissionRates = {
    car: 7.9,
    truck: 15,
    ac: 1.5,
    refrigerator: 0.5,
  };

  const rate = emissionRates[method] || 10;

  return Number(data.amount) * rate;
}

export default function Calculator() {
  const [selectedMethod, setSelectedMethod] = useState(
    EMISSION_OPTIONS[0].value
  );
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

  // Calculate today's total emission by filtering history for today's date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD format to match inputData.date

  const todaysEntries = history.filter((item) => item.date === todayString);

  const todaysTotalEmission = todaysEntries.reduce(
    (total, item) => total + Number(item.result),
    0
  );

  return (
    <div
      className="flex relative gap-4"
      style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})`, padding: 20 }}
    >
      {/* Left Side */}
      <div className="w-[40%] max-w-md flex flex-col p-6 border-[1px] border-gray-200 bg-white rounded-xl shadow-sm">
        <img
          src={methodData.image}
          alt={methodData.label}
          className="object-contain h-[320px] -translate-y-9 max-h-full rounded-md"
        />
        <div className="-translate-y-7">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 tracking-tight">
            {methodData.label} Emission Input
          </h2>

          <label className="block translate-y-3 mb-7 font-medium text-gray-700">
            Date:
            <input
              type="date"
              name="date"
              value={inputData.date}
              onChange={handleInputChange}
              className=" mt-1 block border border-gray-300 rounded-md px-3 py-1.5 w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-green-300 transition"
              max={todayString} // optional: prevent selecting future dates
            />
          </label>

          <label className="block mb-5 font-medium text-gray-700">
            {`Data Amount (${methodData.label} usage in hrs:)`}
            <input
              type="number"
              name="amount"
              min="0"
              value={inputData.amount}
              onChange={handleInputChange}
              className="mt-1 block border border-gray-300 rounded-md px-3 py-1.5 w-[140px] focus:outline-none focus:ring-1 focus:ring-green-300 transition"
            />
          </label>

          <button
            onClick={handleCalculate}
            disabled={!inputData.date || !inputData.amount}
            className={`mt-5 px-5 py-2 rounded-md text-white font-semibold transition ${
              !inputData.date || !inputData.amount
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[rgb(98,131,122)]  hover:bg-cyan-900"
            }`}
          >
            Calculate
          </button>

          <div className="mt-5 text-lg font-semibold text-gray-800">
            <span>Result:</span>{" "}
            <span className="ml-1 text-green-500">
              {result ? `${result} kg CO₂` : "--"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="h-[50%] flex gap-4">
          <div className="flex flex-col gap-4 w-[50%]">
            {/* Dropdown */}
            <div className="p-4 bg-white rounded-2xl border-[1px] border-gray-200 shadow-sm max-w-md ">
              <label
                htmlFor="emission-method"
                className="block text-lg font-extrabold text-gray-800 mb-4"
              >
                Select Emission Method:
              </label>
              <select
                id="emission-method"
                value={selectedMethod}
                onChange={handleDropdownChange}
                className="w-full p-2 rounded-2xl border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-green-300"
              >
                {EMISSION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Recommendation */}
            <div className="p-4 w-full max-w-md h-full bg-white rounded-2xl border-[1px] border-gray-200 shadow-sm flex flex-col">
              <h3 className="text-2xl font-extrabold mb-2 text-gray-800 pb-2 border-gray-200">
                Recommendations
              </h3>

              <ul className="space-y-4 overflow-auto max-h-[280px] pr-2">
                <li className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 rounded-2xl px-4 py-2 shadow-md flex flex-col mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-indigo-600 font-semibold text-lg">
                      Today’s Emission
                    </strong>
                    <span className="text-sm font-mono text-gray-500">
                      {todaysTotalEmission.toFixed(2)} kg CO₂
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm font-medium flex items-center">
                    {todaysTotalEmission > 70 && (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-red-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a1 1 0 01.993.883L11 7v4a1 1 0 01-1.993.117L9 11V7a1 1 0 011-1zm0 8a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                        </svg>
                        High emissions today. Reduce usage and choose cleaner
                        energy.
                      </span>
                    )}
                    {todaysTotalEmission <= 70 && todaysTotalEmission > 30 && (
                      <span className="text-yellow-600 font-bold flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" />
                        </svg>
                        Moderate emissions. Cut back on non-essential energy
                        use.
                      </span>
                    )}
                    {todaysTotalEmission <= 30 && (
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-green-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-9.707a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L10 11.414l2.293-2.293a1 1 0 00-1.414-1.414l-.879.88-.88-.88z" />
                        </svg>
                        Low emissions today. Great job!
                      </span>
                    )}
                  </div>
                </li>
                {/* You can add more general tips below if needed */}
                {/* <li className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 rounded-2xl px-4 py-2 shadow-md text-gray-700 text-sm">
      Walk, bike, or use public transit to cut transport emissions.
    </li>
    <li className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 rounded-2xl px-4 py-2 shadow-md text-gray-700 text-sm">
      Recycle and reduce waste to lower your carbon footprint.
    </li> */}
              </ul>
            </div>
          </div>

          {/* History */}
          <div className="p-4 w-full max-w-md h-full bg-white rounded-2xl border-[1px] border-gray-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-extrabold mb-2 text-gray-800  pb-2 border-gray-200">
              Recent Inputs
            </h3>

            {history.length === 0 ? (
              <p className="text-center text-gray-400 italic mt-12">
                No recent inputs yet.
              </p>
            ) : (
              <ul className="space-y-4 overflow-auto max-h-[280px] pr-2">
                {history
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((item, idx) => {
                    const methodLabel = EMISSION_OPTIONS.find(
                      (e) => e.value === item.method
                    )?.label;

                    return (
                      <li
                        key={idx}
                        className="bg-gradient-to-r mb-2 from-white via-gray-50 to-white border border-gray-200 rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-indigo-600 font-semibold text-lg">
                            {methodLabel || "Unknown Method"}
                          </strong>
                          <span className="text-sm text-gray-500 font-mono">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-gray-700 text-sm font-medium">
                          <span>{item.amount} units</span>
                          <span className="text-green-500 font-bold text-base">
                            {item.result} kg CO₂
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="p-8 h-[50%] bg-white  rounded-2xl border-[1px] border-gray-200 shadow-sm ">
          <h3 className="text-xl font-semibold mb-4">Emission Over Time</h3>
          <div className="ml-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 3, bottom: 5 }}
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
                  label={{
                    value: "kg CO₂",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString()
                  }
                />
                <Line
                  type="monotone"
                  dataKey="emission"
                  stroke="#4ade80"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/*cat here*/}
      <Cat emissionLevel={todaysTotalEmission} />
    </div>
  );
}
