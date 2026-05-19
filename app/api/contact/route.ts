import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');

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

  try {
    console.log(
      `[CONTACT] New submission: ${name} (${contact}) plan=${plan}`,
    );
  } catch {
    // Email sending is optional - silently ignore failures
  }

  return NextResponse.json({ success: true });
}