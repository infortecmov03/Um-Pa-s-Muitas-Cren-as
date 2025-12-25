import json
from datetime import date, timedelta

def obter_lista_base_versiculos():
    """Retorna uma lista de dicionários, cada um contendo a referência e o texto de um versículo."""
    # Esta lista pode ser expandida com quantos versículos desejar.
    # O script irá circular por esta lista para preencher o ano inteiro.
    return [
        # Temas Fundamentais
        {"referencia": "Gênesis 1:1", "texto": "No princípio, criou Deus os céus e a terra."},
        {"referencia": "João 3:16", "texto": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."},
        {"referencia": "Romanos 8:28", "texto": "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito."},
        {"referencia": "Salmos 23:1", "texto": "O Senhor é o meu pastor; nada me faltará."},
        {"referencia": "Provérbios 3:5-6", "texto": "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas."},

        # Versículos para Debate (já usados antes)
        {"referencia": "Êxodo 20:5", "texto": "Não te curvarás a elas nem as servirás; porque eu, o Senhor teu Deus, sou Deus zeloso, que visito a iniquidade dos pais nos filhos até a terceira e quarta geração daqueles que me odeiam."},
        {"referencia": "Tiago 2:26", "texto": "Porque, assim como o corpo sem o espírito está morto, assim também a fé sem obras é morta."},
        {"referencia": "1 Timóteo 2:12", "texto": "Não permito, porém, que a mulher ensine, nem use de autoridade sobre o marido, mas que esteja em silêncio."},
        {"referencia": "Malaquias 3:10", "texto": "Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa, e depois fazei prova de mim nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu, e não derramar sobre vós uma bênção tal até que não haja lugar suficiente para a recolherdes."},

        # Versículos de Sabedoria e Conduta
        {"referencia": "Mateus 7:12", "texto": "Portanto, tudo o que vós quereis que os homens vos façam, fazei-lho também vós, porque esta é a lei e os profetas."},
        {"referencia": "Gálatas 5:22-23", "texto": "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança. Contra estas coisas não há lei."},
        {"referencia": "Efésios 4:32", "texto": "Antes sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo."},
        
        # Adicione mais versículos aqui para aumentar a variedade
    ]

def gerar_arquivo_json(ano=2025):
    """Gera o arquivo versiculos.json para um ano específico."""
    print(f"A iniciar a geração de versículos para o ano {ano}...")
    
    dados_versiculos = []
    data_inicial = date(ano, 1, 1)
    
    # Determina se o ano é bissexto para ter 366 dias
    num_dias_no_ano = 366 if (ano % 4 == 0 and ano % 100 != 0) or (ano % 400 == 0) else 365
    
    lista_base = obter_lista_base_versiculos()
    if not lista_base:
        print("Erro: A lista de versículos base está vazia.")
        return

    for i in range(num_dias_no_ano):
        data_atual = data_inicial + timedelta(days=i)
        string_data = data_atual.strftime("%Y-%m-%d")
        
        # Usa o operador de módulo para repetir a lista de versículos base
        info_versiculo = lista_base[i % len(lista_base)]

        objeto_versiculo = {
            "id": string_data,
            "referencia": info_versiculo["referencia"],
            "texto": info_versiculo["texto"],
            "analise_inicial": "Este versículo levanta questões importantes e tem sido interpretado de várias formas ao longo da história. Qual é a sua perspectiva? Partilhe a sua análise, dúvida ou testemunho na secção de comentários."
        }
        dados_versiculos.append(objeto_versiculo)

    # Salva os dados no arquivo JSON
    nome_arquivo = 'versiculos.json'
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        # O indent=4 cria um arquivo formatado e legível
        json.dump(dados_versiculos, f, indent=4, ensure_ascii=False)
    
    print(f"Sucesso! {len(dados_versiculos)} versículos foram gerados e salvos em '{nome_arquivo}'.")

if __name__ == '__main__':
    # Para gerar o arquivo, execute este script diretamente no terminal: python gerar_versiculos.py
    gerar_arquivo_json(2026)
