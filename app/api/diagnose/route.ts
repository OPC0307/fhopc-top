import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

async function sendNotification(body: Record<string, string>, score: number, level: string) {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: 'fhopc <noreply@fhopc.top>',
      to: ['hello@fhopc.top'],
      subject: `新评估: ${score}分 - ${body.direction?.slice(0, 30) || ''}`,
      html: [
        '<table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">',
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">姓名</td>',
        `<td style="padding:12px;border:1px solid #ddd">${body.name || '-'}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">邮箱</td>',
        `<td style="padding:12px;border:1px solid #ddd">${body.email || '-'}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">微信</td>',
        `<td style="padding:12px;border:1px solid #ddd">${body.wechat || '-'}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">手机</td>',
        `<td style="padding:12px;border:1px solid #ddd">${body.phone || '-'}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">方向</td>',
        `<td style="padding:12px;border:1px solid #ddd">${body.direction || '-'}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">评分</td>',
        `<td style="padding:12px;border:1px solid #ddd">${score}/100</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">推荐方案</td>',
        `<td style="padding:12px;border:1px solid #ddd">${level}</td></tr>`,
        '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">时间</td>',
        `<td style="padding:12px;border:1px solid #ddd">${new Date().toLocaleString('zh-CN')}</td></tr>`,
        '</table>',
      ].join(''),
    });
  } catch (e) {
    console.error('Failed to send notification:', e);
  }
}

// === 基础诊断评分（Q1-Q5，每题 0-10）===

function scoreDirection(text: string): number {
  const t = text.trim();
  if (t.length < 10) return 0;
  if (t.length < 30) return 5;
  return 10;
}

async function sendAutoReply(name: string, email: string, score: number, level: string, feedback: string, weakPoints: string[], levelLabel: string) {
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: 'fhopc <noreply@fhopc.top>',
      to: [email],
      subject: `你的 fhopc 方向评估结果：${score}分 - ${levelLabel}`,
      html: [
        `<p style="font-family:sans-serif;color:#1A1A1A">${name}，你好</p>`,
        '<p style="font-family:sans-serif;color:#1A1A1A">感谢你完成 fhopc 方向评估。以下是你的评估结果：</p>',
        '<div style="font-family:sans-serif;margin:24px 0">',
        `<div style="text-align:center;margin-bottom:24px">`,
        `<span style="display:inline-block;font-size:36px;font-weight:bold;color:#f87500">${score}</span>`,
        `<span style="color:#8b8b8b;font-size:14px">/100</span>`,
        `<br><span style="display:inline-block;margin-top:8px;font-size:12px;color:#f87500;border:1px solid #f87500;border-radius:4px;padding:2px 10px">${levelLabel}</span>`,
        `</div>`,
        `<p style="font-family:sans-serif;color:#1A1A1A;line-height:1.6">${feedback}</p>`,
        weakPoints.length > 0 ? `<div style="margin:16px 0"><p style="font-family:sans-serif;font-weight:600;color:#1A1A1A;font-size:13px">需要注意：</p><ul style="font-family:sans-serif;font-size:13px;color:#666;padding-left:20px">${weakPoints.map(w => `<li style="margin-bottom:4px">${w}</li>`).join('')}</ul></div>` : '',
        '</div>',
        '<hr style="border:none;border-top:1px solid #eee;margin:24px 0">',
        '<p style="font-family:sans-serif;font-size:12px;color:#8b8b8b">fhopc · 一人公司系统化交付 · <a href="https://fhopc.top" style="color:#f87500">fhopc.top</a></p>',
      ].join(''),
    });
  } catch (e) {
    console.error('Failed to send auto-reply:', e);
  }
}

const EXPERIENCE_SCORE: Record<string, number> = {
  none: 0,
  'less-than-1': 2,
  '1-3': 6,
  '3-plus': 10,
};

const COMMITMENT_SCORE: Record<string, number> = {
  'less-than-5': 0,
  '5-15': 3,
  '15-30': 7,
  '30-plus': 10,
};

const BUDGET_SCORE: Record<string, number> = {
  none: 0,
  'under-1000': 3,
  '1000-5000': 7,
  '5000-plus': 10,
};

const BLOCKER_SCORE: Record<string, number> = {
  'have-direction': 3,
  validating: 5,
  'unstable-income': 8,
  'stable-income': 10,
  other: 3,
};

// === 赛道评估评分（Q6-Q10，每题 0-10）===

const DEMAND_SCORE: Record<string, number> = {
  none: 0,
  weak: 3,
  moderate: 7,
  strong: 10,
};

const TECH_SCORE: Record<string, number> = {
  none: 0,
  low: 3,
  moderate: 7,
  high: 10,
};

const MONETIZATION_SCORE: Record<string, number> = {
  none: 0,
  vague: 3,
  clear: 7,
  proven: 10,
};

const COMPETITION_SCORE: Record<string, number> = {
  red: 0,
  competitive: 3,
  moderate: 7,
  blue: 10,
};

const FIT_SCORE: Record<string, number> = {
  none: 0,
  related: 3,
  direct: 7,
  expert: 10,
};

// === 薄弱点分析 ===

function getWeakPoints(scores: Record<string, number>): string[] {
  const points: string[] = [];
  if (scores.experience < 6) points.push('行业经验不足，建议先深入了解目标行业');
  if (scores.commitment < 7) points.push('时间投入偏低，一人公司需要持续的时间投入');
  if (scores.budget < 3) points.push('资金投入不足，建议准备最小启动预算');
  if (scores.demand < 7) points.push('需求验证不足，目标客户痛点不够明确');
  if (scores.monetization < 7) points.push('变现路径不够清晰，建议先验证收费模式');
  if (scores.competition < 7) points.push('市场竞争分析不足，需明确差异化定位');
  if (scores.fit < 7) points.push('个人匹配度偏低，建议从已有经验延伸的方向切入');
  return points;
}

// === 方向评分 ===

function scoreDirectionText(direction: string): number {
  const t = direction.trim();
  if (t.length < 10) return 0;
  if (t.length < 30) return 5;
  return 10;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name, wechat, phone, email, direction, experience, commitment, budget, blocker,
    demand, tech, monetization, competition, fit,
  } = body;

  // Validate required fields
  if (!name || !email) {
    return NextResponse.json({ error: '请填写姓名和邮箱' }, { status: 400 });
  }
  if (!direction || !experience || !commitment || !budget || !blocker) {
    return NextResponse.json({ error: '请填写所有基础问题（Q1-Q5）' }, { status: 400 });
  }
  if (!demand || !tech || !monetization || !competition || !fit) {
    return NextResponse.json({ error: '请填写所有赛道评估问题（Q6-Q10）' }, { status: 400 });
  }

  // Calculate scores
  const dirScore = scoreDirectionText(direction);
  const expScore = EXPERIENCE_SCORE[experience] ?? 0;
  const comScore = COMMITMENT_SCORE[commitment] ?? 0;
  const budScore = BUDGET_SCORE[budget] ?? 0;
  const blkScore = BLOCKER_SCORE[blocker] ?? 0;
  const demScore = DEMAND_SCORE[demand] ?? 0;
  const tecScore = TECH_SCORE[tech] ?? 0;
  const monScore = MONETIZATION_SCORE[monetization] ?? 0;
  const cptScore = COMPETITION_SCORE[competition] ?? 0;
  const fitScore = FIT_SCORE[fit] ?? 0;

  const total = dirScore + expScore + comScore + budScore + blkScore + demScore + tecScore + monScore + cptScore + fitScore;
  const maxScore = 100;

  const scores = {
    direction: dirScore,
    experience: expScore,
    commitment: comScore,
    budget: budScore,
    blocker: blkScore,
    demand: demScore,
    tech: tecScore,
    monetization: monScore,
    competition: cptScore,
    fit: fitScore,
  };

  const weakPoints = getWeakPoints(scores);

  // === Score >= 70: 深度协作 ===
  if (total >= 70) {
    await sendNotification(body, total, '深度协作');
    await sendAutoReply(name, email, total, 'deep', '综合评分优秀。你的方向清晰，个人条件充分，赛道评估显示可行。建议直接进入深度协作阶段。', weakPoints, '深度协作');
    return NextResponse.json({
      score: total,
      maxScore,
      level: 'deep',
      levelLabel: '深度协作',
      recommendation: {
        plan: '深度协作',
        planPrice: '¥999',
        summary: '你的方向和条件经过验证，成熟度较高。推荐深度协作——全周期验证，7 个角色按需介入，你冲执行，系统盯方向和质量。',
      },
      weakPoints,
      feedback: '综合评分优秀。你的方向清晰，个人条件充分，赛道评估显示可行。建议直接进入深度协作阶段。',
    });
  }

  // === Score >= 40: 经营诊断 ===
  if (total >= 40) {
    await sendNotification(body, total, '经营诊断');
    let feedback: string;
    const weakestDim = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];

    if (weakestDim[1] <= 3) {
      feedback = '你有基础条件，但在个别维度还需要补强。建议从经营诊断开始，先优化薄弱环节再扩大投入。';
    } else if (scores.demand < 7 || scores.monetization < 7) {
      feedback = '方向基本可行，但市场需求或变现路径还需要验证。建议先跑一个最小 MVP 测试市场反应。';
    } else {
      feedback = '方向和个人条件都在可推进范围。建议从经营诊断开始，30 天内把你的方向跑通。';
    }

    await sendAutoReply(name, email, total, 'diagnosis', feedback, weakPoints, '经营诊断');

    return NextResponse.json({
      score: total,
      maxScore,
      level: 'diagnosis',
      levelLabel: '经营诊断',
      recommendation: {
        plan: '经营诊断',
        planPrice: '¥399',
        summary: '你有基础条件和明确方向，推荐从经营诊断开始——月度数据审计 + 策略复盘，帮你优化经营效率。',
      },
      weakPoints,
      feedback,
    });
  }

  // === Score < 40: 作业框架 ===
  await sendNotification(body, total, '作业框架');
  const adjustments: string[] = [];
  if (expScore < 6) adjustments.push('花 2-4 周深入了解目标行业，通过兼职、访谈、调研等方式积累行业认知');
  if (comScore < 7) adjustments.push('每周至少保证 15 小时以上投入，一人公司本质上是时间换空间');
  if (budScore < 3) adjustments.push('准备最少 1000 元/月的启动预算，用于工具、推广等基础开支');
  if (demScore < 7) adjustments.push('先做 10 个目标客户访谈，验证需求真实性，不急着启动');
  if (monScore < 7) adjustments.push('明确收费模式——谁付、付多少、买什么，写下来再验证');
  if (cptScore < 7) adjustments.push('做一次竞品分析，找到差异化切入点，避免直接价格竞争');
  if (fitScore < 7) adjustments.push('优先从已有经验的方向切入，降低启动风险');

  let feedback: string;
  if (scores.demand < 7 && scores.monetization < 7) {
    feedback = '市场需求和变现路径都不够清晰，是目前最大的障碍。建议先做客户访谈和 MVP 测试，不要急着投入资源。';
  } else if (expScore < 6 && comScore < 7) {
    feedback = '行业经验不足且时间投入有限，启动风险较高。建议先通过兼职或副业方式了解行业，同时积累启动条件。';
  } else {
    feedback = '综合来看，目前启动的时机还不成熟。建议参考调整建议，准备好后再来评估。';
  }

  await sendAutoReply(name, email, total, 'framework', feedback, weakPoints, '作业框架');

  return NextResponse.json({
    score: total,
    maxScore,
    level: 'framework',
    levelLabel: '作业框架',
    recommendation: {
      plan: '作业框架',
      planPrice: '待定',
      summary: '方向需要先验证。推荐从作业框架开始——30 天 SOP + 模板包，从 0 到第一单客户。',
    },
    weakPoints,
    feedback,
    adjustments,
  });
}