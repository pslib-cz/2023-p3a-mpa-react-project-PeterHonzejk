# Echoes of Gwent

## Téma

Echoes of Gwent je webová aplikace založená na React frameworku, která přináší fanouškům Zaklínače digitální verzi oblíbené karetní hry Gwent. Tato aplikace nabízí interaktivní prostředí, ve kterém si hráči mohou zahrát Gwent proti umělé inteligenci nebo v režimu pro jednoho hráče, kde si postupně vylepšují své balíčky a strategie proti různým protivníkům. Hra je designována tak, aby co nejvěrněji reflektovala pravidla a atmosféru Gwentu, jak je známe ze světa Zaklínače, a zároveň využívala moderní webové technologie pro plynulý a vizuálně atraktivní herní zážitek.

## Účel a význam

Cílem Echoes of Gwent je poskytnout hráčům poutavou a strategicky bohatou hru Gwent, která je přístupná online bez nutnosti instalace speciálního softwaru. Aplikace slibuje podpořit komunitu fanoušků Zaklínače tím, že jim umožní zahrát si jejich oblíbenou hru kdykoli a kdekoliv, s přidanou hodnotou v podobě možnosti vyzvat umělou inteligenci nebo se zapojit do turnajů a výzev, které aplikace pravidelně nabízí.

## Funkcionalita

- Herní režimy: Solo proti AI nebo tréninkový mód pro zdokonalování strategií a balíčků.
- Vylepšení balíčků: Možnost sbírat karty a vylepšovat svůj balíček skrze výhry nebo výměnu.
- Interaktivní tutoriál: Učení pravidel a strategií Gwentu skrze vedený tutoriál.
- Turnaje a výzvy: Pravidelné eventy pro testování dovedností a získávání unikátních odměn.
- React Router pro navigaci: Snadný přechod mezi různými částmi aplikace.
- Local Storage pro ukládání progressu: Možnost kdykoliv pokračovat ve hře nebo se vrátit k nedokončenému duelu.

## Odkazy pro vývoj

- figma návrh stránek aplikace
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
