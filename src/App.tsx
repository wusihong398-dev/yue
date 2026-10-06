import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DiscoveryFilters } from './components/DiscoveryFilters';
import { UserCard } from './components/UserCard';
import { UserDetailModal } from './components/UserDetailModal';
import { ChatModal } from './components/ChatModal';
import { MeetupSquare } from './components/MeetupSquare';
import { CreateActivityModal } from './components/CreateActivityModal';
import { VerificationModal } from './components/VerificationModal';
import { VipRechargeModal } from './components/VipRechargeModal';
import { AppIconShowcase } from './components/AppIconShowcase';
import { ShareCardModal } from './components/ShareCardModal';
import { InstallModal } from './components/InstallModal';
import { ProfileCenter } from './components/ProfileCenter';
import { ToastContainer } from './components/ToastContainer';
import {
  Compass,
  CalendarHeart,
  MessageCircle,
  User,
  Smartphone,
  Monitor,
  Sparkles,
  Info,
  ShieldCheck,
  Crown,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    filteredUsers,
    currentUser,
    setShowVipModal,
    setShowIconShowcaseModal,
    showInstallModal,
    setShowInstallModal,
  } = useApp();

  const [isMobileFrame, setIsMobileFrame] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 transition-all ${
        isMobileFrame ? 'flex flex-col items-center justify-start py-6 bg-zinc-200/90 dark:bg-black/95' : ''
      }`}
    >
      {/* Toast notifications */}
      <ToastContainer />

      {/* When in mobile frame mode, show top simulator control pill */}
      {isMobileFrame && (
        <div className="mb-4 flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 shadow-md text-xs">
          <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
            <Smartphone className="w-4 h-4 text-rose-500" />
            <span>手机模拟器视图 (iPhone 16 Pro 视口)</span>
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">|</span>
          <button
            onClick={() => setIsMobileFrame(false)}
            className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline font-bold"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>切换为桌面宽屏模式</span>
          </button>
        </div>
      )}

      {/* Main Container (can be mobile frame or wide screen) */}
      <div
        className={`w-full flex flex-col transition-all bg-white dark:bg-zinc-900 shadow-2xl ${
          isMobileFrame
            ? 'max-w-[420px] min-h-[90vh] rounded-[48px] phone-device-case overflow-hidden relative border-4 border-zinc-700/80'
            : 'min-h-screen'
        }`}
      >
        {/* Dynamic Island & Phone Status Bar (Only in Mobile Frame) */}
        {isMobileFrame && (
          <div className="bg-white dark:bg-zinc-900 pt-3 pb-1 px-7 flex items-center justify-between text-[11px] font-bold text-zinc-800 dark:text-zinc-200 select-none border-b border-zinc-100/50 dark:border-zinc-800/50">
            <span>09:41</span>
            {/* Dynamic Island Pill */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 text-[9px] text-zinc-400 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span className="px-1 py-0.2 rounded-sm border border-zinc-400 dark:border-zinc-600 text-[9px]">
                100%
              </span>
            </div>
          </div>
        )}

        {/* Top Header */}
        <Header />

        {/* System Feature Banner */}
        <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 border-b border-rose-100/60 px-4 py-2 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="flex items-center gap-1 font-bold text-rose-700 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              会员规则设定:
            </span>
            <span className="text-zinc-600 truncate">
              {currentUser.memberTier === 'normal' ? (
                <>
                  当前为<strong>【普通会员】</strong>：微信号隐藏（消耗30积分解锁）·
                  私聊扣5积分/条（剩余 {currentUser.points} 积分）
                </>
              ) : (
                <>
                  当前为<strong className="text-amber-700">【{currentUser.memberTier === 'svip' ? '至尊SVIP' : '黄金VIP'}】</strong>：微信号免费直接看 ·
                  私聊免积分无限畅聊！
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowVipModal(true)}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 underline transition"
            >
              规则测试切换
            </button>

            {/* Desktop / Mobile frame toggle */}
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[11px] text-zinc-600 hover:text-zinc-900 transition"
              title="切换手机模拟模式/桌面全屏模式"
            >
              {isMobileFrame ? (
                <>
                  <Monitor className="w-3 h-3" />
                  <span>宽屏</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3" />
                  <span>手机端</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Body View */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-24">
          {/* Tab 1: Discover / Search */}
          {activeTab === 'discover' && (
            <div>
              <DiscoveryFilters />

              {/* Users Grid */}
              {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/80 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">未找到符合该筛选条件的用户</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    建议放宽年龄范围、取消老乡或职业限制，或者切换为“附近的人”探索更多同城缘分。
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Meetup Activity Wall */}
          {activeTab === 'meetup' && <MeetupSquare />}

          {/* Tab 3: Chat List */}
          {activeTab === 'chat' && (
            <div className="py-2">
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-zinc-900">私聊消息与联系人</h2>
                <p className="text-xs text-zinc-500 mt-1">
                  普通会员发送消息消耗5积分/条，VIP无限次免费畅聊
                </p>
              </div>

              {/* Matched users list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.slice(0, 6).map((u) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Profile & Center */}
          {activeTab === 'profile' && <ProfileCenter />}
        </main>

        {/* Mobile / Screen Bottom Floating Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-rose-100 dark:border-zinc-800 shadow-xl max-w-6xl mx-auto">
          <div className="grid grid-cols-4 h-16 px-2">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex flex-col items-center justify-center transition ${
                activeTab === 'discover'
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span className="text-[11px]">缘分查找</span>
            </button>

            <button
              onClick={() => setActiveTab('meetup')}
              className={`flex flex-col items-center justify-center transition relative ${
                activeTab === 'meetup'
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="relative">
                <CalendarHeart className="w-5 h-5 mb-0.5" />
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500" />
              </div>
              <span className="text-[11px]">约会广场</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center justify-center transition relative ${
                activeTab === 'chat'
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className="relative">
                <MessageCircle className="w-5 h-5 mb-0.5" />
                <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-rose-500 text-white">
                  1
                </span>
              </div>
              <span className="text-[11px]">消息互动</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center transition ${
                activeTab === 'profile'
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[11px]">我的中心</span>
            </button>
          </div>

          {/* Phone Home Indicator Bar (Mobile Frame) */}
          {isMobileFrame && (
            <div className="pb-1.5 pt-0.5 flex justify-center bg-white/95 dark:bg-zinc-900/95">
              <div className="w-28 h-1 bg-zinc-700 dark:bg-zinc-300 rounded-full" />
            </div>
          )}
        </nav>

        {/* Global Modals */}
        <UserDetailModal />
        <ChatModal />
        <CreateActivityModal />
        <VerificationModal />
        <VipRechargeModal />
        <AppIconShowcase />
        <ShareCardModal />
        <InstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
