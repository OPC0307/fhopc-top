import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

function saveContact(entry: Record<string, unknown>) {
  ensureDataFile();
  const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  existing.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, contact, note, plan } = body;

  if (!name || !contact) {
    return NextResponse.json(
      { error: '请填写姓名和联系方式' },
      { status: 400 },
    );
  }

  const entry = {
    name,
    contact,
    note: note || '',
    plan: plan || '',
    timestamp: new Date().toISOString(),
  };

  try {
    saveContact(entry);
  } catch (e) {
    console.error('Failed to save contact:', e);
    return NextResponse.json(
      { error: '提交失败，请重试' },
      { status: 500 },
    );
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: 'fhopc <noreply@fhopc.top>',
        to: ['hello@fhopc.top'],
        subject: `新意向: ${name} - ${plan ? plan : '无方案'}`,
        html: [
          '<table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">',
          '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">姓名</td>',
          `<td style="padding:12px;border:1px solid #ddd">${name}</td></tr>`,
          '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">联系方式</td>',
          `<td style="padding:12px;border:1px solid #ddd">${contact}</td></tr>`,
          '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">方案</td>',
          `<td style="padding:12px;border:1px solid #ddd">${plan || '-'}</td></tr>`,
          '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">备注</td>',
          `<td style="padding:12px;border:1px solid #ddd">${note || '-'}</td></tr>`,
          '<tr><td style="padding:12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">时间</td>',
          `<td style="padding:12px;border:1px solid #ddd">${entry.timestamp}</td></tr>`,
          '</table>',
        ].join(''),
      });
    } catch (e) {
      console.error('Failed to send email notification:', e);
    }
  }

  return NextResponse.json({ success: true });
}