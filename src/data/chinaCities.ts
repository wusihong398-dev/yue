export interface ProvinceData {
  province: string;
  cities: string[];
}

export const CHINA_PROVINCES: ProvinceData[] = [
  {
    province: '直辖市',
    cities: ['北京市', '上海市', '广州市', '深圳市', '天津市', '重庆市'],
  },
  {
    province: '广东省',
    cities: ['广州市', '深圳市', '东莞市', '佛山市', '珠海市', '惠州市', '中山市', '汕头市', '江门市', '湛江市'],
  },
  {
    province: '浙江省',
    cities: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '台州市'],
  },
  {
    province: '江苏省',
    cities: ['南京市', '苏州市', '无锡市', '常州市', '南通市', '徐州市', '扬州市', '镇江市'],
  },
  {
    province: '四川省',
    cities: ['成都市', '绵阳市', '德阳市', '南充市', '宜宾市', '泸州市', '乐山市', '达州市'],
  },
  {
    province: '湖北省',
    cities: ['武汉市', '宜昌市', '襄阳市', '荆州市', '黄冈市', '孝感市', '十堰市'],
  },
  {
    province: '湖南省',
    cities: ['长沙市', '株洲市', '湘潭市', '衡阳市', '岳阳市', '常德市', '郴州市'],
  },
  {
    province: '陕西省',
    cities: ['西安市', '咸阳市', '宝鸡市', '渭南市', '延安市', '汉中市', '榆林市'],
  },
  {
    province: '山东省',
    cities: ['济南市', '青岛市', '烟台市', '潍坊市', '威海市', '临沂市', '淄博市'],
  },
  {
    province: '福建省',
    cities: ['厦门市', '福州市', '泉州市', '漳州市', '莆田市', '龙岩市'],
  },
  {
    province: '河南省',
    cities: ['郑州市', '洛阳市', '开封市', '新乡市', '焦作市', '南阳市', '商丘市'],
  },
  {
    province: '安徽省',
    cities: ['合肥市', '芜湖市', '蚌埠市', '安庆市', '黄山市', '马鞍山市'],
  },
  {
    province: '江西省',
    cities: ['南昌市', '赣州市', '九江市', '上饶市', '宜春市', '景德镇市'],
  },
  {
    province: '河北省',
    cities: ['石家庄市', '保定市', '唐山市', '廊坊市', '秦皇岛市', '沧州市'],
  },
  {
    province: '辽宁省',
    cities: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市'],
  },
  {
    province: '云南省',
    cities: ['昆明市', '大理市', '丽江市', '曲靖市', '玉溪市', '西双版纳'],
  },
];

export const POPULAR_CITIES = [
  '深圳市',
  '广州市',
  '上海市',
  '北京市',
  '成都市',
  '杭州市',
  '武汉市',
  '长沙市',
  '南京市',
  '重庆市',
  '西安市',
  '苏州市',
];

export const OCCUPATION_CATEGORIES = [
  { id: 'all', name: '全部职业' },
  { id: 'tech', name: '互联网/IT/数码' },
  { id: 'finance', name: '金融/银行/证券' },
  { id: 'creative', name: '设计/传媒/自媒体' },
  { id: 'edu_med', name: '教育/科研/医疗' },
  { id: 'gov_corp', name: '公务员/国企事业单位' },
  { id: 'business', name: '商务/销售/运营' },
  { id: 'freelance', name: '自由职业/创业经商' },
  { id: 'student', name: '在读研究生/大学生' },
];

// City approx coordinate mapping for calculating relative distances in km
const CITY_COORDS: Record<string, [number, number]> = {
  '深圳市': [22.5431, 114.0579],
  '广州市': [23.1291, 113.2644],
  '东莞市': [23.0205, 113.7518],
  '佛山市': [23.0215, 113.1214],
  '珠海市': [22.2707, 113.5767],
  '惠州市': [23.1118, 114.4162],
  '上海市': [31.2304, 121.4737],
  '北京市': [39.9042, 116.4074],
  '成都市': [30.5728, 104.0668],
  '杭州市': [30.2741, 120.1551],
  '武汉市': [30.5928, 114.3055],
  '长沙市': [28.2282, 112.9388],
  '南京市': [32.0603, 118.7969],
  '重庆市': [29.5630, 106.5516],
  '西安市': [34.3416, 108.9398],
  '苏州市': [31.2989, 120.5853],
  '厦门市': [24.4798, 118.0894],
  '郑州市': [34.7466, 113.6253],
  '天津市': [39.0842, 117.2009],
  '青岛市': [36.0671, 120.3826],
};

export function calculateDistanceKm(cityA: string, cityB: string, baseNearbyOffset = 0): number {
  if (cityA === cityB) {
    // Within same city: return local distance between 0.5km and 28km
    return Number((baseNearbyOffset || 1.2 + Math.random() * 8.5).toFixed(1));
  }

  const coordA = CITY_COORDS[cityA];
  const coordB = CITY_COORDS[cityB];

  if (!coordA || !coordB) {
    return Math.floor(200 + Math.random() * 800);
  }

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = rad(coordB[0] - coordA[0]);
  const dLon = rad(coordB[1] - coordA[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(coordA[0])) * Math.cos(rad(coordB[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
