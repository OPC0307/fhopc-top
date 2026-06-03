import subprocess
import sys

cmds = [
    ['git', 'add', '-A'],
    ['git', 'commit', '-m', 'feat(blog): publish factory-legacy-opc article'],
    ['git', 'push']
]

for cmd in cmds:
    r = subprocess.run(cmd, capture_output=True, text=True,
                       cwd=r'C:\Users\Administrator\fhopc-top-vercel')
    label = ' '.join(cmd)
    print(f'{label}: rc={r.returncode}')
    if r.stdout:
        print(r.stdout.strip())
    if r.stderr:
        print(r.stderr.strip())
    if r.returncode != 0:
        sys.exit(r.returncode)

print('DONE')
