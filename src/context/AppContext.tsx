import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  CurrentUser,
  FilterOptions,
  ChatMessage,
  MeetupActivity,
  PointTransaction,
  MemberTier,
} from '../types';
import { MOCK_USERS, MOCK_ACTIVITIES } from '../data/mockUsers';
import { calculateDistanceKm } from '../data/chinaCities';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  desc?: string;
}

interface AppContextType {
  currentUser: CurrentUser;
  users: UserProfile[];
  filteredUsers: UserProfile[];
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  activeTab: 'discover' | 'meetup' | 'chat' | 'profile';
  setActiveTab: (tab: 'discover' | 'meetup' | 'chat' | 'profile') => void;
  
  // Modals & Navigation
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  activeChatUserId: string | null;
  setActiveChatUserId: (id: string | null) => void;
  showVipModal: boolean;
  setShowVipModal: (open: boolean) => void;
  showVerificationModal: boolean;
  setShowVerificationModal: (open: boolean) => void;
  showIconShowcaseModal: boolean;
  setShowIconShowcaseModal: (open: boolean) => void;
  showActivityCreateModal: boolean;
  setShowActivityCreateModal: (open: boolean) => void;
  showProfileEditModal: boolean;
  setShowProfileEditModal: (open: boolean) => void;
  showShareCardModal: boolean;
  setShowShareCardModal: (open: boolean) => void;
  showInstallModal: boolean;
  setShowInstallModal: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Actions
  unlockWeChat: (targetUserId: string) => boolean;
  sendMessage: (receiverId: string, text: string) => boolean;
  sendGift: (receiverId: string, giftName: string, pointsCost: number, giftIcon: string) => boolean;
  requestWechatExchange: (receiverId: string) => void;
  toggleLikeUser: (targetUserId: string) => void;
  checkInToday: () => void;
  completeVerification: (type: 'real_person' | 'real_name', nameInput?: string, idInput?: string) => void;
  upgradeTier: (tier: MemberTier) => void;
  rechargePoints: (amount: number, label: string) => void;
  updateCurrentUser: (updates: Partial<CurrentUser>) => void;
  createMeetupActivity: (activity: Omit<MeetupActivity, 'id' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorGender' | 'creatorAge' | 'creatorCity' | 'joinedCount' | 'joinedUserAvatars' | 'isJoined'>) => void;
  joinMeetupActivity: (activityId: string) => void;

  // Data
  chatMessages: Record<string, ChatMessage[]>;
  activities: MeetupActivity[];
  transactions: PointTransaction[];
  likedUserIds: Set<string>;
  toasts: ToastMessage[];
  showToast: (title: string, desc?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

const DEFAULT_CURRENT_USER: CurrentUser = {
  id: 'me-001',
  name: '陈浩宇 (Kevin)',
  gender: 'male',
  age: 27,
  height: 179,
  occupation: '互联网产品经理',
  occupationCategory: 'tech',
  currentProvince: '广东省',
  currentCity: '深圳市',
  hometownProvince: '湖南省',
  hometownCity: '衡阳市',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  photos: [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  ],
  wechatId: 'kevin_chen_sz',
  bio: '在南山科技园工作，平时喜欢夜跑、自驾、看悬疑电影。性格温和有条理，希望能找到三观契合、真诚坦率的另一半。',
  tags: ['产品经理', '夜跑达人', '自驾探索', '猫狗友好', '不抽烟'],
  memberTier: 'normal', // 初始为普通会员，方便测试规则！
  points: 120, // 初始赠送120积分
  verification: {
    isRealPerson: false,
    isRealName: false,
    isCareerVerified: true,
    isEduVerified: true,
  },
  hasCheckedInToday: false,
};

const INITIAL_FILTER: FilterOptions = {
  mode: 'nearby',
  targetProvince: '广东省',
  targetCity: '深圳市',
  gender: 'all',
  minAge: 18,
  maxAge: 45,
  maxDistanceKm: 50,
  onlyRealPerson: false,
  onlyRealName: false,
  hometownOnly: false,
  occupationCategory: 'all',
  sortBy: 'distance',
  searchKeyword: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('yuezaiyiqi_user');
    return saved ? JSON.parse(saved) : DEFAULT_CURRENT_USER;
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('yuezaiyiqi_users_pool');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(INITIAL_FILTER);
  const [activeTab, setActiveTab] = useState<'discover' | 'meetup' | 'chat' | 'profile'>('discover');

  // Modals
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [showVipModal, setShowVipModal] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [showIconShowcaseModal, setShowIconShowcaseModal] = useState<boolean>(false);
  const [showActivityCreateModal, setShowActivityCreateModal] = useState<boolean>(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState<boolean>(false);
  const [showShareCardModal, setShowShareCardModal] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('yuezaiyiqi_theme') === 'dark';
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('yuezaiyiqi_theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Likes
  const [likedUserIds, setLikedUserIds] = useState<Set<string>>(new Set(['u-101']));

  // Activities
  const [activities, setActivities] = useState<MeetupActivity[]>(MOCK_ACTIVITIES);

  // Transactions
  const [transactions, setTransactions] = useState<PointTransaction[]>([
    {
      id: 'tx-01',
      title: '新用户注册赠送初始积分',
      amount: 100,
      timestamp: Date.now() - 3600000 * 24,
      type: 'check_in',
    },
    {
      id: 'tx-02',
      title: '完善职业与学历资料奖励',
      amount: 20,
      timestamp: Date.now() - 3600000 * 12,
      type: 'check_in',
    },
  ]);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'u-101': [
      {
        id: 'msg-init-1',
        senderId: 'u-101',
        receiverId: 'me-001',
        text: '哈喽！看到你的资料，也是在深圳并且老家在湖南吗？好巧呀！✨',
        timestamp: Date.now() - 1000 * 60 * 35,
        type: 'text',
      },
    ],
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    desc?: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, desc, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('yuezaiyiqi_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('yuezaiyiqi_users_pool', JSON.stringify(users));
  }, [users]);

  // Recalculate distance based on current user city
  const usersWithDistance = users.map((u) => {
    const dist = calculateDistanceKm(currentUser.currentCity, u.currentCity, u.id === 'u-101' ? 1.8 : 0);
    return {
      ...u,
      distanceKm: dist,
    };
  });

  // Filtered users calculation
  const filteredUsers = usersWithDistance.filter((u) => {
    // Mode filters
    if (filterOptions.mode === 'nearby') {
      // Must be within max distance or same city
      if (u.currentCity !== currentUser.currentCity && u.distanceKm > filterOptions.maxDistanceKm) {
        return false;
      }
    } else if (filterOptions.mode === 'city') {
      if (u.currentCity !== currentUser.currentCity) return false;
    } else if (filterOptions.mode === 'province_city') {
      if (filterOptions.targetCity && u.currentCity !== filterOptions.targetCity) {
        return false;
      }
    } else if (filterOptions.mode === 'hometown') {
      // Find people from same hometown or matching hometown
      if (
        u.hometownProvince !== currentUser.hometownProvince &&
        u.hometownCity !== currentUser.hometownCity
      ) {
        return false;
      }
    }

    // Gender filter
    if (filterOptions.gender !== 'all' && u.gender !== filterOptions.gender) {
      return false;
    }

    // Age filter
    if (u.age < filterOptions.minAge || u.age > filterOptions.maxAge) {
      return false;
    }

    // Real person & real name filter
    if (filterOptions.onlyRealPerson && !u.verification.isRealPerson) {
      return false;
    }
    if (filterOptions.onlyRealName && !u.verification.isRealName) {
      return false;
    }

    // Hometown checkbox
    if (
      filterOptions.hometownOnly &&
      u.hometownCity !== currentUser.hometownCity &&
      u.hometownProvince !== currentUser.hometownProvince
    ) {
      return false;
    }

    // Occupation category filter
    if (
      filterOptions.occupationCategory !== 'all' &&
      u.occupationCategory !== filterOptions.occupationCategory
    ) {
      return false;
    }

    // Search keyword
    if (filterOptions.searchKeyword.trim()) {
      const kw = filterOptions.searchKeyword.trim().toLowerCase();
      const match =
        u.name.toLowerCase().includes(kw) ||
        u.occupation.toLowerCase().includes(kw) ||
        u.hometownCity.includes(kw) ||
        u.currentCity.includes(kw) ||
        u.bio.toLowerCase().includes(kw) ||
        u.tags.some((t) => t.toLowerCase().includes(kw));
      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filterOptions.sortBy === 'distance') {
      return a.distanceKm - b.distanceKm;
    }
    if (filterOptions.sortBy === 'active') {
      return (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0);
    }
    if (filterOptions.sortBy === 'match') {
      return b.matchScore - a.matchScore;
    }
    return 0;
  });

  const resetFilters = () => {
    setFilterOptions(INITIAL_FILTER);
    showToast('已重置筛选条件', '恢复为默认附近发现模式', 'info');
  };

  // WeChat Unlock Logic
  const unlockWeChat = (targetUserId: string): boolean => {
    const user = users.find((u) => u.id === targetUserId);
    if (!user) return false;

    // If already unlocked
    if (user.wechatUnlocked) {
      return true;
    }

    // If VIP or SVIP: directly free unlock!
    if (currentUser.memberTier === 'vip' || currentUser.memberTier === 'svip') {
      setUsers((prev) =>
        prev.map((u) => (u.id === targetUserId ? { ...u, wechatUnlocked: true } : u))
      );
      showToast('VIP特权已直接解锁', `已成功获取 ${user.name} 的微信号！`, 'success');
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      return true;
    }

    // If normal member: requires 30 points
    const COST = 30;
    if (currentUser.points < COST) {
      showToast(
        '积分不足',
        `普通会员解锁微信号需消耗 ${COST} 积分，您当前剩余 ${currentUser.points} 积分。可每日签到、完成实名认证领积分或升级VIP！`,
        'warning'
      );
      setShowVipModal(true);
      return false;
    }

    // Deduct points
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points - COST,
    }));

    setUsers((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, wechatUnlocked: true } : u))
    );

    setTransactions((prev) => [
      {
        id: 'tx-' + Date.now(),
        title: `解锁 ${user.name} 微信号`,
        amount: -COST,
        timestamp: Date.now(),
        type: 'unlock_wechat',
      },
      ...prev,
    ]);

    showToast(
      '微信号解锁成功',
      `消耗了 ${COST} 积分，剩余 ${currentUser.points - COST} 积分。已为您展示该微信号并支持一键复制！`,
      'success'
    );
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    return true;
  };

  // Send message logic
  const sendMessage = (receiverId: string, text: string): boolean => {
    if (!text.trim()) return false;
    const targetUser = users.find((u) => u.id === receiverId);
    if (!targetUser) return false;

    const CHAT_COST = 5;
    let pointsSpent = 0;

    // If normal member: chatting costs points per message!
    if (currentUser.memberTier === 'normal') {
      if (currentUser.points < CHAT_COST) {
        showToast(
          '积分不足无法发送',
          `普通会员发送消息需消耗 ${CHAT_COST} 积分/条。请充值积分、每日签到或升级为无限免费畅聊VIP！`,
          'warning'
        );
        setShowVipModal(true);
        return false;
      }

      pointsSpent = CHAT_COST;
      setCurrentUser((prev) => ({
        ...prev,
        points: prev.points - CHAT_COST,
      }));

      setTransactions((prev) => [
        {
          id: 'tx-' + Date.now(),
          title: `向 ${targetUser.name} 发送私聊消息`,
          amount: -CHAT_COST,
          timestamp: Date.now(),
          type: 'chat',
        },
        ...prev,
      ]);

      showToast(
        '消息已发送',
        `本次消耗 ${CHAT_COST} 积分，剩余 ${currentUser.points - CHAT_COST} 积分`,
        'info'
      );
    } else {
      showToast('消息已发送', `VIP尊享特权：无限次免费畅聊，无需消耗积分`, 'success');
    }

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: currentUser.id,
      receiverId: receiverId,
      text: text.trim(),
      timestamp: Date.now(),
      pointsSpent,
      type: 'text',
    };

    setChatMessages((prev) => ({
      ...prev,
      [receiverId]: [...(prev[receiverId] || []), newMsg],
    }));

    // Realistic automated reply simulation after 2 seconds
    setTimeout(() => {
      const replies = [
        `哈哈很高兴认识你！你在${currentUser.currentCity}工作多久啦？`,
        `哇，感觉我们性格挺像的！平时周末一般喜欢做什么呢？`,
        `老乡见老乡，两眼泪汪汪~ 你平时会自己做饭吗？`,
        `看到你的主页啦，感觉很真诚！有空我们可以约在一起喝杯咖啡或者吃个饭呀☕`,
        `收到啦！平时你喜欢看什么类型的电影或者运动？`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        senderId: receiverId,
        receiverId: currentUser.id,
        text: randomReply,
        timestamp: Date.now(),
        type: 'text',
      };

      setChatMessages((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), replyMsg],
      }));

      showToast(`${targetUser.name} 回复了你`, randomReply, 'info');
    }, 2200);

    return true;
  };

  // Gift sending
  const sendGift = (
    receiverId: string,
    giftName: string,
    pointsCost: number,
    giftIcon: string
  ): boolean => {
    const targetUser = users.find((u) => u.id === receiverId);
    if (!targetUser) return false;

    if (currentUser.points < pointsCost) {
      showToast(
        '积分不足',
        `赠送【${giftName}】需要 ${pointsCost} 积分，当前剩余 ${currentUser.points} 积分。`,
        'warning'
      );
      setShowVipModal(true);
      return false;
    }

    setCurrentUser((prev) => ({ ...prev, points: prev.points - pointsCost }));
    setTransactions((prev) => [
      {
        id: 'tx-' + Date.now(),
        title: `向 ${targetUser.name} 赠送礼物【${giftName}】`,
        amount: -pointsCost,
        timestamp: Date.now(),
        type: 'gift',
      },
      ...prev,
    ]);

    const giftMsg: ChatMessage = {
      id: 'gift-' + Date.now(),
      senderId: currentUser.id,
      receiverId,
      text: `赠送了专属礼物「${giftName}」${giftIcon}`,
      timestamp: Date.now(),
      pointsSpent: pointsCost,
      type: 'gift',
      extraData: { giftName, giftIcon },
    };

    setChatMessages((prev) => ({
      ...prev,
      [receiverId]: [...(prev[receiverId] || []), giftMsg],
    }));

    confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    showToast(
      '礼物赠送成功！',
      `送出了 ${giftName}，消耗 ${pointsCost} 积分，好感度大幅提升！`,
      'success'
    );

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'reply-gift-' + Date.now(),
        senderId: receiverId,
        receiverId: currentUser.id,
        text: `哇！收到你的「${giftName}」啦，太用心了，超级开心！谢谢你🥰`,
        timestamp: Date.now(),
        type: 'text',
      };
      setChatMessages((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), replyMsg],
      }));
    }, 1800);

    return true;
  };

  // Request WeChat exchange
  const requestWechatExchange = (receiverId: string) => {
    const targetUser = users.find((u) => u.id === receiverId);
    if (!targetUser) return;

    const exchangeMsg: ChatMessage = {
      id: 'wx-req-' + Date.now(),
      senderId: currentUser.id,
      receiverId,
      text: `向对方发起了【微信互通申请】：我的微信号是 ${currentUser.wechatId}`,
      timestamp: Date.now(),
      type: 'wechat_exchange',
      extraData: { status: 'pending' },
    };

    setChatMessages((prev) => ({
      ...prev,
      [receiverId]: [...(prev[receiverId] || []), exchangeMsg],
    }));

    showToast('已发出微信交换申请', `对方同意后将自动在对话中展示双方微信号`, 'info');

    setTimeout(() => {
      // Auto accept simulated
      setUsers((prev) =>
        prev.map((u) => (u.id === receiverId ? { ...u, wechatUnlocked: true } : u))
      );

      const acceptMsg: ChatMessage = {
        id: 'wx-acc-' + Date.now(),
        senderId: receiverId,
        receiverId: currentUser.id,
        text: `我已同意你的微信交换申请！我的微信号是：${targetUser.wechatId}，欢迎添加微信随时联系哦~`,
        timestamp: Date.now(),
        type: 'wechat_exchange',
        extraData: { status: 'accepted' },
      };

      setChatMessages((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), acceptMsg],
      }));

      showToast('对方已同意微信交换！', `${targetUser.name} 的微信号已自动解锁`, 'success');
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.65 } });
    }, 3000);
  };

  const toggleLikeUser = (targetUserId: string) => {
    setLikedUserIds((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(targetUserId);
      if (isLiked) {
        next.delete(targetUserId);
        showToast('已取消心动', '', 'info');
      } else {
        next.add(targetUserId);
        const u = users.find((item) => item.id === targetUserId);
        showToast('已标记心动！', `已将 ${u?.name || 'TA'} 加入心动列表`, 'success');
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      }
      return next;
    });
  };

  const checkInToday = () => {
    if (currentUser.hasCheckedInToday) {
      showToast('今日已完成签到', '明天再来领取签到积分吧！', 'info');
      return;
    }

    const BONUS = currentUser.memberTier === 'normal' ? 25 : 50;
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points + BONUS,
      hasCheckedInToday: true,
    }));

    setTransactions((prev) => [
      {
        id: 'tx-' + Date.now(),
        title: `每日签到领积分 (${currentUser.memberTier === 'normal' ? '普通会员' : 'VIP双倍'})`,
        amount: BONUS,
        timestamp: Date.now(),
        type: 'check_in',
      },
      ...prev,
    ]);

    confetti({ particleCount: 60, spread: 75, origin: { y: 0.6 } });
    showToast(
      '签到成功！',
      `获得 +${BONUS} 积分！当前积分余额：${currentUser.points + BONUS}`,
      'success'
    );
  };

  const completeVerification = (type: 'real_person' | 'real_name', nameInput?: string, _idInput?: string) => {
    if (type === 'real_person') {
      const BONUS = 100;
      setCurrentUser((prev) => ({
        ...prev,
        points: prev.points + BONUS,
        verification: { ...prev.verification, isRealPerson: true },
      }));
      setTransactions((prev) => [
        {
          id: 'tx-' + Date.now(),
          title: '完成真人活体面部认证奖励',
          amount: BONUS,
          timestamp: Date.now(),
          type: 'verify_reward',
        },
        ...prev,
      ]);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
      showToast('真人活体认证通过！', `获得官方【真人认证】权威蓝标与 +${BONUS} 积分奖励！`, 'success');
    } else {
      const BONUS = 150;
      setCurrentUser((prev) => ({
        ...prev,
        points: prev.points + BONUS,
        verification: { ...prev.verification, isRealName: true },
        name: nameInput ? `${nameInput.charAt(0)}**` : prev.name,
      }));
      setTransactions((prev) => [
        {
          id: 'tx-' + Date.now(),
          title: '完成公安数据库实名认证奖励',
          amount: BONUS,
          timestamp: Date.now(),
          type: 'verify_reward',
        },
        ...prev,
      ]);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
      showToast('实名认证通过！', `获得【实名认证】专属盾牌勋章与 +${BONUS} 积分奖励！`, 'success');
    }
  };

  const upgradeTier = (tier: MemberTier) => {
    setCurrentUser((prev) => ({
      ...prev,
      memberTier: tier,
      points: prev.points + (tier === 'svip' ? 500 : 200),
    }));

    setTransactions((prev) => [
      {
        id: 'tx-' + Date.now(),
        title: `开通升级为 ${tier === 'svip' ? '至尊SVIP会员' : '黄金VIP会员'}`,
        amount: tier === 'svip' ? 500 : 200,
        timestamp: Date.now(),
        type: 'recharge',
      },
      ...prev,
    ]);

    confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
    showToast(
      '会员开通成功！',
      `您已升级为${tier === 'svip' ? '至尊SVIP会员' : '黄金VIP会员'}，微信号免费直看，私聊免消耗积分！`,
      'success'
    );
    setShowVipModal(false);
  };

  const rechargePoints = (amount: number, label: string) => {
    setCurrentUser((prev) => ({ ...prev, points: prev.points + amount }));
    setTransactions((prev) => [
      {
        id: 'tx-' + Date.now(),
        title: `在线充值积分: ${label}`,
        amount,
        timestamp: Date.now(),
        type: 'recharge',
      },
      ...prev,
    ]);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    showToast('充值成功', `已充值 +${amount} 积分，当前余额 ${currentUser.points + amount} 积分`, 'success');
    setShowVipModal(false);
  };

  const updateCurrentUser = (updates: Partial<CurrentUser>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('个人资料已更新', '新的籍贯、现居城市与职业已生效', 'success');
  };

  const createMeetupActivity = (activityData: any) => {
    const newAct: MeetupActivity = {
      id: 'act-' + Date.now(),
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorAvatar: currentUser.avatar,
      creatorGender: currentUser.gender,
      creatorAge: currentUser.age,
      creatorCity: currentUser.currentCity,
      joinedCount: 1,
      joinedUserAvatars: [currentUser.avatar],
      isJoined: true,
      ...activityData,
    };
    setActivities((prev) => [newAct, ...prev]);
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });
    showToast('活动发布成功！', '同城小伙伴现在可以在约会广场看到并申请加入啦', 'success');
    setShowActivityCreateModal(false);
  };

  const joinMeetupActivity = (activityId: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          if (act.isJoined) {
            showToast('已退出该活动', '', 'info');
            return {
              ...act,
              isJoined: false,
              joinedCount: Math.max(1, act.joinedCount - 1),
              joinedUserAvatars: act.joinedUserAvatars.filter((av) => av !== currentUser.avatar),
            };
          } else {
            showToast('已成功报名！', `已加入「${act.title}」，发起人将与你联系`, 'success');
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
            return {
              ...act,
              isJoined: true,
              joinedCount: act.joinedCount + 1,
              joinedUserAvatars: [...act.joinedUserAvatars, currentUser.avatar],
            };
          }
        }
        return act;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        filteredUsers,
        filterOptions,
        setFilterOptions,
        resetFilters,
        activeTab,
        setActiveTab,
        selectedUserId,
        setSelectedUserId,
        activeChatUserId,
        setActiveChatUserId,
        showVipModal,
        setShowVipModal,
        showVerificationModal,
        setShowVerificationModal,
        showIconShowcaseModal,
        setShowIconShowcaseModal,
        showActivityCreateModal,
        setShowActivityCreateModal,
        showProfileEditModal,
        setShowProfileEditModal,
        showShareCardModal,
        setShowShareCardModal,
        showInstallModal,
        setShowInstallModal,
        isDarkMode,
        toggleDarkMode,
        unlockWeChat,
        sendMessage,
        sendGift,
        requestWechatExchange,
        toggleLikeUser,
        checkInToday,
        completeVerification,
        upgradeTier,
        rechargePoints,
        updateCurrentUser,
        createMeetupActivity,
        joinMeetupActivity,
        chatMessages,
        activities,
        transactions,
        likedUserIds,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
