import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, ShieldCheck, Sparkles, ChevronRight, Lock, Check } from 'lucide-react';

export const ConversationsList: React.FC = () => {
  const {
    users,
    chatMessages,
    setActiveChatUserId,
    currentUser,
    setSelectedUserId,
    setShowVipModal,
  } = useApp();

  // Find all users who have messages, plus top recommended users
  const chattedUserIds = Object.keys(chatMessages);
  const activeUserList = users.filter(
    (u) => chattedUserIds.includes(u.id) || u.isOnline
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-zinc-900">私聊消息与互动</h2>
            <p className="text-xs text-zinc-500">
              {currentUser.memberTier === 'normal'
                ? `普通会员：发消息 5积分/条（当前余额: ${currentUser.points} 分）`
                : 'VIP会员专享：无限次免积分畅聊'}
            </p>
          </div>
        </div>

        {currentUser.memberTier === 'normal' && (
          <button
            onClick={() => setShowVipModal(true)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition shadow-xs"
          >
            升级VIP畅聊
          </button>
        )}
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs divide-y divide-zinc-100 overflow-hidden">
        {activeUserList.map((user) => {
          const msgs = chatMessages[user.id] || [];
          const lastMsg = msgs[msgs.length - 1];

          return (
            <div
              key={user.id}
              onClick={() => setActiveChatUserId(user.id)}
              className="p-4 hover:bg-rose-50/40 cursor-pointer transition flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-rose-200"
                    referrerPolicy="no-referrer"
                  />
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600 transition truncate">
                      {user.name}
                    </span>
                    {user.verification.isRealPerson && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200 shrink-0">
                        真人
                      </span>
                    )}
                    <span className="text-[11px] text-zinc-400 shrink-0">
                      {user.currentCity}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 truncate mt-0.5">
                    {lastMsg ? lastMsg.text : `${user.occupation} · 刚刚活跃`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {user.wechatUnlocked ? (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                    微信已通
                  </span>
                ) : (
                  <span className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                    微信待解锁
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
