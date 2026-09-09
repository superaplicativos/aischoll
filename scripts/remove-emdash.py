#!/usr/bin/env python3
"""
Remove todos os travessões (—) dos arquivos do projeto AI School.
Substitui por:
- ', ' quando está no meio de frase (appositivo)
- '• ' quando está no início de linha (bullet)
- ' ' quando está isolado
"""
import re
from pathlib import Path

FILES = [
    'src/lib/pix.ts',
    'src/lib/courses-data.ts',
    'src/app/layout.tsx',
    'src/components/checkout/checkout-dialog.tsx',
    'src/components/pages/sobre-page.tsx',
    'src/components/pages/diferencial-page.tsx',
    'src/components/pages/solo-first-article.tsx',
    'src/components/pages/cursos-page.tsx',
    'src/components/pages/home-page.tsx',
    'src/components/pages/mentoria-page.tsx',
    'public/chatbot.js',
    'public/landing-page.html',
    'public/landing-pages/empreendedores.html',
    'public/landing-pages/criancas.html',
    'public/landing-pages/maes.html',
    'public/landing-pages/adolescentes.html',
    'public/landing-pages/pais.html',
    'scripts/gen-landings.py',
]

BASE = Path('/home/z/my-project')

def replace_emdash(text):
    """Substitui travessões de forma inteligente."""
    original_count = text.count('—')
    if original_count == 0:
        return text, 0

    # 1. No início de linha (com ou sem espaço depois): "— Algo" → "• Algo"
    # Também captura: "\n— " e "\n — "
    text = re.sub(r'(\n\s*)—\s*', r'\1• ', text)

    # 2. Apenas espaços antes e depois (meio de frase): " — " → ", "
    text = re.sub(r'\s+—\s+', ', ', text)

    # 3. Em-dash isolado no início de string (sem newline antes): "— algo" → "• algo"
    text = re.sub(r'^—\s+', '• ', text)

    # 4. Em-dash colado a palavra seguido de espaço: "palavra— " → "palavra: "
    text = re.sub(r'(\w)—\s+', r'\1: ', text)

    # 5. Em-dash com espaço antes e palavra depois: " —palavra" → ", palavra"
    text = re.sub(r'\s+—(\w)', r', \1', text)

    # 6. Em-dash colado entre palavras: "palavra—palavra" → "palavra, palavra"
    text = re.sub(r'(\w)—(\w)', r'\1, \2', text)

    # 7. Em-dash isolado residual → remove
    text = text.replace('—', '')

    final_count = text.count('—')
    replaced = original_count - final_count
    return text, replaced


total_replaced = 0
for rel_path in FILES:
    full_path = BASE / rel_path
    if not full_path.exists():
        print(f'PULAR (não existe): {rel_path}')
        continue
    content = full_path.read_text(encoding='utf-8')
    new_content, replaced = replace_emdash(content)
    if replaced > 0:
        full_path.write_text(new_content, encoding='utf-8')
        print(f'OK {rel_path}: {replaced} travessões removidos')
        total_replaced += replaced
    else:
        print(f'-- {rel_path}: 0 travessões')

print(f'\nTOTAL: {total_replaced} travessões removidos')

# Verificação final
print('\n=== VERIFICAÇÃO FINAL ===')
import subprocess
result = subprocess.run(
    ['grep', '-r', '-l', '—', 'src/', 'public/', 'scripts/'],
    cwd=BASE, capture_output=True, text=True
)
if result.stdout.strip():
    print('AINDA HÁ TRAVESSÕES em:')
    print(result.stdout)
else:
    print('NENHUM travessão restante. Tudo limpo!')
