import { NextRequest, NextResponse } from 'next/server';

const EXPERIENCE_MAP: Record<string, number> = {
  none: 0,
  'less-than-1': 1,
  '1-3': 2,
  '3-plus': 3,
};

const COMMITMENT_MAP: Record<string, number> = {
  'less-than-5': 0,
  '5-15': 1,
  '15-30': 2,
  '30-plus': 3,
};

const BUDGET_MAP: Record<string, number> = {
  none: 0,
  'under-1000': 1,
  '1000-5000': 2,
  '5000-plus': 3,
};

const BLOCKER_MAP: Record<string, number> = {
  'have-direction': 1,
  validating: 2,
  'unstable-income': 3,
  'stable-income': 3,
  other: 1,
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { direction, experience, commitment, budget, blocker } = body;

  if (!direction || !experience || !commitment || !budget || !blocker) {
    return NextResponse.json({ error: '请填写所有问题' }, { status: 400 });
  }

  const expScore = EXPERIENCE_MAP[experience] ?? 0;
  const comScore = COMMITMENT_MAP[commitment] ?? 0;
  const budScore = BUDGET_MAP[budget] ?? 0;
  const blkScore = BLOCKER_MAP[blocker] ?? 0;

  const score = expScore + comScore + budScore + blkScore;
  const maxScore = 12;

  const weakPoints: string[] = [];
  if (expScore === 0) weakPoints.push('行业经验不足');
  if (comScore <= 1) weakPoints.push('时间投入偏低');
  if (budScore === 0) weakPoints.push('资金投入为零');
  if (blkScore <= 1 && score < 8) weakPoints.push('方向不够清晰');

  if (score >= 8) {
    return NextResponse.json({
      score,
      maxScore,
      level: 'recommended',
      levelLabel: '状态不错',
      recommendation: {
        plan: '深度协作',
        planPrice: '¥999',
        summary:
          '你有明确的行业积累和投入意愿，方向成熟度较高。推荐深度协作模式——我们把你的方向拆解为30天可执行方案，你只负责核心产出。',
      },
      weakPoints,
      feedback:
        '你有方向有经验，投入意愿也充足。适合直接进入深度协作阶段，把想法落地。',
    });
  }

  if (score >= 5) {
    let feedback: string;
    if (blkScore === 1) {
      feedback = '你有方向有经验，缺的是怎么把方向做成产品。';
    } else if (budScore === 0) {
      feedback = '方向可行，但零资金启动挑战较大。建议先准备一笔最小启动资金。';
    } else {
      feedback = '你有基础条件，但在个别维度还可以再准备充分一些。';
    }

    return NextResponse.json({
      score,
      maxScore,
      level: 'recommended',
      levelLabel: '值得继续',
      recommendation: {
        plan: '经营诊断',
        planPrice: '¥399',
        summary:
          '你有行业经验且愿意投入，方向值得深入。推荐从经营诊断开始，30天内把你的方向跑通。',
      },
      weakPoints,
      feedback,
    });
  }

  const adjustments: string[] = [];
  if (expScore === 0)
    adjustments.push('花2-4周深入了解目标行业，可以通过兼职、访谈、调研等方式');
  if (comScore <= 1)
    adjustments.push('每周至少保证15小时以上投入，一人公司本质上是时间换空间');
  if (budScore === 0)
    adjustments.push(
      '准备最少1000元/月的启动预算，用于工具、推广等基础开支',
    );
  if (blkScore <= 1)
    adjustments.push(
      '把方向写下来，做一次最小范围的市场验证——哪怕只是和10个潜在客户聊',
    );

  let feedback: string;
  if (expScore === 0 && comScore <= 1) {
    feedback =
      '没有行业经验且时间投入有限，是目前最大的障碍。建议先花时间了解行业，再评估是否适合启动。';
  } else if (budScore === 0 && blkScore <= 1) {
    feedback =
      '方向不够明确且没有资金准备，启动风险较高。建议先理清方向，做一些市场调研。';
  } else {
    feedback =
      '综合来看，目前启动的时机还不成熟。建议参考调整建议，准备好后再来评估。';
  }

  return NextResponse.json({
    score,
    maxScore,
    level: 'not-ready',
    levelLabel: '准备不足',
    recommendation: null,
    weakPoints,
    feedback,
    adjustments,
  });
}