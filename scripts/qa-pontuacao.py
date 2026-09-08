#!/usr/bin/env python3
"""
QA completo: remove TODOS os caracteres especiais de pontuação do projeto.
Substituições:
- Travessão (—) e en-dash (–): removidos (substituídos por vírgula, dois pontos ou nada)
- Bullet (•): removido (usar <li> no HTML ou hífen comum)
- Middle dot (·): removido (substituído por vírgula ou parênteses)
- Horizontal bar (―): removido
"""
import re
from pathlib import Path

FILES_TO_SCAN = [
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
    'src/components/pages/curso-detail-page.tsx',
    'public/chatbot.js',
    'public/landing-page.html',
    'public/config.js',
    'public/google-apps-script.js',
    'public/landing-pages/pais.html',
    'public/landing-pages/maes.html',
    'public/landing-pages/criancas.html',
    'public/landing-pages/adolescentes.html',
    'public/landing-pages/empreendedores.html',
    'public/landing-pages/index.html',
    'scripts/gen-landings.py',
]

BASE = Path('/home/z/my-project')

# Mapa de substituições (caractere -> regex -> substituição)
# Cada regra é testada em ordem
def clean_special_chars(text):
    """Limpa todos os caracteres especiais de pontuação."""
    original = text
    counts = {}

    # 1. Bullet (•) no início de linha OU após \n
    # "• Item" → "- Item" (hífen comum, aceitável como pontuação)
    n = len(re.findall(r'^[ \t]*•[ \t]*', text, flags=re.MULTILINE))
    text = re.sub(r'^([ \t]*)•[ \t]*', r'\1- ', text, flags=re.MULTILINE)
    # "\n• " → "\n- "
    n2 = len(re.findall(r'\n•[ \t]*', text))
    text = re.sub(r'\n•[ \t]*', '\n- ', text)
    counts['bullet_inicio'] = n + n2

    # 2. Bullet (•) no meio de frase → ", "
    n = text.count('•')
    text = text.replace(' • ', ', ')
    text = text.replace('• ', '')
    text = text.replace(' •', '')
    text = text.replace('•', '')
    counts['bullet_meio'] = n

    # 3. Middle dot (·) em separadores de metadados
    # "10 horas · online · R$450/hora" → "10 horas, online, R$450/hora"
    n = text.count('·')
    # Caso comum: " · " entre valores
    text = re.sub(r'\s+·\s+', ', ', text)
    # Caso isolado: "·" sozinho em JSX (renderizado como separador visual)
    # Em JSX: <span>·</span> → manter como - ou remover
    text = text.replace('>·<', '>-<')
    # Qualquer · restante
    text = text.replace('·', '-')
    counts['middle_dot'] = n

    # 4. Travessão (—) - proteção final (já deveria ter sido removido)
    n = text.count('—')
    text = re.sub(r'\s+—\s+', ', ', text)
    text = re.sub(r'^([ \t]*)—[ \t]*', r'\1- ', text, flags=re.MULTILINE)
    text = text.replace('—', ',')
    counts['emdash'] = n

    # 5. En-dash (–) - geralmente em ranges ("2024–2026")
    n = text.count('–')
    text = text.replace(' – ', ', ')
    text = text.replace('–', '-')  # ranges viram hífen comum
    counts['endash'] = n

    # 6. Horizontal bar (―)
    n = text.count('―')
    text = text.replace('―', '-')
    counts['horiz_bar'] = n

    # 7. Figure dash (‒)
    n = text.count('‒')
    text = text.replace('‒', '-')
    counts['figure_dash'] = n

    # 8. Math minus (−) - diferente de hífen comum
    n = text.count('−')
    text = text.replace('−', '-')
    counts['math_minus'] = n

    total = sum(counts.values())
    return text, total, counts


total_all = 0
files_modified = 0
for rel_path in FILES_TO_SCAN:
    full_path = BASE / rel_path
    if not full_path.exists():
        continue
    content = full_path.read_text(encoding='utf-8')
    new_content, replaced, counts = clean_special_chars(content)
    if replaced > 0:
        full_path.write_text(new_content, encoding='utf-8')
        details = ', '.join(f'{k}={v}' for k, v in counts.items() if v > 0)
        print(f'OK {rel_path}: {replaced} ({details})')
        total_all += replaced
        files_modified += 1
    else:
        print(f'-- {rel_path}: limpo')

print(f'\n=== RESUMO ===')
print(f'Arquivos modificados: {files_modified}')
print(f'Total de caracteres substituídos: {total_all}')

# Verificação final
print('\n=== VERIFICAÇÃO FINAL ===')
import subprocess
result = subprocess.run(
    ['grep', '-rn', '-P', r'[\x{2013}\x{2014}\x{2015}\x{2022}\x{00b7}\x{2212}\x{2012}]', 'src/', 'public/'],
    cwd=BASE, capture_output=True, text=True
)
if result.stdout.strip():
    print('AINDA HÁ caracteres especiais em:')
    print(result.stdout[:2000])
else:
    print('LIMPO! Nenhum travessão, en-dash, bullet ou middle dot restante.')
