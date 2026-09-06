# ARVI - Ferramenta visual interativa

Ferramenta para análise de materiais informativos de saúde, com nove campos, 26 perguntas numeradas, uma pergunta complementar, anotações persistentes durante a navegação e geração automática de relatório em PDF.

## Publicação online

O projeto é estático e pode ser publicado diretamente no GitHub Pages, Netlify, Cloudflare Pages ou serviço equivalente.

Arquivos de entrada:

- `index.html`
- `styles.css`
- `script.js`
- pasta `assets/`

Não é necessário compilar nem instalar dependências. Mantenha a estrutura das pastas ao enviar ao repositório.

### GitHub Pages

Publique o conteúdo desta pasta na raiz do repositório. Todos os caminhos de imagens, vetores, fontes e bibliotecas são relativos, portanto o projeto também funciona quando o endereço inclui o nome do repositório, por exemplo `https://usuario.github.io/arvi/`.

Os assets estão organizados por prefixos semânticos dentro de `assets/`. Consulte `assets/README.md` antes de substituir ou acrescentar arquivos.

## Teste local

Use um servidor HTTP local. Abrir apenas pelo protocolo `file://` pode impedir o carregamento das fontes usadas no PDF.

Exemplo com Python:

```bash
python -m http.server 4173
```

Depois acesse `http://localhost:4173/`.

## Relatório em PDF

O botão **Exportar avaliação em PDF** gera e baixa um relatório com capa, três páginas de resumo (uma para cada grupo de campos) e o detalhamento das perguntas. O arquivo incorpora Noto Sans JP Regular e Bold, usa a marca ARVI e os ativos institucionais locais e registra as contagens reais de cada resposta.
