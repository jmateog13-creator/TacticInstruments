'use strict';
// ================================================================
//  SYMPHONIC TACTICS — game.js
//  AulaTech | Javier | 2026
//  Motor: Canvas2D · Isométrico · Painter's Algorithm · 60 fps
// ================================================================

// ── INSTRUMENTOS_DB ──────────────────────────────────────────────
const INSTRUMENTOS_DB = {
  'Guitarra Clàssica':  { familia:'Corda',       tempo:2,  volumen:300,  resonancia:200,  movimiento:6, rango:1,       rol:'Danys d\'entrada' },
  'Violí':              { familia:'Corda',       tempo:2,  volumen:300,  resonancia:200,  movimiento:6, rango:1,       rol:'Tropa base àgil' },
  'Viola':              { familia:'Corda',       tempo:3,  volumen:200,  resonancia:500,  movimiento:5, rango:1,       rol:'Defensa mitjana' },
  'Violoncel':          { familia:'Corda',       tempo:4,  volumen:400,  resonancia:500,  movimiento:4, rango:1,       rol:'Lluitador equilibrat' },
  'Arpa':               { familia:'Corda',       tempo:5,  volumen:300,  resonancia:800,  movimiento:3, rango:1,       rol:'Mur defensiu' },
  'Contrabaix':         { familia:'Corda',       tempo:6,  volumen:300,  resonancia:1000, movimiento:2, rango:1,       rol:'Tanc principal' },
  'Piano':              { familia:'Corda',       tempo:8,  volumen:700,  resonancia:1000, movimiento:1, rango:1,       rol:'Rematador pesat' },

  'Flauta Travessera':  { familia:'Vent',        tempo:1,  volumen:200,  resonancia:100,  movimiento:7, rango:3,       rol:'Obertura ràpida' },
  'Oboè':               { familia:'Vent',        tempo:2,  volumen:400,  resonancia:100,  movimiento:6, rango:3,       rol:'Atac punxant, fràgil' },
  'Clarinet':           { familia:'Vent',        tempo:3,  volumen:400,  resonancia:300,  movimiento:5, rango:3,       rol:'Tropa agressiva' },
  'Trompeta':           { familia:'Vent',        tempo:4,  volumen:700,  resonancia:200,  movimiento:4, rango:3,       rol:'Dany explosiu (Canó)' },
  'Saxofon':            { familia:'Vent',        tempo:4,  volumen:500,  resonancia:400,  movimiento:4, rango:3,       rol:'Lluitador versàtil' },
  'Fagot':              { familia:'Vent',        tempo:5,  volumen:400,  resonancia:700,  movimiento:3, rango:3,       rol:'Suport pesat' },
  'Trompa':             { familia:'Vent',        tempo:5,  volumen:500,  resonancia:600,  movimiento:3, rango:3,       rol:'Metall equilibrat' },
  'Trombó':             { familia:'Vent',        tempo:6,  volumen:800,  resonancia:500,  movimiento:2, rango:3,       rol:'Destructor de defenses' },
  'Tuba':               { familia:'Vent',        tempo:7,  volumen:500,  resonancia:1000, movimiento:2, rango:3,       rol:'Mur acústic gegant' },
  'Orgue':              { familia:'Vent',        tempo:10, volumen:1000, resonancia:1100, movimiento:1, rango:4,       rol:'Cap Final' },

  'Triangle':           { familia:'Percussió',   tempo:1,  volumen:100,  resonancia:200,  movimiento:7, rango:'Àrea',  rol:'Utilitat barata' },
  'Pandereta':          { familia:'Percussió',   tempo:2,  volumen:200,  resonancia:300,  movimiento:6, rango:'Àrea',  rol:'Defensa lleugera' },
  'Xilòfon':            { familia:'Percussió',   tempo:3,  volumen:500,  resonancia:200,  movimiento:5, rango:1,       rol:'Atac precís' },
  'Metal·lòfon':        { familia:'Percussió',   tempo:4,  volumen:600,  resonancia:300,  movimiento:4, rango:1,       rol:'Dany contundent' },
  'Plats (Crash)':      { familia:'Percussió',   tempo:5,  volumen:900,  resonancia:200,  movimiento:3, rango:'Àrea',  rol:'Atac suïcida massiu' },
  'Bombo':              { familia:'Percussió',   tempo:6,  volumen:400,  resonancia:900,  movimiento:2, rango:1,       rol:'Absorbidor de dany' },
  'Timbales':           { familia:'Percussió',   tempo:7,  volumen:700,  resonancia:800,  movimiento:2, rango:1,       rol:'Tropa d\'elit' },

  'Teclat MIDI':        { familia:'Electrònics', tempo:3,  volumen:300,  resonancia:400,  movimiento:5, rango:2,       rol:'Suport flexible' },
  'Sintetitzador':      { familia:'Electrònics', tempo:4,  volumen:500,  resonancia:400,  movimiento:4, rango:2,       rol:'Dany constant' },
  'Baix Elèctric':      { familia:'Electrònics', tempo:5,  volumen:400,  resonancia:700,  movimiento:3, rango:1,       rol:'Base rítmica sòlida' },
  'Guitarra Elèctrica': { familia:'Electrònics', tempo:6,  volumen:800,  resonancia:500,  movimiento:2, rango:2,       rol:'Dany perforant' },
};

// ── ORGANOLOGÍA ──────────────────────────────────────────────────
const ORG_INFO = {
  'Guitarra Clàssica':  'Cordòfon polsat de 6 cordes de niló. Va néixer a Espanya al s. XIX. El seu timbre càlid i ressonant el fa indispensable en la música flamenca, clàssica i popular. Es toca amb els dits directament sobre les cordes.',
  'Violí':              'Cordòfon fregat de 4 cordes (Sol–Re–La–Mi). El més agut de la família d\'arc. Pedra angular de l\'orquestra simfònica des del s. XVII. Un violí pot produir més de 10.000 matisos de dinàmica diferents.',
  'Viola':              'Cordòfon fregat, quinta més greu que el violí. Timbre profund i aterriolat, freqüentment descrit com "la veu humana" de la corda. Clau en el teixit harmònic de l\'orquestra.',
  'Violoncel':          'Cordòfon de 4 cordes, 2a més greu de la família d\'arc. La seva extensió cobreix exactament el rang de la veu humana. Combina potència de solista amb funció de baix harmònic. Icona de la música de cambra.',
  'Arpa':               'Cordòfon puntejat de 47 cordes i 7 pedals que permeten canviar de tonalitat. Un dels instruments més antics de la humanitat (5.000 anys). Produeix acords, glissandos i harmònics impossibles en altres instruments.',
  'Contrabaix':         'El cordòfon més gran i greu de la família d\'arc. Les seves cordes vibren tan lent que se senten com a pols físic. Àncora harmònica de tota l\'orquestra i columna vertebral del jazz i el funk.',
  'Piano':              'Cordòfon percutit amb 88 tecles que activen martells sobre cordes. L\'instrument més complet: cobreix gairebé tot el rang de l\'orquestra. Combina melodia, harmonia i ritme en un sol executant.',
  'Flauta Travessera':  'Aeròfon transversal de metall o fusta. Produeix so en bufar sobre l\'embocadura lateral. Extensió: Do4–Re7. L\'instrument més àgil de l\'orquestra, capaç d\'executar els passatges més veloços.',
  'Oboè':               'Aeròfon de doble llengüeta, timbre penetrant i nasal inconfusible. És l\'instrument que afina tota l\'orquestra amb el seu La4. Requereix un control extraordinari de l\'aire i l\'embocadura per mantenir l\'afinació.',
  'Clarinet':           'Aeròfon de llengüeta simple amb registre de més de 3 octaves i 4 colors de timbre diferents. Transpositor en Si♭. Del jazz al repertori clàssic: considerat l’instrument de vent fusta més versàtil.',
  'Trompeta':           'Aeròfon de metall i pistons. L\'instrument de vent més brillant i tallant de l\'orquestra: pot projectar el so a més de 100 metres. Protagonista del jazz, la fanfàrria i els himnes èpics.',
  'Saxofon':            'Aeròfon de metall amb llengüeta simple, inventat per Adolphe Sax a Bèlgica (1840). Únic instrument de metall que sona com vent fusta. Fonamental en jazz, big band, música de cinema i rock.',
  'Fagot':              'L\'aeròfon de doble llengüeta més greu del vent fusta. Els seus 2,5 metres de tub doblat sobre si mateix produeixen un timbre fosc i opac únic. Rol de baix-tenor harmònic a l\'orquestra.',
  'Trompa':             'Aeròfon de metall amb tub cònic enrotllat de 4–5 metres de longitud. L\'únic instrument que uneix la secció de fusta i metall en timbre. Produeix un so rodó i envolupant sense igual.',
  'Trombó':             'Aeròfon de metall amb vara corredissa que permet el glissando continu: l\'únic instrument d\'orquestra amb aquesta capacitat. Potència sonora i gravetat que pot dominar tota la secció de metall.',
  'Tuba':               'L\'aeròfon de metall més greu i voluminós de l\'orquestra. La seva campana pot superar el metre de diàmetre. Àncora acústica de tota la secció de metall amb una presència física irresistible.',
  'Orgue':              'Aeròfon de teclat i tubs de fins a 10 metres d\'alçada. L\'instrument més complex i polifònic mai construït per l\'ésser humà. Registre d\'8+ octaves. Anomenat amb raó "el rei dels instruments".',
  'Triangle':           'Idiòfon de percussió: una vareta d\'acer doblada en triangle. Malgrat la seva mida diminuta, el seu so agut i penetrant pot tallar el so de tota l\'orquestra en fortissimo. El poder del detall.',
  'Pandereta':          'Membranòfon amb platerets metàl·lics (sonalles) al cèrcol. Instrument rítmic omnipresent a la música folklòrica mediterrània, llatina i àrab. Simple en aparença, virtuós en mans expertes.',
  'Xilòfon':            'Idiòfon de percussió amb làmines de fusta de diferent longitud i caixes de ressonància. Timbre sec i articulat, sense sostingut. Freqüent en música de cinema per evocar misteri, el macabre o el còmic.',
  'Metal·lòfon':        'Idiòfon de làmines metàl·liques afinades, similar al xilòfon però amb metall. Timbre més brillant i amb major sostingut. Peça fonamental de l\'educació musical: és l\'instrument Orff per excel·lència.',
  'Plats (Crash)':      'Idiòfons de metall (bronze) percutits entre si amb força. Un plateret pot arribar a 120 dB — el límit del dolor humà. Es reserven per als moments de màxim impacte dramàtic de l\'obra.',
  'Bombo':              'Membranòfon cilíndric de gran diàmetre (60–90 cm). El seu cop genera freqüències tan baixes que se senten físicament al pit abans d\'escoltar-se. El pols físic de tota l\'orquestra.',
  'Timbales':           'Membranòfons d\'afinació determinada mitjançant pedal. S\'usen 2–5 unitats en orquestra simfònica. L\'únic instrument de percussió amb altura musical definida que pot reafinar durant la interpretació.',
  'Teclat MIDI':        'Controlador electrònic que envia missatges MIDI (Musical Instrument Digital Interface, 1983). No produeix so propi: és el "cervell" que activa sintetitzadors i samplers. Un teclat MIDI pot sonar com qualsevol instrument del món.',
  'Sintetitzador':      'Instrument electrònic que genera so mitjançant oscil·ladors, filtres i amplificadors. Inventat per Robert Moog als anys 60. Ha definit la música pop, electrònica i de cinema. Possibilitats tímbriques pràcticament infinites.',
  'Baix Elèctric':      'Cordòfon amplificat de 4 cordes, creat per Leo Fender el 1951. Va substituir el contrabaix a la música popular Pel seu major volum i manejabilitat. Columna vertebral rítmica i harmònica del pop, rock i funk.',
  'Guitarra Elèctrica': 'Cordòfon amplificat la pastilla electromagnètica del qual converteix la vibració de la corda en senyal elèctric. Inventada als anys 30. L\'instrument que més ha transformat la música popular del s. XX.',
};

// ── CONFIG ───────────────────────────────────────────────────────
const COLS       = 10;
const ROWS       = 6;
const TILE_W     = 120;  // Width of the diamond
const TILE_H     = 60;   // Height of the diamond (2:1 ratio)
const TILE_DEPTH = 0;    

const FAMILY_COLORS = {
  'Corda':        '#C47A2B',
  'Vent':         '#C9960A',
  'Percussió':    '#5C6B73',
  'Electrònics':  '#00CED1',
};

const TEAM_COLORS = ['#4A8FFF', '#FF4455'];

const FAMILY_ICONS = {
  'Corda':       '🎻',
  'Vent':        '🎺',
  'Percussió':   '🥁',
  'Electrònics': '🎹',
};

// ── ASSETS MAPPING (High-Res Sprites) ───────────────────────────
const INSTRUMENT_ASSETS = {
  'Guitarra Clàssica':  'guitarrae',
  'Violí':              'violine',
  'Viola':              'violae',
  'Violoncel':          'celloe',
  'Arpa':               'arpae',
  'Contrabaix':         'contrabajoe',
  'Piano':              'pianoe',
  'Flauta Travessera':  'flautatraveserae',
  'Oboè':               'oboee',
  'Clarinet':           'clarinete',
  'Trompeta':           'trompetae',
  'Saxofon':            'saxofone',
  'Fagot':              'fagote',
  'Trompa':             'trompae',
  'Trombó':             'trombone',
  'Tuba':               'tubae',
  'Orgue':              'organoe',
  'Triangle':           'trianguloe',
  'Pandereta':          'panderetae',
  'Xilòfon':            'xilofonoe',
  'Metal·lòfon':        'metalofonoe',
  'Plats (Crash)':      'platose',
  'Bombo':              'bomboe',
  'Timbales':           'timbalese',
  'Teclat MIDI':        'tecladomidie',
  'Sintetitzador':      'sintetizadore',
  'Baix Elèctric':      'bajoelectricoe',
  'Guitarra Elèctrica': 'guitarraelectricae',
};

const _SPRITES = new Map();

function getAssetPath(instrument, team) {
  const base = INSTRUMENT_ASSETS[instrument] || 'violine';
  const suffix = team === 0 ? '1' : '2';
  
  // Handle specific typos in assets (matching actual filenames in the filesystem)
  if (instrument === 'Clarinet' && team === 0)       return 'img/personajes/clarientee1.png';
  if (instrument === 'Clarinet' && team === 1)       return 'img/personajes/clarinetee2.png';
  if (instrument === 'Tuba' && team === 1)           return 'img/personajes/tunae2.png';
  if (instrument === 'Bombo' && team === 1)          return 'img/personajes/bomobe2.png';
  if (instrument === 'Baix Elèctric' && team === 1)  return 'img/personajes/bhajoelectricoe2.png';
  
  return `img/personajes/${base}${suffix}.png`;
}

function preloadLevelAssets(level) {
  for (const p of level.placements) {
    let instr = p.instrumento;
    if (instr === 'ReyArcano') instr = level.bossInstrument;
    const path1 = getAssetPath(instr, 0);
    const path2 = getAssetPath(instr, 1);
    [path1, path2].forEach(path => {
      if (!_SPRITES.has(path)) {
        const img = new Image();
        img.src = path;
        _SPRITES.set(path, img);
      }
    });
  }
}

// ── PROGRESSION SYSTEM ─────────────────────────────────────────────
const PROGRESSION_KEY = 'symphonic_tactics_progress';

const PROGRESSION = {
  musicoins: 0,
  unlockedLevels: ['duel-strings', 'winds-vs-strings', 'full-orchestra'],
  completedLevels: [],

  rewards: {
    'duel-strings': 15,
    'winds-vs-strings': 25,
    'full-orchestra': 40,
    'five-fists': 60,
    'echoes-of-war': 80,
    'full-orchestra-ii': 100,
    'clash-of-families': 120,
    'the-grand-ensemble': 150,
    'final-crescendo': 200,
    'symphony-of-heroes': 300,
  },

  levelTitles: {
    'duel-strings': 'El Duel de Cordes',
    'winds-vs-strings': 'Vent contra Corda',
    'full-orchestra': 'Batalla Orquestral Completa',
    'five-fists': 'Cinc Punys',
    'echoes-of-war': 'Ecos de la Guerra',
    'full-orchestra-ii': 'Orquestra Completa II',
    'clash-of-families': 'Xoc de Famílies',
    'the-grand-ensemble': 'El Gran Assaig',
    'final-crescendo': 'Crescendo Final',
    'symphony-of-heroes': 'Simfonia d\'Herois',
  }
};

function loadProgression() {
  try {
    const saved = localStorage.getItem(PROGRESSION_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      PROGRESSION.musicoins = data.musicoins || 0;
      PROGRESSION.unlockedLevels = data.unlockedLevels || ['duel-strings'];
      PROGRESSION.completedLevels = data.completedLevels || [];
    }
  } catch (e) {
    console.warn('No es va poder carregar progressió:', e);
  }
}

function saveProgression() {
  try {
    const data = {
      musicoins: PROGRESSION.musicoins,
      unlockedLevels: PROGRESSION.unlockedLevels,
      completedLevels: PROGRESSION.completedLevels,
    };
    localStorage.setItem(PROGRESSION_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('No es va poder guardar progressió:', e);
  }
}

function earnMusicoins(amount) {
  PROGRESSION.musicoins += amount;
  saveProgression();
}

function completeLevel(levelId) {
  if (!PROGRESSION.completedLevels.includes(levelId)) {
    PROGRESSION.completedLevels.push(levelId);
    const reward = PROGRESSION.rewards[levelId] || 10;
    earnMusicoins(reward);

    // Unlock next level (by index in LEVELS array)
    const currentIndex = LEVELS.findIndex(l => l.id === levelId);
    if (currentIndex >= 0 && currentIndex + 1 < LEVELS.length) {
      const nextLevel = LEVELS[currentIndex + 1];
      if (nextLevel && !PROGRESSION.unlockedLevels.includes(nextLevel.id)) {
        PROGRESSION.unlockedLevels.push(nextLevel.id);
        saveProgression();
      }
    }
    return true;
  }
  return false;
}

function isLevelUnlocked(levelId) {
  return PROGRESSION.unlockedLevels.includes(levelId);
}

function isLevelCompleted(levelId) {
  return PROGRESSION.completedLevels.includes(levelId);
}

function getAvailableLevels() {
  return LEVELS.filter(l => isLevelUnlocked(l.id));
}

// ── CAMPAIGN LEVELS (10 total) ───────────────────────────────────
const LEVELS = [
  {
    id: 'duel-strings',
    title: 'El Duel de Cordes',
    description: 'Introducció a l\'enfrontament tàctic. Dos violins mesuren els seus temps al camp de batalla. Objectiu: entendre el tempo com a iniciativa.',
    objectives: 'Comprèn com l\'ordre d\'actuació es determina per l\'atribut "tempo". La unitat amb menor tempo actua primer.',
    team1Name: 'SECCIÓ DE CORDA I',
    team2Name: 'SECCIÓ DE CORDA II',
    placements: [
      { instrumento: 'Violí', col: 0, row: 1, team: 0 },
      { instrumento: 'Viola',  col: 0, row: 3, team: 0 },
      { instrumento: 'Violí', col: 9, row: 2, team: 1 },
      { instrumento: 'Viola',  col: 9, row: 4, team: 1 },
    ],
    winCondition: 'Elimina les unitats enemigues',
    deployBudget: 6,
  },
  {
    id: 'winds-vs-strings',
    title: 'Vent contra Corda',
    description: 'L\'agilitat de la flauta contra la potència del contrabaix. Aprèn a posicionar-te i atacar segons el rang del teu instrument.',
    objectives: 'El rang determina quines caselles pots atacar. Rang 1: cos a cos. Rang 3: distància.',
    team1Name: 'VENT FUSTA',
    team2Name: 'CORDA GRAU',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Oboè',              col: 1, row: 1, team: 0 },
      { instrumento: 'Contrabaix',        col: 9, row: 5, team: 1 },
      { instrumento: 'Violoncel',         col: 8, row: 4, team: 1 },
    ],
    winCondition: 'Derrota totes les unitats rivals',
    deployBudget: 10,
  },
  {
    id: 'full-orchestra',
    title: 'Batalla Orquestral Completa',
    description: 'Caos simfònic: totes les famílies al camp. Combina moviment, rang i timing per guanyar.',
    objectives: 'Mestratge total: gestiona la iniciativa, el posicionament i els diferents rangs de cada grup instrumental.',
    team1Name: 'EQUIP BLAU',
    team2Name: 'EQUIP VERMELL',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Bombo',              col: 0, row: 4, team: 0 },
      { instrumento: 'Saxofon',            col: 2, row: 2, team: 0 },
      { instrumento: 'Oboè',      col: 9, row: 0, team: 1 },
      { instrumento: 'Trompeta',  col: 8, row: 1, team: 1 },
      { instrumento: 'Pandereta',  col: 9, row: 5, team: 1 },
      { instrumento: 'Xilòfon',   col: 7, row: 4, team: 1 },
    ],
    winCondition: 'Elimina tots els enemics',
    deployBudget: 12,
  },
  {
    id: 'five-fists',
    title: 'Cinc Punys',
    description: 'La formació s\'expandeix. 5 cavallers per bàndol aprenen a envoltar i flanquejar.',
    objectives: 'Coordina 5 unitats. El posicionament és clau: envolta l\'enemic pels flancs.',
    team1Name: 'ESCUADRA BLAVA',
    team2Name: 'ESCUADRA VERMELLA',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Clarinet',          col: 2, row: 2, team: 0 },
      { instrumento: 'Pandereta',          col: 0, row: 3, team: 0 },
      { instrumento: 'Teclat MIDI',       col: 1, row: 4, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 1, team: 1 },
      { instrumento: 'Trompeta',    col: 8, row: 2, team: 1 },
      { instrumento: 'Saxofon',     col: 7, row: 3, team: 1 },
      { instrumento: 'Bombo',       col: 9, row: 4, team: 1 },
      { instrumento: 'Sintetitzador',col: 8, row: 5, team: 1 },
    ],
    winCondition: 'Elimina les 5 unitats enemigues',
    difficulty: 2,
    deployBudget: 18,
  },
  {
    id: 'echoes-of-war',
    title: 'Ecos de la Guerra',
    description: 'Un riu de so divideix el camp. Només es pot creuar per ponts (columnes 4 i 5).',
    objectives: 'Domina la geografia. Bloqueja el pas enemic controlant els ponts. El moviment és limitat.',
    team1Name: 'VANGUÀRDIA BLAVA',
    team2Name: 'VANGUÀRDIA VERMELLA',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Viola',              col: 0, row: 2, team: 0 },
      { instrumento: 'Clarinet',          col: 1, row: 4, team: 0 },
      { instrumento: 'Xilòfon',           col: 2, row: 5, team: 0 },
      { instrumento: 'Teclat MIDI',       col: 0, row: 5, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Trompeta',    col: 8, row: 1, team: 1 },
      { instrumento: 'Trompa',      col: 9, row: 2, team: 1 },
      { instrumento: 'Saxofon',     col: 8, row: 4, team: 1 },
      { instrumento: 'Metal·lòfon', col: 7, row: 5, team: 1 },
      { instrumento: 'Sintetitzador',col: 9, row: 5, team: 1 },
    ],
    winCondition: 'Controla els ponts i elimina l\'enemic',
    difficulty: 3,
    deployBudget: 20,
  },
  {
    id: 'full-orchestra-ii',
    title: 'Orquestra Completa II',
    description: 'La formació definitiva: 7 cavallers per bàndol, totes les famílies al camp.',
    objectives: 'Gestiona 7 unitats simultàniament. Prioritza objectius: elimina rangs 1 primer.',
    team1Name: 'ORQUESTRA BLAVA',
    team2Name: 'ORQUESTRA VERMELLA',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Viola',              col: 0, row: 2, team: 0 },
      { instrumento: 'Clarinet',          col: 1, row: 3, team: 0 },
      { instrumento: 'Trompeta',          col: 2, row: 4, team: 0 },
      { instrumento: 'Pandereta',          col: 0, row: 5, team: 0 },
      { instrumento: 'Sintetitzador',     col: 1, row: 5, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Saxofon',     col: 8, row: 1, team: 1 },
      { instrumento: 'Fagot',       col: 9, row: 2, team: 1 },
      { instrumento: 'Trombó',      col: 8, row: 3, team: 1 },
      { instrumento: 'Bombo',       col: 9, row: 4, team: 1 },
      { instrumento: 'Timbales',    col: 7, row: 5, team: 1 },
      { instrumento: 'Guitarra Elèctrica', col: 9, row: 5, team: 1 },
    ],
    winCondition: 'Elimina les 7 unitats rivals',
    difficulty: 3,
    deployBudget: 30,
  },
  {
    id: 'clash-of-families',
    title: 'Xoc de Famílies',
    description: '8 instruments per equip, incloent-hi un tanc pesat (Piano o Contrabaix).',
    objectives: 'Aprofita el tanc per absorbir dany i protegir les unitats de suport.',
    team1Name: 'BATALLÓ BLAU',
    team2Name: 'BATALLÓ VERMELL',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Clarinet',          col: 2, row: 2, team: 0 },
      { instrumento: 'Piano',             col: 0, row: 3, team: 0 },
      { instrumento: 'Saxofon',           col: 1, row: 4, team: 0 },
      { instrumento: 'Xilòfon',           col: 2, row: 5, team: 0 },
      { instrumento: 'Baix Elèctric',     col: 0, row: 5, team: 0 },
      { instrumento: 'Teclat MIDI',       col: 1, row: 5, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Trompeta',    col: 8, row: 1, team: 1 },
      { instrumento: 'Trombó',      col: 9, row: 2, team: 1 },
      { instrumento: 'Contrabaix',  col: 7, row: 3, team: 1 },
      { instrumento: 'Fagot',       col: 8, row: 4, team: 1 },
      { instrumento: 'Bombo',       col: 9, row: 5, team: 1 },
      { instrumento: 'Timbales',    col: 8, row: 5, team: 1 },
      { instrumento: 'Guitarra Elèctrica', col: 7, row: 5, team: 1 },
    ],
    winCondition: 'Derrota el tanc enemic primer',
    difficulty: 4,
    deployBudget: 35,
  },
  {
    id: 'the-grand-ensemble',
    title: 'El Gran Assaig',
    description: 'Dues orquestres completes de 9 instruments. Victòria per sincronització.',
    objectives: 'Usa el tempo al teu favor. Ataca en l\'ordre d\'iniciativa correcte.',
    team1Name: 'GRAN BLAU',
    team2Name: 'GRAN VERMELL',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Viola',              col: 0, row: 2, team: 0 },
      { instrumento: 'Violoncel',          col: 1, row: 3, team: 0 },
      { instrumento: 'Clarinet',          col: 2, row: 4, team: 0 },
      { instrumento: 'Trompeta',          col: 0, row: 4, team: 0 },
      { instrumento: 'Pandereta',          col: 1, row: 5, team: 0 },
      { instrumento: 'Sintetitzador',     col: 2, row: 5, team: 0 },
      { instrumento: 'Baix Elèctric',     col: 0, row: 5, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Saxofon',     col: 8, row: 1, team: 1 },
      { instrumento: 'Fagot',       col: 9, row: 2, team: 1 },
      { instrumento: 'Trompa',      col: 8, row: 3, team: 1 },
      { instrumento: 'Trombó',      col: 7, row: 4, team: 1 },
      { instrumento: 'Tuba',        col: 9, row: 4, team: 1 },
      { instrumento: 'Bombo',       col: 8, row: 5, team: 1 },
      { instrumento: 'Timbales',    col: 7, row: 5, team: 1 },
      { instrumento: 'Guitarra Elèctrica', col: 9, row: 5, team: 1 },
    ],
    winCondition: 'Elimina els 9 enemics',
    difficulty: 4,
    deployBudget: 40,
  },
  {
    id: 'final-crescendo',
    title: 'Crescendo Final',
    description: '10 cavallers per bàndol, incloent-hi dos caps (Orgue i Piano).',
    objectives: 'Prioritza els caps enemics però protegeix els teus propis.',
    team1Name: 'ORQUESTRA FINAL BLAVA',
    team2Name: 'ORQUESTRA FINAL VERMELLA',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Viola',              col: 0, row: 2, team: 0 },
      { instrumento: 'Violoncel',          col: 1, row: 3, team: 0 },
      { instrumento: 'Clarinet',          col: 2, row: 4, team: 0 },
      { instrumento: 'Piano',             col: 0, row: 4, team: 0 },
      { instrumento: 'Trompeta',          col: 1, row: 5, team: 0 },
      { instrumento: 'Xilòfon',           col: 2, row: 5, team: 0 },
      { instrumento: 'Sintetitzador',     col: 0, row: 5, team: 0 },
      { instrumento: 'Guitarra Elèctrica', col: 1, row: 4, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Saxofon',     col: 8, row: 1, team: 1 },
      { instrumento: 'Fagot',       col: 9, row: 2, team: 1 },
      { instrumento: 'Trompa',      col: 8, row: 3, team: 1 },
      { instrumento: 'Trombó',      col: 7, row: 4, team: 1 },
      { instrumento: 'Orgue',       col: 9, row: 4, team: 1 },
      { instrumento: 'Bombo',       col: 8, row: 5, team: 1 },
      { instrumento: 'Timbales',    col: 7, row: 5, team: 1 },
      { instrumento: 'Baix Elèctric', col: 9, row: 5, team: 1 },
      { instrumento: 'Teclat MIDI',    col: 9, row: 3, team: 1 },
    ],
    winCondition: 'Derrota els dos caps enemics',
    difficulty: 5,
    deployBudget: 50,
  },
  {
    id: 'symphony-of-heroes',
    title: 'Simfonia d\'Herois',
    description: 'La batalla final contra el Rei Arcà. El moment de la veritat.',
    objectives: 'Usa tota la teva tàctica per derrotar el Rei Arcà i la seva guàrdia.',
    team1Name: 'CAMPIONS BLAUS',
    team2Name: 'REGNE VERMELL',
    placements: [
      { instrumento: 'Flauta Travessera', col: 0, row: 0, team: 0 },
      { instrumento: 'Violí',             col: 1, row: 1, team: 0 },
      { instrumento: 'Viola',              col: 0, row: 2, team: 0 },
      { instrumento: 'Violoncel',          col: 1, row: 3, team: 0 },
      { instrumento: 'Clarinet',          col: 2, row: 4, team: 0 },
      { instrumento: 'Piano',             col: 0, row: 4, team: 0 },
      { instrumento: 'Trompeta',          col: 1, row: 5, team: 0 },
      { instrumento: 'Xilòfon',           col: 2, row: 5, team: 0 },
      { instrumento: 'Sintetitzador',     col: 0, row: 5, team: 0 },
      { instrumento: 'Guitarra Elèctrica', col: 1, row: 3, team: 0 },
      { instrumento: 'Oboè',        col: 9, row: 0, team: 1 },
      { instrumento: 'Saxofon',     col: 8, row: 1, team: 1 },
      { instrumento: 'Fagot',       col: 9, row: 2, team: 1 },
      { instrumento: 'Trompa',      col: 8, row: 3, team: 1 },
      { instrumento: 'Trombó',      col: 7, row: 4, team: 1 },
      { instrumento: 'ReyArcano',   col: 9, row: 4, team: 1 },
      { instrumento: 'Bombo',       col: 8, row: 5, team: 1 },
      { instrumento: 'Timbales',    col: 7, row: 5, team: 1 },
      { instrumento: 'Baix Elèctric', col: 9, row: 5, team: 1 },
      { instrumento: 'Teclat MIDI',    col: 9, row: 1, team: 1 },
    ],
    winCondition: 'Derrota el Rei Arcà (enemic principal)',
    deployBudget: 55,
    isSpecialBoss: true,
    bossInstrument: 'Orgue',
    bossBonusStats: { vol: 1.2, res: 1.5, mov: 1.0, rango: 1 },
    difficulty: 10,
  },
];

// ── CAMPAIGN LEVELS END ──────────────────────────────────────────



// ── HELPERS ──────────────────────────────────────────────────────
function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16),
  };
}

function mixColor(hex, factor) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.min(255,r*factor)|0},${Math.min(255,g*factor)|0},${Math.min(255,b*factor)|0})`;
}

// Grid → screen (Horizontal Flat Center)
function gridToScreen(col, row, ox, oy) {
  const laneH = TILE_H * 0.9; // Lane height for vertical depth
  return {
    x: col * TILE_W + ox,
    y: row * laneH + oy,
  };
}

// ── GAME STATE ───────────────────────────────────────────────────
const state = {
  currentLevel: null,      // Level data object
  units: [],
  selected: null,    // unit id (for panel inspection)
  hovered: null,     // [col, row]
  tick: 0,
  offX: 0,
  offY: 0,
  dpr: 1,

  // ── Turn / Initiative system
  round: 1,                // current round number
  turnOrder: [],           // array of unit ids sorted by tempo (ascending)
  turnIndex: 0,            // index into turnOrder for current active unit
  phase: 'move',           // 'move' | 'animating' | 'attack' | 'done'
  reachableTiles: [],      // [{col, row}] — BFS result for active unit
  reachableSet: null,      // Set of 'col,row' strings for fast lookup

  // ── Movement animation
  anim: null,              // { unit, from:{col,row}, to:{col,row}, t:0, duration }

  // ── Combat system
  attackableTiles: [],     // [{col, row}] — enemy tiles in range after movement
  attackableSet: null,     // Set of 'col,row' strings
  floatingTexts: [],       // [{text, x, y, t, duration, color}]
  dyingUnits: [],          // [{unit, t}] — units playing death animation
  shake: 0,                // camera shake intensity (decays each frame)
  flashT: 0,               // red kill-flash timer

  // ── AI cinematic
  aiBanner: null,          // {text, t, duration} — "TURNO ENEMIGO" banner
  tutorialStep: -1,        // -1 = off, 0+ = active step

  // ── AI
  aiActive: false,
  aiTimer: null,
};

// ── UNIT FACTORY ─────────────────────────────────────────────────
function getUnitRoleInfo(unitOrName) {
  const data = typeof unitOrName === 'string' ? INSTRUMENTOS_DB[unitOrName] : unitOrName;
  if (!data) return { icon: '❓', label: 'Desconegut' };

  // Suport (basat en el rol de la DB)
  if (data.rol && data.rol.toLowerCase().includes('suport')) {
    return { icon: '✚', label: 'Suport / Utilitat' };
  }
  // Àrea
  if (data.rango === 'Àrea') {
    return { icon: '💥', label: 'Atac d\'Area' };
  }
  // Distància (segons el valor numèric del rang)
  if (typeof data.rango === 'number' && data.rango > 1) {
    return { icon: '🏹', label: 'Atac a Distància' };
  }
  // Melee (per defecte si rang és 1 o no especificat)
  return { icon: '🛡️', label: 'Cos a Cos (Melee)' };
}

function createUnit(nombre, col, row, team, extraStats = null) {
  const data = INSTRUMENTOS_DB[nombre];
  if (!data) throw new Error(`Instrumento no encontrado: ${nombre}`);
  const unit = {
    ...data,
    nombre,
    col, row, team,
    id: `${nombre}::${team}`,
    teamColor:   TEAM_COLORS[team],
    familyColor: FAMILY_COLORS[data.familia] ?? '#888',
    initial:     nombre[0].toUpperCase(),
    hp:    data.resonancia,
    maxHp: data.resonancia,
  };
  // Apply boss bonuses if provided
  if (extraStats) {
    if (extraStats.vol) unit.volumen = Math.round(unit.volumen * extraStats.vol);
    if (extraStats.res) {
      unit.resonancia = Math.round(unit.resonancia * extraStats.res);
      unit.maxHp = unit.resonancia;
      unit.hp = unit.resonancia;
    }
    if (extraStats.mov) unit.movimiento = Math.round(unit.movimiento * extraStats.mov);
    if (extraStats.rango && typeof extraStats.rango === 'number' && typeof unit.rango === 'number') {
      unit.rango = extraStats.rango;
    }
    unit.isBoss = true;
    unit.id += '::BOSS';
  }
  return unit;
}

function initUnitsForLevel(levelData) {
  state.units = [];
  preloadLevelAssets(levelData);

  for (const p of levelData.placements) {
    let instrumento = p.instrumento;
    let extraStats = null;

    // Handle special boss unit (ReyArcano)
    if (levelData.isSpecialBoss && instrumento === 'ReyArcano') {
      instrumento = levelData.bossInstrument; // e.g., 'Órgano'
      extraStats = levelData.bossBonusStats;
    }

    state.units.push(createUnit(instrumento, p.col, p.row, p.team, extraStats));
  }

  state.currentLevel = levelData;
}

// ================================================================
//  INITIATIVE  —  Turn order by ascending tempo
//  Ties broken by: team 0 first, then alphabetical nombre
// ================================================================
function buildTurnOrder() {
  const alive = state.units.filter(u => u.hp > 0);
  alive.sort((a, b) => {
    if (a.tempo !== b.tempo) return a.tempo - b.tempo;
    if (a.team !== b.team)   return a.team - b.team;
    return a.nombre.localeCompare(b.nombre);
  });
  state.turnOrder = alive.map(u => u.id);
  state.turnIndex = 0;
}

function startRound() {
  buildTurnOrder();
  state.phase = 'move';
  updateInitiativeBar();
  updateActiveTurnCard();
  computeReachable();

  const active = getActiveUnit();
  if (active && active.team === 1) {
    showAIBanner(active);
  }
}

function showAIBanner(unit) {
  state.aiBanner = { text: unit.nombre.toUpperCase(), t: 0, duration: 1.2 };
  state.aiTimer = setTimeout(runAI, 1200);
}

function getActiveUnit() {
  if (state.turnIndex >= state.turnOrder.length) return null;
  const id = state.turnOrder[state.turnIndex];
  return state.units.find(u => u.id === id) ?? null;
}

function advanceTurn() {
  state.aiActive = false;
  if (state.aiTimer) { clearTimeout(state.aiTimer); state.aiTimer = null; }

  state.turnIndex++;
  state.attackableTiles = [];
  state.attackableSet   = null;

  if (state.turnIndex >= state.turnOrder.length) {
    state.round++;
    document.getElementById('turn-n').textContent = state.round;
    startRound();
  } else {
    state.phase = 'move';
    updateInitiativeBar();
    updateActiveTurnCard();
    computeReachable();
  }

  const active = getActiveUnit();
  if (active && active.team === 1) {
    showAIBanner(active);
  }
}

// ================================================================
//  BFS REACHABLE TILES  —  Manhattan walk on grid, blocked by units
// ================================================================
function isOccupied(col, row, excludeUnit = null) {
  return state.units.some(u => u.hp > 0 && u.col === col && u.row === row && u !== excludeUnit);
}

function computeReachable() {
  const unit = getActiveUnit();
  state.reachableTiles = [];
  state.reachableSet   = new Set();
  if (!unit) return;

  const maxDist = unit.movimiento;
  const visited = new Map();
  const queue   = [{ col: unit.col, row: unit.row, d: 0 }];
  visited.set(`${unit.col},${unit.row}`, 0);

  while (queue.length > 0) {
    const { col, row, d } = queue.shift();
    if (d > 0) {
      state.reachableTiles.push({ col, row });
      state.reachableSet.add(`${col},${row}`);
    }
    if (d >= maxDist) continue;

    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for (const [dc, dr] of dirs) {
      const nc = col + dc;
      const nr = row + dr;
      if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue;

      const key  = `${nc},${nr}`;
      const nd   = d + 1;

      if (isOccupied(nc, nr)) continue;

      if (!visited.has(key) || visited.get(key) > nd) {
        visited.set(key, nd);
        queue.push({ col: nc, row: nr, d: nd });
      }
    }
  }
}

// ================================================================
//  ATTACK RANGE  —  Compute tiles that can be attacked by unit
// ================================================================
function computeAttackable(unit) {
  // Limpiar tiles de movimiento al entrar en modo ataque
  state.reachableTiles = [];
  state.reachableSet   = null;
  state.attackableTiles = [];
  state.attackableSet   = new Set();

  const targetTeam = 1 - unit.team;  // Enemies
  const maxRange   = typeof unit.rango === 'number' ? unit.rango : 1;

  // Enemies positions within range
  for (const enemy of state.units) {
    if (enemy.team !== targetTeam || enemy.hp <= 0) continue;

    const dx = Math.abs(enemy.col - unit.col);
    const dy = Math.abs(enemy.row - unit.row);
    const dist = dx + dy;  // Manhattan distance

    if (unit.rango === 'Área') {
      // Área: all tiles adjacent (Manhattan distance == 1) to attacker
      // Only applies if enemy is adjacent to attacker
      if (dist === 1) {
        const key = `${enemy.col},${enemy.row}`;
        state.attackableTiles.push({ col: enemy.col, row: enemy.row });
        state.attackableSet.add(key);
      }
    } else {
      // Numeric range: includes distance up to maxRange
      if (dist >= 1 && dist <= maxRange) {
        const key = `${enemy.col},${enemy.row}`;
        state.attackableTiles.push({ col: enemy.col, row: enemy.row });
        state.attackableSet.add(key);
      }
    }
  }
}

// ================================================================
//  MOVEMENT ANIMATION
// ================================================================
const MOVE_DURATION   = 0.28;
const DAMAGE_DURATION = 1.2;
const DEATH_DURATION  = 0.9; // seconds: grey → sink → fade

function startMoveAnim(unit, toCol, toRow) {
  state.phase = 'animating';
  state.anim = {
    unit,
    fromCol: unit.col,
    fromRow: unit.row,
    toCol,
    toRow,
    t: 0,
    duration: MOVE_DURATION,
  };
}

function onMoveComplete(unit) {
  state.phase = 'attack';
  computeAttackable(unit);
  updateActiveTurnCardHint('Ataca a un enemigo en rojo');
  updateButtonStates();
  if (!state.aiActive) tutorialAdvance('unit-moved');
  if (state.aiActive) {
    state.aiTimer = setTimeout(() => aiAttack(unit), 800);
  }
}

// ================================================================
//  AI — Simple greedy: move towards nearest enemy, then attack
// ================================================================
function runAI() {
  const unit = getActiveUnit();
  if (!unit || unit.team !== 1) return;

  state.aiActive = true;
  const enemies = state.units.filter(u => u.team === 0 && u.hp > 0);
  if (enemies.length === 0) { advanceTurn(); return; }

  const nearest = enemies.reduce((best, e) => {
    const d  = Math.abs(e.col - unit.col) + Math.abs(e.row - unit.row);
    const bd = Math.abs(best.col - unit.col) + Math.abs(best.row - unit.row);
    return d < bd ? e : best;
  });

  computeReachable();

  // Find reachable tile that minimises distance to nearest enemy
  let bestTile = null;
  let bestDist = Math.abs(unit.col - nearest.col) + Math.abs(unit.row - nearest.row);

  for (const tile of state.reachableTiles) {
    const d = Math.abs(tile.col - nearest.col) + Math.abs(tile.row - nearest.row);
    if (d < bestDist) { bestDist = d; bestTile = tile; }
  }

  if (bestTile) {
    startMoveAnim(unit, bestTile.col, bestTile.row);
    // aiAttack will be triggered by onMoveComplete
  } else {
    // Already optimal position — go straight to attack
    state.phase = 'attack';
    computeAttackable(unit);
    state.aiTimer = setTimeout(() => aiAttack(unit), 800);
  }
}

function aiAttack(unit) {
  const targets = state.units.filter(u => state.attackableSet?.has(`${u.col},${u.row}`) && u.hp > 0);
  if (targets.length > 0) {
    // Attack the weakest enemy to maximise kills
    const target = targets.reduce((w, e) => e.hp < w.hp ? e : w);
    attack(unit, target);
  } else {
    state.aiActive = false;
    advanceTurn();
  }
}

function attack(attacker, defender) {
  if (attacker.team === 0) tutorialAdvance('unit-attacked');
  const damage = attacker.volumen;
  defender.hp -= damage;

  // Create floating damage text at defender position
  const { x, y } = gridToScreen(defender.col, defender.row, state.offX, state.offY);
  const impactX = x + TILE_W / 2;
  const impactY = y + TILE_H * 0.4;
  state.floatingTexts.push({
    text: `-${damage}`,
    x: impactX,
    y: y - 60,
    t: 0,
    duration: DAMAGE_DURATION,
    color: defender.hp <= 0 ? '#FF0055' : '#FF3366'
  });

  // Partículas de impacto: notas musicales + sparks
  const atkColor = attacker.teamColor;
  emitParticles(impactX, impactY, 'note', 5, atkColor);
  emitParticles(impactX, impactY, 'spark', 12, '#FFD700');

  // Camera shake on every hit
  state.shake = defender.hp <= 0 ? 12 : 6;

  // Check for death
  if (defender.hp <= 0) {
    defender.hp = 0;
    state.flashT = 0.35; // kill flash

    // If selected, clear selection
    if (state.selected === defender.id) {
      state.selected = null;
      updatePanel(null);
    }
    // Remove from turn order now (so AI/player can't target it again)
    state.turnOrder = state.turnOrder.filter(id => id !== defender.id);
    if (state.turnIndex >= state.turnOrder.length) {
      state.turnIndex = Math.max(0, state.turnOrder.length - 1);
    }
    // Death burst: explosión épica de partículas
    emitDeathBurst(impactX, impactY, defender.teamColor);
    // Kick off death animation — unit stays in state.units until anim finishes
    state.dyingUnits.push({ unit: defender, t: 0 });
  }

  // After attack (or kill), advance turn
  advanceTurn();

  // Check if the level has ended
  const winner = checkGameEnd();
  if (winner !== null) {
    showResult(winner);
  }
}

function updateDyingUnits(dt) {
  for (let i = state.dyingUnits.length - 1; i >= 0; i--) {
    const entry = state.dyingUnits[i];
    entry.t += dt;
    if (entry.t >= DEATH_DURATION) {
      // Purge unit from state.units once animation ends
      state.units = state.units.filter(u => u !== entry.unit);
      state.dyingUnits.splice(i, 1);
    }
  }
}

function updateShake(dt) {
  if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 60);
  if (state.flashT > 0) state.flashT = Math.max(0, state.flashT - dt);
  if (state.aiBanner) {
    state.aiBanner.t += dt;
    if (state.aiBanner.t >= state.aiBanner.duration) state.aiBanner = null;
  }
}

// ================================================================
//  PARTICLE SYSTEM — Musical notes, sparks, death skulls
// ================================================================
const PARTICLES = [];  // global pool
const NOTE_GLYPHS = ['♩','♪','♫','♬','𝅘𝅥𝅮','𝄞'];

function emitParticles(x, y, type, count, color) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 80;
    const p = {
      x, y,
      vx: Math.cos(angle) * speed * (0.6 + Math.random()),
      vy: Math.sin(angle) * speed * (0.6 + Math.random()) - (type === 'note' ? 60 : 20),
      t: 0,
      duration: 0.6 + Math.random() * 0.6,
      type,
      color,
      glyph: type === 'note' ? NOTE_GLYPHS[Math.floor(Math.random() * NOTE_GLYPHS.length)] : null,
      size: type === 'spark' ? 2 + Math.random() * 3 : 14 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 6,
    };
    PARTICLES.push(p);
  }
}

function emitDeathBurst(x, y, color) {
  // Ring of sparks
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const speed = 80 + Math.random() * 60;
    PARTICLES.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 30,
      t: 0, duration: 0.8 + Math.random() * 0.4,
      type: 'spark', color,
      size: 2 + Math.random() * 4,
      glyph: null, rotation: 0, rotSpeed: 0,
    });
  }
  // Floating notes
  emitParticles(x, y, 'note', 8, color);
}

function updateParticles(dt) {
  for (let i = PARTICLES.length - 1; i >= 0; i--) {
    const p = PARTICLES[i];
    p.t += dt;
    if (p.t >= p.duration) { PARTICLES.splice(i, 1); continue; }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 120 * dt; // gravity
    p.vx *= 0.98;     // drag
    p.rotation += p.rotSpeed * dt;
  }
}

function drawParticles(ctx) {
  ctx.save();
  for (const p of PARTICLES) {
    const progress = p.t / p.duration;
    const alpha = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;
    ctx.globalAlpha = alpha;

    if (p.type === 'spark') {
      // Bright dot with tail
      const tailX = p.x - p.vx * 0.03;
      const tailY = p.y - p.vy * 0.03;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.size * (1 - progress);
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if (p.type === 'note') {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    }
  }
  ctx.restore();
}

function updateFloatingTexts(dt) {
  for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
    const ft = state.floatingTexts[i];
    ft.t += dt;
    ft.y -= 25 * dt; // float upward

    if (ft.t >= ft.duration) {
      state.floatingTexts.splice(i, 1);
    }
  }
}

function drawFloatingTexts(ctx) {
  ctx.save();
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  for (const ft of state.floatingTexts) {
    const progress = ft.t / ft.duration;
    const alpha    = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3);
    // Pop: arranca grande (1.8x) y se asienta a 1x rápidamente
    const scale    = 1.8 - Math.min(progress * 3, 0.8);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(ft.x, ft.y);
    ctx.scale(scale, scale);
    ctx.font        = 'bold 28px "Inter", sans-serif';
    ctx.shadowColor = ft.color;
    ctx.shadowBlur  = 20;
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.lineWidth   = 5;
    ctx.strokeText(ft.text, 0, 0);
    ctx.fillStyle   = ft.color;
    ctx.fillText(ft.text, 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

function updateAnim(dt) {
  const a = state.anim;
  if (!a) return;

  a.t += dt;
  const p = Math.min(1, a.t / a.duration);

  // Ease-out cubic
  const ease = 1 - Math.pow(1 - p, 3);

  // Interpolate grid position for rendering
  a.unit._renderCol = a.fromCol + (a.toCol - a.fromCol) * ease;
  a.unit._renderRow = a.fromRow + (a.toRow - a.fromRow) * ease;

  if (p >= 1) {
    // Snap to final position
    a.unit.col = a.toCol;
    a.unit.row = a.toRow;
    delete a.unit._renderCol;
    delete a.unit._renderRow;
    state.anim = null;
    state.reachableTiles = [];
    state.reachableSet   = null;

    // Movement finished, now allow attack
    onMoveComplete(a.unit);
  }
}

// ================================================================
//  UI: INITIATIVE BAR
// ================================================================
function updateInitiativeBar() {
  const queueEl = document.getElementById('init-queue');
  if (!queueEl) return;

  queueEl.innerHTML = state.turnOrder.map((id, i) => {
    const unit = state.units.find(u => u.id === id);
    if (!unit) return '';

    const isActive = i === state.turnIndex;
    const isDone   = i < state.turnIndex;
    const cls      = isActive ? 'active' : isDone ? 'done' : '';

    return `<div class="init-pip ${cls}" style="border-color:${unit.teamColor}${isActive ? '' : '55'}">
      <span class="pip-dot" style="background:${unit.teamColor};box-shadow:0 0 6px ${unit.teamColor}"></span>
      <span style="color:${isActive ? unit.teamColor : ''}">${unit.nombre}</span>
      <span class="pip-tempo">T${unit.tempo}</span>
    </div>${i < state.turnOrder.length - 1 ? '<span class="pip-arrow">›</span>' : ''}`;
  }).join('');
}

function updateActiveTurnCard() {
  const unit = getActiveUnit();
  const nameEl = document.getElementById('active-turn-name');
  const hintEl = document.getElementById('active-turn-hint');
  if (!nameEl) return;

  if (!unit) {
    nameEl.textContent = '---';
    hintEl.textContent = 'Ronda finalitzada...';
    return;
  }

  nameEl.textContent = unit.nombre.toUpperCase();
  nameEl.style.borderLeftColor = unit.teamColor; // Dynamic accent

  if (state.phase === 'move') {
    hintEl.textContent = `Moviment: ${unit.movimiento} c.`;
  } else {
    hintEl.textContent = `Fase d'Atac!`;
  }

  // Also auto-show this unit in the detail console
  updatePanel(unit);
  updateButtonStates();
}

function updateActiveTurnCardHint(msg) {
  const hintEl = document.getElementById('active-turn-hint');
  if (!hintEl) return;
  hintEl.textContent = msg;
}

function updateButtonStates() {
  const moveBtn = document.getElementById('btn-action-move');
  const atkBtn  = document.getElementById('btn-action-attack');
  if (!moveBtn || !atkBtn) return;

  const unit = getActiveUnit();
  const isPlayerTurn = unit && unit.team === 0;
  const isAnimating  = state.phase === 'animating';
  const isDisabled   = !isPlayerTurn || isAnimating || state.phase === 'done';

  moveBtn.classList.toggle('disabled', isDisabled);
  atkBtn.classList.toggle('disabled',  isDisabled);

  moveBtn.classList.toggle('active', state.phase === 'move'   && !isDisabled);
  atkBtn.classList.toggle('active',  state.phase === 'attack' && !isDisabled);
}

// ── HIT DETECTION ────────────────────────────────────────────────
function pointInTile(px, py, col, row) {
  const { x, y } = gridToScreen(col, row, state.offX, state.offY);
  return (px >= x && px < x + TILE_W && py >= y && py < y + TILE_H);
}

// Back-to-front diagonal order (row + col is the depth)
function flatOrder() {
  const order = [];
  for (let s = 0; s < COLS + ROWS; s++) {
    for (let r = 0; r < ROWS; r++) {
      const c = s - r;
      if (c >= 0 && c < COLS) {
        order.push([c, r]);
      }
    }
  }
  return order;
}

// ── DRAW: TILE (Flat Isometric) ──────────────────────────────────
// ── DRAW: TILE ───────────────────────────────────────────────────
function drawTile(ctx, col, row, hovered, reachable, attackable) {
  const { x, y } = gridToScreen(col, row, state.offX, state.offY);
  const tw = TILE_W;
  const th = TILE_H * 0.9;
  
  // Floor tile (Rectangle flat)
  let fill;
  if (col <= 1)      fill = 'rgba(74, 143, 255, 0.08)'; // Team 1 territory
  else if (col >= 8) fill = 'rgba(255, 51, 102, 0.08)'; // Team 2 territory
  else               fill = (col + row) % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)';

  if (hovered)     fill = 'rgba(255, 215, 0, 0.15)';
  if (reachable)   fill = 'rgba(74, 143, 255, 0.2)';
  if (attackable)  fill = 'rgba(255, 51, 102, 0.3)';

  ctx.beginPath();
  ctx.rect(x, y, tw, th);
  ctx.closePath();
  
  ctx.fillStyle = fill;
  ctx.fill();
  
  // Outer border
  ctx.strokeStyle = hovered ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.04)';
  ctx.lineWidth   = hovered ? 2 : 1;
  ctx.stroke();
}

// ── DRAW: UNIT ────────────────────────────────────────────────────
function drawUnit(ctx, unit) {
  const c = unit._renderCol !== undefined ? unit._renderCol : unit.col;
  const r = unit._renderRow !== undefined ? unit._renderRow : unit.row;
  const { x, y } = gridToScreen(c, r, state.offX, state.offY);
  
  // Floating animation — sutil, los pies se quedan cerca del suelo
  const floatY = Math.sin(state.tick * 0.04 + unit.col * 0.9 + unit.row * 0.6) * 3;
  const tileBottom = y + TILE_H * 0.9; // borde inferior del tile
  const drawY = tileBottom - floatY;   // ancla en el suelo, flota hacia arriba

  const selected = state.selected === unit.id;
  const hovered  = state.hovered && state.hovered[0] === unit.col && state.hovered[1] === unit.row;

  // Breathing idle animation (escala sutil, cada unidad desfasada)
  const breathPhase = state.tick * 0.025 + unit.col * 1.1 + unit.row * 0.7;
  const breathScale = 1.0 + Math.sin(breathPhase) * 0.02; // ±2%

  // Render Scale (High Fidelity)
  let scale = selected || hovered ? 1.2 : breathScale;
  
  // Get Sprite
  let instrType = unit.nombre;
  if (instrType === 'ReyArcano') instrType = state.currentLevel.bossInstrument;
  const spritePath = getAssetPath(instrType, unit.team);
  const img = _SPRITES.get(spritePath);

  const tileH = TILE_H * 0.9;
  const cx    = x + TILE_W / 2;      // horizontal center of tile
  const cy    = y + tileH - 8;       // bottom of tile surface

  ctx.save();
  // ── Dynamic Underglow (Floating Aura) — centered on tile surface
  ctx.shadowColor = unit.teamColor;
  ctx.shadowBlur  = selected ? 30 : 15;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 35 * scale, 14 * scale, 0, 0, Math.PI * 2);
  ctx.fillStyle = unit.teamColor + (selected ? '77' : '33');
  ctx.fill();
  if (selected) {
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  // ── Draw Character Sprite
  if (img && img.complete) {
    const s = 110 * scale; // Professional AAA scale

    ctx.translate(cx, drawY);
    
    // As per user request: Team 2 (Red) is already facing correctly, so NO MIRRORING
    // No ctx.scale(-1, 1);
    
    ctx.drawImage(img, -s/2, -s, s, s); 
  } else {
    // Fallback
    ctx.fillStyle = "#fff";
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.fillText('?', x, y);
  }

  ctx.restore();

  // ── FAMILY BADGE — icona de família estil gemma/shield
  const fIcon  = FAMILY_ICONS[unit.familia] || '?';
  const fColor = unit.familyColor;
  const badgeX = cx + 28 * scale;  // a la dreta del sprite
  const badgeY = y + tileH * 0.15; // a dalt
  const badgeR = 11;

  ctx.save();
  // Fons hexagonal
  ctx.translate(badgeX, badgeY);

  // Hexàgon
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const hx = Math.cos(a) * badgeR;
    const hy = Math.sin(a) * badgeR;
    i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
  }
  ctx.closePath();

  // Fill amb el color de la família
  ctx.fillStyle   = fColor + '33';
  ctx.strokeStyle = fColor + '88';
  ctx.lineWidth   = 1.2;
  ctx.shadowColor = fColor;
  ctx.shadowBlur  = 8;
  ctx.fill();
  ctx.stroke();

  // Icona dins
  ctx.shadowBlur  = 0;
  ctx.font        = '11px serif';
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle   = '#fff';
  ctx.fillText(fIcon, 0, 1);

  ctx.restore();
}

// ── DRAW: HP BAR — rendered in a second pass so it's never overdrawn
function drawUnitHPBar(ctx, unit) {
  const { x, y } = gridToScreen(unit.col, unit.row, state.offX, state.offY);
  const tileH = TILE_H * 0.9;
  const cx    = x + TILE_W / 2;
  const hpPct = unit.hp / unit.maxHp;
  const barW  = TILE_W * 0.55;
  const barH  = 5;
  const bx    = cx - barW / 2;
  const by    = y + tileH + 4; // just below the tile surface

  // Background track
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.beginPath();
  ctx.roundRect(bx, by, barW, barH, 2);
  ctx.fill();

  // Filled portion
  const grad = ctx.createLinearGradient(bx, 0, bx + barW, 0);
  grad.addColorStop(0, unit.team === 0 ? '#4A8FFF' : '#FF4455');
  grad.addColorStop(1, unit.team === 0 ? '#00CED1' : '#FF8899');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(bx, by, barW * hpPct, barH, 2);
  ctx.fill();

  // HP text
  ctx.font = 'bold 8px "Roboto Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText(`${unit.hp}/${unit.maxHp}`, cx, by + barH + 2);

  // Role Icon on Canvas (next to HP bar, centered and larger)
  const role = getUnitRoleInfo(unit);
  ctx.font = '14px serif';
  ctx.textAlign = 'right';
  ctx.fillText(role.icon, bx - 8, by + 4);
}

// ── DRAW: AMBIENT GRID LABELS (Col/Row coords, subtle) ───────────
function drawCoordLabels(ctx) {
  ctx.save();
  ctx.font         = '8px "Roboto Mono", monospace';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle    = 'rgba(255,255,255,0.15)';

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const { x, y } = gridToScreen(c, r, state.offX, state.offY);
      ctx.fillText(`${c},${r}`, x + TILE_W / 2, y + TILE_H / 2);
    }
  }
  ctx.restore();
}

// ── DRAW: TARGET RING (se muestra en todas las unidades atacables) ──
function drawTargetRing(ctx, unit) {
  const { x, y } = gridToScreen(unit.col, unit.row, state.offX, state.offY);
  const cx = x + TILE_W / 2;
  const cy = y + TILE_H * 0.35;

  const pulse = 0.5 + Math.abs(Math.sin(state.tick * 0.07)) * 0.5;

  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.strokeStyle = '#FF3366';
  ctx.lineWidth   = 2;
  ctx.shadowColor = '#FF3366';
  ctx.shadowBlur  = 14;
  ctx.translate(cx, cy);

  // Anillo exterior rotatorio con segmentos
  const rot = state.tick * 0.025;
  for (let i = 0; i < 4; i++) {
    const a = rot + i * (Math.PI / 2);
    ctx.beginPath();
    ctx.arc(0, 0, 22, a + 0.2, a + (Math.PI / 2) - 0.2);
    ctx.stroke();
  }

  // Cruz central fija
  ctx.globalAlpha = pulse * 0.7;
  ctx.lineWidth = 1.5;
  const sz = 5;
  ctx.beginPath(); ctx.moveTo(-sz, 0); ctx.lineTo(sz, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(0, sz); ctx.stroke();

  ctx.restore();
}

// ── DRAW: ATTACK ARROW ───────────────────────────────────────────
function drawAttackArrow(ctx, attacker, targetCol, targetRow) {
  const from = gridToScreen(attacker.col, attacker.row, state.offX, state.offY);
  const to   = gridToScreen(targetCol, targetRow, state.offX, state.offY);

  const fx = from.x + TILE_W / 2;
  const fy = from.y + TILE_H * 0.9 - 10;
  const tx = to.x   + TILE_W / 2;
  const ty = to.y   + TILE_H * 0.9 - 10;

  const angle  = Math.atan2(ty - fy, tx - fx);
  const pulse  = 0.85 + Math.sin(state.tick * 0.12) * 0.15; // breathing alpha

  ctx.save();
  ctx.globalAlpha = pulse;

  // Dashed shaft
  ctx.setLineDash([10, 6]);
  ctx.lineDashOffset = -(state.tick * 1.5); // marching ants
  ctx.strokeStyle = '#FF3366';
  ctx.lineWidth   = 2.5;
  ctx.shadowColor = '#FF3366';
  ctx.shadowBlur  = 12;
  ctx.beginPath();
  ctx.moveTo(fx, fy);
  ctx.lineTo(tx - Math.cos(angle) * 18, ty - Math.sin(angle) * 18);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead
  const hw = 10;
  ctx.fillStyle = '#FF3366';
  ctx.beginPath();
  ctx.translate(tx, ty);
  ctx.rotate(angle);
  ctx.moveTo(0, 0);
  ctx.lineTo(-18, -hw);
  ctx.lineTo(-12, 0);
  ctx.lineTo(-18,  hw);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ── DRAW: DAMAGE PREVIEW TOOLTIP ─────────────────────────────────
function drawDamagePreview(ctx, attacker, defender) {
  const damage   = attacker.volumen;
  const hpAfter  = Math.max(0, defender.hp - damage);
  const willKill = hpAfter <= 0;

  const { x, y } = gridToScreen(defender.col, defender.row, state.offX, state.offY);
  const tx = x + TILE_W / 2;
  const ty = y - 30; // encima del sprite

  const pulse = 0.85 + Math.sin(state.tick * 0.1) * 0.15;
  ctx.save();
  ctx.globalAlpha = pulse;

  // Fondo del tooltip
  const boxW = willKill ? 120 : 130;
  const boxH = willKill ? 48 : 56;
  const bx = tx - boxW / 2;
  const by = ty - boxH;

  ctx.fillStyle   = willKill ? 'rgba(180,0,30,0.92)' : 'rgba(15,15,30,0.92)';
  ctx.strokeStyle = willKill ? '#FF3366' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth   = 1.5;
  ctx.shadowColor = willKill ? '#FF0044' : 'rgba(0,0,0,0.5)';
  ctx.shadowBlur  = willKill ? 16 : 8;
  ctx.beginPath();
  ctx.roundRect(bx, by, boxW, boxH, 8);
  ctx.fill();
  ctx.stroke();

  // Flecha del tooltip (triángulo abajo)
  ctx.fillStyle = willKill ? 'rgba(180,0,30,0.92)' : 'rgba(15,15,30,0.92)';
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(tx - 6, by + boxH);
  ctx.lineTo(tx + 6, by + boxH);
  ctx.lineTo(tx, by + boxH + 7);
  ctx.closePath();
  ctx.fill();

  // Texto principal: daño
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillStyle = willKill ? '#fff' : '#FF3366';
  ctx.shadowColor = willKill ? '#FF0044' : '#FF3366';
  ctx.shadowBlur  = 6;
  ctx.fillText(`-${damage} DMG`, tx, by + (willKill ? boxH / 2 : 18));

  // Texto secundario: resultado
  ctx.shadowBlur = 0;
  ctx.font = 'bold 11px "Inter", sans-serif';
  if (willKill) {
    ctx.fillStyle = '#FFD700';
    ctx.fillText('ELIMINA!', tx, by + boxH / 2 + 14);
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(`HP: ${defender.hp} → ${hpAfter}`, tx, by + 40);
  }

  ctx.restore();
}

// ── DRAW: DYING UNIT (grey + sink + fade) ────────────────────────
function drawDyingUnit(ctx, unit, t) {
  const progress = t / DEATH_DURATION; // 0 → 1
  const alpha    = 1 - progress;
  const sinkY    = progress * 40; // se hunde 40px

  const { x, y } = gridToScreen(unit.col, unit.row, state.offX, state.offY);
  const tileBottom = y + TILE_H * 0.9;
  const drawY = tileBottom + sinkY;

  let instrType = unit.nombre;
  if (instrType === 'ReyArcano') instrType = state.currentLevel?.bossInstrument ?? instrType;
  const spritePath = getAssetPath(instrType, unit.team);
  const img = _SPRITES.get(spritePath);

  if (!img || !img.complete) return;

  ctx.save();
  ctx.globalAlpha = alpha;

  // Desaturar: dibujar el sprite en escala de grises con filter o via offscreen
  ctx.filter = 'grayscale(1) brightness(0.6)';

  const s = 110;
  const cx = x + TILE_W / 2;
  ctx.translate(cx, drawY);
  ctx.drawImage(img, -s / 2, -s, s, s);

  ctx.restore();
}

// ── MAIN RENDER ──────────────────────────────────────────────────
function render(canvas, ctx) {
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Background
  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
  bgGrad.addColorStop(0, '#13132a');
  bgGrad.addColorStop(1, '#0a0a16');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Kill flash (pantalla roja breve)
  if (state.flashT > 0) {
    const flashAlpha = (state.flashT / 0.35) * 0.25;
    ctx.fillStyle = `rgba(255,0,40,${flashAlpha})`;
    ctx.fillRect(0, 0, W, H);
  }

  // Camera shake offset
  const sx = state.shake > 0 ? (Math.random() - 0.5) * state.shake : 0;
  const sy = state.shake > 0 ? (Math.random() - 0.5) * state.shake : 0;
  ctx.save();
  ctx.translate(sx, sy);

  const order = flatOrder();
  const { hovered } = state;

  for (const [c, r] of order) {
    const isHovered = hovered && hovered[0] === c && hovered[1] === r;
    const isReachable = state.reachableSet && state.reachableSet.has(`${c},${r}`);
    const isAttackable = state.attackableSet && state.attackableSet.has(`${c},${r}`);
    drawTile(ctx, c, r, isHovered, isReachable, isAttackable);

    const unit = state.units.find(u => u.col === c && u.row === r);
    // No dibujar unidades que ya están en animación de muerte
    const isDying = unit && state.dyingUnits.some(d => d.unit === unit);
    if (unit && !isDying) drawUnit(ctx, unit);
  }

  // Second pass: HP bars always on top (skip dying)
  for (const [c, r] of order) {
    const unit = state.units.find(u => u.col === c && u.row === r && u.hp > 0);
    const isDying = unit && state.dyingUnits.some(d => d.unit === unit);
    if (unit && !isDying) drawUnitHPBar(ctx, unit);
  }

  // Third pass: target rings on all attackable enemies
  if (state.phase === 'attack' && state.attackableSet?.size > 0) {
    for (const unit of state.units) {
      if (unit.hp > 0 && state.attackableSet.has(`${unit.col},${unit.row}`)) {
        drawTargetRing(ctx, unit);
      }
    }
  }

  // Fourth pass: attack arrow + damage preview when hovering
  if (state.phase === 'attack' && state.hovered) {
    const [hc, hr] = state.hovered;
    if (state.attackableSet?.has(`${hc},${hr}`)) {
      const active = getActiveUnit();
      const target = state.units.find(u => u.col === hc && u.row === hr && u.hp > 0);
      if (active) drawAttackArrow(ctx, active, hc, hr);
      if (active && target) drawDamagePreview(ctx, active, target);
    }
  }

  // Fifth pass: dying units on top of everything
  for (const { unit, t } of state.dyingUnits) {
    drawDyingUnit(ctx, unit, t);
  }

  drawCoordLabels(ctx);
  ctx.restore(); // cierre del translate de shake

  // AI turn banner overlay (fuera del shake)
  if (state.aiBanner) {
    const b = state.aiBanner;
    const progress = b.t / b.duration;
    // Fade in 0-0.15, stay 0.15-0.7, fade out 0.7-1
    let alpha;
    if (progress < 0.15)     alpha = progress / 0.15;
    else if (progress < 0.7) alpha = 1;
    else                     alpha = 1 - (progress - 0.7) / 0.3;

    // Slide in from left
    const slideX = progress < 0.15 ? (1 - progress / 0.15) * -60 : 0;

    ctx.save();
    ctx.globalAlpha = alpha * 0.9;

    // Banner bar
    const bh = 52;
    const by = H / (2 * (state.dpr || 1)) - bh / 2;
    ctx.fillStyle = 'rgba(255,30,60,0.15)';
    ctx.fillRect(0, by, W / (state.dpr || 1), bh);
    ctx.fillStyle = 'rgba(255,30,60,0.6)';
    ctx.fillRect(0, by, 4, bh);
    ctx.fillRect(W / (state.dpr || 1) - 4, by, 4, bh);

    // Text
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    const cx = W / (2 * (state.dpr || 1)) + slideX;
    const cy = by + bh / 2;

    ctx.font      = 'bold 11px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255,100,100,0.8)';
    ctx.letterSpacing = '4px';
    ctx.fillText('TORN ENEMIC', cx, cy - 10);

    ctx.font      = 'bold 18px "Inter", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#FF3366';
    ctx.shadowBlur  = 12;
    ctx.fillText(b.text, cx, cy + 8);

    ctx.restore();
  }

  // ── POST-PROCESSING ──
  drawPostProcess(ctx, W, H);
}

// ── POST-PROCESS: VIGNETTE + SCANLINES ──────────────────────────
function drawPostProcess(ctx, W, H) {
  const dpr = state.dpr || 1;
  const w = W / dpr;
  const h = H / dpr;

  // 1. Vignette (oscurecimiento radial de los bordes)
  ctx.save();
  const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.85);
  vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
  vigGrad.addColorStop(0.7, 'rgba(0,0,0,0)');
  vigGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // 2. Scanlines (muy sutiles — look cinematográfico, no CRT)
  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.fillStyle = '#000';
  for (let y = 0; y < h; y += 3) {
    ctx.fillRect(0, y, w, 1);
  }
  ctx.restore();
}

// ── UI: SIDE PANEL UPDATE ─────────────────────────────────────────
function updatePanel(unit) {
  const nameEl    = document.getElementById('unit-name');
  const famEl     = document.getElementById('unit-family-tag');
  const statsEl   = document.getElementById('unit-stats-grid');
  const pImgEl    = document.getElementById('unit-portrait-img');
  const orgEl     = document.getElementById('org-text');
  
  const roleBadge = document.getElementById('unit-role-badge-hud');
  
  if (!unit) {
    nameEl.textContent = 'SELECCIONA UNITAT';
    famEl.textContent  = 'Explora el camp de batalla';
    statsEl.innerHTML  = '';
    orgEl.textContent  = 'Dades de l\'instrument seleccionat.';
    if (roleBadge) roleBadge.textContent = '';
    if (pImgEl) pImgEl.src = '';
    return;
  }

  const { icon: roleIcon, label: roleLabel } = getUnitRoleInfo(unit);
  if (roleBadge) {
    roleBadge.textContent = roleIcon;
    roleBadge.title = roleLabel;
  }

  nameEl.textContent = unit.nombre.toUpperCase();
  famEl.textContent  = `EQUIP ${unit.team + 1} | ${unit.familia.toUpperCase()}`;
  
  // Stats bars
  const bars = [
    { label: 'VOL',  val: unit.volumen,    max: 1000, color: 'var(--bar-atk)' },
    { label: 'RES',  val: unit.hp,         max: unit.maxHp, color: 'var(--bar-def)' },
    { label: 'TMP',  val: unit.tempo,      max: 10,   color: 'var(--bar-spd)' },
    { label: 'MOV',  val: unit.movimiento, max: 7,    color: 'var(--bar-mov)' },
  ];

  statsEl.innerHTML = bars.map(b => {
    const pct = Math.min(100, Math.round((b.val / b.max) * 100));
    return `<div class="stat-row">
      <span class="stat-label">${b.label}</span>
      <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${pct}%;background:${b.color}"></div></div>
      <span class="stat-val">${b.val}</span>
    </div>`;
  }).join('');

  // Organología
  orgEl.textContent = ORG_INFO[unit.nombre]
    ?? `Instrumento de la familia ${unit.familia}. Consulta el catálogo para más información.`;
    
  // Portrait (using characters directory with team suffix)
  if (pImgEl) {
    const base = INSTRUMENT_ASSETS[unit.nombre] || unit.nombre.toLowerCase() + 'e';
    const suffix = unit.team === 0 ? '1' : '2';
    
    // Handheld specific typo mapping for portraits too
    let finalPath = `img/personajes/${base}${suffix}.png`;
    if (unit.nombre === 'Clarinete' && unit.team === 0) finalPath = 'img/personajes/clarientee1.png';
    if (unit.nombre === 'Clarinete' && unit.team === 1) finalPath = 'img/personajes/clarinetee2.png';
    if (unit.nombre === 'Tuba' && unit.team === 1)      finalPath = 'img/personajes/tunae2.png';
    if (unit.nombre === 'Bombo' && unit.team === 1)     finalPath = 'img/personajes/bomobe2.png';
    if (unit.nombre === 'Bajo Eléctrico' && unit.team === 1) finalPath = 'img/personajes/bhajoelectricoe2.png';
    
    pImgEl.src = finalPath;
  }
}

// ── MOUSE → TILE (Flat 2D Projection) ─────────────────────────────
function tileAtMouse(mx, my) {
  const dx = mx - state.offX;
  const th = TILE_H * 0.9;
  const dy = my - state.offY;

  const col = Math.floor(dx / TILE_W);
  const row = Math.floor(dy / th);

  if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
    return [col, row];
  }
  return null;
}

// ── CANVAS RESIZE ────────────────────────────────────────────────
function resizeCanvas(canvas) {
  const dpr      = window.devicePixelRatio || 1;
  const parent   = canvas.parentElement;
  
  const cssW     = parent.clientWidth;
  const cssH     = parent.clientHeight; 

  canvas.style.width  = cssW + 'px';
  canvas.style.height = cssH + 'px';
  canvas.width        = cssW * dpr;
  canvas.height       = cssH * dpr;

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Center Grid in the available space (accounting for floating HUD at bottom)
  const totalGridW = COLS * TILE_W;
  const totalGridH = ROWS * (TILE_H * 0.9);

  state.offX = (cssW - totalGridW) / 2;
  // Offset Y to provide space for the floating HUD (approx 200px + 40px bottom)
  const availableH = cssH - 250; 
  state.offY = (availableH - totalGridH) / 2 + 30;
  
  state.dpr  = dpr;
}

// ── MENU SYSTEM ───────────────────────────────────────────────────
// ── GAME END SYSTEM ──────────────────────────────────────────────
function checkGameEnd() {
  const teamAlive = [0, 1].map(team =>
    state.units.some(u => u.team === team && u.hp > 0)
  );
  if (teamAlive[0] && !teamAlive[1]) return 0;
  if (!teamAlive[0] && teamAlive[1]) return 1;
  return null;
}

function showResult(winnerTeam) {
  const overlay = document.getElementById('result-overlay');
  const title = document.getElementById('result-title');
  const message = document.getElementById('result-message');
  const rewardsDiv = document.getElementById('result-rewards');
  const nextBtn = document.getElementById('btn-next-level');
  const retryBtn = document.getElementById('btn-retry');
  const menuBtn = document.getElementById('btn-menu');

  const level = state.currentLevel;
  const isVictory = winnerTeam === 0; // Team1 (player) wins

  overlay.className = 'fullscreen-overlay ' + (isVictory ? 'result-victory' : 'result-defeat');
  title.textContent = isVictory ? 'VICTÒRIA!' : 'DERROTA...';

  if (isVictory) {
    const teamName = level ? level.team1Name : 'Equip 1';
    const enemyName = level ? level.team2Name : 'Equip 2';
    message.textContent = `La teva ${teamName} ha triomfat sobre ${enemyName}!`;

    const newlyCompleted = completeLevel(level.id);
    const rewardAmt = PROGRESSION.rewards[level.id] || 10;

    rewardsDiv.innerHTML = `
      <div class="reward-item"><span>⭐ Nivell completat</span><span class="reward-value">+${rewardAmt} Musicoins</span></div>
      <div class="reward-item"><span>Musicoins totals</span><span class="reward-value">${PROGRESSION.musicoins}</span></div>
      ${newlyCompleted ? '<div class="reward-item" style="color:var(--neon-green)">Nou nivell desbloquejat!</div>' : ''}
    `;

    const currentIdx = LEVELS.findIndex(l => l.id === level.id);
    const hasNext = currentIdx < LEVELS.length - 1 && isLevelUnlocked(LEVELS[currentIdx + 1].id);
    nextBtn.style.display = hasNext ? 'block' : 'none';
    if (hasNext) {
      nextBtn.onclick = () => {
        overlay.classList.add('hidden');
        loadLevel(LEVELS[currentIdx + 1].id);
      };
    }
  } else {
    const teamName = level ? level.team1Name : 'Equip 1';
    const enemyName = level ? level.team2Name : 'Equip 2';
    message.textContent = `La teva ${teamName} ha sucumbit davant ${enemyName}.`;
    rewardsDiv.innerHTML = '';
    nextBtn.style.display = 'none';
  }

  retryBtn.onclick = () => {
    overlay.classList.add('hidden');
    restartCurrentLevel();
  };
  menuBtn.onclick = () => {
    overlay.classList.add('hidden');
    showMainMenu();
  };

  overlay.classList.remove('hidden');
}

function restartCurrentLevel() {
  if (!state.currentLevel) return;
  state.round = 1;
  state.turnIndex = 0;
  state.phase = 'move';
  state.selected = null;
  state.hovered = null;
  state.reachableTiles = [];
  state.reachableSet = null;
  state.attackableTiles = [];
  state.attackableSet = null;
  state.floatingTexts = [];
  initUnitsForLevel(state.currentLevel);
  startRound();
}

function buildMainMenu() {
  const container = document.getElementById('levels-list');
  if (!container) return;

  // Update musicoins badge
  const coinsEl = document.getElementById('menu-coins-val');
  if (coinsEl) coinsEl.textContent = PROGRESSION.musicoins;

  container.innerHTML = LEVELS.map(level => {
    const unlocked = isLevelUnlocked(level.id);
    const completed = isLevelCompleted(level.id);
    const locked = !unlocked && level.id !== 'duel-strings';
    
    return `
      <div class="level-card ${locked ? 'disabled' : ''}" data-level-id="${level.id}">
        <div class="card-glow"></div>
        <h3>${level.title} ${completed ? '★' : ''}</h3>
        <p>${level.description}</p>
        <div class="level-meta">
          <span>🎯 HQ REQ: ${level.objectives.split(' ')[0]}</span>
          <span>${locked ? '🔒 ARXIU BLOQUEJAT' : '⚡ OPERACIÓ LLESTA'}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.level-card:not(.disabled)').forEach(card => {
    card.addEventListener('click', () => loadLevel(card.dataset.levelId));
  });

  const backBtn = document.getElementById('btn-back-landing');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('main-menu').classList.add('hidden');
      document.getElementById('landing-page').classList.remove('hidden');
    });
  }

  const tutBtn = document.getElementById('btn-tutorial');
  if (tutBtn) {
    // Avoid stacking duplicate listeners on re-renders
    const newTutBtn = tutBtn.cloneNode(true);
    tutBtn.parentNode.replaceChild(newTutBtn, tutBtn);
    newTutBtn.addEventListener('click', startFullTutorial);
  }

  const backMenuBtn = document.getElementById('btn-back-menu');
  if (backMenuBtn) {
    backMenuBtn.addEventListener('click', () => showMainMenu());
  }

  document.getElementById('deploy-back')?.addEventListener('click', () => {
    document.getElementById('deploy-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
  });

  document.getElementById('deploy-confirm')?.addEventListener('click', () => {
    if (deployState.roster.length > 0) confirmDeploy();
  });

  // Modal de detalle de unidad
  document.getElementById('unit-modal-close')?.addEventListener('click', closeUnitModal);
  document.getElementById('unit-detail-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeUnitModal(); // click fuera del card
  });
}

function showMainMenu() {
  document.getElementById('main-menu').classList.remove('hidden');
  document.getElementById('game-hud').classList.add('hidden');
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('deploy-screen').classList.add('hidden');
  state.units = [];
  state.currentLevel = null;
  buildMainMenu(); // Refresh menu to show unlocked/completed status
}

function loadLevel(levelId) {
  tutorialAdvance('level-selected');
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) { console.error(`Nivell no trobat: ${levelId}`); return; }
  showDeployScreen(level);
}

// ================================================================
//  DEPLOY PHASE
// ================================================================
const deployState = {
  level: null,
  roster: [],       // [{nombre, cost}]
  budgetUsed: 0,
  activeFilter: 'all',
};

const MAX_ROSTER = 12;

// Slot positions for player units (cols 0-1, rows 0-5)
const DEPLOY_SLOTS = [];
for (let c = 0; c < 2; c++)
  for (let r = 0; r < ROWS; r++)
    DEPLOY_SLOTS.push({ col: c, row: r });

function getUnitCost(nombre) {
  const data = INSTRUMENTOS_DB[nombre];
  return data ? data.tempo : 1;
}

function showDeployScreen(level) {
  deployState.level = level;
  deployState.roster = [];
  deployState.budgetUsed = 0;
  deployState.activeFilter = 'all';

  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('deploy-screen').classList.remove('hidden');

  document.getElementById('deploy-level-title').textContent = level.title;
  document.getElementById('budget-max').textContent = level.deployBudget;

  buildEnemyRoster(level);
  buildCatalogFilters();
  buildCatalog();
  renderPlayerRoster();
  updateBudgetDisplay();
}

function buildEnemyRoster(level) {
  const el = document.getElementById('enemy-roster');
  const enemies = level.placements.filter(p => p.team === 1);
  el.innerHTML = enemies.map(p => {
    const instrName = (level.isSpecialBoss && p.instrumento === 'ReyArcano') ? level.bossInstrument : p.instrumento;
    const data = INSTRUMENTOS_DB[instrName] || {};
    const fColor = FAMILY_COLORS[data.familia] || '#888';
    return `<div class="enemy-row">
      <span class="enemy-row-family" style="background:${fColor}"></span>
      <span class="enemy-row-name">${p.instrumento === 'ReyArcano' ? 'Rey Arcano' : p.instrumento}</span>
      <span class="enemy-row-stats">T${data.tempo || '?'} | VOL${data.volumen || '?'}</span>
    </div>`;
  }).join('');
}

function buildCatalogFilters() {
  // Filtros eliminados — el catálogo agrupa por familia visualmente
  const el = document.getElementById('catalog-filters');
  if (el) el.innerHTML = '';
}

function buildCatalog() {
  const el = document.getElementById('catalog-grid');
  const remaining = deployState.level.deployBudget - deployState.budgetUsed;

  const FAMILY_ORDER = ['Corda', 'Vent', 'Percussió', 'Electrònics'];
  const FAMILY_ICONS = { Corda: '🎻', Vent: '🎺', Percussió: '🥁', Electrònics: '🎹' };
  const FAMILY_DESC  = {
    Corda:       'Instruments de corda frotada, polsada o percudida. Columna vertebral de l\'orquestra. Versàtils en combat cos a cos.',
    Vent:         'Aeròfons de fusta i metall. Gran abast i potència d\'atac. Fràgils, però letals des de la distància.',
    Percussió:    'Ritme i impacte. Alta velocitat d\'iniciativa i atacs en àrea. Sacrifiquen resistència per agressivitat.',
    Electrònics: 'Instruments amplificats i digitals. Abast mitjà, equilibri entre dany i mobilitat. El futur de l\'orquestra.',
  };

  let html = '';

  for (const familia of FAMILY_ORDER) {
    const fColor   = FAMILY_COLORS[familia] || '#888';
    const entries  = Object.entries(INSTRUMENTOS_DB)
      .filter(([, d]) => d.familia === familia)
      .sort((a, b) => a[1].tempo - b[1].tempo);

    html += `
      <div class="catalog-family-header">
        <div class="catalog-family-accent" style="background:${fColor}"></div>
        <div class="catalog-family-info">
          <span class="catalog-family-icon">${FAMILY_ICONS[familia]}</span>
          <span class="catalog-family-name" style="color:${fColor}">${familia.toUpperCase()}</span>
          <span class="catalog-family-desc">${FAMILY_DESC[familia]}</span>
        </div>
      </div>
      <div class="catalog-family-row">
    `;

    for (const [nombre, data] of entries) {
      const cost       = data.tempo;
      const cantAfford = cost > remaining;
      const spritePath = getAssetPath(nombre, 0); // equipo azul como preview
      const orgText    = ORG_INFO[nombre] || data.rol;
      // Recortar la descripción a ~90 chars para la card
      const shortOrg   = orgText.length > 90 ? orgText.slice(0, 87) + '…' : orgText;
      const { icon: roleIcon, label: roleLabel } = getUnitRoleInfo(nombre);

      html += `
        <div class="catalog-card${cantAfford ? ' cant-afford' : ''}" data-nombre="${nombre}" data-cost="${cost}">
          <span class="catalog-card-cost">${cost}♩</span>
          <div class="catalog-role-badge" title="${roleLabel}">${roleIcon}</div>
          <div class="catalog-card-sprite-wrap">
            <img class="catalog-card-sprite" src="${spritePath}" alt="${nombre}" loading="lazy">
          </div>
          <div class="catalog-card-name">${nombre}</div>
          <div class="catalog-card-rol" style="color:${fColor}">${data.rol}</div>
          <div class="catalog-card-org">${shortOrg}</div>
          <div class="catalog-card-mini-stats">
            <div class="mini-stat"><span class="mini-stat-label">TMP</span>${data.tempo}</div>
            <div class="mini-stat"><span class="mini-stat-label">VOL</span>${data.volumen}</div>
            <div class="mini-stat"><span class="mini-stat-label">RES</span>${data.resonancia}</div>
            <div class="mini-stat"><span class="mini-stat-label">MOV</span>${data.movimiento}</div>
            <div class="mini-stat"><span class="mini-stat-label">RNG</span>${data.rango}</div>
          </div>
        </div>
      `;
    }

    html += `</div>`; // cierre catalog-family-row
  }

  el.innerHTML = html;

  el.querySelectorAll('.catalog-card').forEach(card => {
    card.addEventListener('click', () => openUnitModal(card.dataset.nombre));
  });
}

function openUnitModal(nombre) {
  const data      = INSTRUMENTOS_DB[nombre];
  if (!data) return;
  const cost      = data.tempo;
  const fColor    = FAMILY_COLORS[data.familia] || '#888';
  const spritePath = getAssetPath(nombre, 0);
  const orgText   = ORG_INFO[nombre] || data.rol;
  const remaining = deployState.level.deployBudget - deployState.budgetUsed;
  const cantAfford = cost > remaining || deployState.roster.length >= MAX_ROSTER;

  const { icon: roleIcon } = getUnitRoleInfo(nombre);
  const STAT_LABELS = { tempo:'TEMPO', volumen:'VOLUM', resonancia:'RES', movimiento:'MOV', rango:'RANG' };
  const STAT_DESC   = { tempo:'Ordre d\'iniciativa (menor = abans)', volumen:'Dany per atac', resonancia:'Punts de vida màxims', movimiento:'Caselles per torn', rango:'Abast d\'atac' };

  document.getElementById('unit-modal-sprite').src = spritePath;
  document.getElementById('unit-modal-name').textContent  = nombre.toUpperCase();
  document.getElementById('unit-modal-name').style.color  = fColor;
  document.getElementById('unit-modal-rol').innerHTML     = `<span class="m-role-icon">${roleIcon}</span> ${data.rol}`;
  document.getElementById('unit-modal-rol').style.color   = fColor;
  document.getElementById('unit-modal-org').textContent   = orgText;
  document.getElementById('unit-modal-family').textContent = data.familia.toUpperCase();
  document.getElementById('unit-modal-family').style.background = fColor + '22';
  document.getElementById('unit-modal-family').style.color = fColor;
  document.getElementById('unit-modal-family').style.borderColor = fColor + '55';

  document.getElementById('unit-modal-stats').innerHTML = Object.entries(STAT_LABELS).map(([key, label]) =>
    `<div class="unit-modal-stat">
      <div class="unit-modal-stat-value">${data[key]}</div>
      <div class="unit-modal-stat-key">${label}</div>
      <div class="unit-modal-stat-desc">${STAT_DESC[key]}</div>
    </div>`
  ).join('');

  const addBtn  = document.getElementById('unit-modal-add');
  const cantEl  = document.getElementById('unit-modal-cant');
  if (cantAfford) {
    addBtn.style.display  = 'none';
    cantEl.style.display  = 'block';
  } else {
    addBtn.style.display  = '';
    cantEl.style.display  = 'none';
    addBtn.onclick = () => {
      addUnitToDeploy(nombre, cost);
      closeUnitModal();
    };
  }

  const modal = document.getElementById('unit-detail-modal');
  modal.classList.remove('hidden');
  // Pequeño delay para que la animación CSS dispare
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeUnitModal() {
  const modal = document.getElementById('unit-detail-modal');
  modal.classList.remove('open');
  modal.addEventListener('transitionend', () => modal.classList.add('hidden'), { once: true });
}

function addUnitToDeploy(nombre, cost) {
  const budget = deployState.level.deployBudget;
  if (deployState.budgetUsed + cost > budget) return;
  if (deployState.roster.length >= MAX_ROSTER) return;

  deployState.roster.push({ nombre, cost });
  deployState.budgetUsed += cost;
  renderPlayerRoster();
  updateBudgetDisplay();
  buildCatalog(); // refresh cant-afford states
  tutorialAdvance('unit-added', { unitName: nombre });
}

function removeUnitFromDeploy(index) {
  const unit = deployState.roster.splice(index, 1)[0];
  if (unit) deployState.budgetUsed -= unit.cost;
  renderPlayerRoster();
  updateBudgetDisplay();
  buildCatalog();
}

function renderPlayerRoster() {
  const el = document.getElementById('player-roster');
  el.innerHTML = deployState.roster.map((u, i) =>
    `<div class="roster-row">
      <span class="roster-row-name">${u.nombre}</span>
      <span class="roster-row-cost">${u.cost}♩</span>
      <button class="roster-row-remove" data-index="${i}">✕</button>
    </div>`
  ).join('');

  el.querySelectorAll('.roster-row-remove').forEach(btn => {
    btn.addEventListener('click', () => removeUnitFromDeploy(+btn.dataset.index));
  });

  const confirmBtn = document.getElementById('deploy-confirm');
  confirmBtn.disabled = deployState.roster.length === 0;

  document.getElementById('roster-count').textContent = `(${deployState.roster.length}/${MAX_ROSTER})`;
}

function updateBudgetDisplay() {
  const budget = deployState.level ? deployState.level.deployBudget : 1;
  const used   = deployState.budgetUsed;
  const pct    = Math.min(100, (used / budget) * 100);
  document.getElementById('budget-used').textContent = used;
  const fill = document.getElementById('budget-bar-fill');
  fill.style.width = pct + '%';
  fill.style.background = pct > 90 ? 'var(--neon-pink)' : pct > 70 ? '#FFA500' : 'var(--brand-grad)';
}

function confirmDeploy() {
  tutorialAdvance('deployed');
  const level = deployState.level;

  document.getElementById('deploy-screen').classList.add('hidden');

  // Normal flow: use player's deployed roster
  const playerPlacements = deployState.roster.map((u, i) => {
    const slot = DEPLOY_SLOTS[i] || { col: 0, row: i % ROWS };
    return { instrumento: u.nombre, col: slot.col, row: slot.row, team: 0 };
  });

  const enemyPlacements = level.placements.filter(p => p.team === 1);
  const patchedLevel = { ...level, placements: [...playerPlacements, ...enemyPlacements] };
  startGame(patchedLevel);
}

// ================================================================
//  TUTORIAL SYSTEM — Interactive step-by-step, all mechanics
// ================================================================
const TUTORIAL_STEPS = [
  // ── SECCIÓ 1: BENVINGUDA (Menú) ──────────────────────────────
  {
    id: 'welcome',
    title: 'SYMPHONIC TACTICS',
    text: 'Benvingut, Comandant!\nUn joc de tàctica per torns on els instruments musicals lluiten al camp de batalla.\nCada instrument té estadístiques úniques basades en les seves propietats acústiques reals.',
    icon: '🎼',
    interactive: false,
  },
  {
    id: 'concept-stats',
    title: 'LES CINC ESTADÍSTIQUES',
    text: '♩ TEMPO — Iniciativa: qui actua primer (menor = millor)\n🔊 VOLUM — Dany que fas a cada atac\n🎵 RESONÀNCIA — Punts de vida màxims (HP)\n👢 MOVIMENT — Caselles que pots avançar per torn\n🎯 RANG — Distància màxima d\'atac',
    icon: '📊',
    interactive: false,
  },
  {
    id: 'menu-overview',
    title: 'MAPA D\'OPERACIONS',
    text: 'Aquí veus tots els nivells de la campanya.\nEls nivells es desbloquegen completant els anteriors.\nCada victòria et dona MUSICOINS ♩ per progressar.\nHi ha 10 nivells en total, amb dificultats creixents.',
    highlight: 'levels-list',
    interactive: false,
  },
  {
    id: 'select-level',
    title: 'SELECCIONA UN NIVELL',
    text: 'Fes clic en qualsevol nivell disponible per accedir a la fase de desplegament.\nComença pel primer: "El Duel de Cordes".',
    highlight: 'levels-list',
    interactive: true,
    action: 'level-selected',
    hint: '→ Fes clic en un nivell per continuar',
  },
  // ── SECCIÓ 2: DESPLEGAMENT ───────────────────────────────────
  {
    id: 'deploy-intro',
    title: 'FASE DE DESPLEGAMENT',
    text: 'Abans de cada batalla construeixes el teu equip.\nTens un pressupost de MUSICOINS ♩ limitat per nivell.\nTria els instruments que millor conterin els enemics.',
    icon: '⚔️',
    interactive: false,
  },
  {
    id: 'enemy-intel',
    title: 'INTEL·LIGÈNCIA ENEMIGA',
    text: 'Al panell esquerre veus les unitats enemigues.\nEstudia el seu VOLUM (dany per atac) i RESONÀNCIA (HP).\nTriar unitats que aguantin els seus atacs és clau per guanyar.',
    highlight: 'enemy-roster',
    interactive: false,
  },
  {
    id: 'catalog',
    title: 'CATÀLEG D\'INSTRUMENTS',
    text: 'Al centre hi ha tots els instruments disponibles, agrupats per família:\n🎻 Corda — Melee (Rang 1), resistents\n🎺 Vent — Distància (Rang 3), atacadors\n🥁 Percussió — Àrea o Melee, impredictibles\n🎹 Electrònics — Versàtils, rang mig',
    highlight: 'catalog-grid',
    interactive: false,
  },
  {
    id: 'add-unit',
    title: 'AFEGEIX EL CLARINET',
    text: 'Per a aquest tutorial, afegeix el Clarinet al teu esquadró.\nÉs un instrument de Vent amb Rang 3 — pot atacar des de lluny!\nFes clic a la seva fitxa al catàleg i afegeix-la amb el botó verd.',
    highlight: 'catalog-grid',
    interactive: true,
    action: 'unit-added',
    requireUnit: 'Clarinet',
    hint: '→ Afegeix el Clarinet al teu esquadró per continuar',
  },
  {
    id: 'budget',
    title: 'GESTIÓ DEL PRESSUPOST',
    text: 'La barra de pressupost indica quants ♩ has gastat.\nQuan arriba al vermell, no pots afegir més unitats.\nInstruments de TEMPO alt costen més però solen ser més poderosos.\nPots afegir fins a 12 unitats al teu esquadró.',
    highlight: 'deploy-budget-display',
    interactive: false,
  },
  {
    id: 'deploy-confirm',
    title: 'LLANÇA L\'ATAC!',
    text: 'Quan el teu esquadró estigui llest, prem "⚔ DESPLEGAR".\nLes teves unitats apareixeran a la columna esquerra del camp.\nRecorda: cada unitat ocupa la seva casella — el posicionament importa.',
    highlight: 'deploy-confirm',
    interactive: true,
    action: 'deployed',
    hint: '→ Prem el botó "⚔ DESPLEGAR"',
  },
  // ── SECCIÓ 3: CAMP DE BATALLA ────────────────────────────────
  {
    id: 'battlefield',
    title: 'EL CAMP DE BATALLA',
    text: 'La quadrícula isomètrica és el camp de batalla.\n🔵 Unitats BLAVES = el teu equip (columna esquerra)\n🔴 Unitats VERMELLES = enemics (columna dreta)\nFes clic a qualsevol unitat per veure\'n les estadístiques al panell inferior.',
    icon: '🗺️',
    interactive: false,
  },
  {
    id: 'initiative',
    title: 'ORDRE D\'INICIATIVA',
    text: 'La barra superior mostra l\'ordre de torn complet.\nEl TEMPO (T#) determina qui actua: MENOR TEMPO = ACTUA PRIMER.\nL\'unitat activa té el cercle ressaltat. Les que ja han actuat s\'atenuen.\nEn empat de TEMPO, l\'equip 0 (blau) té prioritat.',
    highlight: 'initiative-bar',
    interactive: false,
  },
  {
    id: 'command-panel',
    title: 'PANELL DE COMANDAMENT',
    text: 'El panell inferior és el teu centre de control:\n← Esquerra: Retrat, família i rol de la unitat activa\n↕ Centre: Botons MOURE / ATACAR i FI DE TORN\n→ Dreta: Estadístiques completes i organologia de l\'instrument',
    highlight: 'unit-deck',
    interactive: false,
  },
  // ── SECCIÓ 4: MOVIMENT ───────────────────────────────────────
  {
    id: 'move-action',
    title: 'FASE DE MOVIMENT',
    text: 'Cada torn comença amb la fase de MOVIMENT.\nPrem 👢 MOURE: apareixeran caselles BLAVES.\nEl Clarinet té MOVIMENT 5 — apropa\'t al Violí enemic!\nCom més a prop, millor. El Clarinet té Rang 3.',
    highlight: 'btn-action-move',
    interactive: true,
    action: 'unit-moved',
    hint: '→ Prem MOURE i fes clic en una casella blava propera al Violí',
  },
  // ── SECCIÓ 5: ATAC ───────────────────────────────────────────
  {
    id: 'range-types',
    title: 'TIPUS DE RANG',
    text: 'Cada família té un rang d\'atac diferent, com en la realitat acústica:\n🛡️ Rang 1 (Melee) — Corda: cos a cos, molt dany\n🏹 Rang 3 (Distància) — Vent: ataca a 3 caselles de distància\n💥 Rang Àrea — Percussió especial: ataca tots els adjacents simultàniament',
    icon: '🎯',
    interactive: false,
  },
  {
    id: 'attack-action',
    title: 'FASE D\'ATAC',
    text: 'Ja tens el Clarinet (Rang 3) a l\'abast del Violí enemic.\nPrem ⚔️ ATACAR: el Violí es marcarà en VERMELL.\nFes clic sobre ell per atacar-lo!\nDANY = VOLUM del Clarinet (400). La seva RESONÀNCIA baixa.',
    highlight: 'btn-action-attack',
    interactive: true,
    action: 'unit-attacked',
    hint: '→ Prem ATACAR i fes clic al Violí vermell',
  },
  // ── SECCIÓ 6: FI DE TORN I IA ────────────────────────────────
  {
    id: 'end-turn',
    title: 'FI DE TORN',
    text: 'Si no pots o no vols atacar, prem "FI DE TORN".\nAixò finalitza el teu torn i passa al següent en la llista d\'iniciativa.\nPots saltar el moviment o l\'atac individualment si no t\'interessa.',
    highlight: 'btn-end-turn',
    interactive: false,
  },
  {
    id: 'ai-turn',
    title: 'TORN DE LA IA ENEMIGA',
    text: 'Quan li toca a l\'equip enemic apareix un banner amb el seu nom.\nLa IA executa la seva estratègia automàticament en dos passos:\n1. Es mou cap a l\'enemic més proper (càlcul BFS)\n2. Ataca la unitat aliada més feble dins el seu rang',
    icon: '🤖',
    interactive: false,
  },
  // ── SECCIÓ 7: VICTÒRIA I PROGRESSIÓ ─────────────────────────
  {
    id: 'win-conditions',
    title: 'COM GUANYAR',
    text: 'Cada nivell té la seva condició de victòria:\n→ Elimina TOTES les unitats enemigues\n→ Derrota el CAP FINAL (Rei Arcà en el nivell 10)\nQuant la RESONÀNCIA d\'una unitat arriba a 0, queda eliminada.\nMort = explosió de partícules + notes musicals!',
    icon: '🏆',
    interactive: false,
  },
  {
    id: 'finale',
    title: 'JA ESTÀS LLEST, COMANDANT!',
    text: 'Ara coneixes totes les mecàniques de Symphonic Tactics.\nRecorda: cada instrument és únic, i la música és la teva arma.\nHi ha 10 nivells en total, culminant amb la "Simfonia d\'Herois" contra el Rei Arcà.\n\nBona sort a la batalla! 🎵',
    icon: '🎖️',
    interactive: false,
    isLast: true,
  },
];

// ── tutorialAdvance — called by game events to progress interactive steps ──
function tutorialAdvance(actionId, payload) {
  if (state.tutorialStep < 0) return;
  const step = TUTORIAL_STEPS[state.tutorialStep];
  if (!step || !step.interactive || step.action !== actionId) return;
  // Check requireUnit constraint
  if (step.requireUnit && payload?.unitName !== step.requireUnit) {
    // Wrong unit — flash the hint and highlight the required card
    const hintEl = document.querySelector('.tutorial-action-hint');
    if (hintEl) {
      hintEl.textContent = `→ Has d'afegir el ${step.requireUnit} per continuar`;
      hintEl.classList.add('hint-shake');
      setTimeout(() => hintEl?.classList.remove('hint-shake'), 600);
    }
    // Highlight the specific card
    document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
    const card = document.querySelector(`[data-nombre="${step.requireUnit}"]`);
    if (card) card.classList.add('tutorial-highlight');
    return;
  }
  state.tutorialStep++;
  showTutorialOverlay();
}

function startTutorial() {
  // Legacy: auto-start at game section (step 10) for new players
  state.tutorialStep = 10;
  showTutorialOverlay();
}

function startFullTutorial() {
  // Full tutorial from step 0 (menu → deploy → game)
  state.tutorialStep = 0;
  localStorage.removeItem('symphonic_tutorial_done');
  showTutorialOverlay();
}

function showTutorialOverlay() {
  // ── Card container (corner) ──────────────────────────────────
  let cardEl = document.getElementById('tutorial-overlay');
  if (!cardEl) {
    cardEl = document.createElement('div');
    cardEl.id = 'tutorial-overlay';
    document.body.appendChild(cardEl);
  }

  // ── Click-blocker dim (non-interactive steps) ────────────────
  let dimEl = document.getElementById('tutorial-dim');
  if (!dimEl) {
    dimEl = document.createElement('div');
    dimEl.id = 'tutorial-dim';
    document.body.appendChild(dimEl);
  }

  const step = TUTORIAL_STEPS[state.tutorialStep];
  if (!step) { endTutorial(); return; }

  const isLast = !!step.isLast;
  const total  = TUTORIAL_STEPS.length;
  const pct    = Math.round((state.tutorialStep / (total - 1)) * 100);
  const lines  = step.text.split('\n');

  // Interactive steps → hide dim (target element is accessible)
  // Non-interactive → show dim (transparent click-blocker)
  dimEl.classList.toggle('hidden', !!step.interactive);

  // Dynamic card position based on active screen
  const gameActive   = !document.getElementById('game-container')?.classList.contains('hidden');
  const deployActive = !document.getElementById('deploy-screen')?.classList.contains('hidden');

  if (gameActive) {
    // Above the game HUD
    cardEl.style.bottom = '290px';
    cardEl.style.right  = '28px';
    cardEl.style.left   = 'auto';
  } else if (deployActive) {
    // Bottom-left to not cover the DEPLOY button (bottom-right)
    cardEl.style.bottom = '40px';
    cardEl.style.left   = '28px';
    cardEl.style.right  = 'auto';
  } else {
    // Menu: bottom-right
    cardEl.style.bottom = '40px';
    cardEl.style.right  = '28px';
    cardEl.style.left   = 'auto';
  }

  // Re-trigger slide-in animation on each step
  cardEl.classList.remove('hidden');
  cardEl.style.animation = 'none';
  requestAnimationFrame(() => { cardEl.style.animation = ''; });

  const actionsHTML = step.interactive
    ? `<div class="tutorial-action-hint">${step.hint || '→ Realitza l\'acció per continuar'}</div>
       <button class="tutorial-skip-step">Saltar aquest pas</button>`
    : `<div class="tutorial-actions">
        ${state.tutorialStep > 0 ? '<button class="tutorial-btn tutorial-btn-back">«</button>' : ''}
        <button class="tutorial-btn tutorial-btn-next">${isLast ? '✓ Tancar' : 'Següent »'}</button>
       </div>
       <button class="tutorial-skip">Saltar tutorial</button>`;

  cardEl.innerHTML = `
    <div class="tutorial-card">
      <div class="tutorial-progress-bar">
        <div class="tutorial-progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="tutorial-inner">
        ${step.icon ? `<div class="tutorial-icon">${step.icon}</div>` : ''}
        <div class="tutorial-step-num">PAS ${state.tutorialStep + 1} / ${total}</div>
        ${step.title ? `<div class="tutorial-title">${step.title}</div>` : ''}
        <div class="tutorial-text">${lines.map(l => `<p>${l}</p>`).join('')}</div>
        ${actionsHTML}
      </div>
    </div>
  `;

  // Apply spotlight / clear previous
  document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
  if (step.requireUnit) {
    // Highlight specific required unit card
    const card = document.querySelector(`[data-nombre="${step.requireUnit}"]`);
    if (card) card.classList.add('tutorial-highlight');
  } else if (step.highlight) {
    document.getElementById(step.highlight)?.classList.add('tutorial-highlight');
  }

  // Wire buttons
  if (!step.interactive) {
    cardEl.querySelector('.tutorial-btn-next')?.addEventListener('click', () => {
      if (isLast) {
        endTutorial();
        showMainMenu();   // return to level selector on finish
        return;
      }
      state.tutorialStep++;
      showTutorialOverlay();
    });
    cardEl.querySelector('.tutorial-btn-back')?.addEventListener('click', () => {
      state.tutorialStep--;
      showTutorialOverlay();
    });
    cardEl.querySelector('.tutorial-skip')?.addEventListener('click', endTutorial);
  } else {
    cardEl.querySelector('.tutorial-skip-step')?.addEventListener('click', () => {
      state.tutorialStep++;
      showTutorialOverlay();
    });
  }
}

function endTutorial() {
  state.tutorialStep = -1;
  document.getElementById('tutorial-overlay')?.classList.add('hidden');
  const dim = document.getElementById('tutorial-dim');
  if (dim) dim.classList.add('hidden');
  document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
  localStorage.setItem('symphonic_tutorial_done', '1');
}

function startGame(level) {
  document.getElementById('game-hud').classList.remove('hidden');
  document.getElementById('game-container').classList.remove('hidden');

  initUnitsForLevel(level);

  const team1El = document.getElementById('team1-name');
  const team2El = document.getElementById('team2-name');
  if (team1El) team1El.textContent = level.team1Name;
  if (team2El) team2El.textContent = level.team2Name;

  const missionObjEl = document.getElementById('mission-objectives');
  if (missionObjEl) {
    missionObjEl.innerHTML = `<strong>${level.title}</strong><br><br>${level.objectives}<br><br><em style="color:var(--txt-lo); font-size:11px;">Condició de victòria: ${level.winCondition}</em>`;
  }

  const canvas = document.getElementById('game-canvas');
  startRound();
  resizeCanvas(canvas);

  // Auto-trigger game-section tutorial for new players (only if full tutorial is NOT already running)
  if (level.id === 'duel-strings' && !localStorage.getItem('symphonic_tutorial_done') && state.tutorialStep < 0) {
    startTutorial(); // starts at step 10 (battlefield section)
  }
}

// ── ENTRY POINT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProgression();  // Cargar progresión guardada
  buildMainMenu();

  // ── Landing to Menu transition
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      const landing = document.getElementById('landing-page');
      const menu = document.getElementById('main-menu');
      if (landing) landing.classList.add('hidden');
      if (menu) menu.classList.remove('hidden');
    });
  }

  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // ── Tactical Clicks
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;
    const hit  = tileAtMouse(mx, my);
    if (!hit) { state.selected = null; updatePanel(null); return; }

    const [c,r] = hit;
    const target = state.units.find(u => u.col === c && u.row === r);
    const active = getActiveUnit();

    if (state.phase === 'attack' && active) {
      // Busca el enemigo atacable más cercano al punto de click en pantalla.
      // Los sprites se dibujan ~20px + float por ENCIMA de su tile, así que
      // el click puede caer en la tile de arriba y no encontrar la unidad por col/row exacto.
      let attackTarget = null;
      let bestDist = Infinity;
      for (const u of state.units) {
        if (!state.attackableSet?.has(`${u.col},${u.row}`) || u.hp <= 0) continue;
        const scr = gridToScreen(u.col, u.row, state.offX, state.offY);
        const ux  = scr.x + TILE_W / 2;
        const uy  = scr.y + (TILE_H * 0.9) - 55; // centro visual del sprite (anclado al suelo, -55 ≈ mitad sprite 110px)
        const dist = Math.hypot(mx - ux, my - uy);
        if (dist < bestDist) { bestDist = dist; attackTarget = u; }
      }
      // Radio de detección: 1.5 tiles para que sea generoso pero no ambiguo
      if (attackTarget && bestDist < TILE_W * 1.5) {
        attack(active, attackTarget);
        return;
      }
    }
    if (state.phase === 'move' && active && !target && state.reachableSet?.has(`${c},${r}`)) {
      startMoveAnim(active, c, r);
      return;
    }

    if (target) {
      state.selected = state.selected === target.id ? null : target.id;
      updatePanel(state.selected ? target : null);
    } else {
      state.selected = null;
      updatePanel(null);
    }
  });

  // ── HOVER
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const hit  = tileAtMouse(e.clientX - rect.left, e.clientY - rect.top);
    state.hovered = hit;
    if (hit) {
      const u = state.units.find(u => u.col === hit[0] && u.row === hit[1]);
      if (u && !state.selected) updatePanel(u);
    } else if (!state.selected) {
      updatePanel(null);
    }
  });

  // ── COMMAND BUTTONS (The Premium Bar)
  document.getElementById('btn-action-move')?.addEventListener('click', () => {
    const u = getActiveUnit(); if (!u || u.team !== 0) return;
    state.phase = 'move'; computeReachable(); updateActiveTurnCard();
  });
  document.getElementById('btn-action-attack')?.addEventListener('click', () => {
    const u = getActiveUnit(); if (!u || u.team !== 0) return;
    state.phase = 'attack'; computeAttackable(u); updateActiveTurnCard();
  });
  document.getElementById('btn-end-turn')?.addEventListener('click', () => {
    const u = getActiveUnit(); if (!u || u.team !== 0) return;
    advanceTurn();
  });

  // ── Mouse leave
  canvas.addEventListener('mouseleave', () => {
    state.hovered = null;
    if (!state.selected) updatePanel(null);
  });

  // ── Resize
  window.addEventListener('resize', () => {
    resizeCanvas(canvas);
  });

  // ── Game loop (update + render, separated per engine doc)
  let lastTime = 0;
  function loop(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    // update
    state.tick++;
    if (state.anim) updateAnim(dt);
    updateFloatingTexts(dt);
    updateDyingUnits(dt);
    updateShake(dt);
    updateParticles(dt);

    // render
    render(canvas, ctx);
    drawParticles(ctx);
    drawFloatingTexts(ctx);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});
