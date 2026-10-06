export type Gender = 'male' | 'female';

export type MemberTier = 'normal' | 'vip' | 'svip';

export interface VerificationStatus {
  isRealPerson: boolean; // 真人活体认证
  isRealName: boolean;   // 公安实名认证
  isCareerVerified?: boolean; // 职业认证
  isEduVerified?: boolean;    // 学历认证
}

export interface UserProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  height: number;
  occupation: string;
  occupationCategory: string;
  currentProvince: string;
  currentCity: string;
  hometownProvince: string;
  hometownCity: string;
  photos: string[];
  avatar: string;
  wechatId: string;
  bio: string;
  tags: string[];
  interests: string[];
  datingExpectation: string;
  distanceKm: number;
  isOnline: boolean;
  lastActive: string;
  verification: VerificationStatus;
  memberTier: MemberTier;
  matchScore: number;
  wechatUnlocked?: boolean; // 是否已被当前用户解锁查看
}

export interface FilterOptions {
  mode: 'nearby' | 'city' | 'province_city' | 'hometown';
  targetProvince: string;
  targetCity: string;
  gender: 'all' | 'male' | 'female';
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  onlyRealPerson: boolean;
  onlyRealName: boolean;
  hometownOnly: boolean;
  occupationCategory: string;
  sortBy: 'distance' | 'active' | 'match' | 'new';
  searchKeyword: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  pointsSpent?: number;
  type?: 'text' | 'wechat_exchange' | 'gift' | 'system';
  extraData?: {
    giftName?: string;
    giftIcon?: string;
    status?: 'pending' | 'accepted' | 'rejected';
  };
}

export interface MeetupActivity {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorGender: Gender;
  creatorAge: number;
  creatorCity: string;
  title: string;
  category: '约饭/美食' | '咖啡/微醺' | '剧本杀/桌游' | '运动/户外' | '电影/演出' | '旅行/周边游';
  city: string;
  district: string;
  locationName: string;
  dateTime: string;
  costType: 'AA制' | '发起人请客' | '男生请客' | '女生免费';
  description: string;
  joinedCount: number;
  maxPeople: number;
  joinedUserAvatars: string[];
  isJoined?: boolean;
}

export interface PointTransaction {
  id: string;
  title: string;
  amount: number;
  timestamp: number;
  type: 'chat' | 'unlock_wechat' | 'check_in' | 'verify_reward' | 'recharge' | 'gift';
}

export interface CurrentUser {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  height: number;
  occupation: string;
  occupationCategory: string;
  currentProvince: string;
  currentCity: string;
  hometownProvince: string;
  hometownCity: string;
  photos: string[];
  avatar: string;
  wechatId: string;
  bio: string;
  tags: string[];
  memberTier: MemberTier;
  points: number;
  verification: VerificationStatus;
  hasCheckedInToday: boolean;
}
