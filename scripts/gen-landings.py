#!/usr/bin/env python3
"""
Reescreve as 5 landing pages removendo conceito 'Pai + Filho'.
Cada landing é focada no público correto:
- pais.html: convence o PAI a comprar curso pro filho
- maes.html: convence a MÃE a comprar curso pro filho
- criancas.html:Curso direto pra criança (pai compra)
- adolescentes.html: curso direto pro adolescente
- empreendedores.html: curso pro próprio empreendedor
"""
from pathlib import Path

LANDINGS = {
    'pais': {
        'title': 'AI School para Pais | Invista no futuro do seu filho com IA',
        'desc': 'Pais que querem preparar os filhos para o futuro. Cursos de IA e Robótica para crianças e adolescentes. Presencial e online. A partir de R$4.000.',
        'badge_text': 'Para pais que querem preparar os filhos pro futuro',
        'badge_pill': 'For Parents',
        'hero_title': 'O melhor investimento <span class="gradient-text">no futuro do seu filho</span>',
        'hero_subtitle': 'Como pai, você sabe que IA não é mais opcional. É a nova alfabetização. Na AI School, seu filho aprende IA criando robôs, games e apps, com <strong>cursos presenciais e online</strong> supervisionados. E você ainda pode aprender IA pra si mesmo, com Mentoria VIP personalizada.',
        'section_badge': '👨 POR QUE PAIS ESCOLHEM A AI SCHOOL',
        'section_title': 'Mais que curso, é preparo para a vida do seu filho',
        'section_subtitle': 'Sabemos que seu maior desejo como pai é ver seu filho pronto para o mundo. A IA é a nova alfabetização. Quem não dominar agora, vai ficar atrás.',
        'benefits': [
            ('🎯', 'Foco no que importa', 'Seu filho aprende IA criando jogos, robôs e apps. Sem teoria inútil, só prática que prende atenção.'),
            ('🛡️', 'Ambiente seguro', 'Turmas pequenas (máx. 8 crianças), supervisão total, conteúdo adaptado por idade. Cidadania digital inclusa.'),
            ('👨‍🏫', 'Acompanhe de perto', 'Você recebe relatórios do progresso do seu filho e pode falar direto com os instrutores.'),
            ('📍', 'Online ou presencial', 'Você escolhe. Online via Zoom ou presencial em São Paulo. Mesma qualidade, mesma turma pequena.'),
            ('📅', 'Horários flexíveis', 'Manhã, tarde, noite ou fim de semana. Acompanhamos o ritmo da sua família.'),
            ('📜', 'Certificado real', 'Certificado digital com verificação de autenticidade. Válido para horas complementares.'),
        ],
        'cursos_badge': '📚 CURSOS PARA SEU FILHO',
        'cursos_title': 'Escolha o curso ideal pro seu filho',
        'cursos_subtitle': 'Cursos desenhados por idade, com supervisão total e foco em aprendizado real.',
        'cursos': [
            ('🤖', 'IA + Robótica (7-12 anos)', 'Curso lúdico onde seu filho cria robôs, games e histórias com IA. Primeiro contato com tecnologia de forma divertida.', '4.000', '10h online, R$4.500 presencial'),
            ('🎮', 'IA para Adolescentes (13-17)', 'Criação de apps, jogos, arte digital com IA. Portfólio digital publicado. Preparo real para o mercado futuro.', '4.000', '10h online, R$4.500 presencial'),
            ('👑', 'Mentoria VIP para Você', 'Aprenda IA você mesmo, pai. Acompanhe o aprendizado do filho com conhecimento próprio. Plano personalizado.', '4.500', '10h online, R$500/hora presencial', 'primary'),
        ],
        'mentoria_badge': '👑 MENTORIA VIP PARA O PAI',
        'mentoria_title': 'Você também merece <span class="gradient-text">aprender IA</span>',
        'mentoria_subtitle': 'A Mentoria VIP é pra VOCÊ, pai. Aprenda IA no seu ritmo, com plano personalizado. Assim você acompanha de perto o aprendizado do seu filho e ainda evolui profissionalmente.',
        'mentoria_features': [
            ('🎯', 'Plano 100% personalizado pra você'),
            ('⏰', 'Horários flexíveis, manhã, tarde, noite ou fim de semana'),
            ('💬', 'Canal direto com mentor no WhatsApp'),
            ('📍', 'Online ou presencial, você escolhe'),
            ('🚀', 'Acompanhamento de projeto real seu'),
            ('👨‍👧', 'Pai presente e preparado pra ajudar em casa'),
        ],
        'testimonial_data': [
            ('AB', 'Ana Beatriz', 'Mãe da Helena (9 anos)', '"Meu filho saiu do curso falando de IA como fofoca de criança. Fez um robô que acende a luz do quarto. Mudou a forma como ele vê o mundo."'),
            ('RM', 'Rodrigo Mendes', 'Pai do Pedro (14 anos)', '"Meu filho publicou o primeiro app dele em 6 semanas. Eu fiz a Mentoria VIP pra poder acompanhar. Valeu cada real."'),
            ('CS', 'Carla Schmidt', 'Mãe da Júlia (11 anos)', '"Minha filha sempre quis fazer jogos. Hoje tem 3 publicados na itch.io. A AI School deu ferramenta e direção."'),
        ],
        'cta_text': 'Conversa inicial gratuita de 30 minutos. Sem compromisso.',
        'cta_btn': 'Quero Mentoria VIP, R$4.500',
        'wa_msg': 'Sou pai e quero Mentoria VIP',
    },
    'maes': {
        'title': 'AI School para Mães | Prepare seu filho para o futuro com IA',
        'desc': 'Mães que querem preparar os filhos para o futuro com IA. Cursos presenciais e online para crianças e adolescentes. A partir de R$4.000.',
        'badge_text': 'Para mães que querem preparar os filhos pro futuro',
        'badge_pill': 'For Moms',
        'hero_title': 'Mãe presente, <span class="gradient-text">filho preparado</span>',
        'hero_subtitle': 'Como mãe, você quer o melhor pros seus filhos. IA é a nova alfabetização. Na AI School seu filho aprende criando robôs, games e apps, com <strong>cursos presenciais e online</strong> supervisionados. E você ainda pode aprender IA pra si mesma, com Mentoria VIP personalizada.',
        'section_badge': '💪 POR QUE MÃES ESCOLHEM A AI SCHOOL',
        'section_title': 'Segurança e qualidade pro seu filho',
        'section_subtitle': 'Sabemos que sua rotina é intensa. Por isso nossos cursos são curtos (10h), práticos e com horários flexíveis que respeitam a rotina da sua família.',
        'benefits': [
            ('⏰', 'Horários flexíveis', 'Manhã enquanto kids na escola, tarde, noite ou fim de semana. Sua rotina no controle.'),
            ('🛡️', 'Ambiente seguro', 'Turmas pequenas (máx. 8 crianças), supervisão total, conteúdo adaptado por idade.'),
            ('📋', 'Acompanhamento', 'Você recebe relatórios do progresso do seu filho e fala direto com os instrutores.'),
            ('📍', 'Online ou presencial', 'Você escolhe. Online via Zoom ou presencial em São Paulo. Mesma qualidade.'),
            ('💰', 'Parcelamento facilitado', 'PIX, boleto 2x sem juros ou cartão em 12x com juros da operadora.'),
            ('📜', 'Certificado real', 'Certificado digital com verificação de autenticidade. Válido para horas complementares.'),
        ],
        'cursos_badge': '📚 CURSOS PARA SEU FILHO',
        'cursos_title': 'Escolha o curso ideal pro seu filho',
        'cursos_subtitle': 'Cursos desenhados por idade, com supervisão total e foco em aprendizado real.',
        'cursos': [
            ('🤖', 'IA + Robótica (7-12 anos)', 'Curso lúdico onde seu filho cria robôs, games e histórias com IA. Primeiro contato com tecnologia de forma divertida.', '4.000', '10h online, R$4.500 presencial'),
            ('🎮', 'IA para Adolescentes (13-17)', 'Criação de apps, jogos, arte digital com IA. Portfólio digital publicado. Preparo real para o mercado.', '4.000', '10h online, R$4.500 presencial'),
            ('👑', 'Mentoria VIP para Você', 'Aprenda IA você mesma, mãe. Plano personalizado. Empreenda de casa ou acompanhe o aprendizado do filho.', '4.500', '10h online, R$500/hora presencial', 'primary'),
        ],
        'mentoria_badge': '👑 MENTORIA VIP PARA A MÃE',
        'mentoria_title': 'Aprenda IA <span class="gradient-text">no seu tempo</span>',
        'mentoria_subtitle': 'A Mentoria VIP é pra VOCÊ, mãe. Aprenda IA no seu ritmo, com plano personalizado. Empreenda de casa, gere renda, ou apenas acompanhe de perto o aprendizado do seu filho com conhecimento próprio.',
        'mentoria_features': [
            ('🎯', 'Plano 100% personalizado pra você'),
            ('⏰', 'Horários flexíveis que respeitam sua rotina'),
            ('💬', 'Canal direto com mentor no WhatsApp'),
            ('📍', 'Online ou presencial, você escolhe'),
            ('🚀', 'Acompanhamento de projeto real seu'),
            ('🏠', 'Empreenda de casa ou só aprenda'),
        ],
        'testimonial_data': [
            ('CS', 'Carla Schmidt', 'Mãe do Pedro (10 anos)', '"Meu filho fez IA + Robótica e eu fiz Mentoria VIP. Em 2 semanas fechei meus primeiros clientes de design com IA. R$ 2.500 de renda extra por mês."'),
            ('MR', 'Mariana Rocha', 'Mãe de 2 adolescentes', '"Meus filhos aprenderam a criar apps. Eu aprendi IA pra empreender de casa. Hoje atendo 6 clientes e estou com eles."'),
            ('PA', 'Patrícia Almeida', 'Mãe e professora', '"A Mentoria VIP me deu confiança. Aprendi IA e hoje aplico nas aulas. Meus alunos adoraram. Bônus: meu filho de 11 aprendeu junto."'),
        ],
        'cta_text': 'Conversa inicial gratuita de 30 minutos. Sem compromisso.',
        'cta_btn': 'Quero Mentoria VIP, R$4.500',
        'wa_msg': 'Sou mãe e quero Mentoria VIP',
    },
    'criancas': {
        'title': 'AI School Kids | IA + Robótica para crianças de 7 a 12 anos',
        'desc': 'Curso lúdico onde crianças de 7 a 12 anos aprendem IA criando robôs, games e histórias. Primeiro contato com tecnologia de forma segura. R$4.000 (10h).',
        'badge_text': 'Para crianças curiosas de 7 a 12 anos',
        'badge_pill': 'For Kids',
        'hero_title': 'Crianças que <span class="gradient-text">aprendem IA criando</span>',
        'hero_subtitle': 'Curso lúdico e seguro onde crianças de 7 a 12 anos criam robôs, games e histórias com IA. <strong>Primeiro contato com tecnologia</strong> de forma divertida e supervisionada.',
        'section_badge': '🤖 POR QUE OS PEQUENOS AMAM',
        'section_title': 'Aprender IA pode (e deve) ser divertido',
        'section_subtitle': 'Crianças aprendem melhor brincando. Por isso nosso curso é 100% prático: a cada aula, a criança cria algo real.',
        'benefits': [
            ('🎮', 'Aprende criando', 'Em cada aula, a criança cria um jogo, um robô ou uma história. Teoria só pra explicar o que já fez.'),
            ('🛡️', 'Ambiente seguro', 'Turmas pequenas (máx. 8 crianças), supervisão total, conteúdo adaptado por idade.'),
            ('🤖', 'Robôs educacionais', 'Montagem real de robôs com LEGO Education e Micro:bit. Mão na massa.'),
            ('💡', 'Lógica de programação', 'Loop, condição, variável, explicados de forma visual com Scratch.'),
            ('👨‍👩‍👧', 'Apresentação pros pais', 'No final do curso, a criança apresenta o que criou pra família. Orgulho garantido.'),
            ('📜', 'Certificado de Pequeno Cientista', 'Certificado especial que a criança vai querer pendurar no quarto.'),
        ],
        'cursos_badge': '📚 CURSO INFANTIL',
        'cursos_title': 'IA + Robótica para Crianças',
        'cursos_subtitle': 'O curso ideal pro primeiro contato da criança com tecnologia.',
        'cursos': [
            ('🤖', 'IA + Robótica (7-12 anos)', 'Curso completo: robôs, games, histórias com IA. 10 horas de pura diversão.', '4.000', '10h online, R$4.500 presencial'),
            ('🎨', 'Criação de imagens com IA', 'Crianças criam arte com Gemini Imagen. Imaginação é o limite.', '4.000', '10h online'),
            ('👑', 'Mentoria VIP (para os pais)', 'Pais que querem aprender IA pra acompanhar o filho de perto. Plano personalizado.', '4.500', '10h online, R$500/hora presencial', 'primary'),
        ],
        'mentoria_badge': '👑 MENTORIA VIP PARA PAIS',
        'mentoria_title': 'Pais preparados <span class="gradient-text">pra ajudar em casa</span>',
        'mentoria_subtitle': 'A Mentoria VIP é pra os PAIS que querem aprender IA pra acompanhar de perto o aprendizado do filho. Plano personalizado, no seu ritmo, com mentor dedicado.',
        'mentoria_features': [
            ('🎯', 'Plano 100% personalizado pra você, pai'),
            ('⏰', 'Horários flexíveis, fim de semana disponível'),
            ('💬', 'Canal direto com mentor no WhatsApp'),
            ('📍', 'Online ou presencial, você escolhe'),
            ('🚀', 'Acompanhamento de projeto real seu'),
            ('👨‍👧', 'Acompanhe de perto o aprendizado do filho'),
        ],
        'testimonial_data': [
            ('AB', 'Ana Beatriz', 'Mãe da Helena (9 anos)', '"Meu filho saiu do curso falando de IA como fofoca de criança. Fez um robô que acende a luz do quarto. Mudou a forma como ele vê o mundo."'),
            ('LS', 'Luiz Santos', 'Pai do Theo (10 anos)', '"Meu filho pediu pra continuar. Hoje cria jogos no Scratch e mostra pra turma toda na escola. Autoestima lá em cima."'),
            ('FC', 'Fernanda Costa', 'Mãe da Luna (8 anos)', '"Minha filha era tímida. Depois do curso, apresentou o robô que criou pra turma toda. Mudou completamente."'),
        ],
        'cta_text': 'Conversa inicial gratuita de 30 minutos. Sem compromisso.',
        'cta_btn': 'Quero Mentoria VIP, R$4.500',
        'wa_msg': 'Quero Mentoria VIP pra acompanhar meu filho',
    },
    'adolescentes': {
        'title': 'AI School Teen | IA para adolescentes de 13 a 17 anos',
        'desc': 'Criação de apps, jogos, arte digital e automações para adolescentes. IA para a próxima geração de criadores. R$4.000 (10h). Presencial e online.',
        'badge_text': 'Para adolescentes criativos de 13 a 17 anos',
        'badge_pill': 'For Teens',
        'hero_title': 'Crie apps, jogos e arte <span class="gradient-text">com IA</span>',
        'hero_subtitle': 'Para adolescentes que querem mais do que consumir conteúdo, querem criar. Em 10 horas você publica seu primeiro app, jogo ou canal. <strong>Portfólio real publicado.</strong>',
        'section_badge': '🎮 POR QUE ADOLESCENTES AMAM',
        'section_title': 'Saia de consumidor pra criador',
        'section_subtitle': 'A maioria dos adolescentes só consome tecnologia. Na AI School você cria. Apps, jogos, arte digital, tudo com IA.',
        'benefits': [
            ('🚀', 'Publique seu primeiro app', 'Em 10 horas você tem um app ou jogo publicado. Portfólio real, não só teoria.'),
            ('🎨', 'Arte digital com IA', 'Use Gemini Imagen para criar arte profissional. Venda como NFT, impressão ou pra clientes.'),
            ('🎬', 'Edição de vídeo viral', 'Aprenda CapCut + Gemini pra editar vídeos pro TikTok e YouTube. Cresça de verdade.'),
            ('💻', 'Programação com IA', 'Cursor + Gemini Code Assist. Programa em português, sem precisar saber JavaScript.'),
            ('🏆', 'Portfólio publicado', 'Sai com itch.io (jogos), Vercel (apps) ou Behance (arte) publicados no seu nome.'),
            ('📜', 'Certificado reconhecido', 'Certificado digital que pode usar em processos seletivos, estágios e entrevistas.'),
        ],
        'cursos_badge': '📚 TRILHAS PARA ADOLESCENTES',
        'cursos_title': 'Escolha sua trilha de criação',
        'cursos_subtitle': '3 caminhos. Mesma base de IA. Resultado real publicado.',
        'cursos': [
            ('🎮', 'Criação de Jogos', 'Crie seu jogo com IA e publique na itch.io. Cursor + Gemini. Do zero ao publish.', '4.000', '10h online, R$4.500 presencial'),
            ('🎬', 'Edição de Vídeo com IA', 'CapCut + Gemini + Google Flow. Vire editor de TikTok/YouTube profissional.', '4.000', '10h online, R$4.500 presencial'),
            ('👑', 'Mentoria VIP Teen', 'Plano 100% personalizado pro seu projeto. App, jogo, canal, você escolhe.', '4.500', '10h online, R$500/hora presencial', 'primary'),
        ],
        'mentoria_badge': '👑 MENTORIA VIP TEEN',
        'mentoria_title': 'Seu projeto, <span class="gradient-text">do seu jeito</span>',
        'mentoria_subtitle': 'A Mentoria VIP Teen é 100% personalizada. Você chega com uma ideia (app, jogo, canal) e nosso mentor te ajuda a publicar em semanas.',
        'mentoria_features': [
            ('🎯', 'Plano focado no seu projeto'),
            ('⏰', 'Horários flexíveis, não atrapalha a escola'),
            ('💬', 'Canal direto com mentor no WhatsApp'),
            ('📍', 'Online ou presencial, você escolhe'),
            ('🚀', 'Projeto real publicado'),
            ('🏆', 'Portfólio que abre portas'),
        ],
        'testimonial_data': [
            ('JV', 'João Vitor, 15', 'Publicou jogo na itch.io', '"Criei meu primeiro jogo e publiquei na itch.io. Meus amigos não acreditaram. Já tô pensando em vender pra escola."'),
            ('AB', 'Ana Beatriz, 16', 'Canal no YouTube', '"Em 6 semanas lancei meu canal de reviews com IA. Já tô com 2k subs. A Mentoria VIP mudou tudo."'),
            ('ML', 'Murilo, 14', 'App publicado', '"Fiz um app pra organizar os treinos do time. Professor de educação física usa até hoje."'),
        ],
        'cta_text': 'Conversa inicial gratuita de 30 minutos. Sem compromisso.',
        'cta_btn': 'Quero Mentoria VIP, R$4.500',
        'wa_msg': 'Sou adolescente e quero Mentoria VIP',
    },
    'empreendedores': {
        'title': 'AI School para Empreendedores | Solo First com IA',
        'desc': 'Empreendedores que querem escalar com IA. Mentoria VIP a partir de R$4.500. Curso de automação modular (mínimo 3 módulos de R$4.000). Solo First Framework.',
        'badge_text': 'Para empreendedores que querem escalar com IA',
        'badge_pill': 'For Founders',
        'hero_title': 'Empreenda com IA <span class="gradient-text">do posicionamento ao cliente</span>',
        'hero_subtitle': 'Baseado no <strong>Solo First Framework</strong>. Aprenda a definir seu Dharma, construir Soft Assets, criar oferta irresistível e fechar clientes, tudo amplificado por IA. <strong>Saia do CLT em 90 dias.</strong>',
        'section_badge': '🚀 POR QUE EMPREENDEDORES ESCOLHEM A AI SCHOOL',
        'section_title': 'Solo First Framework: empreenda sem queimar caixa',
        'section_subtitle': 'Não é mais preciso time grande pra construir negócio de alto impacto. Com IA + Solo First Framework, você opera sozinho e escala.',
        'benefits': [
            ('🎯', 'Dharma: seu posicionamento', 'Defina onde seu conjunto de ativos é mais valorizado. Soft Assets: intelectual, reputacional, social.'),
            ('💼', 'Oferta irresistível', 'Aprenda a estruturar proposta que converte. ICP e Buyer Persona. Precificação com IA.'),
            ('🤖', 'IA como amplificador', 'IA não substitui criatividade, amplifica. Conteúdo, prospecção, vendas, tudo turbinado.'),
            ('💰', 'Sem queimar caixa', 'Aprenda a ser seu próprio investidor-anjo. Construa liberdade enquanto está empregado.'),
            ('🤝', 'Comunidade solo', 'Network com outros empreendedores solo. Ecossistema que multiplica acesso.'),
            ('📜', 'Certificado Solo First', 'Reconhecimento do framework. Use como prova de capacitação pra clientes e investidores.'),
        ],
        'cursos_badge': '📚 TRILHAS PARA EMPREENDEDORES',
        'cursos_title': 'Do posicionamento à automação',
        'cursos_subtitle': '3 trilhas pra diferentes momentos do seu negócio solo.',
        'cursos': [
            ('🚀', 'IA + Empreendedorismo (Solo First)', 'Torne-se um Empreendedor T-Shaped. Posicionamento, oferta, vendas. Plano 90 dias.', '4.000', '10h online, R$4.500 presencial'),
            ('🤖', 'Automação com IA (Modular)', 'Curso por módulos. Mínimo 3 módulos de R$4.000 cada. Foco profissional em automação empresarial.', '4.000', 'por módulo, mín. 3 módulos (R$12.000)', 'primary'),
            ('👑', 'Mentoria VIP Empreendedor', 'Plano 100% personalizado pro seu negócio. Saia do CLT em 90 dias.', '4.500', '10h online, R$500/hora presencial'),
        ],
        'mentoria_badge': '👑 MENTORIA VIP EMPREENDEDOR',
        'mentoria_title': 'Seu negócio, <span class="gradient-text">acelerado</span>',
        'mentoria_subtitle': 'A Mentoria VIP é 100% personalizada pro seu momento. Você chega com sua ideia ou negócio, e nosso mentor te ajuda a escalar com IA.',
        'mentoria_features': [
            ('🎯', 'Plano 90 dias para sair do CLT'),
            ('💼', 'Definição de Dharma e Soft Assets'),
            ('💰', 'Precificação e estrutura de oferta'),
            ('🤖', 'Stack de IA para operar solo'),
            ('💬', 'Canal direto com mentor no WhatsApp'),
            ('🚀', 'Acompanhamento de projeto real'),
        ],
        'testimonial_data': [
            ('RM', 'Rodrigo Mendes', 'Empreendedor Solo', '"Fiz o curso de IA + Empreendedorismo e a Mentoria VIP. Em 6 semanas lancei meu primeiro SaaS. Estou faturando R$ 8 mil/mês. Mudou minha vida."'),
            ('AP', 'Ana Paula', 'Consultora solo', '"O Solo First Framework me deu clareza. Saí do CLT em 4 meses. Hoje atendo 6 clientes com IA. Não volto jamais."'),
            ('TF', 'Thiago Ferreira', 'Fundador de startup', '"A Mentoria VIP é o melhor investimento que fiz. Em 3 meses redefinimos posicionamento, lançamos MVP e fechamos 4 clientes. ROI imediato."'),
        ],
        'cta_text': 'Conversa inicial gratuita de 30 minutos. Sem compromisso.',
        'cta_btn': 'Quero Mentoria VIP, R$4.500',
        'wa_msg': 'Sou empreendedor e quero Mentoria VIP',
    },
}


def build_html(data):
    benefits_html = '\n'.join([
        f'      <div class="benefit">\n        <div class="benefit-icon">{icon}</div>\n        <h3>{title}</h3>\n        <p>{desc}</p>\n      </div>'
        for icon, title, desc in data['benefits']
    ])

    cursos_html = ''
    for curso in data['cursos']:
        if len(curso) == 5:
            icon, title, desc, price, info = curso
            btn_class = 'btn-ghost'
            btn_text = 'Matricular'
            btn_link = '#mentoria'
            price_color = 'var(--emerald)'
        else:
            icon, title, desc, price, info, btn_type = curso
            btn_class = 'btn-primary' if btn_type == 'primary' else 'btn-ghost'
            btn_text = 'Quero Mentoria' if btn_type == 'primary' else 'Matricular'
            btn_link = '#mentoria'
            price_color = 'var(--amber)' if btn_type == 'primary' else 'var(--emerald)'
        cursos_html += f'\n      <div class="benefit">\n        <div class="benefit-icon">{icon}</div>\n        <h3>{title}</h3>\n        <p style="margin-bottom: 1rem;">{desc}</p>\n        <div style="font-family: var(--display); font-size: 1.5rem; font-weight: 700; color: {price_color};">R$ {price}</div>\n        <div style="font-size: 0.75rem; color: var(--text-muted);">{info}</div>\n        <a href="{btn_link}" class="btn {btn_class}" style="width:100%; margin-top: 1rem; justify-content: center;">{btn_text}</a>\n      </div>\n'

    mentoria_features_html = '\n'.join([
        f'          <div class="mentoria-feature">\n            <div class="mentoria-feature-icon">{icon}</div>\n            <span>{text}</span>\n          </div>'
        for icon, text in data['mentoria_features']
    ])

    testimonials_html = '\n'.join([
        f'      <div class="testimonial">\n        <div class="testimonial-stars">★★★★★</div>\n        <p class="testimonial-content">{content}</p>\n        <div class="testimonial-author">\n          <div class="testimonial-avatar">{initials}</div>\n          <div>\n            <div class="testimonial-name">{name}</div>\n            <div class="testimonial-role">{role}</div>\n          </div>\n        </div>\n      </div>'
        for initials, name, role, content in data['testimonial_data']
    ])

    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{data['title']}</title>
<meta name="description" content="{data['desc']}">
<link rel="icon" href="../favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {{
  --bg: #0a0a14;
  --surface: rgba(22,22,38,0.6);
  --surface-2: rgba(28,28,50,0.85);
  --border: rgba(124,58,237,0.18);
  --border-2: rgba(124,58,237,0.4);
  --text: #f4f4fb;
  --text-muted: #a4a4b8;
  --violet: #7c3aed;
  --violet-light: #a78bfa;
  --fuchsia: #ec4899;
  --emerald: #10b981;
  --amber: #f59e0b;
  --display: 'Space Grotesk', sans-serif;
  --body: 'Inter', sans-serif;
}}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: var(--body); background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }}
body::before {{ content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(16,185,129,0.10), transparent); z-index: -1; pointer-events: none; }}
::selection {{ background: var(--violet); color: white; }}
::-webkit-scrollbar {{ width: 10px; }}
::-webkit-scrollbar-track {{ background: var(--bg); }}
::-webkit-scrollbar-thumb {{ background: rgba(124,58,237,0.4); border-radius: 5px; }}

.header {{ position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 0; transition: all 0.3s; }}
.header.scrolled {{ background: rgba(10,10,20,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0.5rem 0; }}
.header-inner {{ max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; }}
.logo {{ display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--text); }}
.logo-icon {{ width: 38px; height: 38px; border-radius: 11px; background: linear-gradient(135deg, var(--violet), var(--fuchsia)); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(124,58,237,0.4); }}
.logo-icon svg {{ width: 22px; height: 22px; color: white; }}
.logo-text strong {{ font-family: var(--display); font-size: 1.1rem; font-weight: 700; display: block; }}
.logo-text span {{ font-size: 0.55rem; color: var(--text-muted); letter-spacing: 0.2em; text-transform: uppercase; }}
.nav {{ display: flex; gap: 0.25rem; }}
.nav a {{ color: var(--text-muted); text-decoration: none; font-size: 0.875rem; font-weight: 500; padding: 0.5rem 0.875rem; border-radius: 6px; transition: all 0.2s; }}
.nav a:hover {{ color: var(--text); background: rgba(255,255,255,0.05); }}
.btn {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; font-family: inherit; }}
.btn-primary {{ background: linear-gradient(135deg, var(--violet), var(--fuchsia)); color: white; box-shadow: 0 4px 20px rgba(124,58,237,0.35); }}
.btn-primary:hover {{ transform: translateY(-1px); box-shadow: 0 6px 28px rgba(124,58,237,0.5); }}
.btn-ghost {{ background: rgba(255,255,255,0.04); color: var(--text); border: 1px solid var(--border-2); }}
.btn-ghost:hover {{ background: rgba(255,255,255,0.08); }}
.btn-lg {{ padding: 0.875rem 1.75rem; font-size: 1rem; }}

.hero {{ position: relative; min-height: 100vh; display: flex; align-items: center; padding: 8rem 1.5rem 4rem; overflow: hidden; }}
.hero::before {{ content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.4; }}
.hero-orb1 {{ position: absolute; top: 10%; left: 5%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%); filter: blur(60px); animation: orb 8s ease-in-out infinite; }}
.hero-orb2 {{ position: absolute; bottom: 10%; right: 5%; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%); filter: blur(80px); animation: orb 10s ease-in-out infinite reverse; }}
@keyframes orb {{ 0%,100% {{ transform: translate(0,0); }} 50% {{ transform: translate(40px,-40px); }} }}
.hero-content {{ position: relative; max-width: 1280px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }}
@media (max-width: 768px) {{ .hero-content {{ grid-template-columns: 1fr; gap: 2rem; }} }}

.hero-badge {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: rgba(124,58,237,0.12); border: 1px solid var(--border-2); border-radius: 999px; font-size: 0.75rem; color: var(--violet-light); backdrop-filter: blur(8px); margin-bottom: 1.5rem; }}
.hero-badge .dot {{ width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 8px var(--emerald); animation: pulse 2s ease-in-out infinite; }}
@keyframes pulse {{ 0%,100% {{ opacity: 1; }} 50% {{ opacity: 0.4; }} }}
.hero-title {{ font-family: var(--display); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 1.5rem; }}
.gradient-text {{ background: linear-gradient(90deg, var(--violet), var(--fuchsia), var(--amber)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 4s linear infinite; }}
@keyframes shimmer {{ 0% {{ background-position: 0% center; }} 100% {{ background-position: 200% center; }} }}
.hero-subtitle {{ font-size: clamp(1rem, 2vw, 1.2rem); color: var(--text-muted); margin-bottom: 2rem; line-height: 1.7; }}
.hero-subtitle strong {{ color: var(--text); font-weight: 600; }}
.hero-cta {{ display: flex; flex-wrap: wrap; gap: 0.875rem; margin-bottom: 2.5rem; }}
.hero-features {{ display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.85rem; color: var(--text-muted); }}
.hero-feature {{ display: flex; align-items: center; gap: 0.4rem; }}
.hero-feature svg {{ color: var(--emerald); width: 16px; height: 16px; }}

.hero-card {{ background: var(--surface-2); border: 1px solid var(--border-2); border-radius: 20px; padding: 2rem; position: relative; overflow: hidden; }}
.hero-card::before {{ content: ''; position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(245,158,11,0.2), transparent); border-radius: 50%; }}
.hero-card-badge {{ display: inline-block; padding: 0.3rem 0.8rem; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); border-radius: 999px; font-size: 0.7rem; color: var(--amber); margin-bottom: 1rem; }}
.hero-card h3 {{ font-family: var(--display); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; position: relative; }}
.hero-card-price {{ font-family: var(--display); font-size: 2.5rem; font-weight: 700; color: var(--amber); margin: 1rem 0 0.25rem; line-height: 1; }}
.hero-card-price-info {{ font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem; }}
.hero-card-list {{ list-style: none; margin: 1rem 0; }}
.hero-card-list li {{ padding: 0.4rem 0; font-size: 0.85rem; display: flex; align-items: flex-start; gap: 0.5rem; }}
.hero-card-list svg {{ color: var(--emerald); flex-shrink: 0; margin-top: 3px; }}
.hero-card-btn {{ display: block; width: 100%; text-align: center; margin-top: 1rem; }}

section {{ padding: 5rem 1.5rem; position: relative; }}
.container {{ max-width: 1280px; margin: 0 auto; }}
.section-badge {{ display: inline-block; font-size: 0.7rem; font-weight: 600; color: var(--violet-light); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.75rem; }}
.section-title {{ font-family: var(--display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1rem; }}
.section-subtitle {{ color: var(--text-muted); font-size: 1.0625rem; max-width: 600px; margin-bottom: 3rem; }}
.section-header.center {{ text-align: center; }}
.section-header.center .section-subtitle {{ margin-left: auto; margin-right: auto; }}

.benefits-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }}
.benefit {{ background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.75rem; transition: all 0.3s; }}
.benefit:hover {{ transform: translateY(-4px); border-color: var(--border-2); box-shadow: 0 12px 40px rgba(124,58,237,0.15); }}
.benefit-icon {{ width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2)); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 24px; }}
.benefit h3 {{ font-family: var(--display); font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5rem; }}
.benefit p {{ font-size: 0.9rem; color: var(--text-muted); }}

.mentoria-card {{ background: var(--surface-2); border: 1px solid rgba(245,158,11,0.3); border-radius: 24px; padding: 3rem; position: relative; overflow: hidden; }}
.mentoria-card::before {{ content: ''; position: absolute; top: -150px; right: -150px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(245,158,11,0.2), transparent 70%); border-radius: 50%; }}
.mentoria-grid {{ display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center; position: relative; }}
@media (max-width: 768px) {{ .mentoria-grid {{ grid-template-columns: 1fr; }} .mentoria-card {{ padding: 1.75rem; }} }}
.mentoria-features {{ display: flex; flex-direction: column; gap: 0.75rem; }}
.mentoria-feature {{ display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; font-size: 0.875rem; }}
.mentoria-feature-icon {{ width: 32px; height: 32px; border-radius: 8px; background: rgba(245,158,11,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }}
.mentoria-price {{ font-family: var(--display); font-size: 3rem; font-weight: 700; color: var(--amber); margin: 0.5rem 0; }}

.payment-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }}
.payment-card {{ background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }}
.payment-card-icon {{ font-size: 28px; margin-bottom: 0.5rem; }}
.payment-card h4 {{ font-family: var(--display); font-size: 1.1rem; margin-bottom: 0.5rem; }}
.payment-card p {{ font-size: 0.85rem; color: var(--text-muted); }}
.payment-card .parcelas {{ font-weight: 600; color: var(--emerald); margin-top: 0.5rem; }}

.testimonial {{ background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.75rem; }}
.testimonial-stars {{ display: flex; gap: 2px; margin-bottom: 0.75rem; color: var(--amber); }}
.testimonial-content {{ font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem; font-style: italic; }}
.testimonial-author {{ display: flex; align-items: center; gap: 0.75rem; }}
.testimonial-avatar {{ width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--violet), var(--fuchsia)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px; }}
.testimonial-name {{ font-weight: 600; font-size: 0.9rem; }}
.testimonial-role {{ font-size: 0.75rem; color: var(--text-muted); }}

.footer {{ border-top: 1px solid var(--border); padding: 3rem 1.5rem 2rem; background: rgba(22,22,38,0.4); }}
.footer-grid {{ max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 2.5rem; }}
@media (max-width: 768px) {{ .footer-grid {{ grid-template-columns: 1fr 1fr; }} }}
@media (max-width: 480px) {{ .footer-grid {{ grid-template-columns: 1fr; }} }}
.footer h4 {{ font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem; }}
.footer ul {{ list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }}
.footer a {{ color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }}
.footer a:hover {{ color: var(--text); }}
.footer-bottom {{ max-width: 1280px; margin: 2.5rem auto 0; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 1rem; }}

@media (max-width: 768px) {{
  .nav {{ display: none; }}
  .header .btn-primary {{ display: none; }}
}}
</style>
</head>
<body>

<header class="header" id="header">
  <div class="header-inner">
    <a href="../index.html" class="logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 5 5-1-1 5 4 3-4 3 1 5-5-1-2 5-2-5-5 1 1-5-4-3 4-3-1-5 5 1z"/></svg>
      </div>
      <div class="logo-text"><strong>AI School</strong><span>{data['badge_pill']}</span></div>
    </a>
    <nav class="nav">
      <a href="#beneficios">Benefícios</a>
      <a href="#cursos">Cursos</a>
      <a href="#mentoria">Mentoria VIP</a>
      <a href="#pagamento">Pagamento</a>
    </nav>
    <a href="#mentoria" class="btn btn-primary">Quero Mentoria VIP</a>
  </div>
</header>

<section class="hero">
  <div class="hero-orb1"></div>
  <div class="hero-orb2"></div>
  <div class="hero-content">
    <div>
      <div class="hero-badge">
        <span class="dot"></span>
        {data['badge_text']}
      </div>
      <h1 class="hero-title">{data['hero_title']}</h1>
      <p class="hero-subtitle">{data['hero_subtitle']}</p>
      <div class="hero-cta">
        <a href="#mentoria" class="btn btn-primary btn-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/></svg>
          Quero Mentoria VIP
        </a>
        <a href="#cursos" class="btn btn-ghost btn-lg">Ver cursos</a>
      </div>
      <div class="hero-features">
        <div class="hero-feature">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Online ou presencial</span>
        </div>
        <div class="hero-feature">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Parcelamento em 12x</span>
        </div>
        <div class="hero-feature">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Turmas pequenas</span>
        </div>
      </div>
    </div>
    <div class="hero-card">
      <span class="hero-card-badge">👑 MENTORIA VIP</span>
      <h3>Mentoria VIP Personalizada</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;">Plano 100% sob medida. Você define ritmo e modalidade.</p>
      <div class="hero-card-price">R$ 4.500</div>
      <div class="hero-card-price-info">10 horas, online, R$450/hora</div>
      <ul class="hero-card-list">
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Plano de aprendizado sob medida</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sessões 1-a-1 ao vivo</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Canal direto com mentor</li>
        <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Online (R$450/h) ou presencial (R$500/h)</li>
      </ul>
      <a href="#mentoria" class="btn btn-primary hero-card-btn">Quero a Mentoria</a>
    </div>
  </div>
</section>

<section id="beneficios">
  <div class="container">
    <div class="section-header center">
      <span class="section-badge">{data['section_badge']}</span>
      <h2 class="section-title">{data['section_title']}</h2>
      <p class="section-subtitle">{data['section_subtitle']}</p>
    </div>
    <div class="benefits-grid">
{benefits_html}
    </div>
  </div>
</section>

<section id="cursos" style="background: linear-gradient(180deg, transparent, rgba(124,58,237,0.03), transparent);">
  <div class="container">
    <div class="section-header center">
      <span class="section-badge">{data['cursos_badge']}</span>
      <h2 class="section-title">{data['cursos_title']}</h2>
      <p class="section-subtitle">{data['cursos_subtitle']}</p>
    </div>
    <div class="benefits-grid">
{cursos_html}
    </div>
  </div>
</section>

<section id="mentoria">
  <div class="container">
    <div class="mentoria-card">
      <div class="mentoria-grid">
        <div>
          <span class="section-badge" style="color:var(--amber)">{data['mentoria_badge']}</span>
          <h2 class="section-title">{data['mentoria_title']}</h2>
          <p class="section-subtitle">{data['mentoria_subtitle']}</p>
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size:0.75rem;color:var(--text-muted);">A partir de</div>
            <div class="mentoria-price">R$ 4.500</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">10 horas, online, R$450/hora</div>
            <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--amber);">📍 Presencial: R$500/hora (pacote 10h = R$5.000)</div>
          </div>
          <div style="display:flex; gap:0.625rem; flex-wrap:wrap;">
            <a href="https://wa.me/55119666161611?text={data['wa_msg'].replace(' ', '%20')}" target="_blank" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/></svg>
              Quero Mentoria VIP
            </a>
            <a href="https://wa.me/55119666161611?text=Quero%20conversa%20inicial%20gratuita%20de%2030min" target="_blank" class="btn btn-ghost">Conversa grátis 30min</a>
          </div>
        </div>
        <div class="mentoria-features">
{mentoria_features_html}
        </div>
      </div>
    </div>
  </div>
</section>

<section id="pagamento">
  <div class="container">
    <div class="section-header center">
      <span class="section-badge">💳 FORMAS DE PAGAMENTO</span>
      <h2 class="section-title">Flexível pra caber no orçamento</h2>
      <p class="section-subtitle">Escolha a forma que faz sentido pra você.</p>
    </div>
    <div class="payment-grid">
      <div class="payment-card">
        <div class="payment-card-icon">⚡</div>
        <h4>PIX</h4>
        <p>Aprovação imediata. QR Code gerado na hora.</p>
        <div class="parcelas">À vista</div>
      </div>
      <div class="payment-card">
        <div class="payment-card-icon">📄</div>
        <h4>Boleto</h4>
        <p>Vencimento em 3 dias úteis. Sem burocracia.</p>
        <div class="parcelas">Até 2x sem juros</div>
      </div>
      <div class="payment-card">
        <div class="payment-card-icon">💳</div>
        <h4>Cartão</h4>
        <p>Visa, Master, Elo, Amex. Aprovação na hora.</p>
        <div class="parcelas">Até 12x com juros da operadora</div>
      </div>
    </div>
  </div>
</section>

<section style="background: linear-gradient(180deg, transparent, rgba(124,58,237,0.05), transparent);">
  <div class="container">
    <div class="section-header center">
      <span class="section-badge">💬 O QUE DIZEM</span>
      <h2 class="section-title">Resultados reais</h2>
    </div>
    <div class="benefits-grid">
{testimonials_html}
    </div>
  </div>
</section>

<section style="text-align: center; padding: 4rem 1.5rem;">
  <div class="container">
    <h2 class="section-title">Pronto para começar?</h2>
    <p class="section-subtitle" style="margin: 1rem auto 2rem;">{data['cta_text']}</p>
    <div style="display:flex; gap:0.625rem; justify-content: center; flex-wrap: wrap;">
      <a href="https://wa.me/55119666161611?text={data['wa_msg'].replace(' ', '%20')}" target="_blank" class="btn btn-primary btn-lg">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/></svg>
        {data['cta_btn']}
      </a>
      <a href="https://wa.me/55119666161611?text=Quero%20conversa%20inicial%20gratuita%20de%2030min" target="_blank" class="btn btn-ghost btn-lg">Conversa grátis 30min</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-grid">
    <div>
      <a href="../index.html" class="logo" style="margin-bottom: 1rem;">
        <div class="logo-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 5 5-1-1 5 4 3-4 3 1 5-5-1-2 5-2-5-5 1 1-5-4-3 4-3-1-5 5 1z"/></svg></div>
        <div class="logo-text"><strong>AI School</strong><span>Intelligence for All</span></div>
      </a>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-top:1rem;line-height:1.6;">
        A escola líder em IA no Brasil.
      </p>
    </div>
    <div>
      <h4>Cursos</h4>
      <ul>
        <li><a href="#cursos">Ver cursos</a></li>
        <li><a href="#mentoria">Mentoria VIP</a></li>
        <li><a href="#pagamento">Pagamento</a></li>
      </ul>
    </div>
    <div>
      <h4>Navegação</h4>
      <ul>
        <li><a href="#beneficios">Benefícios</a></li>
        <li><a href="../index.html">Site principal</a></li>
        <li><a href="../landing-page.html">Landing 3D</a></li>
      </ul>
    </div>
    <div>
      <h4>Contato</h4>
      <ul>
        <li><a href="https://wa.me/55119666161611" target="_blank">WhatsApp 11 96616-1611</a></li>
        <li><a href="mailto:contato@aischool.com.br">contato@aischool.com.br</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2026 AI School. Todos os direitos reservados.</div>
    <div>PIX, Boleto 2x sem juros, Cartão 12x</div>
  </div>
</footer>

<script>
window.addEventListener('scroll', () => {{
  const h = document.getElementById('header');
  if (window.scrollY > 20) h.classList.add('scrolled');
  else h.classList.remove('scrolled');
}});
</script>

<!-- CRM + Chatbot Aria -->
<script src="../leads.js"></script>
<script src="../chatbot.js"></script>

</body>
</html>
'''


output_dir = Path('/home/z/my-project/public/landing-pages')
output_dir.mkdir(exist_ok=True)

for slug, data in LANDINGS.items():
    html = build_html(data)
    output_file = output_dir / f'{slug}.html'
    output_file.write_text(html, encoding='utf-8')
    print(f'OK {slug}.html ({len(html)} bytes)')

print(f'\nTotal: {len(LANDINGS)} landing pages reescritas')
