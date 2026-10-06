import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppIconGraphic, AppLogo } from './AppLogo';
import {
  X,
  Smartphone,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Palette,
  Heart,
  MessageCircle,
} from 'lucide-react';

export const AppIconShowcase: React.FC = () => {
  const { showIconShowcaseModal, setShowIconShowcaseModal, showToast } = useApp();
  const [copiedSvg, setCopiedSvg] = useState(false);

  if (!showIconShowcaseModal) return null;

  const handleCopySvg = () => {
    const svgCode = `<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="28" fill="url(#bgGradient)"/>
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF416C" />
      <stop offset="50%" stopColor="#FF4B2B" />
      <stop offset="100%" stopColor="#FF8A00" />
    </linearGradient>
    <linearGradient id="h1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
      <stop offset="100%" stopColor="#FFE0E6" stopOpacity="0.9" />
    </linearGradient>
  </defs>
  <path d="M32 24 C18 24 10 36 10 50 C10 68 35 84 46 90 C48 91 52 91 54 90 C57 88 64 83 70 77 C66 76 61 74 58 71 C45 60 38 48 38 36 C38 31 39 27 41 24 C38 24 35 24 32 24 Z" fill="url(#h1)"/>
  <path d="M66 18 C55 18 48 24 45 32 C42 24 35 18 24 18 C22 18 20 18 18 19 C18 21 18 23 18 25 C18 40 28 54 42 66 C46 69 49 71 50 71 C51 71 54 69 58 66 C72 54 82 40 82 25 C82 21 78 18 66 18 Z" fill="#FFFFFF"/>
  <circle cx="50" cy="42" r="5" fill="#FF2A6D" />
  <circle cx="70" cy="32" r="3.5" fill="#FF8A00" />
</svg>`;

    navigator.clipboard.writeText(svgCode);
    setCopiedSvg(true);
    showToast('图标代码已复制', '高清SVG矢量代码已复制到剪贴板', 'success');
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-200 animate-in zoom-in-95 max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-rose-200" />
            <div>
              <h3 className="text-base font-black">「约在一起」官方软件图标规范与展示</h3>
              <p className="text-xs text-rose-100">高品质移动应用与品牌视觉标识</p>
            </div>
          </div>
          <button
            onClick={() => setShowIconShowcaseModal(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Main Icon Showcase Spotlight */}
          <div className="bg-gradient-to-b from-zinc-50 to-rose-50/40 rounded-3xl p-6 border border-zinc-200/80 flex flex-col items-center text-center">
            <div className="relative group p-4">
              <AppIconGraphic sizePx={110} className="shadow-2xl shadow-rose-500/35" />
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white shadow-md text-rose-600">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h4 className="text-xl font-black text-zinc-900 mt-3">约在一起 · Meet Together</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              App Store / Google Play / 微信小程序高精级标准 App Icon
            </p>

            {/* Size variations row */}
            <div className="flex items-end gap-5 mt-5 pt-4 border-t border-zinc-200/60">
              <div className="flex flex-col items-center gap-1">
                <AppIconGraphic sizePx={64} />
                <span className="text-[10px] text-zinc-400 font-mono">64x64</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <AppIconGraphic sizePx={48} />
                <span className="text-[10px] text-zinc-400 font-mono">48x48</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <AppIconGraphic sizePx={36} />
                <span className="text-[10px] text-zinc-400 font-mono">36x36</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <AppIconGraphic sizePx={28} />
                <span className="text-[10px] text-zinc-400 font-mono">28x28</span>
              </div>
            </div>
          </div>

          {/* Design Concepts Description */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-zinc-800">交织双心形态</div>
              <div className="text-[11px] text-zinc-500 mt-1 leading-snug">
                双心交融，寓意同城与老乡之间灵魂共鸣与心意互通。
              </div>
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-zinc-800">对话气泡意象</div>
              <div className="text-[11px] text-zinc-500 mt-1 leading-snug">
                融合互动谈天剪影，代表真诚聊天、轻松破冰与线下约会。
              </div>
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
              <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-2">
                <Palette className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-zinc-800">落日暖光渐变</div>
              <div className="text-[11px] text-zinc-500 mt-1 leading-snug">
                采用珊瑚粉红至落日橙黄渐变，温暖亲和且具有极高辨识度。
              </div>
            </div>
          </div>

          {/* Simulated Mobile Phone Home Screen Mockup */}
          <div className="bg-zinc-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest text-center mb-4">
              手机主屏幕桌面实机模拟 (iOS / Android Launcher)
            </div>

            <div className="max-w-xs mx-auto bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/80">
              {/* App Grid */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-xl shadow-md">
                    💬
                  </div>
                  <span className="text-[10px] text-zinc-300 mt-1">微信</span>
                </div>

                {/* Our App: Highlighted with glowing badge */}
                <div className="flex flex-col items-center scale-105">
                  <div className="relative">
                    <AppIconGraphic sizePx={48} />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                      3
                    </span>
                  </div>
                  <span className="text-[10px] text-rose-300 font-bold mt-1">约在一起</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-xl shadow-md">
                    🗺️
                  </div>
                  <span className="text-[10px] text-zinc-300 mt-1">地图</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-xl shadow-md">
                    📷
                  </div>
                  <span className="text-[10px] text-zinc-300 mt-1">相机</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end gap-2.5">
          <button
            onClick={handleCopySvg}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
          >
            {copiedSvg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSvg ? '已复制SVG' : '复制高清矢量SVG代码'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
