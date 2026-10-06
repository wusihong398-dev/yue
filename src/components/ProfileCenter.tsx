import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Home,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Coins,
  Crown,
  CalendarCheck,
  Edit3,
  Clock,
  Check,
  X,
  CreditCard,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { CHINA_PROVINCES, OCCUPATION_CATEGORIES } from '../data/chinaCities';

export const ProfileCenter: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    setShowVipModal,
    setShowVerificationModal,
    checkInToday,
    transactions,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [name, setName] = useState(currentUser.name);
  const [gender, setGender] = useState(currentUser.gender);
  const [age, setAge] = useState(currentUser.age);
  const [height, setHeight] = useState(currentUser.height);
  const [currentProvince, setCurrentProvince] = useState(currentUser.currentProvince);
  const [currentCity, setCurrentCity] = useState(currentUser.currentCity);
  const [hometownProvince, setHometownProvince] = useState(currentUser.hometownProvince);
  const [hometownCity, setHometownCity] = useState(currentUser.hometownCity);
  const [occupation, setOccupation] = useState(currentUser.occupation);
  const [occupationCategory, setOccupationCategory] = useState(currentUser.occupationCategory);
  const [wechatId, setWechatId] = useState(currentUser.wechatId);
  const [bio, setBio] = useState(currentUser.bio);

  const curProvData = CHINA_PROVINCES.find((p) => p.province === currentProvince);
  const homeProvData = CHINA_PROVINCES.find((p) => p.province === hometownProvince);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      gender,
      age,
      height,
      currentProvince,
      currentCity,
      hometownProvince,
      hometownCity,
      occupation,
      occupationCategory,
      wechatId,
      bio,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-rose-100 shadow-md"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-rose-600 text-white shadow-xs hover:bg-rose-700 transition"
                title="修改资料"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                  {currentUser.name}
                </h2>

                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    currentUser.memberTier === 'svip'
                      ? 'bg-purple-100 text-purple-800'
                      : currentUser.memberTier === 'vip'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  <Crown className="w-3 h-3 text-amber-600" />
                  <span>
                    {currentUser.memberTier === 'svip'
                      ? '至尊SVIP'
                      : currentUser.memberTier === 'vip'
                      ? '黄金VIP'
                      : '普通会员'}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-600 mt-1 flex-wrap">
                <span>{currentUser.gender === 'male' ? '男 ♂' : '女 ♀'}</span>
                <span>·</span>
                <span>{currentUser.age}岁</span>
                <span>·</span>
                <span>{currentUser.height}cm</span>
                <span>·</span>
                <span>{currentUser.occupation}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 mt-2 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-zinc-700">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  现居城市: {currentUser.currentCity}
                </span>
                <span className="flex items-center gap-1 font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                  籍贯城市: {currentUser.hometownProvince}·{currentUser.hometownCity}
                </span>
                <span className="flex items-center gap-1 font-mono text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded-md">
                  微信: {currentUser.wechatId}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>编辑注册资料</span>
            </button>

            <button
              onClick={() => setShowVipModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-md transition hover:brightness-105"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>
                {currentUser.memberTier === 'normal' ? '升级VIP畅聊免积分' : '会员特权管理'}
              </span>
            </button>
          </div>
        </div>

        {/* Bio summary */}
        <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-600 leading-relaxed bg-zinc-50/70 p-3.5 rounded-2xl">
          <span className="font-bold text-zinc-800">交友自我介绍：</span>
          {currentUser.bio}
        </div>
      </div>

      {/* Grid: Points Wallet & Verification Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wallet Card */}
        <div className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-sm text-zinc-900">交友积分钱包</h3>
              </div>
              <button
                onClick={checkInToday}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${
                  currentUser.hasCheckedInToday
                    ? 'bg-zinc-100 text-zinc-400 cursor-default'
                    : 'bg-amber-500 text-white hover:bg-amber-600 animate-pulse'
                }`}
              >
                {currentUser.hasCheckedInToday ? '今日已签到' : '每日签到领+25分'}
              </button>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-black text-zinc-900">{currentUser.points}</span>
              <span className="text-xs text-zinc-500">可用积分</span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              普通会员发消息消耗 <strong>5积分/条</strong>，解锁他人微信号消耗{' '}
              <strong>30积分/个</strong>。VIP会员享微信号无限次免费直看、私聊免积分畅聊！
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-xs text-zinc-500">签到或充值增加可用积分</span>
            <button
              onClick={() => setShowVipModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold transition border border-amber-200"
            >
              积分充值 / 规则切换
            </button>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-sm text-zinc-900">实名与真人认证状态</h3>
              </div>
            </div>

            <div className="space-y-2.5 my-2">
              <div className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className={`w-4 h-4 ${
                      currentUser.verification.isRealPerson ? 'text-amber-500' : 'text-zinc-400'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-zinc-800">真人活体审核</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">头像人脸一致性核验</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    currentUser.verification.isRealPerson
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {currentUser.verification.isRealPerson ? '已认证 ✓' : '未认证'}
                </span>
              </div>

              <div className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      currentUser.verification.isRealName ? 'text-emerald-600' : 'text-zinc-400'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-zinc-800">公安实名认证</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">身份证件核验</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    currentUser.verification.isRealName
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {currentUser.verification.isRealName ? '已认证 ✓' : '未认证'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-xs text-zinc-500">双重认证立领 +250 积分</span>
            <button
              onClick={() => setShowVerificationModal(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition border border-emerald-200"
            >
              {currentUser.verification.isRealPerson && currentUser.verification.isRealName
                ? '查看认证凭证'
                : '立即去认证'}
            </button>
          </div>
        </div>
      </div>

      {/* Point Transactions History */}
      <div className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            <h3 className="font-black text-sm text-zinc-900">积分变动明细</h3>
          </div>
          <span className="text-xs text-zinc-400">实时流水记录</span>
        </div>

        <div className="divide-y divide-zinc-100 text-xs">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-zinc-800">{tx.title}</div>
                <div className="text-[10px] text-zinc-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
              <div
                className={`font-mono font-bold text-sm ${
                  tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount} 分
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Registration Info Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100 max-h-[92vh]">
            <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <h3 className="text-base font-black text-zinc-900">
                编辑注册时填写的交友与城市资料
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-zinc-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">昵称 / 姓名 *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">性别 *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  >
                    <option value="male">男生 ♂</option>
                    <option value="female">女生 ♀</option>
                  </select>
                </div>
              </div>

              {/* Current City and Province */}
              <div className="bg-rose-50/60 rounded-2xl p-3 border border-rose-100">
                <div className="text-xs font-bold text-rose-900 mb-2">现居城市（现在所在的城市）</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">现居省份</label>
                    <select
                      value={currentProvince}
                      onChange={(e) => {
                        const prov = e.target.value;
                        setCurrentProvince(prov);
                        const match = CHINA_PROVINCES.find((p) => p.province === prov);
                        if (match) setCurrentCity(match.cities[0]);
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-rose-500"
                    >
                      {CHINA_PROVINCES.map((p) => (
                        <option key={p.province} value={p.province}>
                          {p.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">现居城市</label>
                    <select
                      value={currentCity}
                      onChange={(e) => setCurrentCity(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-rose-500"
                    >
                      {curProvData?.cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Hometown City and Province */}
              <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-200">
                <div className="text-xs font-bold text-amber-900 mb-2">籍贯城市（同乡老乡匹配源）</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">籍贯省份</label>
                    <select
                      value={hometownProvince}
                      onChange={(e) => {
                        const prov = e.target.value;
                        setHometownProvince(prov);
                        const match = CHINA_PROVINCES.find((p) => p.province === prov);
                        if (match) setHometownCity(match.cities[0]);
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-rose-500"
                    >
                      {CHINA_PROVINCES.map((p) => (
                        <option key={p.province} value={p.province}>
                          {p.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">籍贯城市</label>
                    <select
                      value={hometownCity}
                      onChange={(e) => setHometownCity(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-rose-500"
                    >
                      {homeProvData?.cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Profession & WeChat */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">具体职业 *</label>
                  <input
                    type="text"
                    required
                    placeholder="如：互联网产品经理"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">职业领域</label>
                  <select
                    value={occupationCategory}
                    onChange={(e) => setOccupationCategory(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  >
                    {OCCUPATION_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">年龄</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">身高(cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">微信号 *</label>
                  <input
                    type="text"
                    required
                    value={wechatId}
                    onChange={(e) => setWechatId(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">个人介绍与择友标准</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-rose-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-bold hover:bg-zinc-200 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold shadow-md hover:brightness-105 transition"
                >
                  保存更新资料
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
