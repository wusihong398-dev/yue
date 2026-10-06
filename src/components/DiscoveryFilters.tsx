import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Compass,
  Building2,
  Users,
  Home,
  SlidersHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { CHINA_PROVINCES, OCCUPATION_CATEGORIES, POPULAR_CITIES } from '../data/chinaCities';

export const DiscoveryFilters: React.FC = () => {
  const { filterOptions, setFilterOptions, resetFilters, currentUser } = useApp();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Province selector helper
  const selectedProvinceData = CHINA_PROVINCES.find(
    (p) => p.province === filterOptions.targetProvince
  );

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-rose-100/70 mb-6">
      {/* Top Mode Selection: Nearby, Same City, Cross-Province, Hometown */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3.5 border-b border-zinc-100">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() =>
              setFilterOptions((prev) => ({
                ...prev,
                mode: 'nearby',
                targetCity: currentUser.currentCity,
              }))
            }
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              filterOptions.mode === 'nearby'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/20 shadow-md'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>附近的人</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">GPS</span>
          </button>

          <button
            onClick={() =>
              setFilterOptions((prev) => ({
                ...prev,
                mode: 'city',
                targetCity: currentUser.currentCity,
              }))
            }
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              filterOptions.mode === 'city'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/20 shadow-md'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>同城推荐 ({currentUser.currentCity.replace('市', '')})</span>
          </button>

          <button
            onClick={() => {
              setFilterOptions((prev) => ({
                ...prev,
                mode: 'province_city',
              }));
              setShowAdvanced(true);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              filterOptions.mode === 'province_city'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/20 shadow-md'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>跨省/指定城市</span>
            {filterOptions.targetCity && filterOptions.mode === 'province_city' && (
              <span className="text-[10px] bg-white/30 px-1 rounded">
                {filterOptions.targetCity.replace('市', '')}
              </span>
            )}
          </button>

          <button
            onClick={() =>
              setFilterOptions((prev) => ({
                ...prev,
                mode: 'hometown',
              }))
            }
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              filterOptions.mode === 'hometown'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/20 shadow-md'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>老乡匹配 ({currentUser.hometownCity.replace('市', '')})</span>
            <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold">
              同乡
            </span>
          </button>
        </div>

        {/* Search keyword input & Filter expand button */}
        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜名字、职业、爱好..."
              value={filterOptions.searchKeyword}
              onChange={(e) =>
                setFilterOptions((prev) => ({ ...prev, searchKeyword: e.target.value }))
              }
              className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-rose-500 focus:bg-white"
            />
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              showAdvanced
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>筛选条件</span>
            {showAdvanced ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Quick Filter Bar: Gender, Verification, Sort */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-3">
        {/* Gender toggles */}
        <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-xl">
          <button
            onClick={() => setFilterOptions((prev) => ({ ...prev, gender: 'all' }))}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterOptions.gender === 'all'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            全部性别
          </button>
          <button
            onClick={() => setFilterOptions((prev) => ({ ...prev, gender: 'female' }))}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterOptions.gender === 'female'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-zinc-600 hover:text-rose-600'
            }`}
          >
            只看女生 ♀
          </button>
          <button
            onClick={() => setFilterOptions((prev) => ({ ...prev, gender: 'male' }))}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterOptions.gender === 'male'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-sky-600'
            }`}
          >
            只看男生 ♂
          </button>
        </div>

        {/* Verification Checkboxes */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setFilterOptions((prev) => ({ ...prev, onlyRealPerson: !prev.onlyRealPerson }))
            }
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border transition ${
              filterOptions.onlyRealPerson
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300'
            }`}
          >
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>仅看真人认证</span>
            {filterOptions.onlyRealPerson && <Check className="w-3 h-3 text-rose-600 ml-0.5" />}
          </button>

          <button
            onClick={() =>
              setFilterOptions((prev) => ({ ...prev, onlyRealName: !prev.onlyRealName }))
            }
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border transition ${
              filterOptions.onlyRealName
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>仅看实名审核</span>
            {filterOptions.onlyRealName && <Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">排序:</span>
          <select
            value={filterOptions.sortBy}
            onChange={(e) =>
              setFilterOptions((prev) => ({
                ...prev,
                sortBy: e.target.value as any,
              }))
            }
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs font-medium text-zinc-700 focus:outline-rose-500"
          >
            <option value="distance">距离最近 📍</option>
            <option value="active">在线活跃优先 🟢</option>
            <option value="match">匹配契合度高 ⭐</option>
          </select>
        </div>
      </div>

      {/* Advanced Filter Collapse Box */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-zinc-100 space-y-4 animate-in fade-in slide-in-from-top-2">
          {/* Province & City Specific Selector */}
          <div className="bg-rose-50/50 rounded-2xl p-3 border border-rose-100">
            <div className="text-xs font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>精确指定查找省份与城市</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-zinc-500 block mb-1">目标省份 / 直辖市</label>
                <select
                  value={filterOptions.targetProvince}
                  onChange={(e) => {
                    const newProv = e.target.value;
                    const found = CHINA_PROVINCES.find((p) => p.province === newProv);
                    setFilterOptions((prev) => ({
                      ...prev,
                      mode: 'province_city',
                      targetProvince: newProv,
                      targetCity: found ? found.cities[0] : '',
                    }));
                  }}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 focus:outline-rose-500"
                >
                  {CHINA_PROVINCES.map((p) => (
                    <option key={p.province} value={p.province}>
                      {p.province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 block mb-1">目标城市</label>
                <select
                  value={filterOptions.targetCity}
                  onChange={(e) => {
                    setFilterOptions((prev) => ({
                      ...prev,
                      mode: 'province_city',
                      targetCity: e.target.value,
                    }));
                  }}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 focus:outline-rose-500"
                >
                  {selectedProvinceData?.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Popular quick cities */}
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-zinc-500">热门热门速选:</span>
              {POPULAR_CITIES.slice(0, 8).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilterOptions((prev) => ({
                      ...prev,
                      mode: 'province_city',
                      targetCity: c,
                    }));
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition ${
                    filterOptions.targetCity === c
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-rose-300'
                  }`}
                >
                  {c.replace('市', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Age range & Occupation Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-medium">
                  年龄范围: {filterOptions.minAge} 岁 ~ {filterOptions.maxAge} 岁
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="18"
                  max="35"
                  value={filterOptions.minAge}
                  onChange={(e) =>
                    setFilterOptions((prev) => ({
                      ...prev,
                      minAge: Math.min(Number(e.target.value), prev.maxAge - 1),
                    }))
                  }
                  className="w-full accent-rose-500"
                />
                <input
                  type="range"
                  min="26"
                  max="50"
                  value={filterOptions.maxAge}
                  onChange={(e) =>
                    setFilterOptions((prev) => ({
                      ...prev,
                      maxAge: Math.max(Number(e.target.value), prev.minAge + 1),
                    }))
                  }
                  className="w-full accent-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-600 font-medium block mb-1.5">职业领域筛选</label>
              <select
                value={filterOptions.occupationCategory}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    occupationCategory: e.target.value,
                  }))
                }
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 focus:outline-rose-500"
              >
                {OCCUPATION_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters action */}
          <div className="flex justify-end pt-1">
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-600 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>重置全部筛选条件</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
