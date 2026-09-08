"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronLeft, Clock, Calendar, ArrowRight, Rocket, Crown,
  Sparkles, Brain, Users, TrendingUp, Target,
} from "lucide-react";

export function SoloFirstArticle() {
  const { navigate } = useRouter();

  return (
    <article className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate({ name: "home" })}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar ao início
        </button>

        {/* Header do artigo */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
              Solo First
            </span>
            <span className="text-xs text-muted-foreground">-</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> 07 set 2026
            </span>
            <span className="text-xs text-muted-foreground">-</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> 12 min de leitura
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Empreendedor T-Shaped: Entenda o perfil do solo empreendedor de alto impacto
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Diferente do conceito do profissional T-Shaped, o empreendedor T
            combina ativos humanos à capacidade empreendedora para capturar
            toda uma cadeia de valor no mercado.
          </p>

          {/* Autor */}
          <div className="mt-8 flex items-center gap-4 p-4 rounded-xl glass border-border">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                CT
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">Christopher Toya</p>
              <p className="text-xs text-muted-foreground">Fundador, Solo First Framework</p>
            </div>
            <div className="ml-auto hidden md:block">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate({ name: "curso", slug: "ia-empreendedorismo" })}
              >
                Conhecer curso
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="relative h-48 md:h-72 rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-500">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-white/90 mx-auto" />
              <p className="text-white/80 text-sm mt-2 font-display">Solo First Framework</p>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="prose prose-invert max-w-none article-content">
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Durante décadas, o mercado de trabalho e a literatura de gestão impuseram aos
            profissionais um dilema clássico: ser um especialista focado em dominar uma
            única disciplina até a exaustão, ou ser um generalista, munido de uma visão
            ampla, porém superficial. No entanto, diante da crescente complexidade dos
            desafios globais e corporativos, as organizações perceberam que esses
            extremos, de forma isolada, não são mais suficientes. É para suprir essa
            lacuna estrutural que se consolida o conceito do profissional T-Shaped (ou
            perfil em &quot;T&quot;).
          </p>

          <p className="leading-relaxed mt-4">
            A metáfora da letra &quot;T&quot; ilustra o equilíbrio metodológico entre duas dimensões
            de competência. A haste vertical representa a profundidade, o rigor técnico e
            a maestria indiscutível em um campo de atuação específico. Em contrapartida, a
            barra horizontal representa a amplitude, as soft skills, a empatia cognitiva
            e a capacidade de compreender, interagir e transitar por múltiplas disciplinas.
          </p>

          <p className="leading-relaxed mt-4">
            Embora muitas vezes tratado como um jargão moderno de inovação, o conceito
            possui raízes sólidas e extensamente documentadas. Historicamente, o uso da
            metáfora teve início em processos internos da McKinsey &amp; Company na década de
            1980. Contudo, foi o pesquisador de recursos humanos David Guest, em 1991, quem
            primeiro cunhou e publicou a expressão em um artigo no jornal The Independent,
            antecipando que os gestores do futuro precisariam aliar tecnologia e negócios.
          </p>

          <p className="leading-relaxed mt-4">
            Nos anos 2000, o modelo ganhou tração global e respaldo estratégico com Tim
            Brown, CEO da consultoria IDEO. Por meio de estudos e artigos na Harvard
            Business Review, Brown estabeleceu o perfil T-Shaped como o pilar humano
            fundamental para o sucesso do Design Thinking. Mais tarde, essa teoria foi
            empiricamente comprovada por pesquisas da IBM, lideradas por cientistas como
            Jim Spohrer. Através da iniciativa de Service Science, Management, and
            Engineering (SSME), os estudos da IBM demonstraram que profissionais com o
            perfil em &quot;T&quot; aceleram significativamente a inovação corporativa, pois atuam
            como &quot;tradutores&quot; que eliminam os silos de comunicação entre áreas técnicas e
            comerciais.
          </p>

          <p className="leading-relaxed mt-4">
            Apoiado em um arcabouço que vai da psicologia organizacional à ciência de
            serviços, o perfil T-Shaped deixou de ser um mero diferencial competitivo para
            se tornar um requisito estratégico nas organizações. Neste artigo, porém, não
            vou abordar o T-Shaped pelo ponto de vista de RH, mas do empreendedorismo, e
            como traduzir isso de forma prática e objetiva para um solo empreendedor de
            alto impacto.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4">
            O fim do paradigma da complementaridade
          </h2>

          <p className="leading-relaxed mt-4">
            Há algumas décadas no Brasil não era possível abrir um CNPJ sem um sócio.
            Muitos solo empreendedores da época acabavam recorrendo ao &quot;sócio laranja&quot;,
            com a clássica divisão 99-1.
          </p>

          <p className="leading-relaxed mt-4">
            Além disso, num cenário de baixa digitalização e acesso dificultado a
            informação, as pessoas eram de fato especialistas em uma determinada matéria
            e passavam a vida se aprofundando num mesmo sentido. Era muito difícil
            encontrar alguém com conhecimento amplo e multidisciplinar.
          </p>

          <p className="leading-relaxed mt-4">
            Mesmo recentemente, quando mergulhei no ecossistema de startups, o formato
            mais alardeado de sucesso era o encontro entre o Hipster, o Hustler e o
            Hacker, incluindo uma forte restrição a investimento em negócios com apenas
            um fundador.
          </p>

          <p className="leading-relaxed mt-4">
            Curiosamente, a grande maioria dos negócios &quot;incríveis&quot; da época e que
            receberam investimento desapareceram, ao passo que alguns corajosos que
            seguiram sozinhos gerando receita estão operando até hoje e, diga-se de
            passagem, muito bem.
          </p>

          <p className="leading-relaxed mt-4">
            A grande virada, no entanto, foi potencializada pela IA que, quando bem
            aplicada, é capaz de preencher gaps de forma consistente. Associado a
            ambientes de colaboração e co-criação, foi possível atingir resultados
            comparáveis a startups com 10 colaboradores, sem queima de caixa e com o
            mesmo padrão de crescimento acelerado.
          </p>

          <p className="leading-relaxed mt-4">
            Os próprios fundos de investimento estão revendo as políticas de investimento,
            reconhecendo a tendência e o alto desempenho dos empreendimentos solo, mas sem
            abrir mão da governança e da independência do negócio em relação ao seu fundador.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4">
            O Empreendedor T-Shaped: O perfil &quot;unicórnio&quot;
          </h2>

          <p className="leading-relaxed mt-4">
            No mundo corporativo, o perfil de profissional T-Shaped está também associado
            ao conceito de HIC (High Individual Contributor), que designa o especialista
            que gera impacto estratégico, define diretrizes técnicas e resolve problemas de
            alta complexidade sem exercer a gestão formal de pessoas (Fournier, 2017).
          </p>

          <p className="leading-relaxed mt-4">
            Estruturado historicamente a partir do modelo de carreira em Y, ou dual career
            ladder (Allen &amp; Katz, 1986), esse perfil profissional progride em níveis
            técnicos sêniores, tais como Staff, Principal ou Distinguished , conquistando
            autonomia, remuneração e escopo de influência equivalentes aos de cargos da
            liderança corporativa tradicional (Larson, 2021).
          </p>

          <p className="leading-relaxed mt-4">
            Nesse cenário, a atuação do especialista consolida-se por meio da liderança
            técnica sem autoridade formal, da arquitetura de soluções de grande escala e
            da mentoria de pares (Reilly, 2022), tornando-o fundamental para organizações
            que buscam reter talentos de alto domínio técnico sem forçá-los à transição
            para funções exclusivamente administrativas.
          </p>

          <p className="leading-relaxed mt-4">
            No mercado aberto, esse tipo de profissional transforma-se no núcleo de
            empreendimentos baseados em capital intelectual, capaz de suprir demandas de
            mercado de forma assertiva, eficiente e, muitas vezes, rivalizando com
            estruturas de serviços tradicionais que acabam entregando serviços medíocres e
            caros.
          </p>

          <p className="leading-relaxed mt-4">
            Porém, diferente do ambiente corporativo, a barra horizontal deixa de
            compreender apenas o campo das soft skills e conhecimentos técnicos
            complementares, e exige o desenvolvimento de habilidades de gestão e negócios,
            que definem a atividade empreendedora.
          </p>

          <p className="leading-relaxed mt-4">
            A partir daí, começamos a delinear as características do Empreendedor T-Shaped
            e que começam a se distanciar do conceito do Profissional T-Shaped do mundo
            corporativo.
          </p>

          {/* BOX: Haste Vertical */}
          <div className="my-10 p-6 rounded-xl glass-strong border-violet-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold">
                Haste Vertical (Excelência): Sai Hard Skill, entra o Dharma
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Enquanto a haste vertical profunda do profissional T está relacionada a
              conhecimento técnico, no empreendedor T a complexidade aumenta. No modelo
              corporativo, um profissional vende seu conhecimento como commodity para um
              ente corporativo, que através do seu processo a transforma numa solução
              capaz de capturar valor no mercado.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              No empreendedorismo, o capital humano torna-se o principal ativo do negócio
              e deve ser dimensionado para gerar valor diretamente ao mercado. É aí que
              entra o conceito de Soft Assets ou Capitais Humanos, que são as fontes
              geradoras de valor de um profissional, compostas por:
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-sm font-medium text-violet-300">Capital Intelectual</p>
                <p className="text-xs text-muted-foreground mt-1">Hard Skills, Experiência e Métodos Proprietários.</p>
              </div>
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-sm font-medium text-violet-300">Capital Reputacional</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Diplomas e Certificados, Marcas Empregadoras, Realizações, Reputação
                  Transferida de Terceiros (Instituições, Empresas e Pessoas) e Narrativa.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <p className="text-sm font-medium text-violet-300">Capital Social</p>
                <p className="text-xs text-muted-foreground mt-1">Contatos Próximos, Laços Fracos e Audiência.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              A combinação dos Soft Assets, por sua vez, leva à formação do Dharma, que
              significa o posicionamento de mercado onde o seu conjunto de ativos é mais
              valorizado, constituindo o seu nicho de excelência.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              O Dharma é um elemento determinista, o que significa que o estado atual dos
              seus Soft Assets determina a sua posição de excelência. Para mudar o Dharma,
              necessariamente é necessário mover os Soft Assets.
            </p>
          </div>

          {/* BOX: Haste Horizontal */}
          <div className="my-10 p-6 rounded-xl glass-strong border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold">
                Haste Horizontal (Amplitude Empreendedora): Skills Empreendedoras
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Aqui reside um dos maiores desafios do profissional que se torna
              empreendedor: Adquirir as habilidades necessárias para gerir e crescer o
              seu negócio.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Na ausência de um ente corporativo que beneficia o capital intelectual e
              distribui ao mercado, é preciso operar todas as etapas de um empreendimento,
              que inclui gestão, comercial e estratégia, o que pode ser bastante
              desafiador sobretudo para profissionais essencialmente técnicos.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Além da sua excelência técnica, o empreendedor T-Shaped precisa dominar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {[
                { skill: "Comunicação", desc: "Posicionar-se profissionalmente construindo autoridade e deixando clara sua oferta" },
                { skill: "Vendas", desc: "Compreender as necessidades do cliente e moldar propostas comerciais objetivas" },
                { skill: "Finanças", desc: "Gerir as finanças do seu empreendimento de forma isolada do pessoal" },
                { skill: "Gestão", desc: "Orquestrar as atividades próprias, de parceiros, colaboradores e fornecedores" },
                { skill: "Produto", desc: "Identificar padrões, desenhar processos e aumentar a eficiência gradativamente" },
              ].map((s) => (
                <div key={s.skill} className="p-3 rounded-lg bg-card/50 border border-border">
                  <p className="text-sm font-medium text-emerald-300">{s.skill}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              São justamente estas características que podem significar a diferença entre
              um freelancer bem remunerado e um solo empreendimento com valor de mercado,
              capaz não apenas de gerar fluxo financeiro, mas construir equity.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4">
            Amplificação do Empreendedor
          </h2>

          <p className="leading-relaxed mt-4">
            Antes da revolução da informação, desenvolver a haste horizontal era uma
            tarefa árdua. Hoje, com a inteligência artificial, acesso amplo a informação e
            plataformas de comunicação rápidas como redes sociais e sistemas de mensageria
            como WhatsApp é possível acelerar a evolução do empreendedor T-Shaped.
          </p>

          <p className="leading-relaxed mt-4">
            Ser solo empreendedor em 2026 não é uma atividade solitária, pelo contrário, o
            empreendedor T escalável convive com mais pessoas, acessa conhecimento sob
            diversas perspectivas e vai muito além de um profissional confinado num
            ambiente corporativo tradicional.
          </p>

          <p className="leading-relaxed mt-4">
            Porém, é necessário separar quantidade de qualidade, por isso devemos utilizar
            as oportunidades disponíveis com sabedoria.
          </p>

          {/* Sub-section: Mentores */}
          <div className="my-8 p-5 rounded-xl glass border-border">
            <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-violet-400" /> Mentores, Conselheiros e Partners
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um empreendedor T que opera um negócio de capital intelectual não precisa
              investir em maquinário, galpões ou mesmo estoque. Seu estoque consiste em
              conhecimento, reputação e networking. Por isso, um solo empreendedor deve
              direcionar seus investimentos em mentores e conselheiros capazes de
              transferir experiência e ajudar na resolução dos desafios do dia a dia, e
              também em parcerias de negócio que podem complementar sua entrega final e
              enriquecer seu repertório.
            </p>
          </div>

          {/* Sub-section: Ambiência */}
          <div className="my-8 p-5 rounded-xl glass border-border">
            <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" /> Ambiência e Ecossistemas
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O escritório do empreendedor T não é um andar corporativo homogêneo, mas
              sim o mundo. Por isso, é importante fazer parte de ecossistemas, hubs,
              comunidades e clubes de negócios onde você pode conviver não apenas com
              potenciais clientes, mas com outros profissionais com interesses alinhados
              aos seus. Um bom ecossistema é capaz de multiplicar os seus níveis de
              acesso, acelerar o desenvolvimento do capital intelectual e também
              transferir reputação.
            </p>
          </div>

          {/* Sub-section: IA */}
          <div className="my-8 p-5 rounded-xl glass border-border">
            <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-violet-400" /> Inteligência Artificial e Sistemas
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A inteligência artificial é um verdadeiro game changer para o empreendedor T,
              sendo capaz de amplificar a capacidade de produção e ainda complementar
              competências necessárias para o eixo horizontal. Porém, é importante que a IA
              seja amplificada como complemento e não substituto da criatividade e da
              estratégia, uma vez que a responsabilidade pela entrega final ainda é humana.
              Adicionalmente, o uso de sistemas e automações permite manter o foco na
              geração de valor, podendo apoiar em tarefas como geração de conteúdo,
              prospecção, gestão financeira. Um pool de sistemas associado ao uso
              consciente da IA pode valer por um time inteiro.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4">
            As tendências para o Empreendedor T-Shaped
          </h2>

          <p className="leading-relaxed mt-4">
            O crescimento do solo empreendedorismo de alto impacto vai demandar cada vez
            mais de profissionais capazes de desenvolver as competências do Empreendedor T.
          </p>

          <p className="leading-relaxed mt-4">
            Um dos pontos mais importantes nesse processo está na auto consciência,
            compreendendo a si próprio como principal ativo gerador de valor e dominando
            as competências necessárias para empacotar e distribuir sua expertise
            diretamente para o mercado.
          </p>

          <p className="leading-relaxed mt-4 text-lg font-display italic text-violet-200">
            Este é o melhor momento da história para empreender e você não precisa de nada
            além do que está entre as suas duas orelhas para fazer isso acontecer.
          </p>

          {/* CTA do artigo */}
          <Card className="mt-12 glass-strong border-amber-500/30 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shrink-0">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-xl font-bold">
                  Quer virar um Empreendedor T-Shaped?
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  O curso &quot;IA + Empreendedorismo: Solo First Framework&quot; da AI School
                  transforma este artigo em um plano de 10 horas, com mentoria,
                  ferramentas e plano 90 dias para sair do CLT.
                </p>
              </div>
              <Button
                onClick={() => navigate({ name: "curso", slug: "ia-empreendedorismo" })}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white shrink-0"
              >
                Ver curso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Mentoria VIP CTA */}
          <Card className="mt-4 glass border-violet-500/30 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="h-5 w-5 text-amber-400" />
              <h3 className="font-display font-semibold">Prefere mentoria 1-a-1?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A Mentoria VIP é o caminho mais rápido para colocar o Solo First Framework
              em prática. 10 horas personalizadas com mentor dedicado.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate({ name: "mentoria" })}
            >
              Conhecer Mentoria VIP
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Card>
        </div>
      </div>
    </article>
  );
}
