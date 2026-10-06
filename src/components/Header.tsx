import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLogo } from './AppLogo';
import {
  MapPin,
  Coins,
  Crown,
  CalendarCheck,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Sparkles,
  Share2,
  Moon,
  Sun,
  Zap,
  Download,
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/chinaCities';

export const Header: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    setShowVipModal,
    setShowVerificationModal,
    setShowIconShowcaseModal,
    setShowShareCardModal,
    setShowInstallModal,
    isDarkMode,
    toggleDarkMode,
    checkInToday,
    setFilterOptions,
    showToast,
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const handleSelectCity = (city: string) => {
    updateCurrentUser({ currentCity: city });
    setFilterOptions((prev) => ({
      ...prev,
      targetCity: city,
    }));
    setCityDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & App Icon Quick Click */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setShowIconShowcaseModal(true)}
            className="cursor-pointer group flex items-center gap-2 transition hover:opacity-95"
            title="点击查看“约在一起”软件图标与设计规范"
          >
            <AppLogo size="md" subtitle="同城·全国·真实交友" />
          </div>

          {/* Quick city locator button */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50/80 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition border border-rose-200/60"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>现居: {currentUser.currentCity}</span>
              <ChevronDown className="w-3 h-3 text-rose-400" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-rose-100 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="text-xs font-bold text-zinc-500 mb-2 px-1">切换当前所在城市</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {POPULAR_CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleSelectCity(c)}
                      className={`text-xs py-1.5 px-2 rounded-lg font-medium transition ${
                        currentUser.currentCity === c
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-zinc-50 text-zinc-700 hover:bg-rose-50 hover:text-rose-600'
                      }`}
                    >
                      {c.replace('市', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions, Wallet, VIP, Check-in */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily check-in button */}
          <button
            onClick={checkInToday}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs ${
              currentUser.hasCheckedInToday
                ? 'bg-zinc-100 text-zinc-400 cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-105 active:scale-95 animate-pulse'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>{currentUser.hasCheckedInToday ? '已签到' : '签到领+25分'}</span>
          </button>

          {/* Points Wallet */}
          <button
            onClick={() => setShowVipModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition"
            title="点击查看积分余额与明细"
          >
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>{currentUser.points} 积分</span>
          </button>

          {/* 规则测试身份秒级切换开关 (直达底层逻辑绑定) */}
          <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-full border border-zinc-200/80 dark:border-zinc-700 shadow-inner">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 pl-2 pr-1 flex items-center gap-0.5">
              <Zap className="w-3 h-3 text-amber-500" />
              测试:
            </span>
            <button
              onClick={() => {
                updateCurrentUser({ memberTier: 'normal' });
                showToast('已切换为【普通会员】', '微信号已脱敏打码为 wx****88，发私聊每次扣除 5 积分', 'info');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                currentUser.memberTier === 'normal'
                  ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              普通会员
            </button>
            <button
              onClick={() => {
                updateCurrentUser({ memberTier: 'vip' });
                showToast('已切换为【黄金VIP】', '微信号免费免积分直接看，私聊发消息 0 积分免费畅聊！', 'success');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 ${
                currentUser.memberTier === 'vip'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'text-amber-700 dark:text-amber-400 hover:text-amber-600'
              }`}
            >
              👑 黄金VIP
            </button>
            <button
              onClick={() => {
                updateCurrentUser({ memberTier: 'svip' });
                showToast('已切换为【至尊SVIP】', '全站置顶曝光，微信号直接看，无限畅聊！', 'success');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 ${
                currentUser.memberTier === 'svip'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                  : 'text-purple-700 dark:text-purple-400 hover:text-purple-600'
              }`}
            >
              ⚡ SVIP
            </button>
          </div>

          {/* Member Tier Badge */}
          <button
            onClick={() => setShowVipModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
              currentUser.memberTier === 'svip'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-purple-500/20 shadow-md svip-purple-flow-border'
                : currentUser.memberTier === 'vip'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-amber-500/20 shadow-md vip-gold-flow-border'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <Crown
              className={`w-3.5 h-3.5 ${
                currentUser.memberTier !== 'normal' ? 'text-yellow-200' : 'text-zinc-500'
              }`}
            />
            <span>
              {currentUser.memberTier === 'svip'
                ? '至尊SVIP'
                : currentUser.memberTier === 'vip'
                ? '黄金VIP'
                : '普通会员'}
            </span>
          </button>

          {/* Verification Badge / Action */}
          <button
            onClick={() => setShowVerificationModal(true)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              currentUser.verification.isRealPerson && currentUser.verification.isRealName
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {currentUser.verification.isRealPerson && currentUser.verification.isRealName
                ? '双重实名已核验'
                : '去实名送150分'}
            </span>
          </button>

          {/* Share Poster Card */}
          <button
            onClick={() => setShowShareCardModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition"
            title="生成个人交友名片海报"
          >
            <Share2 className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">名片海报</span>
          </button>

          {/* Software Icon preview trigger */}
          <button
            onClick={() => setShowIconShowcaseModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition"
            title="查看软件图标生成与展示"
          >
            <Smartphone className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">软件图标</span>
          </button>

          {/* Install on Phone / APK button */}
          <button
            onClick={() => setShowInstallModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-105 text-white text-xs font-bold transition shadow-sm shadow-rose-500/20 active:scale-95"
            title="手机扫码测试 / APK 安装包"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">安装APK/扫码</span>
            <span className="sm:hidden">APK</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
            title={isDarkMode ? '切换日间模式' : '切换暗黑夜间模式'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
