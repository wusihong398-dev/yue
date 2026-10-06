import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLogo } from './AppLogo';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  Sparkles,
  MapPin,
  Home,
  ShieldCheck,
  Crown,
} from 'lucide-react';

export const ShareCardModal: React.FC = () => {
  const { showShareCardModal, setShowShareCardModal, currentUser, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!showShareCardModal) return null;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      `在「约在一起」找到了好朋友！寻找同城或老乡真诚交友，我的现居地是【${currentUser.currentCity}】，籍贯【${currentUser.hometownCity}】，快来和我约在一起吧！`
    );
    setCopiedLink(true);
    showToast('交友邀请文案已复制', '可直接粘贴到微信好友或朋友圈分享', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-200 dark:border-zinc-800 animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-rose-200" />
            <h3 className="text-base font-black">生成交友名片海报</h3>
          </div>
          <button
            onClick={() => setShowShareCardModal(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster Card Body */}
        <div className="p-5 flex flex-col items-center">
          <div className="w-full bg-gradient-to-b from-rose-50 via-white to-amber-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 rounded-3xl p-5 border border-rose-100 dark:border-zinc-700 shadow-md text-center">
            {/* App Logo Header */}
            <div className="flex justify-center mb-3">
              <AppLogo size="sm" subtitle="同城·老乡·真实约会" />
            </div>

            {/* Avatar with VIP border */}
            <div className="relative inline-block mx-auto my-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-lg"
                referrerPolicy="no-referrer"
              />
              {currentUser.memberTier !== 'normal' && (
                <span className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-500 text-white shadow-md text-[10px]">
                  👑
                </span>
              )}
            </div>

            <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mt-1">
              {currentUser.name}
            </h4>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {currentUser.gender === 'male' ? '男 ♂' : '女 ♀'} · {currentUser.age}岁 · {currentUser.occupation}
            </div>

            {/* Tags */}
            <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                现居: {currentUser.currentCity}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 font-medium flex items-center gap-1">
                <Home className="w-3 h-3 text-amber-600" />
                籍贯: {currentUser.hometownCity}
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-3 italic line-clamp-2 bg-white/60 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-rose-100/60 dark:border-zinc-700">
              "{currentUser.bio}"
            </p>

            {/* Fake QR code for scanning */}
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <div className="text-left">
                <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                  扫码在「约在一起」与我相识
                </div>
                <div className="text-[10px] text-zinc-400">真实认证 · 微信号防骚扰</div>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded-lg border border-zinc-300 shadow-xs flex items-center justify-center text-lg">
                📱
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full mt-4 flex gap-2">
            <button
              onClick={handleCopyShare}
              className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-105 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? '文案已复制' : '复制微信邀请文案'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
