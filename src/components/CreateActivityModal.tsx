import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, MapPin, Users, Tag, Sparkles } from 'lucide-react';

export const CreateActivityModal: React.FC = () => {
  const {
    showActivityCreateModal,
    setShowActivityCreateModal,
    createMeetupActivity,
    currentUser,
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'约饭/美食' | '咖啡/微醺' | '剧本杀/桌游' | '运动/户外' | '电影/演出' | '旅行/周边游'>('咖啡/微醺');
  const [district, setDistrict] = useState('南山区');
  const [locationName, setLocationName] = useState('');
  const [dateTime, setDateTime] = useState('本周六 15:00');
  const [costType, setCostType] = useState<'AA制' | '发起人请客' | '男生请客' | '女生免费'>('AA制');
  const [description, setDescription] = useState('');
  const [maxPeople, setMaxPeople] = useState(4);

  if (!showActivityCreateModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !locationName.trim()) return;

    createMeetupActivity({
      title: title.trim(),
      category,
      city: currentUser.currentCity,
      district,
      locationName: locationName.trim(),
      dateTime,
      costType,
      description: description.trim() || '期待同城或老乡真诚朋友加入，一起度过愉快时光！',
      maxPeople,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100 animate-in zoom-in-95 max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900">发起同城约会聚会</h3>
              <p className="text-xs text-zinc-500">在 {currentUser.currentCity} 邀请朋友一起活动</p>
            </div>
          </div>
          <button
            onClick={() => setShowActivityCreateModal(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">活动主题名称 *</label>
            <input
              type="text"
              required
              placeholder="例如：【周末探店】万象天地品鉴手冲咖啡与甜品"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-rose-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">聚会分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              >
                <option value="咖啡/微醺">☕ 咖啡/微醺</option>
                <option value="约饭/美食">🍲 约饭/美食</option>
                <option value="运动/户外">🏸 运动/户外</option>
                <option value="电影/演出">🎬 电影/演出</option>
                <option value="剧本杀/桌游">🎭 剧本杀/桌游</option>
                <option value="旅行/周边游">🚗 旅行/周边游</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">费用方式</label>
              <select
                value={costType}
                onChange={(e) => setCostType(e.target.value as any)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              >
                <option value="AA制">AA制（公平随心）</option>
                <option value="发起人请客">发起人请客（热情组局）</option>
                <option value="男生请客">男生请客</option>
                <option value="女生免费">女生免费</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">活动时间</label>
              <input
                type="text"
                placeholder="例如：本周六 15:30"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">期望人数上限</label>
              <select
                value={maxPeople}
                onChange={(e) => setMaxPeople(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              >
                <option value={2}>2人 (1对1交流)</option>
                <option value={3}>3人</option>
                <option value={4}>4人 (推荐双打或桌游)</option>
                <option value={6}>6人</option>
                <option value={8}>8人</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">具体地点场所 *</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="所在区（如南山区/福田区）"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-1/3 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              />
              <input
                type="text"
                required
                placeholder="具体店名或地标（如：星巴克臻选店、莲花山公园）"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">聚会活动说明</label>
            <textarea
              rows={3}
              placeholder="介绍一下聚会计划、想要认识什么样的小伙伴，比如老乡、同行业或者共同兴趣爱好者..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-rose-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-105 text-white font-bold text-sm shadow-md shadow-rose-500/25 transition"
            >
              立即发布约会活动
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
