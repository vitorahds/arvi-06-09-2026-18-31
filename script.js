const accordionData={
  about:[
    ["O que é Linguagem Simples (LS)?",`<p>LS é um conjunto de práticas que colocam o leitor em primeiro lugar.</p><p>A LS considera o que a pessoa quer saber, o quanto conhece do assunto, com que facilidade lê e onde vai usar o texto.</p><p>A partir disso, a LS organiza as ideias, escolhe palavras familiares, monta as frases e define o design.</p><p>Comunicar em LS traz vantagens para todas as pessoas:</p><p><strong>Para quem lê:</strong></p><ul><li>encontra o que precisa mais rápido;</li><li>entende na primeira leitura;</li><li>comete menos erros ao seguir o texto;</li><li>consegue agir por conta própria.</li></ul><p><strong>Para quem escreve:</strong></p><ul><li>recebe menos dúvidas e menos retrabalho;</li><li>alcança mais gente, sem deixar de fora quem tem menos familiaridade com o assunto;</li><li>passa mais confiança e transparência.</li></ul>`],
    ["O que é Design da Informação (DI)?",`<p>A Linguagem Simples (LS) e o DI trabalham juntos.</p><p>O DI organiza textos, imagens, tipografia e dados para facilitar a compreensão e o uso da mensagem para quem vai ler.</p><p>Seu objetivo é criar documentos e interações em que as pessoas encontrem rapidamente o que procuram e saibam como agir.</p>`],
    ["O que é Linguagem Inclusiva (LI)?",`<p>LI completa a Linguagem Simples (LS).</p><p>Ela escreve sem discriminar nem apagar quem sofre preconceito. Com isso, promove respeito e representatividade.</p><p>A LI enfrenta o preconceito por deficiência, etnia, cultura, religião, orientação sexual, identidade de gênero, idade, dependência química e condições de saúde, como o HIV.</p>`],
    ["De onde surgiu o conceito de ARVI?",`<p>ARVI junta ARV, sigla dos antirretrovirais, com o I de inclusão. O nome diz o que a ferramenta quer: deixar a comunicação sobre prevenção ao HIV mais clara, mais acessível e mais acolhedora.</p><p>A marca vem do formato dos comprimidos usados na PrEP e na PEP:</p><ul><li>Duas formas alongadas</li><li>Uma forma redonda</li></ul><p>Essas formas lembram os remédios que previnem o HIV. Também representam acesso, cuidado e inclusão.</p><p>Detalhe: a PrEP é um comprimido alongado (TDF/FTC). A PEP são dois: um alongado (TDF/3TC) e um redondo (dolutegravir, DTG).</p><div class="accordion-story-frame"><img class="accordion-story-image" src="assets/final/slot-2.svg" alt="Construção visual do conceito e do nome ARVI"></div>`]
  ]
};

function renderAccordions(){
  document.querySelectorAll(".accordion-list").forEach(list=>{
    accordionData[list.dataset.group].forEach(([label,text],i)=>{
      const item=document.createElement("div"); item.className="accordion";
      const button=document.createElement("button"); button.type="button";
      const initiallyOpen=i===0;
      button.id=`accordion-${list.dataset.group}-${i}`; button.setAttribute("aria-expanded",String(initiallyOpen));
      button.setAttribute("aria-controls",`accordion-panel-${list.dataset.group}-${i}`);
      button.innerHTML=`<span>${label}</span><span class="symbol" aria-hidden="true">${initiallyOpen?'<img src="assets/final/accordion-minus.svg" alt="">':"+"}</span>`;
      const content=document.createElement("div"); content.className="content"; content.hidden=!initiallyOpen;
      content.id=`accordion-panel-${list.dataset.group}-${i}`; content.setAttribute("role","region");
      content.setAttribute("aria-labelledby",button.id); content.innerHTML=text;
      button.addEventListener("click",()=>{
        const open=button.getAttribute("aria-expanded")==="true";
        list.querySelectorAll(".accordion").forEach(other=>{
          const otherButton=other.querySelector("button");
          const otherContent=other.querySelector(".content");
          otherButton.setAttribute("aria-expanded","false");
          otherContent.hidden=true;
          otherButton.querySelector(".symbol").textContent="+";
        });
        button.setAttribute("aria-expanded",String(!open)); content.hidden=open;
        button.querySelector(".symbol").innerHTML=open?"+":'<img src="assets/final/accordion-minus.svg" alt="">';
      });
      item.append(button,content); list.append(item);
    });
  });
}

const tabs=[...document.querySelectorAll('[role="tab"]')];
function activateTab(tab){
  tabs.forEach(t=>{const selected=t===tab;t.classList.toggle("active",selected);t.setAttribute("aria-selected",String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute("aria-controls")).hidden=!selected});
  tab.focus({preventScroll:true});
}
tabs.forEach((tab,index)=>{
  tab.addEventListener("click",()=>activateTab(tab));
  tab.addEventListener("keydown",e=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();
    let next=e.key==="Home"?0:e.key==="End"?tabs.length-1:(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
    activateTab(tabs[next]);
  });
});
const toolCards=[
  {title:"Quem vai ler",question:"Para quem é o material e o que ele precisa levar em conta?",items:["Para quem o material foi feito?","O que esse público já sabe e ainda precisa saber?","A linguagem e as imagens funcionam para pessoas diferentes?","O público foi definido com base em dados e conversas com leitores?"]},
  {title:"Mensagem principal",question:"O que o material quer dizer e o que a pessoa precisa entender primeiro?",items:["O material tem um único objetivo claro?","A mensagem principal aparece primeiro e em destaque?","As outras informações ajudam a entender essa mensagem?","A pessoa sabe o que fazer depois de ler?"]},
  {title:"Informação obrigatória",question:"Quais informações não podem faltar para a pessoa agir com segurança?",items:["O material traz tudo o que a pessoa precisa saber para agir com segurança?","Ele explica para que serve, os prazos, os exames, o acompanhamento e o acesso ao serviço?","As informações vieram de fontes oficiais e atualizadas?","Os endereços, telefones, links e códigos QR funcionam?"]},
  {title:"Tipo de material",question:"Que material você está avaliando?",items:["É um cartaz, um folder ou um folheto?","A quantidade de texto combina com esse tipo de material?","O conteúdo está organizado para a forma como a pessoa vai ler?","No folder, o texto acompanha a ordem das dobras?"]},
  {title:"Informações do material",question:"Como é o seu material?",items:["O material usa um tamanho de papel padrão?","O tamanho é adequado para guardar, transportar ou expor?","O papel evita reflexos e impede que o verso apareça na frente?","A impressão está sem falhas, manchas ou partes desbotadas?"]},
  {title:"Local",question:"Onde a pessoa vai ler o material (cartaz)?  ",items:["Onde o material será lido?","A luz do local facilita a leitura?","Há sombras ou reflexos que atrapalham?","O material pode ser lido de diferentes ângulos e horários?"]},
  {title:"Simplicidade na saúde",question:"O texto e as imagens são simples e respeitosos com quem busca informações de saúde?",items:["O texto usa palavras comuns e explica os termos médicos?","As siglas necessárias estão explicadas?","O texto evita culpar, julgar ou causar vergonha?","As imagens representam as pessoas com respeito?"]},
  {title:"Leiturabilidade",question:"O texto é simples para o público, segundo as ferramentas de análise?",items:["Os resultados indicam que o texto é adequado ao público?","Você comparou o texto em mais de uma ferramenta?"]},
  {title:"Legibilidade",question:"O texto, as imagens e os espaços são fáceis de ver e entender?",items:["A letra é fácil de ler e tem tamanho adequado?","O texto, as imagens e os espaços estão bem organizados?","As cores têm contraste suficiente?","O material pode ser lido na distância e no local de uso?"]}
];

const detailTabs=[
  {
    title:"Quem precisa entender",
    intro:["A comunicação só funciona quando a mensagem cabe no jeito de pensar e nos valores de quem lê.","É aí que a Linguagem Simples vira uma \"rampa de acesso\": ela parte de quem é o público para organizar as ideias, escolher as palavras mais familiares e definir o design."],
    chips:true,
    sections:[
      {question:"O material deixa claro para quem foi escrito?",label:"Exemplo",image:"assets/detail-audience-example.png",tools:["Leia o material inteiro procurando uma frase que diga para quem ele foi feito.","Se não achar, veja se dá para saber o público só pelo assunto e pelas imagens."]},
      {question:"Quem lê o material consegue entender?",label:"Informação adicional",info:["O que o público já sabe sobre o assunto e o que ele ainda precisa saber?","Que dúvidas ele pode ter?","Escreva para todos, considerando suas potencialidades e limitações."],tools:["Converse com os leitores ou aplique um questionário.","Veja o que já funcionou em materiais anteriores para esse público.","Busque pesquisas que já existam sobre o público.","Procure padrões de comportamento que mostrem os diferentes tipos de leitor, seus contextos e suas necessidades."]}
    ]
  },
  {
    title:"Mensagem principal",
    intro:["Todo material de saúde tem um objetivo.","O objetivo é a ação que você espera da pessoa.","A mensagem principal é a informação ou informações que levam ela até essa ação."],
    sections:[
      {question:"Dá para identificar facilmente o que se espera com o material?",label:"Informação adicional",info:["O objetivo é o que você espera que a pessoa faça depois de ler.","Escolha um único objetivo: descrever um procedimento (como um exame), apoiar quem convive com uma condição, ensinar um passo a passo (como usar um autoteste) ou ajudar numa decisão (como escolher entre PrEP diária ou sob demanda).","Um objetivo claro ajuda a pessoa a entender como agir para evitar ou resolver um problema.","Evite mais de um objetivo na mesma peça. Eles disputam a atenção e enfraquecem os dois.","Comece o título da seção com uma pergunta e responda ela no corpo do texto."],image:"assets/detail-objective-example.png",exampleNotes:["Objetivo: oferecer informações gerais sobre a PEP.","Ação esperada: que a pessoa conheça a PEP como uma forma de prevenção de urgência.","Título em destaque: 'Informações sobre a Profilaxia Pós-Exposição (PEP)'. Ele mostra que o material é um cartaz informativo para o público em geral.","Conceitos em destaque: o que ajuda a cumprir o objetivo aparece em destaque: o que é a PEP, o que é contato de risco, o que fazer e por quanto tempo tomar."],tools:["Confira se está claro para que serve o material e o que a pessoa deve fazer.","Veja se essa informação principal está em destaque, com título, peso da fonte ou cor que sobressai.","Confira se as outras informações realmente ajudam a chegar nessa ação. Corte o que não ajuda."]}
    ]
  },
  {
    title:"Informações obrigatórias",
    intro:["Materiais de saúde devem trazer informações obrigatórias para orientar decisões seguras.","O conteúdo deve seguir normas, protocolos ou fontes técnicas confiáveis, sobretudo sobre indicação, prazos, testes, acompanhamento, acesso ao serviço e atualização."],
    chips:true,
    sections:[
      {question:"Todas as informações mais importantes estão no material?",label:"Informação adicional",info:["Um material de saúde precisa reunir tudo o que a pessoa precisa saber para agir com segurança.","Verifique se aparecem: para que serve, prazos, exames, acompanhamento e onde procurar o serviço.","Se faltar um desses pontos, a pessoa pode ficar sem uma informação importante na hora de decidir."],tools:["Compare o material com o protocolo ou fonte oficial e veja se falta alguma informação.","Na dúvida, confirme com um profissional de saúde."]},
      {question:"As informações estão corretas e atualizadas para agir com segurança?",label:"Informação adicional",info:["Ter a informação não basta: ela precisa estar certa e atualizada.","O conteúdo deve seguir normas, protocolos ou fontes técnicas confiáveis.","Protocolos e recomendações mudam com o tempo, então confira a data da fonte."],tools:["Compare cada informação com um protocolo ou fonte oficial atualizada.","Confirme os pontos em dúvida com um profissional de saúde."]}
    ]
  }
];

const prepDetailTabs={
  0:{sections:[{question:"Onde posso pesquisar sobre quem usa remédios para prevenir o HIV?",label:"Informação adicional",info:["Leve em consideração dados públicos.","Não esqueça de conversar com o público que vai ler."],tools:["Faça questionários anônimos com as pessoas da unidade de saúde.","Acesse os links abaixo de monitoramento oficial do Ministério da Saúde sobre o uso de medicamentos.","Acesse o link abaixo sobre Analfabetismo Funcional no Brasil (Inaf).","Descubra o nível de leitura do público que você quer alcançar.","Junte os dados dos painéis e do indicador antes de começar a escrever.","Compare o perfil que apareceu com a ideia que você tinha do público.","Ajuste o texto ao nível de leitura real que os dados mostraram."]}],resources:[{title:"Monitoramento da PrEP",url:"https://www.gov.br/aids/pt-br/indicadores-epidemiologicos/painel-de-monitoramento/painel-prep"},{title:"Monitoramento da PEP",url:"https://www.gov.br/aids/pt-br/indicadores-epidemiologicos/painel-de-monitoramento/painel-pep"},{title:"Dados do Inaf",url:"https://alfabetismofuncional.org.br/"}]},
  2:{sections:[{question:"Onde posso encontrar informações atualizadas e oficiais sobre remédios para prevenir o HIV?",label:"",tools:["Acesse os links abaixo de documentos oficiais de orientações, diretrizes e protocolos do Ministério da Saúde.","Cruze o texto com os Protocolos Clínicos e Diretrizes Terapêuticas."]},{question:"Quando o material é para o público em geral, ele diz onde encontrar o serviço?",label:"Informação adicional",info:["Material de prevenção precisa dizer onde a pessoa consegue o serviço.","Escolha uma ou mais formas de acesso: nome do serviço, endereço, telefone, link, QR Code ou o caminho para chegar até lá.","Sem essa informação, a pessoa entende o assunto mas não sabe para onde ir."],tools:["Procure no material o serviço, o endereço, o telefone, o link ou o QR Code.","Clique no link e leia o QR Code na tela para ver se levam ao lugar certo.","Confira se o texto de acesso está grande o bastante para ler sem esforço."]}],resources:[{title:"Boletins epidemiológicos",url:"https://www.gov.br/aids/pt-br/central-de-conteudo/boletins-epidemiologicos"},{title:"Protocolos Clínicos e Diretrizes Terapêuticas",url:"https://www.gov.br/aids/pt-br/central-de-conteudo/pcdts"},{title:"Manuais técnicos para diagnóstico",url:"https://www.gov.br/aids/pt-br/central-de-conteudo/manuais-tecnicos-para-diagnostico"},{title:"Notas técnicas",url:"https://www.gov.br/aids/pt-br/central-de-conteudo/notas-tecnicas"},{title:"Notas informaticas",url:"https://www.gov.br/aids/pt-br/central-de-conteudo/notas-informativas"}]}
};

const materialDetailTabs=[
  {
    title:"Tipo de material",
    intro:["Nesta ferramenta falamos de três tipos de peça: o folheto, o folder e o cartaz. Eles parecem parecidos, mas são lidos de jeitos diferentes.","Um fica na mão da pessoa; o outro fica na parede. Essa diferença muda quase tudo: o tamanho da letra, a quantidade de texto, o espaço entre as partes e até o papel.","Por isso vale saber qual deles você está fazendo antes de começar"],
    educational:true
  },
  {
    title:"Informações do material",
    intro:["Não basta só saber o tipo de material. Precisamos entender um pouco mais dele.","Considere documentar e entender como é ou deve ser o material."],
    sections:[
      {question:"O material usa um tamanho de papel padrão?",label:"Informação adicional",info:["Use tamanhos de página padronizados, como A4, A3, A2 e A1","No cartaz, use formato maior e menos texto; no folheto, formato menor e mais texto.","No folder, use a mesma quantidade de texto do folheto e distribua o conteúdo conforme as dobras.","Confira se o material cabe no lugar onde ele vai ser guardado, transportado ou exposto."],images:["assets/detail-paper-sizes.png"],toolsDigital:["Abra a configuração de página no aplicativo de criação e veja qual formato está definido para o arquivo.","Confira se esse formato é um dos padrões: A4, A3 ou A2.","No folder, marque as dobras no arquivo e veja se cada bloco de texto fica dentro de um painel."],toolsPhysical:["Imprima no formato final no formato adequado.","Coloque a peça no local onde ela vai ficar e veja se cabe.","No folder, dobre a peça e confira se o texto acompanha as dobras."]},
      {question:"O papel e a impressão deixam o texto fácil de ler?",label:"Informação adicional",info:["Use papel fosco e evite acabamento brilhante.","Escolha papel com gramatura e opacidade suficientes para o que está impresso no verso não atrapalhar a leitura da frente."],images:["assets/detail-paper-print-1.png","assets/detail-paper-print-2.png"],toolsDigital:["Anote no pedido de impressão o acabamento fosco e a gramatura do papel.","Peça uma prova impressa à gráfica.","Inclua na prova textos, imagens e áreas totalmente preenchidas de cor."],toolsPhysical:["Incline a peça sob a luz e procure reflexos sobre o texto e as imagens.","Coloque a peça sobre uma superfície clara e veja se o conteúdo do verso aparece na frente.","Procure falhas, manchas e áreas desbotadas, e compare com outros exemplares da mesma tiragem."]}
    ]
  },
  {
    title:"Local",
    intro:["Além do material, é necessário saber onde ele vai ser lido.","Defina onde e como a pessoa verá o material."],
    sections:[{question:"A luz do lugar deixa o cartaz fácil de ler?",label:"Informação adicional",info:["Garanta luz suficiente nas áreas com textos expostos e nos lugares de passagem.","Use mais luz quanto mais escuro for o tom da superfície.","Evite superfícies brilhantes onde a luz bate direto.","Olhe o cartaz de vários ângulos e veja se aparecem sombras ou reflexos que atrapalham a leitura."],toolsDigital:["Abra o arquivo no aplicativo de criação e veja o tom do fundo: quanto mais escuro, mais luz o lugar vai precisar.","Escolha um acabamento sem brilho quando o cartaz for ficar sob luz direta."],toolsPhysical:["Leia o cartaz no lugar de exposição, com a luz que existe ali.","Ande em volta dele e olhe de vários ângulos, procurando sombras e reflexos.","Volte em outro horário do dia e veja se o texto continua fácil de ler."]}]
  }
];

const finalDetailTabs=[
  {
    title:"Simplicidade na saúde", subtitle:"O texto e as imagens são de fontes confiáveis e respeitosos com quem busca informações de saúde?", tabs:[
      {label:"Termos médicos e siglas",heading:"Termos médicos e siglas",lead:"Analise se existem explicações suficientes para entender o material.",sections:[
        {question:"O material usa palavras comuns e explica os termos técnicos necessários?",label:"Informação adicional",info:["Troque palavras difíceis por palavras conhecidas.","Explique os termos técnicos que precisam permanecer.","Use glossário ou imagem quando isso ajudar."],examples:["Certo|O paciente tem dificuldade para respirar.","Errado|O paciente apresenta dispneia.","Certo|O paciente apresenta dispneia.\n\nGlossário\nDispneia é a dificuldade de respirar.","Errado|O paciente apresenta dispneia."],toolsDigital:["Use a busca do programa para encontrar palavras difíceis ou estrangeiras. Veja se foram trocadas ou explicadas.","Use o Vidya Text para comparar o texto antes e depois das mudanças.","Consulte o CorPop para saber se as palavras aparecem com frequência no português popular escrito. Compare também com palavras mais comuns.","Peça a pessoas do público que leiam o texto. Veja se entendem sem ajuda."],toolsPhysical:["Marque as palavras difíceis. Veja se foram trocadas ou explicadas.","Confira se o glossário ou a imagem está perto do texto que explica.","Peça a pessoas do público que leiam o material. Veja se entendem sem ajuda."]},
        {question:"O material evita siglas e explica as que precisam ser usadas?",label:"Informação adicional",info:["Na primeira vez, escreva o nome completo antes da sigla.","Mantenha apenas as siglas necessárias e usadas novamente.","Registre as siglas mantidas e seus significados em uma lista."],examples:["Certo|O Sistema Único de Saúde (SUS) é muito importante para o Brasil.","Errado|O SUS é muito importante para o Brasil."],toolsDigital:["Use a busca do programa para encontrar siglas, abreviações e palavras em letras maiúsculas. Confira se o nome completo aparece na primeira vez.","Veja se cada sigla é necessária, aparece novamente no texto e está na lista de siglas.","Peça a pessoas do público que relacionem cada sigla ao seu significado."],toolsPhysical:["Marque as siglas e abreviações. Confira se o nome completo aparece na primeira vez.","Compare as siglas com a lista e veja se elas são usadas novamente no texto."]}
      ]},
      {label:"Empatia e respeito",heading:"Empatia e respeito",lead:"Não basta apenas explicar: é necessário acolher e respeitar.",sections:[
        {question:"O texto trata o tema e as pessoas com respeito, sem culpar ou julgar?",label:"Informação adicional",info:["Evite palavras preconceituosas, moralistas ou que causem vergonha.","Tenha esse cuidado ao falar de prevenção, práticas sexuais, exposição ao HIV e acesso ao serviço.","Use termos adequados, como “pessoa vivendo com HIV” e “populações-chave”","Não apague nem exclua pessoas negras, trans, travestis, jovens, mulheres, pessoas com menor escolaridade ou outros grupos em situação de vulnerabilidade."],toolsDigital:["Use a busca do programa para localizar palavras que possam culpar, julgar ou estigmatizar.","Compare os termos usados com o Guia de Terminologia do UNAIDS.","Use o Vidya Text e confira se a polaridade está neutra ou positiva."],toolsPhysical:["Marque os trechos que possam culpar, julgar ou causar vergonha.","Compare os termos usados com o Guia de Terminologia do UNAIDS.","Peça a pessoas do público que digam se algum trecho parece ofensivo ou desrespeitoso."]},
        {question:"As imagens representam as pessoas e os contextos com respeito?",label:"Informação adicional",info:["Evite imagens que exponham, ridicularizem ou reforcem estereótipos.","Esse cuidado vale para fotografias, ilustrações e personagens."],toolsDigital:["Observe cada imagem e veja se há exposição, caricatura ou estereótipo.","Peça a uma pessoa especialista que avalie as imagens.","Mostre as imagens ao público e pergunte se são respeitosas."],toolsPhysical:["Observe as imagens no tamanho e no formato finais.","Peça a uma pessoa especialista que verifique se há caricatura ou estigma.","Mostre o material ao público e pergunte como as pessoas se sentem representadas."]}
      ]}
    ]
  },
  {
    title:"Leiturabilidade",subtitle:"O texto é simples para o público, de acordo com as ferramentas de análise?",tabs:[
      {label:"Orientações gerais",heading:"Orientações gerais",paragraphs:["Para verificar se um texto é simples, a ARVI reúne ferramentas que analisam diferentes aspectos da escrita.","Elas foram organizadas em dois grupos:","ferramentas que avaliam o texto como um todo, como o Vidya Text, Simpligo, Coh-Metrix-Port e ALT-Legibilidade;","ferramentas que verificam o vocabulário, como o CorPop e o MedSimples;","Juntas, essas ferramentas ajudam a avaliar coesão, coerência, complexidade das frases, escolha das palavras e outros aspectos da simplificação textual em português brasileiro."]},
      {label:"Vidya Text",heading:"Vidya Text — Vidya Network",action:"Acessar",paragraphs:["Sobre a ferramenta","Objetivo: apoiar a aprendizagem com textos, mapas conceituais e relações entre ideias.\nComo analisa: aplica 11 indicadores a textos com mais de 20 palavras. Inclui os índices Dale-Chall e Flesch.","Grandi (2024) e Grandi et al. (2024).","Resultado da análise","Apresenta dados sobre o tamanho e a composição do texto. Também identifica o tom positivo, negativo ou neutro e lista palavras ausentes nos dicionários usados.","Cores e destaques no texto","No campo Texto Analisado, as cores indicam como a ferramenta classificou cada palavra:\nAzul-claro: palavra comum.\nVermelho-escuro: palavra suspeita, não encontrada no dicionário da Vidya Text.\nAzul-escuro: nome próprio ou número.","O que merece mais atenção","frases com muitas palavras;\npalavras longas ou pouco frequentes;\ntermos técnicos sem explicação;\npalavras suspeitas;\nrepetições desnecessárias;\nresultados baixos nos índices de leitura."]},
      {label:"Simpligo",heading:"Simpligo",action:"Acessar",paragraphs:["Sobre a ferramenta","Objetivo: identificar frases que podem precisar de simplificação.\nComo analisa: divide textos de até 1.000 palavras em frases. Avalia cada frase pela ordem e pelo tamanho de seus componentes.","Leal (2021) e Tcacenco (2023)","Resultado da análise","Apresenta dados sobre o tamanho e a composição do texto. Também identifica o tom positivo, negativo ou neutro e lista palavras ausentes nos dicionários usados.","Cores das frases","As cores organizam as frases em quatro níveis:\nVerde — 1 a 25: menor complexidade;\nAmarelo — 26 a 50: complexidade moderada;\nLaranja — 51 a 75: complexidade alta;\nVermelho — 76 a 100: complexidade muito alta.\nA classificação mostra quais frases merecem mais atenção durante a revisão.","O que merece mais atenção","frases em laranja e vermelho."]},
      {label:"Coh-Metrix-Port",heading:"Coh-Metrix-Port",action:"Acessar",paragraphs:["Sobre a ferramenta","Objetivo: adaptar o sistema Coh-Metrix ao português e apoiar a acessibilidade de textos na internet.\nComo analisa: aplica 46 medidas linguísticas e cinco índices de leiturabilidade. Analisa elementos como conectivos, operadores lógicos e relações entre palavras.","Scarton e Aluísio (2010)","Resultado da análise","Apresenta uma lista de 46 métricas.","Métrica para observar","1. Índice Flesch — flesch","2. Palavras por frase — words_per_sentence","3. Sílabas por palavra de conteúdo — syllables_per_content_word","4. Palavras antes do verbo principal — words_before_main_verb","5. Tamanho médio dos grupos nominais — mean_noun_phrase","6. Frequência mínima das palavras de conteúdo — min_cw_freq","7. Proporção de conectivos — conn_ratio","8. Conectivos de causa — cau_pos_conn_ratio","9. Conectivos de tempo — tmp_pos_conn_ratio","10. Repetição de radicais entre frases próximas — adj_stem_ovl"]},
      {label:"ALT ",heading:"ALT - Análise de Legibilidade Textual",action:"Acessar",paragraphs:["Sobre a ferramenta","Objetivo: reduzir dificuldades na comunicação escrita com fórmulas adaptadas ao português.\nComo analisa: conta caracteres, letras, sílabas, palavras e frases. Depois, aplica seis fórmulas de legibilidade e leiturabilidade, como os índices Flesch e Gunning Fog.","Moreno et al. (2023).","Resultado da análise","Apresenta notas de 0 a 100 e estima a escolaridade necessária para a leitura. Destaca frases longas em amarelo ou vermelho e palavras difíceis em azul. Também gera nuvens de palavras.","Cores e destaques no texto","A ferramenta usa cores para indicar possíveis dificuldades:\nPalavras em azul: não estão entre as 5 mil palavras mais usadas no português brasileiro. Podem ser termos técnicos, jargões ou palavras pouco conhecidas.\nFrases sublinhadas em amarelo: podem estar longas. Considere dividi-las em duas.\nFrases sublinhadas em vermelho: estão muito longas. Divida-as em duas ou mais frases.","Limites da ferramenta","Os índices não avaliam se:\n as ideias estão bem conectadas;\n o conteúdo segue uma ordem lógica;\n a informação está correta;\n o texto responde às necessidades do público;\n a pessoa consegue usar a informação.\nUse a ALT como apoio. Não substitua automaticamente todo termo destacado."]},
      {label:"Outras ferramentas úteis",heading:"Outras ferramentas úteis",cards:[{title:"CorPop",text:"Objetivo: apoiar a escolha de palavras mais conhecidas pela população brasileira, em especial pela classe trabalhadora.\nComo analisa: compara o vocabulário com um acervo formado por jornais de rua, livros populares e obras simplificadas.\nResultado: apresenta listas de frequência, grupos de palavras e buscas por partes das palavras. Isso ajuda a identificar jargões e termos pouco usados."},{title:"MedSimples",text:"Objetivo: ajudar profissionais a tornar textos de saúde mais acessíveis ao público geral.\nComo analisa: usa Processamento de Linguagem Natural e bases de termos médicos. Identifica jargões e palavras complexas em áreas como oncologia, Parkinson, pediatria e covid-19.\nResultado: destaca termos técnicos em verde e outras palavras difíceis em azul. Também apresenta sinônimos e pequenos glossários em balões."}]}
    ]
  },
  {title:"Legibilidade",subtitle:"O texto, as imagens e os espaços são claros para a pessoa entender a informação?",tabs:[
    {label:"Informacões iniciais",heading:"Informações iniciais",lead:"Antes de entender como ver se o material está legível, vamos entender tópicos que võ ser introduzitos depois.",concepts:["Partes do texto |Antes de olhar o material, vale conhecer as partes do texto. São elas que a pessoa lê, e quase todas as orientações a seguir falam de uma delas. Cada parte tem uma função diferente, e é a diferença entre elas que mostra à pessoa por onde começar e o que é mais importante.","Título|É a frase que abre o material ou uma parte dele. Ele diz do que trata o que vem logo em seguida. É a primeira coisa que a pessoa lê, então precisa deixar claro o assunto sem rodeio.","Subtítulo|É o título menor que abre cada trecho. Ele divide o material em partes e ajuda a pessoa a achar o que procura sem precisar ler tudo. Quem busca só um assunto vai direto ao cabeçalho certo.","Corpo do texto|O corpo do texto é o texto principal, escrito em parágrafos. É a maior parte do que a pessoa lê e onde a informação é explicada. Tudo o que os títulos e os subtítulos anunciam aparece aqui, com detalhe.","Sigla|Uma sigla é uma palavra formada pelas letras iniciais de um nome ou expressão. Exemplo: SUS significa Sistema Único de Saúde.","Palavras-chave|Palavras que são mais importantes dentro de uma frase.","Família tipográfica|A fonte é o estilo usado para desenhar as letras, os números e os sinais de um texto. Na ferramenta chamamos letra para família tipográfica ou fonte.\nExemplos:\nArial, Times New Roman, Roboto e Plus Jakarta Sans.","Peso da fonte|O peso indica se as letras são mais finas ou mais grossas.\nExemplos:\nLight: letras mais finas;\nRegular: espessura comum;\nMedium: letras um pouco mais grossas;\nBold: letras em negrito."]},
    {label:"Letras",heading:"Letras ",lead:"Olhe para as características da letra usada no material."},
    {label:"Texto e figuras",heading:"Texto e figuras",lead:"Observe o texto inteiro."},
    {label:"Cor e destaque",heading:"Contraste",lead:"Verifique se texto e fundo não se confundem.",secondary:"Uso das cores|Verifique se as cores estão sendo bem usadas."},
    {label:"Local",heading:"Local",lead:"Olhe como o seu material informativo está exposto."}
  ]}
];

finalDetailTabs[2].tabs[0].label="Informações iniciais";
Object.assign(finalDetailTabs[1].tabs[0],{
  lead:"Para verificar se um texto é simples, a ARVI reúne ferramentas que analisam diferentes aspectos da escrita.",
  leadItems:[
    "Para verificar se um texto é simples, a ARVI reúne ferramentas que analisam diferentes aspectos da escrita.",
    {text:"Elas foram organizadas em dois grupos:",children:["ferramentas que avaliam o texto como um todo, como o Vidya Text, o Simpligo, o Coh-Metrix-Port e o ALT-Legibilidade;","ferramentas que verificam o vocabulário, como o CorPop e o MedSimples;"]},
    "Juntas, essas ferramentas ajudam a avaliar coesão, coerência, complexidade das frases, escolha das palavras e outros aspectos da simplificação textual em português brasileiro."
  ],
  sections:[{question:"As ferramentas indicam que o texto está simples de ler?",label:"Informação adicional",info:["Use palavras do dia a dia, exatas e sem duplo sentido; prefira as concretas, que criam imagem na cabeça de quem lê.","Escreva uma ideia por frase, na ordem sujeito-verbo-objeto, e fale com a pessoa usando ‘você’.","Use voz ativa e deixe claro quem faz o quê; corte palavra repetida, termo vago e clichê.","Mantenha as frases curtas, mas varie o tamanho para o texto não ficar duro."],toolsDigital:["Cole o texto na ferramenta de leiturabilidade que você preferir e veja se o resultado indica leitura fácil.","Peça para alguém do público ler e contar o que entendeu."],toolsPhysical:["Transcreva o texto na ferramenta de leiturabilidade que você preferir e veja se o resultado indica leitura fácil.","Peça para alguém do público ler e contar o que entendeu."]}]
});
finalDetailTabs[1].tabs[4].label="ALT-Legibilidade";
finalDetailTabs[1].tabs[4].heading="ALT — Análise de Legibilidade Textual";
finalDetailTabs[1].tabs[5].cards[0].title="CorPop";
const unaidsSection=finalDetailTabs[0].tabs[1].sections[0];
const unaidsInlineLink='<a href="https://unaids.org.br/terminologia/" target="_blank" rel="noopener noreferrer">Guia de Terminologia do UNAIDS</a>';
unaidsSection.toolsDigital=unaidsSection.toolsDigital.map(text=>text.replace("Guia de Terminologia do UNAIDS",unaidsInlineLink));
unaidsSection.toolsPhysical=unaidsSection.toolsPhysical.map(text=>text.replace("Guia de Terminologia do UNAIDS",unaidsInlineLink));
Object.assign(finalDetailTabs[1].tabs[1],{actionUrl:"http://vidyatext.nuvem.ufrgs.br/"});
Object.assign(finalDetailTabs[1].tabs[2],{actionUrl:"http://fw.nilc.icmc.usp.br:23380/simpligo-ranking"});
Object.assign(finalDetailTabs[1].tabs[3],{actionUrl:"http://fw.nilc.icmc.usp.br:23380/cohmetrixport"});
Object.assign(finalDetailTabs[1].tabs[4],{actionUrl:"https://legibilidade.com/"});
finalDetailTabs[1].tabs[1].interfaceAsset="assets/final/interface-vidya.png";
finalDetailTabs[1].tabs[2].interfaceAsset="assets/final/interface-simpligo-figma.png";
finalDetailTabs[1].tabs[3].interfaceAsset="assets/final/interface-cohmetrix-figma.png";
finalDetailTabs[1].tabs[4].interfaceAsset="assets/final/interface-alt-figma.png";
Object.assign(finalDetailTabs[1].tabs[5].cards[0],{url:"https://www.ufrgs.br/textecc/porlexbras/corpop/ferramentas.php"});
Object.assign(finalDetailTabs[1].tabs[5].cards[1],{url:"https://www.ufrgs.br/textecc/acessibilidade/page/cartilha/"});
Object.assign(finalDetailTabs[2].tabs[0],{
  label:"Informações iniciais",
  lead:"Antes de entender como ver se o material está legível, vamos conhecer os tópicos que vão ser introduzidos depois.",
  conceptColumns:[
    {heading:"Partes do texto",intro:"Antes de olhar o material, vale conhecer as partes do texto. São elas que a pessoa lê, e quase todas as orientações a seguir falam de uma delas. Cada parte tem uma função diferente, e é a diferença entre elas que mostra à pessoa por onde começar e o que é mais importante.",groups:[
      {title:"Título",text:"É a frase que abre o material ou uma parte dele. Ele diz do que trata o que vem logo em seguida. É a primeira coisa que a pessoa lê, então precisa deixar claro o assunto sem rodeio."},
      {title:"Subtítulo",text:"É o título menor que abre cada trecho. Ele divide o material em partes e ajuda a pessoa a achar o que procura sem precisar ler tudo. Quem busca só um assunto vai direto ao cabeçalho certo."},
      {title:"Corpo do texto",text:"O corpo do texto é o texto principal, escrito em parágrafos. É a maior parte do que a pessoa lê e onde a informação é explicada. Tudo o que os títulos e os subtítulos anunciam aparece aqui, com detalhe."},
      {title:"Partes específicas de texto",mark:true},
      {title:"Sigla",text:"Uma sigla é uma palavra formada pelas letras iniciais de um nome ou expressão. Exemplo: SUS significa Sistema Único de Saúde."},
      {title:"Palavras-chave",text:"Palavras que são mais importantes dentro de uma frase."}
    ]},
    {heading:"Outros conceitos importantes",groups:[
      {title:"Família tipográfica",text:"A fonte é o estilo usado para desenhar as letras, os números e os sinais de um texto. Na ferramenta chamamos letra para família tipográfica ou fonte.\nExemplos:\nArial, Times New Roman, Roboto e Plus Jakarta Sans."},
      {title:"Peso da fonte",text:"O peso indica se as letras são mais finas ou mais grossas.\nExemplos:\nLight: letras mais finas;\nRegular: espessura comum;\nMedium: letras um pouco mais grossas;\nBold: letras em negrito."}
    ]}
  ]
});
finalDetailTabs[2].tabs[0].concepts[0]=finalDetailTabs[2].tabs[0].concepts[0].replace("Partes do texto |","Partes do texto|");
finalDetailTabs[2].tabs[1].inlineLinks=[{label:"Google Fonts",url:"https://fonts.google.com/"},{label:"Typetester",url:"https://classic.typetester.org/"}];
finalDetailTabs[2].tabs[2].inlineLinks=[{label:"Typetester",url:"https://classic.typetester.org/"}];
finalDetailTabs[2].tabs[3].inlineLinks=[{label:"WhoCanUse",url:"https://www.whocanuse.com/"},{label:"Adobe Color",url:"https://color.adobe.com/create/color-contrast-analyzer"}];

// Conteúdo dos estados 9.2–9.5 do componente de Legibilidade no Figma.
// Cada aba usa o mesmo modelo interativo das demais verificações da ARVI.
finalDetailTabs[2].tabs[1].sections=[
  {question:"O material usa letra sem serifa?",label:"Informação adicional",info:["Neste estudo, letra é igual a fonte.","Além da fonte sem serifa, pode usar uma letra com serifa nos títulos.","Use no máximo dois tipos de letras diferentes.","Evite letras oblíquas, decorativas e cursivas no corpo do texto.","ⓘ Peça ajuda a um designer se não conseguir saber qual é o tipo de letra."],toolsDigital:["No Google Fonts, filtre fontes com serifa e sem serifa.","No aplicativo de criação do material, clique no texto e verifique a fonte aplicada."],toolsPhysical:["Observe as pontas das letras: fontes com serifa têm pequenos traços; fontes sem serifa não têm.","Confira se letras oblíquas estão inclinadas e se as cursivas parecem escritas à mão ou têm letras ligadas."]},
  {question:"É possível diferenciar letras e números parecidos?",label:"Informação adicional",info:["Observe estes grupos: I/l/1, O/0, rn/m, b/d, p/q e g/a/o.","Prefira fontes em que cada sinal possa ser reconhecido isoladamente e dentro de palavras.","ⓘ Peça ajuda a um designer se não conseguir diferenciar as letras."],toolsDigital:["No Google Fonts, insira os grupos de letras e números como texto personalizado e compare as fontes.","No aplicativo de criação, escreva os grupos com a fonte escolhida e confira cada caractere."],toolsPhysical:["Observe as letras e os números sozinhos e dentro de palavras."]},
  {question:"As letras mais grossas (negrito) aparecem só nas informações importantes?",label:"Informação adicional",info:["Use negrito em títulos e palavras-chave.","Use negrito nos termos explicados no glossário.","Use negrito no que aponta para o objetivo do material.","Evite negrito no texto comum."],toolsDigital:["Selecione os títulos e os termos destacados no aplicativo de criação.","Confira se o negrito está só nas informações importantes ou nos termos que precisam ser explicados.","Compare o texto em negrito com o texto comum e veja se a diferença salta aos olhos."],toolsPhysical:["Observe os títulos e os termos destacados no material impresso.","Confira se o destaque continua visível no tamanho e na distância de leitura previstos."]},
  {question:"O tamanho da letra é suficiente para o material?",label:"Informação adicional",info:["Nos folders e folhetos, use letra de pelo menos 12 pt, o mesmo que 4,25 mm.","Nos cartazes, use letra de pelo menos 14,2 pt, o mesmo que 5 mm.","Para cartazes, aumente a letra conforme a distância: 1 m = 5 mm; 2 m = 10 mm; 5 m = 25 mm; 10 m = 50 mm; 15 m = 75 mm.","Deixe a letra dos títulos sempre maior que a letra dos parágrafos."],toolsDigital:["Selecione o texto principal e veja o tamanho da letra em pt.","Confira se o folder ou folheto chega a 12 pt e se o cartaz chega a 14,2 pt.","Abra o Typetester e compare a fonte no tamanho mínimo escolhido."],toolsPhysical:["Imprima o material no tamanho final e meça a altura de uma letra maiúscula.","Confira se folders e folhetos chegam a 4,25 mm e cartazes a 5 mm.","Compare a distância de leitura do cartaz com a lista de distâncias."]}
];
finalDetailTabs[2].tabs[2].sections=[
  {question:"O material não usa textos inteiros com letras maiúsculas?",label:"Informação adicional",info:["Use letras maiúsculas só em siglas, abreviações ou destaques curtos.","Em textos longos, prefira letras minúsculas para facilitar a leitura."],toolsDigital:["Procure trechos escritos só com letras maiúsculas.","Confira se elas aparecem apenas em siglas, abreviações ou destaques breves.","Troque as letras maiúsculas por minúsculas nos parágrafos e textos longos."],toolsPhysical:["Observe se há parágrafos ou textos longos escritos somente em letras maiúsculas.","Confira se as letras maiúsculas aparecem apenas em siglas, abreviações ou destaques breves."]},
  {question:"Os espaços separam bem letras, palavras, linhas e parágrafos?",label:"Informação adicional",info:["Olhe se o espaço entre as letras permite perceber cada uma.","Deixe pelo menos 1,5 vez o espaço entre uma linha e outra.","Deixe entre um parágrafo e outro um espaço com o dobro do tamanho da letra, no mínimo."],toolsDigital:["Selecione um parágrafo e confira o espaçamento entre letras, palavras e linhas.","Use o Typetester para comparar os espaços.","Veja se dá para perceber onde um parágrafo termina e o outro começa."],toolsPhysical:["Observe se palavras e linhas continuam separadas e fáceis de diferenciar.","Veja se dá para perceber onde um parágrafo termina e o outro começa."]},
  {question:"O texto está na horizontal e alinhado à esquerda?",label:"Informação adicional",info:["Alinhe o texto à esquerda.","Evite alinhar o texto dos dois lados, formando blocos justificados.","Evite escrever na vertical ou girar o texto."],toolsDigital:["Abra o aplicativo de criação e selecione cada bloco de texto.","Confira se o alinhamento está à esquerda e se o texto está na horizontal."],toolsPhysical:["Procure espaços em branco no meio das colunas.","Veja se há palavras cortadas com hífen ou textos girados."]},
  {question:"Sobra espaço livre entre o texto, as bordas e as imagens?",label:"Informação adicional",info:["No tamanho A4, deixe o texto a pelo menos 10 mm das bordas da página.","Deixe pelo menos 6 mm entre o texto e as imagens e entre uma coluna e outra.","Mantenha áreas vazias e use-as para separar o conteúdo principal das informações secundárias."],toolsDigital:["Confira a distância entre o texto e as margens.","Confira a distância entre texto, imagens e colunas."],toolsPhysical:["Meça as margens e os espaços no material impresso.","Veja se há espaço suficiente para separar os blocos de conteúdo."]}
];
finalDetailTabs[2].tabs[3].sections=[
  {question:"O texto se destaca do fundo?",label:"Informação adicional",info:["O contraste compara a cor do texto com a cor do fundo.","Busque contraste de 7:1; quando não for possível, use pelo menos 4,5:1 nos textos comuns.","Combine uma cor bem clara com uma cor bem escura.","Evite cores com brilho parecido, mesmo quando os tons são diferentes."],toolsDigital:["Use o conta-gotas para pegar as cores do texto e do fundo.","Coloque as cores no WhoCanUse ou Adobe Color e confira a razão de contraste.","Se necessário, clareie as cores claras e escureça as cores escuras."],toolsPhysical:["Fotografe o material e teste as cores no aplicativo de criação.","Veja se o texto continua fácil de ler no tamanho e na luz em que será usado."]},
  {question:"As cores ajudam a organizar as informações do material?",label:"Informação adicional",info:["Use a mesma cor nas informações parecidas.","Use cores diferentes nas informações diferentes.","Destaque com cor o conteúdo mais importante para guiar a ordem de leitura.","Mantenha o mesmo código de cor do começo ao fim."],toolsDigital:["Confira se informações parecidas usam a mesma cor.","Veja se o conteúdo mais importante chama a atenção primeiro.","Mostre o material ao público e pergunte o que leem primeiro."],toolsPhysical:["Confira o código de cores no material impresso.","Mostre o material impresso ao público e pergunte o que leem primeiro."]},
  {question:"A informação continua clara mesmo sem a cor?",label:"Informação adicional",info:["Não passe nenhuma informação só pela cor.","Acrescente texto, ícone, símbolo, textura, padrão, forma ou contorno junto com a cor.","Confira se cada cor com significado tem um segundo recurso que repete a mesma informação."],toolsDigital:["Confira se cada cor com significado vem acompanhada de outro recurso.","Use o WhoCanUse para simular diferentes deficiências visuais.","Mostre o material ao público e pergunte o que cada cor indica."],toolsPhysical:["Veja se alguma informação depende só da cor.","Confira se cada cor com significado tem outro recurso.","Pergunte ao público o que cada cor indica."]}
];
finalDetailTabs[2].tabs[4].sections=[
  {question:"O cartaz está bem posicionado para quem vai ler?",label:"Informação adicional",info:["Coloque o texto na linha de visão: entre 1,50 m e 1,70 m do chão para quem lê em pé.","Use de 1,20 m a 1,40 m para quem lê sentado e de 1,12 m a 1,24 m para quem usa cadeira de rodas.","Coloque o cartaz perto do objeto ou do lugar de que ele fala.","Pergunte a pessoas do público a que objeto ou lugar aquela informação se refere."],toolsDigital:["Não é possível conferir no material digital."],toolsPhysical:["Meça com uma trena a altura do texto a partir do chão.","Confira se a altura está na faixa do público que vai ler.","Fique no lugar do público e veja se dá para ligar o cartaz ao objeto ou lugar de que ele fala."]},
  {question:"A luz do lugar deixa o cartaz fácil de ler?",label:"Informação adicional",info:["Garanta luz suficiente nas áreas com textos expostos e nos lugares de passagem.","Use mais luz quanto mais escuro for o tom da superfície.","Evite superfícies brilhantes onde a luz bate direto.","Olhe o cartaz de vários ângulos e veja se aparecem sombras ou reflexos."],toolsDigital:["Não é possível conferir no material digital."],toolsPhysical:["Leia o cartaz no lugar de exposição, com a luz que existe ali.","Ande em volta e procure sombras e reflexos.","Volte em outro horário do dia e veja se o texto continua fácil de ler."]}
];

// Exemplos visuais e textuais correspondentes aos cartões do Figma.
Object.assign(finalDetailTabs[2].tabs[1].sections[0],{fontExample:true});
Object.assign(finalDetailTabs[2].tabs[1].sections[1],{exampleImages:["assets/final/legibility-similar-ilhabela-large.png","assets/final/legibility-similar-words.png"],exampleAlt:"Comparação de letras e números parecidos em diferentes fontes"});
Object.assign(finalDetailTabs[2].tabs[1].sections[2],{emphasisExample:true});
Object.assign(finalDetailTabs[2].tabs[2].sections[0],{capsExample:true});
Object.assign(finalDetailTabs[2].tabs[2].sections[1],{spacingTextExample:true});
Object.assign(finalDetailTabs[2].tabs[2].sections[2],{alignmentTextExample:true});
Object.assign(finalDetailTabs[2].tabs[2].sections[3],{exampleImage:"assets/final/legibility-margins-figma.svg",exampleAlt:"Diagrama com margens de 10 milímetros e espaços de 6 milímetros entre texto, imagem e colunas"});
Object.assign(finalDetailTabs[2].tabs[3].sections[0],{exampleImage:"assets/final/legibility-contrast-figma.svg",exampleAlt:"Comparação visual entre contraste bom, com razão 12,6 para 1, e contraste ruim, com razão 1,24 para 1"});
Object.assign(finalDetailTabs[2].tabs[4].sections[0],{exampleImage:"assets/final/legibility-reading-height-figma.svg",exampleAlt:"Alturas recomendadas para leitura de cartazes por pessoas em pé ou em cadeira de rodas"});
Object.assign(finalDetailTabs[2].tabs[4].sections[1],{exampleImage:"assets/final/legibility-lighting-figma.svg",exampleAlt:"Comparação do mesmo cartaz com iluminação boa e iluminação ruim"});

Object.assign(finalDetailTabs[1].tabs[1],{paragraphs:[
  "Sobre a ferramenta",
  "Objetivo: apoiar a aprendizagem com textos, mapas conceituais e relações entre ideias.\nComo analisa: aplica 11 indicadores a textos com mais de 20 palavras. Inclui os índices Dale-Chall e Flesch.",
  "Grandi (2024) e Grandi et al. (2024).",
  "Interface",
  "༻ Vidya Text",
  "Este é o site oficial da Vidya Text, ferramenta educacional para apoiar o ensino da produção de textos e o estudo dos vocabulários do português do Brasil.",
  "Para saber mais, acesse:\nTutorial pedagógico para professores\nTutorial sobre como usar a Vidya Text",
  "Resultado da análise",
  "Apresenta dados sobre o tamanho e a composição do texto. Também identifica o tom positivo, negativo ou neutro e lista palavras ausentes nos dicionários usados.",
  "Cores e destaques no texto",
  "No campo Texto Analisado, as cores indicam como a ferramenta classificou cada palavra:\nAzul-claro: palavra comum.\nVermelho-escuro: palavra suspeita, não encontrada no dicionário da Vidya Text.\nAzul-escuro: nome próprio ou número.",
  "Índices de leitura",
  "Leiturabilidade de Flesch:\nEstima a facilidade de leitura pela estrutura do texto. Na ferramenta, quanto maior o resultado, mais fácil é a leitura.\nLeiturabilidade de Dale-Chall:\nConsidera a estrutura do texto e a quantidade de palavras difíceis. Na ferramenta, quanto maior o resultado, mais fácil é a leitura. O cálculo exige pelo menos 20 palavras.\nPolaridade de sentimento:\nIndica se o texto apresenta um tom positivo, negativo ou neutro.",
  "Índices de leitura",
  "Frases: quantidade total de frases.\nPalavras por frase: média de palavras em cada frase.\nPalavras do texto: quantidade total de palavras.\nSílabas por palavra: média de sílabas das palavras.\nPalavras suspeitas: palavras que não estão no dicionário da ferramenta.\nPalavras diferentes: quantidade de palavras distintas.\nPalavras repetidas: termos usados mais de uma vez.\nPalavras pouco frequentes: palavras pouco usadas no português brasileiro.",
  "O que merece mais atenção",
  "frases com muitas palavras;\npalavras longas ou pouco frequentes;\ntermos técnicos sem explicação;\npalavras suspeitas;\nrepetições desnecessárias;\nresultados baixos nos índices de leitura."
]});
Object.assign(finalDetailTabs[1].tabs[4],{paragraphs:[
  "Sobre a ferramenta",
  "Objetivo: reduzir dificuldades na comunicação escrita com fórmulas adaptadas ao português.\nComo analisa: conta caracteres, letras, sílabas, palavras e frases. Depois, aplica seis fórmulas de legibilidade e leiturabilidade, como os índices Flesch e Gunning Fog.",
  "Moreno et al. (2023).",
  "Interface",
  "Como citar este software: Marco P. M. de Souza, Gleice C. de L. Moreno, Nelson Hein, Adriana Kroenke, ALT - Análise de Legibilidade Textual. Acesso em 30/07/2026 [Online]. Disponível em: https://legibilidade.com/.",
  "Resultado da análise",
  "Apresenta notas de 0 a 100 e estima a escolaridade necessária para a leitura. Destaca frases longas em amarelo ou vermelho e palavras difíceis em azul. Também gera nuvens de palavras.",
  "Cores e destaques no texto",
  "A ferramenta usa cores para indicar possíveis dificuldades:\nPalavras em azul: não estão entre as 5 mil palavras mais usadas no português brasileiro. Podem ser termos técnicos, jargões ou palavras pouco conhecidas.\nFrases sublinhadas em amarelo: podem estar longas. Considere dividi-las em duas.\nFrases sublinhadas em vermelho: estão muito longas. Divida-as em duas ou mais frases.\nUma palavra azul não está necessariamente errada. Mantenha termos necessários, mas explique aqueles que o público pode não conhecer. Nomes próprios e siglas não são classificados como palavras complexas.",
  "Índices de 0 a 100",
  "Nestes índices, quanto maior o resultado, mais fácil é a leitura:\nFacilidade de leitura de Flesch: considera o tamanho das frases e a quantidade de sílabas das palavras.\nÍndice Gulpease: considera a quantidade de letras, palavras e frases.\nResultados próximos de 100 indicam textos mais simples. Resultados próximos de zero indicam maior dificuldade de leitura.",
  "Índices de escolaridade",
  "Nestes índices, quanto menor o resultado, mais fácil é a leitura:\nFlesch-Kincaid: considera o tamanho das frases e das palavras.\nGunning: considera o tamanho das frases e a presença de palavras pouco frequentes.\nÍndice de Leiturabilidade Automatizado (ARI): considera a quantidade de letras por palavra e de palavras por frase.\nColeman-Liau: considera o tamanho das palavras e a quantidade de frases.\nO resultado estima quantos anos de estudo uma pessoa precisaria ter para compreender bem o texto. Por exemplo, um resultado 6 indica um texto mais simples que um resultado 17.",
  "O que merece mais atenção",
  "Resultado final\nA fórmula final apresenta a média de quatro índices:\nFlesch-Kincaid;\nGunning;\nARI;\nColeman-Liau.\nQuanto menor o resultado final, menor é a escolaridade estimada para compreender o texto. Use esse valor para comparar versões do mesmo conteúdo e verificar se a reescrita reduziu a dificuldade.\n\nConfira principalmente:\nfrases amarelas ou vermelhas;\npalavras azuis que o público talvez não conheça;\nexcesso de palavras em cada frase;\ndiferença entre os vários índices;\nresultado final incompatível com o público;\nerros de escrita que podem alterar a contagem.",
  "Limites da ferramenta",
  "Os índices não avaliam se:\nas ideias estão bem conectadas;\no conteúdo segue uma ordem lógica;\na informação está correta;\no texto responde às necessidades do público;\na pessoa consegue usar a informação.\nUse a ALT como apoio. Não substitua automaticamente todo termo destacado. Em conteúdos técnicos, pode ser melhor explicar uma palavra necessária e reduzir o tamanho das frases."
]});
for(const toolTab of finalDetailTabs[1].tabs.slice(1,5)){
  if(!toolTab.paragraphs.includes("Interface"))toolTab.paragraphs.splice(3,0,"Interface");
}

// Conteúdo e nomenclatura consolidados na versão final do Figma.
[
  ["Quem vai ler","Para quem é o material? O que o material precisa levar em conta?"],
  ["Mensagem principal","O que o material quer dizer? O que a pessoa precisa entender primeiro?"],
  ["Informação obrigatória","Quais informações não podem faltar? Com o material, a pessoa pode agir com segurança?"],
  ["Tipo de material","Qual material você está avaliando?"],
  ["Informações do material","Como é o material?"],
  ["Local","Onde a pessoa vai ler o material?"],
  ["Simplicidade na saúde","O texto e as imagens são de fontes confiáveis e respeitosos com quem busca informações de saúde?"],
  ["Leiturabilidade","O texto é simples para o público, de acordo com as ferramentas de análise?"],
  ["Legibilidade","O texto, as imagens e os espaços são claros para a pessoa entender a informação?"]
].forEach(([title,question],index)=>Object.assign(toolCards[index],{title,question}));

delete detailTabs[0].chips;
delete detailTabs[2].chips;
Object.keys(prepDetailTabs).forEach(key=>delete prepDetailTabs[key]);
finalDetailTabs[1].tabs.forEach(tab=>{
  if(tab.label==="Vydia Text")tab.label="Vidya Text";
  if(tab.heading==="Vydia Text")tab.heading="Vidya Text";
});
function normalizeTerms(value){
  if(Array.isArray(value))return value.map(normalizeTerms);
  if(value&&typeof value==="object"){Object.keys(value).forEach(key=>value[key]=normalizeTerms(value[key]));return value}
  return typeof value==="string"?value.replaceAll("VydiaText","Vidya Text").replaceAll("Vydia Text","Vidya Text").replaceAll("Corpop","CorPop"):value;
}
normalizeTerms(finalDetailTabs);

// Textos finais, reproduzidos do arquivo conteudo-integral-arvi.md.
detailTabs[0].title="Quem vai ler";
detailTabs[2].title="Informação obrigatória";
detailTabs[0].intro=[
  "A comunicação só funciona quando a mensagem cabe no jeito de pensar e nos valores de quem lê.",
  "É aí que a Linguagem Simples se torna ainda mais importante: ela parte de quem é o público para organizar as ideias, escolher as palavras mais familiares e definir o design."
];
detailTabs[1].intro=["Todo material de saúde tem um objetivo.","O objetivo é a ação que você espera da pessoa.","A mensagem principal é a informação ou informações que a levam até essa ação."];
Object.assign(detailTabs[1].sections[0],{
  info:["O objetivo é o que você espera que a pessoa faça depois de ler.","Escolha um único objetivo: descrever um procedimento (como um exame), apoiar quem convive com uma condição, ensinar um passo a passo (como usar um autoteste) ou ajudar numa decisão (como escolher entre PrEP diária ou sob demanda).","Um objetivo claro ajuda a pessoa a entender como agir para evitar ou resolver um problema.","Evite mais de um objetivo na mesma peça. Eles disputam a atenção e enfraquecem uns aos outros.","Comece o título da seção com uma pergunta e responda-a no corpo do texto."],
  exampleNotes:["Objetivo: oferecer informações gerais sobre a PEP.","Ação esperada: que a pessoa conheça a PEP como uma forma de prevenção de urgência.","Título em destaque: 'Informações sobre a Profilaxia Pós-Exposição (PEP)'. Ele mostra que o material é um cartaz informativo para o público em geral.","Conceitos em destaque: o que ajuda a cumprir o objetivo ganha realce: o que é a PEP, o que é contato de risco, o que fazer e por quanto tempo tomar."]
});
detailTabs[2].sections[0].info=["Um material de saúde precisa reunir tudo o que a pessoa precisa saber para agir com segurança.","Verifique se aparecem: para que serve, prazos, exames, acompanhamento e onde procurar o serviço.","Material de prevenção precisa dizer onde a pessoa consegue o serviço.","Escolha uma ou mais formas de acesso: nome do serviço, endereço, telefone, link, QR Code ou o caminho para chegar até lá.","Sem essa informação, a pessoa entende o assunto, mas não sabe para onde ir.","Se faltar um desses pontos, a pessoa pode ficar sem uma informação importante na hora de decidir."];
materialDetailTabs[0].intro=["Nesta ferramenta falamos de três tipos de peça: o folheto, o folder e o cartaz. Eles parecem parecidos, mas são lidos de jeitos diferentes.","Um fica na mão da pessoa; o outro fica na parede. Essa diferença muda quase tudo: o tamanho da letra, a quantidade de texto, o espaço entre as partes e até o papel.","Por isso vale saber qual deles você está fazendo antes de começar."];
materialDetailTabs[1].sections[0].toolsDigital=["Abra a configuração de página no aplicativo de criação e veja qual formato está definido para o arquivo.","Confira se esse formato é um dos padrões: A4, A3, A2 ou A1.","No folder, marque as dobras no arquivo e veja se cada bloco de texto fica dentro de um painel."];
materialDetailTabs[1].sections[0].toolsPhysical=["Imprima no tamanho adequado.","Coloque a peça no local onde ela vai ficar e veja se cabe.","No folder, dobre a peça e confira se o texto acompanha as dobras."];
finalDetailTabs[0].tabs[0].lead="Avalie se existem explicações suficientes para entender o material.";
finalDetailTabs[0].tabs[1].lead="Não basta apenas explicar, é necessário acolher e respeitar.";
finalDetailTabs[2].tabs[0].lead="Antes de entender como ver se o material está legível, vamos conhecer os tópicos que vão ser introduzidos depois.";
Object.assign(finalDetailTabs[2].tabs[1].sections[0],{
  toolsDigital:["No Google Fonts, filtre fontes com serifa e sem serifa.","No aplicativo de criação do material, clique no texto (se for editável) e verifique a fonte aplicada."],
  toolsPhysical:["Observe as pontas das letras no material impresso: Fontes com serifa têm pequenos traços nas pontas das letras. Fontes sem serifa não têm esses pequenos traços. Fontes oblíquas têm letras inclinadas. Fontes cursivas parecem escritas à mão e podem ter letras ligadas."]
});
Object.assign(finalDetailTabs[2].tabs[1].sections[1],{
  info:["Observe estes grupos: ‘I/l/1’, ‘O/0’, ‘rn/m’, ‘b/d’, ‘p/q’ e ‘g/a/o’.","Exemplos de fontes: I/l/1 (Tiresias, Verdana, Tahoma, Atkinson Hyperlegible, Inclusive Sans e Andika); O/0 (Atkinson Hyperlegible, Andika [zero cortado], Inclusive Sans, Verdana, Tahoma e Tiresias); rn/m (Verdana, Tahoma, Atkinson Hyperlegible, Andika, Inclusive Sans e Tiresias); b/d (Andika e Inclusive Sans); p/q (Andika, Inclusive Sans e Atkinson Hyperlegible); g/a/o (Atkinson Hyperlegible, Andika, Inclusive Sans, Verdana, Tahoma e Tiresias).","ⓘ Peça ajuda a um designer se não conseguir diferenciar as letras."],
  toolsDigital:["No Google Fonts, insira os grupos de letras e números como texto personalizado. Confira se cada um pode ser reconhecido.","No aplicativo de criação, escreva os grupos com a fonte escolhida. Observe se eles podem ser diferenciados."],
  toolsPhysical:["Observe as letras e números sozinhos e dentro de palavras."]
});
Object.assign(finalDetailTabs[2].tabs[1].sections[2],{
  info:["Use negrito em títulos e palavras-chave.","Use negrito nos termos que você explica no glossário.","Use negrito no que aponta para o objetivo do material.","Evite negrito no texto comum."],
  toolsDigital:["No aplicativo de criação, selecione os títulos e os termos destacados.","Confira se o negrito está só nas informações importantes ou nos termos que precisam ser explicados.","Compare o texto em negrito com o texto comum e veja se a diferença salta aos olhos."],
  toolsPhysical:["Observe os títulos e os termos destacados no material impresso.","Confira se as letras mais grossas ajudam a localizar as informações importantes.","Confira se o destaque continua visível no tamanho e na distância de leitura previstos."]
});
Object.assign(finalDetailTabs[2].tabs[1].sections[3],{
  info:["Nos folders e folhetos, use letra de pelo menos 12 pt, o mesmo que 4,25 mm.","Nos cartazes, use letra de pelo menos 14,2 pt, o mesmo que 5 mm.","Aumente a letra do cartaz conforme a distância de leitura: 1 metro (5 mm); 2 metros (10 mm); 5 metros (25 mm); 10 metros (50 mm); 15 metros (75 mm).","Deixe a letra dos títulos sempre maior que a letra dos parágrafos.","ⓘ Peça ajuda a um designer se não conseguir ajustar os tamanhos."],
  toolsDigital:["No aplicativo de criação: selecione o texto principal e veja o tamanho da letra em pt.","Confira se o folder ou o folheto chega a 12 pt e se o cartaz chega a 14,2 pt.","Abra o Typetester e compare a fonte no tamanho mínimo que você escolheu."],
  toolsPhysical:["Imprima o material no tamanho final e meça com uma régua a altura de uma letra maiúscula, em mm.","Confira se o folder ou o folheto chega a 4,25 mm e se o cartaz chega a 5 mm.","Meça a distância entre o cartaz e o lugar onde as pessoas vão ficar e compare com a lista de distâncias."]
});
Object.assign(finalDetailTabs[2].tabs[2].sections[0],{
  info:["Use letras maiúsculas só em siglas, abreviações ou destaques curtos."],
  toolsDigital:["No aplicativo de criação: procure trechos escritos só com letras maiúsculas.","Confira se as letras maiúsculas aparecem apenas em siglas, abreviações ou destaques breves.","Troque as letras maiúsculas por minúsculas nos parágrafos e nos textos longos."],
  toolsPhysical:["Observe se há parágrafos ou textos longos escritos somente com letras maiúsculas.","Confira se as letras maiúsculas aparecem apenas em siglas, abreviações ou destaques breves."]
});
Object.assign(finalDetailTabs[2].tabs[2].sections[1],{
  info:["Olhe com atenção o espaço entre as letras: elas precisam estar juntas o suficiente para entender que formam uma palavra.","Deixe pelo menos 1,5 de espaço entre uma linha e outra.","Deixe entre um parágrafo e outro um espaço com o dobro do tamanho da letra, no mínimo.","ⓘ Peça ajuda a um designer se não conseguir ajustar esses espaços."],
  toolsDigital:["No aplicativo de criação: selecione o texto principal e veja se o espaço entre as linhas é de pelo menos 1,5.","Selecione um parágrafo e veja se o espaço antes ou depois dele tem o dobro do tamanho da letra.","Abra o Typetester e compare o espaço entre letras, palavras e linhas."],
  toolsPhysical:["Olhe o material impresso e veja se as letras de uma mesma palavra se encostam ou ficam longe demais.","Veja se as palavras e as linhas continuam separadas e fáceis de diferenciar.","Veja se dá para perceber onde um parágrafo termina e o outro começa."]
});
Object.assign(finalDetailTabs[2].tabs[2].sections[2],{
  info:["Alinhe o texto à esquerda.","Evite esticar o texto até as duas margens (texto justificado), sobretudo em colunas estreitas.","Escreva o texto na horizontal, sem girá-lo."],
  toolsDigital:["Abra o aplicativo de criação, selecione cada bloco de texto e veja se o alinhamento está à esquerda.","Troque para alinhado à esquerda todo bloco que estiver justificado.","Veja se algum bloco de texto está girado e, se estiver, tente passá-lo para a horizontal."],
  toolsPhysical:["Procure espaços em branco no meio das colunas.","Veja se há palavras cortadas com hífen em várias linhas seguidas.","Confira se você lê o material sem virar a cabeça nem girar o papel."]
});
Object.assign(finalDetailTabs[2].tabs[2].sections[3],{
  info:["No tamanho A4, deixe o texto a pelo menos 10 mm das bordas da página.","Deixe pelo menos 6 mm entre o texto e as imagens e entre uma coluna e outra.","Você não precisa preencher toda a área: mantenha partes vazias mesmo quando sobrepõe textos, fotos e ilustrações.","Use as margens e as áreas vazias para separar o conteúdo principal das informações secundárias."],
  toolsDigital:["Abra o aplicativo de criação e ligue as réguas e as guias para ver as margens e as colunas.","Confira se o texto começa a pelo menos 10 mm das bordas da página.","Confira se sobram pelo menos 6 mm entre o texto e as imagens e entre uma coluna e outra."],
  toolsPhysical:["Meça com uma régua, em mm, a distância entre o texto e a borda do papel.","Meça a distância entre o texto e as imagens e entre uma coluna e outra.","Olhe a página inteira e veja se as informações secundárias estão separadas do conteúdo principal."]
});
Object.assign(finalDetailTabs[2].tabs[3].sections[0],{
  info:["O contraste compara a cor do texto com a cor do fundo.","Quando testar em uma ferramenta digital, busque o contraste de 7:1; quando não for possível, use pelo menos 4,5:1 nos textos comuns.","Combine uma cor bem clara com uma cor bem escura (a).","Combine cores contrárias no círculo cromático, elas têm maior contraste (b).","Evite cores com brilho parecido, mesmo quando os tons são diferentes (c).","Use cores com mais contraste nos títulos e com menos nos parágrafos."],
  toolsDigital:["Abra o aplicativo de criação e use o conta-gotas para pegar a cor do texto e a cor do fundo.","Coloque essas duas cores no WhoCanUse ou Adobe Color e veja a razão de contraste: busque 7:1 e, quando não der, confira se chega a 4,5:1.","Se não chegar, deixe as cores claras mais claras e as cores escuras mais escuras."],
  toolsPhysical:["Olhe o material no tamanho e na luz em que ele vai ser usado e veja se o texto se destaca do fundo.","Tire uma foto do material, abra a foto no aplicativo de criação e use o conta-gotas para pegar a cor do texto e a cor do fundo.","Coloque essas duas cores no WhoCanUse ou Adobe Color e veja a razão de contraste: busque 7:1 e, quando não der, confira se chega a 4,5:1."]
});
Object.assign(finalDetailTabs[2].tabs[3].sections[1],{
  info:["Use a mesma cor nas informações parecidas.","Use cores diferentes nas informações diferentes.","Destaque com cor o conteúdo mais importante, para guiar a ordem de leitura.","Mantenha o mesmo código de cor do começo ao fim do material."],
  toolsDigital:["Abra o aplicativo de criação e confira se as informações parecidas usam a mesma cor.","Veja se o conteúdo mais importante chama a atenção primeiro.","Mostre o material para pessoas do público e pergunte o que elas leem primeiro."],
  toolsPhysical:["Olhe o material impresso e confira se as informações parecidas usam a mesma cor.","Veja se o conteúdo mais importante chama a atenção primeiro.","Mostre o material impresso para pessoas do público e pergunte o que elas leem primeiro."]
});
Object.assign(finalDetailTabs[2].tabs[3].sections[2],{
  info:["Não passe nenhuma informação só pela cor.","Acrescente texto, ícone, símbolo, textura, padrão, forma ou contorno junto com a cor.","Confira se cada cor com significado tem um segundo recurso que repete a mesma informação.","Mostre o material para pessoas do público e veja se elas entendem esses recursos."],
  toolsDigital:["Abra o aplicativo de criação e veja se cada cor com significado vem acompanhada de texto, ícone, símbolo, textura, forma ou contorno.","Abra o WhoCanUse e simule como as pessoas com diferentes deficiências visuais enxergam essas combinações de cores.","Mostre o material para pessoas do público e pergunte o que cada cor indica."],
  toolsPhysical:["Olhe o material impresso e veja se alguma informação depende só da cor.","Confira se cada cor com significado vem acompanhada de texto, ícone, símbolo, textura, forma ou contorno.","Mostre o material impresso para pessoas do público e pergunte o que cada cor indica."]
});
Object.assign(finalDetailTabs[2].tabs[4].sections[0],{
  info:["Coloque o texto na linha de visão: entre 1,50 m e 1,70 m do chão para quem lê em pé.","Use de 1,20 m a 1,40 m para quem lê sentado e de 1,12 m a 1,24 m para quem usa cadeira de rodas ou está sentado.","Coloque o cartaz perto do objeto ou do lugar de que ele fala.","Pergunte a pessoas do público a que objeto ou lugar aquela informação se refere."],
  toolsDigital:["Não é possível conferir."],
  toolsPhysical:["Meça com uma trena a altura do texto a partir do chão, no lugar onde o cartaz vai ficar.","Confira se essa altura está na faixa do público que vai ler.","Fique no lugar do público e veja se dá para ligar o cartaz ao objeto ou ao lugar de que ele fala."]
});
Object.assign(finalDetailTabs[2].tabs[4].sections[1],{
  info:["Garanta luz suficiente nas áreas com textos expostos e nos lugares de passagem.","Use mais luz quanto mais escuro for o tom da superfície.","Evite superfícies brilhantes onde a luz bate direto.","Olhe o cartaz de vários ângulos e veja se aparecem sombras ou reflexos que atrapalham a leitura."],
  toolsDigital:["Não é possível conferir."],
  toolsPhysical:["Leia o cartaz no lugar de exposição, com a luz que existe ali.","Ande em volta dele e olhe de vários ângulos, procurando sombras e reflexos.","Volte em outro horário do dia e veja se o texto continua fácil de ler."]
});

function materialEducationalMarkup(){
  const modules=Array.from({length:17},()=>`<i></i>`).join("");
  return `<div class="material-examples"><article><h3>Folheto</h3><p>Folheto é o nome geral. É uma folha de papel, solta ou dobrada, que a pessoa pega e segura na mão.</p><p>Como fica perto dos olhos, o folheto aguenta mais texto que um cartaz. A pessoa pode ler com calma, voltar em um trecho, guardar no bolso e ler de novo depois. Ele serve bem quando você precisa explicar alguma coisa por partes, com detalhe: o que é, para que serve, como fazer, onde procurar ajuda.</p><img class="type-material-vector folheto" src="assets/type-folheto.svg" alt="Formato de folheto A5"></article><article><h3>Folder</h3><p>Folder é o folheto com dobra. É o mesmo tipo de peça, com o mesmo tanto de texto, só que a folha é dobrada.</p><p>Cada dobra divide a folha em pedaços. Cada pedaço é um painel. A pessoa não vê a folha inteira de uma vez: ela vê um painel, abre, vê outro, abre de novo. O texto precisa acompanhar essa ordem. Se um assunto começa em um painel, ele deve terminar ali ou continuar no painel seguinte, sem se perder no meio.</p><p>O folder tem frente e verso, e os dois lados contam a mesma história. Quem faz o folder precisa pensar nele aberto e fechado</p><img class="type-material-vector folder" src="assets/type-folder.svg" alt="Formato de folder aberto"></article><article><h3>Cartaz</h3><p>Cartaz é a peça feita para ficar exposta. Ele é colado ou pendurado em uma parede, em um mural, em uma porta ou em outro lugar onde muita gente passe.</p><p>Ninguém para na frente de um cartaz para estudar. As pessoas olham de longe e de passagem, às vezes por poucos segundos. Por isso o cartaz traz pouco texto e junta imagem e palavra em torno de uma mensagem central, uma só ideia que precisa ficar clara de primeira.</p><img class="type-material-vector cartaz" src="assets/type-cartaz.svg" alt="Formato de cartaz"></article></div><div class="material-structure"><h2>Estrutura do material</h2>${listMarkup(["Não importa se você está fazendo um folheto, um folder ou um cartaz: toda peça é feita das mesmas três coisas: texto, imagem e espaço vazio.","Cada pedaço tem um nome, e esses nomes voltam o tempo todo nas orientações a seguir. Vale conhecer cada um antes de continuar."])}<div class="structure-box"><div class="structure-copy"><h3 class="swatch-column">Coluna</h3><p>Faixas verticais que recebem texto ou imagem. A largura e a quantidade mudam conforme o conteúdo.</p><h3 class="swatch-module">Módulos</h3><p>As divisões básicas do grid, separadas por espaços iguais. Ao juntar módulos, você monta colunas e faixas horizontais de vários tamanhos.</p></div><img class="structure-demo-vector" src="assets/type-structure.svg" alt="Diagrama de colunas, módulos e margens"><div class="structure-copy"><h3 class="swatch-margin">Margens</h3><p>As bordas de proteção da página. É o espaço entre o limite do formato e o conteúdo, incluindo as calhas. Também abrigam informação secundária: notas, títulos e legendas.</p></div></div></div>`;
}

function materialTypeQuestionMarkup(){
  const prefix="detail-3-general-0";
  return `<article class="detail-check material-type-check"><div class="detail-column guidance"><h3>6. Qual material você está avaliando?</h3><p class="detail-label">Informação adicional</p><ul><li>Leia as definições abaixo.</li></ul></div><div class="detail-column instruments" aria-hidden="true"></div><div class="detail-column response"><h3>Resposta</h3><fieldset><legend class="visually-hidden">Qual material você está avaliando?</legend>${["Folheto","Folder","Cartaz"].map(value=>`<label><input type="radio" name="${prefix}-response" value="${value}"><span>${value}</span></label>`).join("")}</fieldset><h3>Anotações</h3><div class="textarea-wrap detail-textarea"><textarea id="${prefix}-notes" name="${prefix}-notes" placeholder="Anotações" aria-label="Anotações sobre o tipo de material"></textarea></div></div></article>`;
}

function materialSectionMarkup(section,sectionIndex){
  const prefix=`detail-${detailTab}-general-${sectionIndex}`;
  const images=section.images?.length?`<div class="material-example-section"><p class="detail-label">Exemplo</p><div class="material-example-frame">${section.images.map(src=>`<img class="detail-example" src="${src}" alt="Exemplo visual do material analisado">`).join("")}</div></div>`:"";
  const toolGroup=(label,icon,items)=>`<div class="material-tool-group"><span class="detail-badge"><img src="assets/${icon}" alt="" aria-hidden="true"><span>${label}</span></span>${listMarkup(items)}</div>`;
  return `<article class="detail-check"><div class="detail-column guidance"><h3>${section.question}</h3><p class="detail-label">${section.label}</p>${listMarkup(section.info)}${images}</div><div class="detail-column instruments"><h3>Como posso conferir se está certo?</h3>${toolGroup("No material digital","detail-digital.svg",section.toolsDigital)}${toolGroup("No material físico","detail-physical.svg",section.toolsPhysical)}</div><div class="detail-column response"><h3>Resposta</h3><fieldset><legend class="visually-hidden">Resposta para: ${section.question}</legend>${["Sim","Não","Não se aplica ou não sei"].map(value=>`<label><input type="radio" name="${prefix}-response" value="${value}"><span>${value}</span></label>`).join("")}</fieldset><h3>Anotações</h3><div class="textarea-wrap detail-textarea"><label class="visually-hidden" for="${prefix}-notes">Anotações: ${section.question}</label><textarea id="${prefix}-notes" name="${prefix}-notes" placeholder="Anotações" spellcheck="true" wrap="soft" autocomplete="off"></textarea><div class="textarea-scroll" role="scrollbar" aria-label="Rolar anotações" aria-controls="${prefix}-notes" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0" hidden><span></span></div><button class="textarea-clear" type="button" aria-label="Excluir anotações" hidden><img src="assets/textarea-close.svg" alt=""></button></div></div></article>`;
}

const detailSurface=document.getElementById("detail-surface");
const detailContent=document.getElementById("detail-content");
const overviewSurface=document.querySelector("#tool-page > .tool-surface");
let detailTab=0;let detailVariant="general";let finalSubTab=0;const detailState={};
const listMarkup=items=>`<ul>${items.map(item=>`<li>${item}</li>`).join("")}</ul>`;
const fieldStarts=[1,3,4,6,7,9,10,14,15];
function currentQuestionNumber(sectionIndex){
  if(detailTab<6)return fieldStarts[detailTab]+sectionIndex;
  const tabs=finalDetailTabs[detailTab-6].tabs;
  const previous=tabs.slice(0,finalSubTab).reduce((sum,tab)=>sum+(tab.sections?.length||0),0);
  const number=fieldStarts[detailTab]+previous+sectionIndex;
  return detailTab===8&&number>26?null:number;
}
function numberedQuestion(question,sectionIndex){const number=currentQuestionNumber(sectionIndex);return `${number?`${number}. `:""}${question}`}
function saveDetailState(){
  detailContent.querySelectorAll("textarea,input[type=radio]").forEach(field=>{if(field.type==="radio"){if(field.checked)detailState[field.name]=field.value}else detailState[field.name]=field.value});
}
function normalizeDetailControls(){
  detailContent.querySelectorAll('input[type="radio"][value="Não se aplica ou não sei"]').forEach(input=>{
    input.value="Não sei ou Não se aplica";
    const label=input.closest("label")?.querySelector("span");
    if(label)label.textContent="Não sei ou Não se aplica";
  });
}
function detailSectionMarkup(section,sectionIndex){
  const prefix=`detail-${detailTab}-${detailVariant}-${sectionIndex}`;
  const annotatedExample=section.image&&section.exampleNotes?`<div class="detail-example-block"><p class="detail-label">Exemplo</p><div class="detail-example-frame"><img class="detail-example" src="${section.image}" alt="Exemplo visual do material analisado">${listMarkup(section.exampleNotes)}</div></div>`:"";
  const simpleImage=section.image&&!section.exampleNotes?`<img class="detail-example" src="${section.image}" alt="Exemplo visual do material analisado">`:"";
  return `<article class="detail-check"><div class="detail-column guidance"><h3>${section.question}</h3><p class="detail-label">${section.label}</p>${section.info?listMarkup(section.info):""}${annotatedExample||simpleImage}</div><div class="detail-column instruments"><h3>Como posso conferir se está certo?</h3><span class="detail-badge"><img src="assets/detail-general.svg" alt="" aria-hidden="true"><span>Geral</span></span>${listMarkup(section.tools)}</div><div class="detail-column response"><h3>Resposta</h3><fieldset><legend class="visually-hidden">Resposta para: ${section.question}</legend>${["Sim","Não","Não se aplica ou não sei"].map(value=>`<label><input type="radio" name="${prefix}-response" value="${value}"><span>${value}</span></label>`).join("")}</fieldset><h3>Anotações</h3><div class="textarea-wrap detail-textarea"><label class="visually-hidden" for="${prefix}-notes">Anotações: ${section.question}</label><textarea id="${prefix}-notes" name="${prefix}-notes" placeholder="Anotações" spellcheck="true" wrap="soft" autocomplete="off"></textarea><div class="textarea-scroll" role="scrollbar" aria-label="Rolar anotações" aria-controls="${prefix}-notes" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0%" tabindex="0" hidden><span></span></div><button class="textarea-clear" type="button" aria-label="Excluir anotações" hidden><img src="assets/textarea-close.svg" alt=""></button></div></div></article>`;
}
function exampleStatusMarkup(status){
  const isRight=status==="Certo";
  return `<span class="example-status ${isRight?"right":"wrong"}"><span class="example-status-icon" aria-hidden="true"><img src="assets/final/${isRight?"status-success.svg":"status-error.svg"}" alt=""></span><span>${status}</span></span>`;
}
function finalCheckMarkup(section,sectionIndex){
  const prefix=`detail-${detailTab}-final-${finalSubTab}-${sectionIndex}`;
  const examples=section.examples?`<div class="final-examples">${section.examples.map(item=>{const [status,...copy]=item.split("|");let text=copy.join("|").replaceAll("\n","<br>");if(text.includes("Glossário"))text=text.replace("dispneia","<b>dispneia</b>");return `<div class="final-example ${status==="Certo"?"right":"wrong"}">${exampleStatusMarkup(status)}<p>${text}</p></div>`}).join("")}</div>`:"";
  const exampleImage=section.exampleImage?`<img class="detail-example final-detail-example" src="${section.exampleImage}" alt="${section.exampleAlt||"Exemplo visual da orientação"}">`:"";
  const exampleImages=section.exampleImages?`<div class="final-detail-image-stack">${section.exampleImages.map(src=>`<img class="detail-example final-detail-example" src="${src}" alt="${section.exampleAlt||"Exemplo visual da orientação"}">`).join("")}</div>`:"";
  const fontExample=section.fontExample?`<div class="font-style-example" aria-label="Comparação entre letras sem serifa, com serifa, oblíquas e cursivas"><p class="font-sans">Esta é uma fonte sem serifa</p><p class="font-serif">Esta é uma fonte com serifa</p><p class="font-oblique">Esta é uma fonte oblíqua</p><p class="font-cursive">Esta é uma fonte cursiva</p></div>`:"";
  const plainLanguageText=`Linguagem Simples é uma forma de comunicar pensando primeiro em quem vai ler. Para isso, é preciso considerar o que a pessoa precisa saber, o que ela já conhece e onde vai usar a informação.`;
  const extendedPlainLanguageText=`${plainLanguageText} Um texto em Linguagem Simples ajuda a pessoa a encontrar, entender e usar a informação. O mais importante é que o texto funcione para quem lê.`;
  const emphasisExample=section.emphasisExample?`<div class="editable-example emphasis-example"><h4>Teste o texto com o público</h4><p>A etapa de teste com o público-alvo será uma oportunidade de <b>verificar</b> se o seu documento está com uma <b>linguagem simples</b>.</p></div>`:"";
  const capsExample=section.capsExample?`<div class="editable-example comparison-text-example"><div class="example-column">${exampleStatusMarkup("Certo")}<h4>O que é Linguagem Simples?</h4><p>${plainLanguageText}</p></div><div class="example-column caps-wrong">${exampleStatusMarkup("Errado")}<h4>O QUE É LINGUAGEM SIMPLES?</h4><p>${plainLanguageText.toLocaleUpperCase("pt-BR")}</p></div></div>`:"";
  const spacingTextExample=section.spacingTextExample?`<div class="editable-example comparison-text-example"><div class="example-column">${exampleStatusMarkup("Certo")}<h4>O que é Linguagem Simples?</h4><p>${plainLanguageText}</p></div><div class="example-column spacing-wrong">${exampleStatusMarkup("Errado")}<h4>O que é Linguagem Simples?</h4><p>${plainLanguageText}</p></div></div>`:"";
  const alignmentTextExample=section.alignmentTextExample?`<div class="editable-example comparison-text-example alignment-example-text"><div class="example-column">${exampleStatusMarkup("Certo")}<p class="example-caption">O texto é alinhado à esquerda e está na horizontal.</p><h4>O que é Linguagem Simples?</h4><p>${extendedPlainLanguageText}</p></div><div class="example-column alignment-wrong">${exampleStatusMarkup("Errado")}<p class="example-caption">O texto é justificado e foi girado 5 graus.</p><div class="rotated-copy"><h4>O que é Linguagem Simples?</h4><p>${extendedPlainLanguageText}</p></div></div></div>`:"";
  const exampleContent=examples||exampleImage||exampleImages||fontExample||emphasisExample||capsExample||spacingTextExample||alignmentTextExample;
  const exampleBlock=exampleContent?`<div class="final-example-block"><p class="detail-label">Exemplo</p>${exampleContent}</div>`:"";
  const tool=(label,icon,items)=>`<div class="material-tool-group"><span class="detail-badge"><img src="assets/${icon}" alt="" aria-hidden="true"><span>${label}</span></span>${listMarkup(items)}</div>`;
  const links=section.links?`<div class="final-links">${section.links.map(link=>`<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}</div>`:"";
  return `<article class="detail-check"><div class="detail-column guidance"><h3>${section.question}</h3><p class="detail-label">${section.label}</p>${listMarkup(section.info||[])}${exampleBlock}</div><div class="detail-column instruments"><h3>Como posso conferir se está certo?</h3>${tool("No material digital","detail-digital.svg",section.toolsDigital||[])}${tool("No material físico","detail-physical.svg",section.toolsPhysical||[])}${links}</div><div class="detail-column response"><h3>Resposta</h3><fieldset><legend class="visually-hidden">Resposta para: ${section.question}</legend>${["Sim","Não","Não se aplica ou não sei"].map(value=>`<label><input type="radio" name="${prefix}-response" value="${value}"><span>${value}</span></label>`).join("")}</fieldset><h3>Anotações</h3><div class="textarea-wrap detail-textarea"><textarea id="${prefix}-notes" name="${prefix}-notes" placeholder="Anotações" aria-label="Anotações: ${section.question}"></textarea><div class="textarea-scroll" role="scrollbar" aria-label="Rolar anotações" aria-controls="${prefix}-notes" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0" hidden><span></span></div><button class="textarea-clear" type="button" aria-label="Excluir anotações" hidden><img src="assets/textarea-close.svg" alt=""></button></div></div></article>`;
}
function toolModelMarkup(tab){
  const rows=tab.paragraphs||[];
  const resultAt=rows.indexOf("Resultado da análise");
  const interfaceAt=rows.indexOf("Interface");
  const attentionAt=rows.indexOf("O que merece mais atenção");
  const aboutText=rows[1]||"";
  const citation=rows[2]||"";
  const interfaceStart=interfaceAt>=0?interfaceAt+1:3;
  const interfaceEnd=resultAt>=0?resultAt:interfaceStart;
  const interfaceCopy=rows.slice(interfaceStart,interfaceEnd);
  const resultEnd=attentionAt>=0?attentionAt:rows.length;
  const resultRows=resultAt>=0?rows.slice(resultAt+1,resultEnd):[];
  const attentionRows=attentionAt>=0?rows.slice(attentionAt+1):[];
  const renderToolRows=items=>items.map(item=>{
    const knownHeading=["Cores e destaques no texto","Cores das frases","Índices de leitura","Índices de 0 a 100","Índices de escolaridade","Métrica para observar","Limites da ferramenta","Resultado final","Confira principalmente:"];
    if(knownHeading.includes(item))return `<h4>${item}</h4>`;
    return `<p>${item.replaceAll("\n","<br>")}</p>`;
  }).join("");
  const bulletList=items=>`<ul class="tool-copy-list">${items.map(item=>`<li>${item}</li>`).join("")}</ul>`;
  const resultMark=`<img class="tool-result-mark" src="assets/card-mark-negative.svg" alt="">`;
  const attention=(items)=>`<aside class="tool-attention"><img class="attention-help" src="assets/final/icon-question.svg" alt="" aria-hidden="true"><h3>O que merece mais atenção</h3>${bulletList(items)}</aside>`;
  const vydiaResult=()=>`<div class="tool-results"><section class="tool-result-main"><h3>Resultado da análise</h3><p>Apresenta dados sobre o tamanho e a composição do texto. Também identifica o tom positivo, negativo ou neutro e lista palavras ausentes nos dicionários usados.</p>${resultMark}<h4>Cores e destaques no texto</h4><p>No campo Texto Analisado, as cores indicam como a ferramenta classificou cada palavra:</p>${bulletList(["Azul-claro: palavra comum.","Vermelho-escuro: palavra suspeita, não encontrada no dicionário da Vidya Text.","Azul-escuro: nome próprio ou número."])}<h4>Índices de leitura</h4><ul class="tool-copy-list nested"><li>Leiturabilidade de Flesch:${bulletList(["Estima a facilidade de leitura pela estrutura do texto. Na ferramenta, quanto maior o resultado, mais fácil é a leitura."])}</li><li>Leiturabilidade de Dale-Chall:${bulletList(["Considera a estrutura do texto e a quantidade de palavras difíceis. Na ferramenta, quanto maior o resultado, mais fácil é a leitura. O cálculo exige pelo menos 20 palavras."])}</li><li>Polaridade de sentimento:${bulletList(["Indica se o texto apresenta um tom positivo, negativo ou neutro."])}</li></ul><h4>Índices de leitura</h4>${bulletList(["Frases: quantidade total de frases.","Palavras por frase: média de palavras em cada frase.","Palavras do texto: quantidade total de palavras.","Sílabas por palavra: média de sílabas das palavras.","Palavras suspeitas: palavras que não estão no dicionário da ferramenta.","Palavras diferentes: quantidade de palavras distintas.","Palavras repetidas: termos usados mais de uma vez.","Palavras pouco frequentes: palavras pouco usadas no português brasileiro."])}</section>${attention(["frases com muitas palavras;","palavras longas ou pouco frequentes;","termos técnicos sem explicação;","palavras suspeitas;","repetições desnecessárias;","resultados baixos nos índices de leitura."])}</div>`;
  const simpligoResult=()=>`<div class="tool-results"><section class="tool-result-main"><h3>Resultado da análise</h3><p>Apresenta dados sobre o tamanho e a composição do texto. Também identifica o tom positivo, negativo ou neutro e lista palavras ausentes nos dicionários usados.</p>${resultMark}<h4>Cores das frases</h4><p>As cores organizam as frases em quatro níveis:</p>${bulletList(["Verde — 1 a 25: menor complexidade;","Amarelo — 26 a 50: complexidade moderada;","Laranja — 51 a 75: complexidade alta;","Vermelho — 76 a 100: complexidade muito alta."])}<p>A classificação mostra quais frases merecem mais atenção durante a revisão.</p></section>${attention(["frases em laranja e vermelho."])}</div>`;
  const cohRows=[
    ["1. Índice Flesch — flesch","Estima a facilidade geral de leitura pelo tamanho das frases e das palavras.","Quanto maior, mais fácil tende a ser a leitura. Use como indicador geral, não como resultado definitivo."],
    ["2. Palavras por frase — words_per_sentence","Média de palavras em cada frase.","Médias altas podem indicar frases longas. Revise se cada frase apresenta apenas uma ideia."],
    ["3. Sílabas por palavra de conteúdo — syllables_per_content_word","Indica o tamanho médio de substantivos, verbos, adjetivos e advérbios.","Quanto maior o resultado, maior pode ser a presença de palavras longas ou técnicas."],
    ["4. Palavras antes do verbo principal — words_before_main_verb","Mostra quanto a pessoa precisa ler antes de encontrar a ação principal.","Quanto maior, maior pode ser o esforço de leitura. Aproxime o sujeito do verbo e use ordem direta."],
    ["5. Tamanho médio dos grupos nominais — mean_noun_phrase","Mede quantas palavras aparecem em grupos organizados em torno de um substantivo.","Valores altos podem indicar expressões densas, como “a realização da avaliação das condições”. Prefira verbos: “avalie as condições”."],
    ["6. Frequência mínima das palavras de conteúdo — min_cw_freq","Ajuda a identificar a presença de palavras pouco frequentes.","Valores baixos podem indicar termos raros, técnicos ou pouco conhecidos. Confira se eles precisam ser trocados ou explicados."],
    ["7. Proporção de conectivos — conn_ratio","Mostra o uso de palavras que ligam as ideias, como “porque”, “por isso”, “mas” e “depois”.","Poucos conectivos podem deixar relações implícitas. Muitos podem tornar o texto pesado. Avalie se as ligações estão claras."],
    ["8. Conectivos de causa — cau_pos_conn_ratio","Mostra palavras que explicam causa e consequência.","Observe se o texto deixa claro por que algo acontece ou qual é o resultado de uma ação."],
    ["9. Conectivos de tempo — tmp_pos_conn_ratio","9. Conectivos de tempo — tmp_pos_conn_ratio","É importante em instruções. Use termos como “antes”, “depois”, “durante” e “em seguida” quando ajudarem a orientar a ação."],
    ["10. Repetição de radicais entre frases próximas — adj_stem_ovl","10. Repetição de radicais entre frases próximas — adj_stem_ovl","Alguma repetição ajuda a ligar as ideias. Um resultado baixo pode indicar mudanças bruscas de assunto; excesso pode deixar o texto repetitivo."]
  ];
  const cohResult=()=>`<section class="coh-result"><h3>Resultado da análise</h3><p>Apresenta uma lista de 46 métricas.</p>${resultMark}<div class="coh-table" role="table" aria-label="Métricas do Coh-Metrix-Port"><div class="coh-table-head" role="row"><strong>Métrica para observar</strong><strong>O que mostra?</strong><strong>Como interpretar?</strong></div>${cohRows.map(row=>`<div class="coh-row" role="row">${row.map((cell,index)=>`<div role="cell"><span class="coh-mobile-label">${["Métrica para observar","O que mostra?","Como interpretar?"][index]}</span>${cell}</div>`).join("")}</div>`).join("")}</div></section>`;
  const altResult=()=>`<div class="tool-results"><section class="tool-result-main"><h3>Resultado da análise</h3><p>Apresenta notas de 0 a 100 e estima a escolaridade necessária para a leitura. Destaca frases longas em amarelo ou vermelho e palavras difíceis em azul. Também gera nuvens de palavras.</p>${resultMark}<h4>Cores e destaques no texto</h4><p>A ferramenta usa cores para indicar possíveis dificuldades:</p>${bulletList(["Palavras em azul: não estão entre as 5 mil palavras mais usadas no português brasileiro. Podem ser termos técnicos, jargões ou palavras pouco conhecidas.","Frases sublinhadas em amarelo: podem estar longas. Considere dividi-las em duas.","Frases sublinhadas em vermelho: estão muito longas. Divida-as em duas ou mais frases."])}<p>Uma palavra azul não está necessariamente errada. Mantenha termos necessários, mas explique aqueles que o público pode não conhecer. Nomes próprios e siglas não são classificados como palavras complexas.</p><h4>Índices de 0 a 100</h4><p>Nestes índices, quanto maior o resultado, mais fácil é a leitura:</p>${bulletList(["Facilidade de leitura de Flesch: considera o tamanho das frases e a quantidade de sílabas das palavras.","Índice Gulpease: considera a quantidade de letras, palavras e frases."])}<p>Resultados próximos de 100 indicam textos mais simples. Resultados próximos de zero indicam maior dificuldade de leitura.</p><h4>Índices de escolaridade</h4><p>Nestes índices, quanto menor o resultado, mais fácil é a leitura:</p>${bulletList(["Flesch-Kincaid: considera o tamanho das frases e das palavras.","Gunning: considera o tamanho das frases e a presença de palavras pouco frequentes.","Índice de Leiturabilidade Automatizado (ARI): considera a quantidade de letras por palavra e de palavras por frase.","Coleman-Liau: considera o tamanho das palavras e a quantidade de frases."])}<p>O resultado estima quantos anos de estudo uma pessoa precisaria ter para compreender bem o texto. Por exemplo, um resultado 6 indica um texto mais simples que um resultado 17.</p></section><aside class="tool-attention"><img class="attention-help" src="assets/final/icon-question.svg" alt="" aria-hidden="true"><h3>O que merece mais atenção</h3><h4>Resultado final</h4><p>A fórmula final apresenta a média de quatro índices:</p>${bulletList(["Flesch-Kincaid;","Gunning;","ARI;","Coleman-Liau."])}<p>Quanto menor o resultado final, menor é a escolaridade estimada para compreender o texto. Use esse valor para comparar versões do mesmo conteúdo e verificar se a reescrita reduziu a dificuldade.</p><h4>Confira principalmente:</h4>${bulletList(["frases amarelas ou vermelhas;","palavras azuis que o público talvez não conheça;","excesso de palavras em cada frase;","diferença entre os vários índices;","resultado final incompatível com o público;","erros de escrita que podem alterar a contagem."])}<h4>Limites da ferramenta</h4><p>Os índices não avaliam se:</p>${bulletList(["as ideias estão bem conectadas;","o conteúdo segue uma ordem lógica;","a informação está correta;","o texto responde às necessidades do público;","a pessoa consegue usar a informação."])}<p>Use a ALT como apoio. Não substitua automaticamente todo termo destacado. Em conteúdos técnicos, pode ser melhor explicar uma palavra necessária e reduzir o tamanho das frases.</p></aside></div>`;
  const standardResult=()=>`<div class="tool-results"><section class="tool-result-main"><h3>Resultado da análise</h3>${renderToolRows(resultRows)}</section>${attentionRows.length?attention(attentionRows.flatMap(item=>item.split("\n").filter(Boolean))):""}</div>`;
  const resultsMarkup=tab.label==="Vidya Text"?vydiaResult():tab.label==="Simpligo"?simpligoResult():tab.label==="Coh-Metrix-Port"?cohResult():tab.label.includes("ALT")?altResult():standardResult();
  const aboutItems=aboutText.split("\n").filter(Boolean);
  const interfaceImage=tab.interfaceAsset?`<img class="tool-interface-image${tab.label==="Vidya Text"?" crop-right":""}" src="${tab.interfaceAsset}" alt="Interface da ferramenta ${tab.heading}">`:"";
  const interfaceBody=interfaceImage||`${interfaceCopy.length?`<div class="tool-interface-copy">${renderToolRows(interfaceCopy)}</div>`:`<div class="tool-interface-placeholder"><strong>${tab.heading}</strong><span>Interface da ferramenta</span></div>`}`;
  return `<div class="tool-model-head"><h2>${tab.heading}</h2><a class="final-access" href="${tab.actionUrl}" target="_blank" rel="noopener noreferrer">${tab.action}</a></div>
    <img class="final-mark" src="assets/card-mark-negative.svg" alt="">
    <section class="tool-about"><h3>Sobre a ferramenta</h3>${listMarkup(aboutItems)}<span class="tool-citation">${citation}</span></section>
    <section class="tool-interface"><h3>Interface</h3><div class="tool-interface-canvas">${interfaceBody}</div></section>
    ${resultsMarkup}`;
}
function finalArticleMarkup(tab){
  if(tab.sections)return `<h2>${tab.heading}</h2><p class="final-lead">${tab.lead}</p><img class="final-mark" src="assets/card-mark-negative.svg" alt="">${tab.sections.map(finalCheckMarkup).join("")}`;
  if(tab.cards)return `<h2>${tab.heading}</h2><div class="final-tool-list">${tab.cards.map(card=>`<section class="final-tool-item"><div class="tool-model-head"><h2>${card.title}</h2><a class="final-access" href="${card.url}" target="_blank" rel="noopener noreferrer" aria-label="Acessar ${card.title}">Acessar</a></div><img class="final-mark" src="assets/card-mark-negative.svg" alt=""><ul>${card.text.split("\n").filter(Boolean).map(line=>`<li>${line}</li>`).join("")}</ul></section>`).join("")}</div>`;
  if(tab.action)return toolModelMarkup(tab);
  if(tab.label==="Orientações gerais")return `<h2>${tab.heading}</h2><ul class="reading-general-list"><li>Para verificar se um texto é simples, a ARVI reúne ferramentas que analisam diferentes aspectos da escrita.</li><li>Elas foram organizadas em dois grupos:<ul><li>ferramentas que avaliam o texto como um todo, como o Vidya Text, Simpligo, Coh-Metrix-Port e ALT-Legibilidade;</li><li>ferramentas que verificam o vocabulário, como o CorPop e o MedSimples;</li></ul></li><li>Juntas, essas ferramentas ajudam a avaliar coesão, coerência, complexidade das frases, escolha das palavras e outros aspectos da simplificação textual em português brasileiro.</li></ul>`;
  const conceptColumns=tab.conceptColumns?`<div class="final-concept-columns">${tab.conceptColumns.map(column=>`<article class="final-concept-column"><h3>${column.heading}</h3>${column.intro?`<p>${column.intro}</p>`:""}${column.groups.map(group=>`<section class="final-concept-group${group.mark?" concept-break":""}"><h4>${group.title}</h4>${group.text?`<p>${group.text.replaceAll("\n","<br>")}</p>`:""}</section>`).join("")}</article>`).join("")}</div>`:"";
  const concepts=conceptColumns||(tab.concepts?`<div class="final-concepts">${tab.concepts.map(item=>{const [title,...text]=item.split("|");return `<article><h3>${title}</h3><p>${text.join("|").replaceAll("\n","<br>")}</p></article>`}).join("")}</div>`:"");
  const paragraphHeadings=["Sobre a ferramenta","Interface","Resultado da análise","Cores e destaques no texto","Cores das frases","O que merece mais atenção","Métrica para observar","Índices de leitura","Índices de 0 a 100","Índices de escolaridade","Limites da ferramenta"];
  const linkify=text=>text.replace(/https:\/\/legibilidade\.com\//g,'<a href="https://legibilidade.com/" target="_blank" rel="noopener noreferrer">https://legibilidade.com/</a>');
  const paragraphs=(tab.paragraphs||[]).map(p=>paragraphHeadings.includes(p)?`<h3>${p}</h3>`:`<p>${linkify(p).replaceAll("\n","<br>")}</p>`).join("");
  const secondary=tab.secondary?(()=>{const [h,p]=tab.secondary.split("|");return `<h2>${h}</h2><p class="final-lead">${p}</p>`})():"";
  const inlineLinks=tab.inlineLinks?`<p class="final-inline-links">${tab.inlineLinks.map(link=>`<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join(" · ")}</p>`:"";
  return `<h2>${tab.heading}</h2>${tab.action?`<a class="final-access" href="${tab.actionUrl}" target="_blank" rel="noopener noreferrer">${tab.action}</a>`:""}${tab.lead?`<p class="final-lead">${tab.lead}</p>`:""}${inlineLinks}${paragraphs}${concepts}${secondary}`;
}
function renderDetail(){
  if(detailTab>=6){
    const data=finalDetailTabs[detailTab-6];const tab=data.tabs[finalSubTab]||data.tabs[0];
    const finalLead=tab.leadItems?`<ul class="final-lead final-lead-list">${tab.leadItems.map(item=>typeof item==="string"?`<li>${item}</li>`:`<li>${item.text}<ul>${item.children.map(child=>`<li>${child}</li>`).join("")}</ul></li>`).join("")}</ul>`:`<ul class="final-lead final-lead-list"><li>${tab.lead}</li></ul>`;
    detailContent.innerHTML=`<div class="detail-tabs final-detail-tabs" role="tablist" aria-label="${data.title}">${data.tabs.map((item,index)=>`<button type="button" role="tab" aria-selected="${index===finalSubTab}" class="${index===finalSubTab?"active":""}" data-final-tab="${index}">${item.label}</button>`).join("")}</div><div class="final-detail-body">${tab.sections?`<h2>${tab.heading}</h2>${finalLead}<img class="final-mark" src="assets/card-mark-negative.svg" alt="" aria-hidden="true">${tab.sections.map((section,index)=>finalCheckMarkup({...section,question:numberedQuestion(section.question,index)},index)).join("")}`:finalArticleMarkup(tab)}</div>`;
    normalizeDetailControls();
    detailContent.querySelectorAll("textarea,input[type=radio]").forEach(field=>{if(field.type==="radio"){const saved=detailState[field.name];field.checked=saved!==undefined&&saved===field.value}else{field.value=detailState[field.name]||"";updateTextareaState(field)}});return;
  }
  if(detailTab>=3){
    const localIndex=detailTab-3;const data=materialDetailTabs[localIndex];
    const educationalMarkup=materialEducationalMarkup().replace("pensar nele aberto e fechado</p>","pensar nele aberto e fechado.</p>").replace(">Coluna</h3>",">Colunas</h3>");
    const sectionContent=data.educational?`${materialTypeQuestionMarkup()}${educationalMarkup}`:data.sections.map((section,index)=>materialSectionMarkup({...section,question:numberedQuestion(section.question,index)},index)).join("");
    detailContent.innerHTML=`<div class="detail-tabs material-detail-tabs" role="tablist" aria-label="Como é o material? Onde ele vai ficar?">${materialDetailTabs.map((tab,index)=>`<button type="button" role="tab" aria-selected="${index===localIndex}" class="${index===localIndex?"active":""}" data-detail-tab="${index+3}">${index+4}. ${tab.title}</button>`).join("")}</div><header class="detail-intro material-detail-intro"><h2>${data.title}</h2>${listMarkup(data.intro)}<img src="assets/card-mark-blue.svg" alt="" aria-hidden="true"></header><div class="detail-checks material-detail-checks">${sectionContent}</div>`;
    normalizeDetailControls();detailContent.querySelectorAll("textarea,input[type=radio]").forEach(field=>{if(field.type==="radio"){const saved=detailState[field.name];field.checked=saved!==undefined&&saved===field.value}else{field.value=detailState[field.name]||"";updateTextareaState(field)}});return;
  }
  const data=detailTabs[detailTab];
  const variant=detailVariant==="prep"&&prepDetailTabs[detailTab]?prepDetailTabs[detailTab]:data;
  const resources=variant.resources?`<div class="detail-resources">${variant.resources.map(resource=>`<a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="detail-resource"><span aria-hidden="true"></span><span class="detail-resource-heading"><strong>${resource.title}</strong><img src="assets/external-link.svg" alt="Abrir em nova aba"></span><small>Acesse o site</small></a>`).join("")}</div>`:"";
  const sectionContent=`${variant.sections.map((section,index)=>detailSectionMarkup({...section,question:numberedQuestion(section.question,index)},index)).join("")}${resources}`;
  detailContent.innerHTML=`<div class="detail-tabs" role="tablist" aria-label="Quem vai ler e o que o material comunica">${detailTabs.map((tab,index)=>`<button type="button" role="tab" aria-selected="${index===detailTab}" class="${index===detailTab?"active":""}" data-detail-tab="${index}">${index+1}. ${tab.title}</button>`).join("")}</div><header class="detail-intro"><h2>${data.title}</h2>${listMarkup(data.intro)}${data.chips?`<div class="detail-chips"><button type="button" data-detail-variant="general" class="${detailVariant==="general"?"selected":""}" aria-pressed="${detailVariant==="general"}">Geral</button><button type="button" data-detail-variant="prep" class="${detailVariant==="prep"?"selected":""}" aria-pressed="${detailVariant==="prep"}">PrEP e PEP</button></div>`:""}<img src="assets/card-mark-warning.svg" alt="" aria-hidden="true"></header><div class="detail-checks">${sectionContent}</div>`;
  normalizeDetailControls();detailContent.querySelectorAll("textarea,input[type=radio]").forEach(field=>{if(field.type==="radio"){const saved=detailState[field.name];field.checked=saved!==undefined&&saved===field.value}else{field.value=detailState[field.name]||"";updateTextareaState(field)}});
}
function renderDetailWithoutMoving(){
  const scrollPosition=window.scrollY;
  const root=document.documentElement;
  const previousScrollBehavior=root.style.scrollBehavior;
  root.style.scrollBehavior="auto";
  renderDetail();
  window.scrollTo(0,scrollPosition);
  root.style.scrollBehavior=previousScrollBehavior;
}
function openDetail(index){detailTab=index;detailVariant="general";finalSubTab=0;const materialGroup=index>=3&&index<6;const finalGroup=index>=6;toolPage.classList.add("detail-view");document.body.classList.add("detail-mode");toolPage.classList.toggle("material-detail-view",materialGroup);toolPage.classList.toggle("final-detail-view",finalGroup);document.querySelector(".detail-hero-copy h1").textContent=finalGroup?finalDetailTabs[index-6].title:materialGroup?"Como é o material? Onde ele vai ficar?":"Quem vai ler? O que o material comunica?";document.querySelector(".detail-hero-copy p").textContent=finalGroup?finalDetailTabs[index-6].subtitle:materialGroup?"Após saber mais sobre o leitor e o que vai ser informado, vamos refletir sobre como e onde vamos mostrar a informação.":"Em um primeiro momento, precisamos entender quem vai ler o material e quais informações a pessoa vai precisar para entender de forma correta.";document.querySelector(".detail-hero-vector").src=materialGroup?"assets/detail-header-line-blue.svg":finalGroup?"assets/detail-header-line-red.svg":"assets/detail-header-line.svg";document.querySelector(".detail-hero-icon img").src=materialGroup?"assets/final/asterisk-blue.svg":finalGroup?"assets/card-mark-negative.svg":"assets/final/asterisk-yellow-large.svg";homeLink.classList.remove("active");toolLink.classList.remove("active");homeLink.setAttribute("aria-current","false");toolLink.setAttribute("aria-current","false");overviewSurface.hidden=true;detailSurface.hidden=false;renderDetail();window.scrollTo({top:0,behavior:"smooth"})}
function closeDetail(){toolPage.classList.remove("detail-view");document.body.classList.remove("detail-mode");toolLink.classList.add("active");toolLink.setAttribute("aria-current","page");detailSurface.hidden=true;overviewSurface.hidden=false;try{saveDetailState();updateOverviewCounts()}catch(error){console.error("Não foi possível atualizar o resumo dos campos.",error)}window.scrollTo({top:0,behavior:"smooth"})}

function renderToolCards(){
  document.querySelectorAll(".quadrant-grid").forEach(grid=>{
    grid.dataset.cards.split(",").map(Number).forEach(index=>{
      const data=toolCards[index];
      const card=document.createElement("article");card.className="quadrant-card";card.dataset.cardIndex=String(index);card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label",`Abrir campo ${index+1}: ${data.title}`);
      const group=index<3?"warning":index<6?"info":"negative";
      card.innerHTML=`<span class="badge">${index+1}</span><div class="quadrant-card-header"><div class="quadrant-title-row"><h3>${data.title}</h3><span class="help-button" aria-hidden="true"><img src="assets/final/card-arrow.svg" alt=""></span></div><p class="quadrant-question">${data.question}</p></div><div class="card-results" aria-label="Resultados deste campo"></div>`;
      card.addEventListener("click",()=>openDetail(index));
      card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openDetail(index)}});
      grid.append(card);
    });
  });
}

function updateOverviewCounts(){
  document.querySelectorAll(".quadrant-card").forEach(card=>{
    const index=Number(card.dataset.cardIndex);const counts=reportCounts(reportChecksForQuadrant(index));
    const target=card.querySelector(".card-results");if(!target)return;
    const materialAnswer=index===3?detailState["detail-3-general-0-response"]:"";
    const materialSummary=["Folheto","Folder","Cartaz"].includes(materialAnswer)?`<span class="material-choice-summary">${materialAnswer}</span>`:"";
    target.innerHTML=`<strong>Resultado</strong>${materialSummary}${reportAnswerTypes.map(type=>`<span class="card-result ${type.className}"><img src="${type.icon}" alt=""><b>${counts[type.key]}</b> ${type.label}</span>`).join("")}`;
    if(index===3){
      card.classList.toggle("has-material-answer",Boolean(materialSummary));
    }
  });
}

const homePage=document.getElementById("inicio");
const toolPage=document.getElementById("tool-page");
const homeLink=document.getElementById("home-link");
const toolLink=document.getElementById("tool-link");
document.querySelectorAll(".tool-header-form input").forEach(input=>{input.value=""});
function showPage(page){
  const showTool=page==="tool";homePage.hidden=showTool;toolPage.hidden=!showTool;
  if(!showTool){toolPage.classList.remove("detail-view");document.body.classList.remove("detail-mode");detailSurface.hidden=true;overviewSurface.hidden=false}
  document.body.classList.toggle("tool-mode",showTool);
  homeLink.classList.toggle("active",!showTool);toolLink.classList.toggle("active",showTool);
  homeLink.setAttribute("aria-current",showTool?"false":"page");toolLink.setAttribute("aria-current",showTool?"page":"false");
  window.scrollTo({top:0,behavior:"smooth"});
}
toolLink.addEventListener("click",()=>{if(!toolPage.hidden&&!detailSurface.hidden)closeDetail();else showPage("tool")});
document.querySelector(".inline-tool-link")?.addEventListener("click",()=>showPage("tool"));
homeLink.addEventListener("click",e=>{e.preventDefault();showPage("home")});
document.getElementById("clear-tool").addEventListener("click",()=>{
  toolPage.querySelectorAll("input,textarea").forEach(field=>{if(field.type==="radio")field.checked=false;else field.value="";if(field.matches("textarea")){field.scrollTop=0;updateTextareaState(field)}});
  Object.keys(detailState).forEach(key=>delete detailState[key]);
  toolPage.querySelectorAll(".textarea-wrap").forEach(wrapper=>wrapper.classList.remove("filled"));
  toolPage.querySelectorAll(".textarea-clear").forEach(button=>button.hidden=true);
  updateOverviewCounts();
});
const escapeReportText=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
const materialOptions=["Folheto","Folder","Cartaz"];
const selectedMaterialValue=()=>materialOptions.includes(detailState["detail-3-general-0-response"])?detailState["detail-3-general-0-response"]:"Não informado";
function reportChecksForQuadrant(index){
  const checks=[];
  const addSections=(sections,prefix,label)=>{
    (sections||[]).forEach((section,sectionIndex)=>{
      const key=`${prefix}-${sectionIndex}`;
      const answer=detailState[`${key}-response`]||"Não respondida";
      const notes=detailState[`${key}-notes`]||"";
      checks.push({label,question:section.question,answer,notes});
    });
  };
  if(index<3){
    addSections(detailTabs[index].sections,`detail-${index}-general`,"Geral");
    if(prepDetailTabs[index])addSections(prepDetailTabs[index].sections,`detail-${index}-prep`,"PrEP e PEP");
  }else if(index<6){
    const tab=materialDetailTabs[index-3];
    if(index===3){
      const answer=detailState["detail-3-general-0-response"]||"Não respondida";
      checks.push({label:"Tipo de material",question:"Qual material você está avaliando?",answer:materialOptions.includes(answer)?"Sim":answer,notes:detailState["detail-3-general-0-notes"]||"",material:materialOptions.includes(answer)?answer:""});
    }else addSections(tab.sections,`detail-${index}-general`,tab.title);
  }else{
    finalDetailTabs[index-6].tabs.forEach((tab,tabIndex)=>addSections(tab.sections,`detail-${index}-final-${tabIndex}`,tab.label));
  }
  return checks;
}
const reportGroups=["Quem vai ler? O que o material comunica?","Como é o material? Onde ele vai ficar?","O material é simples e claro?"];
const reportAnswerTypes=[
  {key:"Sim",label:"Sim",className:"positive",icon:"assets/final/status-success.svg"},
  {key:"Não",label:"Não",className:"negative",icon:"assets/final/status-error.svg"},
  {key:"Não sei ou Não se aplica",label:"Não sei ou Não se aplica",className:"info",icon:"assets/final/status-info.svg"},
  {key:"Não respondida",label:"Sem resposta",className:"empty",icon:"assets/final/radio-inactive.svg"}
];
function reportCounts(checks){
  return Object.fromEntries(reportAnswerTypes.map(type=>[type.key,checks.filter(check=>check.answer===type.key).length]));
}
function reportBadges(checks){
  const counts=reportCounts(checks);
  return `<div class="print-results"><span>Resultado:</span>${reportAnswerTypes.map(type=>`<span class="print-result print-result-${type.className}"><img src="${type.icon}" alt=""><b>${counts[type.key]}</b> ${type.label}</span>`).join("")}</div>`;
}
function reportBrand(){
  return `<div class="print-brand"><img src="assets/brand-mark.svg" alt=""><img src="assets/brand-word.svg" alt="arvi"></div>`;
}
function reportFooter(page){
  return `<footer class="print-page-footer"><span>${page}</span></footer>`;
}
function buildPrintReport(){
  saveDetailState();
  document.getElementById("print-report")?.remove();
  const values=Object.fromEntries([...document.querySelectorAll(".tool-header-form input")].map(input=>[input.name,input.value.trim()]));
  const selectedMaterial=selectedMaterialValue();
  const report=document.createElement("section");
  report.id="print-report";
  report.setAttribute("aria-label","Relatório da análise ARVI");
  const meta=[
    ["Nome do documento",values.documento],
    ["Responsável pela criação/análise",values.responsavel],
    ["Órgão responsável",values.orgao],
    ["Data",values.data],
    ["Identificador do material",values.identificador],
    ["Tipo de material",selectedMaterial]
  ];
  let page=1;
  const cover=`<section class="print-page print-cover">${reportBrand()}<div class="print-cover-content"><p>Ferramenta visual interativa para análise de materiais informativos de saúde</p><h1>Relatório da análise</h1><div class="print-meta">${meta.map(([label,value])=>`<div><span>${label}</span><strong>${escapeReportText(value||"Não informado")}</strong></div>`).join("")}</div></div><div class="print-cover-art" aria-hidden="true"></div><div class="print-cover-logos"><img src="assets/logo-ufrgs.svg" alt="UFRGS"><img src="assets/logo-com-acesso.svg" alt="COM Acesso UFRGS"></div>${reportFooter(page++)}</section>`;
  const summaries=reportGroups.map((group,groupIndex)=>`<section class="print-page print-summary print-group-${groupIndex}">${reportBrand()}<h2>${group}</h2><div class="print-summary-list">${toolCards.slice(groupIndex*3,groupIndex*3+3).map((card,offset)=>{const index=groupIndex*3+offset;const checks=reportChecksForQuadrant(index);const mainNotes=document.getElementById(`notes-${index}`)?.value.trim()||"";const material=checks.find(check=>check.material)?.material;return `<article class="print-summary-card"><h3>${escapeReportText(card.title)}</h3><p class="print-question">${escapeReportText(card.question)}</p>${material?`<p class="print-material-choice"><span>Tipo selecionado</span><strong>${escapeReportText(material)}</strong></p>`:""}<div class="print-note">${escapeReportText(mainNotes||"Nenhuma anotação.")}</div>${reportBadges(checks)}</article>`}).join("")}</div>${reportFooter(page++)}</section>`).join("");
  const details=toolCards.map((card,index)=>{const checks=reportChecksForQuadrant(index);return `<section class="print-page print-detail print-group-${Math.floor(index/3)}">${reportBrand()}<p class="print-kicker">Quadrante ${index+1}</p><h2>${escapeReportText(card.title)}</h2><p class="print-detail-lead">${escapeReportText(card.question)}</p><div class="print-detail-list">${checks.length?checks.map((check,checkIndex)=>`<article class="print-detail-question"><div class="print-detail-heading"><span>${checkIndex+1}</span><div><small>${escapeReportText(check.label)}</small><h3>${escapeReportText(check.question)}</h3></div></div><div class="print-detail-answer print-answer-${reportAnswerTypes.find(type=>type.key===check.answer)?.className||"empty"}"><span>${check.material?"Tipo selecionado":"Resposta"}</span><strong>${escapeReportText(check.material||check.answer)}</strong></div><div class="print-detail-notes"><span>Anotações</span><p>${escapeReportText(check.notes||"Nenhuma anotação.")}</p></div></article>`).join(""):`<p class="print-empty">Este quadrante não possui perguntas de resposta.</p>`}</div>${reportFooter(page++)}</section>`}).join("");
  report.innerHTML=cover+summaries+details;
  document.body.append(report);
}
const pdfPalette={ink:[15,15,15],text:[51,51,51],muted:[117,117,117],paper:[242,242,242],warning:[158,62,23],warningLine:[214,160,0],info:[23,79,158],infoLine:[29,94,191],negative:[158,23,48],negativeLine:[191,29,58],positiveBg:[230,249,238],positive:[21,111,51],negativeBg:[251,228,232],infoBg:[228,238,251],emptyBg:[236,239,244],empty:[76,80,86]};
let activePdfAssets={};
function pdfRasterize(src,opaque=false,opacity=1){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>{const sourceWidth=Math.max(1,image.naturalWidth),sourceHeight=Math.max(1,image.naturalHeight);const scale=Math.max(2,Math.min(8,192/Math.min(sourceWidth,sourceHeight)));const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(sourceWidth*scale));canvas.height=Math.max(1,Math.round(sourceHeight*scale));const context=canvas.getContext("2d");context.imageSmoothingEnabled=true;context.imageSmoothingQuality="high";if(opaque){context.fillStyle="#fff";context.fillRect(0,0,canvas.width,canvas.height)}context.globalAlpha=opacity;context.drawImage(image,0,0,canvas.width,canvas.height);resolve({data:canvas.toDataURL(opaque?"image/jpeg":"image/png",.98),width:sourceWidth,height:sourceHeight,format:opaque?"JPEG":"PNG"})};image.onerror=reject;image.src=src})}
async function pdfBinaryBase64(src){const bytes=new Uint8Array(await (await fetch(src)).arrayBuffer());let binary="";for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(binary)}
const pdfTryRasterize=(...args)=>pdfRasterize(...args).catch(error=>{console.warn("Ativo opcional do PDF não carregado:",args[0],error);return null});
async function pdfRasterizeTinted(src,color){const svg=await (await fetch(src)).text();const tinted=svg.replace(/fill="#505050"/gi,`fill="${color}"`);return pdfRasterize(`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(tinted)))}`)}
const pdfTryRasterizeTinted=(src,color)=>pdfRasterizeTinted(src,color).catch(error=>{console.warn("Ícone opcional do PDF não carregado:",src,error);return null});
function pdfSetColor(doc,color,fill=false){(fill?doc.setFillColor:doc.setTextColor).apply(doc,color)}
function pdfGroupColors(index){return index===0?{accent:pdfPalette.warning,line:pdfPalette.warningLine}:index===1?{accent:pdfPalette.info,line:pdfPalette.infoLine}:{accent:pdfPalette.negative,line:pdfPalette.negativeLine}}
function pdfImagePlacement(asset,x,y,width,height,mode="contain"){
  if(!asset?.data||!asset.width||!asset.height)return null;
  const sourceRatio=asset.width/asset.height,targetRatio=width/height;let drawWidth,drawHeight;
  if((mode==="cover"&&sourceRatio>targetRatio)||(mode!=="cover"&&sourceRatio<targetRatio)){drawHeight=height;drawWidth=height*sourceRatio}else{drawWidth=width;drawHeight=width/sourceRatio}
  return {x:x+(width-drawWidth)/2,y:y+(height-drawHeight)/2,width:drawWidth,height:drawHeight};
}
function pdfAddImage(doc,asset,x,y,width,height,alias,mode="contain"){
  const box=pdfImagePlacement(asset,x,y,width,height,mode);if(!box)return;
  doc.addImage(asset.data,asset.format||"PNG",box.x,box.y,box.width,box.height,alias,undefined,"FAST");
}
function pdfBrand(doc){
  if(activePdfAssets.brandLogo){pdfAddImage(doc,activePdfAssets.brandLogo,5.3,5.3,32.8,13.1,"arvi-brand");return}
  doc.setFillColor(55,55,55);doc.roundedRect(5.3,9,8,6,3,3,"F");doc.roundedRect(10.5,5.3,8,9.7,3,3,"F");doc.roundedRect(16.2,5.3,8,9.7,3,3,"F");doc.setFont("helvetica","bold");doc.setFontSize(15);doc.setTextColor(55,55,55);doc.text("arvi",25.2,14.2);
}
function pdfFooter(doc,page,showLogos=false){if(showLogos){const logos=[["ufrgs",10.5,8.5],["design",24.4,10.7],["elab",39.6,8.2],["comAcesso",16.2,8.7]];let x=9.5;logos.forEach(([key,width,height])=>{const logo=activePdfAssets[key];if(logo){pdfAddImage(doc,logo,x,279-height,width,height,`footer-${key}`);x+=width+8.5}})}doc.setFont("helvetica","normal");doc.setFontSize(8);pdfSetColor(doc,pdfPalette.muted);doc.text(String(page),199.7,289,{align:"right"})}
function pdfText(doc,text,x,y,width,size=9,color=pdfPalette.text,style="normal"){
  doc.setFont("helvetica",style);doc.setFontSize(size);pdfSetColor(doc,color);const lines=doc.splitTextToSize(String(text||""),width);doc.text(lines,x,y);return y+lines.length*size*.42;
}
function pdfAnswerStyle(answer){
  if(answer==="Sim")return {bg:pdfPalette.positiveBg,color:pdfPalette.positive};
  if(answer==="Não")return {bg:pdfPalette.negativeBg,color:pdfPalette.negative};
  if(answer==="Não sei ou Não se aplica")return {bg:pdfPalette.infoBg,color:pdfPalette.info};
  return {bg:pdfPalette.emptyBg,color:pdfPalette.empty};
}
const pdfGroupBackgrounds=[[255,231,147],[142,181,237],[238,138,160]];
function pdfPageShell(doc,groupIndex,showBrand=true,neutralBackground=false){
  doc.setFillColor(...(neutralBackground?pdfPalette.paper:pdfGroupBackgrounds[groupIndex]));doc.rect(0,0,210,297,"F");
  doc.setFillColor(255,255,255);doc.roundedRect(5.3,5.3,199.4,286.4,4.2,4.2,"F");
  if(showBrand&&activePdfAssets.brandMuted)pdfAddImage(doc,activePdfAssets.brandMuted,14.1,14.1,32.8,13.1,`arvi-muted-${doc.getNumberOfPages()}`);
}
function pdfBadgeRow(doc,checks,x,y,alias){
  const counts=reportCounts(checks),widths=[19.8,20.1,59.6,38.8];let cursor=x;
  reportAnswerTypes.forEach((type,typeIndex)=>{const icon=activePdfAssets.status?.[type.key],label=`(${counts[type.key]}) ${type.label}`;if(icon)pdfAddImage(doc,icon,cursor,y,4.2,4.2,`${alias}-${type.className}`);pdfText(doc,label,cursor+5.6,y+3.4,widths[typeIndex]-5.6,8.2,pdfPalette.text);cursor+=widths[typeIndex]+2.8});
}
function pdfMaterialRow(doc,material,x,y,alias){
  const valid=materialOptions.includes(material),style=valid?pdfAnswerStyle("Sim"):pdfAnswerStyle("Não respondida"),icon=activePdfAssets.status?.[valid?"Sim":"Não respondida"];
  if(icon)pdfAddImage(doc,icon,x,y,4.2,4.2,`${alias}-material`);
  pdfText(doc,valid?material:"Não informado",x+5.6,y+3.4,54,8.2,style.color,"bold");
}
function pdfSummaryPage(doc,groupIndex,page){
  doc.addPage();pdfPageShell(doc,groupIndex);const colors=pdfGroupColors(groupIndex);
  pdfText(doc,"Visão geral",14.1,50,181.8,8,pdfPalette.muted);pdfText(doc,reportGroups[groupIndex],14.1,61,181.8,14,pdfPalette.ink,"bold");let y=81.5;
  toolCards.slice(groupIndex*3,groupIndex*3+3).forEach((card,offset)=>{
    const index=groupIndex*3+offset;const checks=reportChecksForQuadrant(index);const counts=reportCounts(checks);
    doc.setFillColor(238,238,238);doc.rect(14.1,y,181.8,.7,"F");
    pdfText(doc,`${index+1}. ${card.title}`,14.1,y+10,181.8,12,pdfPalette.muted,"bold");pdfText(doc,card.question,14.1,y+23,181.8,8,colors.accent);
    const material=checks.find(check=>check.material)?.material;
    if(material){pdfText(doc,"Tipo selecionado",14.1,y+32,181.8,8,pdfPalette.text);pdfMaterialRow(doc,material,14.1,y+36,`summary-${groupIndex}-${offset}`);pdfText(doc,"Resultado",14.1,y+45,181.8,8,pdfPalette.text);pdfBadgeRow(doc,checks,14.1,y+49,`summary-${groupIndex}-${offset}`)}else{pdfText(doc,"Resultado",14.1,y+35,181.8,8,pdfPalette.text);pdfBadgeRow(doc,checks,14.1,y+42,`summary-${groupIndex}-${offset}`)}y+=groupIndex===2?66:63.1;
  });pdfFooter(doc,page);
}
function pdfDetailPage(doc,index,startPage){
  const card=toolCards[index],checks=reportChecksForQuadrant(index),groupIndex=Math.floor(index/3),colors=pdfGroupColors(groupIndex);let page=startPage-1;
  const firstQuestionNumber=1+toolCards.slice(0,index).reduce((total,_,previousIndex)=>total+reportChecksForQuadrant(previousIndex).length,0);
  if(!checks.length)return page;
  let y=0;
  const startFieldPage=()=>{
    doc.addPage();page++;pdfPageShell(doc,groupIndex,false,true);
    pdfText(doc,`Campo ${index+1}`,14.1,19.5,181.8,8,colors.accent);pdfText(doc,card.title,14.1,30,181.8,12,pdfPalette.ink,"bold");
    y=40.4;
  };
  startFieldPage();
  checks.forEach((check,checkIndex)=>{
    const questionNumber=index===8&&checkIndex===checks.length-1?null:firstQuestionNumber+checkIndex;
    const questionText=`${questionNumber===null?"":`${questionNumber}. `}${check.question}`;
    const questionLines=doc.splitTextToSize(questionText,181.8);
    const noteText=check.notes||"Nenhuma anotação.";const noteLines=doc.splitTextToSize(noteText,176.2);
    const noteHeight=Math.max(35.3,Math.min(150,noteLines.length*4.6+8));
    const badgeY=y+18.8+(questionLines.length-1)*4.8;
    const noteY=badgeY+11.7;
    const blockBottom=noteY+noteHeight;
    if(blockBottom>280&&y>40.4){pdfFooter(doc,page);startFieldPage()}
    const finalBadgeY=y+18.8+(questionLines.length-1)*4.8;
    const finalNoteY=finalBadgeY+11.7;
    doc.setFillColor(...colors.line);doc.rect(14.1,y,181.8,.7,"F");pdfText(doc,questionText,14.1,y+9.9,181.8,10,pdfPalette.text,"bold");
    if(check.material)pdfMaterialRow(doc,check.material,14.1,finalBadgeY,`detail-${index}-${checkIndex}`);else pdfBadgeRow(doc,[check],14.1,finalBadgeY,`detail-${index}-${checkIndex}`);
    doc.setFillColor(242,242,242);doc.roundedRect(14.1,finalNoteY,181.8,noteHeight,2.8,2.8,"F");pdfText(doc,noteText,16.9,finalNoteY+5.9,176.2,8,pdfPalette.text);
    y=finalNoteY+noteHeight+8.5;
  });pdfFooter(doc,page);return page;
}
async function downloadReportPdf(){
  const button=document.getElementById("export-tool");
  const originalLabel=button.textContent;
  button.disabled=true;
  button.textContent="Gerando PDF...";
  saveDetailState();
  const documentName=document.querySelector('[name="documento"]')?.value.trim()||"analise-arvi";
  const safeName=documentName.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()||"analise-arvi";
  try{
    if(!window.jspdf?.jsPDF)throw new Error("Gerador de PDF indisponível");
    const [brandLogo,brandMuted,ufrgs,elab,comAcesso,design,statusSuccess,statusError,statusInfo,statusEmpty]=await Promise.all([pdfTryRasterize("assets/final/brand.svg"),pdfTryRasterize("assets/final/brand.svg",false,.14),pdfTryRasterize("assets/final/logo-ufrgs.svg"),pdfTryRasterize("assets/final/logo-elab.svg"),pdfTryRasterize("assets/final/logo-com-acesso.svg"),pdfTryRasterize("assets/final/logo-design.png"),pdfTryRasterizeTinted("assets/final/status-success.svg","#156f33"),pdfTryRasterizeTinted("assets/final/status-error.svg","#9e1730"),pdfTryRasterizeTinted("assets/final/status-info.svg","#174f9e"),pdfTryRasterizeTinted("assets/final/radio-inactive.svg","#505050")]);
    activePdfAssets={brandLogo,brandMuted,ufrgs,elab,comAcesso,design,status:{"Sim":statusSuccess,"Não":statusError,"Não sei ou Não se aplica":statusInfo,"Não respondida":statusEmpty}};
    activePdfAssets.coverArt=await pdfTryRasterize("assets/report-cover-art.png");
    const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:"mm",format:"a4",orientation:"portrait",putOnlyUsedFonts:true,compress:true});let page=1;
    pdfBrand(doc);doc.setFillColor(228,228,228);doc.rect(5.3,34.5,199.4,1.5,"F");
    const values=Object.fromEntries([...document.querySelectorAll(".tool-header-form input")].map(input=>[input.name,input.value.trim()]));const meta=[["Nome do documento",values.documento],["Responsável pela criação/avaliação",values.responsavel],["Órgão responsável",values.orgao],["Data",values.data],["Identificador do material",values.identificador],["Tipo de material",selectedMaterialValue()]];
    meta.forEach(([label,value],i)=>{const y=45+i*14.5;pdfText(doc,label,5.3,y,199.4,8,pdfPalette.muted);pdfText(doc,value||"-",5.3,y+6,199.4,9,pdfPalette.ink)});
    doc.setFillColor(...pdfPalette.paper);doc.roundedRect(5.3,126,199.4,131.9,5,5,"F");pdfAddImage(doc,activePdfAssets.coverArt,5.3,126,199.4,131.9,"cover-art");pdfFooter(doc,page,true);
    reportGroups.forEach((_,groupIndex)=>pdfSummaryPage(doc,groupIndex,++page));
    toolCards.forEach((_,index)=>{page=pdfDetailPage(doc,index,page+1)});
    doc.save(`relatorio-${safeName}.pdf`);
    notice.textContent="PDF gerado e baixado.";
  }catch(error){
    console.error(error);
    notice.textContent="Não foi possível gerar o PDF. Tente novamente.";
  }finally{
    button.disabled=false;
    button.textContent=originalLabel;
  }
}
document.getElementById("export-tool").addEventListener("click",downloadReportPdf);
function updateTextareaState(textarea){
  if(!textarea)return;
  const wrapper=textarea.parentElement;
  const clear=wrapper.querySelector(".textarea-clear");
  const scroll=wrapper.querySelector(".textarea-scroll");
  const filled=textarea.value.length>0;
  const overflowing=textarea.scrollHeight>textarea.clientHeight+1;
  const active=wrapper.contains(document.activeElement);
  wrapper.classList.toggle("filled",filled);wrapper.classList.toggle("active",active);
  if(clear)clear.hidden=!filled||!active;
  if(!scroll)return;
  const thumb=scroll.firstElementChild;
  scroll.hidden=!overflowing||!active;
  if(overflowing){
    const trackHeight=scroll.clientHeight;
    const thumbHeight=Math.max(50,trackHeight*(textarea.clientHeight/textarea.scrollHeight));
    const maxTop=Math.max(0,trackHeight-thumbHeight);
    const ratio=textarea.scrollTop/Math.max(1,textarea.scrollHeight-textarea.clientHeight);
    thumb.style.height=`${thumbHeight}px`;thumb.style.transform=`translateY(${maxTop*ratio}px)`;
    const percent=Math.round(ratio*100);scroll.setAttribute("aria-valuenow",String(percent));scroll.setAttribute("aria-valuetext",`${percent}%`);
  }
}
toolPage.addEventListener("input",e=>{if(e.target.matches(".textarea-wrap textarea"))updateTextareaState(e.target)});
toolPage.addEventListener("scroll",e=>{if(e.target.matches(".textarea-wrap textarea"))updateTextareaState(e.target)},true);
toolPage.addEventListener("focusin",e=>{const wrapper=e.target.closest(".textarea-wrap");if(wrapper)updateTextareaState(wrapper.querySelector("textarea"))});
toolPage.addEventListener("focusout",e=>{const wrapper=e.target.closest(".textarea-wrap");if(wrapper)requestAnimationFrame(()=>updateTextareaState(wrapper.querySelector("textarea")))});
let scrollbarDrag=null;
toolPage.addEventListener("pointerdown",e=>{
  const track=e.target.closest(".textarea-scroll");if(!track)return;
  const textarea=track.parentElement.querySelector("textarea");const thumb=track.firstElementChild;
  const rect=track.getBoundingClientRect();const thumbRect=thumb.getBoundingClientRect();
  if(e.target!==thumb){
    const maxTop=Math.max(0,track.clientHeight-thumb.offsetHeight);
    const top=Math.max(0,Math.min(maxTop,e.clientY-rect.top-thumb.offsetHeight/2));
    textarea.scrollTop=(top/Math.max(1,maxTop))*(textarea.scrollHeight-textarea.clientHeight);updateTextareaState(textarea);
  }
  scrollbarDrag={track,textarea,startY:e.clientY,startScroll:textarea.scrollTop};track.setPointerCapture(e.pointerId);track.classList.add("dragging");e.preventDefault();
});
toolPage.addEventListener("pointermove",e=>{
  if(!scrollbarDrag)return;const {track,textarea,startY,startScroll}=scrollbarDrag;const thumb=track.firstElementChild;
  const maxTop=Math.max(1,track.clientHeight-thumb.offsetHeight);const maxScroll=Math.max(0,textarea.scrollHeight-textarea.clientHeight);
  textarea.scrollTop=startScroll+((e.clientY-startY)/maxTop)*maxScroll;updateTextareaState(textarea);
});
function stopScrollbarDrag(){if(!scrollbarDrag)return;scrollbarDrag.track.classList.remove("dragging");scrollbarDrag=null}
toolPage.addEventListener("pointerup",stopScrollbarDrag);toolPage.addEventListener("pointercancel",stopScrollbarDrag);
toolPage.addEventListener("wheel",e=>{
  const track=e.target.closest(".textarea-scroll");if(!track)return;e.preventDefault();
  const textarea=track.parentElement.querySelector("textarea");textarea.scrollTop+=e.deltaY;updateTextareaState(textarea);
},{passive:false});
toolPage.addEventListener("keydown",e=>{
  const track=e.target.closest(".textarea-scroll");if(!track)return;const textarea=track.parentElement.querySelector("textarea");
  const amounts={ArrowUp:-24,ArrowDown:24,PageUp:-textarea.clientHeight,PageDown:textarea.clientHeight,Home:-Infinity,End:Infinity};
  if(!(e.key in amounts))return;e.preventDefault();const amount=amounts[e.key];textarea.scrollTop=amount===Infinity?textarea.scrollHeight:amount===-Infinity?0:textarea.scrollTop+amount;updateTextareaState(textarea);
});
toolPage.addEventListener("click",e=>{
  const clear=e.target.closest(".textarea-clear");
  if(clear){const textarea=clear.parentElement.querySelector("textarea");textarea.value="";textarea.scrollTop=0;updateTextareaState(textarea);textarea.focus();return}
  const detailTabButton=e.target.closest("[data-detail-tab]");
  if(detailTabButton){saveDetailState();detailTab=Number(detailTabButton.dataset.detailTab);detailVariant="general";renderDetailWithoutMoving();return}
  const detailVariantButton=e.target.closest("[data-detail-variant]");
  if(detailVariantButton){saveDetailState();detailVariant=detailVariantButton.dataset.detailVariant;renderDetailWithoutMoving();return}
  const finalTabButton=e.target.closest("[data-final-tab]");
  if(finalTabButton){saveDetailState();finalSubTab=Number(finalTabButton.dataset.finalTab);renderDetailWithoutMoving();return}
  const help=e.target.closest(".help-button");
  if(help){const index=Number(help.closest(".quadrant-card").dataset.cardIndex);if(index<9)openDetail(index);return}
  const chip=e.target.closest(".material-chips button,.detail-chips button");if(!chip)return;
  chip.parentElement.querySelectorAll("button").forEach(button=>{const selected=button===chip;button.classList.toggle("selected",selected);button.setAttribute("aria-pressed",String(selected))});
});
renderToolCards();
updateOverviewCounts();
renderAccordions();




