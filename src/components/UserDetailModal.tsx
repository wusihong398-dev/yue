import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Home,
  ShieldCheck,
  Sparkles,
  Lock,
  Unlock,
  Copy,
  Check,
  MessageCircle,
  Heart,
  Gift,
  Briefcase,
  GraduationCap,
  Sparkle,
} from 'lucide-react';

export const UserDetailModal: React.FC = () => {
  const {
    users,
    selectedUserId,
    setSelectedUserId,
    currentUser,
    unlockWeChat,
    setActiveChatUserId,
    toggleLikeUser,
    likedUserIds,
    sendGift,
    showToast,
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedUserId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedUserId]);

  if (!selectedUserId) return null;
  const user = users.find((u) => u.id === selectedUserId);
  if (!user) return null;

  const isLiked = likedUserIds.has(user.id);
  const isHometownMatch =
    user.hometownCity === currentUser.hometownCity ||
    user.hometownProvince === currentUser.hometownProvince;
  const isVip = user.memberTier === 'vip';
  const isSvip = user.memberTier === 'svip';

  const handleCopy = () => {
    navigator.clipboard.writeText(user.wechatId);
    setCopied(true);
    showToast('微信号已复制', user.wechatId, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayVoice = () => {
    setIsPlayingVoice(true);
    showToast('正在播放语音介绍', `“哈喽！很高兴认识你，平时喜欢在${user.currentCity}探店和户外，期待真诚交流~”`, 'info');
    setTimeout(() => setIsPlayingVoice(false), 3800);
  };

  const handleStartChat = () => {
    setSelectedUserId(null);
    setActiveChatUserId(user.id);
  };

  const giftList = [
    { name: '一朵玫瑰', icon: '🌹', cost: 5 },
    { name: '生椰拿铁', icon: '☕', cost: 15 },
    { name: '心动告白熊', icon: '🧸', cost: 30 },
    { name: '星空烟花', icon: '🎆', cost: 50 },
    { name: '浪漫梦幻城堡', icon: '🏰', cost: 100 },
  ];

  return (
    <div
      onClick={() => setSelectedUserId(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border transition-all animate-in zoom-in-95 ${
          isSvip
            ? 'border-purple-400 svip-purple-flow-border ring-2 ring-purple-400/50'
            : isVip
            ? 'border-amber-400 vip-gold-flow-border ring-2 ring-amber-400/50'
            : 'border-rose-100 dark:border-zinc-800'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedUserId(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition shadow-md"
          title="关闭资料卡 (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-0">
          {/* Photos Header Carousel */}
          <div className="relative aspect-4/3 sm:aspect-16/9 bg-zinc-900 w-full">
            <img
              src={user.photos[activePhotoIdx] || user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Photo selector thumbnails */}
            {user.photos.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                {user.photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition ${
                      activePhotoIdx === i
                        ? 'border-rose-500 scale-105 shadow-md'
                        : 'border-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p}
                      alt="thumb"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Header info overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                距离你 {user.distanceKm < 1 ? '<1 km' : `${user.distanceKm} km`}
              </span>
              {user.isOnline && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                  ● 正在线上
                </span>
              )}
            </div>
          </div>

          {/* User Details Body */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* Title & Key Specs */}
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-zinc-900">{user.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    {user.gender === 'female' ? '女 ♀' : '男 ♂'} · {user.age}岁
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700">
                    {user.height} cm
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                    匹配度 {user.matchScore}%
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 mt-1.5">
                  <Briefcase className="w-4 h-4 text-zinc-400" />
                  <span>{user.occupation}</span>
                </div>
              </div>

              {/* Heart button */}
              <button
                onClick={() => toggleLikeUser(user.id)}
                className={`p-3 rounded-2xl border transition active:scale-95 ${
                  isLiked
                    ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/30 shadow-md'
                    : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Voice Greeting Player Bar */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-zinc-800 dark:to-zinc-800/90 p-3 rounded-2xl border border-rose-200/80 dark:border-zinc-700 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-sm ${
                    isPlayingVoice
                      ? 'bg-rose-600 ring-4 ring-rose-200 dark:ring-rose-900/60 animate-pulse'
                      : 'bg-gradient-to-r from-rose-500 to-pink-600'
                  }`}
                >
                  {isPlayingVoice ? '🔊' : '▶'}
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <span>听TA的原声交友问候</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                      0:12
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    “哈喽！很高兴认识你，平时在{user.currentCity}工作生活...”
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlayVoice}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-700 hover:bg-rose-50 dark:hover:bg-zinc-600 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-zinc-600 shadow-xs transition"
              >
                {isPlayingVoice ? '播放中...' : '点击试听'}
              </button>
            </div>

            {/* Official Verification Badges Bar */}
            <div className="bg-gradient-to-r from-emerald-50/60 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>官方真实安全审核中心</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-white/80 dark:bg-zinc-800 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-700 flex items-center gap-2">
                  <Sparkles
                    className={`w-4 h-4 ${
                      user.verification.isRealPerson ? 'text-amber-500' : 'text-zinc-300 dark:text-zinc-600'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">真人活体审核</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {user.verification.isRealPerson ? '已实人面部核验' : '未核验'}
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-zinc-800 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-700 flex items-center gap-2">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      user.verification.isRealName ? 'text-emerald-600' : 'text-zinc-300 dark:text-zinc-600'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">公安实名认证</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {user.verification.isRealName ? '身份证真实一致' : '未认证'}
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-zinc-800 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-500" />
                  <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">职业行业认证</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {user.verification.isCareerVerified ? '在职名片已审核' : '自主填写'}
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-zinc-800 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">学信网学历认证</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {user.verification.isEduVerified ? '本科/硕博可查' : '自主填写'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* City & Hometown Match Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 mb-1">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>现居工作城市</span>
                </div>
                <div className="text-sm font-black text-zinc-900">
                  {user.currentProvince} · {user.currentCity}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  距离你当前城市约 {user.distanceKm} 公里
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border ${
                  isHometownMatch
                    ? 'bg-amber-50/80 border-amber-300'
                    : 'bg-zinc-50 border-zinc-200/80'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 mb-1">
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>籍贯出生地</span>
                  {isHometownMatch && (
                    <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full">
                      老乡同乡！
                    </span>
                  )}
                </div>
                <div className="text-sm font-black text-zinc-900">
                  {user.hometownProvince} · {user.hometownCity}
                </div>
                <div className="text-xs text-amber-800 mt-0.5">
                  {isHometownMatch
                    ? '与你同省/同市籍贯，聊聊家乡风土人情与美食吧！'
                    : '异乡打拼，同城相遇也是缘分'}
                </div>
              </div>
            </div>

            {/* WeChat Status & Unlock Rules */}
            <div className="bg-gradient-to-br from-rose-50/80 to-pink-50/60 rounded-3xl p-4 sm:p-5 border border-rose-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    微
                  </div>
                  <div>
                    <div className="text-sm font-black text-zinc-900">微信联系方式</div>
                    <div className="text-xs text-zinc-500">真实认证微信号，严谨防骚扰机制</div>
                  </div>
                </div>

                {user.wechatUnlocked ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    已解锁查看
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    未解锁
                  </span>
                )}
              </div>

              {user.wechatUnlocked ? (
                <div className="bg-white rounded-2xl p-3 border border-emerald-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">微信号:</span>
                    <span className="text-base font-mono font-black text-emerald-800">
                      {user.wechatId}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制' : '一键复制微信号'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-2xl p-3 border border-rose-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">微信号:</span>
                      <span className="text-sm font-mono text-zinc-400 font-bold">
                        wx*********
                      </span>
                    </div>

                    <button
                      onClick={() => unlockWeChat(user.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                        currentUser.memberTier !== 'normal'
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'bg-rose-600 hover:bg-rose-700 text-white'
                      }`}
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>
                        {currentUser.memberTier !== 'normal'
                          ? 'VIP免费直看微信号'
                          : '消耗 30 积分解锁微信号'}
                      </span>
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    💡 <span className="font-semibold text-zinc-700">会员查看规则说明：</span>
                    普通会员默认隐藏其他用户微信号，可通过消耗30积分单次解锁；黄金VIP与至尊SVIP会员享微信号无限次免费直看特权！
                  </p>
                </div>
              )}
            </div>

            {/* Bio & Dating Expectations */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  关于我 / 个人介绍
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80">
                  {user.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  交友期望 / 心仪的TA
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80">
                  {user.datingExpectation}
                </p>
              </div>

              {/* Tags & Interests */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  兴趣爱好 & 个性标签
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.tags.concat(user.interests).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200/60"
                    >
                      #{item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Send Gift Box Panel */}
            {showGiftPanel && (
              <div className="bg-amber-50/60 rounded-3xl p-4 border border-amber-200 animate-in fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <span>赠送心动虚拟礼物（提升好感度，增加微信通过率）</span>
                  </div>
                  <span className="text-xs text-amber-800">积分余额: {currentUser.points}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {giftList.map((g) => (
                    <button
                      key={g.name}
                      onClick={() => {
                        sendGift(user.id, g.name, g.cost, g.icon);
                        setShowGiftPanel(false);
                      }}
                      className="bg-white hover:bg-amber-100/60 p-2.5 rounded-2xl border border-amber-200 flex flex-col items-center text-center transition group active:scale-95"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">
                        {g.icon}
                      </span>
                      <span className="text-xs font-bold text-zinc-800 mt-1">{g.name}</span>
                      <span className="text-[10px] text-amber-600 font-bold">{g.cost} 积分</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 bg-white border-t border-zinc-100 flex items-center gap-2.5">
          <button
            onClick={() => setShowGiftPanel(!showGiftPanel)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center transition"
            title="送礼物"
          >
            <Gift className="w-5 h-5 text-amber-600" />
          </button>

          <button
            onClick={handleStartChat}
            className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:brightness-105 text-white font-bold text-sm shadow-rose-500/30 shadow-lg flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              发起私聊 {currentUser.memberTier === 'normal' ? '(消耗5积分/条)' : '(VIP免积分)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
