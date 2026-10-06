import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AppIconGraphic } from './AppLogo';
import QRCode from 'qrcode';
import {
  X,
  Smartphone,
  Download,
  Copy,
  Check,
  QrCode,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr_scan' | 'apk_guide' | 'one_click'>('qr_scan');

  // App URL: uses window.location.href or pre-url
  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-mbhkepptwcw6b43im6lglr-300863468867.us-east1.run.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentAppUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#18181b',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isOpen, currentAppUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentAppUrl);
    setCopiedLink(true);
    showToast('手机安装测试链接已复制', '请在手机浏览器（如Chrome/Edge/微信）中打开', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      showToast('应用安装成功！', '已成功添加到手机主屏幕，可直接在桌面启动', 'success');
      onClose();
    } else {
      showToast('提示', '请使用手机扫描右侧二维码直接打开并添加到桌面', 'info');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-200 dark:border-zinc-800 animate-in zoom-in-95 max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppIconGraphic sizePx={38} />
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                「约在一起」手机端测试与 APK 安装
              </h3>
              <p className="text-xs text-rose-100">
                支持安卓手机扫码即用、PWA桌面安装及 APK 打包
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <button
            onClick={() => setActiveTab('qr_scan')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === 'qr_scan'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>📱 手机扫码直装 (最推荐)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk_guide')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === 'apk_guide'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>📦 生成 APK 安装包</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'qr_scan' && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-3xl border-2 border-dashed border-rose-300 dark:border-zinc-700 shadow-md">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Scan to Install"
                    className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-zinc-400">
                    正在生成二维码...
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100">
                  用安卓手机 / 微信扫一扫立即体验
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto leading-relaxed">
                  打开后点击浏览器底部的 <strong>“添加到主屏幕”</strong> 或 <strong>“安装应用”</strong>，手机桌面将立即生成「约在一起」独立专属图标，免受应用商店审核，效果与原生 APK 100% 相同！
                </p>
              </div>

              {/* Status Indicator */}
              <div className="w-full bg-rose-50 dark:bg-zinc-800/70 rounded-2xl p-3.5 border border-rose-100 dark:border-zinc-700 text-xs text-left space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>安卓手机安装优势：</span>
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 space-y-1 text-[11px] leading-relaxed">
                  <p>✓ <strong>独立全屏运行</strong>：无浏览器地址栏，沉浸式原生体验；</p>
                  <p>✓ <strong>桌面图标启动</strong>：自动使用「约在一起」精美图标与启动屏；</p>
                  <p>✓ <strong>秒级即开</strong>：已内置 Service Worker 离线强缓存技术；</p>
                </div>
              </div>

              {/* In-browser Install Button if supported */}
              {isInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm shadow-md shadow-rose-500/25 transition active:scale-98"
                >
                  一键安装到当前设备主屏幕
                </button>
              )}

              {/* Copy URL button */}
              <div className="w-full flex items-center gap-2 pt-1">
                <input
                  type="text"
                  readOnly
                  value={currentAppUrl}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300 font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? '已复制' : '复制网址'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'apk_guide' && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-4 border border-amber-200 dark:border-amber-800 text-xs">
                <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-1.5">
                  <Download className="w-4 h-4 text-amber-600" />
                  <span>如何一键打包生成物理 .APK 安装包文件？</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11px]">
                  本项目已完全适配标准 Progressive Web App (PWA) 规范（包含完整的 Web Manifest、Service Worker、高清图标集）。您可以使用以下任一极速方案获取实际的 <code>.apk</code> 二进制安装包：
                </p>
              </div>

              {/* Solution 1: PWABuilder 1-click */}
              <div className="bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>在线 1 分钟免代码生成 APK (推荐)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                    零门槛
                  </span>
                </div>
                <ol className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5 list-decimal list-inside text-[11px] leading-relaxed">
                  <li>打开免费官方打包网站：<strong>https://www.pwabuilder.com</strong></li>
                  <li>将上方复制的应用链接粘贴到输入框，点击 <strong>Start</strong>；</li>
                  <li>点击 <strong>Package for Android</strong>，系统将自动编译生成带签名的 <strong>.apk</strong> 安装包文件直接下载至电脑或手机！</li>
                </ol>
              </div>

              {/* Solution 2: Capacitor CLI */}
              <div className="bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>使用 Capacitor / Android Studio 导出 APK</span>
                  </div>
                  <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2 py-0.5 rounded-full">
                    开发者
                  </span>
                </div>
                <div className="bg-zinc-900 text-zinc-200 p-2.5 rounded-xl font-mono text-[10px] space-y-1">
                  <p>npm run build</p>
                  <p>npx @capacitor/cli init "约在一起" "com.yuezaiyiqi.app"</p>
                  <p>npx cap add android</p>
                  <p>npx cap open android  # 使用Android Studio导出 .apk</p>
                </div>
              </div>

              {/* Direct scan reminder */}
              <div className="p-3 bg-rose-50 dark:bg-zinc-800 rounded-xl border border-rose-200 dark:border-zinc-700 flex items-center justify-between">
                <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                  无需等待打包？使用扫码可立即在安卓真机体验
                </span>
                <button
                  onClick={() => setActiveTab('qr_scan')}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <span>切换扫码</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
