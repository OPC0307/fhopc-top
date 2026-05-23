export interface PolicyData {
  slug: string;
  name: string;
  category: 'national' | 'star-city' | 'has-policy' | 'no-policy';
  badge?: string;
  summary: string;
  highlights: { title: string; desc: string }[];
  updatedAt: string;
}

export const provinces: PolicyData[] = [
  { slug: 'national', name: '国家通用政策', category: 'national', summary: '无论注册在哪个省份，以下国家层面的普惠政策均可享受——增值税免征、个税减半、创业担保贷款等。', highlights: [{ title: '增值税免征', desc: '季度销售额≤30万免征增值税' }, { title: '个税减半', desc: '年应纳税所得额≤200万减半征收' }, { title: '创业担保贷款', desc: '个人最高30万，企业最高500万' }], updatedAt: '2026-05' },
  { slug: 'key-cities', name: '重点城市速查', category: 'star-city', summary: '北京、上海、杭州、深圳等城市已出台AI一人公司专项扶持政策，算力补贴最高可达2000万。', highlights: [{ title: '北京海淀', desc: 'OPC专项10万创业资金+模型券补贴' }, { title: '杭州', desc: '年度2.5亿算力券池' }, { title: '上海', desc: 'AI专项扶持政策' }], updatedAt: '2026-05' },
  { slug: 'beijing', name: '北京', category: 'star-city', badge: '⭐', summary: '海淀区已出台全国首个区级OPC（一人公司）专项政策，中关村科学城年度AI扶持资金超10亿元。', highlights: [{ title: '海淀OPC专项', desc: '10万元创业资金+模型券最高200万' }, { title: '中关村算力补贴', desc: '单个项目最高3000万' }, { title: '青年安居补贴', desc: '应届生每月1000元租房补贴' }], updatedAt: '2026-05' },
  { slug: 'shanghai', name: '上海', category: 'star-city', badge: '⭐', summary: '上海自贸区、临港新片区、张江科学城等多区叠加AI产业扶持政策，一人公司可享办公场地和算力双重补贴。', highlights: [{ title: '临港新片区', desc: 'AI企业最高500万补贴' }, { title: '张江科学城', desc: '算力补贴+办公场地支持' }, { title: '自贸区政策', desc: '跨境数据流动试点' }], updatedAt: '2026-05' },
  { slug: 'zhejiang', name: '浙江', category: 'star-city', badge: '⭐', summary: '全国首个推出"三券联动"（算力券+语料券+模型券）补贴模式的省份，杭州年度算力券2.5亿。', highlights: [{ title: '三券联动', desc: '算力券+语料券+模型券组合补贴' }, { title: '杭州算力券', desc: '年度2.5亿规模' }, { title: '滨江区叠加', desc: '区级算力券最高1亿' }], updatedAt: '2026-05' },
  { slug: 'guangdong', name: '广东', category: 'star-city', badge: '⭐', summary: '深圳、广州在AI赛道扶持力度大，深圳已出台"20+8"产业集群政策，一人公司可享初创补贴。', highlights: [{ title: '深圳AI扶持', desc: '初创企业最高100万启动资金' }, { title: '广州', desc: 'AI产业园区租金补贴' }, { title: '大湾区政策', desc: '港澳人才跨境创业支持' }], updatedAt: '2026-05' },
  { slug: 'sichuan', name: '四川', category: 'star-city', badge: '⭐', summary: '成都高新区AI产业扶持力度大，一人公司在天府新区可享办公场地和算力双重补贴。', highlights: [{ title: '成都高新', desc: 'AI企业最高300万补贴' }, { title: '天府新区', desc: '办公场地补贴+算力支持' }, { title: '绵阳科技城', desc: '军民融合AI创新支持' }], updatedAt: '2026-05' },
  { slug: 'hubei', name: '湖北', category: 'has-policy', summary: '武汉东湖高新区（光谷）AI产业政策密集，一人公司注册在光谷可享办公场地和算力券双重支持。', highlights: [{ title: '光谷AI政策', desc: '最高200万算力补贴' }, { title: '武汉', desc: '大学生创业最高50万扶持' }, { title: '襄阳/宜昌', desc: '省级AI产业园区支持' }], updatedAt: '2026-05' },
  { slug: 'hunan', name: '湖南', category: 'has-policy', summary: '长沙马栏山视频文创园、湘江新区对AI+内容赛道有专项扶持，核定征收政策灵活。', highlights: [{ title: '马栏山园区', desc: 'AI+内容赛道专项补贴' }, { title: '湘江新区', desc: '总部经济+算力双重支持' }, { title: '核定征收', desc: '税收扶持园区综合税率约1.56%' }], updatedAt: '2026-05' },
  { slug: 'jiangsu', name: '江苏', category: 'has-policy', summary: '苏州、南京在AI算力补贴和创业扶持方面力度不小，苏州工业园区有专项AI产业基金。', highlights: [{ title: '苏州工业园', desc: 'AI专项产业基金' }, { title: '南京', desc: '软件谷AI企业租金补贴' }, { title: '无锡', desc: '物联网+AI融合支持' }], updatedAt: '2026-05' },
  { slug: 'shandong', name: '山东', category: 'has-policy', summary: '济南、青岛AI产业园政策完善，一人公司在山东可享省级科技创新券和市级创业补贴。', highlights: [{ title: '济南', desc: 'AI产业园区专项补贴' }, { title: '青岛', desc: '海洋AI+智能制造双赛道' }, { title: '省级政策', desc: '科技创新券支持' }], updatedAt: '2026-05' },
  { slug: 'fujian', name: '福建', category: 'has-policy', summary: '福州、厦门AI产业扶持力度逐年加大，厦门火炬高新区有专项AI企业孵化政策。', highlights: [{ title: '厦门火炬', desc: 'AI企业孵化专项支持' }, { title: '福州', desc: '数字福建AI+产业融合' }, { title: '泉州', desc: '制造业AI升级补贴' }], updatedAt: '2026-05' },
  { slug: 'chongqing', name: '重庆', category: 'has-policy', summary: '重庆两江新区AI产业集聚，一人公司可享西部大开发税收优惠叠加地方补贴。', highlights: [{ title: '两江新区', desc: 'AI企业办公+算力补贴' }, { title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '高新区', desc: '创业启动资金支持' }], updatedAt: '2026-05' },
  { slug: 'anhui', name: '安徽', category: 'has-policy', summary: '合肥"科大硅谷"AI+科创生态成熟，中国声谷有专项AI企业扶持政策。', highlights: [{ title: '科大硅谷', desc: 'AI+科创企业孵化支持' }, { title: '中国声谷', desc: 'AI语音产业专项补贴' }, { title: '合肥高新区', desc: '最高100万启动资金' }], updatedAt: '2026-05' },
  { slug: 'tianjin', name: '天津', category: 'has-policy', summary: '天津滨海新区AI产业集聚，一人公司在天津可享京津冀协同政策红利。', highlights: [{ title: '滨海新区', desc: 'AI企业租金+算力补贴' }, { title: '京津冀协同', desc: '跨区域创业支持政策' }, { title: '高新区', desc: '留学生创业专项扶持' }], updatedAt: '2026-05' },
  { slug: 'hebei', name: '河北', category: 'has-policy', summary: '雄安新区AI产业规划完善，石家庄、廊坊有AI产业园区入驻补贴。', highlights: [{ title: '雄安新区', desc: 'AI产业规划+企业入驻支持' }, { title: '石家庄', desc: 'AI产业园区租金减免' }, { title: '廊坊', desc: '京津冀AI协同发展' }], updatedAt: '2026-05' },
  { slug: 'henan', name: '河南', category: 'has-policy', summary: '郑州大数据产业园、洛阳AI产业基地对一人公司有入驻补贴和政策支持。', highlights: [{ title: '郑州', desc: '大数据AI企业专项补贴' }, { title: '洛阳', desc: 'AI产业基地入驻支持' }, { title: '省级政策', desc: '科技创新券+创业补贴' }], updatedAt: '2026-05' },
  { slug: 'shaanxi', name: '陕西', category: 'has-policy', summary: '西安高新区AI产业基础雄厚，一人公司在西安可享受西部大开发税收优惠叠加高新区补贴。', highlights: [{ title: '西安高新', desc: 'AI企业最高200万补贴' }, { title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '碑林环大学', desc: '硬科技创新街区支持' }], updatedAt: '2026-05' },
  { slug: 'guizhou', name: '贵州', category: 'has-policy', summary: '贵阳大数据产业成熟，一人公司在贵州可享受大数据专项扶持和西部大开发双重优惠。', highlights: [{ title: '贵阳大数据', desc: 'AI+大数据企业专项补贴' }, { title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '贵安新区', desc: '算力中心企业入驻支持' }], updatedAt: '2026-05' },
  { slug: 'heilongjiang', name: '黑龙江', category: 'has-policy', summary: '哈尔滨高新区AI产业培育政策，一人公司在黑龙江可享寒地经济和AI融合专项支持。', highlights: [{ title: '哈尔滨高新', desc: 'AI企业孵化专项支持' }, { title: '寒地经济', desc: 'AI+冰雪产业融合' }, { title: '省级政策', desc: '高新技术企业税收优惠' }], updatedAt: '2026-05' },
  { slug: 'hainan', name: '海南', category: 'has-policy', summary: '海南自贸港一人公司可享15%企业所得税优惠+个人所得税最高15%的超低税率。', highlights: [{ title: '自贸港税收', desc: '企业所得税15%+个税最高15%' }, { title: '海口复兴城', desc: 'AI互联网企业入驻补贴' }, { title: '三亚崖州湾', desc: '科技城AI企业支持' }], updatedAt: '2026-05' },
  { slug: 'shanxi', name: '山西', category: 'no-policy', summary: '山西暂无省级AI专项政策，但可享受国家普惠政策和山西转型综合改革示范区入驻优惠。', highlights: [{ title: '综改示范区', desc: '企业入驻租金减免' }, { title: '国家普惠', desc: '增值税+个税普适优惠' }, { title: '太原', desc: '高新区创业支持' }], updatedAt: '2026-05' },
  { slug: 'neimenggu', name: '内蒙古', category: 'no-policy', summary: '内蒙古暂无AI专项政策，但呼和浩特、包头大数据产业园有企业入驻支持。', highlights: [{ title: '呼和浩特', desc: '大数据产业园入驻补贴' }, { title: '包头', desc: '稀土+AI融合产业支持' }, { title: '国家普惠', desc: '西部大开发税收优惠' }], updatedAt: '2026-05' },
  { slug: 'jiangxi', name: '江西', category: 'no-policy', summary: '江西暂无AI专项政策，但南昌VR产业基地有相关企业入驻补贴。', highlights: [{ title: '南昌VR基地', desc: 'VR+AI企业入驻支持' }, { title: '赣州', desc: '数字经济产业园补贴' }, { title: '国家普惠', desc: '增值税+个税普适优惠' }], updatedAt: '2026-05' },
  { slug: 'guangxi', name: '广西', category: 'no-policy', summary: '广西暂无AI专项政策，但南宁东盟信息港建设中有数字经济企业入驻支持。', highlights: [{ title: '南宁东盟', desc: '数字经济企业入驻补贴' }, { title: '桂林', desc: '科技企业孵化器支持' }, { title: '国家普惠', desc: '西部大开发+民族地区优惠' }], updatedAt: '2026-05' },
  { slug: 'yunnan', name: '云南', category: 'no-policy', summary: '云南暂无AI专项政策，但昆明高新区有科技企业孵化支持。', highlights: [{ title: '昆明高新', desc: '科技企业孵化补贴' }, { title: '丽江/大理', desc: '数字游民社区兴起' }, { title: '国家普惠', desc: '西部大开发税收优惠' }], updatedAt: '2026-05' },
  { slug: 'xizang', name: '西藏', category: 'no-policy', summary: '西藏暂无AI专项政策，但民族地区企业所得税优惠力度大。', highlights: [{ title: '民族地区', desc: '企业所得税低至9%' }, { title: '拉萨', desc: '高新区创业支持' }, { title: '国家普惠', desc: '西部大开发+民族地区优惠' }], updatedAt: '2026-05' },
  { slug: 'gansu', name: '甘肃', category: 'no-policy', summary: '甘肃暂无AI专项政策，但兰州高新区有科技创新企业孵化支持。', highlights: [{ title: '兰州高新', desc: '科技创新企业孵化' }, { title: '国家普惠', desc: '西部大开发税收优惠' }, { title: '丝绸之路', desc: '数字经济走廊机会' }], updatedAt: '2026-05' },
  { slug: 'qinghai', name: '青海', category: 'no-policy', summary: '青海暂无AI专项政策，可享受西部大开发税收优惠和国家普惠政策。', highlights: [{ title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '西宁', desc: '数字经济创业支持' }, { title: '国家普惠', desc: '增值税+个税普适优惠' }], updatedAt: '2026-05' },
  { slug: 'ningxia', name: '宁夏', category: 'no-policy', summary: '宁夏暂无AI专项政策，但银川智慧城市建设项目中有数字经济企业参与机会。', highlights: [{ title: '银川', desc: '智慧城市+数字经济' }, { title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '国家普惠', desc: '增值税+个税普适优惠' }], updatedAt: '2026-05' },
  { slug: 'xinjiang', name: '新疆', category: 'no-policy', summary: '新疆暂无AI专项政策，但乌鲁木齐高新区有科技企业入驻支持。', highlights: [{ title: '乌鲁木齐', desc: '高新区科技企业支持' }, { title: '西部大开发', desc: '15%企业所得税优惠' }, { title: '一带一路', desc: '中亚市场窗口机会' }], updatedAt: '2026-05' },
  { slug: 'liaoning', name: '辽宁', category: 'no-policy', summary: '辽宁暂无AI专项政策，但沈阳、大连软件园有IT企业入驻支持。', highlights: [{ title: '沈阳', desc: '软件园IT企业入驻补贴' }, { title: '大连', desc: '软件外包+AI人才储备' }, { title: '国家普惠', desc: '东北振兴相关扶持' }], updatedAt: '2026-05' },
  { slug: 'jilin', name: '吉林', category: 'no-policy', summary: '吉林暂无AI专项政策，但长春高新区有科技创新企业孵化支持。', highlights: [{ title: '长春高新', desc: '科技企业孵化器支持' }, { title: '吉林市', desc: '数字经济创业机会' }, { title: '国家普惠', desc: '东北振兴相关扶持' }], updatedAt: '2026-05' },
];

export function getProvince(slug: string): PolicyData | undefined {
  return provinces.find(p => p.slug === slug);
}

export function getProvincesByCategory(category: PolicyData['category']): PolicyData[] {
  return provinces.filter(p => p.category === category);
}