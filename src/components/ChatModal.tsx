import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Sparkles,
  Gift,
  Coins,
  Crown,
  Share2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const ChatModal: React.FC = () => {
  const {
    activeChatUserId,
    setActiveChatUserId,
    users,
    currentUser,
    chatMessages,
    sendMessage,
    sendGift,
    requestWechatExchange,
    setShowVipModal,
    showToast,
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [copiedWx, setCopiedWx] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!activeChatUserId) return null;
  const targetUser = users.find((u) => u.id === activeChatUserId);
  if (!targetUser) return null;

  const messages = chatMessages[activeChatUserId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const ok = sendMessage(activeChatUserId, inputVal);
    if (ok) {
      setInputVal('');
    }
  };

  const handleIcebreaker = (text: string) => {
    sendMessage(activeChatUserId, text);
  };

  const handleCopyWx = (wx: string) => {
    navigator.clipboard.writeText(wx);
    setCopiedWx(true);
    showToast('已复制微信号', wx, 'success');
    setTimeout(() => setCopiedWx(false), 2000);
  };

  const gifts = [
    { name: '一朵玫瑰', icon: '🌹', cost: 5 },
    { name: '生椰拿铁', icon: '☕', cost: 15 },
    { name: '心动告白熊', icon: '🧸', cost: 30 },
    { name: '浪漫梦幻城堡', icon: '🏰', cost: 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-zinc-100 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="w-10 h-10 rounded-full object-cover border border-rose-200"
                referrerPolicy="no-referrer"
              />
              {targetUser.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-900 text-sm truncate">
                  {targetUser.name}
                </span>
                {targetUser.verification.isRealPerson && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200 shrink-0">
                    真人
                  </span>
                )}
                {targetUser.verification.isRealName && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-200 shrink-0">
                    实名
                  </span>
                )}
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {targetUser.currentCity} · 籍贯: {targetUser.hometownCity} · {targetUser.occupation}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => requestWechatExchange(targetUser.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition"
              title="向对方申请交换微信号"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">互换微信</span>
            </button>

            <button
              onClick={() => setActiveChatUserId(null)}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Member Tier & Points Consumption Banner */}
        <div
          className={`px-3.5 py-2 text-xs flex items-center justify-between gap-2 border-b ${
            currentUser.memberTier === 'normal'
              ? 'bg-amber-50/90 border-amber-200 text-amber-900'
              : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-900'
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            {currentUser.memberTier === 'normal' ? (
              <>
                <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-semibold truncate">
                  普通会员：发消息消耗 <strong className="text-rose-600">5积分/条</strong>（余额:{' '}
                  {currentUser.points} 分）
                </span>
              </>
            ) : (
              <>
                <Crown className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                <span className="font-semibold truncate">
                  {currentUser.memberTier === 'svip' ? '至尊SVIP' : '黄金VIP'}尊享特权：无限次免费畅聊，免消耗积分！
                </span>
              </>
            )}
          </div>

          {currentUser.memberTier === 'normal' && (
            <button
              onClick={() => setShowVipModal(true)}
              className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shrink-0 transition"
            >
              升级VIP免积分
            </button>
          )}
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-50/60">
          {/* Welcome Prompt */}
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-zinc-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>双方已通过安全防骚扰系统保护，请真诚礼貌交流</span>
            </div>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;

            if (msg.type === 'gift') {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-100 to-amber-100 border border-rose-200 shadow-xs text-xs font-bold text-zinc-800 flex items-center gap-2">
                    <span className="text-xl">{msg.extraData?.giftIcon || '🎁'}</span>
                    <span>
                      {isMe ? '你' : targetUser.name} {msg.text}
                    </span>
                    {msg.pointsSpent ? (
                      <span className="text-[10px] text-amber-700 font-normal">
                        (-{msg.pointsSpent}积分)
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            }

            if (msg.type === 'wechat_exchange') {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="max-w-xs w-full p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-md">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {msg.extraData?.status === 'accepted' ? '微信互通成功！' : '微信互通申请中'}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-700 leading-relaxed">{msg.text}</div>

                    {msg.extraData?.status === 'accepted' && (
                      <button
                        onClick={() => handleCopyWx(targetUser.wechatId)}
                        className="mt-2 w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        {copiedWx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedWx ? '已复制' : '一键复制对方微信号'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={targetUser.avatar}
                    alt={targetUser.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}

                <div className={`max-w-[78%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-xs shadow-sm shadow-rose-500/20'
                        : 'bg-white text-zinc-900 border border-zinc-200/80 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {isMe && msg.pointsSpent ? (
                      <span className="text-amber-600 font-medium">
                        (消耗{msg.pointsSpent}积分)
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Icebreakers */}
        <div className="px-3 py-1.5 bg-white border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-zinc-400 shrink-0">破冰灵感:</span>
          <button
            onClick={() =>
              handleIcebreaker(
                `哈喽！看到你也是在${targetUser.currentCity}，平时周末一般喜欢去哪玩呀？😊`
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 whitespace-nowrap transition border border-rose-200/60"
          >
            同城问候探店 👋
          </button>
          <button
            onClick={() =>
              handleIcebreaker(
                `老乡好呀！你是${targetUser.hometownCity}哪里的呢？在异地遇到同乡真亲切！🏮`
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 whitespace-nowrap transition border border-amber-200/60"
          >
            老乡打招呼 🏮
          </button>
          <button
            onClick={() =>
              handleIcebreaker(
                `看到你的资料里写着喜欢${targetUser.interests[0] || '看展'}，我也是！求交流分享~`
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 whitespace-nowrap transition"
          >
            聊共同爱好 ✨
          </button>
        </div>

        {/* Gift Selector Popup */}
        {showGiftSelector && (
          <div className="p-3 bg-amber-50/80 border-t border-amber-200 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
              <span>赠送虚拟礼物（提升好感度）</span>
              <span>积分: {currentUser.points}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {gifts.map((g) => (
                <button
                  key={g.name}
                  onClick={() => {
                    sendGift(targetUser.id, g.name, g.cost, g.icon);
                    setShowGiftSelector(false);
                  }}
                  className="bg-white hover:bg-amber-100 p-2 rounded-xl border border-amber-200 flex flex-col items-center transition"
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="text-[11px] font-bold text-zinc-800 mt-0.5">{g.name}</span>
                  <span className="text-[10px] text-amber-600 font-bold">{g.cost}分</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Input Form */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-zinc-100 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setShowGiftSelector(!showGiftSelector)}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition"
            title="送礼物"
          >
            <Gift className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={
              currentUser.memberTier === 'normal'
                ? `输入消息 (发送消耗 5 积分，当前剩余 ${currentUser.points} 分)...`
                : '输入消息 (VIP无限次免费畅聊)...'
            }
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-rose-500 focus:bg-white"
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:brightness-105 active:scale-95 transition shadow-xs shadow-rose-500/20"
            title="发送"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
