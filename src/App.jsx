import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Sparkles,
  Target,
  Coins,
  DollarSign,
  Ticket as Cricket,
} from "lucide-react";
import { OutcomeCard } from "./components/OutcomeCard";

function App() {
  const [oddA, setOddA] = useState("");
  const [oddB, setOddB] = useState("");
  const [teamA, setTeamA] = useState("Mumbai Indians");
  const [teamB, setTeamB] = useState("Chennai Super Kings");
  const [usdRate, setUsdRate] = useState("82.50");
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);

  const iplTeams = [
    "Mumbai Indians",
    "Chennai Super Kings",
    "Royal Challengers Bangalore",
    "Kolkata Knight Riders",
    "Delhi Capitals",
    "Punjab Kings",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",
    "Gujarat Titans",
    "Lucknow Super Giants",
  ];

  const handleCalculate = () => {
    // Reset previous errors
    setError(null);
    setResults(null);
    setIsCalculating(true);

    try {
      const Oa = parseFloat(oddA);
      const Ob = parseFloat(oddB);
      const rate = parseFloat(usdRate);

      // More comprehensive validation
      if (isNaN(Oa) || isNaN(Ob) || Oa <= 0 || Ob <= 0) {
        throw new Error("Please enter valid positive odds for both teams.");
      }

      if (isNaN(rate) || rate <= 0) {
        throw new Error("Please enter a valid USD to INR rate.");
      }

      const baseAmount = rate * 25;

      let bonusEligibleOdd, hedgeOdd, bonusEligibleTeam, otherTeam;
      if (Oa < Ob) {
        bonusEligibleOdd = Oa;
        hedgeOdd = Ob;
        bonusEligibleTeam = teamA;
        otherTeam = teamB;
      } else {
        bonusEligibleOdd = Ob;
        hedgeOdd = Oa;
        bonusEligibleTeam = teamB;
        otherTeam = teamA;
      }

      const x = baseAmount / bonusEligibleOdd;
      const y = (bonusEligibleOdd / hedgeOdd) * x;
      const totalStake = x + y;

      const normalOutcome = baseAmount - totalStake;
      const singleBonusOutcome = baseAmount * 2 - totalStake;
      const bothBonusOutcome = baseAmount * 3 - totalStake;

      setTimeout(() => {
        setResults({
          bonusEligibleTeam,
          otherTeam,
          bonusEligibleOdd,
          hedgeOdd,
          x,
          y,
          totalStake,
          normalOutcome,
          singleBonusOutcome,
          bothBonusOutcome,
          baseAmount,
        });
        setIsCalculating(false);
      }, 800);
    } catch (err) {
      console.error("Calculation Error:", err);
      setError(err.message);
      setIsCalculating(false);
    }
  };

  // Error handling component
  const ErrorAlert = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center mb-4">
      <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
      <p className="font-medium">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen cricket-field-bg py-6 md:py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-8 md:mb-12 animate-fade-down">
          <div className="flex items-center justify-center mb-4">
            <div className="cricket-ball w-12 h-12 bg-red-600 rounded-full shadow-lg"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white ml-4 drop-shadow-lg">
              IPL Betting Calculator
            </h1>
          </div>
          <p className="text-lg text-white/90 drop-shadow">
            Calculate optimal stakes and maximize your returns
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-4 md:p-8 mb-8 animate-fade-up">
          {error && <ErrorAlert message={error} />}
          <div className="mb-6 md:mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              Current USD to INR Rate
            </label>
            <input
              type="number"
              step="0.01"
              value={usdRate}
              onChange={(e) => setUsdRate(e.target.value)}
              placeholder="Enter current USD to INR rate (e.g. 82.50)"
              className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            />
            <p className="text-sm text-gray-500 mt-2">
              Base amount: ${25} × {usdRate} INR ={" "}
              {(parseFloat(usdRate) * 25).toFixed(2)} INR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-600" />
                  Team A
                </label>
                <select
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  value={teamA}
                  onChange={(e) => setTeamA(e.target.value)}
                >
                  {iplTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={oddA}
                  onChange={(e) => setOddA(e.target.value)}
                  placeholder="Enter odds (e.g. 1.65)"
                  className="mt-2 w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-600" />
                  Team B
                </label>
                <select
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  value={teamB}
                  onChange={(e) => setTeamB(e.target.value)}
                >
                  {iplTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={oddB}
                  onChange={(e) => setOddB(e.target.value)}
                  placeholder="Enter odds (e.g. 2.00)"
                  className="mt-2 w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className={`mt-6 md:mt-8 w-full py-3 md:py-4 px-6 text-white font-semibold rounded-xl shadow-lg relative overflow-hidden group
              ${
                isCalculating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform transition-all duration-300 hover:scale-[1.02]"
              }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isCalculating ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Calculate Stakes
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {results && (
          <div className="space-y-6 md:space-y-8 animate-fade-up">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-4 md:p-8 mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600 animate-bounce" />
                Betting Strategy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-4 md:space-y-6">
                  <div className="p-4 rounded-xl bg-green-50/70">
                    <p className="text-sm font-medium text-gray-600">
                      Bonus-Eligible Team
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-green-900">
                      {results.bonusEligibleTeam}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50/70">
                    <p className="text-sm font-medium text-gray-600">
                      Stake Amount
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-green-900">
                      {results.x.toFixed(2)} INR
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50/70">
                    <p className="text-sm font-medium text-gray-600">Odds</p>
                    <p className="text-lg md:text-xl font-semibold text-green-900">
                      {results.bonusEligibleOdd.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="p-4 rounded-xl bg-emerald-50/70">
                    <p className="text-sm font-medium text-gray-600">
                      Hedge Team
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-emerald-900">
                      {results.otherTeam}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/70">
                    <p className="text-sm font-medium text-gray-600">
                      Stake Amount
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-emerald-900">
                      {results.y.toFixed(2)} INR
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/70">
                    <p className="text-sm font-medium text-gray-600">Odds</p>
                    <p className="text-lg md:text-xl font-semibold text-emerald-900">
                      {results.hedgeOdd.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl flex items-center">
                <Coins className="w-6 md:w-8 h-6 md:h-8 text-green-600 animate-bounce mr-4" />
                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    Total Investment Required
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-900">
                    {results.totalStake.toFixed(2)} INR
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Base amount: {results.baseAmount.toFixed(2)} INR (${25} ×{" "}
                    {parseFloat(usdRate).toFixed(2)})
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center text-white drop-shadow-lg">
              <Trophy className="w-6 md:w-8 h-6 md:h-8 mr-3 text-yellow-400 animate-bounce" />
              Potential Outcomes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <OutcomeCard
                title="Normal Outcome"
                amount={results.normalOutcome}
                Icon={ArrowRight}
              />
              <OutcomeCard
                title="Single Bonus"
                amount={results.singleBonusOutcome}
                Icon={Sparkles}
              />
              <OutcomeCard
                title="Both Bonus"
                amount={results.bothBonusOutcome}
                Icon={Trophy}
              />
            </div>
          </div>
        )}
        <div>
          <p className="text-center text-white/90 mt-8 md:text-xl text-lg">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/alokvns48"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Alok Pandey
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
