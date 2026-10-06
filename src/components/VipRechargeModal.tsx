import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Crown,
  Coins,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Eye,
  Gift,
} from 'lucide-react';
import { MemberTier } from '../types';

export const VipRechargeModal: React.FC = () => {
  const {
    showVipModal,
    setShowVipModal,
    currentUser,
    upgradeTier,
    rechargePoints,
    updateCurrentUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'vip' | 'recharge' | 'test_switch'>('vip');

  if (!showVipModal) return null;

  const pointsPackages = [
    { points: 60, price: '¥6', tag: '入门体验' },
    { points: 180, price: '¥18', tag: '最受欢迎' },
    { points: 500, price: '¥45', tag: '超值推荐' },
    { points: 1200, price: '¥98', tag: '至尊特惠 (+200分)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-amber-200 animate-in zoom-in-95 max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">会员中心 & 积分充值</h3>
              <p className="text-xs text-amber-100">
                当前身份: {currentUser.memberTier === 'svip' ? '至尊SVIP' : currentUser.memberTier === 'vip' ? '黄金VIP' : '普通会员'} · 积分余额: {currentUser.points}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowVipModal(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 bg-zinc-50">
          <button
            onClick={() => setActiveTab('vip')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === 'vip'
                ? 'border-amber-500 text-amber-800 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span>开通尊贵VIP</span>
          </button>

          <button
            onClick={() => setActiveTab('recharge')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === 'recharge'
                ? 'border-amber-500 text-amber-800 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-600" />
            <span>积分充值</span>
          </button>

          <button
            onClick={() => setActiveTab('test_switch')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === 'test_switch'
                ? 'border-rose-500 text-rose-700 bg-white'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Zap className="w-4 h-4 text-rose-500" />
            <span>角色规则切换测试</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {activeTab === 'vip' && (
            <div className="space-y-4">
              {/* Feature Matrix */}
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
                <div className="text-xs font-bold text-amber-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>会员等级与权益对照</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-amber-200/80 text-zinc-600">
                        <th className="text-left py-2">核心特权</th>
                        <th className="text-center py-2">普通会员</th>
                        <th className="text-center py-2 text-amber-700 font-bold">黄金VIP</th>
                        <th className="text-center py-2 text-purple-700 font-bold">至尊SVIP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200/50">
                      <tr>
                        <td className="py-2 text-zinc-700 font-medium">寻找与浏览用户资料</td>
                        <td className="text-center py-2 text-emerald-600 font-bold">✓ 免费</td>
                        <td className="text-center py-2 text-emerald-600 font-bold">✓ 免费</td>
                        <td className="text-center py-2 text-emerald-600 font-bold">✓ 免费</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-zinc-700 font-medium">微信号查看权限</td>
                        <td className="text-center py-2 text-zinc-500">隐藏 (30分/次)</td>
                        <td className="text-center py-2 text-amber-600 font-bold">★ 免费无限直看</td>
                        <td className="text-center py-2 text-purple-700 font-bold">★ 免费无限直看</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-zinc-700 font-medium">私聊消息消耗</td>
                        <td className="text-center py-2 text-rose-600 font-bold">5积分/条</td>
                        <td className="text-center py-2 text-emerald-600 font-bold">★ 0积分畅聊</td>
                        <td className="text-center py-2 text-emerald-600 font-bold">★ 0积分畅聊</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-zinc-700 font-medium">每日签到领积分</td>
                        <td className="text-center py-2 text-zinc-600">+25 积分</td>
                        <td className="text-center py-2 text-amber-700 font-bold">+50 积分(双倍)</td>
                        <td className="text-center py-2 text-purple-700 font-bold">+80 积分</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-zinc-700 font-medium">同城首页置顶曝光</td>
                        <td className="text-center py-2 text-zinc-400">-</td>
                        <td className="text-center py-2 text-zinc-400">-</td>
                        <td className="text-center py-2 text-purple-700 font-bold">★ 极速置顶</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VIP Plans */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-amber-900">黄金VIP月卡</span>
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        畅聊首选
                      </span>
                    </div>
                    <div className="text-2xl font-black text-amber-700 mt-1">
                      ¥29.9 <span className="text-xs font-normal text-zinc-500">/月</span>
                    </div>
                    <ul className="text-xs text-zinc-600 space-y-1.5 mt-3">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        微信号直接查看，无需消耗积分
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        私聊免积分无限发
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        立即赠送 200 积分
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => upgradeTier('vip')}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-105 text-white font-bold text-xs shadow-md transition"
                  >
                    立即开通黄金VIP
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-purple-900">至尊SVIP年卡</span>
                      <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                        至尊特权
                      </span>
                    </div>
                    <div className="text-2xl font-black text-purple-700 mt-1">
                      ¥168 <span className="text-xs font-normal text-zinc-500">/年</span>
                    </div>
                    <ul className="text-xs text-zinc-600 space-y-1.5 mt-3">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-600" />
                        涵盖全部黄金VIP权益
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-600" />
                        同城主页置顶推荐 (曝光x3)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-600" />
                        立即赠送 500 积分
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => upgradeTier('svip')}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-105 text-white font-bold text-xs shadow-md transition"
                  >
                    立即开通至尊SVIP
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recharge' && (
            <div className="space-y-4">
              <div className="bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-500">当前积分余额</div>
                  <div className="text-xl font-black text-zinc-900">{currentUser.points} 积分</div>
                </div>
                <div className="text-right text-xs text-zinc-500">
                  普通会员私聊 5分/条
                  <br />
                  微信号解锁 30分/个
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {pointsPackages.map((pkg) => (
                  <div
                    key={pkg.points}
                    className="bg-white rounded-2xl p-4 border border-zinc-200 hover:border-amber-400 transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        {pkg.tag}
                      </span>
                      <div className="text-lg font-black text-zinc-900 mt-2">
                        +{pkg.points} 积分
                      </div>
                      <div className="text-sm font-bold text-rose-600">{pkg.price}</div>
                    </div>

                    <button
                      onClick={() => rechargePoints(pkg.points, `${pkg.points}积分 (${pkg.price})`)}
                      className="mt-3 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition"
                    >
                      立即充值
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'test_switch' && (
            <div className="space-y-4">
              <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200 text-xs text-rose-900 leading-relaxed">
                💡 <strong>功能自测与演示开关：</strong>
                方便您在此处一键自由切换「普通会员」与「VIP会员」身份，测试“普通会员看微信号隐藏/聊天扣5积分”与“VIP会员免费畅聊看微信”的实际体验！
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    updateCurrentUser({ memberTier: 'normal' });
                    setShowVipModal(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                    currentUser.memberTier === 'normal'
                      ? 'bg-rose-50 border-rose-500 shadow-xs'
                      : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm text-zinc-900">切换为【普通会员】</div>
                    <div className="text-xs text-zinc-500">
                      微信号隐藏显示（需30积分解锁）· 发消息消耗5积分/条
                    </div>
                  </div>
                  {currentUser.memberTier === 'normal' && (
                    <span className="text-xs font-bold text-rose-600 px-2 py-1 bg-rose-100 rounded-lg">
                      当前选中
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    updateCurrentUser({ memberTier: 'vip' });
                    setShowVipModal(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                    currentUser.memberTier === 'vip'
                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                      : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm text-amber-900">切换为【黄金VIP会员】</div>
                    <div className="text-xs text-zinc-500">
                      微信号免费直接显示可复制 · 发送消息0积分免费畅聊
                    </div>
                  </div>
                  {currentUser.memberTier === 'vip' && (
                    <span className="text-xs font-bold text-amber-700 px-2 py-1 bg-amber-100 rounded-lg">
                      当前选中
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    updateCurrentUser({ memberTier: 'svip' });
                    setShowVipModal(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                    currentUser.memberTier === 'svip'
                      ? 'bg-purple-50 border-purple-500 shadow-xs'
                      : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm text-purple-900">切换为【至尊SVIP会员】</div>
                    <div className="text-xs text-zinc-500">
                      享受全站最高置顶特权 · 隐身访问 · 免费直看与免费私聊
                    </div>
                  </div>
                  {currentUser.memberTier === 'svip' && (
                    <span className="text-xs font-bold text-purple-700 px-2 py-1 bg-purple-100 rounded-lg">
                      当前选中
                    </span>
                  )}
                </button>
              </div>

              {/* Quick points adjust */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-100">
                <span className="text-xs text-zinc-600">调试快捷充值积分：</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => rechargePoints(50, '测试加分')}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800"
                  >
                    +50分
                  </button>
                  <button
                    onClick={() => rechargePoints(200, '测试加分')}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800"
                  >
                    +200分
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
