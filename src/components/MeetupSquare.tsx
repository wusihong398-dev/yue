import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Tag,
  Clock,
  Sparkles,
  Check,
  ChevronRight,
  Coffee,
  UtensilsCrossed,
  Film,
  Dumbbell,
  Compass,
} from 'lucide-react';
import { MeetupActivity } from '../types';

export const MeetupSquare: React.FC = () => {
  const {
    activities,
    joinMeetupActivity,
    currentUser,
    setShowActivityCreateModal,
    setSelectedUserId,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const categories = [
    { label: '全部', icon: Compass },
    { label: '咖啡/微醺', icon: Coffee },
    { label: '约饭/美食', icon: UtensilsCrossed },
    { label: '运动/户外', icon: Dumbbell },
    { label: '电影/演出', icon: Film },
  ];

  const filtered = activities.filter((act) => {
    if (activeCategory !== '全部' && act.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner & Create Meetup Button */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-3xl p-6 text-white shadow-xl shadow-rose-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>同城组局 · 告别线上尬聊</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            约在一起 · 线下真实聚会广场
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed">
            发布或加入同城、老乡周末活动：喝咖啡、羽毛球、看展览、吃火锅。真实认证，安全交友！
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setShowActivityCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-rose-600" />
              <span>发起同城约会</span>
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 bottom-0 opacity-15 translate-x-10 translate-y-10 pointer-events-none">
          <Users className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = activeCategory === c.label;
          return (
            <button
              key={c.label}
              onClick={() => setActiveCategory(c.label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-rose-600 text-white shadow-rose-500/20 shadow-md'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between gap-4"
          >
            <div>
              {/* Creator header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div
                  onClick={() => setSelectedUserId(act.creatorId)}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <img
                    src={act.creatorAvatar}
                    alt={act.creatorName}
                    className="w-10 h-10 rounded-full object-cover border border-rose-200 group-hover:scale-105 transition"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-900 group-hover:text-rose-600 transition">
                      {act.creatorName}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {act.creatorCity} · 发起人
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80">
                    {act.category}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                    {act.costType}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-black text-zinc-900 leading-snug mb-2">
                {act.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                {act.description}
              </p>

              {/* Date & Location */}
              <div className="mt-3.5 space-y-1.5 bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span className="font-semibold">{act.dateTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>
                    {act.city} · {act.district} · {act.locationName}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Attendees & Join Button */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {act.joinedUserAvatars.slice(0, 4).map((av, idx) => (
                    <img
                      key={idx}
                      src={av}
                      alt="joined"
                      className="w-7 h-7 rounded-full object-cover border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                  已报名 {act.joinedCount}/{act.maxPeople} 人
                </span>
              </div>

              <button
                onClick={() => joinMeetupActivity(act.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                  act.isJoined
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                }`}
              >
                {act.isJoined ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已报名 (退出)</span>
                  </>
                ) : (
                  <>
                    <span>立即报名参与</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
