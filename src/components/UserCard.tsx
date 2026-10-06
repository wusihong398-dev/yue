import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  Unlock,
  Copy,
  Briefcase,
  Home,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface UserCardProps {
  user: UserProfile;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const {
    currentUser,
    unlockWeChat,
    setActiveChatUserId,
    setSelectedUserId,
    toggleLikeUser,
    likedUserIds,
    showToast,
  } = useApp();

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const isLiked = likedUserIds.has(user.id);
  const isHometownMatch =
    user.hometownCity === currentUser.hometownCity ||
    user.hometownProvince === currentUser.hometownProvince;

  const handleCopyWeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(user.wechatId);
    setCopied(true);
    showToast('微信号已复制到剪贴板', user.wechatId, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlockWeChat(user.id);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChatUserId(user.id);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % user.photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + user.photos.length) % user.photos.length);
  };

  const isVip = user.memberTier === 'vip';
  const isSvip = user.memberTier === 'svip';

  return (
    <div
      onClick={() => setSelectedUserId(user.id)}
      className={`group rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col relative ${
        isSvip
          ? 'bg-white dark:bg-zinc-900 border-2 border-purple-400/90 shadow-lg shadow-purple-500/20 ring-2 ring-purple-300/40'
          : isVip
          ? 'bg-white dark:bg-zinc-900 border-2 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-300/40'
          : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-xl hover:border-rose-300'
      }`}
    >
      {/* VIP Gold Shimmer Top Bar Tag */}
      {(isVip || isSvip) && (
        <div
          className={`absolute top-0 right-0 z-20 px-3 py-0.5 rounded-bl-2xl text-[10px] font-black tracking-wide text-white flex items-center gap-1 shadow-md ${
            isSvip
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
              : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500'
          }`}
        >
          <span className="text-yellow-200">👑</span>
          <span>{isSvip ? '至尊SVIP' : '黄金VIP'}</span>
        </div>
      )}

      {/* Top Media Section with Multiple Photos Carousel */}
      <div className="relative aspect-4/5 sm:aspect-1/1 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img
          src={user.photos[currentPhotoIdx] || user.avatar}
          alt={user.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient dark scrim for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35 pointer-events-none" />

        {/* Top Badges: Distance & Online status */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>
              {user.distanceKm < 1 ? '<1 km' : `${user.distanceKm} km`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {user.isOnline ? (
              <span className="flex items-center gap-1 px-2.5 py-0.8 rounded-full bg-emerald-500/85 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                在线
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-zinc-300 text-[10px]">
                {user.lastActive}
              </span>
            )}
          </div>
        </div>

        {/* Carousel indicators & switch arrows */}
        {user.photos.length > 1 && (
          <>
            <div className="absolute bottom-3 left-3 flex gap-1 z-10">
              {user.photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    currentPhotoIdx === i ? 'w-4 bg-white' : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
              title="上一张照片"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
              title="下一张照片"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Floating Verification Badges Overlay */}
        <div className="absolute top-12 left-3 flex flex-col gap-1 z-10">
          {user.verification.isRealPerson && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
              <span>真人实拍</span>
            </div>
          )}

          {user.verification.isRealName && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
              <span>实名认证</span>
            </div>
          )}
        </div>

        {/* Card Photo Bottom Title & Age & City */}
        <div className="absolute bottom-2 left-3 right-3 text-white z-10 pointer-events-none">
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-black tracking-tight drop-shadow-md truncate">
              {user.name}
            </h3>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-white/25 backdrop-blur-sm">
              {user.gender === 'female' ? '♀' : '♂'} {user.age}岁 · {user.height}cm
            </span>
          </div>

          <div className="text-xs text-zinc-200 flex items-center gap-1.5 mt-0.5 drop-shadow-sm truncate">
            <Briefcase className="w-3 h-3 text-zinc-300 shrink-0" />
            <span>{user.occupation}</span>
          </div>
        </div>

        {/* Quick Like Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeUser(user.id);
          }}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 z-20 shadow-md ${
            isLiked
              ? 'bg-rose-500 text-white shadow-rose-500/40'
              : 'bg-white/70 hover:bg-white text-zinc-800'
          }`}
          title={isLiked ? '取消心动' : '标记心动'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body: Cities, Hometown, WeChat info & Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* City and Hometown Match Badges */}
        <div className="space-y-1.5">
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            {/* Current Living City */}
            <span className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" />
              现居: {user.currentCity}
            </span>

            {/* Hometown City */}
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                isHometownMatch
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
              }`}
            >
              <Home className="w-3 h-3 text-amber-600" />
              籍贯: {user.hometownProvince.replace('省', '')}·{user.hometownCity}
              {isHometownMatch && (
                <span className="ml-0.5 px-1 rounded bg-amber-500 text-white text-[9px]">
                  同乡
                </span>
              )}
            </span>
          </div>

          {/* Bio Preview */}
          <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">{user.bio}</p>

          {/* Tags */}
          <div className="flex items-center gap-1 flex-wrap pt-0.5">
            {user.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* WeChat Display & Unlock Section */}
        <div className="bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl p-2.5 border border-zinc-200/80 dark:border-zinc-700">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 shrink-0">微信号:</span>

              {user.wechatUnlocked ? (
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-mono font-bold text-emerald-700 truncate">
                    {user.wechatId}
                  </span>
                  <button
                    onClick={handleCopyWeChat}
                    className="p-1 text-emerald-600 hover:text-emerald-800 transition"
                    title="复制微信号"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="font-mono">wx****88</span>
                  <span className="text-[10px] text-amber-600 font-medium hidden sm:inline">
                    (需解锁)
                  </span>
                </div>
              )}
            </div>

            {/* Unlock Button */}
            {!user.wechatUnlocked && (
              <button
                onClick={handleUnlockClick}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition flex items-center gap-1 shrink-0 ${
                  currentUser.memberTier !== 'normal'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                <Unlock className="w-3 h-3" />
                <span>
                  {currentUser.memberTier !== 'normal' ? 'VIP免费看' : '30积分解锁'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
          <button
            onClick={() => setSelectedUserId(user.id)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-500" />
            <span>查看资料</span>
          </button>

          <button
            onClick={handleChatClick}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-105 text-white text-xs font-bold shadow-rose-500/20 shadow-md transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>
              打招呼 {currentUser.memberTier === 'normal' ? '(5分)' : '免积分'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
